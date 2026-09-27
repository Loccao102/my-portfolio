import Link from 'next/link';
import { nowProjects, projects, statusLabels, type ProjectStatus } from '@/data/projects';
import { Activity } from '@/lib/github';
import { ArrowRight, ArrowUpRight } from './icons';
import { Status } from './status';
import { Lotus } from './lotus';

export function NowPanel({ full = false, activity }: { full?: boolean; activity: Activity[] }) {
  return <section className={'panel now-panel ' + (full ? 'now-full' : '')} id="now"><div className="panel-heading"><h2>Đang làm <i className="pink-dot" /></h2><span>NHỮNG THỨ ĐANG ĐƯỢC XÂY</span><Link href="/now" aria-label="Xem tất cả dự án đang làm">Xem tất cả<ArrowRight size={13} /></Link></div>
    <div className="now-stream">{nowProjects.map(project => <Link className={'now-item now-' + project.id} key={project.id} href={'/work/' + project.id}><div className={'project-thumbnail thumbnail-' + project.id}><div className="thumbnail-art" aria-hidden="true">{project.id === 'sen' ? <Lotus /> : project.id === 'habi' ? <><i /><i /><i /><i /><i /></> : project.id === 'city-of-lies' ? <><b /><b /><b /><b /><b /><b /></> : <><span /><span /><span /></>}</div><Status status={project.status} /></div><h3>{project.name}</h3><p>{project.subtitle}</p><div className="now-activity" title={activity.find(item => item.projectId === project.id)?.message || 'Chưa lấy được hoạt động GitHub'}><span className="activity-bars"><i /><i /><i /></span><span>{activity.find(item => item.projectId === project.id)?.message || 'Xem chi tiết repository'}</span><ArrowUpRight size={15} /></div></Link>)}</div>
  </section>;
}
export function BuildsPanel({ activity, full = false }: { activity: Activity[]; full?: boolean }) {
  const hasCached = activity.some(item => item.cached);
  return <section className={'panel builds-panel ' + (full ? 'builds-full' : '')} id="builds"><div className="panel-heading"><h2>Commit mới nhất</h2><span className="log-label" title={hasCached ? 'Có sử dụng snapshot commit public đã xác minh' : 'Commit public mới nhất, refresh mỗi giờ'}><i />{hasCached ? 'GITHUB · SNAPSHOT' : 'TỪ GITHUB'}</span><Link href="/builds" aria-label="Xem toàn bộ build log"><ArrowUpRight size={15} /></Link></div>
    <div className="build-list">{activity.slice(0, full ? 20 : 5).map(item => <a key={item.projectId} className="build-item" href={item.url} target="_blank" rel="noreferrer"><time dateTime={item.date}>{new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: 'short', timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(item.date))}</time><span className={'build-name dot-' + (projects.find(p => p.id === item.projectId)?.accent || 'pink')}><i />{item.name}</span><span className="build-message">{item.message}</span>{full && <code>{item.sha}</code>}</a>)}</div>
    {!activity.length && <div className="log-empty"><p>Code vẫn đang chạy.</p><span>Hoạt động GitHub tạm thời chưa lấy được.</span><a href="https://github.com/Loccao102" target="_blank" rel="noreferrer">Mở GitHub <ArrowUpRight size={14} /></a></div>}
    {full && <p className="source-note">Hiển thị commit public mới nhất của mỗi repository được theo dõi, refresh mỗi giờ. Trạng thái dự án dựa trên tài liệu đã review.{hasCached && ' Một số mục dùng snapshot GitHub đã lưu, không phải activity được tạo giả.'}</p>}
  </section>;
}
export function StatusPanel() {
  const statuses: ProjectStatus[] = ['shipped', 'v1', 'building', 'prototype', 'concept', 'source', 'case-study', 'archived'];
  const counts = statuses.map(status => ({ status, count: projects.filter(p => p.status === status).length })).filter(item => item.count > 0);
  const colors = ['#90b49c', '#d2b17d', '#b4a4c3', '#8b9da5', '#e98ba7', '#91978d', '#788d9a', '#777777'];
  let end = 0; const stops = counts.map((item, i) => { const start = end; end += item.count / projects.length * 100; return colors[i] + ' ' + start + '% ' + end + '%'; });
  return <section className="panel status-panel"><div className="panel-heading"><h2>Trạng thái xưởng</h2><span className="status-live"><i />ĐANG CHUYỂN ĐỘNG</span></div><div className="status-content"><div className="status-donut" style={{ background: 'conic-gradient(' + stops.join(',') + ')' }} role="img" aria-label={projects.length + ' dự án: ' + counts.map(c => c.count + ' ' + statusLabels[c.status]).join(', ')}><div><strong>{projects.length}</strong><span>DỰ ÁN</span></div></div><div className="status-legend">{counts.map((item, i) => <Link key={item.status} href={'/work?status=' + item.status}><i style={{ background: colors[i] }} /><b>{item.count}</b>{statusLabels[item.status]}</Link>)}</div></div><div className="status-motto"><Lotus /><span>CỨ XÂY. CỨ HỌC. CỨ TỐT HƠN.</span></div></section>;
}
