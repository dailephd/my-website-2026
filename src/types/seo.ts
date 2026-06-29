export interface OpenGraphImage {
  path: string;
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface SiteMetadata {
  name: string;
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  locale: string;
}

export type StructuredDataNode = Record<string, unknown>;

export interface PageMetadataConfig {
  key: string;
  path: string;
  title: string;
  description: string;
  pageType: 'WebPage' | 'CollectionPage';
  ogImagePath?: string;
}

export type PublicRouteMetadata = PageMetadataConfig;

export interface SitemapRoute {
  path: string;
  changeFrequency?: 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}

export type PageSeo = PageMetadataConfig;
