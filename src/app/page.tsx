import Link from 'next/link';
import { Suspense } from 'react';
import { Workshop } from '@/components/workshop';
import { NowPanel, BuildsPanel, StatusPanel } from '@/components/activity-panels';
import { ProjectBrowser } from '@/components/project-browser';
import { Contact } from '@/components/footer';
import { ArrowUpRight, ArrowRight, Code2, FlaskConical } from '@/components/icons';
import { getActivity } from '@/lib/github';
export const revalidate = 3600;
export default async function Home() {
  const activity = await getActivity();
  return <main id="main"><div className="landing"><div className="studio-backdrop" /><Workshop /><div className="workshop-panels"><NowPanel activity={activity} /><BuildsPanel activity={activity} /><StatusPanel /></div><div className="landing-bottom"><span>A PERSONAL SPACE FOR SERIOUS WORK & CURIOUS IDEAS.</span><a href="#selected">There’s more below<span>↓</span></a></div></div>
    <section className="content-section selected-section" id="selected"><div className="section-heading"><div><span className="eyebrow">FROM THE WORKBENCH</span><h2>Built to solve.<br /><em>Made to explore.</em></h2></div><p>Public code. Documented progress.<br />Ideas that start with “what if.”<br />Each project links back to its sources.</p><Link className="text-link" href="/work">All projects<ArrowUpRight size={17} /></Link></div><Suspense><ProjectBrowser compact /></Suspense></section>
    <section className="two-worlds content-section"><Link href="/work?category=systems"><Code2 /><span className="eyebrow">THE ENGINEERING SIDE</span><h2>Calm systems.<br /><em>Under real pressure.</em></h2><p>Distributed services, reliable backends, and the decisions that make them work.</p><span className="text-link">Explore systems<ArrowRight size={16} /></span></Link><Link href="/lab"><FlaskConical /><span className="eyebrow">THE EXPERIMENTAL SIDE</span><h2>A little curiosity.<br /><em>A lot of possibility.</em></h2><p>AI companions, simulated worlds, and ideas that deserve a prototype.</p><span className="text-link">Step into the lab<ArrowRight size={16} /></span></Link></section>
    <Contact />
  </main>;
}
