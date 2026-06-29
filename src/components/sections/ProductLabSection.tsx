import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { routes } from '@/lib/routes';
import type { HomeSectionCopy } from '@/types/home';
import type { ProductCardViewModel, ProductFamily } from '@/types/product';

export default function ProductLabSection({
  copy,
  products,
  ecosystem,
}: {
  copy: HomeSectionCopy;
  products: readonly ProductCardViewModel[];
  ecosystem: ProductFamily;
}) {
  return (
    <section aria-labelledby="product-lab-heading" className="section-shell">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader description={copy.summary} headingId="product-lab-heading" title={copy.heading} />
        <Link className="premium-link mb-7 font-medium text-[var(--color-accent-cyan)] hover:underline" href={routes.products}>
          Explore all products
        </Link>
      </div>
      {products.length ? (
        <div className="grid gap-6">
          {products.map((product) => <ProductCard headingLevel={3} key={product.item.id} viewModel={product} />)}
        </div>
      ) : (
        <Card><p className="text-[var(--color-text-secondary)]">Product previews are being prepared.</p></Card>
      )}
      <p className="mt-5 text-sm text-[var(--color-text-muted)]">
        {ecosystem.workflowSummary}{' '}
        <Link className="font-medium text-[var(--color-accent-cyan)]" href={routes.productMyDevKit}>
          See the ecosystem
        </Link>
      </p>
    </section>
  );
}
