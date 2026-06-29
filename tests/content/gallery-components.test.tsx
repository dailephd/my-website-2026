import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import GalleryGrid from '@/components/gallery/GalleryGrid';
import MediaCard from '@/components/gallery/MediaCard';
import ProjectScreenshot from '@/components/gallery/ProjectScreenshot';
import GalleryPreviewSection from '@/components/sections/GalleryPreviewSection';
import type { GalleryItem } from '@/types/gallery';

const item: GalleryItem = {
  id: 'media',
  title: 'Verified interface',
  src: '/images/projects/demo.webp',
  alt: 'A verified project interface',
  kind: 'project-screenshot',
  category: 'selected-work',
  caption: 'A concise caption.',
  width: 1200,
  height: 750,
  displayPriority: 10,
  featured: true,
  projectSlug: 'demo',
};

describe('gallery components', () => {
  it('renders image metadata and optional caption without a link', () => {
    const markup = renderToStaticMarkup(<MediaCard item={item} />);
    expect(markup).toContain(item.title);
    expect(markup).toContain(item.alt);
    expect(markup).toContain(item.caption);
    expect(markup).not.toContain('<a ');
  });

  it('renders screenshot relationships and gallery records', () => {
    expect(renderToStaticMarkup(<ProjectScreenshot item={item} />)).toContain('demo');
    expect(renderToStaticMarkup(<GalleryGrid items={[item]} />)).toContain(item.title);
  });

  it('renders polished empty states in grids and previews', () => {
    expect(renderToStaticMarkup(<GalleryGrid items={[]} />)).toContain('Media showcase in preparation');
    expect(renderToStaticMarkup(<GalleryPreviewSection gallery={{ items: [], isEmpty: true }} />)).toContain('Project media');
  });
});
