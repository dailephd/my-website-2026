import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { ContactChannel } from '@/types/contact';

const kindLabels: Record<ContactChannel['kind'], string> = {
  email: 'Email',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  website: 'Website',
  resume: 'Resume',
  product: 'Product',
  work: 'Work',
  other: 'Contact',
};

export default function ContactCard({ channel }: { channel: ContactChannel }) {
  if (!channel.href) return null;
  return (
    <Card as="article" className="premium-card-interactive flex h-full flex-col">
      <Badge>{kindLabels[channel.kind]}</Badge>
      <h2 className="mt-4 text-xl font-semibold">{channel.label}</h2>
      <p className="mt-2 flex-1 text-[var(--color-text-secondary)]">{channel.description}</p>
      <a
        className="mt-5 font-medium text-[var(--color-accent-cyan)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
        href={channel.href}
        rel={channel.external ? 'noreferrer' : undefined}
        target={channel.external ? '_blank' : undefined}
      >
        Continue to {channel.label}
      </a>
    </Card>
  );
}
