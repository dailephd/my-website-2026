import { expect, test } from '@playwright/test';

const storageKey = 'my-website-2026-theme';

test('theme toggle applies and persists a dark preference', async ({ page }) => {
  await page.goto('/');
  await page.evaluate((key) => window.localStorage.removeItem(key), storageKey);
  await page.reload();

  const toggle = page.getByRole('button', { name: /Theme preference:/ });
  await expect(toggle).toBeVisible();
  await expect(toggle).toContainText('Theme: System');
  const initialToggleBox = await toggle.boundingBox();
  expect(await page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(
    'rgb(237, 239, 243)',
  );

  await toggle.click();
  await expect(toggle).toContainText('Theme: Light');

  await toggle.click();
  await expect(toggle).toContainText('Theme: Dark');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'dark');
  await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), storageKey)).toBe('dark');
  expect(await toggle.boundingBox()).toEqual(initialToggleBox);
  await expect
    .poll(() =>
      page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor),
    )
    .toBe('rgb(26, 29, 35)');

  await page.reload();

  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('button', { name: /Theme preference: Dark/ })).toBeVisible();
});

test('theme control and navigation remain visible at a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.evaluate((key) => window.localStorage.removeItem(key), storageKey);
  await page.reload();

  await expect(page.getByRole('button', { name: /Theme preference:/ })).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'dailephd LLC' })).toBeVisible();
});
