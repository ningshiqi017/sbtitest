import Link from 'next/link';

export default function GlobalFooter() {
  return (
    <footer className="site-nav site-nav-bottom">
      <Link href="/" className="site-brand" aria-label="返回首页">
        SBTI
      </Link>
      <nav aria-label="底部导航">
        <Link href="/types">查看人格</Link>
        <Link href="/blog">博客</Link>
        <Link href="/about">关于</Link>
        <Link href="/terms">用户协议</Link>
      </nav>
    </footer>
  );
}
