import { loadEnvConfig } from '@next/env';
import { readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { projects } from '../src/data/projects';
import { normalizeRepository, type RepositoryFacts } from '../src/lib/github-data';

loadEnvConfig(process.cwd());
async function main() {
  const target = path.resolve('src/data/repository-snapshot.json');
  const previous = JSON.parse(await readFile(target, 'utf8')) as { capturedAt: string; repositories: RepositoryFacts[] };
  const byRepo = new Map(previous.repositories.map(repository => [repository.repo, repository]));
  let updated = 0;
  for (const project of projects.filter(p => p.repo)) {
    const repo = project.repo!;
    const branch = byRepo.get(repo)?.defaultBranch || 'main';
    try {
      const parts = await Promise.all(['', '/commits?per_page=1', `/actions/runs?branch=${encodeURIComponent(branch)}&per_page=10`, '/releases?per_page=10'].map(async suffix => {
        const response = await fetch(`https://api.github.com/repos/${repo}${suffix}`, {
          headers: { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) }, signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
        return response.json();
      }));
      const data = normalizeRepository(repo, ...parts as [unknown, unknown, unknown, unknown], new Date().toISOString());
      if (!data) throw new Error('Unexpected public repository response');
      byRepo.set(repo, data); updated++;
      console.log(`${repo}: ${data.commit.sha.slice(0, 7)}${project.evidence?.ref !== data.commit.sha ? ' — newer than reviewed project content; review sources before editing claims' : ''}`);
    } catch (error) {
      console.error(`${repo}: ${error instanceof Error ? error.message : 'fetch failed'}; preserving previous snapshot and timestamp`);
    }
  }
  if (!updated) { console.error('No successful refresh. Snapshot was not modified.'); process.exitCode = 1; return; }
  const temporary = `${target}.tmp`;
  await writeFile(temporary, JSON.stringify({ capturedAt: new Date().toISOString(), repositories: [...byRepo.values()] }, null, 2) + '\n');
  await rename(temporary, target);
  console.log(`Refreshed ${updated} public repositories. Project descriptions and stages were not automatically changed.`);
}
main().catch(error => { console.error(error instanceof Error ? error.message : 'Sync failed'); process.exitCode = 1; });
