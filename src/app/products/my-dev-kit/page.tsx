import EcosystemDiagram from '@/components/products/EcosystemDiagram';
import EcosystemModuleCard from '@/components/products/EcosystemModuleCard';
import ProductFamilyHero from '@/components/products/ProductFamilyHero';
import Card from '@/components/ui/Card';
import RoadmapShowcase from '@/components/roadmap/RoadmapShowcase';
import { getMyDevKitEcosystem, getMyDevKitRoadmap, getProductFamilyModules } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(routeMetadata.productMyDevKit);

export default function MyDevKitPage() {
  const ecosystem = getMyDevKitEcosystem();
  const modules = getProductFamilyModules(ecosystem.slug);
  const roadmap = getMyDevKitRoadmap();

  return (
    <div className="space-y-16 py-10 sm:py-16 lg:space-y-20">
      <ProductFamilyHero family={ecosystem} />
      <EcosystemDiagram modules={modules} />

      <section aria-labelledby="ecosystem-modules-heading">
        <h2 className="text-2xl font-semibold tracking-tight" id="ecosystem-modules-heading">
          Ecosystem modules
        </h2>
        <p className="mt-2 max-w-3xl text-[var(--color-text-secondary)]">
          Three focused layers contribute to one repeatable engineering workflow.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {modules.map((productModule) => (
            <EcosystemModuleCard key={productModule.id} productModule={productModule} />
          ))}
        </div>
      </section>

      <section aria-labelledby="ecosystem-workflow-heading">
        <Card>
          <h2 className="text-2xl font-semibold tracking-tight" id="ecosystem-workflow-heading">
            Workflow model
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">
            {ecosystem.workflowSummary}
          </p>
          <p className="mt-5 text-sm font-medium text-[var(--color-text-muted)]">
            {ecosystem.statusNote}
          </p>
        </Card>
      </section>
      <RoadmapShowcase roadmap={roadmap} />
    </div>
  );
}
