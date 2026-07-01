import { projects } from '@/content/projects';
import type { FeaturedProject, Project, ProjectCategory } from '@/types/project';

function compareProjects(a: Project, b: Project) {
  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }

  return a.displayPriority - b.displayPriority || a.title.localeCompare(b.title);
}

export function validateProjects(records: readonly Project[]): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const project of records) {
    for (const [field, value] of [
      ['id', project.id],
      ['slug', project.slug],
      ['title', project.title],
      ['summary', project.summary],
      ['role', project.role],
    ] as const) {
      if (!value.trim()) {
        throw new Error(`Project ${project.slug || '(unknown)'} is missing required field: ${field}`);
      }
    }

    if (ids.has(project.id)) {
      throw new Error(`Duplicate project id: ${project.id}`);
    }
    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }

    ids.add(project.id);
    slugs.add(project.slug);
  }
}

export function getAllProjects(): readonly Project[] {
  validateProjects(projects);
  return [...projects].sort(compareProjects);
}

export function getFeaturedProjects(): readonly FeaturedProject[] {
  return getAllProjects().filter(
    (project): project is FeaturedProject => project.featured,
  );
}

export function getArchivedProjects(): readonly Project[] {
  return getAllProjects().filter((project) => project.status === 'archived');
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): readonly Project[] {
  return getAllProjects().filter((project) => project.category === category);
}

export function getProjectCards(): readonly Project[] {
  return getAllProjects();
}

// Compatibility accessor for pre-M3 imports.
export const getProjects = getAllProjects;
