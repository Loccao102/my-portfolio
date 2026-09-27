'use client';
import Link from 'next/link';
import { useState } from 'react';
import { featuredProjects, profile } from '@/data/projects';
import { Status } from './status';
import { ArrowRight, ArrowUpRight, Code2, FlaskConical, Box, FileText, MapPin } from './icons';
import { Sen } from './sen/sen';

export function Workshop() {
  const [active, setActive] = useState<string | null>(null);
  return <section className="hero-stage" aria-label="Xưởng kỹ thuật cá nhân">
    <div className="hero-copy">
      <div className="eyebrow"><span className="little-line" />CAO TIẾN LỘC <span className="eyebrow-code">&lt;/&gt;</span></div>
      <h1>Xây hệ thống<br /><em>chịu được áp lực thật.</em></h1>
      <p className="hero-lead">Tôi làm backend, fullstack,<br />và những thứ đáng để thử.</p>
      <p className="hero-description">Có sản phẩm chạy thật. Có thử nghiệm hơi lạ.<br />Mọi thứ đều đang tiếp tục được cải thiện.</p>
      <div className="hero-actions"><Link className="button primary" href="/work">Xem các dự án<ArrowRight size={17} /></Link><Link className="button secondary" href={profile.resumeUrl || '/about#experience'}>Kinh nghiệm làm việc<FileText size={16} /></Link></div>
      <div className="hero-location"><span><i />Đang mở cho cơ hội phù hợp</span><span><MapPin size={12} />Hà Nội, Việt Nam</span></div>
      <div className="disciplines">
        <Link href="/work?category=systems"><Code2 /><span>Hệ thống<small>Chạy ngoài đời thật</small></span></Link>
        <Link href="/lab"><FlaskConical /><span>Thử nghiệm<small>Bắt đầu từ “nếu như?”</small></span></Link>
        <Link href="/work?category=tools"><Box /><span>Công cụ<small>Làm để dùng được</small></span></Link>
      </div>
    </div>
    <div className={'artifact-world ' + (active ? 'highlight-' + active : '')} aria-label="Dự án nổi bật">
      <svg className="world-connections" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><path d="M350 440 L480 500 L750 425 L840 330 M480 500 L520 240" /><circle r="3"><animateMotion dur="9s" repeatCount="indefinite" path="M350 440 L480 500 L750 425 L840 330" /></circle></svg>
      {featuredProjects.map((project, i) => <Link key={project.id} href={'/work/' + project.id} className={'artifact-label artifact-' + (i + 1)} onMouseEnter={() => setActive(project.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(project.id)} onBlur={() => setActive(null)}>
        <div className="artifact-top"><span className="artifact-number">0{i + 1}</span><ArrowUpRight size={17} /></div>
        <h2>{project.name}</h2><p>{project.subtitle}</p><span className="artifact-stack">{project.stack.slice(0, 3).join(' · ')}</span>
        <div className="artifact-bottom"><Status status={project.status} /><span className="artifact-view">Xem<ArrowRight size={12} /></span></div>
      </Link>)}
    </div>
    <Sen />
    <div className="scene-caption"><span className="crosshair">+</span>MỘT VÀI THỨ ĐANG Ở TRÊN BÀN LÀM VIỆC<span className="caption-line" />CHỌN MỘT DỰ ÁN ĐỂ XEM KỸ HƠN</div>
    <span className="hero-edition">HÀ NỘI, VIỆT NAM <span>—</span> LUÔN ĐANG HOÀN THIỆN</span>
  </section>;
}
