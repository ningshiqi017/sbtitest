import type { Metadata } from 'next';
import Link from 'next/link';
import { typeLibrary } from '@/lib/sbti-data-en';
import { toAbsoluteUrl } from '@/lib/site';
import { toTypeSlug } from '@/lib/type-slugs';

export const metadata: Metadata = {
  title:
    'SBTI personality type index: browse all 27 types, labels, meanings and detail pages in one place',
  description:
    'Browse the full SBTI personality library and quickly open each type detail page. This index helps you compare labels, understand each profile’s tone, and continue reading after finishing the test.',
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
      'SBTI personality type index: browse all 27 types, labels, meanings and detail pages in one place',
    description:
      'Browse the full SBTI personality library and quickly open each type detail page. This index helps you compare labels, understand each profile’s tone, and continue reading after finishing the test.',
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
