import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { DEFAULT_PALETTE, FIXED_DARK_PALETTES, PALETTE_IDS, PALETTES } from '@/lib/constants';

const tokensCss = readFileSync('src/styles/art-tokens.css', 'utf8');
const artCss = readFileSync('src/styles/art.css', 'utf8');
const globals = readFileSync('src/app/globals.css', 'utf8');

type Mode = 'light' | 'dark';

function declarations(block: string) {
  const map: Record<string, string> = {};
  for (const [, name, value] of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) map[name] = value.trim();
  return map;
}

function blockAt(selector: string) {
  const start = tokensCss.indexOf(selector);
  expect(start, selector).toBeGreaterThan(-1);
  return tokensCss.slice(start, tokensCss.indexOf('\n}', start));
}

/** Resolved role map for one appearance: the light block, overlaid by the dark block in dark mode. */
function appearance(palette: string, mode: Mode) {
  if (palette === 'onedark') return declarations(blockAt(":root[data-palette='onedark'] {"));
  const light = declarations(blockAt(`:root[data-palette='${palette}'] {`));
  if (mode === 'light') return light;
  return { ...light, ...declarations(blockAt(`:root[data-palette='${palette}'][data-theme='dark'],`)) };
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** sRGB mix of two hex colors, mirroring color-mix(in srgb, a pct%, b). */
function mix(a: string, pct: number, b: string) {
  const channel = (hex: string, i: number) => parseInt(hex.slice(i, i + 2), 16);
  return `#${[1, 3, 5]
    .map((i) => Math.round((channel(a, i) * pct) / 100 + (channel(b, i) * (100 - pct)) / 100).toString(16).padStart(2, '0'))
    .join('')}`;
}

const appearances = [
  ...PALETTE_IDS.filter((id) => !FIXED_DARK_PALETTES.includes(id)).flatMap((id) => [
    [id, 'light'] as const,
    [id, 'dark'] as const,
  ]),
  ...FIXED_DARK_PALETTES.map((id) => [id, 'dark'] as const),
];

describe('art direction: seven families, thirteen appearances', () => {
  it('resolves 13 appearances from seven palettes', () => {
    expect(PALETTES).toHaveLength(7);
    expect(appearances).toHaveLength(13);
    expect(DEFAULT_PALETTE).toBe('original');
    expect(FIXED_DARK_PALETTES).toEqual(['onedark']);
  });

  it('keeps the stylesheet order: reference palettes, utilities, art tokens, art consumers, diagrams', () => {
    const order = ['palettes.css', 'utilities.css', 'art-tokens.css', 'art.css', 'diagrams.css'].map((file) =>
      globals.indexOf(file),
    );
    expect(order.every((index) => index > -1)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  for (const [palette, mode] of appearances) {
    describe(`${palette}/${mode}`, () => {
      const t = appearance(palette, mode);
      const grounds = ['--color-background', '--color-surface', '--color-card', '--color-elevated'].map((n) => t[n]);
      const min = (name: string) => Math.min(...grounds.map((ground) => contrast(t[name], ground)));

      it('defines the semantic, status, hero and art roles', () => {
        for (const name of [
          '--color-background', '--color-surface', '--color-card', '--color-elevated', '--color-text-primary',
          '--color-text-secondary', '--color-text-muted', '--color-border', '--color-border-strong',
          '--color-accent-primary', '--color-accent-secondary', '--color-focus-ring', '--color-on-accent',
          '--color-danger', '--color-success', '--color-warning', '--shadow-card', '--shadow-card-hover',
          '--art-hero-bg', '--art-hero-fg', '--art-header-bg', '--art-canvas-image', '--art-hero-elevated',
        ]) {
          expect(t[name], name).toBeTruthy();
        }
      });

      it('keeps text, accents, borders and focus readable on every ground', () => {
        expect(min('--color-text-primary')).toBeGreaterThanOrEqual(7);
        expect(min('--color-text-secondary')).toBeGreaterThanOrEqual(4.5);
        expect(min('--color-text-muted')).toBeGreaterThanOrEqual(4.5);
        expect(min('--color-accent-primary-text')).toBeGreaterThanOrEqual(4.5);
        expect(min('--color-accent-secondary-text')).toBeGreaterThanOrEqual(4.5);
        expect(min('--color-border-strong')).toBeGreaterThanOrEqual(3);
        expect(min('--color-focus-ring')).toBeGreaterThanOrEqual(3);
        expect(contrast(t['--color-on-accent'], t['--color-accent-primary'])).toBeGreaterThanOrEqual(4.5);
      });

      it('keeps status colors readable on the card ground', () => {
        for (const name of ['--color-danger', '--color-success', '--color-warning']) {
          expect(contrast(t[name], t['--color-card']), name).toBeGreaterThanOrEqual(4.5);
        }
      });

      it('keeps navigation text readable on the header surface', () => {
        expect(contrast(t['--color-text-primary'], t['--art-header-bg'])).toBeGreaterThanOrEqual(7);
        expect(contrast(t['--color-text-secondary'], t['--art-header-bg'])).toBeGreaterThanOrEqual(4.5);
      });

      it('keeps the hero foreground pair and its button pair readable', () => {
        const bg = t['--art-hero-bg'];
        const fg = t['--art-hero-fg'];
        const muted = t['--art-hero-muted'].startsWith('color-mix') ? mix(fg, 84, bg) : t['--art-hero-muted'];
        expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(muted, bg)).toBeGreaterThanOrEqual(4.5);
        // Secondary hero button: foreground text on the lifted hero fill (--art-hero-elevated).
        const elevated = t['--art-hero-elevated'].match(/color-mix\(in srgb, (white|var\(--art-hero-fg\)) (\d+)%/)!;
        expect(contrast(fg, mix(elevated[1] === 'white' ? '#ffffff' : fg, Number(elevated[2]), bg))).toBeGreaterThanOrEqual(4.5);
      });
    });
  }

  it('gives every family a distinguishable material beyond hue', () => {
    const radius = new Set(PALETTE_IDS.map((id) => declarations(blockAt(id === 'onedark' ? ":root[data-palette='onedark'] {" : `:root[data-palette='${id}'] {`))['--art-radius-card']));
    const display = new Set(PALETTE_IDS.map((id) => declarations(blockAt(id === 'onedark' ? ":root[data-palette='onedark'] {" : `:root[data-palette='${id}'] {`))['--art-display-font'] ?? 'default'));
    expect(radius.size).toBeGreaterThanOrEqual(5);
    expect(display.size).toBeGreaterThanOrEqual(6);
  });

  it('keeps decoration behind content, non-interactive and independent of remote assets', () => {
    expect(artCss).not.toMatch(/https?:\/\//);
    expect(tokensCss).not.toMatch(/url\(\s*["']?https?:/);
    for (const selector of ['[data-site-shell]::before', '[data-site-header]::after', '[data-site-footer]::before']) {
      const body = artCss.slice(artCss.indexOf(selector), artCss.indexOf('}', artCss.indexOf(selector)));
      expect(body, selector).toContain('pointer-events: none');
    }
  });

  it('honors reduced motion, reduced transparency and forced colors', () => {
    expect(artCss).toMatch(/@media \(prefers-reduced-motion: no-preference\)[\s\S]*?animation:/);
    expect(artCss).toMatch(/@media \(hover: hover\) and \(prefers-reduced-motion: no-preference\)/);
    expect(artCss).toContain('@media (prefers-reduced-transparency: reduce)');
    expect(artCss).toContain('@media (forced-colors: active)');
    expect(artCss).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition: none;/);
  });

  it('has no permanent animation, layout animation or cursor tracking', () => {
    const keyframes = artCss.match(/@keyframes[^{]+\{[\s\S]*?\}\s*\}|@keyframes[^\n]+/g) ?? [];
    for (const frame of keyframes) expect(frame).not.toMatch(/\b(width|height|top|left|margin|padding)\s*:/);
    expect(artCss).not.toMatch(/animation:[^;]*infinite/);
    expect(artCss).not.toMatch(/mousemove|pointermove/);
  });
});
