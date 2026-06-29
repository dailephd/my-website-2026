import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import PublicationCard from '@/components/publications/PublicationCard';
import PublicationList from '@/components/publications/PublicationList';
import type { Publication } from '@/types/publication';

const publication: Publication = {
  id: 'verified-paper',
  title: 'A long verified publication title',
  authors: [{ name: 'Dai Le' }],
  year: 2024,
  venue: 'Verified Venue',
  summary: 'Why this work matters.',
  type: 'journal-article',
  links: [],
  tags: ['Research software'],
  displayPriority: 10,
};

describe('publication components', () => {
  it('renders verified metadata and omits absent links or identifiers', () => {
    const markup = renderToStaticMarkup(<PublicationCard publication={publication} />);

    expect(markup).toContain(publication.title);
    expect(markup).toContain('Dai Le');
    expect(markup).toContain('Verified Venue');
    expect(markup).toContain('2024');
    expect(markup).not.toContain('DOI');
    expect(markup).not.toContain('<a ');
  });

  it('renders a publication card list and a transparent empty state', () => {
    expect(renderToStaticMarkup(<PublicationList publications={[publication]} />)).toContain(
      publication.title,
    );
    expect(renderToStaticMarkup(<PublicationList publications={[]} />)).toContain(
      'Publication record in preparation',
    );
  });
});
