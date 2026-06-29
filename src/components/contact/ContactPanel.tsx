import Card from '@/components/ui/Card';
import type { ContactPanelViewModel } from '@/types/contact';
import ContactCard from './ContactCard';

export default function ContactPanel({ panel }: { panel: ContactPanelViewModel }) {
  return (
    <section aria-labelledby="contact-pathways-heading">
      <Card className="hero-backdrop rounded-[var(--radius-panel)] border-[var(--color-accent-violet)] p-7 sm:p-9">
        <h2 className="text-2xl font-semibold" id="contact-pathways-heading">{panel.heading}</h2>
        <p className="mt-3 max-w-3xl text-[var(--color-text-secondary)]">{panel.summary}</p>
        {!panel.hasDirectEmail ? (
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">{panel.availabilityNote}</p>
        ) : null}
      </Card>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {panel.channels.map((channel) => <ContactCard channel={channel} key={channel.id} />)}
      </div>
    </section>
  );
}
