import BackgroundSection from '@/components/sections/BackgroundSection';
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection';
import HomeHero from '@/components/sections/HomeHero';
import TechnicalFocusSection from '@/components/sections/TechnicalFocusSection';
import { getHomepageViewModel } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(routeMetadata.home);

export default function HomePage() {
  const home = getHomepageViewModel();

  return <>
    <HomeHero copy={home.copy.hero} primaryLinks={home.heroLinks} profile={home.profile} />
    <FeaturedWorkSection copy={home.copy.featuredWork} products={home.featuredProducts} />
    <TechnicalFocusSection content={home.copy.technicalFocus} />
    <BackgroundSection content={home.copy.background} />
  </>;
}
