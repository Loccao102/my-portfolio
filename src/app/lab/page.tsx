import { Suspense } from 'react';
import { ProjectBrowser } from '@/components/project-browser';
export const metadata = { title: 'Phòng lab' };
export default function LabPage() {
  return <main id="main" className="inner-page"><div className="page-intro"><span className="eyebrow">PHÍA THỬ NGHIỆM</span><h1>Mọi thứ bắt đầu từ<br /><em>“nếu như?”</em></h1><p>Thế giới mô phỏng. Một bông sen có tính cách. 3D, AI và các ý tưởng có thể trở thành sản phẩm — hoặc ít nhất dạy tôi thêm một thứ mới.</p></div><Suspense><ProjectBrowser initialCategory="lab" /></Suspense></main>;
}
