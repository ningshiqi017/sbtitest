import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>Legal</p>
        <h1>用户协议</h1>
        <Link href="/">返回首页测试</Link>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">1. 本站提供的测试内容仅用于娱乐与社交分享，不作为医疗、心理或法律依据。</p>
        <p className="type-desc">2. 用户应合理使用本站内容，不得用于违法用途或恶意传播。</p>
        <p className="type-desc">3. 本站保留在必要时更新页面内容和展示形式的权利。</p>
      </section>
    </main>
  );
}
