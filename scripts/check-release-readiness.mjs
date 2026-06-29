import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const repoRoot = process.cwd();
const checks = ['typecheck', 'lint', 'validate:content', 'validate:links', 'test', 'build'];
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
  'src/app/work/page.tsx',
  'src/app/products/page.tsx',
  'src/app/products/my-dev-kit/page.tsx',
  'src/app/writing/page.tsx',
  'src/app/about/page.tsx',
  'src/app/contact/page.tsx',
];

for (const relativePath of requiredPaths) {
  if (!existsSync(path.join(repoRoot, relativePath))) {
    console.error(`Missing required release path: ${relativePath}`);
    process.exit(1);
  }
}

const forbiddenFilesystemPaths = ['apps', 'packages/contracts', 'apps/web', 'apps/nlp-service'];
for (const relativePath of forbiddenFilesystemPaths) {
  if (existsSync(path.join(repoRoot, relativePath))) {
    console.error(`Release readiness check failed: forbidden path exists: ${relativePath}`);
    process.exit(1);
  }
}

for (const check of checks) {
  console.log(`Running release gate: npm run ${check}`);
  const result = spawnSync(`npm run ${check}`, { cwd: repoRoot, stdio: 'inherit', shell: true });
  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('Release readiness checks passed.');
