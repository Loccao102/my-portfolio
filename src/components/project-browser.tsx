'use client';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { projects } from '@/data/projects';
import { Status } from './status';
import { ArrowUpRight, Code2, FlaskConical, Box } from './icons';
const categories = [['all', 'Tất cả'], ['systems', 'Hệ thống'], ['lab', 'Thử nghiệm'], ['tools', 'Công cụ']];
export function ProjectBrowser({ initialCategory = 'all', compact = false }: { initialCategory?: string; compact?: boolean }) {
  const params = useSearchParams(); const router = useRouter(); const pathname = usePathname();
  const category = params.get('category') || initialCategory; const status = params.get('status');
  const visible = projects.filter(p => (category === 'all' || p.category === category) && (!status || p.status === status) && (!compact || p.featured));
  function select(value: string) { const next = new URLSearchParams(params); next.delete('status'); next.set('category', value); router.replace(pathname + '?' + next.toString(), { scroll: false }); }
  return <div className="project-browser">{!compact && <div className="filter-bar" aria-label="Lọc dự án">{categories.map(([value, label]) => <button key={value} onClick={() => select(value)} className={category === value ? 'selected' : ''} aria-pressed={category === value}>{label}<span>{projects.filter(p => value === 'all' || p.category === value).length}</span></button>)}{status && <button className="clear-filter" onClick={() => select(category)}>Bỏ lọc “{status}” ×</button>}</div>}
    <div className="project-rows">{visible.map(project => <Link className="project-row" key={project.id} href={'/work/' + project.id}><span className={'project-symbol accent-' + project.accent}>{project.category === 'systems' ? <Code2 /> : project.category === 'lab' ? <FlaskConical /> : <Box />}</span><div className="project-row-title"><h3>{project.name}</h3><p>{project.summary}</p></div><div className="project-row-stack">{project.stack.slice(0, 3).join(' / ')}</div><Status status={project.status} /><ArrowUpRight className="row-arrow" size={21} /></Link>)}</div>{!visible.length && <p className="empty-filter">Chưa có gì trên kệ này. Thử một bộ lọc khác nhé.</p>}
  </div>;
}
