import Link from 'next/link';
import { ArrowUpRight, Github } from './icons';
import { Lotus } from './lotus';
import { profile } from '@/data/projects';

export function Contact() {
  return <section className="contact-section" id="contact"><div><span className="eyebrow">CÓ BÀI TOÁN NÀO ĐANG CẦN NGƯỜI LÀM?</span><h2>Cùng xây<br /><em>một thứ đáng để dùng.</em></h2></div><div className="contact-side"><p>Tôi đang mở cho các vị trí engineering,<br />cộng tác phù hợp và những bài toán đủ thú vị.</p><a className="button primary" href={profile.email ? 'mailto:' + profile.email : profile.github} target={profile.email ? undefined : '_blank'} rel="noreferrer">{profile.email ? 'Liên hệ với tôi' : 'Mở GitHub'}<ArrowUpRight size={18} /></a><span><i />Hà Nội, Việt Nam · Đang mở cơ hội mới</span></div></section>;
}
export function Footer() {
  return <footer className="site-footer"><Link className="footer-brand" href="/"><Lotus />LOC /<span>Một engineering workshop luôn đang sống.</span></Link><span>Làm cẩn thận. Luôn còn chỗ để tốt hơn.</span><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub của Cao Tiến Lộc"><Github size={17} /><ArrowUpRight size={13} /></a><span>© {new Date().getFullYear()} CAO TIẾN LỘC</span></footer>;
}
