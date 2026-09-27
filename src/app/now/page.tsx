import { NowPanel, BuildsPanel } from '@/components/activity-panels';
import { getActivity } from '@/lib/github';
export const metadata = { title: 'Đang làm' };
export const revalidate = 3600;
export default async function NowPage() {
  const activity = await getActivity();
  return <main id="main" className="inner-page"><div className="page-intro"><span className="eyebrow">TRÊN BÀN LÀM VIỆC</span><h1>Những thứ<br /><em>đang chuyển động.</em></h1><p>Một vài project đang được ưu tiên, kèm commit public mới nhất từ từng repository để tiến độ không chỉ là lời kể.</p></div><NowPanel full activity={activity} /><BuildsPanel full activity={activity} /></main>;
}
