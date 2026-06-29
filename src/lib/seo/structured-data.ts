import { getProfile } from '@/lib/content/get-profile';
import type { PageMetadataConfig, StructuredDataNode } from '@/types/seo';
import { buildPageTitle, getSiteMetadata } from './metadata';
import { createAbsoluteUrl } from './site-url';

export function buildPersonJsonLd(): StructuredDataNode {
  const profile = getProfile();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    description: profile.summary,
    url: createAbsoluteUrl('/about'),
  };
}

export function buildWebSiteJsonLd(): StructuredDataNode {
  const site = getSiteMetadata();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    description: site.description,
    url: createAbsoluteUrl('/'),
  };
}

export function buildWebPageJsonLd(config: PageMetadataConfig): StructuredDataNode {
  return {
    '@context': 'https://schema.org',
    '@type': config.pageType,
    name: buildPageTitle(config.title),
    description: config.description,
    url: createAbsoluteUrl(config.path),
    isPartOf: { '@type': 'WebSite', url: createAbsoluteUrl('/') },
  };
}

export const buildCollectionPageJsonLd = buildWebPageJsonLd;

export function serializeJsonLd(node: StructuredDataNode): string {
  return JSON.stringify(node).replace(/</g, '\\u003c');
}

export const createStructuredData = buildWebSiteJsonLd;
