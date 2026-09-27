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
  return <main id="main"><div className="landing"><div className="studio-backdrop" /><Workshop /><div className="workshop-panels"><NowPanel activity={activity} /><BuildsPanel activity={activity} /><StatusPanel /></div><div className="landing-bottom"><span>MỘT KHÔNG GIAN CHO CÔNG VIỆC NGHIÊM TÚC VÀ NHỮNG Ý TƯỞNG TÒ MÒ.</span><a href="#selected">Còn nữa ở phía dưới<span>↓</span></a></div></div>
    <section className="content-section selected-section" id="selected"><div className="section-heading"><div><span className="eyebrow">TỪ BÀN LÀM VIỆC</span><h2>Làm để giải quyết.<br /><em>Thử để đi xa hơn.</em></h2></div><p>Mã nguồn public khi có thể. Tiến độ có đối chiếu.<br />Ý tưởng bắt đầu từ một câu “nếu như”.<br />Mỗi project đều dẫn về nguồn của nó.</p><Link className="text-link" href="/work">Tất cả dự án<ArrowUpRight size={17} /></Link></div><Suspense><ProjectBrowser compact /></Suspense></section>
    <section className="two-worlds content-section"><Link href="/work?category=systems"><Code2 /><span className="eyebrow">PHÍA ENGINEERING</span><h2>Hệ thống bình tĩnh.<br /><em>Kể cả khi traffic không bình tĩnh.</em></h2><p>Backend, distributed services và những quyết định giúp hệ thống chạy ổn khi có áp lực thật.</p><span className="text-link">Xem hệ thống<ArrowRight size={16} /></span></Link><Link href="/lab"><FlaskConical /><span className="eyebrow">PHÍA THỬ NGHIỆM</span><h2>Một chút tò mò.<br /><em>Rất nhiều “nếu như”.</em></h2><p>AI companion, thế giới mô phỏng, 3D và những ý tưởng đáng để dựng prototype.</p><span className="text-link">Vào phòng lab<ArrowRight size={16} /></span></Link></section>
    <Contact />
  </main>;
}
