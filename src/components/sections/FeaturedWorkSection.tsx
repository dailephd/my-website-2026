import Link from 'next/link';

import ProductCard from '@/components/products/ProductCard';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { routes } from '@/lib/routes';
import type { HomeSectionCopy } from '@/types/home';
import type { ProductCardViewModel } from '@/types/product';

export default function FeaturedWorkSection({
  copy,
  products,
}: {
  copy: HomeSectionCopy;
  products: readonly ProductCardViewModel[];
}) {
  return (
    <section aria-labelledby="featured-work-heading" className="section-shell">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          description={copy.summary}
          headingId="featured-work-heading"
          title={copy.heading}
        />
        <Link
          className="premium-link mb-7 rounded-sm font-medium text-[var(--color-accent-primary)] hover:underline"
          href={routes.projects}
        >
          View all projects
        </Link>
      </div>
      {products.length ? (
        <div className="grid gap-6">
          {products.map((product) => (
            <ProductCard
              headingLevel={3}
              key={product.item.id}
              showBadges={false}
              showLinks={false}
              viewModel={product}
            />
          ))}
        </div>
      ) : (
        <Card><p className="text-[var(--color-text-secondary)]">Product previews are being prepared.</p></Card>
      )}
    </section>
  );
}
