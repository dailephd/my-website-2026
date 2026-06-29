export type ContactChannelKind =
  | 'email'
  | 'github'
  | 'linkedin'
  | 'website'
  | 'resume'
  | 'product'
  | 'work'
  | 'other';

export interface ContactChannel {
  id: string;
  label: string;
  href: string;
  kind: ContactChannelKind;
  description: string;
  external: boolean;
  displayPriority: number;
  primary: boolean;
}

export interface ContactPanelViewModel {
  heading: string;
  summary: string;
  availabilityNote: string;
  channels: readonly ContactChannel[];
  primaryChannels: readonly ContactChannel[];
  hasDirectEmail: boolean;
}
