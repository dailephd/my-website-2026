import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const errors = [];
const warnings = [];
const publicRoutes = new Set();

const routeFile = path.join(repoRoot, 'src/lib/routes.ts');
if (existsSync(routeFile)) {
  const routesText = readFileSync(routeFile, 'utf8');
  const routeMatches = [...routesText.matchAll(/:\s*['"`]([^'"`]+)['"`]/g)].map((match) => match[1]);
  const routeToFile = new Map([
    ['/', 'src/app/page.tsx'],
    ['/work', 'src/app/work/page.tsx'],
    ['/products', 'src/app/products/page.tsx'],
    ['/products/my-dev-kit', 'src/app/products/my-dev-kit/page.tsx'],
    ['/writing', 'src/app/writing/page.tsx'],
    ['/about', 'src/app/about/page.tsx'],
    ['/contact', 'src/app/contact/page.tsx'],
  ]);

  for (const route of routeMatches) {
    publicRoutes.add(route);
    const expectedFile = routeToFile.get(route);
    if (expectedFile && !existsSync(path.join(repoRoot, expectedFile))) {
      errors.push(`Route ${route} is declared in src/lib/routes.ts but ${expectedFile} is missing.`);
    }
  }
}

const contentFiles = [
  'src/content/profile.ts',
  'src/content/links.ts',
  'src/content/projects.ts',
  'src/content/products.ts',
  'src/content/publications.ts',
  'src/content/gallery.ts',
  'src/content/writing.ts',
  'src/content/contact.ts',
  'src/content/resume.ts',
];

const externalUrls = new Set();

for (const relativePath of contentFiles) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!existsSync(absolutePath)) {
    continue;
  }

  const contents = readFileSync(absolutePath, 'utf8');
  const matches = [...contents.matchAll(/href:\s*['"`]([^'"`]+)['"`]/g)].map((match) => match[1]);
  for (const candidate of matches) {
    if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
      try {
        new URL(candidate);
        externalUrls.add(candidate);
      } catch {
        errors.push(`Malformed URL in ${relativePath}: ${candidate}`);
      }
    } else if (candidate.startsWith('mailto:')) {
      if (!candidate.includes('@')) {
        errors.push(`Malformed mailto link in ${relativePath}: ${candidate}`);
      }
    } else if (candidate.startsWith('/')) {
      if (candidate.startsWith('/images/') || candidate.startsWith('/files/')) {
        const assetPath = path.join(repoRoot, 'public', ...candidate.split('/').filter(Boolean));
        if (!existsSync(assetPath)) errors.push(`Missing local asset in ${relativePath}: ${candidate}`);
      } else if (!publicRoutes.has(candidate)) {
        errors.push(`Unknown internal route in ${relativePath}: ${candidate}`);
      }
    }
  }
}

for (const requiredSeoFile of [
  'src/lib/seo/metadata.ts',
  'src/lib/seo/site-url.ts',
  'src/lib/seo/open-graph.ts',
  'src/lib/seo/structured-data.ts',
]) {
  if (!existsSync(path.join(repoRoot, requiredSeoFile))) errors.push(`Missing SEO helper: ${requiredSeoFile}`);
}
const metadataText = readFileSync(path.join(repoRoot, 'src/lib/seo/metadata.ts'), 'utf8');
for (const routeKey of ['home', 'work', 'products', 'productMyDevKit', 'about', 'writing', 'contact']) {
  if (!metadataText.includes(`${routeKey}: {`)) errors.push(`Missing route metadata: ${routeKey}`);
}
for (const pageFile of [
  'src/app/page.tsx',
  'src/app/work/page.tsx',
  'src/app/products/page.tsx',
  'src/app/products/my-dev-kit/page.tsx',
  'src/app/about/page.tsx',
  'src/app/writing/page.tsx',
  'src/app/contact/page.tsx',
]) {
  if (!readFileSync(path.join(repoRoot, pageFile), 'utf8').includes('buildPageMetadata')) {
    errors.push(`${pageFile} must use the centralized metadata builder.`);
  }
}
if (existsSync(path.join(repoRoot, 'public/robots.txt'))) {
  errors.push('Use src/app/robots.ts only; public/robots.txt conflicts with metadata routing.');
}
const sitemapText = readFileSync(path.join(repoRoot, 'src/app/sitemap.ts'), 'utf8');
if (!sitemapText.includes('routeMetadata')) errors.push('Sitemap must derive from the route metadata registry.');

if (process.env.CHECK_EXTERNAL_LINKS === 'true') {
  const fetchImpl = globalThis.fetch;
  if (!fetchImpl) {
    warnings.push('External link checking was requested, but fetch is unavailable in this Node runtime.');
  } else {
    for (const url of externalUrls) {
      try {
        const response = await fetchImpl(url, { method: 'HEAD', redirect: 'follow' });
        if (!response.ok) {
          warnings.push(`External link check returned ${response.status} for ${url}`);
        }
      } catch (error) {
        warnings.push(`External link check failed for ${url}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
} else {
  console.log('External network link checks skipped. Set CHECK_EXTERNAL_LINKS=true to enable them.');
}

if (errors.length > 0) {
  console.error('Link validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Link validation passed.');
for (const warning of warnings) {
  console.warn(`WARN: ${warning}`);
}
