import ProductGrid from '@/components/products/ProductGrid';
import SectionHeader from '@/components/ui/SectionHeader';
import JsonLd from '@/components/seo/JsonLd';
import { getProductIndexViewModel } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';
import { buildCollectionPageJsonLd } from '@/lib/seo/structured-data';

export const metadata = buildPageMetadata(routeMetadata.products);

export default function ProductsPage() {
  const index = getProductIndexViewModel();
  return <div className="space-y-12 py-12 sm:py-16"><JsonLd data={buildCollectionPageJsonLd(routeMetadata.products)} /><section aria-labelledby="products-heading"><SectionHeader description="Selected product families and experiments built around developer tooling, scientific software, and applied AI workflows." headingId="products-heading" level={1} title="Product lab" /></section><ProductGrid index={index} /></div>;
}
