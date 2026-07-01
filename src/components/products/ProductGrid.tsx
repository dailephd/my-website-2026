import Card from '@/components/ui/Card';
import ProductCard from './ProductCard';
import type { ProductIndexViewModel } from '@/types/product';

export default function ProductGrid({ index }: { index: ProductIndexViewModel }) {
  return (
    <div className="space-y-14">
      <section aria-labelledby="featured-products-heading">
        <h2 className="mb-6 text-2xl font-semibold" id="featured-products-heading">
          Featured product family
        </h2>
        <div className="grid gap-6">
          {index.featured.map((item) => (
            <ProductCard key={item.item.id} viewModel={item} />
          ))}
        </div>
      </section>

      <section aria-labelledby="product-experiments-heading">
        <h2 className="mb-2 text-2xl font-semibold" id="product-experiments-heading">
          In development and experimental
        </h2>
        <p className="mb-6 text-[var(--color-text-secondary)]">
          Smaller product directions shown with their current maturity, without implying release readiness.
        </p>
        {index.standard.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {index.standard.map((item) => (
              <ProductCard key={item.item.id} viewModel={item} />
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-[var(--color-text-muted)]">No secondary product entries are ready yet.</p>
          </Card>
        )}
      </section>
    </div>
  );
}
