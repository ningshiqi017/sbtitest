import type { MetadataRoute } from 'next';
import { toAbsoluteUrl } from '@/lib/site';
import { allTypeSlugs } from '@/lib/type-slugs';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pairs = [
    { en: '/', zh: '/zh', changeFrequency: 'weekly', priority: 1 },
    { en: '/types', zh: '/zh/types', changeFrequency: 'weekly', priority: 0.8 },
    { en: '/about', zh: '/zh/about', changeFrequency: 'monthly', priority: 0.4 },
    { en: '/terms', zh: '/zh/terms', changeFrequency: 'monthly', priority: 0.4 },
    ...allTypeSlugs().map((slug) => ({
      en: `/types/${slug}`,
      zh: `/zh/types/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ] as const;

  const entries: MetadataRoute.Sitemap = pairs.flatMap((pair) => {
    const enUrl = toAbsoluteUrl(pair.en);
    const zhUrl = toAbsoluteUrl(pair.zh);
    const languages = {
      en: enUrl,
      'zh-CN': zhUrl,
      'x-default': enUrl,
    };

    return [
      {
        url: enUrl,
        changeFrequency: pair.changeFrequency,
        priority: pair.priority,
        lastModified,
        alternates: { languages },
      },
      {
        url: zhUrl,
        changeFrequency: pair.changeFrequency,
        priority: pair.priority,
        lastModified,
        alternates: { languages },
      },
    ];
  });

  return entries;
}
