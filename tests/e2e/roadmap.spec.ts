import { expect, test } from '@playwright/test';

test('each product roadmap expands to show its full version timeline', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');

  const orchestratorHeading = page.getByRole('heading', { level: 3, name: 'my-dev-kit-orchestrator', exact: true });
  const orchestratorPanel = page.locator('article', { has: orchestratorHeading });
  await orchestratorPanel.getByRole('button', { name: 'Roadmap' }).click();
  await expect(orchestratorPanel.getByText('v0.1.0')).toBeVisible();
  await expect(orchestratorPanel.getByText('v1.0.0')).toBeVisible();

  const labHeading = page.getByRole('heading', { level: 3, name: 'my-dev-kit-lab', exact: true });
  const labPanel = page.locator('article', { has: labHeading });
  await labPanel.getByRole('button', { name: 'Roadmap' }).click();
  await expect(labPanel.getByText('v0.1.0')).toBeVisible();
  await expect(labPanel.getByText('v1.4.0')).toBeVisible();
  await expect(labPanel.getByText(/Turn experiment outputs into a publication/)).toBeVisible();
});

test('roadmap timelines remain mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/projects/my-dev-kit');
  await expect(page.locator('html')).toHaveClass(/dark/);

  const labHeading = page.getByRole('heading', { level: 3, name: 'my-dev-kit-lab', exact: true });
  const labPanel = page.locator('article', { has: labHeading });
  await labPanel.getByRole('button', { name: 'Roadmap' }).click();
  await expect(labPanel.getByText('v0.2.0')).toBeVisible();

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
