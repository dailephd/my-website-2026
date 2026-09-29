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

  it('contains four active ecosystem lanes with current and next phases', () => {
    expect(getMyDevKitRoadmap().lanes.map((lane) => lane.moduleSlug)).toEqual([
      'my-dev-kit', 'my-dev-kit-orchestrator', 'my-frontend-observer', 'my-dev-kit-lab',
    ]);
    expect(getMyDevKitRoadmap().updatedAt).toBe('2026-09-29');
    for (const lane of getMyDevKitRoadmap().lanes) {
      expect(lane.status).toBe('active');
      expect(lane.phases.map((phase) => phase.status)).toEqual(['shipped', 'planned']);
      expect(lane.phases.map((phase) => phase.priority)).toEqual(['now', 'next']);
      expect(lane.phases[0].timeframe).toContain('Current');
      expect(lane.phases[1].timeframe).toContain('Next');
      expect(lane.phases.every((phase) => phase.milestones.length === 2)).toBe(true);
    }
  });

  it('supports exactly the approved statuses', () => {
    expect(ROADMAP_STATUSES).toEqual(['shipped', 'active', 'planned', 'exploring', 'paused', 'deferred']);
    expect(() => validateRoadmaps([{ ...roadmaps[0], status: 'invalid' as never }])).toThrow('Invalid roadmap status');
  });

  it('derives shipped and planned preview items from the frozen phase data', () => {
    const preview = getRoadmapPreview('my-dev-kit');
    expect(preview?.recentlyShipped.length).toBeGreaterThan(0);
    expect(preview?.currentFocus).toEqual([]);
    expect(preview?.nextPlanned.length).toBeGreaterThan(0);
  });

  it('rejects duplicate nested ids and tolerates empty optional links', () => {
    const roadmap = roadmaps[0];
    const lane = roadmap.lanes[0];
    expect(() => validateRoadmaps([{ ...roadmap, lanes: [lane, { ...roadmap.lanes[1], id: lane.id }] }])).toThrow('Duplicate roadmap nested id');
    expect(lane.phases[0].milestones[0].links).toEqual([]);
  });
});
