import { expect, test } from '@playwright/test';

test('shell exposes primary and footer navigation', async ({ page }) => {
  await page.goto('/');

  const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(primaryNavigation.getByRole('link', { name: 'Work' })).toBeVisible();
  await expect(primaryNavigation.getByRole('link', { name: 'Products' })).toBeVisible();
  await expect(primaryNavigation.getByRole('link', { name: 'Contact' })).toBeVisible();

  const footerNavigation = page.getByRole('navigation', { name: 'Footer navigation' });
  await expect(footerNavigation.getByRole('link', { name: 'Home' })).toBeVisible();
});
