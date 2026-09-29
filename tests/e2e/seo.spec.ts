import { expect, test } from '@playwright/test';

const routesAndTitles = [
  ['/', /dailephd LLC/i],
  ['/work', /Selected Work.*Dai Le/i],
  ['/projects', /Technical Projects.*Dai Le/i],
  ['/projects/my-dev-kit', /my-dev-kit Ecosystem.*Dai Le/i],
  ['/about', /About Dai Le/i],
  ['/publications', /Publications.*Dai Le/i],
  ['/contact', /Contact Dai Le/i],
] as const;

for (const [route, title] of routesAndTitles) {
  test(`${route} exposes route-specific metadata`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^http:\/\/localhost:3000/);
  });
}

test('ecosystem metadata uses the updated family positioning', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Local-first evidence and workflow infrastructure for disciplined AI-assisted software development.',
  );
});
