import { expect, test } from '@playwright/test';

const mobileViewport = { width: 390, height: 844 };
const tabletViewport = { width: 768, height: 1024 };
const diagramViewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1280, height: 900 },
  { width: 1440, height: 1000 },
  { width: 1920, height: 1080 },
];

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

test('ecosystem product panels and release snapshot toggles are visible at mobile viewport', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/projects/my-dev-kit');
  for (const name of ['my-dev-kit', 'my-dev-kit-orchestrator', 'my-frontend-observer', 'my-dev-kit-lab']) {
    await expect(page.getByRole('heading', { level: 3, name, exact: true })).toBeVisible();
  }
  const toggles = page.getByRole('button', { name: 'Release snapshot' });
  await expect(toggles).toHaveCount(4);
  await toggles.first().click();
  await expect(toggles.first()).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-release-state="current"]').first()).toBeVisible();
  const observerBox = await page.locator('[data-diagram-node="my-frontend-observer"]').boundingBox();
  const labBox = await page.locator('[data-diagram-node="my-dev-kit-lab"]').boundingBox();
  expect(labBox!.y).toBeGreaterThan(observerBox!.y + observerBox!.height);

  const noOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );
  expect(noOverflow).toBe(true);
});

for (const viewport of diagramViewports) {
  test('ecosystem diagram fits and remains usable at ' + viewport.width + 'px', async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/projects/my-dev-kit');
    const diagram = page.locator('[data-diagram="my-dev-kit-ecosystem"]');
    await expect(diagram).toBeVisible();
    const bounds = await diagram.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
    for (const name of ['my-dev-kit', 'bounded-repository-evidence', 'my-dev-kit-orchestrator', 'external-implementation-actor', 'my-frontend-observer', 'my-dev-kit-lab']) {
      const node = diagram.locator('[data-diagram-node="' + name + '"]');
      await expect(node).toBeVisible();
      const box = await node.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(bounds!.x - 1);
      expect(box!.x + box!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width + 1);
    }
    for (const name of ['static-evidence', 'workflow-context', 'implementation-handoff', 'candidate-runtime', 'runtime-correction', 'optional-assurance']) {
      const connector = diagram.locator('[data-diagram-connector="' + name + '"]');
      await expect(connector).toBeVisible();
      const box = await connector.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
      expect(box!.x).toBeGreaterThanOrEqual(bounds!.x - 1);
      expect(box!.x + box!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width + 1);
    }
    for (const mini of await diagram.locator('[data-diagram-mini]').all()) {
      await expect(mini).toBeVisible();
      await expect(mini.locator('text=Internal workflow')).toBeVisible();
    }
    const toggles = diagram.getByRole('button', { name: 'Release snapshot' });
    await expect(toggles).toHaveCount(4);
    await toggles.first().click();
    await expect(toggles.first()).toHaveAttribute('aria-expanded', 'true');
    await expect(diagram.locator('[data-release-state="current"]').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('legacy /work URL redirects to mobile-safe current project cards', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/work');
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Technical projects' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'my-dev-kit Ecosystem' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'BioLit' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
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
