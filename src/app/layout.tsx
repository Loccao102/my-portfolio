import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: { default: 'LOC / Living Engineering Workshop', template: '%s — LOC / Workshop' },
  description: 'Cao Tiến Lộc — backend-first, full-stack engineer. Real systems, strange experiments, and useful things. A living engineering workshop in Hanoi, Vietnam.',
  openGraph: { title: 'LOC / Living Engineering Workshop', description: 'Systems. Experiments. Useful things. The living workshop of Cao Tiến Lộc.', images: ['/images/workshop.webp'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a><Header />{children}<Footer /></body></html>;
}
