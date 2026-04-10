import type { Metadata } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'About SBTI: project positioning, methodology, content boundary, roadmap and collaboration notes',
  description:
    'Learn what SBTI is designed for, how we frame entertainment-first personality content, and where the boundary lies between playful expression and professional diagnosis. This page also covers roadmap and contact context.',
  alternates: {
    canonical: toAbsoluteUrl('/about'),
    languages: {
      en: toAbsoluteUrl('/about'),
      'zh-CN': toAbsoluteUrl('/zh/about'),
      'x-default': toAbsoluteUrl('/about'),
    },
  },
};

export default function AboutPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>About SBTI</p>
        <h1>About</h1>
        <p className="type-desc">
          SBTI is an entertainment-first personality test project built for playful, shareable, and
          internet-native self-expression.
        </p>
        <Link href="/">Back to homepage test</Link>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          Our content is inspired by contemporary online culture and uses humorous labels to reflect
          everyday emotional states. Test results are for entertainment only and should not be used
          as medical, psychological, legal, or hiring evidence.
        </p>
      </section>
    </main>
  );
}
