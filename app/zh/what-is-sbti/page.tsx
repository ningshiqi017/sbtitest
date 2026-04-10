import type { Metadata } from 'next';
import Link from 'next/link';
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from '@/lib/seo-schema';
import { toAbsoluteUrl } from '@/lib/site';

const pagePath = '/zh/what-is-sbti';
const pageUrl = toAbsoluteUrl(pagePath);

export const metadata: Metadata = {
  title: '什么是SBTI测试：定义、玩法、结果说明与使用边界',
  description:
    '本页解释SBTI测试是什么意思、测试结果包含什么、与心理诊断的边界在哪里，以及为什么它更适合娱乐表达和社交分享。',
  alternates: {
    canonical: pageUrl,
    languages: {
      en: toAbsoluteUrl('/what-is-sbti'),
      'zh-CN': pageUrl,
      'x-default': toAbsoluteUrl('/what-is-sbti'),
    },
  },
  openGraph: {
    title: '什么是SBTI测试：定义、玩法、结果说明与使用边界',
    description:
      '本页解释SBTI测试是什么意思、测试结果包含什么、与心理诊断的边界在哪里，以及为什么它更适合娱乐表达和社交分享。',
    url: pageUrl,
    locale: 'zh_CN',
  },
};

const faqSchema = createFaqSchema([
  {
    question: 'SBTI 是什么意思？',
    answer:
      '这里的 SBTI 指 Silly Big Personality Test，是一个娱乐向的人格测试产品。',
  },
  {
    question: 'SBTI 可以当心理诊断吗？',
    answer: '不可以。SBTI 测试仅用于娱乐表达和社交分享，不构成医学或心理诊断依据。',
  },
  {
    question: 'SBTI 和 SBTi（气候目标）有关吗？',
    answer: '无关。本站 SBTI 仅指人格测试语境，不是气候领域的 Science Based Targets initiative。',
  },
]);

const webPageSchema = createWebPageSchema({
  name: '什么是SBTI测试',
  description: '解释 SBTI 测试定义、用途和边界的说明页。',
  url: pageUrl,
  inLanguage: 'zh-CN',
});

const breadcrumbSchema = createBreadcrumbSchema([
  { name: '首页', url: toAbsoluteUrl('/zh') },
  { name: '什么是SBTI', url: pageUrl },
]);

export default function ZhWhatIsSbtiPage() {
  return (
    <main className="type-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="type-page-header">
        <p>SBTI 指南</p>
        <h1>什么是 SBTI 测试？</h1>
        <p className="type-desc">
          SBTI 测试是一个轻松、可分享、偏互联网语境的人格测试产品，目标是娱乐表达，不是专业诊断。
        </p>
        <div className="type-detail-nav">
          <Link href="/zh">返回首页测试</Link>
          <Link href="/zh/sbti-vs-mbti">查看 SBTI 和 MBTI 区别</Link>
          <Link href="/zh/how-sbti-test-works">查看测试如何进行</Link>
        </div>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          在本站语境里，SBTI 指的是 Silly Big Personality Test，不是气候领域中常见的 SBTi 缩写。
        </p>
        <p className="type-desc">
          SBTI 在线测试强调快速完成、结果直观、便于分享。用户可以在首页弹窗逐题作答，提交后立即获得人格标签和维度解读。
        </p>
        <p className="type-desc">
          如果你想进一步判断自己更适合哪类测试，可以继续阅读对比页，快速了解 SBTI 与 MBTI 的目标差异。
        </p>
      </section>
    </main>
  );
}
