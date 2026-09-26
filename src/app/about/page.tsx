import Link from 'next/link';
import { Contact } from '@/components/footer';
import { Lotus } from '@/components/lotus';
import { ArrowUpRight } from '@/components/icons';
import { experience, skillGroups, resumeSource } from '@/data/experience';
import { profile } from '@/data/projects';

export const metadata = { title: 'Cao Tiến Lộc', description: 'Fullstack .NET developer with experience in payment platforms, public services and realtime examination systems.' };

export default function AboutPage() {
  return <main id="main"><div className="inner-page">
    <div className="about-layout"><div>
      <div className="page-intro"><span className="eyebrow">THE PERSON BEHIND THE WORKBENCH</span>
        <h1>Engineer first.<br /><em>Always curious.</em></h1>
        <p>I’m Cao Tiến Lộc, a fullstack .NET developer in Hanoi, Vietnam. I bring more than two years of experience with enterprise and public systems, from payment integrations to realtime examinations.</p>
      </div>
      <div className="experience" id="experience">
        <span className="eyebrow">PROFESSIONAL EXPERIENCE</span><h2>Systems people depend on.</h2>
        <p>My core stack is C# / ASP.NET Core, Angular and SQL Server. I work across application logic, frontend workflows and database performance, with experience leading a module team, reviewing code and delivering under tight timelines.</p>
        <div className="career-timeline">{experience.map(job => <article className="career-entry" key={job.company}>
          <div className="career-heading"><h3>{job.company}</h3><span>{job.period}</span></div>
          <p className="career-role">{job.role}</p><h4>{job.focus}</h4>
          <div className="stack-tags">{job.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
          <ul>{job.highlights.map(item => <li key={item}>{item}</li>)}</ul>
          {job.project && <Link className="text-link" href={job.project}>Explore the examination case study<ArrowUpRight size={15} /></Link>}
        </article>)}</div>
        <p className="source-note">{resumeSource.note}</p>
      </div>
    </div><aside className="about-aside"><Lotus className="lotus-mark" /><span className="eyebrow">ROOTED IN VIETNAM</span>
      <h2 style={{ marginTop: 20 }}>A workshop,<br />with a little soul.</h2>
      <p>Outside my professional work, I explore agent security, social simulations, WebGL and Sen, a Vietnamese lotus companion.</p>
      <p>The lotus is a quiet thread through this space: a familiar form, a gentle pink, and a reminder to keep growing.</p>
      <Link className="text-link" href="/work/sen">Meet Sen<ArrowUpRight size={16} /></Link>
      <div className="about-education"><span className="eyebrow">EDUCATION</span><h3>Hanoi University of Civil Engineering</h3><p>Faculty of Information Technology · Software Engineering<br />2021–2025 · Graduated</p><span className="eyebrow">LANGUAGES</span><p>English B2 · Japanese N5</p></div>
      <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn<ArrowUpRight size={16} /></a>
      {profile.resumeUrl && <a className="button secondary" href={profile.resumeUrl} target="_blank" rel="noreferrer">View résumé PDF<ArrowUpRight size={16} /></a>}
    </aside></div>
    <section className="skills-section" aria-label="Technical skills"><span className="eyebrow">TOOLS OF THE TRADE</span><h2>A practical engineering toolkit.</h2><div className="skills-grid">{skillGroups.map(group => <article key={group.name}><h3>{group.name}</h3><p>{group.items}</p></article>)}</div></section>
  </div><Contact /></main>;
}
