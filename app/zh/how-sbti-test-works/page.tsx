import type { Metadata } from 'next';
import Link from 'next/link';
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from '@/lib/seo-schema';
import { toAbsoluteUrl } from '@/lib/site';

const pagePath = '/zh/how-sbti-test-works';
const pageUrl = toAbsoluteUrl(pagePath);

export const metadata: Metadata = {
  title: 'SBTI测试怎么测：题目数量、计分逻辑与结果生成流程',
  description:
    '本页说明SBTI在线测试的完整流程，包括30道主问题、单题自动下一题、维度评分方式，以及结果是如何生成并用于分享的。',
  alternates: {
    canonical: pageUrl,
    languages: {
      en: toAbsoluteUrl('/how-sbti-test-works'),
      'zh-CN': pageUrl,
      'x-default': toAbsoluteUrl('/how-sbti-test-works'),
    },
  },
  openGraph: {
    title: 'SBTI测试怎么测：题目数量、计分逻辑与结果生成流程',
    description:
      '本页说明SBTI在线测试的完整流程，包括30道主问题、单题自动下一题、维度评分方式，以及结果是如何生成并用于分享的。',
    url: pageUrl,
    locale: 'zh_CN',
  },
};

const faqSchema = createFaqSchema([
  {
    question: 'SBTI 一共有多少题？',
    answer: '当前版本有 30 道主问题，并会根据作答触发补充题分支。',
  },
  {
    question: '选择答案后会自动下一题吗？',
    answer: '会。点击选项后会自动进入下一题，同时保留上一题返回按钮。',
  },
  {
    question: '提交后能看到什么结果？',
    answer: '会显示人格类型、维度评分和可分享的简要解读内容。',
  },
]);

const webPageSchema = createWebPageSchema({
  name: 'SBTI测试怎么测',
  description: 'SBTI 测试流程、计分和结果生成说明页。',
  url: pageUrl,
  inLanguage: 'zh-CN',
});

const breadcrumbSchema = createBreadcrumbSchema([
  { name: '首页', url: toAbsoluteUrl('/zh') },
  { name: 'SBTI测试怎么测', url: pageUrl },
]);

export default function ZhHowSbtiWorksPage() {
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
        <p>方法说明</p>
        <h1>SBTI 测试怎么测？</h1>
        <p className="type-desc">
          这是一套首页弹窗内完成的逐题测试流程：点击即答、自动下一题、即时出结果，整体偏轻量和高可分享。
        </p>
        <div className="type-detail-nav">
          <Link href="/zh">返回首页测试</Link>
          <Link href="/zh/what-is-sbti">什么是 SBTI</Link>
          <Link href="/zh/types">查看全部人格</Link>
        </div>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          当前版本包含 30 道主问题，覆盖 15 个维度。根据你在关键题目的选择，系统会按规则插入补充题进行细化判断。
        </p>
        <p className="type-desc">
          答题交互为单题模式：你选择一个答案后会自动跳到下一题；如果要修改，仍可点击上一题返回调整。
        </p>
        <p className="type-desc">
          提交后系统会输出人格标签、维度评分和简要解释，既能快速理解，也便于复制到社交平台进行分享讨论。
        </p>
      </section>
    </main>
  );
}
