import ProductGrid from '@/components/products/ProductGrid';
import ProjectGrid from '@/components/projects/ProjectGrid';
import SectionHeader from '@/components/ui/SectionHeader';
import JsonLd from '@/components/seo/JsonLd';
import { getArchivedProjects, getProductIndexViewModel } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';
import { buildCollectionPageJsonLd } from '@/lib/seo/structured-data';

export const metadata = buildPageMetadata(routeMetadata.projects);

export default function ProjectsPage() {
  const index = getProductIndexViewModel();
  const archivedProjects = getArchivedProjects();

  return (
    <div className="space-y-12 py-12 sm:py-16">
      <JsonLd data={buildCollectionPageJsonLd(routeMetadata.projects)} />
      <section aria-labelledby="projects-heading">
        <SectionHeader
          description="Selected developer tools, scientific software, and applied AI projects from dailephd LLC."
          headingId="projects-heading"
          level={1}
          title="Technical projects"
        />
      </section>
      <ProductGrid index={index} />
      {archivedProjects.length ? (
        <section aria-labelledby="archived-projects-heading">
          <SectionHeader
            description="Completed or older projects kept as examples of previous technical work."
            headingId="archived-projects-heading"
            title="Archived projects"
          />
          <ProjectGrid projects={archivedProjects} quiet showTags={false} />
        </section>
      ) : null}
    </div>
  );
}
