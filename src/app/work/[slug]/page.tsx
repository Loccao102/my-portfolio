import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, getProject, categoryLabels } from '@/data/projects';
import { Status } from '@/components/status';
import { ArrowUpRight, ArrowRight, Github } from '@/components/icons';
import { BuildsPanel } from '@/components/activity-panels';
import { getActivity, getRepository } from '@/lib/github';
import { RepositoryEvidence } from '@/components/repository-evidence';
import { EmploymentEvidence } from '@/components/employment-evidence';
export const revalidate = 3600;
export function generateStaticParams() { return projects.map(p => ({ slug: p.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = getProject(slug); return { title: project?.name || 'Không tìm thấy dự án', description: project?.summary }; }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = getProject(slug); if (!project) notFound();
  const activity = (await getActivity()).filter(a => a.projectId === slug); const facts = project.repo ? await getRepository(project.repo) : null;
  return <main id="main" className="inner-page"><Link className="back-link" href="/work">← Về danh sách dự án</Link><div className="detail-hero"><div className="page-intro"><span className="eyebrow">{categoryLabels[project.category].toUpperCase()} / {project.subtitle.toUpperCase()}</span><h1>{project.name}<em>.</em></h1><p>{project.summary}</p></div><aside className="detail-meta"><Status status={project.status} /><p>{project.currentState}</p><div className="stack-tags">{project.stack.map(s => <span key={s}>{s}</span>)}</div></aside></div>
    {project.plannedStack && <p className="content-note">Công nghệ và kiến trúc dưới đây là đề xuất trong tài liệu repository, chưa phải toàn bộ stack đã được triển khai.</p>}
    {project.architecture.length > 0 && <section className="architecture"><span className="eyebrow">{project.plannedStack ? 'KIẾN TRÚC ĐỀ XUẤT' : 'NHÌN NHANH HỆ THỐNG'}</span><div className="architecture-flow">{project.architecture.map((node, i) => <div className="architecture-node" key={node}><span>{node}</span>{i < project.architecture.length - 1 && <i aria-hidden="true" />}</div>)}</div><p className="architecture-note">Sơ đồ rút gọn từ flow được tài liệu repository mô tả.</p></section>}
    {!project.pendingDetails && <div className="detail-content"><section><h2>Dự án để làm gì?</h2><p>{project.why}</p></section><section><h2>Bài toán cần giải quyết</h2><p>{project.problem}</p></section><section><h2>Quyết định kỹ thuật</h2><ul>{project.decisions.map(d => <li key={d}>{d}</li>)}</ul></section>{project.devNote && <section className="content-note"><span className="eyebrow">// MỘT DÒNG DÀNH CHO NGƯỜI THÍCH NHÌN DƯỚI NẮP MÁY</span><p><code>{project.devNote}</code></p></section>}<section><h2>Có gì bên trong?</h2><ul>{project.highlights.map(h => <li key={h}>{h}</li>)}</ul></section><section><h2>Hiện tại đang ở đâu?</h2><p>{project.currentState}</p></section>{project.nextMilestone && <section><h2>Tiếp theo</h2><p>{project.nextMilestone}</p></section>}</div>}
    {project.id === 'national-exam-system' && <EmploymentEvidence />}<RepositoryEvidence project={project} facts={facts} />{activity.length > 0 && <BuildsPanel full activity={activity} />}
    <div className="detail-source">{project.repo ? <a className="button primary" href={'https://github.com/' + project.repo} target="_blank" rel="noreferrer"><Github size={16} />Xem mã nguồn<ArrowUpRight size={16} /></a> : <Link className="button secondary" href="/about#experience">Xem kinh nghiệm liên quan<ArrowUpRight size={16} /></Link>}{project.demo && <a className="button secondary" href={project.demo} target="_blank" rel="noreferrer">Mở bản demo<ArrowUpRight size={16} /></a>}<Link className="text-link" href="/work">Xem thêm dự án<ArrowRight size={15} /></Link></div>
  </main>;
}
