import { BuildsPanel } from '@/components/activity-panels';
import { getActivity } from '@/lib/github';
export const metadata = { title: 'Build log' };
export const revalidate = 3600;
export default async function BuildsPage() { const activity = await getActivity(); return <main id="main" className="inner-page"><div className="page-intro"><span className="eyebrow">THE ENGINEERING LOG</span><h1>Small steps.<br /><em>Real progress.</em></h1><p>Actual commits from the workshop. A live window into what’s being built, fixed, and explored.</p></div><BuildsPanel full activity={activity} /></main>; }
