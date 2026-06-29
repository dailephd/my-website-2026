# CI/CD

## Purpose

This document defines the local development, CI, Docker preview, and deployment workflow for `my-website-2026`.

## Delivery model

- Source repository: GitHub
- CI system: GitHub Actions
- Preview and production hosting: Vercel
- Optional local production preview: Docker Compose
- Repository type: single Next.js website repository
- Documentation folder: `docs/`

## Project assumptions

- The repo is one Next.js website.
- The repo is not a monorepo.
- The repo does not contain `apps/web`, `apps/nlp-service`, `packages/contracts`, Postgres, Prisma, Python services, or a separate npm content package.
- Website-owned content lives under `src/content`.
- Vercel is the deployment target.

## Branch model

### `main`

- `main` is the stable deployable branch.
- Vercel production deployment should come from `main`.
- `main` should remain buildable at all times.

### Feature branches

- Use feature branches for milestone or scoped implementation work.
- Pull requests are the merge boundary.

Examples:

- `feature/m1-content-powered-shell`
- `feature/m2-dual-mode-theme`
- `feature/m5-roadmap-renderer`

## Core scripts

Primary commands:

- `npm install`
- `npm run install:all`
- `npm run dev:check`
- `npm run dev`
- `npm run dev:web`
- `npm run docker:ready`
- `npm run dev:docker`
- `npm run dev:docker:down`
- `npm run typecheck`
- `npm run lint`
- `npm run validate:content`
- `npm run validate:links`
- `npm run test`
- `npm run test:e2e`
- `npm run build`
- `npm run ci`
- `npm run check:release`

## Environments

### Local development

Purpose:

- fast iteration during feature work
- validation before opening a pull request

Typical workflow:

1. `npm install`
2. `npm run dev`
3. `npm run typecheck`
4. `npm run lint`
5. `npm run validate:content`
6. `npm run validate:links`
7. `npm run test`
8. `npm run build`

Windows helpers:

- `scripts/Check-DevEnv.ps1`
- `scripts/Start-Dev.ps1`
- `scripts/Start-DockerDesktop.ps1`

### Local Docker production preview

Purpose:

- run a production-style container locally
- verify Docker-based preview behavior before publishing

Commands:

- `npm run docker:ready`
- `npm run dev:docker`
- `npm run dev:docker:down`

Service model:

- one Docker service named `web`
- no Postgres
- no Python service
- no multi-service orchestration

### GitHub pull request

Purpose:

- validate that a branch is safe to review and merge
- enforce repo-level quality gates

Checks:

- dependency install
- typecheck
- lint
- content validation
- link validation
- tests
- production build
- optional Docker image build

### Vercel preview

Purpose:

- render a live preview for feature branches and pull requests
- support design/content review in a deployed environment

Expected source:

- Vercel GitHub integration

Rule:

- preview deployments should be compatible with the same quality checks run in GitHub Actions

### Vercel production

Purpose:

- publish the production website

Expected source:

- `main` branch via Vercel GitHub integration

## Pipeline configuration

Primary files:

- `.github/workflows/ci.yml`
- `.github/workflows/vercel-preview-checks.yml`
- `Dockerfile`
- `docker-compose.yml`
- `vercel.json`

## GitHub Actions CI

### `ci.yml`

Runs on:

- push
- pull request

Jobs:

- `validate`
- optional lightweight `docker-build`

Validation job steps:

- checkout
- setup Node LTS
- install dependencies with `npm ci` when `package-lock.json` exists, otherwise `npm install`
- `npm run typecheck`
- `npm run lint`
- `npm run validate:content`
- `npm run validate:links`
- `npm run test`
- `npm run build`

Artifacts:

- upload `playwright-report` if present
- upload `test-results` if present

### `vercel-preview-checks.yml`

Purpose:

- enforce the same repo quality checks on pull requests before or alongside Vercel preview review

Behavior:

- installs dependencies
- runs `npm run ci`
- does not require secrets
- does not perform custom Vercel deployment from GitHub Actions

## Vercel deployment model

This repo is expected to use standard Vercel GitHub integration:

- pull requests and feature branches receive preview deployments when Vercel is configured
- `main` produces the production deployment

The repo does not require a custom GitHub Actions deploy workflow unless deployment policy changes later.

## Verification gates

Required gates:

- `npm run typecheck`
- `npm run lint`
- `npm run validate:content`
- `npm run validate:links`
- `npm run test`
- `npm run build`

Conditional gates:

- `npm run test:e2e` when E2E coverage is active for the changed flow

Release-quality rules:

- required docs exist under `docs/`
- no unresolved project template placeholders remain in required docs
- no obsolete multi-service references remain
- route files exist for all public routes
- roadmap source of truth remains `src/content/roadmaps.ts`
- main page backgrounds must not be pure white or pure black
- no critical build or runtime errors remain

## Docker policy

Purpose:

- local production-style preview only

Rules:

- one service: `web`
- expose `3000:3000`
- `NODE_ENV=production`
- no Postgres
- no Python
- no multi-service app topology

## Rollback

### Deployment rollback

- use Vercel rollback to restore a prior healthy deployment

### Source rollback

- use Git revert to roll back the source change set

## Release-readiness workflow

For a release candidate branch or pre-merge check:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run validate:content`
4. `npm run validate:links`
5. `npm run test`
6. `npm run build`
7. `npm run ci`
8. `npm run check:release`

Optional:

- `npm run dev:docker`

## Future extensions

Possible later additions:

- stronger route-level metadata validation
- structured-data validation
- Lighthouse audit automation
- E2E preview smoke tests
- image or visual regression checks

These should remain consistent with the single-site architecture.
