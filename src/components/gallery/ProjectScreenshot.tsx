import Image from 'next/image';

import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { GalleryItem } from '@/types/gallery';

export default function ProjectScreenshot({ item }: { item: GalleryItem }) {
  const relationship = item.projectSlug ?? item.productSlug;
  return (
    <Card as="figure" className="premium-card-interactive overflow-hidden p-0">
      <Image
        alt={item.decorative ? '' : item.alt}
        className="h-auto w-full object-cover"
        height={item.height}
        loading="lazy"
        sizes="(min-width: 1024px) 66vw, 100vw"
        src={item.src}
        width={item.width}
      />
      <figcaption className="p-5">
        {relationship ? <Badge>{relationship}</Badge> : null}
        <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
        {item.caption ? <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.caption}</p> : null}
        {item.link ? (
          <a
            className="mt-4 inline-block font-medium text-[var(--color-accent-cyan)] underline-offset-4 hover:underline"
            href={item.link.href}
            rel={item.link.external ? 'noreferrer' : undefined}
            target={item.link.external ? '_blank' : undefined}
          >
            {item.link.label}
          </a>
        ) : null}
      </figcaption>
    </Card>
  );
}
