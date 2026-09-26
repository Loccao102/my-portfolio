import Link from 'next/link';
import { nowProjects, projects, statusLabels, type ProjectStatus } from '@/data/projects';
import { Activity } from '@/lib/github';
import { ArrowRight, ArrowUpRight } from './icons';
import { Status } from './status';
import { Lotus } from './lotus';

export function NowPanel({ full = false, activity }: { full?: boolean; activity: Activity[] }) {
  return <section className={`panel now-panel ${full ? 'now-full' : ''}`} id="now"><div className="panel-heading"><h2>Now <i className="pink-dot" /></h2><span>WHAT I’M BUILDING RIGHT NOW</span><Link href="/now" aria-label="View all current projects">View all<ArrowRight size={13} /></Link></div>
    <div className="now-stream">{nowProjects.map(project => <Link className={`now-item now-${project.id}`} key={project.id} href={`/work/${project.id}`}>
      <div className={`project-thumbnail thumbnail-${project.id}`}><div className="thumbnail-art" aria-hidden="true">{project.id === 'sen' ? <Lotus /> : project.id === 'habi' ? <><i /><i /><i /><i /><i /></> : project.id === 'city-of-lies' ? <><b /><b /><b /><b /><b /><b /></> : <><span /><span /><span /></>}</div><Status status={project.status} /></div>
      <h3>{project.name}</h3><p>{project.subtitle}</p><div className="now-activity" title={activity.find(item => item.projectId === project.id)?.message || 'GitHub activity unavailable'}><span className="activity-bars"><i /><i /><i /></span><span>{activity.find(item => item.projectId === project.id)?.message || 'View repository details'}</span><ArrowUpRight size={15} /></div>
    </Link>)}</div>
  </section>;
}

export function BuildsPanel({ activity, full = false }: { activity: Activity[]; full?: boolean }) {
  const hasCached = activity.some(item => item.cached);
  return <section className={`panel builds-panel ${full ? 'builds-full' : ''}`} id="builds"><div className="panel-heading"><h2>Latest builds</h2><span className="log-label" title={hasCached ? 'Includes a saved snapshot of verified public GitHub commits' : 'Latest public commits, refreshed hourly'}><i />{hasCached ? 'GITHUB · SNAPSHOT' : 'FROM GITHUB'}</span><Link href="/builds" aria-label="View complete build log"><ArrowUpRight size={15} /></Link></div>
    <div className="build-list">{activity.slice(0, full ? 20 : 5).map(item => <a key={item.projectId} className="build-item" href={item.url} target="_blank" rel="noreferrer"><time dateTime={item.date}>{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', timeZone: 'Asia/Bangkok' }).format(new Date(item.date))}</time><span className={`build-name dot-${projects.find(p => p.id === item.projectId)?.accent || 'pink'}`}><i />{item.name}</span><span className="build-message">{item.message}</span>{full && <code>{item.sha}</code>}</a>)}</div>
    {!activity.length && <div className="log-empty"><p>The work continues.</p><span>Live activity is temporarily unavailable.</span><a href="https://github.com/Loccao102" target="_blank" rel="noreferrer">Visit the workshop on GitHub <ArrowUpRight size={14} /></a></div>}
    {full && <p className="source-note">Latest public commit per tracked repository. Refreshed hourly; project stages are based on reviewed documentation.{hasCached && ' Snapshot entries are saved GitHub responses, not invented activity.'}</p>}
  </section>;
}

export function StatusPanel() {
  const statuses: ProjectStatus[] = ['shipped', 'v1', 'building', 'prototype', 'concept', 'source', 'case-study', 'archived'];
  const counts = statuses.map(status => ({ status, count: projects.filter(p => p.status === status).length })).filter(item => item.count > 0);
  const colors = ['#90b49c', '#d2b17d', '#b4a4c3', '#8b9da5', '#e98ba7', '#91978d', '#788d9a', '#777777'];
  let end = 0;
  const stops = counts.map((item, i) => { const start = end; end += item.count / projects.length * 100; return `${colors[i]} ${start}% ${end}%`; });
  return <section className="panel status-panel"><div className="panel-heading"><h2>Workshop status</h2><span className="status-live"><i />IN MOTION</span></div><div className="status-content"><div className="status-donut" style={{ background: `conic-gradient(${stops.join(',')})` }} role="img" aria-label={`${projects.length} projects: ${counts.map(c => `${c.count} ${statusLabels[c.status]}`).join(', ')}`}><div><strong>{projects.length}</strong><span>PROJECTS</span></div></div><div className="status-legend">{counts.map((item, i) => <Link key={item.status} href={`/work?status=${item.status}`}><i style={{ background: colors[i] }} /><b>{item.count}</b>{statusLabels[item.status]}</Link>)}</div></div><div className="status-motto"><Lotus /><span>ALWAYS BUILDING. ALWAYS LEARNING.</span></div></section>;
}
