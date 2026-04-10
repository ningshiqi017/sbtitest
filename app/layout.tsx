import type { Metadata } from 'next';
import Script from 'next/script';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import GlobalFooter from '@/components/global-footer';
import GlobalTopNav from '@/components/global-top-nav';
import LanguageSwitchPrompt from '@/components/language-switch-prompt';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const bodyFont = Noto_Sans_SC({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const displayFont = Noto_Serif_SC({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
    apple: '/logo.png',
  },
  title:
    'SBTI Personality Test Online: instant quiz, type library, interpretation and shareable results',
  description:
    'SBTI is an entertainment-first personality test inspired by internet culture. Start from the homepage, answer in a modal flow, and get a shareable result with dimension scores and type interpretation.',
  openGraph: {
    title:
      'SBTI Personality Test Online: instant quiz, type library, interpretation and shareable results',
    description:
      'SBTI is an entertainment-first personality test inspired by internet culture. Start from the homepage, answer in a modal flow, and get a shareable result with dimension scores and type interpretation.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'SBTI Personality Test Online: instant quiz, type library, interpretation and shareable results',
    description:
      'SBTI is an entertainment-first personality test inspired by internet culture. Start from the homepage, answer in a modal flow, and get a shareable result with dimension scores and type interpretation.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EC4BWJB62P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EC4BWJB62P');
          `}
        </Script>
        <GlobalTopNav />
        <LanguageSwitchPrompt />
        <div className="app-main">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
