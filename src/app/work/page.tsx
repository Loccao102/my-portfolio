import { Suspense } from 'react';
import { ProjectBrowser } from '@/components/project-browser';
export const metadata = { title: 'The workshop' };
export default function WorkPage() { return <main id="main" className="inner-page"><div className="page-intro"><span className="eyebrow">THE WORKSHOP / PROJECT INDEX</span><h1>Real systems.<br /><em>Curious ideas.</em></h1><p>A collection of professional experience, public projects, and documented experiments. Explore the work and the sources behind it.</p></div><Suspense><ProjectBrowser /></Suspense></main>; }
