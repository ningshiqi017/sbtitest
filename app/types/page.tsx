import Link from 'next/link';
import { typeLibrary } from '@/lib/sbti-data';
import { toTypeSlug } from '@/lib/type-slugs';

export default function TypeIndexPage() {
  const list = Object.values(typeLibrary);

  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>SBTI 人格索引</p>
        <h1>全部人格类型</h1>
        <Link href="/">返回首页测试</Link>
      </header>

      <section className="type-page-grid" aria-label="SBTI 人格列表">
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
