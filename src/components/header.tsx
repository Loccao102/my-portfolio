'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from './icons';

const links = [['Workshop', '/work'], ['Systems', '/work?category=systems'], ['Lab', '/lab'], ['Now', '/now'], ['About', '/about']];
export function Header() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('HANOI, VN');
  const pathname = usePathname();
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + '  ICT');
    update(); const interval = setInterval(update, 60000); return () => clearInterval(interval);
  }, []);
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="Loc — home"><span className="wordmark">LOC<span className="brand-dot">/</span></span><span className="brand-descriptor">CAO TIẾN LỘC<span>ENGINEERING WORKSHOP</span></span></Link>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
      <Link href="/" onClick={() => setOpen(false)} className={pathname === '/' ? 'active' : ''}>Home</Link>
      {links.map(([label, href]) => <Link href={href} key={label} onClick={() => setOpen(false)} className={pathname === href && label !== 'Systems' ? 'active' : ''}>{label}</Link>)}
    </nav>
    <div className="header-meta"><Link href="/#contact" className="availability"><i />Available for work<ArrowUpRight size={12} /></Link><span className="clock">{time}</span></div>
    <button className="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </header>;
}
