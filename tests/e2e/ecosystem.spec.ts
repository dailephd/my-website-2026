import { expect, test } from '@playwright/test';

test('ecosystem page presents the my-dev-kit relationship diagram', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');

  await expect(
    page.getByRole('heading', { level: 1, name: 'my-dev-kit Ecosystem' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { level: 2, name: 'How the products are related' }),
  ).toBeVisible();

  for (const name of ['my-dev-kit', 'my-dev-kit-orchestrator', 'my-dev-kit-lab']) {
    await expect(
      page.getByRole('heading', { level: 3, name, exact: true }),
    ).toBeVisible();
  }

  for (const label of ['Context acquisition layer', 'Workflow control layer', 'Evaluation and visualization layer']) {
    await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
  }

  await expect(page.getByText('Architecture Context Packet').first()).toBeVisible();
  await expect(page.getByText('artifacts and outcomes').first()).toBeVisible();
  await expect(page.getByText('feedback for better prompts and workflows').first()).toBeVisible();
});

test('the large hero npm button no longer renders and leaves no empty CTA wrapper', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');

  await expect(page.getByRole('link', { name: /View my-dev-kit on npm/ })).toHaveCount(0);
  await expect(page.locator('a[href="https://www.npmjs.com/package/@dailephd/my-dev-kit"]')).toHaveCount(1);

  const heroHeading = page.getByRole('heading', { level: 1, name: 'my-dev-kit Ecosystem' });
  const hero = page.locator('section', { has: heroHeading });
  const emptyCtaRow = hero.locator('div.flex.flex-wrap.gap-3:empty');
  await expect(emptyCtaRow).toHaveCount(0);
});

test('removed summary, workflow model, and status badges do not render', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');

  await expect(page.getByText('my-dev-kit = acquire context')).toHaveCount(0);
  await expect(page.getByText('my-dev-kit-orchestrator = guide implementation')).toHaveCount(0);
  await expect(page.getByText('my-dev-kit-lab = evaluate and visualize')).toHaveCount(0);
  await expect(page.getByLabel('Product layer summary')).toHaveCount(0);

  await expect(page.getByRole('heading', { name: 'Workflow model' })).toHaveCount(0);
  await expect(
    page.getByText('Understand the repository, structure the implementation workflow, then validate the result and process.'),
  ).toHaveCount(0);
  await expect(
    page.getByText('The ecosystem is under active development. Module capabilities and interfaces continue to evolve.'),
  ).toHaveCount(0);

  const statusBadges = await page.getByText(/^Status:/).count();
  expect(statusBadges).toBe(0);
});

test('each product panel exposes GitHub, npm, and a Roadmap toggle', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');

  const expectedLinks: Record<string, { github: string; npm: string }> = {
    'my-dev-kit': {
      github: 'https://github.com/dailephd/my-dev-kit',
      npm: 'https://www.npmjs.com/package/@dailephd/my-dev-kit',
    },
    'my-dev-kit-orchestrator': {
      github: 'https://github.com/dailephd/my-dev-kit-orchestrator',
      npm: 'https://www.npmjs.com/package/@dailephd/my-dev-kit-orchestrator',
    },
    'my-dev-kit-lab': {
      github: 'https://github.com/dailephd/my-dev-kit-lab',
      npm: 'https://www.npmjs.com/package/@dailephd/my-dev-kit-lab',
    },
  };

  for (const [name, links] of Object.entries(expectedLinks)) {
    const heading = page.getByRole('heading', { level: 3, name, exact: true });
    const panel = page.locator('article', { has: heading });

    await expect(panel.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', links.github);
    await expect(panel.getByRole('link', { name: 'GitHub' })).toHaveAttribute('target', '_blank');
    await expect(panel.getByRole('link', { name: 'GitHub' })).toHaveAttribute('rel', 'noreferrer');
    await expect(panel.getByRole('link', { name: 'npm' })).toHaveAttribute('href', links.npm);
    await expect(panel.getByRole('link', { name: 'npm' })).toHaveAttribute('target', '_blank');
    await expect(panel.getByRole('link', { name: 'npm' })).toHaveAttribute('rel', 'noreferrer');

    const toggle = panel.getByRole('button', { name: 'Roadmap' });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  }
});

test('the Roadmap toggle expands and collapses a version timeline in ascending order', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');

  const heading = page.getByRole('heading', { level: 3, name: 'my-dev-kit', exact: true });
  const panel = page.locator('article', { has: heading });
  const toggle = panel.getByRole('button', { name: 'Roadmap' });

  const panelId = await toggle.getAttribute('aria-controls');
  expect(panelId).toBeTruthy();
  const roadmapPanel = page.locator(`#${panelId}`);
  await expect(roadmapPanel).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(roadmapPanel).toBeVisible();
  await expect(roadmapPanel.getByText('1.0.0')).toBeVisible();
  await expect(
    roadmapPanel.getByText(
      'The first stable CLI release establishes core commands for indexing, searching, and retrieving source context from TypeScript, JavaScript, and Python codebases.',
    ),
  ).toBeVisible();
  await expect(roadmapPanel.getByText('2.0.0')).toBeVisible();

  const versionOrder = await roadmapPanel.locator('li > span').evaluateAll((nodes) =>
    nodes
      .map((node) => node.textContent?.trim() ?? '')
      .filter((text) => /^\d+\.\d+\.(\d+|x)$/.test(text)),
  );
  expect(versionOrder[0]).toBe('1.0.0');
  expect(versionOrder.at(-1)).toBe('2.0.0');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(roadmapPanel).toBeHidden();
});

test('the my-dev-kit-lab roadmap does not render as separate premium cards', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');

  const heading = page.getByRole('heading', { level: 3, name: 'my-dev-kit-lab', exact: true });
  const panel = page.locator('article', { has: heading });
  await panel.getByRole('button', { name: 'Roadmap' }).click();

  await expect(panel.getByText('v0.1.0')).toBeVisible();
  await expect(panel.getByText('v1.4.0')).toBeVisible();
  await expect(panel.locator('.premium-card')).toHaveCount(0);
});

test('ecosystem diagram is mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    window.localStorage.setItem('my-website-2026-theme', 'dark');
  });
  await page.goto('/projects/my-dev-kit');

  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(
    page.getByRole('heading', { level: 2, name: 'How the products are related' }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
});
