import { mkdirSync } from 'node:fs';
import path from 'node:path';

import { expect, test, type Page } from '@playwright/test';

/*
 * 6 palettes x 2 effective modes (homepage computed-style matrix), plus the
 * 6 x 2 x 3 viewports x 3 routes visual/runtime matrix, palette/mode runtime checks and appearance-control interactions.
 * Set APPEARANCE_CAPTURE=1 to also write screenshots under .my-dev-kit-workflow/screenshots.
 */

const palettes = ['mineral', 'oxblood', 'signal', 'cobalt', 'amber', 'original'] as const;
const modes = ['light', 'dark'] as const;
type PaletteId = (typeof palettes)[number];
type Mode = (typeof modes)[number];

const expected: Record<PaletteId, Record<Mode, { bg: string; fg: string; primary: string }>> = {
  mineral: {
    light: { bg: 'rgb(242, 240, 231)', fg: 'rgb(28, 41, 38)', primary: 'rgb(15, 113, 106)' },
    dark: { bg: 'rgb(20, 30, 28)', fg: 'rgb(236, 237, 229)', primary: 'rgb(104, 201, 186)' },
  },
  oxblood: {
    light: { bg: 'rgb(246, 241, 236)', fg: 'rgb(48, 33, 40)', primary: 'rgb(129, 44, 73)' },
    dark: { bg: 'rgb(33, 23, 28)', fg: 'rgb(245, 235, 230)', primary: 'rgb(224, 157, 178)' },
  },
  signal: {
    light: { bg: 'rgb(239, 241, 232)', fg: 'rgb(24, 33, 26)', primary: 'rgb(62, 109, 70)' },
    dark: { bg: 'rgb(17, 24, 21)', fg: 'rgb(235, 242, 229)', primary: 'rgb(172, 234, 116)' },
  },
  cobalt: {
    light: { bg: 'rgb(245, 240, 232)', fg: 'rgb(23, 39, 68)', primary: 'rgb(39, 81, 172)' },
    dark: { bg: 'rgb(17, 26, 41)', fg: 'rgb(239, 241, 245)', primary: 'rgb(139, 171, 255)' },
  },
  amber: {
    light: { bg: 'rgb(245, 240, 227)', fg: 'rgb(37, 38, 33)', primary: 'rgb(134, 89, 42)' },
    dark: { bg: 'rgb(27, 32, 30)', fg: 'rgb(245, 238, 220)', primary: 'rgb(234, 192, 120)' },
  },
  original: {
    light: { bg: 'rgb(237, 239, 243)', fg: 'rgb(21, 25, 36)', primary: 'rgb(8, 123, 145)' },
    dark: { bg: 'rgb(26, 29, 35)', fg: 'rgb(241, 243, 247)', primary: 'rgb(66, 203, 227)' },
  },
};

async function seed(page: Page, palette: string, theme: string) {
  await page.addInitScript(
    ([p, t]) => {
      localStorage.setItem('my-website-2026-palette', p);
      localStorage.setItem('my-website-2026-theme', t);
    },
    [palette, theme],
  );
}

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  return errors;
}

const parse = (rgb: string) => (rgb.match(/\d+/g) ?? []).slice(0, 3).map(Number);
function luminance(rgb: string) {
  const [r, g, b] = parse(rgb).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const noHorizontalOverflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);

for (const palette of palettes) {
  for (const mode of modes) {
    test(`homepage ${palette}/${mode} computed theme matrix`, async ({ page }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width: 1440, height: 900 });
      await seed(page, palette, mode);
      await page.goto('/');

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-palette', palette);
      await expect(html).toHaveAttribute('data-theme', mode);
      await expect(html).toHaveAttribute('data-theme-preference', mode);
      const want = expected[palette][mode];

      const styles = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        const color = (el: Element | null) => (el ? getComputedStyle(el).color : '');
        return {
          body: getComputedStyle(document.body).backgroundColor,
          h1: color(document.querySelector('h1')),
          eyebrow: color(document.querySelector('main .eyebrow')),
          nav: color(document.querySelector('nav[aria-label="Primary navigation"] a')),
          navTokenBg: root.getPropertyValue('--color-surface').trim(),
          cardBg: getComputedStyle(document.querySelector('main section .premium-card') as Element).backgroundColor,
          primaryToken: root.getPropertyValue('--color-accent-primary').trim(),
        };
      });

      expect(styles.body).toBe(want.bg);
      expect(styles.h1).toBe(want.fg);
      const expectedEyebrow = palette === 'original' && mode === 'light' ? 'rgb(0, 109, 130)' : want.primary;
      expect(styles.eyebrow).toBe(expectedEyebrow);

      // Readable navigation and hero: contrast against the surfaces they sit on.
      const surface = await page.evaluate(() => {
        const probe = document.createElement('i');
        probe.style.color = 'var(--color-surface)';
        document.body.append(probe);
        const value = getComputedStyle(probe).color;
        probe.remove();
        return value;
      });
      expect(contrast(styles.nav, surface)).toBeGreaterThanOrEqual(4.5);
      const historicalOriginal = palette === 'original';
      expect(contrast(styles.h1, styles.cardBg)).toBeGreaterThanOrEqual(historicalOriginal ? 7 : 7);
      expect(contrast(styles.eyebrow, styles.cardBg)).toBeGreaterThanOrEqual(historicalOriginal ? 4.2 : 4.5);

      await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await noHorizontalOverflow(page)).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

