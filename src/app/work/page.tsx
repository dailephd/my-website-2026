import ProjectGrid from '@/components/projects/ProjectGrid';
import GalleryPreviewSection from '@/components/sections/GalleryPreviewSection';
import SectionHeader from '@/components/ui/SectionHeader';
import JsonLd from '@/components/seo/JsonLd';
import { getAllProjects, getFeaturedProjects, getMediaCardViewModels } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';
import { buildCollectionPageJsonLd } from '@/lib/seo/structured-data';

export const metadata = buildPageMetadata(routeMetadata.work);

export default function WorkPage() {
  const projects = getAllProjects();
  const featuredProjects = getFeaturedProjects();
  const standardProjects = projects.filter((project) => !project.featured);
  const gallery = getMediaCardViewModels('work');

  return (
    <div className="space-y-16 py-10 sm:py-16 lg:space-y-20">
      <JsonLd data={buildCollectionPageJsonLd(routeMetadata.work)} />
      <section aria-labelledby="work-heading">
        <SectionHeader
          description="A curated set of developer tools, scientific software, and applied AI systems. Status labels reflect current maturity without overstating readiness."
          headingId="work-heading"
          level={1}
          title="Selected work"
        />
      </section>

      <section aria-labelledby="featured-projects-heading">
        <h2
          className="mb-6 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]"
          id="featured-projects-heading"
        >
          Featured projects
        </h2>
        <ProjectGrid featured projects={featuredProjects} />
      </section>

      <section aria-labelledby="more-projects-heading">
        <h2
          className="mb-6 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]"
          id="more-projects-heading"
        >
          More selected work
        </h2>
        <ProjectGrid projects={standardProjects} />
      </section>

      <GalleryPreviewSection gallery={gallery} />
    </div>
  );
}
