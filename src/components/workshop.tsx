'use client';
import Link from 'next/link';
import { useState } from 'react';
import { featuredProjects, profile } from '@/data/projects';
import { Status } from './status';
import { ArrowRight, ArrowUpRight, Code2, FlaskConical, Box, FileText, MapPin } from './icons';
import { Sen } from './sen/sen';

export function Workshop() {
  const [active, setActive] = useState<string | null>(null);
  return <section className="hero-stage" aria-label="Living engineering workshop">
    <div className="hero-copy">
      <div className="eyebrow"><span className="little-line" />CAO TIẾN LỘC <span className="eyebrow-code">&lt;/&gt;</span></div>
      <h1>Engineering<br /><em>under pressure.</em></h1>
      <p className="hero-lead">I build systems, experiments<br />and useful things.</p>
      <p className="hero-description">Real systems. Strange experiments.<br />A living workshop. Always improving.</p>
      <div className="hero-actions"><Link className="button primary" href="/work">Explore workshop<ArrowRight size={17} /></Link><Link className="button secondary" href={profile.resumeUrl || '/about#experience'}>View résumé<FileText size={16} /></Link></div>
      <div className="hero-location"><span><i />Available for new opportunities</span><span><MapPin size={12} />Hanoi, Vietnam</span></div>
      <div className="disciplines">
        <Link href="/work?category=systems"><Code2 /><span>Systems<small>Built for the real world</small></span></Link>
        <Link href="/lab"><FlaskConical /><span>Experiments<small>A little what if</small></span></Link>
        <Link href="/work?category=tools"><Box /><span>Useful tools<small>Made for people</small></span></Link>
      </div>
    </div>
    <div className={`artifact-world ${active ? `highlight-${active}` : ''}`} aria-label="Featured projects">
      <svg className="world-connections" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><path d="M350 440 L480 500 L750 425 L840 330 M480 500 L520 240" /><circle r="3"><animateMotion dur="9s" repeatCount="indefinite" path="M350 440 L480 500 L750 425 L840 330" /></circle></svg>
      {featuredProjects.map((project, i) => <Link key={project.id} href={`/work/${project.id}`} className={`artifact-label artifact-${i + 1}`} onMouseEnter={() => setActive(project.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(project.id)} onBlur={() => setActive(null)}>
        <div className="artifact-top"><span className="artifact-number">0{i + 1}</span><ArrowUpRight size={17} /></div>
        <h2>{project.name}</h2><p>{project.subtitle}</p><span className="artifact-stack">{project.stack.slice(0, 3).join(' · ')}</span>
        <div className="artifact-bottom"><Status status={project.status} /><span className="artifact-view">Explore<ArrowRight size={12} /></span></div>
      </Link>)}
    </div>
    <Sen />
    <div className="scene-caption"><span className="crosshair">+</span>A FEW THINGS ON MY WORKBENCH<span className="caption-line" />SELECT AN ARTIFACT TO EXPLORE</div>
    <span className="hero-edition">HANOI, VIETNAM <span>—</span> ALWAYS A WORK IN PROGRESS</span>
  </section>;
}
