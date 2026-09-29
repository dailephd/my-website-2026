import { describe, expect, it } from 'vitest';

import { products } from '@/content/products';
import {
  getAllProductFamilies,
  getFeaturedProductFamilies,
  getMyDevKitEcosystem,
  getProductFamilyBySlug,
  getProductFamilyModules,
  validateProductFamilies,
  getProductIndex, getFeaturedProductIndexItems, getStandardProductIndexItems,
  getProductIndexItemBySlug, getProductCardViewModels, validateProductIndex,
} from '@/lib/content';
import { productIndex } from '@/content/products';

describe('product-family content adapters', () => {
  it('returns deterministic product-family ordering', () => {
    expect(getAllProductFamilies().map((family) => family.id)).toEqual(
      getAllProductFamilies().map((family) => family.id),
    );
  });

  it('returns only featured product families', () => {
    expect(getFeaturedProductFamilies().every((family) => family.featured)).toBe(true);
  });

  it('returns the required my-dev-kit Ecosystem', () => {
    expect(getProductFamilyBySlug('my-dev-kit')?.title).toBe('my-dev-kit Ecosystem');
    expect(getMyDevKitEcosystem().id).toBe('my-dev-kit-ecosystem');
    expect(getMyDevKitEcosystem().status).toBe('active');
    expect(getMyDevKitEcosystem().summary).toContain('browser/runtime evidence');
  });

  it('returns exactly the four ordered, active ecosystem modules', () => {
    expect(getProductFamilyModules('my-dev-kit').map((productModule) => productModule.id)).toEqual([
      'my-dev-kit',
      'my-dev-kit-orchestrator',
      'my-frontend-observer',
      'my-dev-kit-lab',
    ]);
    expect(getProductFamilyModules('my-dev-kit').every((productModule) => productModule.status === 'active')).toBe(true);
  });

  it('rejects duplicate family and module identifiers', () => {
    const family = products[0];

    expect(() => validateProductFamilies([family, { ...family }])).toThrow(
      `Duplicate product family id: ${family.id}`,
    );
    expect(() =>
      validateProductFamilies([
        {
          ...family,
          modules: [family.modules[0], { ...family.modules[1], slug: family.modules[0].slug }],
        },
      ]),
    ).toThrow(`Duplicate product module slug: ${family.modules[0].slug}`);
  });

  it('gives every ecosystem module a GitHub link, an npm link, and a version roadmap', () => {
    const modules = getProductFamilyModules('my-dev-kit');
    const expectedRepos: Record<string, string> = {
      'my-dev-kit': 'https://github.com/dailephd/my-dev-kit',
      'my-dev-kit-orchestrator': 'https://github.com/dailephd/my-dev-kit-orchestrator',
      'my-frontend-observer': 'https://github.com/dailephd/my-frontend-observer',
      'my-dev-kit-lab': 'https://github.com/dailephd/my-dev-kit-lab',
    };
    const expectedPackages: Record<string, string> = {
      'my-dev-kit': 'https://www.npmjs.com/package/@dailephd/my-dev-kit',
      'my-dev-kit-orchestrator': 'https://www.npmjs.com/package/@dailephd/my-dev-kit-orchestrator',
      'my-frontend-observer': 'https://www.npmjs.com/package/@dailephd/my-frontend-observer',
      'my-dev-kit-lab': 'https://www.npmjs.com/package/@dailephd/my-dev-kit-lab',
    };

    for (const productModule of modules) {
      const github = productModule.links.find((link) => link.kind === 'repository');
      const npm = productModule.links.find((link) => link.kind === 'package');

      expect(github?.href).toBe(expectedRepos[productModule.id]);
      expect(npm?.href).toBe(expectedPackages[productModule.id]);
      expect(productModule.versionRoadmap).toHaveLength(3);
    }
    const observer = modules.find((productModule) => productModule.id === 'my-frontend-observer');
    expect(observer).toMatchObject({ roleLabel: 'Runtime Evidence', packageName: '@dailephd/my-frontend-observer', repoName: 'my-frontend-observer' });
  });

  it('provides one ordered recent, current, and next release for each module', () => {
    const modules = getProductFamilyModules('my-dev-kit');
    const expected: Record<string, { recent: string; current: string; next: string }> = {
      'my-dev-kit': { recent: '1.12.4', current: '1.12.5', next: '1.13.0' },
      'my-dev-kit-orchestrator': { recent: '1.5.0', current: '1.6.0', next: '1.7.0' },
      'my-frontend-observer': { recent: '0.9.1', current: '0.10.0', next: '0.11.0' },
      'my-dev-kit-lab': { recent: '0.6.1', current: '0.6.2', next: '0.6.3' },
    };
    for (const productModule of modules) {
      expect(productModule.versionRoadmap.map(({ state }) => state)).toEqual(['recent', 'current', 'next']);
      expect(Object.fromEntries(productModule.versionRoadmap.map(({ state, version }) => [state, version]))).toEqual(expected[productModule.id]);
    }
    expect(() => validateProductFamilies([{ ...products[0], modules: [{ ...products[0].modules[0], versionRoadmap: products[0].modules[0].versionRoadmap.slice(0, 2) }] }])).toThrow('requires one ordered recent, current, and next release');
    expect(() => validateProductFamilies([{ ...products[0], modules: [{ ...products[0].modules[0], versionRoadmap: [products[0].modules[0].versionRoadmap[0], products[0].modules[0].versionRoadmap[1], { ...products[0].modules[0].versionRoadmap[2], state: 'current' }] }] }])).toThrow('requires one ordered recent, current, and next release');
  });
});

