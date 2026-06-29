import { resume } from '@/content/resume';
import type { ResumeLink, ResumeMetadata } from '@/types/resume';

export function getResumeMetadata(): ResumeMetadata {
  return { ...resume };
}

export function getResumeLink(): ResumeLink | undefined {
  if (!resume.available) return undefined;
  return { label: resume.label, href: resume.href, external: false };
}
