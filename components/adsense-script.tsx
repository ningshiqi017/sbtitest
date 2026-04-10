import Script from 'next/script';

const ADSENSE_CLIENT = 'ca-pub-4194035852162505';

export default function AdsenseScript() {
  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="beforeInteractive"
      crossOrigin="anonymous"
    />
  );
}
