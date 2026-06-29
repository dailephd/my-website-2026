import { expect, test } from '@playwright/test';

test('product lab index renders featured products and roadmap preview', async ({ page }) => {
  await page.goto('/products');
  await expect(page.getByRole('heading', { level: 1, name: 'Product lab' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'my-dev-kit Ecosystem' })).toBeVisible();
  await expect(page.getByText('Featured product', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Ecosystem roadmap' })).toBeVisible();
  const detail = page.getByRole('link', { name: 'Explore product' });
  await expect(detail).toBeVisible();
  await detail.click();
  await expect(page).toHaveURL(/\/products\/my-dev-kit$/);
  await expect(page.getByRole('heading', { level: 2, name: 'my-dev-kit Ecosystem Roadmap' })).toBeVisible();
});

test('product lab remains mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/products');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('heading', { level: 2, name: 'BioLit' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
