import { NowPanel, BuildsPanel } from '@/components/activity-panels';
import { getActivity } from '@/lib/github';
export const metadata = { title: 'Now' };
export const revalidate = 3600;
export default async function NowPage() { const activity = await getActivity(); return <main id="main" className="inner-page"><div className="page-intro"><span className="eyebrow">ON THE WORKBENCH</span><h1>Currently<br /><em>in motion.</em></h1><p>A selection from the workbench, with the latest actual commit from each public repository.</p></div><NowPanel full activity={activity} /><BuildsPanel full activity={activity} /></main>; }