// ---------- Visual / runtime matrix: 5 x 2 x {390x844, 1440x900} x 3 routes ----------

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
];
const routes = ['/', '/projects', '/projects/my-dev-kit'];
const captureDir = path.join('.my-dev-kit-workflow', 'screenshots');

let baselineTopology: { nodes: string[]; connectors: string[] } | null = null;

for (const palette of palettes) {
  for (const mode of modes) {
    for (const viewport of viewports) {
      for (const route of routes) {
        test(`visual ${palette}/${mode} ${viewport.name} ${route}`, async ({ page }) => {
          const errors = collectErrors(page);
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await seed(page, palette, mode);
          await page.goto(route);
          await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

          expect(await noHorizontalOverflow(page)).toBe(true);
          await expect(page.getByRole('contentinfo')).toBeAttached();
          await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
          await expect(page.getByRole('contentinfo')).toBeVisible();
          await page.evaluate(() => window.scrollTo(0, 0));

          expect(await page.locator('[data-fx-layer], [data-fx-anim], .fx-layer').count()).toBe(0);
          await expect(page.locator('html')).not.toHaveAttribute('data-fx', /.+/);

          // First primary-nav link is the actual hit target at its center (nothing overlays it).
          const hit = await page.evaluate(() => {
            const link = document.querySelector('nav[aria-label="Primary navigation"] a') as HTMLElement;
            const r = link.getBoundingClientRect();
            const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
            return !!top && (top === link || link.contains(top));
          });
          expect(hit).toBe(true);

          // Keyboard focus ring remains visible.
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          const outline = await page.evaluate(() => {
            const style = getComputedStyle(document.activeElement as Element);
            return { width: style.outlineWidth, style: style.outlineStyle };
          });
          expect(outline.style).not.toBe('none');
          expect(parseFloat(outline.width)).toBeGreaterThanOrEqual(2);

          if (route === '/projects/my-dev-kit') {
            const diagram = page.locator('[data-diagram="my-dev-kit-ecosystem"]');
            await expect(diagram).toBeVisible();
            const topology = await diagram.evaluate((el) => ({
              nodes: Array.from(el.querySelectorAll('[data-diagram-node]')).map((n) => n.getAttribute('data-diagram-node') ?? ''),
              connectors: Array.from(el.querySelectorAll('[data-diagram-connector]')).map((n) => n.getAttribute('data-diagram-connector') ?? ''),
            }));
            expect(topology.nodes.length).toBeGreaterThanOrEqual(6);
            baselineTopology ??= topology;
            expect(topology).toEqual(baselineTopology);
            const clipped = await diagram.evaluate((el) => {
              const bounds = el.getBoundingClientRect();
              return Array.from(el.querySelectorAll('[data-diagram-node],[data-diagram-connector]')).some((n) => {
                const r = n.getBoundingClientRect();
                return r.left < bounds.left - 1 || r.right > bounds.right + 1;
              });
            });
            expect(clipped).toBe(false);
          }

          if (process.env.APPEARANCE_CAPTURE) {
            mkdirSync(captureDir, { recursive: true });
            const slug = route === '/' ? 'home' : route.slice(1).replace(/\//g, '-');
            await page.screenshot({
              path: path.join(captureDir, `${palette}-${mode}-${viewport.name}-${slug}.png`),
              animations: 'disabled',
            });
          }
          expect(errors).toEqual([]);
        });
      }
    }
  }
}

for (const viewport of viewports) {
  for (const route of ['/about', '/publications', '/contact']) {
    test(`mineral default ${viewport.name} ${route}`, async ({ page }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-palette', 'mineral');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await noHorizontalOverflow(page)).toBe(true);
      if (process.env.APPEARANCE_CAPTURE) {
        mkdirSync(captureDir, { recursive: true });
        await page.screenshot({
          path: path.join(captureDir, `mineral-default-${viewport.name}-${route.slice(1)}.png`),
          animations: 'disabled',
        });
      }
      expect(errors).toEqual([]);
    });
  }
}

// ---------- Diagram semantics ----------

test('diagram flow colors follow the active palette tokens', async ({ page }) => {
  for (const [palette, mode] of [['mineral', 'light'], ['cobalt', 'dark'], ['amber', 'light'], ['original', 'dark']] as const) {
    await seed(page, palette, mode);
    await page.goto('/projects/my-dev-kit');
    const tokens = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return {
        primary: root.getPropertyValue('--color-accent-primary').trim(),
        secondary: root.getPropertyValue('--color-accent-secondary').trim(),
        data: root.getPropertyValue('--diagram-flow-data').trim(),
        control: root.getPropertyValue('--diagram-flow-control').trim(),
      };
    });
    expect(tokens.data).toBe(tokens.primary);
    expect(tokens.control).toBe(tokens.secondary);
    expect(tokens.primary).not.toBe(tokens.secondary);
  }
});

