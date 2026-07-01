import { homepageContent } from '@/content/home';
import type { HomepageViewModel } from '@/types/home';
import { getPrimaryLinks } from './get-links';
import { getProductCardViewModels } from './get-products';
import { getProfile } from './get-profile';

export function getHomepageViewModel(): HomepageViewModel {
  return {
    copy: homepageContent,
    profile: getProfile(),
    heroLinks: getPrimaryLinks(),
    featuredProducts: getProductCardViewModels()
      .filter(({ item }) => item.featured)
      .slice(0, 1)
      .map(({ item }) => ({ item })),
  };
}
