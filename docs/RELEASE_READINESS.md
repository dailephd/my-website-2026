# Release Readiness

This is the pre-deployment checklist for `my-website-2026`. It separates what is checked
**automatically** by `npm run check:release` from what must be checked **manually** before any
deployment, push, or publish step (none of which this checklist performs).

## Local quality gate

```
npm run check:release
```

Runs, in order, and stops at the first failure:

1. Required release paths exist (docs, key routes, `robots.ts`, `sitemap.ts`, `.env.example`,
   `README.md`).
2. No forbidden multi-service paths (`apps/`, `packages/contracts`, `apps/web`,
   `apps/nlp-service`).
3. No conflicting `public/robots.txt`.
4. `npm run typecheck`
5. `npm run lint`
6. `npm run validate:content`
7. `npm run validate:links`
8. `npm run test`
9. `npm run build`

Equivalent exact commands, runnable individually:

```
npm run typecheck
npm run lint
npm run validate:content
npm run validate:links
npm run test
npm run build
```

## Environment variable checklist

| Variable | Required for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Correct canonical URLs, Open Graph, sitemap, robots in production |
| `NEXT_PUBLIC_NOINDEX` | Only set `true` on preview/staging to block indexing |
| `RESEND_API_KEY` | Contact form email delivery |
| `CONTACT_FROM_EMAIL` | Contact form email delivery (must be a Resend-verified sender) |
| `CONTACT_TO_EMAIL` | Optional override of the destination inbox |
| `CONTACT_FROM_NAME`, `CONTACT_SUBJECT_PREFIX` | Optional email presentation |
| `PUBLICATIONS_ORCID_ID` | Optional, only for `npm run sync:publications` |

`check:release` does not verify these are set — it validates code and content shape, not runtime
secrets. Verify env vars are configured in Vercel before deploying.

## Route checklist

- [ ] `/`, `/projects`, `/projects/my-dev-kit`, `/publications`, `/about`, `/contact` all build
      and render.
- [ ] `/work` redirects (301) to `/projects` — confirm no page exists at `src/app/work/`.
- [ ] No `/products`, `/products/my-dev-kit`, or `/writing` routes exist or are linked from
      navigation.
- [ ] No internal link points at a removed route.

## Content checklist

- [ ] `npm run validate:content` passes.
- [ ] No placeholder/fake project, publication, or profile content.
- [ ] Archived projects render without technology-stack tag pills; active project/product cards
      are unaffected.
- [ ] my-dev-kit relationship diagram shows all three modules, each with a GitHub link, an npm
      link, and a working Roadmap toggle.

## Asset checklist

- [ ] Favicon/icon set present under `public/icons/` and wired into `metadata.icons` in
      `src/app/layout.tsx` (light/dark SVG + 16/32/48/180/192/512 PNGs).
- [ ] Open Graph images exist for every route with an `ogImagePath` under `public/images/og/`.
- [ ] `npm run validate:links` passes (checks referenced local assets exist).

**Known gap (nonblocking, not a broken link):** `routeMetadata` requests
`projects-og.png`, `my-dev-kit-og.png`, `about-og.png`, `publications-og.png`, and
`contact-og.png`, but only `home-og.png` and `default-og.png` exist in `public/images/og/`
(along with stale `products-og.png` and `work-og.png` from the old route names). Because
`buildOpenGraphImages()` falls back to `default-og.png` when a route-specific image is missing
or not exactly 1200×630, this degrades gracefully rather than breaking — but five of six routes
currently share a generic preview image instead of a route-specific one. Generating real
1200×630 branded OG art for each route (or renaming/regenerating via
`scripts/generate-og-images.ts`) is a follow-up design/content task, not fixed here.

## Contact form checklist

- [ ] `npm run test` passes, including `tests/content/api-contact-route.test.ts` and
      `tests/content/send-contact-email.test.ts` (mocked — no network).
- [ ] `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are set in the target deployment environment
      (not verified by local scripts).
- [ ] Real email delivery has **not** been tested as part of this checklist unless
      `ALLOW_REAL_CONTACT_EMAIL_TEST=true` was explicitly set and `npm run test:contact-email`
      was explicitly run — see `docs/WORKFLOWS.md`.

## SEO / sitemap / robots checklist

- [ ] `sitemap.ts` output matches exactly the six live routes (derived automatically from
      `routeMetadata` — cannot drift unless `routeMetadata` itself is wrong).
- [ ] `robots.ts` allows all crawlers unless `NEXT_PUBLIC_NOINDEX=true` is intentionally set for
      a preview/staging deployment.
- [ ] No `public/robots.txt` file exists (would conflict with `src/app/robots.ts`).

## Accessibility / responsive checklist

Not fully automated — see `docs/QA_CHECKLIST.md` for the manual pass. Automated coverage that
does exist: `tests/e2e/accessibility.spec.ts` (skip link, landmark labels, one `h1` per route,
status-badge text) and `tests/e2e/responsive.spec.ts` (no horizontal overflow at mobile/tablet
widths) — both require `npm run test:e2e` with a running dev server.

## What is NOT done automatically by `check:release`

- End-to-end (Playwright) tests — must be run separately (`npm run dev:web -- --port 3100` then
  `npm run test:e2e`).
- Manual visual QA in an actual browser, light and dark mode.
- Real contact-email delivery.
- External publication sync (`npm run sync:publications`).
- Anything involving deployment, git push, or publication to GitHub/Vercel.
- Verifying environment variables are actually set in the target deployment environment.

## What must be manually checked before deployment

1. Run `npm run dev:web -- --port 3100` and `npm run test:e2e`; review any failures.
2. Manually load each of the six routes in a browser, light and dark mode — see
   `docs/QA_CHECKLIST.md`.
3. Confirm Vercel environment variables are set for the target environment.
4. Confirm `NEXT_PUBLIC_SITE_URL` matches the actual deployment domain before promoting to
   production.
5. Review `git status` and `git diff` one final time before any commit/push.
