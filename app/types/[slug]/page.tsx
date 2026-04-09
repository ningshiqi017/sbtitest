import Link from 'next/link';
import { notFound } from 'next/navigation';
import { typeImages, typeLibrary } from '@/lib/sbti-data';
import { allTypeSlugs, fromTypeSlug } from '@/lib/type-slugs';

export function generateStaticParams() {
  return allTypeSlugs().map((slug) => ({ slug }));
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
