import type { ProductFamily, ProductIndexItem } from '@/types/product';

export const products = [
  {
    id: 'my-dev-kit-ecosystem',
    slug: 'my-dev-kit',
    title: 'my-dev-kit Ecosystem',
    shortTitle: 'my-dev-kit',
    summary: 'A graph-guided development toolkit for coding-agent workflows.',
    description:
      'The ecosystem combines repository intelligence, workflow orchestration, and validation tooling into a repeatable development loop. my-dev-kit builds codebase context, my-dev-kit-orchestrator structures implementation workflows, and my-dev-kit-lab evaluates the tooling across realistic projects.',
    status: 'in-development',
    category: 'developer-tooling',
    positioning: 'Graph-guided development tooling for coding-agent workflows.',
    primaryAudience: [
      'Developers using AI-assisted coding workflows',
      'Technical project maintainers',
      'Teams evaluating repeatable coding-agent practices',
    ],
    featured: true,
    displayPriority: 10,
    workflowSummary:
      'Understand the repository, structure the implementation workflow, then validate the result and process.',
    statusNote:
      'The ecosystem is under active development. Module capabilities and interfaces continue to evolve.',
    roadmapPlanned: true,
    links: [
      {
        id: 'my-dev-kit-ecosystem-package',
        label: 'View my-dev-kit on npm',
        href: 'https://www.npmjs.com/package/@dailephd/my-dev-kit',
        kind: 'package',
        external: true,
      },
      {
        id: 'my-dev-kit-ecosystem-work',
        label: 'View selected work',
        href: '/work',
        kind: 'website',
        external: false,
      },
    ],
    modules: [
      {
        id: 'my-dev-kit',
        slug: 'my-dev-kit',
        title: 'my-dev-kit',
        packageName: '@dailephd/my-dev-kit',
        roleLabel: 'Codebase Intelligence',
        layerLabel: 'Repository understanding',
        summary: 'CLI-first project intelligence for LLM-assisted software development.',
        description:
          'Supports repository inspection, graph-guided retrieval, source and documentation indexing, and focused context preparation.',
        status: 'active',
        stage: 'foundation',
        stack: ['TypeScript', 'Node.js', 'CLI tooling', 'Code intelligence'],
        displayPriority: 10,
        links: [
          {
            id: 'my-dev-kit-module-package',
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
        repoName: 'my-dev-kit-orchestrator',
        roleLabel: 'Workflow Orchestration',
        layerLabel: 'Implementation workflow control',
        summary:
          'Orchestration for staged coding-agent workflows and disciplined implementation.',
        description:
          'Structures implementation stages, coordinates prompts and process boundaries, and keeps agent-assisted work aligned with an explicit plan.',
        status: 'in-development',
        stage: 'prototype',
        stack: ['TypeScript', 'Workflow orchestration', 'Coding agents'],
        displayPriority: 20,
        links: [],
      },
      {
        id: 'my-dev-kit-lab',
        slug: 'my-dev-kit-lab',
        title: 'my-dev-kit-lab',
        repoName: 'my-dev-kit-lab',
        roleLabel: 'Validation Lab',
        layerLabel: 'Evaluation and release checks',
        summary:
          'Evaluation and validation tooling for project-intelligence and coding-agent workflows.',
        description:
          'Tests workflow behavior across realistic projects and supports evaluation, reporting, release checks, and development-process validation.',
        status: 'experimental',
        stage: 'validation',
        stack: ['TypeScript', 'Evaluation tooling', 'Workflow validation'],
        displayPriority: 30,
        links: [],
      },
    ],
  },
] as const satisfies readonly ProductFamily[];

export const productIndex = [
  {
    id: 'product-index-my-dev-kit',
    slug: 'my-dev-kit',
    itemType: 'product-family',
    title: 'my-dev-kit Ecosystem',
    summary:
      'Repository intelligence, workflow orchestration, and validation tooling for coding-agent development.',
    positioning: 'A connected toolkit for building more disciplined AI-assisted software workflows.',
    status: 'in-development',
    category: 'developer-tooling',
    featured: true,
    displayPriority: 10,
    detailHref: '/products/my-dev-kit',
    roadmapSlug: 'my-dev-kit',
    links: [
      {
        id: 'product-index-my-dev-kit-package',
        label: 'npm package',
        href: 'https://www.npmjs.com/package/@dailephd/my-dev-kit',
        kind: 'package',
        external: true,
      },
    ],
  },
  {
    id: 'product-index-biolit',
    slug: 'biolit',
    itemType: 'standalone-product',
    title: 'BioLit',
    summary:
      'Scientific literature exploration software for organizing and reasoning over biomedical papers.',
    positioning: 'An experimental scientific-software workspace shaped by research workflows.',
    status: 'experimental',
    category: 'scientific-software',
    featured: false,
    displayPriority: 20,
    links: [
      {
        id: 'product-index-biolit-work',
        label: 'View selected work',
        href: '/work',
        kind: 'website',
        external: false,
      },
    ],
  },
  {
    id: 'product-index-website',
    slug: 'my-website-2026',
    itemType: 'standalone-product',
    title: 'Personal Website and Product Lab',
    summary:
      'A content-powered home for selected software, product direction, and technical work.',
    positioning: 'An in-development publishing surface for one technical founder and builder.',
    status: 'in-development',
    category: 'website-product-lab',
    featured: false,
    displayPriority: 30,
    links: [
      {
        id: 'product-index-website-work',
        label: 'View selected work',
        href: '/work',
        kind: 'website',
        external: false,
      },
    ],
  },
] as const satisfies readonly ProductIndexItem[];
