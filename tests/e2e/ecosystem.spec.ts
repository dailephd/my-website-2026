import { expect, test } from '@playwright/test';

const products = ['my-dev-kit', 'my-dev-kit-orchestrator', 'my-frontend-observer', 'my-dev-kit-lab'] as const;
const coreOrder = ['my-dev-kit', 'bounded-repository-evidence', 'my-dev-kit-orchestrator', 'external-implementation-actor', 'my-frontend-observer'];
const connectors = ['static-evidence', 'workflow-context', 'implementation-handoff', 'candidate-runtime', 'runtime-correction', 'optional-assurance'];

test('ecosystem presents four products and the exact core workflow', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  await expect(page.getByRole('heading', { level: 1, name: 'my-dev-kit Ecosystem' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'How the products are related' })).toBeVisible();

  const diagram = page.locator('[data-diagram="my-dev-kit-ecosystem"]');
  for (const name of products) {
    await expect(diagram.getByRole('heading', { level: 3, name, exact: true })).toBeVisible();
    await expect(diagram.locator('[data-diagram-node="' + name + '"]')).toBeVisible();
    await expect(diagram.locator('[data-diagram-mini="' + name + '"]')).toBeVisible();
  }
  await expect(diagram.locator('[data-diagram-node="bounded-repository-evidence"]')).toContainText('Bounded Repository Evidence');
  await expect(diagram.locator('[data-diagram-node="external-implementation-actor"]')).toContainText('A human or coding agent edits the target source.');
  expect(await diagram.locator('[data-diagram-core] [data-diagram-node]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-diagram-node')),
  )).toEqual(coreOrder);
  await expect(diagram.locator('[data-diagram-core] [data-diagram-node="my-dev-kit-lab"]')).toHaveCount(0);
  await expect(diagram.locator('aside[aria-label="Optional assurance"]')).toContainText('Run explicitly when experiments, audits, security validation, or additional evidence are required.');
  await expect(diagram.locator('[data-diagram-node="architecture-context-packet"]')).toHaveCount(0);
});

test('diagram exposes visible semantic connectors and Observer correction direction', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  const diagram = page.locator('[data-diagram="my-dev-kit-ecosystem"]');

  for (const name of connectors) {
    await expect(diagram.locator('[data-diagram-connector="' + name + '"]')).toBeVisible();
  }
  for (const name of connectors.slice(0, 4)) {
    const connector = diagram.locator('[data-diagram-connector="' + name + '"]');
    const path = connector.locator('svg path[marker-end]');
    await expect(path).toHaveCount(1);
    const style = await path.evaluate((element) => {
      const computed = getComputedStyle(element);
      return { stroke: computed.stroke, width: parseFloat(computed.strokeWidth), dash: computed.strokeDasharray };
    });
    expect(style.stroke).not.toBe('none');
    expect(style.width).toBeGreaterThanOrEqual(3);
    expect(style.dash).toBe('none');
  }
  const correction = diagram.locator('[data-diagram-connector="runtime-correction"]');
  const correctionPath = correction.locator('svg path[marker-end]');
  await expect(correction).toContainText('runtime evidence + correction result');
  await expect(correctionPath).toHaveAttribute('d', /M2 98.*H3$/);
  expect(await correctionPath.evaluate((element) => parseFloat(getComputedStyle(element).strokeWidth))).toBe(2.5);
  const optional = diagram.locator('[data-diagram-connector="optional-assurance"]');
  await expect(optional).toContainText('optional assurance');
  await expect(optional.locator('svg path[marker-end]')).toHaveCount(0);
  expect(await optional.locator('svg path').evaluate((element) => getComputedStyle(element).strokeDasharray)).not.toBe('none');
});

test('boundaries and module links remain visible without implying tool execution', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  const diagram = page.locator('[data-diagram="my-dev-kit-ecosystem"]');
  const expectedLinks: Record<string, { github: string; npm: string }> = {
    'my-dev-kit': { github: 'https://github.com/dailephd/my-dev-kit', npm: 'https://www.npmjs.com/package/@dailephd/my-dev-kit' },
    'my-dev-kit-orchestrator': { github: 'https://github.com/dailephd/my-dev-kit-orchestrator', npm: 'https://www.npmjs.com/package/@dailephd/my-dev-kit-orchestrator' },
    'my-frontend-observer': { github: 'https://github.com/dailephd/my-frontend-observer', npm: 'https://www.npmjs.com/package/@dailephd/my-frontend-observer' },
    'my-dev-kit-lab': { github: 'https://github.com/dailephd/my-dev-kit-lab', npm: 'https://www.npmjs.com/package/@dailephd/my-dev-kit-lab' },
  };
  for (const name of products) {
    const panel = diagram.locator('[data-diagram-node="' + name + '"]');
    await expect(panel.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', expectedLinks[name].github);
    await expect(panel.getByRole('link', { name: 'npm' })).toHaveAttribute('href', expectedLinks[name].npm);
    for (const link of await panel.getByRole('link').all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noreferrer');
    }
    await expect(panel.getByRole('button', { name: 'Release snapshot' })).toBeVisible();
  }
  for (const name of ['bounded-repository-evidence', 'external-implementation-actor']) {
    const node = diagram.locator('[data-diagram-node="' + name + '"]');
    await expect(node.getByRole('link')).toHaveCount(0);
    await expect(node.getByRole('button')).toHaveCount(0);
  }
  await expect(diagram.locator('[data-diagram-node="my-dev-kit-orchestrator"]')).toContainText('does not execute coding agents');
  await expect(diagram.locator('[data-diagram-node="my-frontend-observer"]')).toContainText('never edits target source');
  await expect(diagram.locator('[data-diagram-node="my-dev-kit-lab"]')).toContainText('optional for ordinary edits');
  await expect(diagram.locator('[data-diagram-mini="my-dev-kit-orchestrator"]')).not.toContainText('Coding agent execution');
  await expect(diagram.locator('[data-diagram-connector="artifacts-outcomes"]')).toHaveCount(0);
});

test('release snapshots expand to textual current versions', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  const currentVersions: Record<string, string> = {
    'my-dev-kit': '1.12.5',
    'my-dev-kit-orchestrator': '1.6.0',
    'my-frontend-observer': '0.10.0',
    'my-dev-kit-lab': '0.6.2',
  };
  for (const name of products) {
    const panel = page.locator('[data-diagram-node="' + name + '"]');
    const toggle = panel.getByRole('button', { name: 'Release snapshot' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const timeline = panel.locator('ol[data-diagram-timeline]');
    await expect(timeline.locator('li[data-release-state="current"]')).toContainText(currentVersions[name]);
    await expect(timeline.locator('li[data-release-state="recent"]')).toContainText('Recent');
    await expect(timeline.locator('li[data-release-state="next"]')).toContainText('Next');
  }
});

test('diagram remains inside the page at mobile width in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/projects/my-dev-kit');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('[data-diagram="my-dev-kit-ecosystem"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
