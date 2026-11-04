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
  "mineral": {
    "light": {
      "bg": "rgb(238, 233, 219)",
      "fg": "rgb(247, 243, 230)",
      "primary": "rgb(247, 243, 230)"
    },
    "dark": {
      "bg": "rgb(16, 25, 26)",
      "fg": "rgb(245, 241, 223)",
      "primary": "rgb(245, 241, 223)"
    }
  },
  "oxblood": {
    "light": {
      "bg": "rgb(246, 239, 232)",
      "fg": "rgb(251, 243, 234)",
      "primary": "rgb(251, 243, 234)"
    },
    "dark": {
      "bg": "rgb(23, 10, 16)",
      "fg": "rgb(253, 241, 232)",
      "primary": "rgb(253, 241, 232)"
    }
  },
  "signal": {
    "light": {
      "bg": "rgb(238, 241, 228)",
      "fg": "rgb(183, 242, 125)",
      "primary": "rgb(183, 242, 125)"
    },
    "dark": {
      "bg": "rgb(6, 11, 7)",
      "fg": "rgb(185, 247, 124)",
      "primary": "rgb(185, 247, 124)"
    }
  },
  "cobalt": {
    "light": {
      "bg": "rgb(244, 236, 220)",
      "fg": "rgb(255, 250, 240)",
      "primary": "rgb(255, 250, 240)"
    },
    "dark": {
      "bg": "rgb(11, 19, 48)",
      "fg": "rgb(11, 19, 48)",
      "primary": "rgb(11, 19, 48)"
    }
  },
  "amber": {
    "light": {
      "bg": "rgb(243, 234, 214)",
      "fg": "rgb(247, 231, 194)",
      "primary": "rgb(247, 231, 194)"
    },
    "dark": {
      "bg": "rgb(23, 22, 19)",
      "fg": "rgb(26, 20, 6)",
      "primary": "rgb(26, 20, 6)"
    }
  },
  "original": {
    "light": {
      "bg": "rgb(236, 234, 246)",
      "fg": "rgb(255, 255, 255)",
      "primary": "rgb(255, 255, 255)"
    },
    "dark": {
      "bg": "rgb(14, 12, 26)",
      "fg": "rgb(246, 243, 255)",
      "primary": "rgb(246, 243, 255)"
    }
  }
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
      const expectedEyebrow = want.primary;
      expect(styles.eyebrow).toBe(expectedEyebrow);

      // Shared source defaults must resolve to usable CSS rather than generator placeholders.
      const validShadows = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        if (document.documentElement.dataset.palette === 'cobalt') {
          const dark = document.documentElement.dataset.theme === 'dark';
          const color = dark ? '#d2603a' : '#b4461f';
          const probe = document.createElement('div');
          document.body.append(probe);
          for (const [role, offset] of [['--shadow-card', 4], ['--shadow-card-hover', 7]] as const) {
            probe.style.boxShadow = `${offset}px ${offset}px 0 ${color}`;
            const expected = getComputedStyle(probe).boxShadow;
            probe.style.boxShadow = root.getPropertyValue(role).trim();
            if (getComputedStyle(probe).boxShadow !== expected) {
              probe.remove();
              return false;
            }
          }
          // Hero-local text aliases must not recolor the released poster shadow.
          probe.style.boxShadow = `8px 8px 0 ${dark ? '#8fa9ff' : '#a33e18'}`;
          const heroShadow = getComputedStyle(probe).boxShadow;
          if (getComputedStyle(document.querySelector('.hero-backdrop') as Element).boxShadow !== heroShadow) {
            probe.remove();
            return false;
          }
          probe.remove();
        }
        return ['--shadow-control', '--art-primary-shadow', '--art-pressed-shadow'].every((role) =>
          CSS.supports('box-shadow', root.getPropertyValue(role).trim()),
        );
      });
      expect(validShadows).toBe(true);

      // Shared cards consume the released card material, not generic surfaces.
      const cardMaterial = await page.evaluate(() => {
        const card = document.querySelector('main .premium-card:not(.hero-backdrop)');
        if (!card) throw new Error('Missing shared card');
        const root = getComputedStyle(document.documentElement);
        const probe = document.createElement('div');
        document.body.append(probe);
        probe.style.backgroundColor = root.getPropertyValue('--art-card-bg');
        probe.style.borderColor = root.getPropertyValue('--art-card-border');
        probe.style.boxShadow = root.getPropertyValue('--shadow-card');
        const expected = getComputedStyle(probe);
        const actual = getComputedStyle(card);
        const result = actual.backgroundColor === expected.backgroundColor && actual.borderTopColor === expected.borderTopColor && actual.boxShadow === expected.boxShadow;
        probe.remove();
        return result;
      });
      expect(cardMaterial).toBe(true);

      // Readable navigation and hero: contrast against the surfaces they sit on.
      const surface = await page.evaluate(() => {
        const link = document.querySelector('nav[aria-label="Primary navigation"] a') as Element;
        const linkBackground = getComputedStyle(link).backgroundColor;
        if (linkBackground !== 'rgba(0, 0, 0, 0)') return linkBackground;
        const probe = document.createElement('i');
        probe.style.color = 'var(--art-header-bg)';
        document.body.append(probe);
        const value = getComputedStyle(probe).color;
        probe.remove();
        return value;
      });
      expect(contrast(styles.nav, surface)).toBeGreaterThanOrEqual(4.5);
      const historicalOriginal = palette === 'original';
      expect(contrast(styles.h1, styles.cardBg)).toBeGreaterThanOrEqual(historicalOriginal ? 4.5 : 4.5);
      expect(contrast(styles.eyebrow, styles.cardBg)).toBeGreaterThanOrEqual(historicalOriginal ? 4.5 : 4.5);

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
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];
const routes = ['/', '/projects', '/projects/my-dev-kit'];
const captureDir = path.join('.my-dev-kit-workflow', 'tmp', 'iworkhere-theme-port-20261103', 'screenshots');

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
    test(`original default ${viewport.name} ${route}`, async ({ page }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-palette', 'original');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await noHorizontalOverflow(page)).toBe(true);
      if (process.env.APPEARANCE_CAPTURE) {
        mkdirSync(captureDir, { recursive: true });
        await page.screenshot({
          path: path.join(captureDir, `mineral-default-${viewport.name}-${route.slice(1)}.png`),
          animations: 'disabled',
          // Hiding carets injects inline input styles and can race React hydration.
          caret: 'initial',
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
const choose = (page: Page, name: string) => dialog(page).getByText(name, { exact: true }).click();

for (const palette of palettes) {
  test(`appearance control selects ${labels[palette]} and exposes only palette and color mode`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await trigger(page).click();
    await expect(dialog(page)).toBeVisible();
    await expect(page.getByRole('group', { name: 'Palette' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Color mode' })).toBeVisible();
    await expect(page.getByRole('group', { name: /effects/i })).toHaveCount(0);
    await expect(dialog(page).getByRole('radio')).toHaveCount(10);
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
  expect(roles.data).toBe('rgb(165, 139, 255)');
  expect(roles.control).toBe('rgb(86, 212, 234)');
  expect(roles.focus).toBe('rgb(79, 216, 238)');
  expect(roles.hover).toBe('rgb(189, 169, 255)');
  expect(roles.logo).toBe('rgb(86, 212, 234)');
  expect(roles.selection).toBe('color-mix(in srgb, #a58bff 26%, transparent)');
  expect(roles.glow).toBe('rgb(169 140 248 / 13%)');
  expect(roles.glowSecondary).toBe('rgb(66 203 227 / 10%)');

  // Light mode restores the original light graphite surfaces.
  await page.evaluate(() => {
    localStorage.setItem('my-website-2026-theme', 'light');
  });
  await page.reload();
  expect(await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(236, 234, 246)');
});

test('hero primary actions hover with their palette-specific hero foreground', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [palette, want] of [
    ['original', 'rgb(246, 243, 255)'],
    ['mineral', 'rgb(245, 241, 223)'],
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
  expect(atmosphere).toBe('none');
  expect(await page.locator('[data-site-shell]').evaluate(el => getComputedStyle(el, '::before').backgroundImage)).toContain('gradient');
  expect(await page.locator('[data-fx-layer], [data-fx-anim], .fx-layer').count()).toBe(0);
  await expect(page.locator('html')).not.toHaveAttribute('data-fx', /.+/);
});
