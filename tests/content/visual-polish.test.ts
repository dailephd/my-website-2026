import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('M12 visual polish contract', () => {
  const tokens = readFileSync('src/styles/tokens.css', 'utf8');
  const theme = readFileSync('src/styles/theme.css', 'utf8');
  const utilities = readFileSync('src/styles/utilities.css', 'utf8');
  const globals = readFileSync('src/app/globals.css', 'utf8');

  it('preserves approved soft-grey and charcoal backgrounds', () => {
    expect(tokens).toContain('--color-background: #edeff3');
    expect(theme).toContain('--color-background: #1a1d23');
    expect(`${tokens}${theme}`).not.toMatch(/--color-background:\s*(#fff(?:fff)?|#000(?:000)?|white|black)/i);
  });

  it('defines reusable premium surfaces without visual dependencies', () => {
    expect(utilities).toContain('.premium-card');
    expect(utilities).toContain('.hero-backdrop');
    expect(utilities).toContain('.quiet-grid');
    expect(tokens).toContain('--shadow-card-hover');
  });

  it('protects reduced-motion preferences', () => {
    expect(utilities).toContain('@media (prefers-reduced-motion: reduce)');
    expect(utilities).toContain('transform: none');
    expect(globals).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
