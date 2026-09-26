export type Activity = { projectId: string; name: string; message: string; date: string; url: string; sha: string; cached?: boolean; fetchedAt?: string };
export type Workflow = { name: string; status: string; conclusion: string | null; url: string; sha: string };
export type RepositoryFacts = {
  repo: string; url: string; description: string | null; defaultBranch: string; updatedAt: string; pushedAt: string;
  language: string | null; stars: number; forks: number; archived: boolean; homepage: string | null; license: string | null;
  fetchedAt: string; commit: { sha: string; url: string; message: string; date: string }; workflows: Workflow[];
  release: { name: string; url: string; publishedAt: string } | null; cached?: boolean;
};
const record = (v: unknown): Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v) ? v as Record<string, unknown> : {};
const string = (v: unknown) => typeof v === 'string' ? v : '';
const date = (v: unknown) => typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? v : '';
export function safeWebUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : null; } catch { return null; }
}
function repoUrl(value: unknown, repo: string, path: string) {
  const url = safeWebUrl(value); return url?.startsWith(`https://github.com/${repo}/${path}`) ? url : null;
}
export function normalizeCommit(projectId: string, name: string, value: unknown): Activity | null {
  if (!Array.isArray(value) || !value.length) return null;
  const entry = record(value[0]), commit = record(entry.commit);
  const timestamp = date(record(commit.committer).date) || date(record(commit.author).date);
  const url = safeWebUrl(entry.html_url);
  if (!/^[a-f0-9]{7,40}$/i.test(string(entry.sha)) || !url || new URL(url).hostname !== 'github.com' || !timestamp || !string(commit.message)) return null;
  return { projectId, name, message: string(commit.message).split('\n')[0], date: timestamp, url, sha: string(entry.sha).slice(0, 7) };
}
export function normalizeRepository(repo: string, metadata: unknown, commits: unknown, runs: unknown, releases: unknown, fetchedAt: string): RepositoryFacts | null {
  const m = record(metadata), first = record(Array.isArray(commits) ? commits[0] : null);
  const activity = normalizeCommit(repo, repo, commits);
  if (m.full_name !== repo || m.private !== false || !date(m.updated_at) || !date(m.pushed_at) || !string(m.default_branch) || !activity || !repoUrl(activity.url, repo, 'commit/') || typeof m.stargazers_count !== 'number' || typeof m.forks_count !== 'number' || !Number.isInteger(m.stargazers_count) || !Number.isInteger(m.forks_count) || m.stargazers_count < 0 || m.forks_count < 0) return null;
  const rawRuns = record(runs).workflow_runs;
  if (!Array.isArray(rawRuns) || !Array.isArray(releases)) return null;
  const seen = new Set<string>();
  const workflows: Workflow[] = [];
  for (const value of rawRuns) {
    const run = record(value), key = String(run.workflow_id ?? run.name);
    const url = repoUrl(run.html_url, repo, 'actions/runs/');
    if (run.head_sha !== first.sha || !url || !string(run.name) || seen.has(key)) continue;
    seen.add(key); workflows.push({ name: string(run.name), status: string(run.status), conclusion: typeof run.conclusion === 'string' ? run.conclusion : null, url, sha: string(run.head_sha) });
  }
  const latest = releases.map(record).find(r => r.draft === false && r.prerelease === false);
  const releaseUrl = latest && repoUrl(latest.html_url, repo, 'releases/');
  return {
    repo, url: `https://github.com/${repo}`, description: typeof m.description === 'string' ? m.description : null,
    defaultBranch: string(m.default_branch), updatedAt: date(m.updated_at), pushedAt: date(m.pushed_at),
    language: typeof m.language === 'string' ? m.language : null,
    stars: typeof m.stargazers_count === 'number' ? m.stargazers_count : 0, forks: typeof m.forks_count === 'number' ? m.forks_count : 0,
    archived: m.archived === true, homepage: safeWebUrl(m.homepage), license: string(record(m.license).spdx_id) || null, fetchedAt,
    commit: { sha: string(first.sha), url: activity.url, date: activity.date, message: activity.message }, workflows,
    release: latest && releaseUrl && date(latest.published_at) ? { name: string(latest.tag_name), url: releaseUrl, publishedAt: date(latest.published_at) } : null,
  };
}
