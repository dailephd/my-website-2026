import { describe, expect, it } from 'vitest';
import { roadmaps } from '@/content/roadmaps';
import {
  getAllRoadmaps, getFeaturedRoadmaps, getMyDevKitRoadmap, getRoadmapByProductSlug,
  getRoadmapBySlug, getRoadmapPreview, ROADMAP_STATUSES, validateRoadmaps,
} from '@/lib/content';

describe('roadmap adapters', () => {
  it('returns deterministic featured roadmaps and required lookups', () => {
    expect(getAllRoadmaps().map((item) => item.id)).toEqual(getAllRoadmaps().map((item) => item.id));
    expect(getFeaturedRoadmaps().every((item) => item.featured)).toBe(true);
    expect(getRoadmapBySlug('my-dev-kit')?.id).toBe('my-dev-kit-ecosystem-roadmap');
    expect(getRoadmapByProductSlug('my-dev-kit')?.id).toBe('my-dev-kit-ecosystem-roadmap');
    expect(getMyDevKitRoadmap().title).toBe('my-dev-kit Ecosystem Roadmap');
  });

  it('contains the three ordered ecosystem lanes', () => {
    expect(getMyDevKitRoadmap().lanes.map((lane) => lane.moduleSlug)).toEqual([
      'my-dev-kit', 'my-dev-kit-orchestrator', 'my-dev-kit-lab',
    ]);
  });

  it('supports exactly the approved statuses', () => {
    expect(ROADMAP_STATUSES).toEqual(['shipped', 'active', 'planned', 'exploring', 'paused', 'deferred']);
    expect(() => validateRoadmaps([{ ...roadmaps[0], status: 'invalid' as never }])).toThrow('Invalid roadmap status');
  });

  it('derives shipped, active, and planned preview items', () => {
    const preview = getRoadmapPreview('my-dev-kit');
    expect(preview?.recentlyShipped.length).toBeGreaterThan(0);
    expect(preview?.currentFocus.length).toBeGreaterThan(0);
    expect(preview?.nextPlanned.length).toBeGreaterThan(0);
  });

  it('rejects duplicate nested ids and tolerates empty optional links', () => {
    const roadmap = roadmaps[0];
    const lane = roadmap.lanes[0];
    expect(() => validateRoadmaps([{ ...roadmap, lanes: [lane, { ...roadmap.lanes[1], id: lane.id }] }])).toThrow('Duplicate roadmap nested id');
    expect(lane.phases[0].milestones[0].links).toEqual([]);
  });
});
