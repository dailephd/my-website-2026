import { expect, test } from '@playwright/test';

test('homepage renders structured profile content', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Dai Le' })).toBeVisible();
  await expect(
    page.getByText('Software developer, AI builder, and PhD-trained scientist.'),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Dai Le' }).getByRole('link', { name: 'View selected work' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Systems built for real technical work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'From codebase intelligence to validated workflows' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Building in public, with the next steps visible' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Technical focus' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Scientific rigor behind the software' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Explore the work—or start a conversation' })).toBeVisible();
});

test('homepage links to work and products and remains mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/');

  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('link', { name: 'View all selected work' })).toHaveAttribute('href', '/work');
  await expect(page.getByRole('link', { name: 'Explore all products' })).toHaveAttribute('href', '/products');
  await expect(page.getByRole('link', { name: 'Contact' }).last()).toHaveAttribute('href', '/contact');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