// ---------- Appearance control ----------

const labels: Record<PaletteId, string> = {
  mineral: 'Mineral Research',
  oxblood: 'Oxblood Atelier',
  signal: 'Signal Green',
  cobalt: 'Cobalt & Terracotta',
  amber: 'Amber & Graphite',
  original: 'Violet & Graphite',
};
const trigger = (page: Page) => page.getByRole('button', { name: /^Appearance/ });
const dialog = (page: Page) => page.getByRole('dialog', { name: 'Appearance settings' });
const choose = (page: Page, name: string) => dialog(page).locator(`label:text-is("${name}")`).click();

for (const palette of palettes) {
  test(`appearance control selects ${labels[palette]} and exposes only palette and color mode`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await trigger(page).click();
    await expect(dialog(page)).toBeVisible();
    await expect(page.getByRole('group', { name: 'Palette' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Color mode' })).toBeVisible();
    await expect(page.getByRole('group', { name: /effects/i })).toHaveCount(0);
    await expect(dialog(page).getByRole('radio')).toHaveCount(9);
    await choose(page, labels[palette]);
    await choose(page, 'Dark');
    const root = page.locator('html');
    await expect(root).toHaveAttribute('data-palette', palette);
    await expect(root).toHaveAttribute('data-theme', 'dark');
    await expect(root).not.toHaveAttribute('data-fx', /.+/);
    expect(await page.locator('[data-fx-layer], [data-fx-anim], .fx-layer').count()).toBe(0);
    expect(await page.evaluate(() => localStorage.getItem('my-website-2026-fx'))).toBeNull();
  });
}

// ---------- Violet & Graphite ----------

test('original: persists across reload and navigation and keeps cyan/violet roles', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await trigger(page).click();
  await choose(page, labels.original);
  await choose(page, 'Dark');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-palette', 'original');
  await page.reload();
  await expect(html).toHaveAttribute('data-palette', 'original');
  await page.goto('/projects/my-dev-kit');
  await expect(html).toHaveAttribute('data-palette', 'original');

  const roles = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const probe = (value: string) => {
      const el = document.createElement('i');
      el.style.color = value;
      document.body.append(el);
      const out = getComputedStyle(el).color;
      el.remove();
      return out;
    };
    return {
      data: probe('var(--diagram-flow-data)'),
      control: probe('var(--diagram-flow-control)'),
      focus: probe('var(--color-focus-ring)'),
      hover: probe('var(--color-action-hover)'),
      logo: probe('var(--color-logo-accent)'),
      selection: root.getPropertyValue('--color-selection').trim(),
      glow: root.getPropertyValue('--color-glow').trim(),
      glowSecondary: root.getPropertyValue('--color-glow-secondary').trim(),
    };
  });
  expect(roles.data).toBe('rgb(66, 203, 227)');
  expect(roles.control).toBe('rgb(169, 140, 248)');
  expect(roles.focus).toBe('rgb(66, 203, 227)');
  expect(roles.hover).toBe('rgb(169, 140, 248)');
  expect(roles.logo).toBe('rgb(169, 140, 248)');
  expect(roles.selection).toBe('rgb(167 139 250 / 28%)');
  expect(roles.glow).toBe('rgb(169 140 248 / 13%)');
  expect(roles.glowSecondary).toBe('rgb(66 203 227 / 10%)');

  // Light mode restores the original light graphite surfaces.
  await page.evaluate(() => {
    localStorage.setItem('my-website-2026-theme', 'light');
  });
  await page.reload();
  expect(await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(237, 239, 243)');
});

test('original: primary action hovers violet while other palettes hover with their primary accent', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [palette, want] of [
    ['original', 'rgb(169, 140, 248)'],
    ['mineral', 'rgb(104, 201, 186)'],
  ] as const) {
    await seed(page, palette, 'dark');
    await page.goto('/');
    const button = page.locator('main section a').first();
    await button.hover();
    await expect
      .poll(() => button.evaluate((el) => getComputedStyle(el).backgroundColor))
      .toBe(want);
  }
});

test('Violet & Graphite retains static cyan and violet atmosphere with no effect artwork', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await seed(page, 'original', 'dark');
  await page.goto('/');
  await expect(page.locator('.hero-backdrop').first()).toBeVisible();
  const atmosphere = await page.locator('.hero-backdrop').first().evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(atmosphere).toContain('169, 140, 248, 0.13');
  expect(atmosphere).toContain('rgb(66, 203, 227)');
  expect(await page.locator('[data-fx-layer], [data-fx-anim], .fx-layer').count()).toBe(0);
  await expect(page.locator('html')).not.toHaveAttribute('data-fx', /.+/);
});
