import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { PALETTE_IDS } from '@/lib/constants';

const css = {
  tokens: readFileSync('src/styles/tokens.css', 'utf8'),
  theme: readFileSync('src/styles/theme.css', 'utf8'),
  palettes: readFileSync('src/styles/palettes.css', 'utf8'),
  globals: readFileSync('src/app/globals.css', 'utf8'),
  diagrams: readFileSync('src/styles/diagrams.css', 'utf8'),
  utilities: readFileSync('src/styles/utilities.css', 'utf8'),
};

type Mode = 'light' | 'dark';

/** Returns the declaration block that defines the given palette/mode scheme. */
function schemeBlock(palette: string, mode: Mode): string {
  if (palette === 'mineral') {
    const match =
      mode === 'light'
        ? css.tokens.match(/\n:root \{[\s\S]*?\n\}/)
        : css.theme.match(/\n:root\.dark,[\s\S]*?\n\}/);
    expect(match, `mineral/${mode} block`).not.toBeNull();
    return match![0];
  }
  const selector =
    mode === 'light'
      ? `:root[data-palette='${palette}'] {`
      : `:root[data-palette='${palette}'][data-theme='dark'],`;
  const start = css.palettes.indexOf(selector);
  expect(start, `${palette}/${mode} block`).toBeGreaterThan(-1);
  return css.palettes.slice(start, css.palettes.indexOf('\n}', start));
}

