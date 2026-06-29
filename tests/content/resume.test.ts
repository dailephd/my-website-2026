import { describe, expect, it } from 'vitest';

import { getResumeLink, getResumeMetadata } from '@/lib/content';

describe('resume adapter', () => {
  it('reports that the placeholder asset is unavailable', () => {
    expect(getResumeMetadata()).toMatchObject({
      id: 'resume',
      href: '/files/resume.pdf',
      fileType: 'PDF',
      available: false,
    });
    expect(getResumeLink()).toBeUndefined();
  });
});
