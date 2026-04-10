'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getPathLocale, localizePath, toLocalePath } from '@/lib/locale';

export default function GlobalTopNav() {
  const pathname = usePathname() || '/';
  const locale = getPathLocale(pathname);
  const isZh = locale === 'zh';

  const homeHref = localizePath(locale, '/');
  const typesHref = localizePath(locale, '/types');
  const blogHref = localizePath(locale, '/blog');
  const langSwitchHref = toLocalePath(pathname, isZh ? 'en' : 'zh');

  return (
    <header className="site-nav site-nav-top">
      <Link href={homeHref} className="site-brand" aria-label={isZh ? '返回首页' : 'Back to home'}>
        <Image src="/logo.png" alt="SBTI Logo" width={120} height={40} priority />
        <span className="brand-text">SBTI</span>
      </Link>
      <nav aria-label={isZh ? '主导航' : 'Main navigation'}>
        <Link href={typesHref}>{isZh ? '查看人格' : 'Types'}</Link>
        <Link href={blogHref}>{isZh ? '博客' : 'Blog'}</Link>
        <Link href={langSwitchHref}>{isZh ? 'English' : '中文'}</Link>
      </nav>
    </header>
  );
}
