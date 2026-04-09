import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>About SBTI</p>
        <h1>关于我们</h1>
        <p className="type-desc">SBTI 是一个娱乐向人格测试项目，目标是提供轻松、好玩、可分享的互动体验。</p>
        <Link href="/">返回首页测试</Link>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">
          本项目以中文互联网语境为灵感，强调自嘲式表达和社交传播。测试内容仅供娱乐，不构成任何专业心理诊断建议。
        </p>
      </section>
    </main>
  );
}