function tokenMap(block: string) {
  const map: Record<string, string> = {};
  for (const [, name, value] of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) map[name] = value.trim();
  return map;
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

// [background, primary text, surface] brand anchors supplied by the planner.
const anchors: Record<string, Record<Mode, [string, string, string]>> = {
  mineral: { light: ['#f2f0e7', '#1c2926', '#e3e3d8'], dark: ['#141e1c', '#ecede5', '#22302c'] },
  oxblood: { light: ['#f6f1ec', '#302128', '#e7dcd6'], dark: ['#21171c', '#f5ebe6', '#34252c'] },
  signal: { light: ['#eff1e8', '#18211a', '#dce2d1'], dark: ['#111815', '#ebf2e5', '#1d2920'] },
  cobalt: { light: ['#f5f0e8', '#172744', '#e6e0d8'], dark: ['#111a29', '#eff1f5', '#1d2a3d'] },
  amber: { light: ['#f5f0e3', '#252621', '#e7decc'], dark: ['#1b201e', '#f5eedc', '#29312d'] },
  original: { light: ['#edeff3', '#151924', '#f2f4f8'], dark: ['#1a1d23', '#f1f3f7', '#1d222b'] },
};

const required = [
  '--color-background',
  '--color-surface',
  '--color-card',
  '--color-elevated',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-text-muted',
  '--color-border',
  '--color-border-strong',
  '--color-accent-primary',
  '--color-accent-secondary',
  '--color-accent-secondary-text',
  '--color-focus-ring',
  '--color-on-accent',
  '--color-selection',
  '--color-glow',
  '--color-glow-secondary',
  '--color-highlight',
  '--shadow-card',
  '--shadow-card-hover',
  '--shadow-control',
];

describe('ten palette/mode schemes', () => {
  for (const palette of PALETTE_IDS) {
    for (const mode of ['light', 'dark'] as const) {
      describe(`${palette}/${mode}`, () => {
        const tokens = tokenMap(schemeBlock(palette, mode));

        it('defines every required semantic token', () => {
          for (const name of required) expect(tokens[name], name).toBeTruthy();
        });

        it('uses the planner background, text and surface anchors', () => {
          const [background, text, surface] = anchors[palette][mode];
          expect(tokens['--color-background']).toBe(background);
          expect(tokens['--color-text-primary']).toBe(text);
          expect(tokens['--color-surface']).toBe(surface);
        });

        it('avoids pure white and pure black grounds', () => {
          for (const name of ['--color-background', '--color-surface', '--color-card', '--color-elevated']) {
            expect(tokens[name]).not.toMatch(/^#(fff(fff)?|000(000)?)$/i);
          }
        });

        it('meets WCAG AA for text, accents and borders on every ground', () => {
          const grounds = ['--color-background', '--color-surface', '--color-card', '--color-elevated'].map(
            (name) => tokens[name],
          );
          const min = (name: string) => Math.min(...grounds.map((ground) => contrast(tokens[name], ground)));
          // Original reproduces the pre-redesign values verbatim, so a few roles sit below the AA
          // floor the newer palettes were derived to meet. The measured floors are pinned here (and
          // documented in docs/DESIGN.md) so any further regression still fails.
          const original = palette === 'original';
          const floor = (aa: number, measured: number) => (original ? measured : aa);
          const light = mode === 'light';
          expect(min('--color-text-primary')).toBeGreaterThanOrEqual(7);
          expect(min('--color-text-secondary')).toBeGreaterThanOrEqual(floor(7, 6.8));
          expect(min('--color-text-muted')).toBeGreaterThanOrEqual(floor(4.5, light ? 4.2 : 4.5));
          expect(min('--color-accent-primary')).toBeGreaterThanOrEqual(floor(4.5, light ? 4.2 : 4.5));
          expect(min('--color-accent-secondary-text')).toBeGreaterThanOrEqual(4.5);
          expect(min('--color-accent-secondary')).toBeGreaterThanOrEqual(3);
          expect(min('--color-border-strong')).toBeGreaterThanOrEqual(floor(3, light ? 1.7 : 2));
          expect(min('--color-focus-ring')).toBeGreaterThanOrEqual(3);
          expect(
            contrast(tokens['--color-on-accent'], tokens['--color-accent-primary']),
          ).toBeGreaterThanOrEqual(4.5);
        });
      });
    }
  }
});

describe('Violet & Graphite restoration', () => {
  const light = tokenMap(schemeBlock('original', 'light'));
  const dark = tokenMap(schemeBlock('original', 'dark'));

  it('reproduces the historical light values exactly', () => {
    expect(light).toMatchObject({
      '--color-background': '#edeff3',
      '--color-surface': '#f2f4f8',
      '--color-card': '#f6f7fa',
      '--color-elevated': '#fbfbfd',
      '--color-text-primary': '#151924',
      '--color-text-secondary': '#4a5262',
      '--color-text-muted': '#687284',
      '--color-border': '#cbd1dc',
      '--color-border-strong': '#aeb7c7',
      '--color-accent-secondary': '#6d3ee8',
      '--color-accent-primary': '#087b91',
      '--color-focus-ring': '#087b91',
      '--color-on-accent': '#f7f8fb',
      '--color-selection': 'rgb(124 58 237 / 20%)',
      '--color-glow': 'rgb(109 62 232 / 13%)',
      '--color-glow-secondary': 'rgb(8 123 145 / 10%)',
      '--color-highlight': 'rgb(255 255 255 / 72%)',
      '--shadow-card': '0 18px 55px rgb(35 42 56 / 9%)',
      '--shadow-card-hover': '0 24px 70px rgb(35 42 56 / 14%)',
      '--shadow-control': '0 7px 24px rgb(35 42 56 / 11%)',
    });
  });

  it('reproduces the historical dark values exactly', () => {
    expect(dark).toMatchObject({
      '--color-background': '#1a1d23',
      '--color-surface': '#1d222b',
      '--color-card': '#232935',
      '--color-elevated': '#2a3140',
      '--color-text-primary': '#f1f3f7',
      '--color-text-secondary': '#c5ccda',
      '--color-text-muted': '#929db0',
      '--color-border': '#384151',
      '--color-border-strong': '#526077',
      '--color-accent-secondary': '#a98cf8',
      '--color-accent-primary': '#42cbe3',
      '--color-focus-ring': '#42cbe3',
      '--color-on-accent': '#171a21',
      '--color-selection': 'rgb(167 139 250 / 28%)',
      '--color-glow': 'rgb(169 140 248 / 13%)',
      '--color-glow-secondary': 'rgb(66 203 227 / 10%)',
      '--color-highlight': 'rgb(255 255 255 / 6%)',
      '--shadow-card': '0 22px 62px rgb(5 7 11 / 35%)',
      '--shadow-card-hover': '0 28px 78px rgb(5 7 11 / 48%)',
      '--shadow-control': '0 8px 26px rgb(5 7 11 / 30%)',
    });
  });

  it('keeps cyan as primary (data/link/focus) and violet as secondary (control/selection/glow)', () => {
    for (const tokens of [light, dark]) {
      expect(tokens['--color-focus-ring']).toBe(tokens['--color-accent-primary']);
    }
    expect(light['--color-action-hover']).toBe('var(--color-accent-secondary)');
    expect(light['--color-logo-accent']).toBe('var(--color-accent-secondary)');
    expect(light['--color-selection']).toMatch(/^rgb\(124 58 237/);
    expect(dark['--color-selection']).toMatch(/^rgb\(167 139 250/);
    expect(light['--color-glow']).toMatch(/^rgb\(109 62 232/);
    expect(light['--color-glow-secondary']).toMatch(/^rgb\(8 123 145/);
  });

  it('leaves the other palettes on primary-colored hover and logo accents', () => {
    expect(css.tokens).toContain('--color-action-hover: var(--color-accent-primary)');
    expect(css.tokens).toContain('--color-logo-accent: var(--color-accent-primary)');
    expect(css.palettes.match(/--color-action-hover/g)).toHaveLength(1);
  });
});

describe('token architecture', () => {
  it('orders imports so palette and utility rules precede diagrams', () => {
    const { globals } = css;
    expect(globals.indexOf('theme.css')).toBeLessThan(globals.indexOf('palettes.css'));
    expect(globals.indexOf('palettes.css')).toBeLessThan(globals.indexOf('utilities.css'));
    expect(globals.indexOf('utilities.css')).toBeLessThan(globals.indexOf('diagrams.css'));
  });

  it('keeps legacy violet/cyan names only as documented compatibility aliases', () => {
    expect(css.tokens).toContain('--color-accent-violet: var(--color-accent-secondary)');
    expect(css.tokens).toContain('--color-accent-cyan: var(--color-accent-primary)');
    expect(css.palettes).not.toMatch(/accent-(violet|cyan)/);
  });

  it('keeps palette materials and Violet & Graphite atmosphere static in shared utilities', () => {
    expect(css.utilities).toContain('.premium-card::after');
    expect(css.utilities).toContain(":root[data-palette='original'] .hero-backdrop");
    expect(css.utilities).toContain('linear-gradient(90deg, transparent, var(--color-accent-primary), transparent)');
    expect(css.utilities).not.toMatch(/animation|@keyframes|data-fx/);
  });

  it('keeps ordinary interaction feedback reduced-motion safe', () => {
    expect(css.utilities).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition: none;[\s\S]*?transform: none;/);
  });

  it('maps diagram flows onto the neutral accent roles', () => {
    expect(css.diagrams).toContain('--diagram-flow-data: var(--color-accent-primary)');
    expect(css.diagrams).toContain('--diagram-flow-control: var(--color-accent-secondary)');
  });
});
