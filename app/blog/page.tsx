import Link from 'next/link';

export default function BlogPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>SBTI Blog</p>
        <h1>博客</h1>
        <p className="type-desc">这里将发布 SBTI 玩法更新、人格观察和站点公告。</p>
        <Link href="/">返回首页测试</Link>
      </header>

      <section className="type-detail-card">
        <h2>内容建设中</h2>
        <p className="type-desc">后续可按分类发布：产品更新、人格故事、社媒传播案例、FAQ 深度解读。</p>
      </section>
    </main>
  );
}
