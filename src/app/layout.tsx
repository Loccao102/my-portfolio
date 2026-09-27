import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: { default: 'LOC / Xưởng kỹ thuật của Cao Tiến Lộc', template: '%s — LOC / Workshop' },
  description: 'Cao Tiến Lộc — Backend-first Fullstack Engineer tại Hà Nội. Hệ thống chạy thật, các thử nghiệm lạ và những công cụ có ích.',
  openGraph: { title: 'LOC / Xưởng kỹ thuật của Cao Tiến Lộc', description: 'Hệ thống. Thử nghiệm. Công cụ. Portfolio sống của Cao Tiến Lộc.', images: ['/images/workshop.webp'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><a href="#main" className="skip-link">Bỏ qua điều hướng</a><Header />{children}<Footer /></body></html>;
}
