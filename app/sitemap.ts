import type { MetadataRoute } from 'next';
import { allTypeSlugs } from '@/lib/type-slugs';

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages: MetadataRoute.Sitemap = [
    {
      url: '/',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: '/types',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: '/blog',
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: '/about',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: '/terms',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const typePages: MetadataRoute.Sitemap = allTypeSlugs().map((slug) => ({
    url: `/types/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...basePages, ...typePages];
}
