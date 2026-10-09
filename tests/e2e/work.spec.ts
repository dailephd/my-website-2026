import { expect, test } from '@playwright/test';

test('legacy /work URL redirects to the current technical projects index', async ({ page }) => {
  const redirectResponses: number[] = [];
  page.on('response', (response) => {
    if (new URL(response.url()).pathname === '/work') redirectResponses.push(response.status());
  });
  const response = await page.goto('/work');

  await expect(page).toHaveURL(/\/projects$/);
  expect(redirectResponses).toContain(308);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1, name: 'Technical projects' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'my-dev-kit Ecosystem' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'BioLit' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Le Crawler' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact' })).toBeVisible();
});

test('legacy /work redirect remains usable in dark mode on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    window.localStorage.setItem('my-website-2026-theme', 'dark');
  });
  await page.goto('/work');

  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('heading', { level: 1, name: 'Technical projects' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Archived projects' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'BioLit' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
