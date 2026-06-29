import { expect, test } from '@playwright/test';

const routesAndTitles = [
  ['/', /Dai Le.*Software Developer/i],
  ['/work', /Selected Work.*Dai Le/i],
  ['/products', /Product Lab.*Dai Le/i],
  ['/products/my-dev-kit', /my-dev-kit Ecosystem.*Dai Le/i],
  ['/about', /About Dai Le/i],
  ['/writing', /Writing.*Dai Le/i],
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
