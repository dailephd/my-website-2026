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
  });

  it('returns exactly the three ordered ecosystem modules', () => {
    expect(getProductFamilyModules('my-dev-kit').map((productModule) => productModule.id)).toEqual([
      'my-dev-kit',
      'my-dev-kit-orchestrator',
      'my-dev-kit-lab',
    ]);
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

  it('supports modules without optional links', () => {
    const modules = getProductFamilyModules('my-dev-kit');
    expect(modules.find((productModule) => productModule.id === 'my-dev-kit-lab')?.links).toEqual(
      [],
    );
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
    const cards = getProductCardViewModels();
    expect(cards.find(({ item }) => item.slug === 'my-dev-kit')?.roadmapPreview).toBeDefined();
    expect(cards.find(({ item }) => item.slug === 'biolit')?.roadmapPreview).toBeUndefined();
  });

  it('rejects duplicate index ids and slugs', () => {
    expect(() => validateProductIndex([productIndex[0], { ...productIndex[1], id: productIndex[0].id }])).toThrow('Duplicate product index id');
    expect(() => validateProductIndex([productIndex[0], { ...productIndex[1], slug: productIndex[0].slug }])).toThrow('Duplicate product index slug');
  });
});
