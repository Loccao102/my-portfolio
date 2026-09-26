import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCommit, normalizeRepository, safeWebUrl } from '../src/lib/github-data';
import { projects, statusLabels } from '../src/data/projects';
import snapshot from '../src/data/repository-snapshot.json';

test('normalizes an actual commit and keeps only the subject line', () => {
  const result = normalizeCommit('sen', 'Sen', [{ sha: '1234567890', html_url: 'https://github.com/Loccao102/VeyraBot/commit/1234567890', commit: { message: 'Add presence\n\nDetails', author: { date: '2026-09-25T17:37:34Z' } } }]);
  assert.equal(result?.message, 'Add presence'); assert.equal(result?.sha, '1234567');
});
test('handles unavailable, empty and malformed GitHub responses', () => {
  for (const value of [null, {}, [], [null], [{ sha: 123 }], [{ sha: '123', html_url: 99 }], [{ message: 'API rate limit exceeded' }]]) assert.equal(normalizeCommit('sen', 'Sen', value), null);
});
test('rejects unsafe commit URLs and invalid dates', () => {
  const value = { sha: '1234567', html_url: 'javascript:alert(1)', commit: { message: 'Subject', author: { date: '2026-09-25' } } };
  assert.equal(normalizeCommit('sen', 'Sen', [value]), null);
  value.html_url = 'https://github.com/Loccao102/VeyraBot/commit/123'; value.commit.author.date = 'invalid';
  assert.equal(normalizeCommit('sen', 'Sen', [value]), null);
});
test('fallback commits resolve to the configured repositories and project routes', () => {
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
  for (const entry of snapshot.repositories) { const project = projects.find(p => p.repo === entry.repo); assert.ok(project?.repo); assert.ok(entry.commit.url.startsWith(`https://github.com/${project.repo}/commit/`)); assert.ok(statusLabels[project.status]); }
});

const repo = 'Loccao102/example';
const sha = '1234567890abcdef1234567890abcdef12345678';
const fetchedAt = '2026-09-26T00:00:00Z';
const metadata = { full_name: repo, private: false, updated_at: fetchedAt, pushed_at: fetchedAt, default_branch: 'main', stargazers_count: 0, forks_count: 0, description: null, language: null, license: null };
const commits = [{ sha, html_url: `https://github.com/${repo}/commit/${sha}`, commit: { message: 'Actual subject\n\nBody', author: { date: fetchedAt } } }];
const run = { workflow_id: 1, name: 'CI', head_sha: sha, status: 'completed', conclusion: 'success', html_url: `https://github.com/${repo}/actions/runs/1` };
test('CI is tied to the exact current head, never an older passing commit', () => {
  const result = normalizeRepository(repo, metadata, commits, { workflow_runs: [{ ...run, head_sha: 'abcdef0123456789' }] }, [], fetchedAt);
  assert.deepEqual(result?.workflows, []);
  assert.equal(result?.release, null);
});
test('keeps newest rerun, independent workflows, and does not turn pending into success', () => {
  const result = normalizeRepository(repo, metadata, commits, { workflow_runs: [{ ...run, conclusion: null, status: 'in_progress' }, run, { ...run, workflow_id: 2, name: 'Race detection' }] }, [], fetchedAt);
  assert.equal(result?.workflows.length, 2); assert.equal(result?.workflows[0].conclusion, null); assert.equal(result?.workflows[0].status, 'in_progress');
});
test('rejects private, cross-repository and malformed metadata instead of inventing values', () => {
  for (const m of [{ ...metadata, private: true }, { ...metadata, full_name: 'someone/else' }, { ...metadata, stargazers_count: undefined }, { ...metadata, forks_count: -1 }]) assert.equal(normalizeRepository(repo, m, commits, { workflow_runs: [] }, [], fetchedAt), null);
  assert.equal(normalizeRepository(repo, metadata, [{ ...commits[0], html_url: 'https://github.com/other/repo/commit/1234567' }], { workflow_runs: [] }, [], fetchedAt), null);
});
test('handles empty release lists and ignores drafts and prereleases', () => {
  const release = { draft: true, prerelease: false, tag_name: 'v9', html_url: `https://github.com/${repo}/releases/tag/v9`, published_at: fetchedAt };
  assert.equal(normalizeRepository(repo, metadata, commits, { workflow_runs: [] }, [release, { ...release, draft: false, prerelease: true }], fetchedAt)?.release, null);
  assert.equal(safeWebUrl('javascript:alert(1)'), null); assert.equal(safeWebUrl('https://user:password@example.com'), null);
});
test('public projects have pinned repository evidence, while employment has no fabricated repository', () => {
  for (const project of projects.filter(p => p.repo)) { assert.equal(project.evidence?.repo, project.repo); assert.ok(project.evidence?.files.some(f => f.path === 'README.md')); for (const file of project.evidence!.files) assert.ok(file.url.startsWith(`https://github.com/${project.repo}/blob/${project.evidence!.ref}/`)); }
  const employment = projects.find(p => p.id === 'national-exam-system')!;
  assert.equal(employment.repo, undefined); assert.equal(employment.evidence, undefined); assert.deepEqual(employment.architecture, []);
  assert.equal(projects.find(p => p.id === 'void-weaver')?.plannedStack, true);
});
