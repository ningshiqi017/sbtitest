import type { Metadata } from 'next';
import Link from 'next/link';
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from '@/lib/seo-schema';
import { toAbsoluteUrl } from '@/lib/site';

const pagePath = '/what-is-sbti';
const pageUrl = toAbsoluteUrl(pagePath);

export const metadata: Metadata = {
  title: 'What is SBTI test: meaning, format, and online quick guide',
  description:
    'Learn what SBTI test means, how SBTI online works, what results include, and why it is built for playful sharing instead of clinical personality diagnosis.',
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      'zh-CN': toAbsoluteUrl('/zh/what-is-sbti'),
      'x-default': pageUrl,
    },
  },
  openGraph: {
    title: 'What is SBTI test: meaning, format, and online quick guide',
    description:
      'Learn what SBTI test means, how SBTI online works, what results include, and why it is built for playful sharing instead of clinical personality diagnosis.',
    url: pageUrl,
    locale: 'en_US',
  },
  twitter: {
    title: 'What is SBTI test: meaning, format, and online quick guide',
    description:
      'Learn what SBTI test means, how SBTI online works, what results include, and why it is built for playful sharing instead of clinical personality diagnosis.',
  },
};

const faqSchema = createFaqSchema([
  {
    question: 'What does SBTI mean?',
    answer:
      'SBTI means Silly Big Personality Test, a playful internet-native personality quiz built for entertainment and social sharing.',
  },
  {
    question: 'Is SBTI a scientific personality diagnosis?',
    answer:
      'No. SBTI test is for entertainment and expression. It is not a clinical or academic diagnostic tool.',
  },
  {
    question: 'Is SBTI related to climate SBTi?',
    answer:
      'No. This site uses SBTI to mean Silly Big Personality Test, not Science Based Targets initiative.',
  },
]);

const webPageSchema = createWebPageSchema({
  name: 'What is SBTI test',
  description:
    'An explainer page for SBTI test meaning, scope, and usage boundaries in SBTI online context.',
  url: pageUrl,
  inLanguage: 'en-US',
});

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: toAbsoluteUrl('/') },
  { name: 'What is SBTI', url: pageUrl },
]);

export default function WhatIsSbtiPage() {
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
        <p>SBTI Guide</p>
        <h1>What is SBTI test?</h1>
        <p className="type-desc">
          SBTI test means Silly Big Personality Test, a fast and playful format for internet-native
          self-description. It is designed for entertainment and sharing, not for diagnosis.
        </p>
        <div className="type-detail-nav">
          <Link href="/">Back to homepage test</Link>
          <Link href="/sbti-vs-mbti">Read SBTI vs MBTI</Link>
          <Link href="/how-sbti-test-works">See how the test works</Link>
        </div>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          On this site, SBTI specifically means a personality test product. It does not refer to
          climate policy terms that use a similar acronym.
        </p>
        <p className="type-desc">
          The SBTI online flow focuses on short completion time, clear result labels, and instant
          social sharing. Users can finish the quiz in a modal and get a type summary without leaving
          the homepage context.
        </p>
        <p className="type-desc">
          If you are choosing between frameworks, continue to the comparison page for a direct SBTI
          vs MBTI breakdown by goal, tone, and use case.
        </p>
      </section>
    </main>
  );
}
