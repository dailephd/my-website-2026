import Link from 'next/link';

import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { ProductModule, ProductStage, ProductStatus } from '@/types/product';

const statusLabels: Record<ProductStatus, string> = {
  active: 'Active',
  'in-development': 'In development',
  experimental: 'Experimental',
  planned: 'Planned',
  paused: 'Paused',
  archived: 'Archived',
};

const stageLabels: Record<ProductStage, string> = {
  foundation: 'Foundation layer',
  prototype: 'Prototype stage',
  validation: 'Validation stage',
};

export default function EcosystemModuleCard({
  productModule,
}: {
  productModule: ProductModule;
}) {
  return (
    <article className="h-full">
      <Card className="premium-card-interactive flex h-full flex-col">
        <div className="flex flex-wrap gap-2">
          <Badge>{statusLabels[productModule.status]}</Badge>
          <Badge>{stageLabels[productModule.stage]}</Badge>
        </div>
        <p className="eyebrow mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-primary)]">
          {productModule.roleLabel}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{productModule.title}</h3>
        <p className="mt-2 text-sm font-medium text-[var(--color-text-muted)]">
          {productModule.layerLabel}
        </p>
        <p className="mt-4 text-[var(--color-text-secondary)]">{productModule.summary}</p>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          {productModule.description}
        </p>

        <ul
          aria-label={`${productModule.title} technology stack`}
          className="mt-5 flex flex-wrap gap-2"
        >
          {productModule.stack.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>

        {productModule.links.length > 0 ? (
          <ul aria-label={`${productModule.title} links`} className="mt-auto flex gap-4 pt-6">
            {productModule.links.map((link) => (
              <li key={link.id}>
                <Link
                  className="rounded-sm text-sm font-medium text-[var(--color-accent-primary)] underline decoration-transparent underline-offset-4 hover:decoration-current"
                  href={link.href}
                  rel={link.external ? 'noreferrer' : undefined}
                  target={link.external ? '_blank' : undefined}
                >
                  {link.label}
                  {link.external ? <span aria-hidden="true"> ↗</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Card>
    </article>
  );
}
