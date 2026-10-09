import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REQUIRED_DOCS = [
  'docs/ARCHITECTURE.md',
  'docs/CONTRACT.md',
  'docs/DOMAIN_MODEL.md',
  'docs/COMPONENT_MAP.md',
  'docs/DESIGN.md',
  'docs/DIAGRAM_DESIGN.md',
  'docs/ROADMAP.md',
  'docs/milestones.json',
];
const ENTRYPOINTS = ['AGENTS.md', 'CLAUDE.md', 'agents.txt', 'claude.txt'];
const MANIFEST_DIRECTIVES = new Map([
  ['AGENTS.md', /^\s*@manifest\.txt\s*$/im],
  ['CLAUDE.md', /^\s*@manifest\.txt\s*$/im],
  ['agents.txt', /^Before inspecting or changing this repository, read root manifest\.txt in full alongside this guide\.(?=\s|$)/m],
  ['claude.txt', /^Before inspecting or changing this repository, read root manifest\.txt in full alongside this guide\.(?=\s|$)/m],
]);
const INVENTORY_START = '<!-- TRACKED-DIRECTORY-INVENTORY:START -->';
const INVENTORY_END = '<!-- TRACKED-DIRECTORY-INVENTORY:END -->';
const LOCAL_OR_GENERATED = new Set([
  '.git', '.next', '.vercel', 'coverage', 'node_modules', 'playwright-report',
  'test-results', '.my-dev-kit-context', '.my-dev-kit-workflow', '.my-dev-kit-orchestrator',
]);

function trackedFilesAt(root) {
  const result = spawnSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`git ls-files failed: ${result.stderr.trim()}`);
  return result.stdout.split('\0').filter(Boolean);
}

function trackedDirectories(files) {
  const directories = new Set();
  for (const file of files) {
    let current = path.posix.dirname(file.replaceAll('\\', '/'));
    while (current !== '.') {
      directories.add(current);
      current = path.posix.dirname(current);
    }
  }
  return [...directories].sort();
}

function manifestDirectories(contents) {
  const start = contents.indexOf(INVENTORY_START);
  const end = contents.indexOf(INVENTORY_END);
  if (start < 0 || end < start) return null;
  return contents.slice(start + INVENTORY_START.length, end)
    .split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function onDiskDirectories(root) {
  const found = [];
  const visit = (relative) => {
    for (const entry of readdirSync(path.join(root, relative), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const child = relative ? `${relative}/${entry.name}` : entry.name;
      if (LOCAL_OR_GENERATED.has(child) || LOCAL_OR_GENERATED.has(entry.name)) continue;
      found.push(child);
      visit(child);
    }
  };
  visit('');
  return found;
}

function onDiskPackageFiles(root) {
  const found = [];
  const visit = (relative) => {
    for (const entry of readdirSync(path.join(root, relative), { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (LOCAL_OR_GENERATED.has(entry.name)) continue;
        visit(relative ? `${relative}/${entry.name}` : entry.name);
      } else if (entry.isFile() && entry.name === 'package.json') {
        found.push(relative ? `${relative}/package.json` : entry.name);
      }
    }
  };
  visit('');
  return found;
}

export function validateRepositoryStructure({ root, trackedFiles } = {}) {
  const repoRoot = root ?? process.cwd();
  const errors = [];
  const has = (relative) => existsSync(path.join(repoRoot, relative));
  if (!has('manifest.txt')) errors.push('Missing required path: manifest.txt');

  for (const file of ENTRYPOINTS) {
    if (!has(file)) {
      errors.push(`Missing required instruction entrypoint: ${file}`);
      continue;
    }
    if (!MANIFEST_DIRECTIVES.get(file).test(readFileSync(path.join(repoRoot, file), 'utf8'))) {
      errors.push(`${file} must reference manifest.txt.`);
    }
  }

  if (has('manifest.txt')) {
    const contents = readFileSync(path.join(repoRoot, 'manifest.txt'), 'utf8');
    const registered = manifestDirectories(contents);
    if (!registered) {
      errors.push(`manifest.txt must contain ${INVENTORY_START} and ${INVENTORY_END} markers.`);
    } else {
      const inventory = trackedFiles ?? trackedFilesAt(repoRoot);
      const actual = trackedDirectories(inventory);
      const seen = new Set();
      for (const directory of registered) {
        if (seen.has(directory)) errors.push(`Duplicate manifest directory entry: ${directory}`);
        seen.add(directory);
        if (directory.includes('\\') || path.posix.normalize(directory) !== directory || directory.startsWith('/')) {
          errors.push(`Manifest directory entry must use an exact relative path: ${directory}`);
        }
      }
      const known = new Set(registered);
      for (const directory of actual) {
        if (!known.has(directory)) errors.push(`Tracked directory is not registered in manifest.txt: ${directory}/`);
      }
      for (const directory of registered) {
        if (!actual.includes(directory)) errors.push(`Manifest directory is not present in tracked files: ${directory}/`);
      }
    }
  }

  for (const file of REQUIRED_DOCS) {
    if (!has(file)) errors.push(`Missing required architecture document: ${file}`);
  }

  const structurePaths = new Set([...(trackedFiles ?? trackedFilesAt(repoRoot)).map((file) => file.replaceAll('\\', '/')), ...onDiskDirectories(repoRoot)]);
  const prohibited = [
    ['apps/', (entry) => entry === 'apps' || entry.startsWith('apps/')],
    ['unapproved packages directory (contracts/content packages are not allowed)', (entry) => entry === 'packages' || entry.startsWith('packages/')],
    ['separate backend service directory', (entry) => /^(backend|services|server)\//.test(entry)],
    ['external website-owned content package', (entry) => /^(packages\/(content|website-content)|content-package)\//.test(entry)],
  ];
  for (const [label, predicate] of prohibited) {
    const offender = [...structurePaths].sort().find(predicate);
    if (offender) errors.push(`Prohibited application structure found at ${offender}: ${label}.`);
  }

  const packageFiles = new Set([
    ...(trackedFiles ?? trackedFilesAt(repoRoot)).filter((file) => file.endsWith('package.json')),
    ...onDiskPackageFiles(repoRoot),
  ]);
  for (const file of packageFiles) {
    if (!file.endsWith('package.json') || file === 'package.json') continue;
    try {
      const pkg = JSON.parse(readFileSync(path.join(repoRoot, file), 'utf8'));
      if (pkg.dependencies?.next || pkg.devDependencies?.next) {
        errors.push(`Second Next.js application package found: ${file}`);
      }
    } catch {
      errors.push(`Cannot inspect nested package manifest: ${file}`);
    }
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const errors = validateRepositoryStructure();
  if (errors.length) {
    console.error('Repository structure checks failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log('Repository structure checks passed.');
  }
}
