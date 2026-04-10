import type { Metadata } from 'next';
import SbtiHomeEn from '@/components/sbti-home-en';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'SBTI test online: instant quiz, fast results, and type guide',
  description:
    'Take the SBTI test online for free in a one-by-one modal quiz. Get SBTI test results, dimension scores, and clear explanations on SBTI online for easy sharing.',
  alternates: {
    canonical: toAbsoluteUrl('/'),
    languages: {
      en: toAbsoluteUrl('/'),
      'zh-CN': toAbsoluteUrl('/zh'),
      'x-default': toAbsoluteUrl('/'),
    },
  },
  openGraph: {
    title:
      'SBTI test online: instant quiz, fast results, and type guide',
    description:
      'Take the SBTI test online for free in a one-by-one modal quiz. Get SBTI test results, dimension scores, and clear explanations on SBTI online for easy sharing.',
    url: toAbsoluteUrl('/'),
    locale: 'en_US',
  },
  twitter: {
    title:
      'SBTI test online: instant quiz, fast results, and type guide',
    description:
      'Take the SBTI test online for free in a one-by-one modal quiz. Get SBTI test results, dimension scores, and clear explanations on SBTI online for easy sharing.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between SBTI and MBTI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MBTI is a classic structured framework, while SBTI is an entertainment-focused personality test designed for social sharing and internet-native expression.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many SBTI personality types are there?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The current version includes 27 personality types, each with its own description and detail page.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the SBTI test free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The online SBTI test is currently free to use and can be started directly from the homepage.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SBTI Personality Test',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  inLanguage: 'en-US',
  description: 'An entertainment-first personality test with modal quiz flow, type results, and 15-dimension scoring.',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <SbtiHomeEn />
    </>
  );
}
