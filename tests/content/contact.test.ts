import { describe, expect, it } from 'vitest';

import { getContactChannels, getContactPanel, getPrimaryContactChannels } from '@/lib/content';

describe('contact adapters', () => {
  it('derives deterministic channels only from existing links', () => {
    expect(getContactChannels().map(({ id }) => id)).toEqual([
      'view-work',
      'explore-products',
      'about',
    ]);
    expect(getContactChannels().every(({ href }) => href.length > 0)).toBe(true);
  });

  it('returns prioritized channels and handles missing email safely', () => {
    expect(getPrimaryContactChannels().map(({ id }) => id)).toEqual([
      'view-work',
      'explore-products',
    ]);
    expect(getContactPanel().hasDirectEmail).toBe(false);
    expect(getContactPanel().channels.some(({ kind }) => kind === 'email')).toBe(false);
    expect(getContactPanel()).not.toHaveProperty('formEndpoint');
  });
});
