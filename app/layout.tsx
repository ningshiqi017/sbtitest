import type { Metadata } from 'next';
import Script from 'next/script';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import GlobalFooter from '@/components/global-footer';
import GlobalTopNav from '@/components/global-top-nav';
import { SITE_URL } from '@/lib/site';
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
  metadataBase: new URL(SITE_URL),
  title:
    'SBTI人格测试在线平台完整说明：首页即测、类型浏览、结果解读、社交分享、FAQ与类型索引导航系统总入口中心页',
  description:
    '这是一个面向中文互联网用户的SBTI人格测试站点，支持首页即时开测、弹窗逐题作答与结果页内展示，完成后可查看人格名称、维度评分和可分享内容。站点同时提供类型索引、人格详情、FAQ与合规页面，方便你理解SBTI是什么、它与MBTI的区别，以及在娱乐和社交场景中的使用边界。内容强调轻松表达而非心理诊断，适合自测与朋友讨论。',
  openGraph: {
    title:
      'SBTI人格测试在线平台完整说明：首页即测、类型浏览、结果解读、社交分享、FAQ与类型索引导航系统总入口中心页',
    description:
      '这是一个面向中文互联网用户的SBTI人格测试站点，支持首页即时开测、弹窗逐题作答与结果页内展示，完成后可查看人格名称、维度评分和可分享内容。站点同时提供类型索引、人格详情、FAQ与合规页面，方便你理解SBTI是什么、它与MBTI的区别，以及在娱乐和社交场景中的使用边界。内容强调轻松表达而非心理诊断，适合自测与朋友讨论。',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'SBTI人格测试在线平台完整说明：首页即测、类型浏览、结果解读、社交分享、FAQ与类型索引导航系统总入口中心页',
    description:
      '这是一个面向中文互联网用户的SBTI人格测试站点，支持首页即时开测、弹窗逐题作答与结果页内展示，完成后可查看人格名称、维度评分和可分享内容。站点同时提供类型索引、人格详情、FAQ与合规页面，方便你理解SBTI是什么、它与MBTI的区别，以及在娱乐和社交场景中的使用边界。内容强调轻松表达而非心理诊断，适合自测与朋友讨论。',
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
