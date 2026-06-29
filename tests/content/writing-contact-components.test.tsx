import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import ContactCard from '@/components/contact/ContactCard';
import ContactPanel from '@/components/contact/ContactPanel';
import WritingCard from '@/components/writing/WritingCard';
import WritingEmptyState from '@/components/writing/WritingEmptyState';
import type { ContactChannel, ContactPanelViewModel } from '@/types/contact';
import type { WritingItem } from '@/types/writing';

const channel: ContactChannel = {
  id: 'work',
  label: 'View work',
  href: '/work',
  kind: 'work',
  description: 'Review selected work.',
  external: false,
  displayPriority: 10,
  primary: true,
};
const writing: WritingItem = {
  id: 'note',
  slug: 'note',
  title: 'Verified note',
  summary: 'A concise summary.',
  status: 'published',
  type: 'note',
  tags: [],
  displayPriority: 10,
  featured: false,
  href: '/writing/note',
};

describe('writing and contact components', () => {
  it('renders writing title, summary, type and status without empty metadata', () => {
    const markup = renderToStaticMarkup(<WritingCard item={writing} />);
    expect(markup).toContain('Verified note');
    expect(markup).toContain('A concise summary.');
    expect(markup).toContain('Note');
    expect(markup).toContain('Published');
    expect(markup).not.toContain('Writing topics');
  });

  it('renders useful writing-empty links and contact channels', () => {
    expect(renderToStaticMarkup(<WritingEmptyState pathways={[channel]} />)).toContain('/work');
    expect(renderToStaticMarkup(<ContactCard channel={channel} />)).toContain('View work');
  });

  it('renders no-email fallback without a submitting form', () => {
    const panel: ContactPanelViewModel = {
      heading: 'Start with the work',
      summary: 'Context first.',
      availabilityNote: 'No direct email is listed.',
      channels: [channel],
      primaryChannels: [channel],
      hasDirectEmail: false,
    };
    const markup = renderToStaticMarkup(<ContactPanel panel={panel} />);
    expect(markup).toContain('No direct email is listed.');
    expect(markup).not.toContain('<form');
  });
});
