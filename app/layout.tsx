import type { Metadata } from 'next';
import Script from 'next/script';
import AdsenseScript from '@/components/adsense-script';
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
    'SBTI test online: instant quiz, fast results and sharing hub',
  description:
    'SBTI test online is an entertainment-first quiz with a modal flow. Get instant type results, dimension scores, and summaries on SBTI online for easy sharing.',
  openGraph: {
    title:
      'SBTI test online: instant quiz, fast results and sharing hub',
    description:
      'SBTI test online is an entertainment-first quiz with a modal flow. Get instant type results, dimension scores, and summaries on SBTI online for easy sharing.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'SBTI test online: instant quiz, fast results and sharing hub',
    description:
      'SBTI test online is an entertainment-first quiz with a modal flow. Get instant type results, dimension scores, and summaries on SBTI online for easy sharing.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <AdsenseScript />
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
