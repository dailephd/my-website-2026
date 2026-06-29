import type { HomepageContent } from '@/types/home';

export const homepageContent: HomepageContent = {
  hero: {
    eyebrow: 'Independent product lab',
    heading: 'Software, science, and applied AI—built into useful products.',
    summary:
      'Dai Le is a software developer, AI builder, PhD-trained scientist, and product-focused builder.',
  },
  featuredWork: {
    eyebrow: 'Selected work',
    heading: 'Systems built for real technical work',
    summary:
      'A focused selection of developer tooling, scientific software, and applied AI projects.',
  },
  productLab: {
    eyebrow: 'Product lab',
    heading: 'From codebase intelligence to validated workflows',
    summary:
      'The lab turns recurring engineering and research problems into focused tools and product experiments.',
  },
  roadmaps: {
    eyebrow: 'Direction',
    heading: 'Building in public, with the next steps visible',
    summary:
      'A compact view of shipped work, current focus, and planned development from the structured ecosystem roadmap.',
  },
  technicalFocus: {
    eyebrow: 'Capabilities',
    heading: 'Technical focus',
    summary:
      'Practical engineering across product development, AI systems, and research software.',
    items: [
      {
        id: 'developer-tooling',
        title: 'Developer tooling',
        summary: 'Codebase intelligence and workflows that reduce friction in software delivery.',
      },
      {
        id: 'ai-workflows',
        title: 'AI-assisted workflows',
        summary: 'Applied AI systems with explicit context, orchestration, and validation boundaries.',
      },
      {
        id: 'scientific-software',
        title: 'Scientific software',
        summary: 'Reliable tools that translate research methods into usable software.',
      },
      {
        id: 'data-ml',
        title: 'Data and ML systems',
        summary: 'Reproducible data workflows and machine-learning foundations for technical teams.',
      },
      {
        id: 'research-product',
        title: 'Research-to-product translation',
        summary: 'Turning technical evidence and domain expertise into focused product decisions.',
      },
    ],
  },
  credibility: {
    eyebrow: 'Research foundation',
    heading: 'Scientific rigor behind the software',
    summary:
      'PhD training and hands-on research experience inform a careful approach to evidence, reproducibility, and building software for complex technical domains.',
  },
  contact: {
    eyebrow: 'Next step',
    heading: 'Explore the work—or start a conversation',
    summary:
      'Review selected projects, inspect the product lab, or use the contact route to discuss engineering, AI, and scientific software.',
  },
};
