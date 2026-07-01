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

const multiAuthorPublication: Publication = {
  id: 'multi-author-paper',
  title: 'Multi-author paper',
  authors: [
    { name: 'Sukanya Iyer' },
    { name: 'Dai Le', isProfileOwner: true },
    { name: 'Minsu Kim' },
  ],
  year: 2020,
  type: 'journal-article',
  links: [],
  tags: [],
  displayPriority: 10,
};

const leDaiPublication: Publication = {
  id: 'le-dai-paper',
  title: 'Le Dai name variant paper',
  authors: [
    { name: 'Taejeong Ha' },
    { name: 'Le Dai', isProfileOwner: true },
    { name: 'Jin Woo Kim' },
  ],
  year: 2017,
  type: 'journal-article',
  links: [],
  tags: [],
  displayPriority: 10,
};

const withAbstract: Publication = {
  ...publication,
  id: 'with-abstract',
  abstract: 'This is the real abstract text for this paper.',
};

const withMultiParagraphAbstract: Publication = {
  ...publication,
  id: 'multi-para-abstract',
  abstract: 'First paragraph of the abstract.\n\nIMPORTANCE Second paragraph of the abstract.',
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

  it('highlights "Dai Le" in the author list using strong', () => {
    const markup = renderToStaticMarkup(<PublicationCard publication={multiAuthorPublication} />);
    expect(markup).toContain('<strong');
    expect(markup).toContain('Dai Le');
    expect(markup).toContain('Sukanya Iyer');
    expect(markup).not.toMatch(/<strong[^>]*>Sukanya Iyer<\/strong>/);
    expect(markup).not.toMatch(/<strong[^>]*>Minsu Kim<\/strong>/);
  });

  it('highlights "Le Dai" name variant in the author list using strong', () => {
    const markup = renderToStaticMarkup(<PublicationCard publication={leDaiPublication} />);
    expect(markup).toContain('<strong');
    expect(markup).toContain('Le Dai');
    expect(markup).not.toMatch(/<strong[^>]*>Taejeong Ha<\/strong>/);
    expect(markup).not.toMatch(/<strong[^>]*>Jin Woo Kim<\/strong>/);
  });

  it('highlights "Dai Le" even without isProfileOwner flag', () => {
    const pubWithoutFlag: Publication = {
      ...publication,
      id: 'no-flag-paper',
      authors: [{ name: 'Dai Le' }],
    };
    const markup = renderToStaticMarkup(<PublicationCard publication={pubWithoutFlag} />);
    expect(markup).toMatch(/<strong[^>]*>Dai Le<\/strong>/);
  });

  it('shows "Abstract unavailable." when abstract is null', () => {
    const markup = renderToStaticMarkup(<PublicationCard publication={publication} />);
    expect(markup).toContain('Abstract unavailable.');
  });

  it('shows the real abstract when abstract is a non-empty string', () => {
    const markup = renderToStaticMarkup(<PublicationCard publication={withAbstract} />);
    expect(markup).toContain('This is the real abstract text for this paper.');
    expect(markup).not.toContain('Abstract unavailable.');
  });

  it('renders multi-paragraph abstracts as separate paragraphs', () => {
    const markup = renderToStaticMarkup(
      <PublicationCard publication={withMultiParagraphAbstract} />,
    );
    expect(markup).toContain('First paragraph of the abstract.');
    expect(markup).toContain('IMPORTANCE Second paragraph of the abstract.');
  });

  it('renders the abstract section as a collapsible details/summary element', () => {
    const markup = renderToStaticMarkup(<PublicationCard publication={publication} />);
    expect(markup).toContain('<details');
    expect(markup).toContain('<summary');
    expect(markup).toContain('Abstract');
  });

  it('still renders BibTeX when present', () => {
    const withBibtex: Publication = {
      ...publication,
      id: 'bibtex-paper',
      bibtex: '@article{test2024, title={Test}}',
    };
    const markup = renderToStaticMarkup(<PublicationCard publication={withBibtex} />);
    expect(markup).toContain('BibTeX');
    expect(markup).toContain('@article{test2024');
  });
});
