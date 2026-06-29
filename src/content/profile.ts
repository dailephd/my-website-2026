import { primaryCta, secondaryCta } from '@/content/links';
import type { ProfileContent } from '@/types/content';

export const profile: ProfileContent = {
  id: 'profile',
  name: 'Dai Le',
  shortName: 'Dai',
  headline: 'Software developer, AI builder, and PhD-trained scientist.',
  subheadline: 'Building developer tools, scientific software, and applied AI workflows.',
  locationLabel: 'United States',
  primaryRoleLabels: ['Software developer', 'AI builder', 'PhD-trained scientist'],
  summary:
    'I build practical software at the intersection of developer experience, scientific computing, and applied AI.',
  productLabStatement:
    'A personal website and product lab for selected software, research, and AI systems.',
  primaryCta,
  secondaryCta,
  primaryLinks: [primaryCta, secondaryCta],
  technicalFocus: [
    {
      id: 'developer-tools',
      title: 'Developer tools',
      summary: 'Codebase intelligence and workflow tools that make technical work easier to inspect and validate.',
    },
    {
      id: 'applied-ai',
      title: 'Applied AI systems',
      summary: 'Practical AI workflows with explicit context, orchestration, and validation boundaries.',
    },
    {
      id: 'scientific-software',
      title: 'Scientific software',
      summary: 'Software that translates research methods and complex evidence into usable technical systems.',
    },
  ],
  researchFocus: [
    {
      id: 'research-practice',
      title: 'Research-informed engineering',
      summary:
        'PhD training and hands-on research experience inform an evidence-aware approach to reproducibility, technical uncertainty, and complex domains.',
      areas: ['Scientific computing', 'Reproducibility', 'Research workflows'],
    },
  ],
  education: [
    {
      id: 'doctoral-training',
      degree: 'PhD',
      field: 'Scientific research',
      summary:
        'Doctoral training supports the research discipline behind Dai’s software and applied AI work.',
    },
  ],
};
