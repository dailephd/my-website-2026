import { expect, test } from '@playwright/test';

test('work page renders the gallery empty state without broken images', async ({ page }) => {
  await page.goto('/work');

  await expect(page.getByRole('heading', { level: 2, name: 'Project media' })).toBeVisible();
  await expect(page.getByText('Media showcase in preparation')).toBeVisible();
  await expect(page.getByRole('region', { name: 'Project media' }).getByRole('img')).toHaveCount(0);
});

test('gallery section remains mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/work');

  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByText('Media showcase in preparation')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
