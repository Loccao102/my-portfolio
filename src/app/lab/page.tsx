import { Suspense } from 'react';
import { ProjectBrowser } from '@/components/project-browser';
export const metadata = { title: 'The lab' };
export default function LabPage() { return <main id="main" className="inner-page"><div className="page-intro"><span className="eyebrow">THE EXPERIMENTAL SIDE</span><h1>It starts with<br /><em>“what if?”</em></h1><p>Simulated worlds. A lotus with a personality. Ideas that might become something useful — or simply teach me something new.</p></div><Suspense><ProjectBrowser initialCategory="lab" /></Suspense></main>; }
