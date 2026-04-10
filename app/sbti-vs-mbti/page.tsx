import type { Metadata } from 'next';
import Link from 'next/link';
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from '@/lib/seo-schema';
import { toAbsoluteUrl } from '@/lib/site';

const pagePath = '/sbti-vs-mbti';
const pageUrl = toAbsoluteUrl(pagePath);

export const metadata: Metadata = {
  title: 'SBTI vs MBTI: key differences, use cases, and what to choose',
  description:
    'Compare SBTI vs MBTI in plain language, including goals, question style, result format, and when each test fits better for sharing, fun, or reflection.',
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      'zh-CN': toAbsoluteUrl('/zh/sbti-vs-mbti'),
      'x-default': pageUrl,
    },
  },
  openGraph: {
    title: 'SBTI vs MBTI: key differences, use cases, and what to choose',
    description:
      'Compare SBTI vs MBTI in plain language, including goals, question style, result format, and when each test fits better for sharing, fun, or reflection.',
    url: pageUrl,
    locale: 'en_US',
  },
  twitter: {
    title: 'SBTI vs MBTI: key differences, use cases, and what to choose',
    description:
      'Compare SBTI vs MBTI in plain language, including goals, question style, result format, and when each test fits better for sharing, fun, or reflection.',
  },
};

const faqSchema = createFaqSchema([
  {
    question: 'Is SBTI more accurate than MBTI?',
    answer:
      'They have different goals. MBTI is a structured reflection framework, while SBTI test is an entertainment-first format for social expression.',
  },
  {
    question: 'Should I take MBTI or SBTI test?',
    answer:
      'Use MBTI for deeper structured reflection and use SBTI when you want a fast, fun, and shareable personality snapshot.',
  },
  {
    question: 'Can I use both SBTI and MBTI?',
    answer:
      'Yes. Many users treat MBTI as a long-form framework and SBTI as a quick social-expression layer.',
  },
]);

const webPageSchema = createWebPageSchema({
  name: 'SBTI vs MBTI',
  description: 'A direct comparison guide between SBTI test and MBTI use cases.',
  url: pageUrl,
  inLanguage: 'en-US',
});

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: toAbsoluteUrl('/') },
  { name: 'SBTI vs MBTI', url: pageUrl },
]);

export default function SbtiVsMbtiPage() {
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
        <p>Comparison Guide</p>
        <h1>SBTI vs MBTI</h1>
        <p className="type-desc">
          Both are personality frameworks, but they serve different moments. MBTI is model-first;
          SBTI test is culture-first and built for fast online sharing.
        </p>
        <p className="type-meta">Last updated: April 10, 2026 · Version: 2026.04</p>
        <div className="type-detail-nav">
          <Link href="/">Back to homepage test</Link>
          <Link href="/what-is-sbti">What is SBTI</Link>
          <Link href="/how-sbti-test-works">How SBTI test works</Link>
        </div>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          MBTI is commonly used for structured self-reflection and communication style discussion.
          SBTI online focuses on expressive labels that spread easily in social feeds.
        </p>
        <p className="type-desc">
          MBTI outcomes are often interpreted as stable patterns, while SBTI test outcomes are framed
          as playful snapshots of current internet-native behavior and mood.
        </p>
        <p className="type-desc">
          If your goal is quick participation and sharing with friends, SBTI is usually the better
          first step. If your goal is deeper long-form reflection, MBTI may be more suitable.
        </p>
      </section>
    </main>
  );
}
