import type { Metadata } from 'next';
import Link from 'next/link';
import { typeLibrary } from '@/lib/sbti-data-en';
import { createBreadcrumbSchema, createItemListSchema, createWebPageSchema } from '@/lib/seo-schema';
import { toAbsoluteUrl } from '@/lib/site';
import { toTypeSlug } from '@/lib/type-slugs';

const LAST_UPDATED_ISO = '2026-04-10';
const LAST_UPDATED_LABEL = 'April 10, 2026';

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
  const pageUrl = toAbsoluteUrl('/types');
  const itemEntries = list.map((item) => ({
    name: `${item.code} (${item.cn})`,
    url: toAbsoluteUrl(`/types/${toTypeSlug(item.code)}`),
    description: item.intro,
  }));

  const webPageSchema = createWebPageSchema({
    name: 'SBTI type index',
    description: 'Index page for all SBTI test personality type results.',
    url: pageUrl,
    inLanguage: 'en-US',
    dateModified: LAST_UPDATED_ISO,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: toAbsoluteUrl('/') },
    { name: 'Types', url: pageUrl },
  ]);

  const itemListSchema = createItemListSchema({
    name: 'SBTI personality type list',
    url: pageUrl,
    inLanguage: 'en-US',
    items: itemEntries,
  });

  return (
    <main className="type-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <header className="type-page-header">
        <p>SBTI Type Index</p>
        <h1>All Personality Types</h1>
        <p className="type-desc">Browse every SBTI test type result and open each SBTI online profile page.</p>
        <p className="type-meta">Last updated: {LAST_UPDATED_LABEL} · Version: 2026.04</p>
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
