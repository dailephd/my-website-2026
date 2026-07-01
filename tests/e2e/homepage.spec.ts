import { expect, test } from '@playwright/test';

test('homepage renders structured profile content', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'dailephd LLC' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Explore technical projects' }).first(),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Systems built for real technical work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'my-dev-kit Ecosystem' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Technical focus' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Biological Sciences' })).toBeVisible();
  await expect(
    page.getByText(
      'Peer-reviewed work in developmental biology, microbiology, and quantitative biological modeling.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'View publications' })).toHaveAttribute('href', '/publications');
  await expect(page.getByRole('heading', { level: 3, name: 'About Dai Le' })).toBeVisible();
  await expect(page.getByText('Software, AI, and biological sciences')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Read bio' })).toHaveAttribute('href', '/about');
  await expect(
    page.getByText(
      'Understand the repository, structure the implementation workflow, then validate the result and process.',
    ),
  ).toHaveCount(0);
});

test('homepage links to projects and contact and remains mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/');

  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('link', { name: 'Explore technical projects' }).first()).toHaveAttribute('href', '/projects');
  await expect(page.getByRole('link', { name: 'View all projects' })).toHaveAttribute('href', '/projects');
  await expect(page.getByRole('link', { name: 'Contact' }).first()).toHaveAttribute('href', '/contact');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
