import Link from 'next/link';

export default function GlobalTopNav() {
  return (
    <header className="site-nav site-nav-top">
      <Link href="/" className="site-brand" aria-label="返回首页">
        SBTI
      </Link>
      <nav aria-label="主导航">
        <Link href="/types">查看人格</Link>
        <Link href="/blog">博客</Link>
      </nav>
    </header>
  );
}
