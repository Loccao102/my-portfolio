import Link from 'next/link';
export default function NotFound() {
  return <main id="main" className="not-found"><span className="eyebrow" style={{ justifyContent: 'center' }}>404 / KHÔNG CÓ TRÊN BÀN LÀM VIỆC</span><h1>Trang này chưa có.<br /><em>Ít nhất là hiện tại.</em></h1><p>Nó chưa thuộc workshop này.</p><Link className="button primary" href="/">Về trang chủ →</Link></main>;
}
