import { getLinks, getProfile } from '@/lib/content';

export function validateContent() {
  const issues: string[] = [];

  try {
    getProfile();
  } catch (error) {
    issues.push(error instanceof Error ? error.message : 'Profile validation failed.');
  }

  for (const link of getLinks()) {
    if (!link.id.trim() || !link.label.trim() || !link.href.trim()) {
      issues.push(`Link ${link.id || '(missing id)'} requires an id, label, and href.`);
    }
  }

  return { valid: issues.length === 0, issues };
}
