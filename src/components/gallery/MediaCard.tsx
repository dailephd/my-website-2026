import Image from 'next/image';

import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { GalleryItem } from '@/types/gallery';

const categoryLabels: Record<GalleryItem['category'], string> = {
  'selected-work': 'Selected work',
  'product-lab': 'Product lab',
  'my-dev-kit': 'my-dev-kit',
  about: 'About',
  profile: 'Profile',
  general: 'Media',
};

export default function MediaCard({ item, priority = false }: { item: GalleryItem; priority?: boolean }) {
  const image = (
    <Image
      alt={item.decorative ? '' : item.alt}
      className="h-auto w-full object-cover"
      height={item.height}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      sizes="(min-width: 1024px) 50vw, 100vw"
      src={item.thumbnailSrc ?? item.src}
      width={item.width}
    />
  );

  return (
    <Card as="figure" className="premium-card-interactive overflow-hidden p-0">
      <div className="overflow-hidden rounded-t-[var(--radius-card)] bg-[var(--color-elevated)]">
        {item.link ? (
          <a
            aria-label={`${item.link.label}: ${item.title}`}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--color-focus)]"
            href={item.link.href}
            rel={item.link.external ? 'noreferrer' : undefined}
            target={item.link.external ? '_blank' : undefined}
          >
            {image}
          </a>
        ) : image}
      </div>
      <figcaption className="p-5">
        <Badge>{categoryLabels[item.category]}</Badge>
        <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
        {item.caption ? <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.caption}</p> : null}
      </figcaption>
    </Card>
  );
}
