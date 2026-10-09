import Card from '@/components/ui/Card';
import LinkButton from '@/components/ui/LinkButton';
import SectionHeader from '@/components/ui/SectionHeader';
import type { HomepageContent } from '@/types/home';

export default function BackgroundSection({ content }: { content: HomepageContent['background'] }) {
  return (
    <section aria-labelledby="background-heading" className="section-shell">
      <SectionHeader description={content.summary} headingId="background-heading" title={content.heading} />
      <div className="grid gap-6 sm:grid-cols-2">
        {content.cards.map((card) => (
          <Card as="article" className="premium-card-interactive flex h-full flex-col" key={card.id}>
            <p className="text-sm font-medium text-[var(--color-accent-primary-text)]">{card.subtitle}</p>
            <h3 className="mt-2 text-xl font-semibold">{card.title}</h3>
            <p className="mt-3 text-[var(--color-text-secondary)]">{card.body}</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{card.supportingText}</p>
            <div className="mt-5">
              <LinkButton href={card.cta.href} label={card.cta.label} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
