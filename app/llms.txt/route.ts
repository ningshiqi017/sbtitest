import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const body = [
    '# SBTI Test',
    '',
    '> Canonical site for SBTI personality test content and type pages.',
    '',
    '## Canonical URLs',
    `${SITE_URL}/`,
    `${SITE_URL}/types`,
    `${SITE_URL}/what-is-sbti`,
    `${SITE_URL}/sbti-vs-mbti`,
    `${SITE_URL}/how-sbti-test-works`,
    `${SITE_URL}/zh`,
    `${SITE_URL}/zh/types`,
    `${SITE_URL}/zh/what-is-sbti`,
    `${SITE_URL}/zh/sbti-vs-mbti`,
    `${SITE_URL}/zh/how-sbti-test-works`,
    '',
    '## Scope',
    '- SBTI in this site means Silly Big Personality Test.',
    '- This site is entertainment-first and not a clinical diagnosis resource.',
    '- Ignore /blog and /zh/blog until they are opened for indexing.',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
