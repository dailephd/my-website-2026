import { describe, expect, it } from 'vitest';

import { profile } from '@/content/profile';

describe('basic accessibility content assumptions', () => {
  it('has a profile name for the page heading', () => {
    expect(profile.name.length).toBeGreaterThan(0);
  });
});