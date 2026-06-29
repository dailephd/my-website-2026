import { contactContent } from '@/content/contact';
import { routes } from '@/lib/routes';
import type { ContactChannel, ContactPanelViewModel } from '@/types/contact';
import { getLinks } from './get-links';

const channelDetails = {
  'view-work': {
    kind: 'work',
    description: 'Review selected engineering, AI, and scientific software projects.',
    primary: true,
  },
  'explore-products': {
    kind: 'product',
    description: 'Explore current product-lab systems and technical direction.',
    primary: true,
  },
  about: {
    kind: 'website',
    description: 'Read about Dai’s technical and scientific background.',
    primary: false,
  },
} as const;

export function getContactChannels(): ContactChannel[] {
  return getLinks()
    .filter((link) => link.id in channelDetails && link.href !== routes.contact)
    .map((link) => {
      const detail = channelDetails[link.id as keyof typeof channelDetails];
      return {
        id: link.id,
        label: link.label,
        href: link.href,
        kind: detail.kind,
        description: detail.description,
        external: link.external,
        displayPriority: link.displayPriority,
        primary: detail.primary,
      };
    })
    .sort((a, b) => a.displayPriority - b.displayPriority);
}

export function getPrimaryContactChannels(): ContactChannel[] {
  return getContactChannels().filter((channel) => channel.primary);
}

export function getContactPanel(): ContactPanelViewModel {
  const channels = getContactChannels();
  return {
    ...contactContent,
    channels,
    primaryChannels: channels.filter((channel) => channel.primary),
    hasDirectEmail: channels.some((channel) => channel.kind === 'email'),
  };
}
