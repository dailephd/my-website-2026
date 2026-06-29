import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import RoadmapPreview from '@/components/roadmap/RoadmapPreview';
import type { ProductCardViewModel, ProductCategory, ProductStatus } from '@/types/product';

const statuses: Record<ProductStatus, string> = {
  active: 'Active', 'in-development': 'In development', experimental: 'Experimental',
  planned: 'Planned', paused: 'Paused', archived: 'Archived',
};
const categories: Record<ProductCategory, string> = {
  'developer-tooling': 'Developer tooling', 'scientific-software': 'Scientific software',
  'website-product-lab': 'Website and product lab',
};

export default function ProductCard({ viewModel, headingLevel = 2 }: { viewModel: ProductCardViewModel; headingLevel?: 2 | 3 }) {
  const { item, roadmapPreview } = viewModel;
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  return <article className="h-full"><Card className={`premium-card-interactive flex h-full flex-col ${item.featured ? 'border-[var(--color-accent-violet)] bg-[var(--color-elevated)] shadow-[var(--shadow-card-hover)]' : ''}`}>
    <div className="flex flex-wrap gap-2"><Badge>Status: {statuses[item.status]}</Badge><Badge>{item.itemType === 'product-family' ? 'Product family' : 'Standalone product'}</Badge></div>
    {item.featured ? <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-violet)]">Featured product</p> : null}
    <Heading className="mt-3 text-2xl font-semibold">{item.title}</Heading>
    <p className="mt-2 text-sm font-medium text-[var(--color-accent-cyan)]">{categories[item.category]}</p>
    <p className="mt-4 text-[var(--color-text-secondary)]">{item.summary}</p>
    <p className="mt-3 text-sm text-[var(--color-text-muted)]">{item.positioning}</p>
    <div className="mt-6 flex flex-wrap gap-4">
      {item.detailHref ? <Link className="premium-link font-medium text-[var(--color-accent-cyan)] hover:underline" href={item.detailHref}>Explore product</Link> : null}
      {item.links.map((link) => <Link className="premium-link font-medium text-[var(--color-accent-cyan)] hover:underline" href={link.href} key={link.id} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>{link.label}</Link>)}
    </div>
    {roadmapPreview ? <div className="mt-7"><RoadmapPreview headingLevel={3} href={item.detailHref ?? '/products'} preview={roadmapPreview} /></div> : null}
  </Card></article>;
}
