export type Locale = 'en' | 'zh';

export function getPathLocale(pathname: string): Locale {
  return pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en';
}

export function toLocalePath(pathname: string, target: Locale): string {
  if (target === 'zh') {
    if (pathname === '/zh' || pathname.startsWith('/zh/')) return pathname;
    if (pathname === '/') return '/zh';
    return `/zh${pathname}`;
  }

  if (pathname === '/zh') return '/';
  if (pathname.startsWith('/zh/')) {
    const stripped = pathname.slice(3);
    return stripped.length ? stripped : '/';
  }

  return pathname;
}

export function localizePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return toLocalePath(normalized, locale);
}

export function localeToLanguageTag(locale: Locale): string {
  return locale === 'zh' ? 'zh-CN' : 'en-US';
}
