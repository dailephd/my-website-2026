import { expect, test } from '@playwright/test';

const routes = ['/', '/work', '/projects', '/projects/my-dev-kit', '/about', '/publications', '/contact'];

for (const route of routes) {
  test(`${route} has a skip link targeting main content`, async ({ page }) => {
    await page.goto(route);
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toHaveCount(1);
    await expect(skipLink).toHaveText('Skip to main content');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toHaveCount(1);
  });

  test(`${route} has primary navigation with accessible label`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  });

  test(`${route} has footer navigation with accessible label`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('navigation', { name: 'Footer navigation' })).toBeVisible();
  });

  test(`${route} has one h1 heading`, async ({ page }) => {
    await page.goto(route);
    const h1s = page.getByRole('heading', { level: 1 });
    await expect(h1s).toHaveCount(1);
  });
}

test('theme toggle has an accessible name', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /Theme preference/ });
  await expect(toggle).toBeVisible();
});

test('skip link is visible on focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.locator('a[href="#main-content"]');
  await expect(skipLink).toBeFocused();
});

test('status badges on work page render text', async ({ page }) => {
  await page.goto('/work');
  await expect(page.getByText('Active', { exact: true }).first()).toBeVisible();
});

test('status badges no longer render on the ecosystem page', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  await expect(page.getByText(/^Status:/)).toHaveCount(0);
});

test('ecosystem Roadmap toggle exposes aria-expanded and aria-controls', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  const toggle = page.getByRole('button', { name: 'Roadmap' }).first();

  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  const controlsId = await toggle.getAttribute('aria-controls');
  expect(controlsId).toBeTruthy();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator(`#${controlsId}`)).toBeVisible();
});

test('ecosystem diagram has accessible list label', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  await expect(page.getByRole('list', { name: 'my-dev-kit Ecosystem flow' })).toBeVisible();
});

test('navigation current page state is conveyed via aria-current', async ({ page }) => {
  await page.goto('/projects');
  const projectsLink = page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects' });
  await expect(projectsLink).toHaveAttribute('aria-current', 'page');
});
