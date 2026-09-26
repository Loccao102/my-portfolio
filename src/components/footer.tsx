import Link from 'next/link';
import { ArrowUpRight, Github } from './icons';
import { Lotus } from './lotus';
import { profile } from '@/data/projects';
export function Contact() {
  return <section className="contact-section" id="contact"><div><span className="eyebrow">HAVE SOMETHING IN MIND?</span><h2>Let’s build<br /><em>something that matters.</em></h2></div><div className="contact-side"><p>I’m open to engineering roles, thoughtful<br />collaborations, and interesting problems.</p><a className="button primary" href={profile.email ? `mailto:${profile.email}` : profile.github} target={profile.email ? undefined : '_blank'} rel="noreferrer">{profile.email ? 'Say hello' : 'Find me on GitHub'}<ArrowUpRight size={18} /></a><span><i />Hanoi, Vietnam · Open to opportunities</span></div></section>;
}
export function Footer() {
  return <footer className="site-footer"><Link className="footer-brand" href="/"><Lotus />LOC /<span>A living engineering workshop.</span></Link><span>Built with care. Always in progress.</span><a href={profile.github} target="_blank" rel="noreferrer" aria-label="Cao Tien Loc on GitHub"><Github size={17} /><ArrowUpRight size={13} /></a><span>© {new Date().getFullYear()} CAO TIẾN LỘC</span></footer>;
}
