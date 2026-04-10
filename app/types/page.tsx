import type { Metadata } from 'next';
import Link from 'next/link';
import { typeLibrary } from '@/lib/sbti-data-en';
import { toAbsoluteUrl } from '@/lib/site';
import { toTypeSlug } from '@/lib/type-slugs';

export const metadata: Metadata = {
  title:
    'SBTI test types online: browse all 27 type results fast',
  description:
    'Browse SBTI test types in one index and open each profile in one click. Compare labels, read traits, and move to detail pages after your SBTI test result.',
  alternates: {
    canonical: toAbsoluteUrl('/types'),
    languages: {
      en: toAbsoluteUrl('/types'),
      'zh-CN': toAbsoluteUrl('/zh/types'),
      'x-default': toAbsoluteUrl('/types'),
    },
  },
  openGraph: {
    title:
      'SBTI test types online: browse all 27 type results fast',
    description:
      'Browse SBTI test types in one index and open each profile in one click. Compare labels, read traits, and move to detail pages after your SBTI test result.',
    url: toAbsoluteUrl('/types'),
    locale: 'en_US',
  },
};

export default function TypeIndexPage() {
  const list = Object.values(typeLibrary);

  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>SBTI Type Index</p>
        <h1>All Personality Types</h1>
        <p className="type-desc">Browse every SBTI test type result and open each SBTI online profile page.</p>
        <Link href="/">Back to homepage test</Link>
      </header>

      <section className="type-page-grid" aria-label="SBTI personality list">
        {list.map((item) => (
          <Link key={item.code} href={`/types/${toTypeSlug(item.code)}`} className="type-page-card">
            <h2>{item.code}</h2>
            <strong>{item.cn}</strong>
            <p>{item.intro}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
