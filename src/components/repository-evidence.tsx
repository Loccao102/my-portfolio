import type { Project } from '@/data/projects';
import type { RepositoryFacts } from '@/lib/github-data';
import { ArrowUpRight } from './icons';

const formatDate = (date: string) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' }).format(new Date(date));
export function RepositoryEvidence({ project, facts }: { project: Project; facts: RepositoryFacts | null }) {
  if (!project.evidence) return null;
  return <section className="repository-evidence" aria-label="GitHub evidence">
    <div className="evidence-heading"><span className="eyebrow">FROM THE PUBLIC REPOSITORY</span><a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer">{project.repo}<ArrowUpRight size={14} /></a></div>
    {facts ? <><dl className="repository-facts"><div><dt>Repository updated</dt><dd><time dateTime={facts.updatedAt}>{formatDate(facts.updatedAt)}</time></dd></div><div><dt>Default branch</dt><dd>{facts.defaultBranch}</dd></div><div><dt>Primary language</dt><dd>{facts.language || 'Not reported'}</dd></div><div><dt>Stars / forks</dt><dd>{facts.stars} / {facts.forks}</dd></div><div><dt>License</dt><dd>{facts.license || 'Not declared'}</dd></div><div><dt>Latest published release</dt><dd>{facts.release ? <a href={facts.release.url} target="_blank" rel="noreferrer">{facts.release.name} ↗</a> : 'None returned by GitHub'}</dd></div></dl>
      <div className="repository-checks"><span>Actions on <a href={facts.commit.url} target="_blank" rel="noreferrer"><code>{facts.commit.sha.slice(0, 7)}</code></a></span>{facts.workflows.length ? facts.workflows.map(workflow => <a key={workflow.url} href={workflow.url} target="_blank" rel="noreferrer" className={`workflow-result result-${workflow.conclusion}`}><i />{workflow.name}: {workflow.status === 'completed' ? workflow.conclusion || 'unknown' : workflow.status}<ArrowUpRight size={11} /></a>) : <span>No matching default-branch run returned.</span>}</div>
      <p className="source-note">GitHub data fetched {formatDate(facts.fetchedAt)}{facts.cached ? ' · saved snapshot' : ' · server refresh'}. Workflow results describe these runs only, not production readiness.</p></> : <p className="source-note">Repository telemetry is unavailable. The reviewed source links below remain available.</p>}
    <div className="reviewed-sources"><h2>Reviewed sources</h2><p>Descriptions and project stage were reviewed against these files on {formatDate(project.evidence.reviewedAt)}. Links are pinned to revision <code>{project.evidence.ref.slice(0, 7)}</code>.</p><ul>{project.evidence.files.map(file => <li key={file.path}><a href={file.url} target="_blank" rel="noreferrer">{file.path}<ArrowUpRight size={12} /></a></li>)}</ul><p>{project.statusNote}</p>{project.contentNote && <p className="content-note">{project.contentNote}</p>}</div>
  </section>;
}
