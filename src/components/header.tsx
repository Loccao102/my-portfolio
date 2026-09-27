'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from './icons';

const links = [['Dự án', '/work'], ['Hệ thống', '/work?category=systems'], ['Thử nghiệm', '/lab'], ['Đang làm', '/now'], ['Về tôi', '/about']];

export function Header() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('HÀ NỘI, VN');
  const pathname = usePathname();
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' ICT');
    update(); const interval = setInterval(update, 60000); return () => clearInterval(interval);
  }, []);
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="Loc — trang chủ"><span className="wordmark">LOC<span className="brand-dot">/</span></span><span className="brand-descriptor">CAO TIẾN LỘC<span>XƯỞNG KỸ THUẬT CÁ NHÂN</span></span></Link>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Điều hướng chính">
      <Link href="/" onClick={() => setOpen(false)} className={pathname === '/' ? 'active' : ''}>Trang chủ</Link>
      {links.map(([label, href]) => <Link href={href} key={label} onClick={() => setOpen(false)} className={pathname === href && label !== 'Hệ thống' ? 'active' : ''}>{label}</Link>)}
    </nav>
    <div className="header-meta"><Link href="/#contact" className="availability"><i />Đang mở cơ hội mới<ArrowUpRight size={12} /></Link><span className="clock">{time}</span></div>
    <button className="mobile-menu" aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </header>;
}
