import { expect, test } from '@playwright/test';

test('shell exposes primary and footer navigation', async ({ page }) => {
  await page.goto('/');

  const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(primaryNavigation.getByRole('link', { name: 'Projects' })).toBeVisible();
  await expect(primaryNavigation.getByRole('link', { name: 'Contact' })).toBeVisible();

  const footerNavigation = page.getByRole('navigation', { name: 'Footer navigation' });
  await expect(footerNavigation.getByRole('link', { name: 'Home' })).toBeVisible();
});

test('brand link renders the DL logo mark without disrupting header layout', async ({ page }) => {
  await page.goto('/');

  const brandLink = page.getByRole('link', { name: /dailephd LLC/ }).first();
  await expect(brandLink).toBeVisible();
  await expect(brandLink.locator('svg')).toBeVisible();
  await expect(brandLink.locator('svg')).toHaveAttribute('viewBox', '0 0 256 256');

  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Theme preference/ })).toBeVisible();
});

test('favicon and apple touch icon links are declared in the document head', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]').first()).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
});
