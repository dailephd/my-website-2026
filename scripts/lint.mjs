import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const repoRoot = process.cwd();

const requiredPaths = [
  'README.md',
  'docs/PROJECT_OVERVIEW.md',
  'docs/ARCHITECTURE.md',
  'docs/CI_CD.md',
  'docs/CONTRACT.md',
  'docs/DESIGN.md',
  'docs/ROADMAP.md',
  'docs/milestones.json',
  'docs/project_tree.txt',
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/projects/my-dev-kit/page.tsx',
  'src/content/profile.ts',
  'src/content/projects.ts',
  'src/content/roadmaps.ts',
  'src/types/theme.ts',
  'src/lib/theme.ts',
  'src/components/theme/ThemeProvider.tsx',
  'src/components/theme/ThemeToggle.tsx',
  'src/components/theme/theme-script.tsx',
  'src/styles/tokens.css',
  'src/styles/theme.css',
];

const requiredDocs = [
  'README.md',
  'docs/PROJECT_OVERVIEW.md',
  'docs/ARCHITECTURE.md',
  'docs/CI_CD.md',
  'docs/CONTRACT.md',
  'docs/DESIGN.md',
  'docs/ROADMAP.md',
];

const forbiddenFilesystemPaths = ['apps', 'packages/contracts', 'apps/web', 'apps/nlp-service'];

const unresolvedPlaceholderPatterns = [
  /<project-name>/i,
  /<goal-[^>]+>/i,
  /<integration-layer>/i,
  /<roadmap-project-direction\/>/i,
  /<[a-z0-9-]+>/i,
];

const errors = [];

for (const relativePath of requiredPaths) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!existsSync(absolutePath)) {
    errors.push(`Missing required path: ${relativePath}`);
  }
}

if (existsSync(path.join(repoRoot, 'doc'))) {
  errors.push('Found doc/ directory. This project must use docs/.');
}

for (const relativePath of forbiddenFilesystemPaths) {
  if (existsSync(path.join(repoRoot, relativePath))) {
    errors.push(`Forbidden multi-service path exists in repo: ${relativePath}`);
  }
}

for (const relativePath of requiredDocs) {
  const contents = readFileSync(path.join(repoRoot, relativePath), 'utf8');

  if (/\bdoc\//.test(contents) || /\bdoc\\/.test(contents)) {
    errors.push(`${relativePath} references doc/ instead of docs/.`);
  }

  for (const pattern of unresolvedPlaceholderPatterns) {
    if (pattern.test(contents)) {
      errors.push(`${relativePath} contains unresolved placeholder text matching ${pattern}.`);
    }
  }
}

const architectureDoc = readFileSync(path.join(repoRoot, 'docs/ARCHITECTURE.md'), 'utf8');
const contractDoc = readFileSync(path.join(repoRoot, 'docs/CONTRACT.md'), 'utf8');
if (!architectureDoc.includes('src/content/roadmaps.ts') || !contractDoc.includes('src/content/roadmaps.ts')) {
  errors.push('Roadmap documentation must identify src/content/roadmaps.ts as the roadmap source of truth.');
}

const designDoc = readFileSync(path.join(repoRoot, 'docs/DESIGN.md'), 'utf8').toLowerCase();
if (!designDoc.includes('not white') || !designDoc.includes('not black')) {
  errors.push('DESIGN.md must explicitly forbid pure white and pure black as the main page backgrounds.');
}

const tokenText = readFileSync(path.join(repoRoot, 'src/styles/tokens.css'), 'utf8').toLowerCase();
const themeText = readFileSync(path.join(repoRoot, 'src/styles/theme.css'), 'utf8').toLowerCase();
for (const [file, contents] of [
  ['src/styles/tokens.css', tokenText],
  ['src/styles/theme.css', themeText],
]) {
  if (/--color-background:\s*(#fff(?:fff)?|white)\s*;/.test(contents)) {
    errors.push(`${file} must not use pure white as the main background token.`);
  }
  if (/--color-background:\s*(#000(?:000)?|black)\s*;/.test(contents)) {
    errors.push(`${file} must not use pure black as the main background token.`);
  }
}

if (!tokenText.includes('--color-background: #edeff3')) {
  errors.push('Light theme must define the approved soft-grey background token.');
}
if (!themeText.includes('--color-background: #1a1d23')) {
  errors.push('Dark theme must define the approved charcoal background token.');
}

const ecosystemPageText = readFileSync(
  path.join(repoRoot, 'src/app/projects/my-dev-kit/page.tsx'),
  'utf8',
);
if (!ecosystemPageText.includes('getMyDevKitEcosystem')) {
  errors.push('/projects/my-dev-kit must load its family through the content adapter.');
}

const productsPageText = readFileSync(path.join(repoRoot, 'src/app/projects/page.tsx'), 'utf8');
if (!productsPageText.includes('getProductIndexViewModel')) {
  errors.push('/projects must load its index through the product content adapter.');
}
if (/my-dev-kit Ecosystem|BioLit|Recently shipped|Current focus|Next planned/.test(productsPageText)) {
  errors.push('/projects must not duplicate product or roadmap card content.');
}
if (/Codebase Intelligence|Workflow Orchestration|Validation Lab/.test(ecosystemPageText)) {
  errors.push('The ecosystem route must not duplicate module role content.');
}
if (!ecosystemPageText.includes('getProductFamilyModules')) {
  errors.push('M5 ecosystem route must load its product modules, including per-module roadmaps, through the content adapter.');
}
if (/Project intelligence foundation|Staged workflow discipline|Deterministic evaluation fixtures/.test(ecosystemPageText)) {
  errors.push('The ecosystem route must not duplicate roadmap phase content.');
}

if (errors.length > 0) {
  console.error('Custom lint checks failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Custom repository lint checks passed.');

const eslintCommand =
  process.platform === 'win32'
    ? 'npx eslint . --ext .ts,.tsx'
    : 'npx eslint . --ext .ts,.tsx';
const eslintResult = spawnSync(eslintCommand, {
  stdio: 'inherit',
  cwd: repoRoot,
  shell: true,
});

process.exit(eslintResult.status ?? 1);
