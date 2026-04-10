'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [targetLocale, setTargetLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (!pathname || askedRef.current) return;

    askedRef.current = true;

    const currentLocale = getPathLocale(pathname);
    const browserLocale = detectBrowserLocale();

    if (currentLocale === browserLocale) return;
    setTargetLocale(browserLocale);
  }, [pathname, router]);

  if (!pathname || !targetLocale) return null;

  const isZhTarget = targetLocale === 'zh';

  const title = isZhTarget ? '切换到中文页面？' : 'Switch to English?';
  const body = isZhTarget
    ? '检测到你的浏览器语言偏好为中文。是否切换到 /zh 版本继续浏览？'
    : 'Your browser language preference is English. Do you want to switch to the English version?';
  const switchLabel = isZhTarget ? '切换到中文' : 'Switch to English';
  const stayLabel = isZhTarget ? '保持当前语言' : 'Stay on current language';

  const onSwitch = () => {
    const targetPath = toLocalePath(pathname, targetLocale);
    setTargetLocale(null);
    if (targetPath !== pathname) router.push(targetPath);
  };

  return (
    <div className="lang-switch-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <section className="lang-switch-card">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="lang-switch-actions">
          <button className="ghost-btn" onClick={() => setTargetLocale(null)}>
            {stayLabel}
          </button>
          <button className="primary-btn" onClick={onSwitch}>
            {switchLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
