import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { validateRepositoryStructure } from '../../scripts/check-repository-structure.mjs';

const requiredDocs = [
  'docs/ARCHITECTURE.md', 'docs/CONTRACT.md', 'docs/DOMAIN_MODEL.md', 'docs/COMPONENT_MAP.md',
  'docs/DESIGN.md', 'docs/DIAGRAM_DESIGN.md', 'docs/ROADMAP.md', 'docs/milestones.json',
];
const entrypoints = ['AGENTS.md', 'CLAUDE.md', 'agents.txt', 'claude.txt'];
const inventoryMarkers = '<!-- TRACKED-DIRECTORY-INVENTORY:START -->\n<!-- TRACKED-DIRECTORY-INVENTORY:END -->';
let roots: string[] = [];

function fixture() {
  const root = mkdtempSync(path.join(process.cwd(), '.my-dev-kit-workflow', 'structure-check-'));
  roots.push(root);
  for (const file of ['manifest.txt', ...entrypoints, ...requiredDocs]) {
    const target = path.join(root, file);
    mkdirSync(path.dirname(target), { recursive: true });
    const body = file === 'manifest.txt'
      ? inventoryMarkers
      : file === 'AGENTS.md' || file === 'CLAUDE.md'
        ? '@manifest.txt'
        : entrypoints.includes(file)
          ? 'Before inspecting or changing this repository, read root manifest.txt in full alongside this guide. Follow it.'
          : 'fixture';
    writeFileSync(target, body);
  }
  return root;
}

afterEach(() => {
  for (const root of roots) rmSync(root, { recursive: true, force: true });
  roots = [];
});

describe('repository structure guard', () => {
  it('passes a valid tracked directory inventory and ignores ordinary files and local generated directories', () => {
    const root = fixture();
    writeFileSync(path.join(root, 'manifest.txt'), '<!-- TRACKED-DIRECTORY-INVENTORY:START -->\ndocs\n<!-- TRACKED-DIRECTORY-INVENTORY:END -->');
    writeFileSync(path.join(root, 'note.txt'), 'legitimate nonstructural file');
    mkdirSync(path.join(root, '.next/cache'), { recursive: true });
    mkdirSync(path.join(root, '.vercel/output'), { recursive: true });
    mkdirSync(path.join(root, 'node_modules/pkg'), { recursive: true });
    mkdirSync(path.join(root, '.my-dev-kit-context/reports'), { recursive: true });
    mkdirSync(path.join(root, '.my-dev-kit-workflow/indexes'), { recursive: true });
    mkdirSync(path.join(root, '.my-dev-kit-orchestrator/tmp'), { recursive: true });
    mkdirSync(path.join(root, 'test-results'), { recursive: true });
    expect(validateRepositoryStructure({ root, trackedFiles: [...requiredDocs, 'docs/CONTRACT.md', 'note.txt'] })).toEqual([]);
  });

  it('fails when the root manifest is missing', () => {
    const root = fixture();
    rmSync(path.join(root, 'manifest.txt'));
    expect(validateRepositoryStructure({ root, trackedFiles: [] })).toContain('Missing required path: manifest.txt');
  });

  it('fails when any instruction entrypoint omits the manifest reference', () => {
    const root = fixture();
    writeFileSync(path.join(root, 'CLAUDE.md'), 'Read agents.txt first.');
    expect(validateRepositoryStructure({ root, trackedFiles: [] })).toContain('CLAUDE.md must reference manifest.txt.');
  });

  it('does not accept an incidental manifest mention as an instruction directive', () => {
    const root = fixture();
    writeFileSync(path.join(root, 'CLAUDE.md'), 'The old manual mentioned manifest.txt in a historical note.');
    expect(validateRepositoryStructure({ root, trackedFiles: [] })).toContain('CLAUDE.md must reference manifest.txt.');
  });

  it('fails with the path of an unregistered tracked directory', () => {
    const root = fixture();
    expect(validateRepositoryStructure({ root, trackedFiles: ['src/page.tsx'] }))
      .toContain('Tracked directory is not registered in manifest.txt: src/');
  });

  it('compares complete directory paths exactly', () => {
    const root = fixture();
    writeFileSync(path.join(root, 'manifest.txt'), '<!-- TRACKED-DIRECTORY-INVENTORY:START -->\ndocs/comp\n<!-- TRACKED-DIRECTORY-INVENTORY:END -->');
    const errors = validateRepositoryStructure({ root, trackedFiles: ['docs/components/page.md', 'docs/other/page.md'] });
    expect(errors).toContain('Tracked directory is not registered in manifest.txt: docs/');
    expect(errors).toContain('Tracked directory is not registered in manifest.txt: docs/other/');
    expect(errors).toContain('Manifest directory is not present in tracked files: docs/comp/');
  });

  it('rejects duplicate inventory entries and non-exact path spellings', () => {
    const root = fixture();
    writeFileSync(path.join(root, 'manifest.txt'), '<!-- TRACKED-DIRECTORY-INVENTORY:START -->\ndocs\ndocs\ndocs/../docs\n<!-- TRACKED-DIRECTORY-INVENTORY:END -->');
    const errors = validateRepositoryStructure({ root, trackedFiles: ['docs/page.md'] });
    expect(errors).toContain('Duplicate manifest directory entry: docs');
    expect(errors).toContain('Manifest directory entry must use an exact relative path: docs/../docs');
  });

  it.each(['apps/web/page.tsx', 'packages/contracts/src/index.ts', 'services/api/main.ts'])(
    'flags prohibited application structures with an actionable path: %s',
    (offendingFile) => {
    const root = fixture();
      const errors = validateRepositoryStructure({ root, trackedFiles: [offendingFile] });
      expect(errors.some((error) => error.includes(offendingFile.split('/')[0]))).toBe(true);
    },
  );

  it('detects an untracked nested Next.js package without relying on directory names alone', () => {
    const root = fixture();
    const nested = path.join(root, 'extra-site');
    mkdirSync(nested, { recursive: true });
    writeFileSync(path.join(nested, 'package.json'), JSON.stringify({ dependencies: { next: '15.0.0' } }));
    expect(validateRepositoryStructure({ root, trackedFiles: [] }))
      .toContain('Second Next.js application package found: extra-site/package.json');
  });
});
