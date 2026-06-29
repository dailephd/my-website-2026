import { homepageContent } from '@/content/home';
import { routes } from '@/lib/routes';
import type { HomepageViewModel } from '@/types/home';
import { getLinks, getPrimaryLinks } from './get-links';
import { getProductCardViewModels, getMyDevKitEcosystem } from './get-products';
import { getFeaturedProjects } from './get-projects';
import { getProfile } from './get-profile';
import { getPublicationSummary } from './get-publications';
import { getRoadmapPreview } from './get-roadmaps';

const CONTACT_LINK_IDS = new Set(['view-work', 'explore-products', 'contact']);

export function getHomepageViewModel(): HomepageViewModel {
  const allLinks = getLinks();
  const contactLinks = allLinks.filter(
    (link) => CONTACT_LINK_IDS.has(link.id) || link.href === routes.contact,
  );

  return {
    copy: homepageContent,
    profile: getProfile(),
    heroLinks: getPrimaryLinks(),
    featuredProjects: getFeaturedProjects().slice(0, 2),
    featuredProducts: getProductCardViewModels()
      .filter(({ item }) => item.featured)
      .slice(0, 1)
      .map(({ item }) => ({ item })),
    ecosystem: getMyDevKitEcosystem(),
    roadmapPreview: getRoadmapPreview('my-dev-kit'),
    contactLinks,
    publicationSummary: getPublicationSummary(),
  };
}
