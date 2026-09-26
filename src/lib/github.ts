import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { projects } from '@/data/projects';
import snapshot from '@/data/repository-snapshot.json';
import { normalizeRepository, type RepositoryFacts, type Activity } from './github-data';
export { normalizeCommit, type Activity } from './github-data';

// A checked-in snapshot contains only verified public GitHub fields. A fresh
// snapshot avoids a cold-build stampede; older snapshots remain labeled fallbacks.
async function fetchRepository(repo: string): Promise<RepositoryFacts | null> {
  const previous = snapshot.repositories.find(item => item.repo === repo) as RepositoryFacts | undefined;
  const age = previous ? Date.now() - Date.parse(previous.fetchedAt) : Infinity;
  if (previous && age >= 0 && age < 3600_000) return { ...previous, cached: true };
  const branch = previous?.defaultBranch || 'main';
  try {
    const responses = await Promise.all(['', '/commits?per_page=1', `/actions/runs?branch=${encodeURIComponent(branch)}&per_page=10`, '/releases?per_page=10'].map(async suffix => {
      const response = await fetch(`https://api.github.com/repos/${repo}${suffix}`, {
        headers: { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
        next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error(`GitHub ${response.status}`);
      return response.json();
    }));
    const result = normalizeRepository(repo, ...responses as [unknown, unknown, unknown, unknown], new Date().toISOString());
    if (result) return result;
  } catch { /* Throw so Next.js retains a last-good cached value during revalidation. */ }
  throw new Error('GitHub repository refresh unavailable');
}
const cachedRepository = unstable_cache(fetchRepository, ['public-github-repository-v2', snapshot.capturedAt], { revalidate: 3600 });
export const getRepository = cache(async (repo: string) => {
  // Only configured public repositories can be requested by the portfolio.
  if (!projects.some(project => project.repo === repo)) return null;
  try { return await cachedRepository(repo); }
  catch { const previous = snapshot.repositories.find(item => item.repo === repo) as RepositoryFacts | undefined; return previous ? { ...previous, cached: true } : null; }
});
export const getActivity = cache(async (): Promise<Activity[]> => {
  const tracked = projects.filter(project => project.repo);
  const results = await Promise.allSettled(tracked.map(async project => {
    const facts = await getRepository(project.repo!);
    if (!facts) return null;
    return { projectId: project.id, name: project.name, ...facts.commit, sha: facts.commit.sha.slice(0, 7), fetchedAt: facts.fetchedAt, cached: facts.cached };
  }));
  return results.flatMap(result => result.status === 'fulfilled' && result.value ? [result.value] : []).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
});
