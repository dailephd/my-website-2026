import { expect, test } from '@playwright/test';

test('work page renders structured selected projects and links', async ({ page }) => {
  await page.goto('/work');

  await expect(page.getByRole('heading', { level: 1, name: 'Selected work' })).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 3, name: 'my-dev-kit', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Active', { exact: true })).toBeVisible();
  await expect(page.getByText('TypeScript', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /npm package/ })).toBeVisible();
});

test('work page remains usable in dark mode at a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    window.localStorage.setItem('my-website-2026-theme', 'dark');
  });
  await page.goto('/work');

  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('heading', { level: 1, name: 'Selected work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'BioLit' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
