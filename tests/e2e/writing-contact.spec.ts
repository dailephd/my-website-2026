import { expect, test } from '@playwright/test';

test('writing renders a transparent empty state', async ({ page }) => {
  await page.goto('/writing');
  await expect(page.getByRole('heading', { level: 1, name: 'Writing' })).toBeVisible();
  await expect(page.getByText('Writing is in preparation')).toBeVisible();
  await expect(page.getByRole('link', { name: 'View selected work' })).toBeVisible();
});

test('contact renders safe pathways without a form', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible();
  await expect(page.getByText(/direct public email address is not currently listed/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Continue to View selected work/i })).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
});

test('writing and contact remain mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  for (const route of ['/writing', '/contact']) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveClass(/dark/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
