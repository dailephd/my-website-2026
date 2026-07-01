import { expect, test } from '@playwright/test';

const mobileViewport = { width: 390, height: 844 };
const tabletViewport = { width: 768, height: 1024 };

const routes = [
  { path: '/', name: 'homepage' },
  { path: '/work', name: 'work' },
  { path: '/projects', name: 'projects' },
  { path: '/projects/my-dev-kit', name: 'ecosystem' },
  { path: '/about', name: 'about' },
  { path: '/publications', name: 'publications' },
  { path: '/contact', name: 'contact' },
];

for (const { path, name } of routes) {
  test(`${name} has no horizontal overflow at mobile (390px)`, async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto(path);
    const noOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(noOverflow).toBe(true);
  });
}

for (const { path, name } of [
  { path: '/', name: 'homepage' },
  { path: '/projects/my-dev-kit', name: 'ecosystem' },
]) {
  test(`${name} has no horizontal overflow at tablet (768px)`, async ({ page }) => {
    await page.setViewportSize(tabletViewport);
    await page.goto(path);
    const noOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(noOverflow).toBe(true);
  });
}

test('primary navigation is visible at mobile viewport', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
});

test('header brand link is visible at mobile viewport', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/');
  await expect(page.getByRole('link', { name: /dailephd LLC/ }).first()).toBeVisible();
});

test('homepage hero h1 is visible at mobile viewport', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'dailephd LLC' })).toBeVisible();
});

test('ecosystem product panels and roadmap toggles are visible at mobile viewport', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/projects/my-dev-kit');
  for (const name of ['my-dev-kit', 'my-dev-kit-orchestrator', 'my-dev-kit-lab']) {
    await expect(page.getByRole('heading', { level: 3, name, exact: true })).toBeVisible();
  }
  const toggles = page.getByRole('button', { name: 'Roadmap' });
  await expect(toggles).toHaveCount(3);
  await toggles.first().click();
  await expect(toggles.first()).toHaveAttribute('aria-expanded', 'true');

  const noOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );
  expect(noOverflow).toBe(true);
});

test('work page project cards visible at mobile viewport', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/work');
  await expect(page.getByRole('heading', { level: 1, name: 'Selected work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'my-dev-kit', exact: true })).toBeVisible();
});

test('contact page cards visible at mobile viewport', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible();
  const noOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );
  expect(noOverflow).toBe(true);
});
