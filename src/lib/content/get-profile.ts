import { profile } from '@/content/profile';
import type { AboutProfileViewModel, ProfileContent } from '@/types/content';

const requiredTextFields: Array<keyof Pick<
  ProfileContent,
  'name' | 'shortName' | 'headline' | 'subheadline' | 'summary' | 'productLabStatement'
>> = ['name', 'shortName', 'headline', 'subheadline', 'summary', 'productLabStatement'];

export function getProfile(): ProfileContent {
  for (const field of requiredTextFields) {
    if (!profile[field].trim()) {
      throw new Error(`Profile content is missing required field: ${field}`);
    }
  }

  if (profile.primaryRoleLabels.length === 0) {
    throw new Error('Profile content requires at least one primary role label.');
  }

  return profile;
}

export function getAboutProfile(): AboutProfileViewModel {
  const content = getProfile();
  return {
    profile: content,
    technicalFocus: [...content.technicalFocus],
    researchFocus: [...content.researchFocus],
    education: [...content.education],
  };
}
