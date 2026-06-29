import { productIndex, products } from '@/content/products';
import { getRoadmapPreview } from './get-roadmaps';
import type { ProductCardViewModel, ProductFamily, ProductIndexItem, ProductIndexViewModel, ProductModule } from '@/types/product';

function compareFamilies(a: ProductFamily, b: ProductFamily) {
  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }
  return a.displayPriority - b.displayPriority || a.title.localeCompare(b.title);
}

function compareModules(a: ProductModule, b: ProductModule) {
  return a.displayPriority - b.displayPriority || a.title.localeCompare(b.title);
}

export function validateProductFamilies(records: readonly ProductFamily[]): void {
  const familyIds = new Set<string>();
  const familySlugs = new Set<string>();

  for (const family of records) {
    for (const [field, value] of [
      ['id', family.id],
      ['slug', family.slug],
      ['title', family.title],
      ['summary', family.summary],
      ['description', family.description],
      ['positioning', family.positioning],
    ] as const) {
      if (!value.trim()) {
        throw new Error(`Product family ${family.slug || '(unknown)'} is missing: ${field}`);
      }
    }

    if (familyIds.has(family.id)) throw new Error(`Duplicate product family id: ${family.id}`);
    if (familySlugs.has(family.slug)) {
      throw new Error(`Duplicate product family slug: ${family.slug}`);
    }
    familyIds.add(family.id);
    familySlugs.add(family.slug);

    const moduleIds = new Set<string>();
    const moduleSlugs = new Set<string>();
    for (const productModule of family.modules) {
      if (
        !productModule.id.trim() ||
        !productModule.slug.trim() ||
        !productModule.roleLabel.trim()
      ) {
        throw new Error(`Product family ${family.slug} contains an incomplete module.`);
      }
      if (moduleIds.has(productModule.id)) {
        throw new Error(`Duplicate product module id: ${productModule.id}`);
      }
      if (moduleSlugs.has(productModule.slug)) {
        throw new Error(`Duplicate product module slug: ${productModule.slug}`);
      }
      moduleIds.add(productModule.id);
      moduleSlugs.add(productModule.slug);
    }
  }
}

export function getAllProductFamilies(): readonly ProductFamily[] {
  validateProductFamilies(products);
  return [...products].sort(compareFamilies);
}

export function getFeaturedProductFamilies(): readonly ProductFamily[] {
  return getAllProductFamilies().filter((family) => family.featured);
}

export function getProductFamilyBySlug(slug: string): ProductFamily | undefined {
  return getAllProductFamilies().find((family) => family.slug === slug);
}

export function getMyDevKitEcosystem(): ProductFamily {
  const ecosystem = getProductFamilyBySlug('my-dev-kit');
  if (!ecosystem) {
    throw new Error('Required product family is missing: my-dev-kit Ecosystem');
  }
  return ecosystem;
}

export function getProductFamilyModules(slug: string): readonly ProductModule[] {
  const family = getProductFamilyBySlug(slug);
  return family ? [...family.modules].sort(compareModules) : [];
}

// Compatibility accessor for product-index placeholders owned by M6.
export const getProducts = getAllProductFamilies;

function compareIndexItems(a: ProductIndexItem, b: ProductIndexItem) {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return a.displayPriority - b.displayPriority || a.title.localeCompare(b.title);
}

export function validateProductIndex(records: readonly ProductIndexItem[]): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const item of records) {
    if (!item.id.trim() || !item.slug.trim() || !item.title.trim() || !item.summary.trim()) {
      throw new Error(`Incomplete product index item: ${item.slug || '(unknown)'}`);
    }
    if (ids.has(item.id)) throw new Error(`Duplicate product index id: ${item.id}`);
    if (slugs.has(item.slug)) throw new Error(`Duplicate product index slug: ${item.slug}`);
    ids.add(item.id); slugs.add(item.slug);
    if (item.roadmapSlug && !getRoadmapPreview(item.roadmapSlug)) {
      throw new Error(`Unknown roadmap slug for product ${item.slug}: ${item.roadmapSlug}`);
    }
  }
}

export function getProductIndex(): readonly ProductIndexItem[] {
  validateProductIndex(productIndex);
  return [...productIndex].sort(compareIndexItems);
}
export function getFeaturedProductIndexItems() { return getProductIndex().filter((item) => item.featured); }
export function getStandardProductIndexItems() { return getProductIndex().filter((item) => !item.featured); }
export function getProductIndexItemBySlug(slug: string) { return getProductIndex().find((item) => item.slug === slug); }
export function getProductCardViewModels(): readonly ProductCardViewModel[] {
  return getProductIndex().map((item) => ({
    item,
    ...(item.roadmapSlug ? { roadmapPreview: getRoadmapPreview(item.roadmapSlug) } : {}),
  }));
}
export function getProductIndexViewModel(): ProductIndexViewModel {
  const cards = getProductCardViewModels();
  return { featured: cards.filter(({ item }) => item.featured), standard: cards.filter(({ item }) => !item.featured) };
}
