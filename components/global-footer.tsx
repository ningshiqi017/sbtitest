'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPathLocale, localizePath, toLocalePath } from '@/lib/locale';

export default function GlobalFooter() {
  const pathname = usePathname() || '/';
  const locale = getPathLocale(pathname);
  const isZh = locale === 'zh';

  const homeHref = localizePath(locale, '/');
  const typesHref = localizePath(locale, '/types');
  const blogHref = localizePath(locale, '/blog');
  const aboutHref = localizePath(locale, '/about');
  const termsHref = localizePath(locale, '/terms');
  const langSwitchHref = toLocalePath(pathname, isZh ? 'en' : 'zh');

  return (
    <footer className="site-nav site-nav-bottom">
      <Link href={homeHref} className="site-brand" aria-label={isZh ? '返回首页' : 'Back to home'}>
        SBTI
      </Link>
      <nav aria-label={isZh ? '底部导航' : 'Footer navigation'}>
        <Link href={typesHref}>{isZh ? '查看人格' : 'Types'}</Link>
        <Link href={blogHref}>{isZh ? '博客' : 'Blog'}</Link>
        <Link href={aboutHref}>{isZh ? '关于' : 'About'}</Link>
        <Link href={termsHref}>{isZh ? '用户协议' : 'Terms'}</Link>
        <Link href={langSwitchHref}>{isZh ? 'English' : '中文'}</Link>
        <a
          href="https://www.profitablecpmratenetwork.com/h9804d53x?key=e41bb4d7c37ba91dfab03dd1896ea4c5"
          target="_blank"
          rel="noopener noreferrer sponsored"
        >
          {isZh ? '赞助链接' : 'Sponsor'}
        </a>
      </nav>
    </footer>
  );
}
