import ProductArchitectureVisual from '@/components/projects/ProductArchitectureVisual';
import ProductFamilyHero from '@/components/products/ProductFamilyHero';
import { getMyDevKitEcosystem, getProductFamilyModules } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(routeMetadata.projectMyDevKit);

export default function MyDevKitPage() {
  const ecosystem = getMyDevKitEcosystem();
  const modules = getProductFamilyModules(ecosystem.slug);

  return (
    <div className="space-y-16 py-10 sm:py-16 lg:space-y-20">
      <ProductFamilyHero family={ecosystem} />
      <ProductArchitectureVisual modules={modules} />
    </div>
  );
}
