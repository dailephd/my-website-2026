import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const pkg = JSON.parse(readFileSync(path.resolve('package.json'), 'utf-8'));

describe('real contact email test script', () => {
  it('is registered as its own npm script', () => {
    expect(pkg.scripts['test:contact-email']).toBe('node scripts/send-contact-test.mjs');
  });

  it('is not included in test, test:all, or ci scripts', () => {
    for (const scriptName of ['test', 'test:all', 'ci']) {
      expect(pkg.scripts[scriptName]).not.toContain('test:contact-email');
    }
  });
});
