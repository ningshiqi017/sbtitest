import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { typeImages, typeLibrary } from '@/lib/sbti-data-en';
import { createBreadcrumbSchema, createWebPageSchema } from '@/lib/seo-schema';
import { toAbsoluteUrl } from '@/lib/site';
import { allTypeSlugs, fromTypeSlug } from '@/lib/type-slugs';

const LAST_UPDATED_ISO = '2026-04-10';
const LAST_UPDATED_LABEL = 'April 10, 2026';

export function generateStaticParams() {
  return allTypeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const code = fromTypeSlug(slug);

  if (!code) {
    return {
      title: 'Type details',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const item = typeLibrary[code as keyof typeof typeLibrary];
  const title = `${item.code} SBTI test result: traits, behavior, and social style`;
  const description = `Explore ${item.code} SBTI test result with key traits, behavior patterns, relationship tendencies, and social style. Read it fast on SBTI online and share clearly.`;
  const url = toAbsoluteUrl(`/types/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: toAbsoluteUrl(`/types/${slug}`),
        'zh-CN': toAbsoluteUrl(`/zh/types/${slug}`),
        'x-default': toAbsoluteUrl(`/types/${slug}`),
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: 'en_US',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function TypeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const code = fromTypeSlug(slug);

  if (!code) notFound();

  const item = typeLibrary[code as keyof typeof typeLibrary];
  const imageSrc = typeImages[code as keyof typeof typeImages];
  const pageUrl = toAbsoluteUrl(`/types/${slug}`);

  const webPageSchema = createWebPageSchema({
    name: `${item.code} SBTI type details`,
    description: `${item.code} SBTI test result details with behavior and social style summary.`,
    url: pageUrl,
    inLanguage: 'en-US',
    dateModified: LAST_UPDATED_ISO,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: toAbsoluteUrl('/') },
    { name: 'Types', url: toAbsoluteUrl('/types') },
    { name: item.code, url: pageUrl },
  ]);

  return (
    <main className="type-page type-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="type-page-header">
        <div className="type-detail-header-main">
          <p>SBTI Type Detail</p>
          <h1>
            {item.code} ({item.cn})
          </h1>
          <p className="type-desc">
            This page explains your SBTI test result with fast reading support on SBTI online.
          </p>
          <p className="type-meta">Last updated: {LAST_UPDATED_LABEL} · Version: 2026.04</p>
        </div>
        <div className="type-detail-nav">
          <Link href="/">Back to homepage test</Link>
          <Link href="/types">Browse all types</Link>
        </div>
      </header>

      <article className="type-detail-card type-detail-layout">
        <div className="type-detail-image">
          <img src={imageSrc} alt={`${item.code} ${item.cn}`} />
        </div>
        <div className="type-detail-content">
          <p className="type-intro">{item.intro}</p>
          <p className="type-desc">{item.desc}</p>
          <div className="type-related-links">
            <Link href="/what-is-sbti">What is SBTI</Link>
            <Link href="/sbti-vs-mbti">SBTI vs MBTI</Link>
            <Link href="/how-sbti-test-works">How SBTI test works</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
