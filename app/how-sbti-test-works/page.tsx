import type { Metadata } from 'next';
import Link from 'next/link';
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from '@/lib/seo-schema';
import { toAbsoluteUrl } from '@/lib/site';

const pagePath = '/how-sbti-test-works';
const pageUrl = toAbsoluteUrl(pagePath);

export const metadata: Metadata = {
  title: 'How SBTI test works: 30 questions, scoring, and result flow',
  description:
    'Understand the SBTI online process: one-by-one modal questions, auto-advance answering, dimension scoring logic, and how your SBTI test result is generated.',
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      'zh-CN': toAbsoluteUrl('/zh/how-sbti-test-works'),
      'x-default': pageUrl,
    },
  },
  openGraph: {
    title: 'How SBTI test works: 30 questions, scoring, and result flow',
    description:
      'Understand the SBTI online process: one-by-one modal questions, auto-advance answering, dimension scoring logic, and how your SBTI test result is generated.',
    url: pageUrl,
    locale: 'en_US',
  },
  twitter: {
    title: 'How SBTI test works: 30 questions, scoring, and result flow',
    description:
      'Understand the SBTI online process: one-by-one modal questions, auto-advance answering, dimension scoring logic, and how your SBTI test result is generated.',
  },
};

const faqSchema = createFaqSchema([
  {
    question: 'How many questions are in the SBTI test?',
    answer:
      'The current SBTI online build uses 30 core questions and may insert conditional bonus questions based on selected options.',
  },
  {
    question: 'Does SBTI test auto-advance?',
    answer:
      'Yes. After you select an option, the quiz moves to the next question automatically, while still allowing a previous-step return.',
  },
  {
    question: 'What do I get after submitting the SBTI test?',
    answer:
      'You receive a final type label, dimension scores, and a short summary prepared for quick social sharing.',
  },
]);

const webPageSchema = createWebPageSchema({
  name: 'How SBTI test works',
  description: 'Method page for SBTI test question flow, scoring, and result generation.',
  url: pageUrl,
  inLanguage: 'en-US',
});

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: toAbsoluteUrl('/') },
  { name: 'How SBTI test works', url: pageUrl },
]);

export default function HowSbtiWorksPage() {
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
        <p>Method Guide</p>
        <h1>How SBTI test works</h1>
        <p className="type-desc">
          The SBTI online flow is designed for fast completion: answer one question at a time, get
          instant scoring, and receive a share-ready result without leaving the homepage context.
        </p>
        <p className="type-meta">Last updated: April 10, 2026 · Version: 2026.04</p>
        <div className="type-detail-nav">
          <Link href="/">Back to homepage test</Link>
          <Link href="/what-is-sbti">What is SBTI</Link>
          <Link href="/types">Browse all types</Link>
        </div>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          The current build includes 30 core questions across 15 dimensions. Certain answers can
          trigger additional conditional questions to improve result stability.
        </p>
        <p className="type-desc">
          Interaction is one-by-one in a modal: choose an option to auto-advance, use previous to
          revise when needed, and submit at the final step.
        </p>
        <p className="type-desc">
          After submission, the system computes a type label, summarizes your tendencies, and returns
          a compact result block designed for social posting and type-page deep reading.
        </p>
      </section>
    </main>
  );
}