describe('product index adapters', () => {
  it('returns deterministic featured-first index items', () => {
    expect(getProductIndex().map((item) => item.id)).toEqual(getProductIndex().map((item) => item.id));
    expect(getProductIndex()[0].slug).toBe('my-dev-kit');
    expect(getFeaturedProductIndexItems().every((item) => item.featured)).toBe(true);
    expect(getStandardProductIndexItems().every((item) => !item.featured)).toBe(true);
  });

  it('resolves index lookup and roadmap preview relationships', () => {
    expect(getProductIndexItemBySlug('my-dev-kit')?.featured).toBe(true);
    expect(getProductIndexItemBySlug('my-dev-kit')).toMatchObject({ status: 'active', summary: expect.stringContaining('browser/runtime evidence'), positioning: expect.stringContaining('Four local-first tools') });
    expect(getProductIndex().filter((item) => item.slug === 'my-frontend-observer')).toHaveLength(0);
    const cards = getProductCardViewModels();
    expect(cards.find(({ item }) => item.slug === 'my-dev-kit')?.roadmapPreview).toBeDefined();
    expect(cards.find(({ item }) => item.slug === 'biolit')?.roadmapPreview).toBeUndefined();
  });

  it('lists Le Crawler after BioLit as an unlinked, non-featured standalone product', () => {
    expect(getStandardProductIndexItems().map((item) => item.slug)).toEqual(['biolit', 'le-crawler', 'iworkhere-space']);
    const crawler = getProductIndexItemBySlug('le-crawler');
    expect(crawler).toMatchObject({
      id: 'product-index-le-crawler',
      itemType: 'standalone-product',
      status: 'in-development',
      category: 'developer-tooling',
      featured: false,
      displayPriority: 30,
      links: [],
    });
    expect(crawler).not.toHaveProperty('detailHref');
    expect(crawler).not.toHaveProperty('roadmapSlug');
    expect(getFeaturedProductIndexItems().some((item) => item.slug === 'le-crawler')).toBe(false);
    expect(getProductCardViewModels().find(({ item }) => item.slug === 'le-crawler')?.roadmapPreview).toBeUndefined();
  });

  it('lists iworkhere.space as an unlinked standard product after Le Crawler', () => {
    const item = getProductIndexItemBySlug('iworkhere-space');
    expect(item).toMatchObject({
      id: 'product-index-iworkhere-space',
      title: 'iworkhere.space',
      itemType: 'standalone-product',
      status: 'in-development',
      category: 'developer-tooling',
      featured: false,
      displayPriority: 40,
      links: [],
    });
    expect(item).not.toHaveProperty('detailHref');
    expect(item).not.toHaveProperty('roadmapSlug');
    expect(getFeaturedProductIndexItems().some(({ slug }) => slug === 'iworkhere-space')).toBe(false);
    expect(getProductCardViewModels().find(({ item }) => item.slug === 'iworkhere-space')?.roadmapPreview).toBeUndefined();
  });

  it('rejects duplicate index ids and slugs', () => {
    expect(() => validateProductIndex([productIndex[0], { ...productIndex[1], id: productIndex[0].id }])).toThrow('Duplicate product index id');
    expect(() => validateProductIndex([productIndex[0], { ...productIndex[1], slug: productIndex[0].slug }])).toThrow('Duplicate product index slug');
  });
});
