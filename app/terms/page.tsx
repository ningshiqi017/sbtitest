import type { Metadata } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'SBTI test online terms: disclaimer, usage rules, legal scope',
  description:
    'Read SBTI test online terms to understand entertainment-only scope, boundaries, content usage rules, and update rights before using or sharing results.',
  alternates: {
    canonical: toAbsoluteUrl('/terms'),
    languages: {
      en: toAbsoluteUrl('/terms'),
      'zh-CN': toAbsoluteUrl('/zh/terms'),
      'x-default': toAbsoluteUrl('/terms'),
    },
  },
};

export default function TermsPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>Legal</p>
        <h1>Terms of Use</h1>
        <Link href="/">Back to homepage test</Link>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          1. SBTI test online is provided for entertainment and social sharing only. It is not
          medical, psychological, legal, or hiring evidence.
        </p>
        <p className="type-desc">
          2. Users must not use this website for illegal purposes, harassment, or malicious content
          distribution.
        </p>
        <p className="type-desc">
          3. We may update content, presentation, and policy text when necessary for product and
          compliance reasons.
        </p>
      </section>
    </main>
  );
}
