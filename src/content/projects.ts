import type { Project } from '@/types/project';

export const projects = [
  {
    id: 'my-dev-kit',
    slug: 'my-dev-kit',
    title: 'my-dev-kit',
    summary:
      'A CLI-first project intelligence toolkit for preparing repository context for LLM-assisted software development.',
    longSummary:
      'Indexes source and documentation, supports graph-guided retrieval, and helps developers inspect relevant code before implementation.',
    status: 'active',
    category: 'developer-tooling',
    role: 'Creator and developer',
    stack: ['TypeScript', 'Node.js', 'CLI tooling', 'Code intelligence'],
    featured: true,
    displayPriority: 10,
    links: [
      {
        id: 'my-dev-kit-package',
        label: 'npm package',
        href: 'https://www.npmjs.com/package/@dailephd/my-dev-kit',
        kind: 'package',
        external: true,
      },
    ],
  },
  {
    id: 'my-dev-kit-orchestrator',
    slug: 'my-dev-kit-orchestrator',
    title: 'my-dev-kit-orchestrator',
    summary:
      'An in-development orchestration tool for staged coding-agent workflows and disciplined implementation sequences.',
    status: 'in-development',
    category: 'developer-tooling',
    role: 'Creator and developer',
    stack: ['TypeScript', 'Workflow orchestration', 'Coding agents'],
    featured: true,
    displayPriority: 20,
    links: [],
  },
  {
    id: 'my-dev-kit-lab',
    slug: 'my-dev-kit-lab',
    title: 'my-dev-kit-lab',
    summary:
      'An experimental validation lab for evaluating project-intelligence and coding-agent workflows.',
    status: 'experimental',
    category: 'developer-tooling',
    role: 'Creator and developer',
    stack: ['TypeScript', 'Evaluation tooling', 'Workflow validation'],
    featured: true,
    displayPriority: 30,
    links: [],
  },
  {
    id: 'biolit',
    slug: 'biolit',
    title: 'BioLit',
    summary:
      'Scientific literature exploration software for searching, organizing, and reasoning over biomedical papers.',
    status: 'in-development',
    category: 'scientific-software',
    role: 'Creator and developer',
    stack: ['Next.js', 'TypeScript', 'Scientific software', 'Applied AI'],
    featured: false,
    displayPriority: 40,
    links: [],
  },
  {
    id: 'my-website-2026',
    slug: 'my-website-2026',
    title: 'my-website-2026',
    summary:
      'A personal website and product lab built around local structured content, accessible dual-mode theming, and milestone-driven delivery.',
    status: 'in-development',
    category: 'website-product-lab',
    role: 'Creator and developer',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    featured: false,
    displayPriority: 50,
    links: [],
  },
] as const satisfies readonly Project[];
