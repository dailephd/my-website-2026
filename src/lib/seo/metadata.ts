import type { Metadata } from 'next';

import { homepageContent } from '@/content/home';
import { getMyDevKitEcosystem } from '@/lib/content/get-products';
import { getProfile } from '@/lib/content/get-profile';
import { routes } from '@/lib/routes';
import type { PageMetadataConfig, SiteMetadata } from '@/types/seo';
import { buildOpenGraphImages } from './open-graph';
import { createAbsoluteUrl } from './site-url';

const profile = getProfile();
const ecosystem = getMyDevKitEcosystem();

export const routeMetadata = {
  home: {
    key: 'home', path: routes.home, title: profile.name,
    description: homepageContent.hero.summary,
    pageType: 'WebPage', ogImagePath: '/images/og/home-og.png',
  },
  projects: {
    key: 'projects', path: routes.projects, title: 'Technical Projects',
    description: 'Selected developer tools, scientific software, applied AI systems, and technical projects from dailephd LLC.',
    pageType: 'CollectionPage', ogImagePath: '/images/og/projects-og.png',
  },
  projectMyDevKit: {
    key: 'projectMyDevKit', path: routes.projectMyDevKit, title: ecosystem.title,
    description: ecosystem.positioning,
    pageType: 'WebPage', ogImagePath: '/images/og/my-dev-kit-og.png',
  },
  about: {
    key: 'about', path: routes.about, title: 'About Dai Le',
    description: `${profile.summary} Background in software, applied AI, and scientific research.`,
    pageType: 'WebPage', ogImagePath: '/images/og/about-og.png',
  },
  publications: {
    key: 'publications', path: routes.publications, title: 'Publications',
    description: 'Technical publications, research notes, and project writing from Dai Le.',
    pageType: 'CollectionPage', ogImagePath: '/images/og/publications-og.png',
  },
  contact: {
    key: 'contact', path: routes.contact, title: 'Contact Dai Le',
    description: 'Send a message for project inquiries, software engineering, AI workflows, scientific computing, or technical collaboration.',
    pageType: 'WebPage', ogImagePath: '/images/og/contact-og.png',
  },
} as const satisfies Record<keyof typeof routes, PageMetadataConfig>;

export function getSiteMetadata(): SiteMetadata {
  return {
    name: 'Dai Le',
    defaultTitle: 'dailephd LLC | Software, AI, and Scientific Computing',
    titleTemplate: '%s | Dai Le',
    description: profile.summary,
    locale: 'en_US',
  };
}

export function buildPageTitle(title: string): string {
  return title === profile.name ? getSiteMetadata().defaultTitle : `${title} | ${profile.name}`;
}

export function buildPageDescription(description: string): string {
  return description.trim().replace(/\s+/g, ' ');
}

export function buildCanonicalUrl(path: string): string {
  return createAbsoluteUrl(path);
}

export function buildPageMetadata(config: PageMetadataConfig): Metadata {
  const title = buildPageTitle(config.title);
  const description = buildPageDescription(config.description);
  const url = buildCanonicalUrl(config.path);
  const images = buildOpenGraphImages(config.ogImagePath, `${config.title} link preview`);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: getSiteMetadata().name, locale: getSiteMetadata().locale,
      type: 'website', images,
    },
    twitter: {
      card: images.length ? 'summary_large_image' : 'summary',
      title, description, images: images.map(({ url }) => url),
    },
  };
}

export function getRouteMetadata(path: string): PageMetadataConfig | undefined {
  return Object.values(routeMetadata).find((config) => config.path === path);
}

export function createPageMetadata(
  title: string,
  description: string,
  path = '/',
): Metadata {
  return buildPageMetadata({ key: path, title: title.replace(/\s*\|\s*Dai Le.*$/, ''), description, path, pageType: 'WebPage' });
}
