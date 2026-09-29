import { expect, test } from '@playwright/test';

const releases = [
  { id: 'my-dev-kit', current: '1.12.5', next: '1.13.0' },
  { id: 'my-dev-kit-orchestrator', current: '1.6.0', next: '1.7.0' },
  { id: 'my-frontend-observer', current: '0.10.0', next: '0.11.0' },
  { id: 'my-dev-kit-lab', current: '0.6.2', next: '0.6.3' },
];

test('each product disclosure shows a bounded Recent, Current, Next release snapshot', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  for (const { id, current, next } of releases) {
    const panel = page.locator('[data-diagram-node="' + id + '"]');
    const toggle = panel.getByRole('button', { name: 'Release snapshot' });
    const panelId = await toggle.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    await expect(page.locator('#' + panelId)).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const timeline = panel.locator('ol[data-diagram-timeline]');
    await expect(timeline).toBeVisible();
    const entries = timeline.locator('li[data-diagram-timeline-entry]');
    await expect(entries).toHaveCount(3);
    await expect(entries.nth(0)).toHaveAttribute('data-release-state', 'recent');
    await expect(entries.nth(1)).toHaveAttribute('data-release-state', 'current');
    await expect(entries.nth(2)).toHaveAttribute('data-release-state', 'next');
    await expect(entries.nth(0)).toContainText('Recent');
    await expect(entries.nth(1)).toContainText('Current');
    await expect(entries.nth(2)).toContainText('Next');
    await expect(entries.nth(1)).toContainText(current);
    await expect(entries.nth(2)).toContainText(next);
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  }
});

test('release snapshot remains mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/projects/my-dev-kit');
  await expect(page.locator('html')).toHaveClass(/dark/);
  const observer = page.locator('[data-diagram-node="my-frontend-observer"]');
  await observer.getByRole('button', { name: 'Release snapshot' }).click();
  await expect(observer.locator('[data-release-state="current"]')).toContainText('0.10.0');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('expanded release snapshot stays an ordered list styled by the shared diagram timeline', async ({ page }) => {
  await page.goto('/projects/my-dev-kit');
  const labPanel = page.locator('[data-diagram-node="my-dev-kit-lab"]');
  await labPanel.getByRole('button', { name: 'Release snapshot' }).click();
  const timeline = labPanel.locator('ol[data-diagram-timeline]');
  const entries = timeline.locator('li[data-diagram-timeline-entry]');
  await expect(entries).toHaveCount(3);
  const styles = await entries.nth(1).evaluate((entry) => {
    const li = getComputedStyle(entry);
    const marker = getComputedStyle(entry.querySelector('.diagram-timeline-marker')!);
    return { display: li.display, divider: li.borderTopWidth, markerRadius: marker.borderTopLeftRadius, marker: marker.backgroundColor };
  });
  expect(styles.display).toBe('grid');
  expect(styles.divider).toBe('1px');
  expect(parseFloat(styles.markerRadius)).toBeGreaterThan(0);
  expect(styles.marker).not.toBe('rgba(0, 0, 0, 0)');
});
