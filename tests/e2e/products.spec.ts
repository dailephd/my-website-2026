import { expect, test } from '@playwright/test';

test('product lab index renders featured products without the duplicated roadmap preview card', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { level: 1, name: 'Technical projects' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'my-dev-kit Ecosystem' })).toBeVisible();
  await expect(page.getByText('Featured product', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Ecosystem roadmap' })).toHaveCount(0);
  await expect(page.getByText('Updated Jun 28, 2026')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'View full roadmap' })).toHaveCount(0);
  await expect(page.getByText('Personal Website and Product Lab')).toHaveCount(0);
  await expect(page.getByText('Website and product lab')).toHaveCount(0);
  await expect(
    page.getByText('A content-powered home for selected software, product direction, and technical work.'),
  ).toHaveCount(0);
  await expect(
    page.getByText('An in-development publishing surface for one technical founder and builder.'),
  ).toHaveCount(0);
  const ecosystemCard = page.locator('article', { has: page.getByRole('heading', { level: 2, name: 'my-dev-kit Ecosystem' }) });
  await expect(ecosystemCard.getByText('Status: In development', { exact: true })).toHaveCount(0);
  await expect(ecosystemCard.getByText('Status: Active', { exact: true })).toBeVisible();
  await expect(ecosystemCard.getByText('Product family', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'npm package' })).toHaveCount(0);
  await expect(page.locator('a[href="https://www.npmjs.com/package/@dailephd/my-dev-kit"]')).toHaveCount(0);

  const detail = page.getByRole('link', { name: 'Explore product' });
  await expect(detail).toBeVisible();
  const ctaRow = page.locator('div.mt-6.flex.flex-wrap.gap-4', { has: detail });
  await expect(ctaRow).not.toBeEmpty();

  await detail.click();
  await expect(page).toHaveURL(/\/projects\/my-dev-kit$/);
  await expect(page.getByRole('heading', { level: 2, name: 'How the products are related' })).toBeVisible();
});

test('standard product cards show BioLit, Le Crawler, and iworkhere.space in order', async ({ page }) => {
  await page.goto('/projects');
  const standardSection = page.locator('section[aria-labelledby="product-experiments-heading"]');
  await expect(standardSection.getByRole('heading', { level: 2, name: 'In development and experimental' })).toBeVisible();
  const cards = standardSection.locator('article');
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0).getByRole('heading', { level: 2, name: 'BioLit' })).toBeVisible();
  const crawler = cards.nth(1);
  await expect(crawler.getByRole('heading', { level: 2, name: 'Le Crawler' })).toBeVisible();
  await expect(crawler.getByText('Status: In development', { exact: true })).toBeVisible();
  await expect(crawler.getByText('Standalone product', { exact: true })).toBeVisible();
  await expect(crawler.getByText('Developer tooling', { exact: true })).toBeVisible();
  await expect(crawler.getByText("Chrome extension for controlled crawling of user-selected web content through the user's existing Chrome session, with structured local archiving and derived output.")).toBeVisible();
  await expect(crawler.getByText('Background, resumable web crawling with explicit scope, durable state, safety boundaries, and user-controlled local output.')).toBeVisible();
  await expect(crawler.getByRole('link', { name: 'Explore product' })).toHaveCount(0);
  await expect(crawler.getByRole('link')).toHaveCount(0);
  await expect(page.locator('a[href="https://github.com/dailephd/le-crawler"]')).toHaveCount(0);
  const iworkhere = cards.nth(2);
  await expect(iworkhere.getByRole('heading', { level: 2, name: 'iworkhere.space' })).toBeVisible();
  await expect(iworkhere.getByText('Status: In development', { exact: true })).toBeVisible();
  await expect(iworkhere.getByText('Standalone product', { exact: true })).toBeVisible();
  await expect(iworkhere.getByText('Developer tooling', { exact: true })).toBeVisible();
  await expect(iworkhere.getByText('A collection of client-side utility tools built as an offline-capable Progressive Web App.')).toBeVisible();
  await expect(iworkhere.getByRole('link', { name: 'Explore product' })).toHaveCount(0);
  const website = iworkhere.getByRole('link', { name: 'Website', exact: true });
  const repository = iworkhere.getByRole('link', { name: 'GitHub', exact: true });
  await expect(website).toHaveAttribute('href', 'https://iworkhere.space');
  await expect(website).toHaveAttribute('target', '_blank');
  await expect(website).toHaveAttribute('rel', 'noreferrer');
  await expect(repository).toHaveAttribute('href', 'https://github.com/dailephd/iworkhere.space');
  await expect(repository).toHaveAttribute('target', '_blank');
  await expect(repository).toHaveAttribute('rel', 'noreferrer');
  await expect(iworkhere.getByRole('link')).toHaveCount(2);
  await expect(iworkhere.locator('a[href^="/projects/"]')).toHaveCount(0);
  await expect(iworkhere.locator('a[href*="npmjs.com"]')).toHaveCount(0);
});

test('projects page renders the archived projects section after current project content', async ({ page }) => {
  await page.goto('/projects');

  await expect(page.getByRole('heading', { level: 2, name: 'Archived projects' })).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 3, name: 'TCGA BRCA Tumor-Normal Transcriptomics Dashboard' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'SmartTutor' })).toBeVisible();
  await expect(
    page.getByRole('heading', {
      level: 3,
      name: 'Automated Differential Expression Analysis of Human Brain Proteome',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 3, name: 'GNN Water Depth Prediction for SWMM' }),
  ).toBeVisible();

  await expect(
    page.getByText(
      'A reproducible R-based analysis pipeline and companion web dashboard for exploring tumor-normal transcriptomic differences in the TCGA Breast Cancer cohort.',
    ),
  ).toBeVisible();
  await expect(
    page.getByText(
      'The project separates validated statistical analysis from downstream visualization so collaborators can explore precomputed results without installing R or inspecting notebooks.',
    ),
  ).toBeVisible();
  await expect(
    page.getByText(
      'The dashboard is a read-only consumer of analysis artifacts. It does not perform live computation, statistical re-analysis, or modification of source artifact files.',
    ),
  ).toBeVisible();

  await expect(page.locator('ul[aria-label$="technology stack"]')).toHaveCount(0);
  await expect(page.getByLabel('TCGA BRCA Tumor-Normal Transcriptomics Dashboard technology stack')).toHaveCount(0);
  await expect(page.getByText('statistical analysis', { exact: true })).toHaveCount(0);

  const ecosystemCard = page.locator('article', { has: page.getByRole('heading', { level: 2, name: 'my-dev-kit Ecosystem' }) });
  await expect(ecosystemCard.getByText('Status: In development', { exact: true })).toHaveCount(0);
  await expect(ecosystemCard.getByText('Status: Active', { exact: true })).toBeVisible();
  await expect(ecosystemCard.getByText('Product family', { exact: true })).toBeVisible();
  await expect(page.getByText('View selected work')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /^View selected work/ })).toHaveCount(0);
  await expect(page.locator('a[href="/work"]')).toHaveCount(0);

  const bodyText = await page.locator('body').innerText();
  expect(bodyText.indexOf('my-dev-kit Ecosystem')).toBeLessThan(bodyText.indexOf('Archived projects'));
  expect(bodyText.indexOf('Archived projects')).toBeLessThan(
    bodyText.indexOf('TCGA BRCA Tumor-Normal Transcriptomics Dashboard'),
  );
});

test('product lab remains mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  await page.goto('/projects');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('heading', { level: 2, name: 'BioLit' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Le Crawler' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'iworkhere.space' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
