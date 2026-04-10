import type { Metadata } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'SBTI Terms of Use: entertainment boundary, disclaimer, usage rules and user responsibility',
  description:
    'Read the SBTI terms of use, including entertainment-only scope, non-diagnostic disclaimer, content usage expectations, and policy update rights, so you clearly understand the legal and practical boundary before using the site.',
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
          1. This test is provided for entertainment and social sharing only. It is not medical,
          psychological, legal, or hiring evidence.
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
