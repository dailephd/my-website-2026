import { routes } from '@/lib/routes';
import type { HomepageContent } from '@/types/home';

export const homepageContent: HomepageContent = {
  hero: {
    eyebrow: 'Software, data, and AI',
    heading: 'Custom computing services and technical projects.',
    summary:
      'dailephd LLC delivers software, data, and AI projects. Founded and operated by Dai Le, software developer and biological scientist.',
  },
  featuredWork: {
    eyebrow: 'Selected work',
    heading: 'Systems built for real technical work',
    summary:
      'A focused selection of developer tooling, scientific software, and applied AI projects.',
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
  background: {
    eyebrow: 'Background',
    heading: 'Background and expertise',
    summary: 'A short look at the research and story behind the business.',
    cards: [
      {
        id: 'biological-sciences',
        title: 'Biological Sciences',
        subtitle: 'Research background',
        body: 'Peer-reviewed work in developmental biology, microbiology, and quantitative biological modeling.',
        supportingText:
          'A research foundation for building software and data systems grounded in real scientific problems.',
        cta: { label: 'View publications', href: routes.publications },
      },
      {
        id: 'about-dai-le',
        title: 'About Dai Le',
        subtitle: 'Software, AI, and biological sciences',
        body: 'Dai Le brings together software development, AI model evaluation, data science, and biological research experience.',
        supportingText:
          'A technical background shaped by research, implementation, and practical problem-solving across computing and science.',
        cta: { label: 'Read bio', href: routes.about },
      },
    ],
  },
};
