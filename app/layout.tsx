import type { Metadata } from 'next';
import Script from 'next/script';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import GlobalFooter from '@/components/global-footer';
import GlobalTopNav from '@/components/global-top-nav';
import './globals.css';

const bodyFont = Noto_Sans_SC({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const displayFont = Noto_Serif_SC({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SBTI 人格测试 | SBTI 测试在线 · SBTI 是什么',
  description:
    'SBTI 人格测试在线版：首页即时开测，了解 SBTI 是什么、SBTI 与 MBTI 的区别，并查看完整人格类型与结果解读。',
  keywords: ['SBTI 人格测试', 'SBTI 测试在线', 'SBTI 是什么', 'SBTI MBTI', 'SBTI 人格类型'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SBTI 人格测试 | SBTI 测试在线',
    description: 'SBTI 是什么？在首页弹窗完成测试，查看人格结果与类型解读。',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBTI 人格测试 | SBTI 测试在线',
    description: 'SBTI 是什么？在线完成测试并查看人格类型。',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EC4BWJB62P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EC4BWJB62P');
          `}
        </Script>
        <GlobalTopNav />
        <div className="app-main">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
