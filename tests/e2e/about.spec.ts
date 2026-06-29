import { expect, test } from '@playwright/test';

test('about presents software identity, research context, and safe publication state', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByRole('heading', { level: 1, name: 'Software builder with a research foundation' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Technical focus' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Publications' })).toBeVisible();
  await expect(page.getByText('Publication record in preparation')).toBeVisible();
  await expect(page.getByRole('link', { name: /Open Resume/i })).toHaveCount(0);
  await expect(page.getByLabel('Resume and contact').getByRole('link', { name: 'Contact' })).toBeVisible();
});

test('about remains usable at a mobile viewport in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/about');

  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
