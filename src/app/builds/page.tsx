import { BuildsPanel } from '@/components/activity-panels';
import { getActivity } from '@/lib/github';
export const metadata = { title: 'Build log' };
export const revalidate = 3600;
export default async function BuildsPage() {
  const activity = await getActivity();
  return <main id="main" className="inner-page"><div className="page-intro"><span className="eyebrow">NHẬT KÝ ENGINEERING</span><h1>Từng thay đổi nhỏ.<br /><em>Tiến độ thật.</em></h1><p>Commit public từ các project đang theo dõi — một cửa sổ nhỏ để thấy thứ gì vừa được build, sửa hoặc thử.</p></div><BuildsPanel full activity={activity} /></main>;
}
