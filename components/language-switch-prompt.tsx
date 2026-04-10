'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getPathLocale, type Locale, toLocalePath } from '@/lib/locale';

function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const lang = (navigator.language || '').toLowerCase();
  return lang.startsWith('zh') ? 'zh' : 'en';
}

export default function LanguageSwitchPrompt() {
  const pathname = usePathname();
  const router = useRouter();
  const askedRef = useRef(false);

  useEffect(() => {
    if (!pathname || askedRef.current) return;

    askedRef.current = true;

    const currentLocale = getPathLocale(pathname);
    const browserLocale = detectBrowserLocale();

    if (currentLocale === browserLocale) return;

    const message =
      browserLocale === 'zh'
        ? '检测到你的浏览器语言是中文，是否切换到中文页面？'
        : 'Your browser language is English. Switch to the English version?';

    if (!window.confirm(message)) return;

    const targetPath = toLocalePath(pathname, browserLocale);
    if (targetPath !== pathname) {
      router.push(targetPath);
    }
  }, [pathname, router]);

  return null;
}
