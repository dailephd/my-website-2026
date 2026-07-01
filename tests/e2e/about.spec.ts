import { expect, test } from '@playwright/test';

test('about presents personal identity, research background, and education', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByRole('heading', { level: 1, name: 'About Dai Le' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Research background' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Education' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Publications' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Resume and contact' })).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 3, name: 'MS in Computer Science' })).toBeVisible();
  await expect(page.getByText('Texas A&M University-Corpus Christi', { exact: true })).toBeVisible();
  await expect(page.getByText('2023 - 2025')).toBeVisible();
  await expect(page.getByText(/Corpus Christi/i).first()).toBeVisible();
  await expect(
    page.getByText('MS in Computer Science, PhD in Biological Sciences, BS in Biology.'),
  ).toHaveCount(0);
  const main = page.getByRole('main');
  await expect(main.getByText('Education', { exact: true })).toHaveCount(1);
  await expect(main.getByText('About', { exact: true })).toHaveCount(0);
  await expect(page.getByLabel('Professional roles')).toHaveCount(0);
  await expect(main.getByText('Software developer', { exact: true })).toHaveCount(0);
  await expect(main.getByText('AI model evaluation', { exact: true })).toHaveCount(0);
  await expect(main.getByText('Biological scientist', { exact: true })).toHaveCount(0);
});

test('about does not contain PhD-trained wording', async ({ page }) => {
  await page.goto('/about');
  const content = await page.content();
  expect(content).not.toContain('PhD-trained');
});

test('about remains usable at a mobile viewport in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/about');

  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
