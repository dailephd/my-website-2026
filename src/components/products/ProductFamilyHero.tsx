import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import LinkButton from '@/components/ui/LinkButton';
import type { ProductFamily, ProductStatus } from '@/types/product';

const statusLabels: Record<ProductStatus, string> = {
  active: 'Active',
  'in-development': 'In development',
  experimental: 'Experimental',
  planned: 'Planned',
  paused: 'Paused',
  archived: 'Archived',
};

export default function ProductFamilyHero({ family }: { family: ProductFamily }) {
  return (
    <section aria-labelledby="product-family-heading">
      <Card className="hero-backdrop relative overflow-hidden rounded-[var(--radius-panel)] p-7 sm:p-12">
        <div aria-hidden="true" className="quiet-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-accent-cyan)] opacity-10 blur-3xl"
        />
        <div className="relative max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{statusLabels[family.status]}</Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-violet)]">
              Connected product family
            </span>
          </div>
          <h1
            className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl"
            id="product-family-heading"
          >
            {family.title}
          </h1>
          <p className="mt-5 max-w-3xl text-xl font-medium text-[var(--color-text-primary)]">
            {family.positioning}
          </p>
          <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">{family.summary}</p>
          <p className="mt-4 max-w-3xl text-sm text-[var(--color-text-muted)]">
            {family.description}
          </p>

          <div className="mt-7">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
              Designed for
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {family.primaryAudience.map((audience) => (
                <li key={audience}>
                  <Badge>{audience}</Badge>
                </li>
              ))}
            </ul>
          </div>

          {family.links.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {family.links.map((link, index) => (
                <LinkButton
                  key={link.id}
                  emphasis={index === 0 ? 'primary' : 'secondary'}
                  external={link.external}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Card>
    </section>
  );
}
