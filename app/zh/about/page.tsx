import type { Metadata } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    '关于SBTI项目的定位与方法说明：内容边界、更新计划、合作方式、审核标准与常见问题答复｜适合年轻用户自测与社交传播使用',
  description:
    '关于页面介绍SBTI项目的定位、目标用户与内容方法，说明我们为什么采用轻松幽默的人格表达框架，以及测试结果在使用上的边界。你还能查看站点更新计划、内容审核原则与合作沟通方式，理解我们如何在保证好玩和可分享的同时，持续提升页面质量、信息透明度与长期可读性。本页也会同步公开改版说明，便于用户与合作方及时了解项目方向变化。',
  alternates: {
    canonical: toAbsoluteUrl('/zh/about'),
    languages: {
      en: toAbsoluteUrl('/about'),
      'zh-CN': toAbsoluteUrl('/zh/about'),
      'x-default': toAbsoluteUrl('/about'),
    },
  },
};

export default function ZhAboutPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>About SBTI</p>
        <h1>关于我们</h1>
        <p className="type-desc">SBTI 是一个娱乐向人格测试项目，目标是提供轻松、好玩、可分享的互动体验。</p>
        <Link href="/zh">返回首页测试</Link>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          本项目以中文互联网语境为灵感，强调自嘲式表达和社交传播。测试内容仅供娱乐，不构成任何专业心理诊断建议。
        </p>
      </section>
    </main>
  );
}
