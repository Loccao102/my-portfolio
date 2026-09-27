import { Suspense } from 'react';
import { ProjectBrowser } from '@/components/project-browser';
export const metadata = { title: 'Dự án' };
export default function WorkPage() {
  return <main id="main" className="inner-page"><div className="page-intro"><span className="eyebrow">DANH SÁCH DỰ ÁN</span><h1>Hệ thống chạy thật.<br /><em>Ý tưởng đáng để thử.</em></h1><p>Gồm kinh nghiệm nghề nghiệp, project public và các thử nghiệm có tài liệu đi kèm. Bạn có thể đọc nhanh bằng bài toán / kết quả trước, rồi đi sâu xuống stack và source nếu muốn.</p></div><Suspense><ProjectBrowser /></Suspense></main>;
}
