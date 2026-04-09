import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { typeImages, typeLibrary } from '@/lib/sbti-data';
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
      title: '人格详情',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const item = typeLibrary[code as keyof typeof typeLibrary];
  const title = `${item.code}（${item.cn}）SBTI人格测试结果深度解析：性格特征、关系倾向、行为模式、社交表达与成长建议｜在线查看完整版页`;
  const description = `想知道 ${item.code}（${item.cn}）在 SBTI 人格测试里到底代表什么？本页面系统整理该类型的核心特征、行为风格、关系互动方式与情绪表达习惯，并结合中文互联网语境给出更易理解的解释，帮助你把测试结果从“好玩标签”转化成可自我观察、可社交分享、可快速介绍自己的长期表达素材，并可配合首页答题再次验证维度分布与应用。`;
  const url = toAbsoluteUrl(`/types/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
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
        <p>SBTI 人格详情</p>
        <h1>
          {item.code}（{item.cn}）
        </h1>
        <div className="type-detail-nav">
          <Link href="/">返回首页测试</Link>
          <Link href="/types">查看全部类型</Link>
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
