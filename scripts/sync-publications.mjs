/**
 * scripts/sync-publications.mjs
 *
 * Fetches publication metadata from public scholarly APIs and writes results
 * to src/content/publications-cache.json for review.
 *
 * Source hierarchy:
 *   1. src/content/publications.ts (manual seed, source of truth - never overwritten)
 *   2. Crossref (DOI metadata)
 *   3. Semantic Scholar (abstracts by DOI)
 *   4. ORCID (public works list, if PUBLICATIONS_ORCID_ID is set)
 *
 * Usage:
 *   npm run sync:publications
 *
 * This script is optional and must be run manually.
 * It does not run during build, test, or CI.
 */

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const outPath = path.join(repoRoot, 'src', 'content', 'publications-cache.json');

const ORCID_ID = process.env.PUBLICATIONS_ORCID_ID ?? '';

const DOI_LIST = [
  '10.1126/sciadv.aea7983',
  '10.1038/s42003-023-04604-9',
  '10.1128/mbio.00676-21',
  '10.14348/molcells.2021.0027',
  '10.1038/s41564-018-0161-3',
  '10.7554/elife.32976',
  '10.1016/j.celrep.2017.03.040',
  '10.7554/elife.02671',
];

async function fetchCrossref(doi) {
  const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'my-website-2026/sync-publications (mailto:dailephd@gmail.com)' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.message ?? null;
  } catch {
    return null;
  }
}

async function fetchSemanticScholar(doi) {
  const url = `https://api.semanticscholar.org/graph/v1/paper/DOI:${encodeURIComponent(doi)}?fields=abstract`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchOrcidWorks(orcidId) {
  const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function main() {
  console.log('sync:publications starting...');
  const results = [];

  for (const doi of DOI_LIST) {
    process.stdout.write(`  Fetching DOI ${doi} ... `);
    const [crossref, s2] = await Promise.all([fetchCrossref(doi), fetchSemanticScholar(doi)]);

    const title = crossref?.title?.[0] ?? null;
    const year = crossref?.published?.['date-parts']?.[0]?.[0] ?? null;
    const journal = crossref?.['container-title']?.[0] ?? null;
    const abstract = s2?.abstract ?? null;
    const url = crossref?.URL ?? `https://doi.org/${doi}`;

    results.push({ doi, url, title, year, journal, abstract, crossref_fetched: !!crossref, s2_fetched: !!s2 });

    const status = crossref ? (abstract ? 'ok+abstract' : 'ok') : 'failed';
    console.log(status);
  }

  if (ORCID_ID) {
    process.stdout.write(`  Fetching ORCID works for ${ORCID_ID} ... `);
    const works = await fetchOrcidWorks(ORCID_ID);
    console.log(works ? `found ${works?.group?.length ?? 0} work groups` : 'failed');
  }

  writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nWritten to: ${outPath}`);
  console.log('Review the cache file and update src/content/publications.ts manually.');
  console.log('The cache file is not read by the website at build time.');

  const found = results.filter((r) => r.crossref_fetched).length;
  const withAbstract = results.filter((r) => r.abstract).length;
  console.log(`\nSummary: ${found}/${results.length} DOIs resolved, ${withAbstract} abstracts found.`);
}

main().catch((err) => {
  console.error('sync:publications failed:', err);
  process.exit(1);
});
