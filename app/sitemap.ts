import type { MetadataRoute } from 'next';
import { toAbsoluteUrl } from '@/lib/site';
import { allTypeSlugs } from '@/lib/type-slugs';

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages: MetadataRoute.Sitemap = [
    {
      url: '/',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: '/zh',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: '/types',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: '/zh/types',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: '/about',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: '/zh/about',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: '/terms',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: '/zh/terms',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const typePages: MetadataRoute.Sitemap = allTypeSlugs().flatMap((slug) => [
    {
      url: `/types/${slug}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `/zh/types/${slug}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]);

  return [...basePages, ...typePages].map((item) => ({
    ...item,
    url: toAbsoluteUrl(item.url),
  }));
}
