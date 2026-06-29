import type { Roadmap } from '@/types/roadmap';

export const roadmaps: readonly Roadmap[] = [
  {
    id: 'my-dev-kit-ecosystem-roadmap',
    slug: 'my-dev-kit',
    title: 'my-dev-kit Ecosystem Roadmap',
    shortTitle: 'Ecosystem roadmap',
    productSlug: 'my-dev-kit',
    summary:
      'A staged roadmap for building a reliable coding-agent development loop from repository understanding to workflow orchestration to validation.',
    status: 'active',
    updatedAt: '2026-06-28',
    featured: true,
    displayPriority: 10,
    lanes: [
      {
        id: 'roadmap-lane-my-dev-kit',
        title: 'my-dev-kit',
        roleLabel: 'Codebase Intelligence',
        summary: 'Repository inspection, graph-guided retrieval, indexing, and context preparation.',
        moduleSlug: 'my-dev-kit',
        status: 'active',
        displayPriority: 10,
        phases: [
          {
            id: 'mdk-foundation',
            title: 'Project intelligence foundation',
            status: 'shipped',
            timeframe: 'Foundation',
            priority: 'now',
            summary: 'Establish repeatable repository indexing and focused context packaging.',
            displayPriority: 10,
            milestones: [
              { id: 'mdk-indexing', title: 'Source and documentation indexing', status: 'shipped', summary: 'Index project source and documentation as retrievable local context.', links: [], displayPriority: 10 },
              { id: 'mdk-context-packaging', title: 'Focused context packaging', status: 'active', summary: 'Refine compact context outputs for implementation tasks.', links: [], displayPriority: 20 },
            ],
          },
          {
            id: 'mdk-retrieval',
            title: 'Graph-guided retrieval',
            status: 'active',
            timeframe: 'Current focus',
            priority: 'now',
            summary: 'Improve relationship-aware source discovery and broader repository coverage.',
            displayPriority: 20,
            milestones: [
              { id: 'mdk-graph-workflow', title: 'Graph-guided retrieval workflow', status: 'active', summary: 'Strengthen search, lookup, slice, and source retrieval as one workflow.', links: [], displayPriority: 10 },
              { id: 'mdk-language-support', title: 'Broader language support', status: 'exploring', summary: 'Evaluate additional language and project-shape support.', links: [], displayPriority: 20 },
            ],
          },
        ],
      },
      {
        id: 'roadmap-lane-orchestrator',
        title: 'my-dev-kit-orchestrator',
        roleLabel: 'Workflow Orchestration',
        summary: 'Staged workflows, implementation discipline, and prompt/process coordination.',
        moduleSlug: 'my-dev-kit-orchestrator',
        status: 'planned',
        displayPriority: 20,
        phases: [
          {
            id: 'orchestrator-discipline',
            title: 'Staged workflow discipline',
            status: 'active',
            timeframe: 'Current focus',
            priority: 'now',
            summary: 'Make multi-prompt implementation sequences explicit, bounded, and verifiable.',
            displayPriority: 10,
            milestones: [
              { id: 'orchestrator-stages', title: 'Contract-to-closure stages', status: 'active', summary: 'Standardize inspection, domain, UI, QA, and documentation stages.', links: [], displayPriority: 10 },
              { id: 'orchestrator-legacy-flow', title: 'Legacy workflow compatibility', status: 'paused', summary: 'Pause compatibility work that does not support the current workflow model.', links: [], displayPriority: 20 },
            ],
          },
          {
            id: 'orchestrator-gates',
            title: 'Verification gates',
            status: 'planned',
            timeframe: 'Next',
            priority: 'next',
            summary: 'Add stronger validation and judge gates between implementation stages.',
            displayPriority: 20,
            milestones: [
              { id: 'orchestrator-judge-gates', title: 'Verification and judge gates', status: 'planned', summary: 'Define deterministic completion criteria between stages.', links: [], displayPriority: 10 },
              { id: 'orchestrator-multi-agent', title: 'Multi-agent orchestration', status: 'deferred', summary: 'Defer broader multi-agent coordination until single-flow controls are stable.', links: [], displayPriority: 20 },
            ],
          },
        ],
      },
      {
        id: 'roadmap-lane-lab',
        title: 'my-dev-kit-lab',
        roleLabel: 'Validation Lab',
        summary: 'Evaluation fixtures, reporting, release checks, and workflow validation.',
        moduleSlug: 'my-dev-kit-lab',
        status: 'exploring',
        displayPriority: 30,
        phases: [
          {
            id: 'lab-fixtures',
            title: 'Deterministic evaluation fixtures',
            status: 'planned',
            timeframe: 'Next',
            priority: 'next',
            summary: 'Create repeatable scenarios for comparing workflow behavior across projects.',
            displayPriority: 10,
            milestones: [
              { id: 'lab-fixture-library', title: 'Evaluation fixture library', status: 'planned', summary: 'Build representative project fixtures and expected outcomes.', links: [], displayPriority: 10 },
              { id: 'lab-reporting', title: 'Structured validation reports', status: 'planned', summary: 'Produce readable reports for workflow and release checks.', links: [], displayPriority: 20 },
            ],
          },
          {
            id: 'lab-benchmarks',
            title: 'Workflow benchmarks',
            status: 'exploring',
            timeframe: 'Later',
            priority: 'later',
            summary: 'Explore benchmark suites for project-intelligence and coding-agent workflows.',
            displayPriority: 20,
            milestones: [
              { id: 'lab-benchmark-suite', title: 'Cross-project benchmark suite', status: 'exploring', summary: 'Investigate comparable measures across realistic repositories.', links: [], displayPriority: 10 },
            ],
          },
        ],
      },
    ],
  },
] as const;
