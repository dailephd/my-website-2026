import { describe, expect, it } from 'vitest';

import { projects } from '@/content/projects';
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsByCategory,
  validateProjects,
} from '@/lib/content';

describe('project content adapters', () => {
  it('returns deterministic featured-first project ordering', () => {
    const firstRead = getAllProjects();
    const secondRead = getAllProjects();

    expect(firstRead.map((project) => project.id)).toEqual(
      secondRead.map((project) => project.id),
    );
    expect(firstRead.slice(0, 3).every((project) => project.featured)).toBe(true);
    expect(firstRead.map((project) => project.displayPriority)).toEqual([10, 20, 30, 40, 50]);
  });

  it('returns only featured projects', () => {
    const featured = getFeaturedProjects();

    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((project) => project.featured)).toBe(true);
  });

  it('looks up projects by slug and category', () => {
    expect(getProjectBySlug('my-dev-kit')?.title).toBe('my-dev-kit');
    expect(getProjectBySlug('missing-project')).toBeUndefined();
    expect(
      getProjectsByCategory('scientific-software').map((project) => project.slug),
    ).toEqual(['biolit']);
  });

  it('rejects duplicate ids and duplicate slugs', () => {
    const base = projects[0];

    expect(() =>
      validateProjects([base, { ...projects[1], id: base.id }]),
    ).toThrow(`Duplicate project id: ${base.id}`);
    expect(() =>
      validateProjects([base, { ...projects[1], slug: base.slug }]),
    ).toThrow(`Duplicate project slug: ${base.slug}`);
  });

  it('supports projects without optional links', () => {
    const project = getProjectBySlug('my-dev-kit-orchestrator');

    expect(project).toBeDefined();
    expect(project?.links).toEqual([]);
  });
});
