import { expect, test } from '@playwright/test';

test('ecosystem page renders the full structured roadmap', async ({ page }) => {
  await page.goto('/products/my-dev-kit');
  await expect(page.getByRole('heading', { level: 2, name: 'my-dev-kit Ecosystem Roadmap' })).toBeVisible();
  for (const lane of ['my-dev-kit', 'my-dev-kit-orchestrator', 'my-dev-kit-lab']) {
    await expect(page.getByRole('heading', { level: 2, name: lane, exact: true })).toBeVisible();
  }
  await expect(page.getByText('Status: Shipped').first()).toBeVisible();
  await expect(page.getByText('Status: Active').first()).toBeVisible();
  await expect(page.getByText('Status: Planned').first()).toBeVisible();
});

test('roadmap dashboard remains mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/products/my-dev-kit');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByText('Cross-project benchmark suite')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
