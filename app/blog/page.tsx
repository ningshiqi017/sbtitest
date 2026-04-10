import type { Metadata } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'SBTI online blog: test updates, type stories, and news feed',
  description:
    'The SBTI blog publishes SBTI test updates, quiz notes, type stories, and announcements. This section is under construction and opens after editorial review.',
  alternates: {
    canonical: toAbsoluteUrl('/blog'),
    languages: {
      en: toAbsoluteUrl('/blog'),
      'zh-CN': toAbsoluteUrl('/zh/blog'),
      'x-default': toAbsoluteUrl('/blog'),
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>SBTI Blog</p>
        <h1>Blog</h1>
        <p className="type-desc">
          This SBTI online blog will publish SBTI test updates, persona essays, and project announcements.
        </p>
        <Link href="/">Back to homepage test</Link>
      </header>

      <section className="type-detail-card">
        <h2>Under Construction</h2>
        <p className="type-desc">
          Planned categories include: product updates, personality stories, social distribution case studies,
          and deep-dive FAQ posts.
        </p>
      </section>
    </main>
  );
}
