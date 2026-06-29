import { roadmaps } from '@/content/roadmaps';
import type { Roadmap, RoadmapMilestone, RoadmapPreviewViewModel, RoadmapStatus } from '@/types/roadmap';

export const ROADMAP_STATUSES: readonly RoadmapStatus[] = ['shipped', 'active', 'planned', 'exploring', 'paused', 'deferred'];

function sorted<T extends { displayPriority: number }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.displayPriority - b.displayPriority);
}

export function validateRoadmaps(records: readonly Roadmap[]): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const nestedIds = new Set<string>();
  for (const roadmap of records) {
    if (!ROADMAP_STATUSES.includes(roadmap.status)) throw new Error(`Invalid roadmap status: ${roadmap.status}`);
    if (ids.has(roadmap.id)) throw new Error(`Duplicate roadmap id: ${roadmap.id}`);
    if (slugs.has(roadmap.slug)) throw new Error(`Duplicate roadmap slug: ${roadmap.slug}`);
    if (Number.isNaN(Date.parse(roadmap.updatedAt))) throw new Error(`Invalid roadmap updatedAt: ${roadmap.updatedAt}`);
    ids.add(roadmap.id); slugs.add(roadmap.slug);
    for (const lane of roadmap.lanes) {
      for (const item of [lane, ...lane.phases, ...lane.phases.flatMap((phase) => phase.milestones)]) {
        if (nestedIds.has(item.id)) throw new Error(`Duplicate roadmap nested id: ${item.id}`);
        nestedIds.add(item.id);
        if (!ROADMAP_STATUSES.includes(item.status)) throw new Error(`Invalid roadmap status: ${item.status}`);
      }
    }
  }
}

function normalized(roadmap: Roadmap): Roadmap {
  return {
    ...roadmap,
    lanes: sorted(roadmap.lanes).map((lane) => ({
      ...lane,
      phases: sorted(lane.phases).map((phase) => ({ ...phase, milestones: sorted(phase.milestones) })),
    })),
  };
}

export function getAllRoadmaps(): readonly Roadmap[] {
  validateRoadmaps(roadmaps);
  return [...roadmaps].sort((a, b) => Number(b.featured) - Number(a.featured) || a.displayPriority - b.displayPriority).map(normalized);
}
export function getFeaturedRoadmaps() { return getAllRoadmaps().filter((roadmap) => roadmap.featured); }
export function getRoadmapBySlug(slug: string) { return getAllRoadmaps().find((roadmap) => roadmap.slug === slug); }
export function getRoadmapByProductSlug(productSlug: string) { return getAllRoadmaps().find((roadmap) => roadmap.productSlug === productSlug); }
export function getMyDevKitRoadmap(): Roadmap {
  const roadmap = getRoadmapByProductSlug('my-dev-kit');
  if (!roadmap) throw new Error('Required roadmap is missing: my-dev-kit Ecosystem Roadmap');
  return roadmap;
}
export function getRoadmapPreview(slug: string): RoadmapPreviewViewModel | undefined {
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) return undefined;
  const milestones: RoadmapMilestone[] = roadmap.lanes.flatMap((lane) => lane.phases.flatMap((phase) => phase.milestones));
  return {
    roadmap,
    recentlyShipped: milestones.filter((item) => item.status === 'shipped').slice(0, 2),
    currentFocus: milestones.filter((item) => item.status === 'active').slice(0, 3),
    nextPlanned: milestones.filter((item) => item.status === 'planned').slice(0, 3),
  };
}
export const getRoadmaps = getAllRoadmaps;
