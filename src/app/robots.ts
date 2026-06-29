import type { MetadataRoute } from 'next';

import { createAbsoluteUrl } from '@/lib/seo/site-url';

export default function robots(): MetadataRoute.Robots {
  const noIndex = process.env.NEXT_PUBLIC_NOINDEX === 'true';
  return {
    rules: noIndex
      ? [{ userAgent: '*', disallow: '/' }]
      : [{ userAgent: '*', allow: '/' }],
    sitemap: createAbsoluteUrl('/sitemap.xml'),
  };
}
