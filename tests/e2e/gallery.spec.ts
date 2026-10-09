import { expect, test } from '@playwright/test';

test('legacy /work URL presents current project content instead of a removed gallery', async ({ page }) => {
  await page.goto('/work');

  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Technical projects' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Archived projects' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Project media' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'BioLit' })).toBeVisible();
});

test('legacy /work destination stays mobile-safe in dark mode without gallery markup', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/work');

  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('heading', { level: 1, name: 'Technical projects' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Project media' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'iworkhere.space' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
