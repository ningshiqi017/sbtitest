import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { typeImages, typeLibrary } from '@/lib/sbti-data-en';
import { toAbsoluteUrl } from '@/lib/site';
import { allTypeSlugs, fromTypeSlug } from '@/lib/type-slugs';

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

  return (
    <main className="type-page type-detail-page">
      <header className="type-page-header">
        <p>SBTI Type Detail</p>
        <h1>
          {item.code} ({item.cn})
        </h1>
        <p className="type-desc">
          This page explains your SBTI test result with fast reading support on SBTI online.
        </p>
        <div className="type-detail-nav">
          <Link href="/">Back to homepage test</Link>
          <Link href="/types">Browse all types</Link>
        </div>
      </header>

      <article className="type-detail-card">
        <img src={imageSrc} alt={`${item.code} ${item.cn}`} />
        <p className="type-intro">{item.intro}</p>
        <p className="type-desc">{item.desc}</p>
      </article>
    </main>
  );
}
