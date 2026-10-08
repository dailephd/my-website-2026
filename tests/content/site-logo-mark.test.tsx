import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import SiteLogoMark from '@/components/layout/SiteLogoMark';

describe('SiteLogoMark', () => {
  it('renders the shared DL stem/foot path and the D bowl path', () => {
    const markup = renderToStaticMarkup(<SiteLogoMark />);

    expect(markup).toContain('viewBox="0 0 256 256"');
    expect(markup).toContain('M88 56V198H176');
    expect(markup).toContain('M88 78H124C155 78 176 95 176 118C176 141 155 158 124 158H88');
  });

  it('uses theme-aware CSS variables with fallback colors', () => {
    const markup = renderToStaticMarkup(<SiteLogoMark />);

    expect(markup).toContain('var(--color-surface, #F5F6F8)');
    expect(markup).toContain('var(--color-border, #D1D5DB)');
    expect(markup).toContain('var(--color-text-secondary, #4B5563)');
    expect(markup).toContain('var(--color-accent-primary, #0F716A)');
  });

  it('exposes an accessible title by default', () => {
    const markup = renderToStaticMarkup(<SiteLogoMark title="dailephd LLC" />);

    expect(markup).toContain('role="img"');
    expect(markup).toContain('<title');
    expect(markup).toContain('dailephd LLC');
    expect(markup).not.toContain('aria-hidden="true"');
  });

  it('renders as decorative with aria-hidden and no title when requested', () => {
    const markup = renderToStaticMarkup(<SiteLogoMark decorative />);

    expect(markup).toContain('aria-hidden="true"');
    expect(markup).not.toContain('role="img"');
    expect(markup).not.toContain('<title');
  });

  it('applies the requested pixel size to width and height', () => {
    const markup = renderToStaticMarkup(<SiteLogoMark size={48} />);

    expect(markup).toContain('width="48"');
    expect(markup).toContain('height="48"');
  });
});
