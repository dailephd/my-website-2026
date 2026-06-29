import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import type { HomepageContent } from '@/types/home';

export default function TechnicalFocusSection({ content }: { content: HomepageContent['technicalFocus'] }) {
  return (
    <section aria-labelledby="technical-focus-heading" className="section-shell">
      <SectionHeader description={content.summary} headingId="technical-focus-heading" title={content.heading} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => (
          <Card className="premium-card-interactive h-full" key={item.id}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.summary}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
