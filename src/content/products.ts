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
    roadmapPlanned: true,
    links: [],
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
            id: 'my-dev-kit-module-repository',
            label: 'GitHub',
            href: 'https://github.com/dailephd/my-dev-kit',
            kind: 'repository',
            external: true,
          },
          {
            id: 'my-dev-kit-module-package',
            label: 'npm',
            href: 'https://www.npmjs.com/package/@dailephd/my-dev-kit',
            kind: 'package',
            external: true,
          },
        ],
        versionRoadmap: [
          {
            version: '1.0.0',
            description:
              'The first stable CLI release establishes core commands for indexing, searching, and retrieving source context from TypeScript, JavaScript, and Python codebases.',
          },
          {
            version: '1.0.x',
            description:
              'These releases focus on stability, documentation quality, and safer retrieval workflows for large-scale repositories without changing the core artifact model.',
          },
          {
            version: '1.1.0',
            description:
              'This version introduces a semantic integration layer with automated analyzers, a manifest-based artifact registry, and initial support for data-model extraction and inspection.',
          },
          {
            version: '1.2.0',
            description:
              'This release adds specialized indexing for React components and frontend tests, along with exact string retrieval and new frontend-specific graph visualizations.',
          },
          {
            version: '1.3.0',
            description:
              'This version implements route-aware, browser-storage-aware, and UI-reachability retrieval to provide static evidence of frontend relationships and dependencies.',
          },
          {
            version: '1.4.0',
            description:
              'This update focuses on reducing full-file reads by introducing source continuation and bounded local dependency expansion for symbols and components.',
          },
          {
            version: '1.5.0',
            description:
              'This version establishes a classification system for symbols and layers to help developers identify the roles of files and avoid editing the wrong parts of the project.',
          },
          {
            version: '1.6.0',
            description:
              'This release introduces an orchestration layer that packages retrieval results into compact, task-specific context capsules and audit records for more efficient workflows.',
          },
          {
            version: '1.7.0',
            description:
              'This update implements retrieval-quality regression benchmarks and assertions to validate the accuracy and efficiency of the orchestration layer and planner packets.',
          },
          {
            version: '1.8.0',
            description:
              'This version enhances scalability and ergonomics by adding incremental indexing, a watch mode for source changes, and graph comparison tools.',
          },
          {
            version: '1.9.0',
            description:
              'This release expands the toolkit\'s reach by improving existing language support and planning for additional frameworks and programming languages.',
          },
          {
            version: '2.0.0',
            description:
              'This major update transitions the project into an extensible retrieval platform with a new artifact schema and a comprehensive plugin architecture.',
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
        links: [
          {
            id: 'my-dev-kit-orchestrator-module-repository',
            label: 'GitHub',
            href: 'https://github.com/dailephd/my-dev-kit-orchestrator',
            kind: 'repository',
            external: true,
          },
          {
            id: 'my-dev-kit-orchestrator-module-package',
            label: 'npm',
            href: 'https://www.npmjs.com/package/@dailephd/my-dev-kit-orchestrator',
            kind: 'package',
            external: true,
          },
        ],
        versionRoadmap: [
          {
            version: 'v0.1.0',
            description:
              'Establish the first usable CLI workflow shell with init, start, prompt, status, and list commands, local run folders, supported modes, text artifacts, and stage-specific prompts for design-first coding-agent workflows.',
          },
          {
            version: 'v0.2.0',
            description:
              'Stabilize the run and artifact lifecycle so workflow state, stage progression, artifact handoff, and prompt continuation become dependable across normal usage.',
          },
          {
            version: 'v0.3.0',
            description:
              'Harden the published CLI package and workflow discipline so users can rely on npm execution, repeatable command behavior, smoke testing, and release-safe package structure.',
          },
          {
            version: 'v0.4.0',
            description:
              'Add deterministic artifact content checks and prompt-quality checks so workflow artifacts and generated prompts can be inspected for missing sections, weak content, stale assumptions, and readiness problems.',
          },
          {
            version: 'v0.5.0',
            description:
              'Add Design Trace and DesignMap support so requirements, context, behavior, invariants, pseudocode, tests, implementation, verification, and risks can be linked and checked through trace IDs.',
          },
          {
            version: 'v0.6.0',
            description:
              'Add judge correction routing and trace-aware workflow recovery so failed or incomplete judge results route the run back to the correct correction stage instead of leaving the user to guess what to fix next.',
          },
          {
            version: 'v1.0.0',
            description:
              'Stabilize the workflow contract with artifact quality gates, mode-aware check behavior, stage-gate validation, combined check coverage, portable run handoff export, and preserved v0.5/v0.6 compatibility.',
          },
        ],
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
        links: [
          {
            id: 'my-dev-kit-lab-module-repository',
            label: 'GitHub',
            href: 'https://github.com/dailephd/my-dev-kit-lab',
            kind: 'repository',
            external: true,
          },
          {
            id: 'my-dev-kit-lab-module-package',
            label: 'npm',
            href: 'https://www.npmjs.com/package/@dailephd/my-dev-kit-lab',
            kind: 'package',
            external: true,
          },
        ],
        versionRoadmap: [
          {
            version: 'v0.1.0',
            description:
              'Establish the baseline raw-full-file versus my-dev-kit-guided experiment pipeline with benchmark projects, fake and real agent adapters, deterministic scoring, reports, plots, screenshots, and gallery outputs.',
          },
          {
            version: 'v0.1.1',
            description:
              'Clean up public release hygiene, documentation, changelog, funding links, ignored artifacts, and release-facing metadata without changing the core architecture.',
          },
          {
            version: 'v0.1.2',
            description:
              'Handle dependency and security maintenance separately from feature work while preserving existing experiment behavior.',
          },
          {
            version: 'v0.1.3',
            description:
              'Harden Codex and Claude real-agent campaign behavior with better structured outputs, smaller presets, timeout handling, partial-result reporting, and clearer limitations.',
          },
          {
            version: 'v0.1.4',
            description:
              'Polish report and gallery UX with clearer artifact links, navigation, summary cards, metric notes, collapsible sections, and compatibility-preserving output improvements.',
          },
          {
            version: 'v0.2.0',
            description:
              'Refactor my-dev-kit-lab into a generic experiment-plugin framework with context-strategy-comparison as the first plugin, target-aware experiment execution, and plugin-aware reports.',
          },
          {
            version: 'v0.2.1',
            description:
              'Fortify automated security validation by extending security:validate with attack-scenario profiles, stronger adversarial checks, structured exploit evidence, and multi-option flags while remaining backward compatible.',
          },
          {
            version: 'v0.3.0',
            description:
              'Add the generic audit framework and the first audit detector family for code rot, focused on evidence-backed detection of stale references, docs/code mismatch, test rot, architecture drift, package drift, and workflow drift.',
          },
          {
            version: 'v0.3.1',
            description:
              'Add the code quality detector family to the audit framework for maintainability risks such as large files, complex functions, duplication, weak test coverage, poor module boundaries, and TypeScript/lint drift.',
          },
          {
            version: 'v0.3.2',
            description:
              'Integrate existing security validation into unified audit reports so audit output can include security findings while security:validate remains the focused automated security command.',
          },
          {
            version: 'v0.3.3',
            description:
              'Add the project-wide audit command behavior so npm run audit can combine code rot, quality, and security findings with profiles, issue deduplication, readiness verdicts, and stable JSON output.',
          },
          {
            version: 'v0.4.0',
            description:
              'Add a manual pentest framework beside automated security validation, generating human-usable plans, checklists, findings files, and reports for CLI, package, local-tool, and web-app profiles.',
          },
          {
            version: 'v0.4.1',
            description:
              'Add warm-index reuse experiment support to test the strongest my-dev-kit value case of indexing once and reusing the index across multiple related tasks.',
          },
          {
            version: 'v0.4.2',
            description:
              'Expand the warm-index benchmark suite with multiple localized, cross-module, broad-change, and negative-control tasks for medium and large projects.',
          },
          {
            version: 'v0.4.3',
            description:
              'Run warm-index real-agent campaigns with Codex and Claude while preserving structured partial outcomes and clear token and duration limitations.',
          },
          {
            version: 'v0.5.0',
            description:
              'Add index freshness and changed-file detection so the lab can identify whether a my-dev-kit index is fresh, stale, partially stale, or unknown after code changes.',
          },
          {
            version: 'v0.5.1',
            description:
              'Add affected-neighborhood experiment support to map changed files and symbols to graph neighborhoods and determine whether a future task overlaps stale context.',
          },
          {
            version: 'v0.5.2',
            description:
              'Add the incremental-change and staleness experiment plugin to compare stale index, refreshed index, and partial-refresh behavior after controlled code changes.',
          },
          {
            version: 'v0.5.3',
            description:
              'Add partial-refresh planning support so the lab can model full refresh, no refresh, changed-file refresh, and affected-neighborhood refresh treatments before my-dev-kit fully supports them.',
          },
          {
            version: 'v0.6.0',
            description:
              'Add the context-window scaling experiment plugin to measure when raw full-file context exceeds token budgets and whether my-dev-kit retrieval remains usable.',
          },
          {
            version: 'v0.6.1',
            description:
              'Add a deterministic synthetic large-repo benchmark generator for controlled scaling experiments across file counts, module depth, symbol count, imports, and task locality.',
          },
          {
            version: 'v0.6.2',
            description:
              'Add real-world and local repo experiment support with privacy-safe metadata, ignored-file handling, reproducibility metadata, and no target-source modification.',
          },
          {
            version: 'v0.7.0',
            description:
              'Add the retrieval precision and recall experiment plugin to evaluate whether my-dev-kit retrieves the expected files, symbols, and source slices without requiring real agents.',
          },
          {
            version: 'v0.7.1',
            description:
              'Add retrieval query strategy comparison across search, lookup, graph neighborhood, source, slice, data-model, model-view-lineage, and combined graph-guided workflows.',
          },
          {
            version: 'v0.7.2',
            description:
              'Add context-pack generation experiments to test compact task-specific context packs for coverage, size, source-slice relevance, and answer-key support.',
          },
          {
            version: 'v0.8.0',
            description:
              'Add the agent-success-rate experiment plugin to measure whether my-dev-kit-guided workflows improve real coding-agent outcomes by capturing diffs, running tests, and scoring task success.',
          },
          {
            version: 'v0.8.1',
            description:
              'Add edit-quality and blast-radius metrics to measure expected versus unexpected file edits, lines changed, regression risk, and whether changes stay focused.',
          },
          {
            version: 'v0.8.2',
            description:
              'Add multi-attempt repair experiments to separate single-shot benchmarking from repair-loop workflows with controlled feedback and cumulative outcome tracking.',
          },
          {
            version: 'v0.9.0',
            description:
              'Normalize provider and CLI telemetry across Codex, Claude, and future agents, including token reliability, duration sources, statuses, and non-comparable run warnings.',
          },
          {
            version: 'v0.9.1',
            description:
              'Add an agent campaign scheduler with queueing, resume mode, skip-completed behavior, one-case-at-a-time execution, timeout presets, and partial-result preservation.',
          },
          {
            version: 'v0.9.2',
            description:
              'Harden real-agent prompts with stricter schemas, shorter prompt modes, bounded tool-use guidance, max-command guidance, and per-agent prompt templates.',
          },
          {
            version: 'v1.0.0',
            description:
              'Release a stable experiment framework with multiple experiment plugins, stable artifact schemas, stable reports and gallery, deterministic fake demos, structured real-agent partial outcomes, and strong documentation.',
          },
          {
            version: 'v1.1.0',
            description:
              'Focus on incremental index and stale-context proof by strengthening changed-node detection, affected-neighborhood experiments, stale-index risk reporting, and reindex recommendations.',
          },
          {
            version: 'v1.2.0',
            description:
              'Focus on large-repo and external-repo scaling with external subject support, synthetic large repos, context-window campaigns, privacy-safe artifacts, and reproducibility metadata.',
          },
          {
            version: 'v1.3.0',
            description:
              'Focus on agent productivity and edit quality with stronger agent-success experiments, diff capture, test-pass scoring, blast-radius scoring, repair loops, and real-agent presets.',
          },
          {
            version: 'v1.4.0',
            description:
              'Turn experiment outputs into a publication and evidence portal with curated reports, public demo screenshots, release-linked evidence bundles, cross-experiment summaries, and responsible interpretation docs.',
          },
        ],
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
    detailHref: '/projects/my-dev-kit',
    roadmapSlug: 'my-dev-kit',
    links: [],
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
    links: [],
  },
] as const satisfies readonly ProductIndexItem[];
