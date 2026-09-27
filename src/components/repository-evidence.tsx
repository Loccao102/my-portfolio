import type { Project } from '@/data/projects';
import type { RepositoryFacts } from '@/lib/github-data';
import { ArrowUpRight } from './icons';

const formatDate = (date: string) => new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(date));

export function RepositoryEvidence({ project, facts }: { project: Project; facts: RepositoryFacts | null }) {
  if (!project.evidence) return null;
  return <section className="repository-evidence" aria-label="Bằng chứng từ GitHub">
    <div className="evidence-heading"><span className="eyebrow">ĐỐI CHIẾU TỪ REPOSITORY PUBLIC</span><a href={'https://github.com/' + project.repo} target="_blank" rel="noreferrer">{project.repo}<ArrowUpRight size={14} /></a></div>
    {facts ? <><dl className="repository-facts"><div><dt>Cập nhật repository</dt><dd><time dateTime={facts.updatedAt}>{formatDate(facts.updatedAt)}</time></dd></div><div><dt>Default branch</dt><dd>{facts.defaultBranch}</dd></div><div><dt>Ngôn ngữ chính</dt><dd>{facts.language || 'GitHub không báo cáo'}</dd></div><div><dt>Stars / forks</dt><dd>{facts.stars} / {facts.forks}</dd></div><div><dt>License</dt><dd>{facts.license || 'Chưa khai báo'}</dd></div><div><dt>Release mới nhất</dt><dd>{facts.release ? <a href={facts.release.url} target="_blank" rel="noreferrer">{facts.release.name} ↗</a> : 'Không có release được GitHub trả về'}</dd></div></dl>
      <div className="repository-checks"><span>Actions tại <a href={facts.commit.url} target="_blank" rel="noreferrer"><code>{facts.commit.sha.slice(0, 7)}</code></a></span>{facts.workflows.length ? facts.workflows.map(workflow => <a key={workflow.url} href={workflow.url} target="_blank" rel="noreferrer" className={'workflow-result result-' + workflow.conclusion}><i />{workflow.name}: {workflow.status === 'completed' ? workflow.conclusion || 'unknown' : workflow.status}<ArrowUpRight size={11} /></a>) : <span>Không có default-branch run phù hợp được trả về.</span>}</div>
      <p className="source-note">Dữ liệu GitHub lấy lúc {formatDate(facts.fetchedAt)}{facts.cached ? ' · snapshot đã lưu' : ' · server refresh'}. Workflow chỉ mô tả các run này, không chứng minh production readiness.</p></> : <p className="source-note">Tạm thời không lấy được telemetry repository. Các nguồn đã review bên dưới vẫn có thể mở trực tiếp.</p>}
    <div className="reviewed-sources"><h2>Nguồn đã đối chiếu</h2><p>Mô tả và trạng thái project được kiểm tra với các file này vào {formatDate(project.evidence.reviewedAt)}. Link được ghim tại revision <code>{project.evidence.ref.slice(0, 7)}</code>.</p><ul>{project.evidence.files.map(file => <li key={file.path}><a href={file.url} target="_blank" rel="noreferrer">{file.path}<ArrowUpRight size={12} /></a></li>)}</ul><p>{project.statusNote}</p>{project.contentNote && <p className="content-note">{project.contentNote}</p>}</div>
  </section>;
}
