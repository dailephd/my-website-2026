import { contactContent, profileLinks } from '@/content/contact';

export type ProfileLink = (typeof profileLinks)[number];

export function getProfileLinks(): readonly ProfileLink[] {
  return profileLinks;
}

export function getContactIntro(): string {
  return contactContent.intro;
}

// Legacy adapter — kept for backward compatibility with existing tests.
// The contact page now uses ContactForm directly; this adapter is no longer
// used to build a channel list.
export function getContactChannels() {
  return [];
}

export function getPrimaryContactChannels() {
  return [];
}

export function getContactPanel() {
  return {
    heading: contactContent.heading,
    summary: contactContent.intro,
    availabilityNote: '',
    channels: [],
    primaryChannels: [],
    hasDirectEmail: true,
  };
}
