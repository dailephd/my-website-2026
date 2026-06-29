import { expect, test } from '@playwright/test';

test('ecosystem page presents one connected three-module family', async ({ page }) => {
  await page.goto('/products/my-dev-kit');

  await expect(
    page.getByRole('heading', { level: 1, name: 'my-dev-kit Ecosystem' }),
  ).toBeVisible();

  for (const moduleName of ['my-dev-kit', 'my-dev-kit-orchestrator', 'my-dev-kit-lab']) {
    await expect(
      page.getByRole('heading', { level: 3, name: moduleName, exact: true }),
    ).toBeVisible();
  }

  for (const role of ['Codebase Intelligence', 'Workflow Orchestration', 'Validation Lab']) {
    await expect(page.getByText(role, { exact: true }).first()).toBeVisible();
  }

  await expect(page.getByRole('link', { name: /View my-dev-kit on npm/ })).toBeVisible();
});

test('ecosystem flow is mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    window.localStorage.setItem('my-website-2026-theme', 'dark');
  });
  await page.goto('/products/my-dev-kit');

  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('list', { name: 'my-dev-kit Ecosystem flow' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
