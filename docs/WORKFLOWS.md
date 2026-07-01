# Workflows

## Purpose

This document describes the day-to-day and release workflows for `my-website-2026` as they
actually work today. For the local branch model, see `docs/BRANCHING.md`; for the pre-deployment
checklist, see `docs/RELEASE_READINESS.md`.

## Local development workflow

1. `npm install`
2. `npm run dev` (Windows env check + dev server) or `npm run dev:web` (dev server only)
3. Make changes under `src/`.
4. Run the fast checks relevant to the change (`npm run typecheck`, `npm run lint`) before a
   larger validation pass.
5. Before considering work done, run `npm run test:all` (typecheck + lint + validate:content +
   validate:links + test) or the full `npm run check:release` gate.

## Content update workflow

1. Identify the source-of-truth file for the domain being changed (see the table in
   `README.md` and `docs/DOMAIN_MODEL.md`).
2. Edit the typed record directly — never hardcode content in a page/component.
3. Run `npm run validate:content` to catch missing required fields, duplicate ids/slugs, or
   invalid enum values immediately.
4. Run `npm run validate:links` if any `href` changed.
5. Update or add a unit test under `tests/content/` if the change affects adapter behavior
   (sorting, filtering, view-model shape).
6. Run `npm run build` to confirm the change renders without runtime errors.

## Publication update workflow

1. Edit `src/content/publications.ts` directly for manual additions/corrections, **or**
2. Run `npm run sync:publications` (`scripts/sync-publications.mjs`) — requires
   `PUBLICATIONS_ORCID_ID` in the environment; fetches public works from ORCID. This is an
   **optional, explicit, opt-in** sync — it is not run automatically by any other command, and it
   makes an external network call.
3. After either path, run `npm run validate:content` and `npm run test` — publication tests
   (`tests/content/publications.test.ts`) check sort order, author-highlighting eligibility, and
   required-field coverage.
4. Never add an invented DOI, citation count, or abstract. If unverified, leave the field absent
   — `PublicationCard` degrades gracefully (see `docs/CONTRACT.md`).

## Contact email setup workflow

The contact form (`/contact` → `POST /api/contact` → Resend) requires environment configuration
before it can send real email:

1. Create a Resend account and verify a sending domain.
2. Set `RESEND_API_KEY` (server-only — never prefix with `NEXT_PUBLIC_`).
3. Set `CONTACT_FROM_EMAIL` to a verified address on that domain.
4. Optionally set `CONTACT_TO_EMAIL` (defaults to `dailephd@gmail.com`), `CONTACT_FROM_NAME`
   (defaults to `dailephd LLC`), and `CONTACT_SUBJECT_PREFIX`.
5. To run a **real** end-to-end email test locally: set `ALLOW_REAL_CONTACT_EMAIL_TEST=true` and
   run `npm run test:contact-email` (`scripts/send-contact-test.mjs`). This is opt-in only and
   must not run as part of `check:release`, CI, or any automated gate — it sends a real email
   through a paid provider.
6. Without a real send, `tests/content/send-contact-email.test.ts` and
   `tests/content/api-contact-route.test.ts` cover the validation, config-error, and
   provider-error paths with mocked calls — no network access required.

## Validation workflow

Run in this order for a fast-fail sequence (matches `npm run test:all` and the first part of
`check:release`):

```
npm run typecheck
npm run lint
npm run validate:content
npm run validate:links
npm run test
```

## Release-readiness workflow

```
npm run check:release
```

Runs required-path checks, forbidden-path checks, the conflicting-asset check, then the full
gate chain above plus `npm run build`. See `docs/RELEASE_READINESS.md` for the complete checklist
and what remains manual. This command **does not** deploy, commit, push, or publish anything.

## Post-readiness deployment workflow (future / manual only)

Deployment is **not** performed by any script in this repository. When explicitly instructed to
deploy:

1. Review the final `git diff` and `git status` on the branch.
2. Commit and push to GitHub (only when explicitly instructed).
3. Confirm Vercel project environment variables are set (`NEXT_PUBLIC_SITE_URL`,
   `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and any optional contact vars).
4. Let Vercel build a preview deployment from the GitHub integration; verify it manually against
   `docs/QA_CHECKLIST.md`.
5. Promote to production only after the preview passes manual QA.

This workflow is documented for completeness; no step in it is executed by local tooling or by
this documentation task.
