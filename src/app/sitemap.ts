import type { MetadataRoute } from 'next';

import { routeMetadata } from '@/lib/seo/metadata';
import { createAbsoluteUrl } from '@/lib/seo/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routeMetadata).map((route) => ({
    url: createAbsoluteUrl(route.path),
    changeFrequency: route.path === '/' ? 'weekly' : 'monthly',
    priority: route.path === '/' ? 1 : route.path === '/projects' ? 0.8 : 0.6,
  }));
}
