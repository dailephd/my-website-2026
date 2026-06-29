import ContactCTASection from '@/components/sections/ContactCTASection';
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection';
import HomeHero from '@/components/sections/HomeHero';
import ProductLabSection from '@/components/sections/ProductLabSection';
import PublicationsPreviewSection from '@/components/sections/PublicationsPreviewSection';
import SelectedRoadmapsSection from '@/components/sections/SelectedRoadmapsSection';
import TechnicalFocusSection from '@/components/sections/TechnicalFocusSection';
import { getHomepageViewModel } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(routeMetadata.home);

export default function HomePage() {
  const home = getHomepageViewModel();

  return <>
    <HomeHero copy={home.copy.hero} primaryLinks={home.heroLinks} profile={home.profile} />
    <FeaturedWorkSection copy={home.copy.featuredWork} projects={home.featuredProjects} />
    <ProductLabSection copy={home.copy.productLab} ecosystem={home.ecosystem} products={home.featuredProducts} />
    <SelectedRoadmapsSection copy={home.copy.roadmaps} preview={home.roadmapPreview} />
    <TechnicalFocusSection content={home.copy.technicalFocus} />
    <PublicationsPreviewSection copy={home.copy.credibility} summary={home.publicationSummary} />
    <ContactCTASection copy={home.copy.contact} links={home.contactLinks} />
  </>;
}
