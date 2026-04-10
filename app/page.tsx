import type { Metadata } from 'next';
import SbtiHomeEn from '@/components/sbti-home-en';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'SBTI personality test online: instant quiz, type interpretation, result sharing and FAQ guide',
  description:
    'Take the SBTI personality test online for free. Complete one-by-one questions in a modal, get your type and dimension scores instantly, compare SBTI vs MBTI, and explore the full type library with shareable results.',
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
      'SBTI personality test online: instant quiz, type interpretation, result sharing and FAQ guide',
    description:
      'Take the SBTI personality test online for free. Complete one-by-one questions in a modal, get your type and dimension scores instantly, compare SBTI vs MBTI, and explore the full type library with shareable results.',
    url: toAbsoluteUrl('/'),
    locale: 'en_US',
  },
  twitter: {
    title:
      'SBTI personality test online: instant quiz, type interpretation, result sharing and FAQ guide',
    description:
      'Take the SBTI personality test online for free. Complete one-by-one questions in a modal, get your type and dimension scores instantly, compare SBTI vs MBTI, and explore the full type library with shareable results.',
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
