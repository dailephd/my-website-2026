import { expect, test, type Page } from '@playwright/test';

const themeKey = 'my-website-2026-theme';
const paletteKey = 'my-website-2026-palette';
const trigger = (page: Page) => page.getByRole('button', { name: /^Appearance/ });
const dialog = (page: Page) => page.getByRole('dialog', { name: 'Appearance settings' });
const html = (page: Page) => page.locator('html');
const choose = (page: Page, name: string) => dialog(page).locator(`label:text-is(\"${name}\")`).click();

async function clearStorage(page: Page) {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
}

test('first paint defaults to Mineral Research / system with no effects preference', async ({ page }) => {
  await clearStorage(page);
  await page.evaluate(() => localStorage.setItem('my-website-2026-fx', 'expressive'));
  await page.reload();
  await expect(html(page)).toHaveAttribute('data-palette', 'mineral');
  await expect(html(page)).toHaveAttribute('data-theme-preference', 'system');
  await expect(html(page)).not.toHaveAttribute('data-fx', /.+/);
  expect(await page.evaluate(() => localStorage.getItem('my-website-2026-fx'))).toBe('expressive');
});

test('palette and color mode persist across reload and navigation', async ({ page }) => {
  await clearStorage(page);
  await trigger(page).click();
  await choose(page, 'Oxblood Atelier');
  await choose(page, 'Dark');
  await choose(page, 'Signal Green');
  await expect(html(page)).toHaveAttribute('data-palette', 'signal');
  await expect(html(page)).toHaveAttribute('data-theme-preference', 'dark');
  expect(await page.evaluate((keys) => keys.map((key) => localStorage.getItem(key)), [paletteKey, themeKey])).toEqual(['signal', 'dark']);
  await page.reload();
  await expect(html(page)).toHaveAttribute('data-palette', 'signal');
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'About' }).first().click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(html(page)).toHaveAttribute('data-palette', 'signal');
  await expect(html(page)).toHaveAttribute('data-theme-preference', 'dark');
});

test('all six palettes can be selected and persisted with their approved labels', async ({ page }) => {
  await clearStorage(page);
  await page.evaluate((key) => localStorage.setItem(key, 'cobalt'), paletteKey);
  await page.reload();
  const palettes = [
    ['mineral', 'Mineral Research'], ['oxblood', 'Oxblood Atelier'], ['signal', 'Signal Green'],
    ['cobalt', 'Cobalt & Terracotta'], ['amber', 'Amber & Graphite'], ['original', 'Violet & Graphite'],
  ];
  for (const [id, label] of palettes) {
    if (!(await dialog(page).isVisible())) await trigger(page).click();
    await choose(page, label);
    await expect(html(page)).toHaveAttribute('data-palette', id);
    await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), paletteKey)).toBe(id);
  }
  await expect(dialog(page).getByRole('radio')).toHaveCount(9);
  await expect(dialog(page).getByRole('group', { name: /effects/i })).toHaveCount(0);
});

test('mode=system follows the operating-system preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await clearStorage(page);
  await expect(html(page)).toHaveAttribute('data-theme', 'dark');
  await expect(html(page)).toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(html(page)).toHaveAttribute('data-theme', 'light');
  await expect(html(page)).not.toHaveClass(/dark/);
});

test('invalid stored values fall back before hydration', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(([a, b]) => { localStorage.setItem(a, 'violet'); localStorage.setItem(b, 'sepia'); }, [paletteKey, themeKey]);
  await page.reload();
  await expect(html(page)).toHaveAttribute('data-palette', 'mineral');
  await expect(html(page)).toHaveAttribute('data-theme-preference', 'system');
});

test('palette applies before React hydrates', async ({ page }) => {
  await page.addInitScript(([key]) => localStorage.setItem(key, 'cobalt'), [paletteKey]);
  await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => {
    (window as unknown as { __paletteAtDcl: string | undefined }).__paletteAtDcl = document.documentElement.dataset.palette;
  }));
  await page.goto('/');
  expect(await page.evaluate(() => (window as unknown as { __paletteAtDcl?: string }).__paletteAtDcl)).toBe('cobalt');
});

test('appearance control is keyboard accessible and contains only palette and color mode', async ({ page }) => {
  await clearStorage(page);
  const control = trigger(page);
  await control.focus();
  await page.keyboard.press('Enter');
  await expect(dialog(page)).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Mineral Research' })).toBeFocused();
  await expect(dialog(page).getByRole('group', { name: 'Palette' })).toBeVisible();
  await expect(dialog(page).getByRole('group', { name: 'Color mode' })).toBeVisible();
  await expect(dialog(page).getByRole('group', { name: /effects/i })).toHaveCount(0);
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('radio', { name: 'Oxblood Atelier' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog(page)).toBeHidden();
  await expect(control).toBeFocused();
});

test('appearance control and navigation remain usable at 360px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await clearStorage(page);
  await trigger(page).click();
  const box = await dialog(page).boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact' })).toBeVisible();
});


test('reduced motion keeps ordinary card hover feedback static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const card = page.locator('.premium-card-interactive').first();
  await expect(card).toBeVisible();
  await card.hover();
  const state = await card.evaluate((element) => ({
    transform: getComputedStyle(element).transform,
    transitionDuration: getComputedStyle(element).transitionDuration,
  }));
  expect(state.transform).toBe('none');
  expect(state.transitionDuration.split(',').every((duration) => Number.parseFloat(duration) === 0)).toBe(true);
});
