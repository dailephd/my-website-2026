import { expect, test } from '@playwright/test';

const routesAndTitles = [
  ['/', /dailephd LLC/i],
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

test('legacy /work URL redirects to current project metadata', async ({ page }) => {
  await page.goto('/work');
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page).toHaveTitle(/Technical Projects.*Dai Le/i);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^http:\/\/localhost:3000\/projects$/);
});

test('sitemap lists current public routes and omits the legacy redirect', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);
  const sitemap = await response.text();

  for (const route of ['/', '/projects', '/projects/my-dev-kit', '/publications', '/about', '/contact']) {
    expect(sitemap).toContain(`<loc>http://localhost:3000${route}</loc>`);
  }
  expect(sitemap).not.toContain('/work');
});

test('ecosystem metadata uses the updated family positioning', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Local-first evidence and workflow infrastructure for disciplined AI-assisted software development.',
  );
});
