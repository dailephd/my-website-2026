export interface ResumeLink {
  label: string;
  href: string;
  external: false;
}

export interface ResumeMetadata {
  id: string;
  label: string;
  href: string;
  fileType: 'PDF';
  description: string;
  available: boolean;
  updatedAt?: string;
}
