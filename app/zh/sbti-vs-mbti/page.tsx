import type { Metadata } from 'next';
import Link from 'next/link';
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from '@/lib/seo-schema';
import { toAbsoluteUrl } from '@/lib/site';

const pagePath = '/zh/sbti-vs-mbti';
const pageUrl = toAbsoluteUrl(pagePath);

export const metadata: Metadata = {
  title: 'SBTI和MBTI有什么区别：目标、玩法和适用场景对比',
  description:
    '本页用直白方式对比SBTI和MBTI，包括测试目的、题目风格、结果表达和使用场景，帮助你快速判断哪种更适合当前需求。',
  alternates: {
    canonical: pageUrl,
    languages: {
      en: toAbsoluteUrl('/sbti-vs-mbti'),
      'zh-CN': pageUrl,
      'x-default': toAbsoluteUrl('/sbti-vs-mbti'),
    },
  },
  openGraph: {
    title: 'SBTI和MBTI有什么区别：目标、玩法和适用场景对比',
    description:
      '本页用直白方式对比SBTI和MBTI，包括测试目的、题目风格、结果表达和使用场景，帮助你快速判断哪种更适合当前需求。',
    url: pageUrl,
    locale: 'zh_CN',
  },
};

const faqSchema = createFaqSchema([
  {
    question: 'SBTI 比 MBTI 更准吗？',
    answer: '两者目标不同。MBTI 偏结构化认知，SBTI 偏娱乐表达和社交传播，不能直接按“更准”比较。',
  },
  {
    question: '我应该测 MBTI 还是 SBTI？',
    answer: '想快速参与和分享可以先测 SBTI；想做更长期的结构化自我观察可以参考 MBTI。',
  },
  {
    question: 'SBTI 和 MBTI 可以一起看吗？',
    answer: '可以。很多用户把 MBTI 当长期框架，把 SBTI 当即时表达层。',
  },
]);

const webPageSchema = createWebPageSchema({
  name: 'SBTI和MBTI区别',
  description: 'SBTI 与 MBTI 的目标、结果和使用场景对比说明。',
  url: pageUrl,
  inLanguage: 'zh-CN',
});

const breadcrumbSchema = createBreadcrumbSchema([
  { name: '首页', url: toAbsoluteUrl('/zh') },
  { name: 'SBTI和MBTI区别', url: pageUrl },
]);

export default function ZhSbtiVsMbtiPage() {
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
        <p>对比指南</p>
        <h1>SBTI 和 MBTI 有什么区别？</h1>
        <p className="type-desc">
          两者都能帮助你表达自我，但路径不同：MBTI 更偏理论框架，SBTI 更偏互联网语境下的快速共鸣与分享。
        </p>
        <p className="type-meta">更新时间：2026-04-10 · 版本：2026.04</p>
        <div className="type-detail-nav">
          <Link href="/zh">返回首页测试</Link>
          <Link href="/zh/what-is-sbti">什么是 SBTI</Link>
          <Link href="/zh/how-sbti-test-works">测试怎么测</Link>
        </div>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          MBTI 更常用于长期自我认知与沟通讨论，结果表达偏结构化；SBTI 则更强调轻松、好玩和社交语境中的即时表达。
        </p>
        <p className="type-desc">
          在结果呈现上，SBTI 会使用更互联网化的标签和描述，便于在社交平台快速转发与破冰。
        </p>
        <p className="type-desc">
          你可以把 MBTI 当“长期理解自己”的框架，把 SBTI 当“快速介绍自己”的工具，两者并不冲突。
        </p>
      </section>
    </main>
  );
}
