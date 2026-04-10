import type { Metadata } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'About SBTI test online: positioning, scope, method, roadmap',
  description:
    'Learn what SBTI test online is built for, how we design SBTI content, and where the boundary sits between playful expression and guidance on SBTI online.',
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
          SBTI test online is built for playful, shareable, and internet-native self-expression.
        </p>
        <Link href="/">Back to homepage test</Link>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          SBTI content is inspired by contemporary online culture and uses humorous labels to reflect
          everyday emotional states. SBTI test results are for entertainment only and should not be
          used as medical, psychological, legal, or hiring evidence.
        </p>
      </section>
    </main>
  );
}
