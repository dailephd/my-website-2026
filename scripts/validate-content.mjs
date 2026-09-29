import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const errors = [];
const warnings = [];

const requiredFiles = [
  'src/content/profile.ts',
  'src/content/links.ts',
  'src/content/projects.ts',
  'src/content/products.ts',
  'src/content/roadmaps.ts',
  'src/content/publications.ts',
  'src/content/gallery.ts',
  'src/content/home.ts',
  'src/content/writing.ts',
  'src/content/contact.ts',
  'src/content/resume.ts',
];

for (const relativePath of requiredFiles) {
  if (!existsSync(path.join(repoRoot, relativePath))) {
    errors.push(`Missing required content file: ${relativePath}`);
  }
}

if (errors.length > 0) {
  console.error('Content validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const profileText = readFileSync(path.join(repoRoot, 'src/content/profile.ts'), 'utf8');
for (const requiredSnippet of [
  'name:',
  'shortName:',
  'headline:',
  'subheadline:',
  'summary:',
  'productLabStatement:',
  'primaryCta',
  'secondaryCta',
]) {
  if (!profileText.includes(requiredSnippet)) {
    errors.push(`Profile content is missing required field indicator: ${requiredSnippet}`);
  }
}

const homeText = readFileSync(path.join(repoRoot, 'src/content/home.ts'), 'utf8');
for (const sectionId of [
  'hero',
  'featuredWork',
  'technicalFocus',
  'background',
]) {
  if (!homeText.includes(`${sectionId}:`)) {
    errors.push(`Homepage content is missing section: ${sectionId}`);
  }
}
for (const focusId of [
  'developer-tooling',
  'ai-workflows',
  'scientific-software',
  'data-ml',
  'research-product',
]) {
  if (!homeText.includes(`id: '${focusId}'`)) {
    errors.push(`Homepage technical focus is missing: ${focusId}`);
  }
}
if (!homeText.includes('title:') || !homeText.includes('summary:')) {
  errors.push('Homepage technical focus items require titles and summaries.');
}

const homepageRouteText = readFileSync(path.join(repoRoot, 'src/app/page.tsx'), 'utf8');
if (!homepageRouteText.includes('getHomepageViewModel')) {
  errors.push('Homepage route must compose content through the homepage view model.');
}
if (/\b(const|let)\s+(projects|products|roadmaps)\s*=\s*\[/.test(homepageRouteText)) {
  errors.push('Homepage route must not define project, product, or roadmap data arrays.');
}
for (const sourceFile of [
  'src/components/sections/FeaturedWorkSection.tsx',
]) {
  const sourceText = readFileSync(path.join(repoRoot, sourceFile), 'utf8');
  if (sourceText.includes('@/content/projects') || sourceText.includes('@/content/products') || sourceText.includes('@/content/roadmaps')) {
    errors.push(`${sourceFile} must receive structured records through props.`);
  }
}

const projectText = readFileSync(path.join(repoRoot, 'src/content/projects.ts'), 'utf8');
for (const requiredSnippet of [
  'id:',
  'slug:',
  'title:',
  'summary:',
  'status:',
  'category:',
  'role:',
  'stack:',
  'featured:',
  'displayPriority:',
  'links:',
]) {
  if (!projectText.includes(requiredSnippet)) {
    errors.push(`Project content is missing required field indicator: ${requiredSnippet}`);
  }
}

const projectIds = [...projectText.matchAll(/^\s{4}id:\s*'([^']+)'/gm)].map((match) => match[1]);
const projectSlugs = [...projectText.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map((match) => match[1]);
const projectStatuses = [...projectText.matchAll(/^\s{4}status:\s*'([^']+)'/gm)].map(
  (match) => match[1],
);
const projectPriorities = [
  ...projectText.matchAll(/^\s{4}displayPriority:\s*(\d+)/gm),
].map((match) => Number(match[1]));
const allowedProjectStatuses = new Set([
  'active',
  'in-development',
  'maintained',
  'experimental',
  'archived',
  'planned',
]);

if (projectIds.length === 0 || projectIds.length !== projectSlugs.length) {
  errors.push('Every project must have a stable id and slug.');
}
if (new Set(projectIds).size !== projectIds.length) {
  errors.push('Project ids must be unique.');
}
if (new Set(projectSlugs).size !== projectSlugs.length) {
  errors.push('Project slugs must be unique.');
}
for (const status of projectStatuses) {
  if (!allowedProjectStatuses.has(status)) {
    errors.push(`Project content uses unsupported status: ${status}`);
  }
}
if (projectPriorities.length !== projectIds.length || projectPriorities.some(Number.isNaN)) {
  errors.push('Every project must have a numeric displayPriority.');
}

for (const href of [...projectText.matchAll(/href:\s*'([^']+)'/g)].map((match) => match[1])) {
  if (!href.startsWith('/') && !/^https?:\/\//.test(href)) {
    errors.push(`Project link is malformed: ${href}`);
  }
}

const productText = readFileSync(path.join(repoRoot, 'src/content/products.ts'), 'utf8');
for (const requiredSnippet of [
  'id:',
  'slug:',
  'title:',
  'shortTitle:',
  'summary:',
  'description:',
  'status:',
  'category:',
  'positioning:',
  'primaryAudience:',
  'modules:',
  'featured:',
  'displayPriority:',
  'roleLabel:',
  'layerLabel:',
  'stage:',
  'stack:',
  'links:',
]) {
  if (!productText.includes(requiredSnippet)) {
    errors.push(`Product content is missing required field indicator: ${requiredSnippet}`);
  }
}

const familyBlock = productText.slice(0, productText.indexOf('export const productIndex'));
const familyIds = [...familyBlock.matchAll(/^\s{4}id:\s*'([^']+)'/gm)].map((match) => match[1]);
const familySlugs = [...familyBlock.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map(
  (match) => match[1],
);
const modulesBlock = familyBlock.slice(familyBlock.indexOf('    modules: ['));
const moduleIds = [...modulesBlock.matchAll(/^\s{8}id:\s*'([^']+)'/gm)].map((match) => match[1]);
const moduleSlugs = [...modulesBlock.matchAll(/^\s{8}slug:\s*'([^']+)'/gm)].map(
  (match) => match[1],
);
const productStatuses = [...productText.matchAll(/status:\s*'([^']+)'/g)].map(
  (match) => match[1],
);
const allowedProductStatuses = new Set(['active', 'in-development', 'experimental', 'planned', 'paused', 'archived']);

if (familyIds.length === 0 || familyIds.length !== familySlugs.length) {
  errors.push('Every product family must have a stable id and slug.');
}
if (new Set(familyIds).size !== familyIds.length || new Set(familySlugs).size !== familySlugs.length) {
  errors.push('Product family ids and slugs must be unique.');
}
if (moduleIds.length !== 4 || moduleIds.length !== moduleSlugs.length) {
  errors.push('my-dev-kit Ecosystem must contain exactly four modules with stable ids and slugs.');
}
if (new Set(moduleIds).size !== moduleIds.length || new Set(moduleSlugs).size !== moduleSlugs.length) {
  errors.push('Product module ids and slugs must be unique within the family.');
}
for (const status of productStatuses) {
  if (!allowedProductStatuses.has(status)) {
    errors.push(`Product content uses unsupported status: ${status}`);
  }
}
for (const role of ['Codebase Intelligence', 'Workflow Orchestration', 'Runtime Evidence', 'Validation Lab']) {
  if (!productText.includes(`roleLabel: '${role}'`)) {
    errors.push(`my-dev-kit Ecosystem is missing module role: ${role}`);
  }
}
for (const requiredSnippet of ['productIndex', 'itemType:', 'roadmapSlug:']) {
  if (!productText.includes(requiredSnippet)) {
    errors.push(`Product index content is missing: ${requiredSnippet}`);
  }
}
if (
  !productText.includes("roadmapSlug: 'my-dev-kit'") ||
  !readFileSync(path.join(repoRoot, 'src/content/roadmaps.ts'), 'utf8').includes("slug: 'my-dev-kit'")
) {
  errors.push('my-dev-kit product index roadmapSlug must resolve to local roadmap content.');
}

const allowedStatuses = new Set(['shipped', 'active', 'planned', 'exploring', 'paused', 'deferred']);
const roadmapText = readFileSync(path.join(repoRoot, 'src/content/roadmaps.ts'), 'utf8');
const roadmapStatuses = [...roadmapText.matchAll(/status:\s*['"`]([^'"`]+)['"`]/g)].map((match) => match[1]);
for (const status of roadmapStatuses) {
  if (!allowedStatuses.has(status)) {
    errors.push(`Roadmap content uses unsupported status: ${status}`);
  }
}
if (!roadmapText.includes('slug:')) {
  errors.push('Roadmap content must include a stable slug.');
}
if (!roadmapText.includes('updatedAt:')) {
  errors.push('Roadmap content must include updatedAt.');
}
if (!roadmapText.includes('id:')) {
  warnings.push('Roadmap content does not yet include explicit id fields. Add stable ids when roadmap data moves beyond scaffold state.');
}

const linksText = readFileSync(path.join(repoRoot, 'src/content/links.ts'), 'utf8');
for (const requiredSnippet of [
  'id:',
  'label:',
  'href:',
  'kind:',
  'external:',
  'displayPriority:',
  'navigationLinks',
]) {
  if (!linksText.includes(requiredSnippet)) {
    errors.push(`Link content is missing required field or collection indicator: ${requiredSnippet}`);
  }
}

const publicationText = readFileSync(path.join(repoRoot, 'src/content/publications.ts'), 'utf8');
if (!publicationText.includes('Publication[]')) {
  errors.push('Publication content must use the typed Publication collection.');
}
const publicationIds = [...publicationText.matchAll(/^\s+id:\s*'([^']+)'/gm)].map(
  (match) => match[1],
);
if (new Set(publicationIds).size !== publicationIds.length) {
  errors.push('Publication ids must be unique.');
}
for (const id of publicationIds) {
  const recordStart = publicationText.indexOf(`id: '${id}'`);
  const nextRecord = publicationText.indexOf('\n  {', recordStart + 1);
  const record = publicationText.slice(recordStart, nextRecord === -1 ? undefined : nextRecord);
  for (const field of ['title:', 'authors:', 'type:', 'links:', 'tags:', 'displayPriority:']) {
    if (!record.includes(field)) errors.push(`Publication "${id}" is missing ${field}`);
  }
}
for (const link of publicationText.matchAll(/label:\s*'([^']*)'[\s\S]*?href:\s*'([^']*)'/g)) {
  if (!link[1].trim() || !link[2].trim()) {
    errors.push('Publication links require a label and href.');
  }
}
if (/Publication placeholder|TBD|fake DOI|citation count/i.test(publicationText)) {
  errors.push('Publication content must not expose placeholder or invented metadata.');
}

const resumeText = readFileSync(path.join(repoRoot, 'src/content/resume.ts'), 'utf8');
const resumePath = path.join(repoRoot, 'public/files/resume.pdf');
const resumeAvailable = /available:\s*true/.test(resumeText);
const resumeLooksValid =
  existsSync(resumePath) &&
  readFileSync(resumePath).subarray(0, 5).toString('ascii') === '%PDF-' &&
  !readFileSync(resumePath, 'utf8').includes('`n');
if (resumeAvailable && !resumeLooksValid) {
  errors.push('Resume metadata cannot claim availability without a valid PDF asset.');
}

const aboutPath = path.join(repoRoot, 'src/app/about/page.tsx');
if (!existsSync(aboutPath)) {
  errors.push('The /about route must exist.');
} else {
  const aboutText = readFileSync(aboutPath, 'utf8');
  for (const adapter of ['getAboutProfile']) {
    if (!aboutText.includes(adapter)) errors.push(`/about must use ${adapter}.`);
  }
  if (/\bconst\s+publications\s*=\s*\[/.test(aboutText)) {
    errors.push('/about must not hardcode publication records.');
  }
  if (/fake DOI|fake PMID|citation count/i.test(aboutText)) {
    errors.push('/about must not render invented publication metadata.');
  }
}

const galleryText = readFileSync(path.join(repoRoot, 'src/content/gallery.ts'), 'utf8');
if (!galleryText.includes('GalleryItem[]')) {
  errors.push('Gallery content must use the typed GalleryItem collection.');
}
if (/Gallery placeholder|placeholder\.png/i.test(galleryText)) {
  errors.push('Gallery content must not expose fake or nonexistent placeholder media.');
}
const galleryIds = [...galleryText.matchAll(/^\s+id:\s*'([^']+)'/gm)].map((match) => match[1]);
if (new Set(galleryIds).size !== galleryIds.length) errors.push('Gallery item ids must be unique.');
const allowedGalleryKinds = new Set([
  'project-screenshot', 'product-screenshot', 'profile', 'diagram', 'visual',
]);
const allowedGalleryCategories = new Set([
  'selected-work', 'product-lab', 'my-dev-kit', 'about', 'profile', 'general',
]);
for (const id of galleryIds) {
  const start = galleryText.indexOf(`id: '${id}'`);
  const next = galleryText.indexOf('\n  {', start + 1);
  const record = galleryText.slice(start, next === -1 ? undefined : next);
  for (const field of ['title:', 'src:', 'alt:', 'kind:', 'category:', 'caption:', 'width:', 'height:', 'displayPriority:', 'featured:']) {
    if (!record.includes(field)) errors.push(`Gallery item "${id}" is missing ${field}`);
  }
  const src = record.match(/src:\s*'([^']+)'/)?.[1];
  const kind = record.match(/kind:\s*'([^']+)'/)?.[1];
  const category = record.match(/category:\s*'([^']+)'/)?.[1];
  if (kind && !allowedGalleryKinds.has(kind)) errors.push(`Unsupported gallery kind: ${kind}`);
  if (category && !allowedGalleryCategories.has(category)) errors.push(`Unsupported gallery category: ${category}`);
  if (src?.startsWith('/images/')) {
    const assetPath = path.join(repoRoot, 'public', ...src.split('/').filter(Boolean));
    if (!existsSync(assetPath)) errors.push(`Missing local gallery asset: ${src}`);
  }
}
if (existsSync(path.join(repoRoot, 'src/app/gallery'))) {
  errors.push('M9 must not add a top-level /gallery route.');
}
for (const folder of ['public/images/gallery', 'public/images/projects', 'public/images/profile']) {
  if (!existsSync(path.join(repoRoot, folder, 'README.md'))) {
    errors.push(`Missing media guidance: ${folder}/README.md`);
  }
}

const writingText = readFileSync(path.join(repoRoot, 'src/content/writing.ts'), 'utf8');
if (!writingText.includes('WritingItem[]')) errors.push('Writing content must use WritingItem[].');
if (/Writing placeholder|example article|fake post/i.test(writingText)) {
  errors.push('Writing content must not contain fake placeholder posts.');
}
const writingIds = [...writingText.matchAll(/^\s+id:\s*'([^']+)'/gm)].map((match) => match[1]);
const writingSlugs = [...writingText.matchAll(/^\s+slug:\s*'([^']+)'/gm)].map((match) => match[1]);
if (new Set(writingIds).size !== writingIds.length) errors.push('Writing ids must be unique.');
if (new Set(writingSlugs).size !== writingSlugs.length) errors.push('Writing slugs must be unique.');
const allowedWritingStatuses = new Set(['published', 'draft', 'planned', 'archived']);
const allowedWritingTypes = new Set(['note', 'essay', 'technical-writeup', 'project-log', 'research-note', 'guide', 'external']);
for (const status of [...writingText.matchAll(/status:\s*'([^']+)'/g)].map((match) => match[1])) {
  if (!allowedWritingStatuses.has(status)) errors.push(`Unsupported writing status: ${status}`);
}
for (const type of [...writingText.matchAll(/type:\s*'([^']+)'/g)].map((match) => match[1])) {
  if (!allowedWritingTypes.has(type)) errors.push(`Unsupported writing type: ${type}`);
}
for (const [route, adapter] of [
  ['publications', 'getPublicationSummary'],
  ['contact', 'getContactIntro'],
]) {
  const routePath = path.join(repoRoot, `src/app/${route}/page.tsx`);
  if (!existsSync(routePath)) {
    errors.push(`Missing /${route} route.`);
    continue;
  }
  const routeText = readFileSync(routePath, 'utf8');
  if (!routeText.includes(adapter)) errors.push(`/${route} must use ${adapter}.`);
  if (/\b(const|let)\s+(writingItems|channels)\s*=\s*\[/.test(routeText)) {
    errors.push(`/${route} must not hardcode structured record arrays.`);
  }
}

if (errors.length > 0) {
  console.error('Content validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Content validation passed.');
for (const warning of warnings) {
  console.warn(`TODO: ${warning}`);
}
