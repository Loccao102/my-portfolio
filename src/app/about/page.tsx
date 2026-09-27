import Link from 'next/link';
import { Contact } from '@/components/footer';
import { Lotus } from '@/components/lotus';
import { ArrowUpRight } from '@/components/icons';
import { experience, skillGroups, resumeSource } from '@/data/experience';
import { profile } from '@/data/projects';

export const metadata = { title: 'Cao Tiến Lộc', description: 'Fullstack .NET developer với kinh nghiệm ở nền tảng thanh toán, dịch vụ công và hệ thống thi realtime.' };

export default function AboutPage() {
  return <main id="main"><div className="inner-page">
    <div className="about-layout"><div>
      <div className="page-intro"><span className="eyebrow">NGƯỜI ĐỨNG SAU BÀN LÀM VIỆC</span><h1>Engineer trước tiên.<br /><em>Luôn tò mò.</em></h1><p>Tôi là Cao Tiến Lộc, một Fullstack .NET Developer tại Hà Nội. Công việc của tôi trải từ payment integration, dịch vụ công đến hệ thống thi realtime — thường là những chỗ mà dữ liệu phải đúng, retry phải an toàn và lỗi cần truy ra được.</p></div>
      <div className="experience" id="experience">
        <span className="eyebrow">KINH NGHIỆM LÀM VIỆC</span><h2>Những hệ thống có người dùng thật phụ thuộc vào.</h2>
        <p>Stack chính của tôi là C# / ASP.NET Core, Angular và SQL Server. Tôi làm từ application logic, frontend workflow đến database performance; đã có kinh nghiệm phụ trách module team, review code và xử lý những giai đoạn deadline khá gắt.</p>
        <div className="career-timeline">{experience.map(job => <article className="career-entry" key={job.company}><div className="career-heading"><h3>{job.company}</h3><span>{job.period}</span></div><p className="career-role">{job.role}</p><h4>{job.focus}</h4><div className="stack-tags">{job.stack.map(tech => <span key={tech}>{tech}</span>)}</div><ul>{job.highlights.map(item => <li key={item}>{item}</li>)}</ul>{job.project && <Link className="text-link" href={job.project}>Xem case study hệ thống thi<ArrowUpRight size={15} /></Link>}</article>)}</div>
        <p className="source-note">{resumeSource.note}</p>
      </div>
    </div><aside className="about-aside"><Lotus className="lotus-mark" /><span className="eyebrow">BẮT ĐẦU TỪ VIỆT NAM</span><h2 style={{ marginTop: 20 }}>Một bàn làm việc,<br />có thêm một chút “hồn”.</h2><p>Ngoài công việc chính, tôi hay thử những thứ như agent security, social simulation, WebGL và Sen — một companion hình hoa sen mang cảm hứng Việt Nam.</p><p>Hoa sen là sợi chỉ nhỏ xuyên suốt portfolio này: quen thuộc, hơi mềm hơn phần engineering và nhắc tôi rằng sản phẩm không chỉ cần chạy được.</p><Link className="text-link" href="/work/sen">Gặp Sen<ArrowUpRight size={16} /></Link>
      <div className="about-education"><span className="eyebrow">HỌC VẤN</span><h3>Đại học Xây dựng Hà Nội</h3><p>Khoa Công nghệ Thông tin · Kỹ thuật phần mềm<br />2021–2025 · Tốt nghiệp</p><span className="eyebrow">NGÔN NGỮ</span><p>Tiếng Anh B2 · Tiếng Nhật N5</p></div>
      <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Kết nối trên LinkedIn<ArrowUpRight size={16} /></a>{profile.resumeUrl && <a className="button secondary" href={profile.resumeUrl} target="_blank" rel="noreferrer">Xem CV PDF<ArrowUpRight size={16} /></a>}
    </aside></div>
    <section className="skills-section" aria-label="Kỹ năng kỹ thuật"><span className="eyebrow">BỘ CÔNG CỤ</span><h2>Stack đủ thực dụng để đưa việc về đích.</h2><div className="skills-grid">{skillGroups.map(group => <article key={group.name}><h3>{group.name}</h3><p>{group.items}</p></article>)}</div></section>
  </div><Contact /></main>;
}
