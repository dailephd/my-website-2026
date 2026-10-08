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

test('appearance control has an accessible name', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /^Appearance/ });
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

test('ecosystem Release snapshot toggle exposes aria-expanded and aria-controls', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  const toggle = page.getByRole('button', { name: 'Release snapshot' }).first();

  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  const controlsId = await toggle.getAttribute('aria-controls');
  expect(controlsId).toBeTruthy();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator(`#${controlsId}`)).toBeVisible();
});

test('ecosystem diagram has a labelled section and text equivalent', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  const diagram = page.locator('[data-diagram="my-dev-kit-ecosystem"]');
  const section = diagram.locator('..');
  const headingId = await section.getAttribute('aria-labelledby');
  expect(headingId).toBeTruthy();
  await expect(page.locator('#' + headingId)).toHaveText('How the products are related');
  const summaryId = await diagram.getAttribute('aria-describedby');
  expect(summaryId).toBeTruthy();
  await expect(page.locator('#' + summaryId)).toHaveText(
    'my-dev-kit produces bounded static repository evidence that can be supplied to my-dev-kit-orchestrator. The orchestrator manages staged prompts, artifacts, readiness, responsibility continuity, and correction routing but does not execute the coding agent. A human or coding agent edits target source. my-frontend-observer evaluates the rendered frontend and returns runtime evidence for review or correction without editing source. my-dev-kit-lab is an optional assurance companion for supported experiments, audits, security validation, and reports.',
  );
  await expect(section.getByRole('heading', { level: 2 })).toHaveCount(1);
  await expect(diagram.getByRole('heading', { level: 3 })).toHaveCount(4);
  for (const name of ['my-dev-kit', 'my-dev-kit-orchestrator', 'my-frontend-observer', 'my-dev-kit-lab']) {
    await expect(diagram.getByRole('heading', { level: 3, name, exact: true })).toBeVisible();
  }
  await expect(diagram.locator('[data-diagram-node="external-implementation-actor"]')).toContainText('A human or coding agent edits the target source.');
  await expect(diagram.locator('aside[aria-label="Optional assurance"]')).toContainText('Run explicitly');
  for (const connector of await diagram.locator('[data-diagram-connector]').all()) {
    await expect(connector.locator('svg')).toHaveAttribute('aria-hidden', 'true');
  }
  await expect(diagram.getByRole('button', { name: 'Release snapshot' })).toHaveCount(4);
  await expect(diagram.getByRole('link', { name: 'GitHub' })).toHaveCount(4);
  const toggle = diagram.getByRole('button', { name: 'Release snapshot' }).first();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(diagram.locator('[data-release-state="recent"]').first()).toContainText('Recent');
  await expect(diagram.locator('[data-release-state="current"]').first()).toContainText('Current');
  await expect(diagram.locator('[data-release-state="next"]').first()).toContainText('Next');
});

test('navigation current page state is conveyed via aria-current', async ({ page }) => {
  await page.goto('/projects');
  const projectsLink = page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects' });
  await expect(projectsLink).toHaveAttribute('aria-current', 'page');
});
