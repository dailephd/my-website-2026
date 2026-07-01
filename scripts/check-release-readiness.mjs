import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const repoRoot = process.cwd();

const LINE = '─'.repeat(60);

function section(label) {
  console.log(`\n${LINE}`);
  console.log(`  ${label}`);
  console.log(LINE);
}

function info(msg) {
  console.log(`  ${msg}`);
}

section('my-website-2026 — Release Readiness Check');
info(`Root: ${repoRoot}`);
info(`Date: ${new Date().toISOString().slice(0, 10)}`);

// 1. Required release paths
section('1/9  Required release paths');
const requiredPaths = [
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
  'src/app/projects/page.tsx',
  'src/app/projects/my-dev-kit/page.tsx',
  'src/app/publications/page.tsx',
  'src/app/about/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/robots.ts',
  'src/app/sitemap.ts',
  '.env.example',
  'README.md',
];

let pathErrors = 0;
for (const relativePath of requiredPaths) {
  if (!existsSync(path.join(repoRoot, relativePath))) {
    console.error(`  MISSING: ${relativePath}`);
    pathErrors++;
  } else {
    info(`  OK: ${relativePath}`);
  }
}
if (pathErrors > 0) {
  console.error(`\n  ${pathErrors} required path(s) missing. Aborting.`);
  process.exit(1);
}

// 2. Forbidden multi-service paths
section('2/9  Forbidden multi-service paths');
const forbiddenFilesystemPaths = ['apps', 'packages/contracts', 'apps/web', 'apps/nlp-service'];
let forbiddenErrors = 0;
for (const relativePath of forbiddenFilesystemPaths) {
  if (existsSync(path.join(repoRoot, relativePath))) {
    console.error(`  FORBIDDEN PATH EXISTS: ${relativePath}`);
    forbiddenErrors++;
  }
}
if (forbiddenErrors > 0) {
  console.error(`\n  ${forbiddenErrors} forbidden path(s) found. Aborting.`);
  process.exit(1);
}
info('No forbidden paths found.');

// 3. Conflicting public assets
section('3/9  Conflicting public assets');
if (existsSync(path.join(repoRoot, 'public/robots.txt'))) {
  console.error('  CONFLICT: public/robots.txt must not exist — use src/app/robots.ts only.');
  process.exit(1);
}
info('public/robots.txt absent (correct).');

// 4–9. Quality gate scripts
const gates = [
  { num: '4/9', label: 'Typecheck',          script: 'typecheck' },
  { num: '5/9', label: 'Lint',               script: 'lint' },
  { num: '6/9', label: 'Content validation', script: 'validate:content' },
  { num: '7/9', label: 'Link validation',    script: 'validate:links' },
  { num: '8/9', label: 'Unit tests',         script: 'test' },
  { num: '9/9', label: 'Production build',   script: 'build' },
];

for (const gate of gates) {
  section(`${gate.num}  ${gate.label}`);
  info(`Running: npm run ${gate.script}`);
  const result = spawnSync(`npm run ${gate.script}`, { cwd: repoRoot, stdio: 'inherit', shell: true });
  if ((result.status ?? 1) !== 0) {
    console.error(`\n  Gate FAILED: npm run ${gate.script} exited ${result.status ?? 1}`);
    process.exit(result.status ?? 1);
  }
}

section('Release readiness PASSED');
info('All required paths present.');
info('No forbidden paths found.');
info('All quality gates passed.');
info('');
info('Next step (separate workflow):');
info('  1. Review final git diff');
info('  2. Commit and push to GitHub');
info('  3. Configure Vercel — set NEXT_PUBLIC_SITE_URL');
info('  4. Deploy preview and verify');
info('  5. Promote to production');
info('');
info('E2E tests (not auto-run — require a running dev server):');
info('  Start: npm run dev:web -- --port 3100');
info('  Then:  npm run test:e2e');
console.log(LINE);
