# Released Theme Port and Historical Palette Replication Reference

## Current verified acceptance — 2026-11-03

**PASS_WITH_NOTES.** This section supersedes the earlier acceptance addenda, whose original text is preserved in `.my-dev-kit-workflow/reports/replication-guide-before-final-reconciliation.md`. The detailed six-palette destination reference beginning at section 1 remains below, as a historical description of pre-port commit `0c713001369bbfc76c416126877811a8888df07b`. Its six-palette/default/static-effects statements must not be applied to the completed incoming port. The consolidated final report is `.my-dev-kit-workflow/reports/theme-port-acceptance-20261103.txt`.

### Released-source authority and implementation

The incoming release is `iworkhere.space` commit `f8407b81356bb9481d12c1e13415fb18bc941100`. Comparison uses its immutable project-local snapshot and its actual Next 16 runtime; the dirty source working tree is not the authority and has not been changed. The destination retains Next 15/React 19/Tailwind 3, its content, routes, metadata, API and persistence architecture. No application dependency was added or changed.

The released registry defines seven selectable palettes: Mineral Research (`mineral`), Oxblood Atelier (`oxblood`), Signal Green (`signal`), Cobalt & Terracotta (`cobalt`), Amber & Graphite (`amber`), Violet & Graphite (`original`), and One Dark (`onedark`). Fresh visits use Original/System. Six ordinary palettes each support light and dark art; One Dark is fixed dark, giving thirteen art variants. Seven palette radios and three ordinary color-mode radios give ten options. These counts describe different contracts.

Existing owners remain `src/styles/art-tokens.css` for material roles, `src/styles/art.css` for consumers and art, `src/app/globals.css` for integration, and the existing theme provider, prepaint script and `AppearanceControl` for state. RootLayout supplies the released DM Sans binding and complete mono stack. There is one preference controller, using `my-website-2026-palette` and `my-website-2026-theme`; source storage keys were not copied.

The final runtime tests cover fresh system visits, explicit light/dark, live system changes, palette changes, reload, nested direct navigation, invalid/stale storage, keyboard selection, focus restoration, labels and selected semantics. One Dark fixes the effective art to dark while preserving the ordinary preference. The explicit regression One Dark with saved Light → fixed dark → reload → ordinary Light remains covered. Twenty-eight production prepaint cases observed actual FCP attributes and no hydration errors.

### Source rules, consumers and justified adaptations

The complete declaration manifest `reports/source-css-comparison-complete.json` contains 2,190 source declarations with selector/at-rule context, source and destination rules, status, adaptation reason and acceptance status: 19 exact textual matches and 2,171 explicit destination adaptations, zero unresolved mappings. Namespace and architecture mappings account for many textual differences; this count alone is not rendered proof. Source-only category-board/content selectors are explicitly mapped to retained destination component roles or documented as absent source-application features, without copying the source route/content system.

Independent runtime evidence covers 102 resolved roles across all thirteen appearances (1,326 comparisons: 1,312 canonical matches and fourteen documented differences). Shared header, hero, card and popup consumers cover 312 computed properties: 300 matches and twelve stronger destination popup borders. Actual source and destination images were also inspected. The source palette-specific typography, hero/card/control surfaces, gradients, opaque shadows, borders, hover/active states, animation, reduced-motion and browser/media fallbacks are mapped through the existing owners. Cobalt light card shadows now resolve to the source's opaque 4px/7px treatments, and the hero to its 8px source-colored shadow, despite legacy utility specificity.

Accessibility adaptations are deliberate rather than claims of exact replication:

- Cobalt dark hero muted text retains `#0b1330`; Mineral dark hero body uses `#f5f1df` because the source mix failed over the taller destination hero.
- One Dark card link/secondary text uses `#eac5f6`/`#9fd2fa`, scoped to its lighter card surface; input border/error use `#9baac0`/`#eb8a93`. Oxblood/Amber dark card input borders use `#93737d`/`#a29982`.
- Popup, input, focus and meaningful diagram-node contours use the verified strong boundary roles. DiagramConnectorPath paints an aria-hidden neutral clearance stroke behind the unchanged semantic connector geometry, colors, markers and dashes. This keeps semantic strokes distinguishable where they cross cards. Only the semantic path participates in connector assertions.
- Text/background/boundary color changes are atomic during palette switches to prevent low-contrast intermediate frames. Movement, shadow and other approved decorative transitions remain. Focus has a neutral support ring. Contact actions retain source material treatment and the destination's 44px target and validation behavior.
- The destination uses an opaque released popup surface and its own accessible border rather than copying the source category-board island surface. Destination component geometry and route/content relationships remain authoritative.

All supporting paths in this section are relative to `.my-dev-kit-workflow/` unless explicitly rooted in `src/` or `tests/`.

### Visual acceptance and historical matrix limitation

**ORIGINAL_78_CASE_MATRIX=UNVERIFIED.** One bounded history search examined the last forty relevant commits and the matrix introduced at `60b76a568dff3ce29888abfe81d8ea78cbea70bb`. It recovered a 108-case palette loop plus nine supporting-route cases, not an authoritative list of 78. The user explicitly authorized newly specified coverage instead of inventing historical cases. Evidence: `reports/screenshot-history-search.txt` and `screenshot-history-definition.txt`.

The replacement matrix was defined before capture in `reports/visual-acceptance/cases.json`, with stable IDs VIS-001 through VIS-129, appearance, route, viewport, browser, state and both image paths. It consists of:

- Thirteen appearances × three routes (`/`, `/projects`, `/projects/my-dev-kit`) × three viewports (390×844, 768×1024, 1440×900): 117 cases.
- Original/System on `/about`, `/publications` and `/contact` at all three widths: nine cases.
- Original/Light with the appearance dialog open at all three widths: three cases.

The fixed browser is headless Chromium, system preference light and reduced motion enabled. The baseline is a detached pre-port worktree under the workflow root, not the modified candidate. The original baseline lacks One Dark; its actual unsupported-palette fallback is recorded, not invented One Dark support.

**129 baseline images + 129 final images; 258 individually opened and inspected; all PASS; unresolved case IDs: none.** Final files are `validated-final-VIS-001.png` through `validated-final-VIS-129.png`. Each was checked for palette, foreground/background, typography, header/hero, surface hierarchy, controls, borders/shadows, clipping, overflow, alignment, navigation and responsiveness. `individual-inspections.json` records each review; `validated-visual-summary.json` verifies completeness. Earlier failed images and reviews are retained. This is acceptance of the explicitly authorized replacement matrix, not a claim to have recovered the historical 78 cases.

### Composited contrast, accessibility and responsiveness

Final production audits use real DOM computed colors/opacity and background pixels with foreground masks, so gradients, alpha layers, hero overlays and cards are included. Foreground alpha and ancestor opacity are composed in paint order. Text samples cover actual glyph placement; interface edges sample adjacent rendered backgrounds. Fully occluded pixels behind the sticky header/popup are excluded because those pixels are not painted; the visible header/popup is measured independently. Arrow markers are removed with foreground paths during background measurement, avoiding foreground-as-background errors. No threshold was lowered.

The final evidence includes 169 text scenario/appearance results across six routes and rest/hover/focus/card-hover/pressed/panel/mobile/tablet cases; 91 interface scenario results; 78 diagram-stroke groups across three widths; 78 diagram-node rest/hover cases; 39 form error/error-hover/mocked-success cases; 65 motion/transparency/contrast/forced-color preference cases; and 24 text plus 24 node transition frames. There are zero unresolved findings. Ordinary text requires 4.5:1; large text and applicable nontext indicators require 3:1. Disabled controls and redundant aria-hidden marks are exempt only where applicable.

Production evidence is in `reports/accepted-*.json` and the 24 exact commands in `accepted-audit-commands.json`. This is bounded acceptance of the declared routes/states/viewports and relevant foreground positions, not an independent universal WCAG certification or every possible viewport/gradient extremum. Keyboard, screen-reader labeling, selected-state semantics and reduced-motion behavior also pass the browser suite. Responsive image checks cover all three fixed widths. Published my-frontend-observer 0.10.1 adds a final 390px header/hero observation with zero diagnostics; it supplements, not replaces, Playwright and individual image review.

### Reproducible performance comparison

The unchanged pre-port baseline and final production candidate use the same machine, Chromium engine, cold browser contexts, 40ms latency, 10Mbps down/5Mbps up, CPU 4× and three runs per landing/product route at 390px and 1440px. Values below are medians. Baseline fresh default is Mineral/System and final fresh default is the approved Original/System; these are the actual application defaults. Encoded JS/CSS includes resources loaded/prefetched in the fixed observation window. No Lighthouse or field score is claimed.

| Route / width | LCP baseline → final | CLS baseline → final | Load baseline → final | Main-thread task seconds baseline → final |
| --- | --- | --- | --- | --- |
| Home / 390 | 672 → 668ms | 0 → 0.013399 | 1162 → 936.1ms | 1.4314 → 1.1246 |
| Home / 1440 | 736 → 696ms | 0 → 0.000229 | 1050 → 970.1ms | 1.2857 → 1.2666 |
| Product / 390 | 708 → 724ms | 0 → 0.048092 | 1141.5 → 1252.1ms | 1.4930 → 1.3591 |
| Product / 1440 | 808 → 656ms | 0 → 0.000311 | 1343.8 → 1167.5ms | 1.6702 → 1.2733 |

All four LCP values are below 2.5s and CLS below 0.1. JS changes by +0.38% to +0.94% depending on route/window. Encoded CSS increases from 9,184 to 21,736 bytes (+12,552 bytes, +136.67%) to carry the approved art/material/media rules. Appearance-switch medians increase 44.6→130ms mobile and 51.4→132.5ms desktop under CPU 4×. These relative costs are retained as non-blocking performance notes: the absolute CSS addition is 12.6KB, switches remain responsive, the documented page budgets pass and no application dependency/store was introduced. The mobile product load is +9.69% and LCP +2.26%; the other LCP/load medians improve. No performance optimization is claimed and earlier failed/noisy measurements are preserved. Full values, percentage changes and limits are in `reports/validated-performance-comparison.json`; baseline measurements were not replaced after failure.

### Final validation, integrity and documentation reconciliation

Final production validation: `npm run ci` exited 0 (331 tests in thirty files, typecheck, lint, content/local-link validation and production build). After the final test-only correction, typecheck and lint exited 0 again. The complete Playwright execution exited 0 with **249 passed, zero failed, skipped or flaky**, including four real production performance-budget tests. External network link checks remain **SKIPPED**. Final production owners are hash-checked against the built/captured candidate; no production changes followed its validation.

The test-only correction handles Chromium's `color(srgb ...)` serialization, resolves scoped muted roles at each actual paragraph, and selects the existing semantic diagram connector while asserting its decorative clearance separately. It preserves all contrast thresholds, failure cases, retry policy and timeouts. The earlier 246/249 run and original inherited product-navigation timeout remain available. The final full green execution is the acceptance evidence; a focused rerun is not substituted for it.

The immutable source snapshot has 745 tracked files with zero semantic differences from the approved Git object; 632 export-only CRLF differences are normalized and explicitly recorded. The source working tree's initial HEAD/status remain unchanged. Destination protected content, routes, API, package/lockfile/environment and layout metadata remain unchanged. Initial inherited file hashes and final hashes distinguish retained work from this continuation. No orphan cleanup or milestone work was performed.

Current documentation evidence resolves the reported M13/owner/reachability concerns: `PROJECT_PLAN.md` line 5 records M1–M14 complete; `DESIGN.md` lines 439–441 describe implemented M13; `COMPONENT_MAP.md` line 130 and `component_registry.md` line 20 identify live AppearanceControl. Registry/map historical and test-only components remain classified. Remaining older DESIGN palette/static-art descriptions around lines 82–111 and the milestone wording around line 560 describe historical work and need a separate broad design-document reconciliation; they do not override this current implementation or authorize new milestones.

No commit, push, merge, tag or deployment is authorized or performed. All evidence stays project-local and unstaged; no visible windows were opened.

---

## Historical pre-port destination reference

The following detailed sections describe the six-palette baseline, not the current incoming source contract. Preserve their historical values when reproducing that baseline; use the verified current section above for this port.

## 1. Purpose and Scope

This guide describes the implemented six-palette appearance system so it can be reproduced in another site. The exact scheme variables and selectors are included below. It is a reproduction reference, not a redesign. Keep the six existing palette identities and values intact. Palette and color mode are the only appearance preferences; there is no special-effects setting.

Required for palette fidelity: token values, selector behavior, semantic accent roles, mode selection, persistence, and first-paint initialization. Optional for closer visual similarity: typography, card geometry, shadows, spacing, and static decorative gradients. The source site's content, routes, contact form, product data, diagrams/topology, SEO and hosting setup are not required. Applying these palettes alone does not promise pixel-for-pixel reproduction.

## 2. Source Provenance

- Repository: `https://github.com/dailephd/my-website-2026` (local source: `C:\Users\daile\Projects\my-website-2026`).
- Source commit: `0c713001369bbfc76c416126877811a8888df07b` (`main`, equal to `origin/main` at inspection); worktree was clean.
- Extraction date: 2026-10-09.
- Instructions read: `AGENTS.md`, `CLAUDE.md`, `agents.txt`, `claude.txt`, and all 749 lines of `manifest.txt`.
- Design authorities read: `docs/DESIGN.md`, `docs/ARCHITECTURE.md`, `docs/COMPONENT_MAP.md`, and `docs/DIAGRAM_DESIGN.md`.
- Implementation owners examined: `src/styles/tokens.css`, `theme.css`, `palettes.css`, `utilities.css`, `diagrams.css`, `src/app/globals.css`; `src/lib/constants.ts`, `theme.ts`; `src/types/theme.ts`; `ThemeProvider.tsx`, `AppearanceControl.tsx`, `theme-script.tsx`; palette-consuming UI and diagram styles.
- Tests examined: `tests/content/palette-styles.test.ts`, appearance runtime tests and `tests/e2e/appearance-matrix.spec.ts`.
- Retrieval: fresh project-local my-dev-kit index at this commit; indexed `src`, `tests`, `docs`, and `scripts`; ran bounded search/lookup/slice/source retrieval for palette definitions, state flow, consumers, and diagram semantics.

No local palette modifications were present; the checked-out committed source is the reproduction authority.

## 3. Design System Overview

There are six palette IDs and two explicit effective color schemes per palette: 12 total. Shared HTML structure remains stable while CSS custom properties supply material, text, border, accent, focus, atmosphere, and shadow values. The root `data-palette` selects hue/material identity; root `data-theme` selects the effective light or dark scheme. System is a stored user preference resolved to one of those two effective modes, not a third color scheme.

## 4. Palette Registry

Selection order and exact IDs are part of the preference contract:

|       Order | ID         | User-facing name    | Character                                             |
| ----------: | ---------- | ------------------- | ----------------------------------------------------- |
| 1 (default) | `mineral`  | Mineral Research    | Scientific, warm, calm, architectural                 |
|           2 | `oxblood`  | Oxblood Atelier     | Editorial, intimate, crafted                          |
|           3 | `signal`   | Signal Green        | Instrumental, precise, research-oriented              |
|           4 | `cobalt`   | Cobalt & Terracotta | Technical, confident, geometric                       |
|           5 | `amber`    | Amber & Graphite    | Warm, measured, scholarly                             |
|           6 | `original` | Violet & Graphite   | Graphite surfaces, violet emphasis, cyan data accents |

`original` is the sixth palette's internal ID. Keep that ID while displaying **Violet & Graphite** to people.

## 5. Color-Mode Behavior

Modes shown to users are **Light**, **Dark**, and **System**. Explicit schemes are only Light and Dark. System resolves `prefers-color-scheme: dark` into an effective `dark` or `light` value and follows later OS changes while System remains selected.

The accepted app stores mode preference under `my-website-2026-theme` and palette ID under `my-website-2026-palette`. These keys are site-specific examples; use unique keys for the receiving domain. Default palette is `mineral`; default preference is `system`. Server HTML starts with Mineral light as a deterministic fallback, and the pre-hydration initializer applies saved preference before paint.

## 6. Complete Token Reference

The CSS below defines every token in each selector. Tokens present in the base `:root` but omitted in a scheme block are **inherited**, not separately recalculated. `--color-action-hover` and `--color-logo-accent` inherit primary in five palettes and are overridden to secondary only by Violet & Graphite light; its dark block inherits those same aliases. `--color-accent-primary-text` aliases primary in the base and all schemes except Violet & Graphite light, where it is a darker functional text color. Compatibility aliases are references, not additional colors: `--color-bg` → background, `--color-surface-elevated` → elevated, `--color-accent-violet` → secondary, `--color-accent-cyan` → primary, `--color-focus` → focus ring, `--color-glow-cyan` → secondary glow.

Each scheme explicitly specifies: `color-scheme`; in nondefault palettes, display/eyebrow font variables; four backgrounds/surfaces; three text roles; two borders; primary and secondary brand and text accents; focus and on-accent colors; selection, two glows and highlight; and three shadows. The base also defines font and radius tokens plus aliases. `--color-card` equals `--color-surface` in Mineral dark, Oxblood dark, Signal dark and Cobalt dark; the declarations are explicit. CSS variable references and alpha values are intentional.

### 6.1 Twelve-scheme CSS token reference

This is the standalone, copyable scheme stylesheet: the base (Mineral light), Mineral dark override, then all five nondefault palettes in registry order, with each palette's light block followed by dark. It carries exact source values, aliases, font stacks, and shadow parameters. It needs no source-site module. Do not drop the default selector or the alias declarations.

```css
:root {
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: var(--font-sans);
  --font-eyebrow: var(--font-sans);
  --radius-control: 0.75rem;
  --radius-card: 1.25rem;
  --radius-panel: 1.75rem;
  --radius-sm: 0.5rem;

  --color-accent-violet: var(--color-accent-secondary);
  --color-accent-cyan: var(--color-accent-primary);
  --color-focus: var(--color-focus-ring);
  --color-glow-cyan: var(--color-glow-secondary);

  --color-action-hover: var(--color-accent-primary);
  --color-logo-accent: var(--color-accent-primary);

  --color-bg: var(--color-background);
  --color-surface-elevated: var(--color-elevated);
  --color-background: #f2f0e7;
  --color-surface: #e3e3d8;
  --color-card: #f9f8f3;
  --color-elevated: #fcfcfa;
  --color-text-primary: #1c2926;
  --color-text-secondary: #404b47;
  --color-text-muted: #5a635e;
  --color-border: #cbccc4;
  --color-border-strong: #787f79;
  --color-accent-primary: #0f716a;
  --color-accent-primary-text: var(--color-accent-primary);
  --color-accent-secondary: #b8683f;
  --color-accent-secondary-text: #8c5638;
  --color-focus-ring: #0f716a;
  --color-on-accent: #f2f0e7;
  --color-selection: rgb(15 113 106 / 22%);
  --color-glow: rgb(15 113 106 / 16%);
  --color-glow-secondary: rgb(184 104 63 / 12%);
  --color-highlight: rgb(255 255 255 / 65%);

  --shadow-card: 0 18px 50px rgb(146 150 144 / 12%);
  --shadow-card-hover: 0 24px 64px rgb(146 150 144 / 19%);
  --shadow-control: 0 7px 22px rgb(146 150 144 / 14%);
}

:root {
  color-scheme: light;
}

:root.dark,
:root[data-theme='dark'] {
  color-scheme: dark;
  --color-background: #141e1c;
  --color-surface: #22302c;
  --color-card: #22302c;
  --color-elevated: #2f3c39;
  --color-text-primary: #ecede5;
  --color-text-secondary: #c9ccc5;
  --color-text-muted: #a3a7a1;
  --color-border: #3b4340;
  --color-border-strong: #828883;
  --color-accent-primary: #68c9ba;
  --color-accent-secondary: #e1a17c;
  --color-accent-secondary-text: #e1a17c;
  --color-focus-ring: #68c9ba;
  --color-on-accent: #141e1c;
  --color-selection: rgb(104 201 186 / 32%);
  --color-glow: rgb(104 201 186 / 15%);
  --color-glow-secondary: rgb(225 161 124 / 11%);
  --color-highlight: rgb(255 255 255 / 6%);

  --shadow-card: 0 18px 50px rgb(0 0 0 / 38%);
  --shadow-card-hover: 0 24px 64px rgb(0 0 0 / 52%);
  --shadow-control: 0 7px 22px rgb(0 0 0 / 32%);
}

:root[data-palette='oxblood'] {
  color-scheme: light;
  --font-display: Georgia, 'Times New Roman', serif;
  --font-eyebrow: var(--font-sans);
  --color-background: #f6f1ec;
  --color-surface: #e7dcd6;
  --color-card: #fbf8f6;
  --color-elevated: #fdfcfb;
  --color-text-primary: #302128;
  --color-text-secondary: #504247;
  --color-text-muted: #675b5f;
  --color-border: #d2ccc9;
  --color-border-strong: #83787a;
  --color-accent-primary: #812c49;
  --color-accent-secondary: #2d7168;
  --color-accent-secondary-text: #2d6c64;
  --color-focus-ring: #812c49;
  --color-on-accent: #f6f1ec;
  --color-selection: rgb(129 44 73 / 22%);
  --color-glow: rgb(129 44 73 / 16%);
  --color-glow-secondary: rgb(45 113 104 / 12%);
  --color-highlight: rgb(255 255 255 / 65%);

  --shadow-card: 0 18px 50px rgb(157 147 148 / 12%);
  --shadow-card-hover: 0 24px 64px rgb(157 147 148 / 19%);
  --shadow-control: 0 7px 22px rgb(157 147 148 / 14%);
}

:root[data-palette='oxblood'][data-theme='dark'],
:root.dark[data-palette='oxblood'] {
  color-scheme: dark;
  --color-background: #21171c;
  --color-surface: #34252c;
  --color-card: #34252c;
  --color-elevated: #403239;
  --color-text-primary: #f5ebe6;
  --color-text-secondary: #cdc3c0;
  --color-text-muted: #aba19f;
  --color-border: #473d40;
  --color-border-strong: #897f7f;
  --color-accent-primary: #e09db2;
  --color-accent-secondary: #79c4aa;
  --color-accent-secondary-text: #79c4aa;
  --color-focus-ring: #e09db2;
  --color-on-accent: #21171c;
  --color-selection: rgb(224 157 178 / 32%);
  --color-glow: rgb(224 157 178 / 15%);
  --color-glow-secondary: rgb(121 196 170 / 11%);
  --color-highlight: rgb(255 255 255 / 6%);

  --shadow-card: 0 18px 50px rgb(0 0 0 / 38%);
  --shadow-card-hover: 0 24px 64px rgb(0 0 0 / 52%);
  --shadow-control: 0 7px 22px rgb(0 0 0 / 32%);
}

:root[data-palette='signal'] {
  color-scheme: light;
  --font-display: var(--font-sans);
  --font-eyebrow: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  --color-background: #eff1e8;
  --color-surface: #dce2d1;
  --color-card: #f7f8f4;
  --color-elevated: #fbfcfa;
  --color-text-primary: #18211a;
  --color-text-secondary: #414941;
  --color-text-muted: #5b615a;
  --color-border: #c8ccc3;
  --color-border-strong: #777d75;
  --color-accent-primary: #3e6d46;
  --color-accent-secondary: #a66f40;
  --color-accent-secondary-text: #815b36;
  --color-focus-ring: #3e6d46;
  --color-on-accent: #eff1e8;
  --color-selection: rgb(62 109 70 / 22%);
  --color-glow: rgb(62 109 70 / 16%);
  --color-glow-secondary: rgb(166 111 64 / 12%);
  --color-highlight: rgb(255 255 255 / 65%);

  --shadow-card: 0 18px 50px rgb(142 147 139 / 12%);
  --shadow-card-hover: 0 24px 64px rgb(142 147 139 / 19%);
  --shadow-control: 0 7px 22px rgb(142 147 139 / 14%);
}

:root[data-palette='signal'][data-theme='dark'],
:root.dark[data-palette='signal'] {
  color-scheme: dark;
  --color-background: #111815;
  --color-surface: #1d2920;
  --color-card: #1d2920;
  --color-elevated: #2b362d;
  --color-text-primary: #ebf2e5;
  --color-text-secondary: #bdc4b9;
  --color-text-muted: #9aa198;
  --color-border: #383f3a;
  --color-border-strong: #7a8179;
  --color-accent-primary: #acea74;
  --color-accent-secondary: #d59a68;
  --color-accent-secondary-text: #d59a68;
  --color-focus-ring: #acea74;
  --color-on-accent: #111815;
  --color-selection: rgb(172 234 116 / 32%);
  --color-glow: rgb(172 234 116 / 15%);
  --color-glow-secondary: rgb(213 154 104 / 11%);
  --color-highlight: rgb(255 255 255 / 6%);

  --shadow-card: 0 18px 50px rgb(0 0 0 / 38%);
  --shadow-card-hover: 0 24px 64px rgb(0 0 0 / 52%);
  --shadow-control: 0 7px 22px rgb(0 0 0 / 32%);
}

:root[data-palette='cobalt'] {
  color-scheme: light;
  --font-display: var(--font-sans);
  --font-eyebrow: var(--font-sans);
  --color-background: #f5f0e8;
  --color-surface: #e6e0d8;
  --color-card: #faf8f4;
  --color-elevated: #fdfcfa;
  --color-text-primary: #172744;
  --color-text-secondary: #3b475e;
  --color-text-muted: #576174;
  --color-border: #cdccca;
  --color-border-strong: #767d8b;
  --color-accent-primary: #2751ac;
  --color-accent-secondary: #c25b37;
  --color-accent-secondary-text: #994f3a;
  --color-focus-ring: #2751ac;
  --color-on-accent: #f5f0e8;
  --color-selection: rgb(39 81 172 / 22%);
  --color-glow: rgb(39 81 172 / 16%);
  --color-glow-secondary: rgb(194 91 55 / 12%);
  --color-highlight: rgb(255 255 255 / 65%);

  --shadow-card: 0 18px 50px rgb(145 150 158 / 12%);
  --shadow-card-hover: 0 24px 64px rgb(145 150 158 / 19%);
  --shadow-control: 0 7px 22px rgb(145 150 158 / 14%);
}

:root[data-palette='cobalt'][data-theme='dark'],
:root.dark[data-palette='cobalt'] {
  color-scheme: dark;
  --color-background: #111a29;
  --color-surface: #1d2a3d;
  --color-card: #1d2a3d;
  --color-elevated: #2b3749;
  --color-text-primary: #eff1f5;
  --color-text-secondary: #c3c6cc;
  --color-text-muted: #9fa4ac;
  --color-border: #39414e;
  --color-border-strong: #7e838d;
  --color-accent-primary: #8babff;
  --color-accent-secondary: #ea956d;
  --color-accent-secondary-text: #ea956d;
  --color-focus-ring: #8babff;
  --color-on-accent: #111a29;
  --color-selection: rgb(139 171 255 / 32%);
  --color-glow: rgb(139 171 255 / 15%);
  --color-glow-secondary: rgb(234 149 109 / 11%);
  --color-highlight: rgb(255 255 255 / 6%);

  --shadow-card: 0 18px 50px rgb(0 0 0 / 38%);
  --shadow-card-hover: 0 24px 64px rgb(0 0 0 / 52%);
  --shadow-control: 0 7px 22px rgb(0 0 0 / 32%);
}

:root[data-palette='amber'] {
  color-scheme: light;
  --font-display: 'Palatino Linotype', Palatino, Georgia, serif;
  --font-eyebrow: var(--font-sans);
  --color-background: #f5f0e3;
  --color-surface: #e7decc;
  --color-card: #faf8f1;
  --color-elevated: #fdfcf9;
  --color-text-primary: #252621;
  --color-text-secondary: #464640;
  --color-text-muted: #5f5f57;
  --color-border: #d0ccc0;
  --color-border-strong: #7c7b72;
  --color-accent-primary: #86592a;
  --color-accent-secondary: #256a64;
  --color-accent-secondary-text: #256a64;
  --color-focus-ring: #86592a;
  --color-on-accent: #f5f0e3;
  --color-selection: rgb(134 89 42 / 22%);
  --color-glow: rgb(134 89 42 / 16%);
  --color-glow-secondary: rgb(37 106 100 / 12%);
  --color-highlight: rgb(255 255 255 / 65%);

  --shadow-card: 0 18px 50px rgb(151 149 140 / 12%);
  --shadow-card-hover: 0 24px 64px rgb(151 149 140 / 19%);
  --shadow-control: 0 7px 22px rgb(151 149 140 / 14%);
}

:root[data-palette='amber'][data-theme='dark'],
:root.dark[data-palette='amber'] {
  color-scheme: dark;
  --color-background: #1b201e;
  --color-surface: #29312d;
  --color-card: #29312d;
  --color-elevated: #363d3a;
  --color-text-primary: #f5eedc;
  --color-text-secondary: #d2cdbe;
  --color-text-muted: #adaa9d;
  --color-border: #424540;
  --color-border-strong: #8a897f;
  --color-accent-primary: #eac078;
  --color-accent-secondary: #7fc3b8;
  --color-accent-secondary-text: #7fc3b8;
  --color-focus-ring: #eac078;
  --color-on-accent: #1b201e;
  --color-selection: rgb(234 192 120 / 32%);
  --color-glow: rgb(234 192 120 / 15%);
  --color-glow-secondary: rgb(127 195 184 / 11%);
  --color-highlight: rgb(255 255 255 / 6%);

  --shadow-card: 0 18px 50px rgb(0 0 0 / 38%);
  --shadow-card-hover: 0 24px 64px rgb(0 0 0 / 52%);
  --shadow-control: 0 7px 22px rgb(0 0 0 / 32%);
}

:root[data-palette='original'] {
  color-scheme: light;
  --font-display: var(--font-sans);
  --font-eyebrow: var(--font-sans);
  --color-background: #edeff3;
  --color-surface: #f2f4f8;
  --color-card: #f6f7fa;
  --color-elevated: #fbfbfd;
  --color-text-primary: #151924;
  --color-text-secondary: #4a5262;
  --color-text-muted: #616c7f;
  --color-border: #cbd1dc;
  --color-border-strong: #6e7b91;
  --color-accent-primary: #087b91;
  --color-accent-primary-text: #006d82;
  --color-accent-secondary: #6d3ee8;
  --color-accent-secondary-text: #6d3ee8;
  --color-focus-ring: #087b91;
  --color-on-accent: #f7f8fb;
  --color-selection: rgb(124 58 237 / 20%);
  --color-glow: rgb(109 62 232 / 13%);
  --color-glow-secondary: rgb(8 123 145 / 10%);
  --color-highlight: rgb(255 255 255 / 72%);
  --color-action-hover: var(--color-accent-secondary);
  --color-logo-accent: var(--color-accent-secondary);

  --shadow-card: 0 18px 55px rgb(35 42 56 / 9%);
  --shadow-card-hover: 0 24px 70px rgb(35 42 56 / 14%);
  --shadow-control: 0 7px 24px rgb(35 42 56 / 11%);
}

:root[data-palette='original'][data-theme='dark'],
:root.dark[data-palette='original'] {
  color-scheme: dark;
  --color-background: #1a1d23;
  --color-surface: #1d222b;
  --color-card: #232935;
  --color-elevated: #2a3140;
  --color-text-primary: #f1f3f7;
  --color-text-secondary: #c5ccda;
  --color-text-muted: #929db0;
  --color-border: #384151;
  --color-border-strong: #71819a;
  --color-accent-primary: #42cbe3;
  --color-accent-primary-text: #42cbe3;
  --color-accent-secondary: #a98cf8;
  --color-accent-secondary-text: #a98cf8;
  --color-focus-ring: #42cbe3;
  --color-on-accent: #171a21;
  --color-selection: rgb(167 139 250 / 28%);
  --color-glow: rgb(169 140 248 / 13%);
  --color-glow-secondary: rgb(66 203 227 / 10%);
  --color-highlight: rgb(255 255 255 / 6%);

  --shadow-card: 0 22px 62px rgb(5 7 11 / 35%);
  --shadow-card-hover: 0 28px 78px rgb(5 7 11 / 48%);
  --shadow-control: 0 8px 26px rgb(5 7 11 / 30%);
}
```

### 6.2 Defined versus inherited values

`--font-sans`, `--font-display`, `--font-eyebrow`, radii, neutral aliases and the default palette live in the base root. Mode blocks override only declarations they define. Every nondefault light selector resets `color-scheme: light`; every dark selector sets it to dark. This is important when a light palette is selected while the root still has a dark compatibility class. Dark selectors intentionally do not redeclare the inherited primary-text alias, action-hover, or logo-accent.

## 7. Copyable Palette CSS

Section 6.1 is the complete all-twelve-scheme CSS. The following optional shared visual layer reproduces global effects without copying application components. Apply only if the target's components use these class names; adapting selectors to existing component owners is usually preferable.

```css
body {
  background: radial-gradient(
      circle at 86% 4%,
      var(--color-glow),
      transparent 30rem
    ),
    radial-gradient(
      circle at 8% 34%,
      var(--color-glow-secondary),
      transparent 26rem
    ),
    var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  line-height: 1.5;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}
::selection {
  background: var(--color-selection);
}
:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 3px;
}
.palette-card {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-card);
  color: var(--color-text-primary);
  box-shadow:
    inset 0 1px 0 var(--color-highlight),
    var(--shadow-card);
}
.palette-card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-card-hover);
}
.palette-action:hover {
  background: var(--color-action-hover);
  color: var(--color-on-accent);
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

The source uses ordinary 180ms color/material transitions and a restrained two-pixel card lift. Reduced motion disables those transitions/transforms; it does not add or expose an effects preference. The snippet above opts out of motion aggressively for a small standalone example; a receiving site can instead scope reduced-motion rules to its animated/transitioning palette controls and cards.

## 8. CSS Cascade and Selector Specificity

Source import order is `tokens.css` → `theme.css` → `palettes.css` → `utilities.css` → `diagrams.css`, followed by framework utility directives. Keep base declarations first, then default dark, then nondefault palette overrides, then shared component treatments. The standalone CSS uses the same ordering.

- Base `:root` provides Mineral light and fallback values.
- Mineral dark: `:root.dark, :root[data-theme='dark']` (specificity 0,2 in each branch) overrides base when the effective mode is dark.
- Nondefault light: `:root[data-palette='ID']` (0,2), overrides both base and default dark.
- Nondefault dark: `:root[data-palette='ID'][data-theme='dark'], :root.dark[data-palette='ID']` (0,3), overrides both base and Mineral dark. Both branches support consumers that inspect `data-theme` or the `.dark` convention.

Set both `data-theme` (always the effective `light` or `dark`) and `.dark` consistently. Set `data-palette` to a validated ID; if absent, base defaults to Mineral. Set `data-theme-preference` separately to `light`, `dark`, or `system` for state/debugging; CSS need not select on it. Do not leave the root `.dark` class inconsistent with `data-theme`. Do not use `data-theme='system'` as a selector: it would not identify which colors to apply. Keeping the import order and selector specificity prevents Mineral dark from winning over a nondefault palette.

For first paint, put validated root attributes in server HTML when possible, or run a small synchronous initializer in `<head>` before styles paint. Do not defer this to a post-hydration effect. Keep the initial fallback deterministic and make the inline initializer use the same allowed IDs/defaults as the interactive state owner.

## 9. Shared Visual Styling

Global styles use the page background plus two static radial washes (`--color-glow` at upper right, `--color-glow-secondary` left-middle), primary text, and `--font-sans`. Selection uses `--color-selection`; global keyboard focus is a 3px outline with 3px offset in `--color-focus-ring`. Cards are solid tokenized fills with inset highlight, a soft tokenized shadow, and subtle hover treatment. Sections use a border-gradient separator and 7px secondary-accent center marker. The site avoids pure white/black page grounds, heavy glow, animated atmospheres, particles, and WebGL.

## 10. Palette-Specific Visual Treatments

These are actual shared utility treatments, not extra palette values:

| Palette                        | Card decoration                                                                                          | Section separator marker                | Other treatment                                                                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Mineral                        | Thin primary-accent hairline inset 1.25rem from card edges, 50% opacity                                  | 7px circle, secondary accent            | Default shared card highlight/shadows                                                                                                 |
| Oxblood                        | Inset 6px outline using `--color-border`, 0.8 opacity, radius `max(2px, calc(var(--radius-card) - 6px))` | 7px diamond (45° rotation)              | Georgia display face                                                                                                                  |
| Signal                         | 14px L-shaped corner marks, inset 8px, primary color mixed at 34% with transparent                       | 7px square, primary accent              | Monospace eyebrows                                                                                                                    |
| Cobalt                         | No card pseudo-element; hard offset shadow: 5px/5px secondary mixed 24%, hover 8px/8px mixed 34%         | 7px round-square                        | Geometric, flat card accent                                                                                                           |
| Amber                          | Horizontal inset 5px border lines using `--color-border`, 0.9 opacity                                    | 9px hollow square with secondary border | Palatino display face                                                                                                                 |
| Violet & Graphite (`original`) | No added card frame                                                                                      | No marker                               | Hero: 1px primary line at `3rem`, width `calc(100% - 6rem)`; violet-led and cyan secondary glow layers; violet logo/action-hover role |

The appearance picker also draws two small palette swatches from registry metadata rather than reading CSS custom properties. The source metadata is: Mineral `#0f716a` / `#b8683f`; Oxblood `#812c49` / `#2d7168`; Signal `#3f6f47` / `#a66f40`; Cobalt `#2751ac` / `#c25b37`; Amber `#93602b` / `#256a64`; Violet & Graphite `#087b91` / `#6d3ee8`. These are picker-preview values only; CSS tokens in §6.1 are authoritative for actual rendered scheme colors. In particular, the Signal and Amber first swatches are not byte-identical to their primary CSS tokens.

Actual consumers preserve the roles: HomeHero eyebrow copy uses the primary text token while its decorative hairline uses secondary accent; primary LinkButton hover uses `--color-action-hover`; SiteLogoMark uses `--color-logo-accent`; card categories, links, contact links and product role labels use functional text/accent tokens. Violet & Graphite overrides the shared action-hover and logo roles to secondary violet.

Shared card hover changes strong border, uses hover shadow, and lifts 2px. The card material pseudo-element is decorative and must not cover contents or be announced. These selectors depend on palette ID; preserve the exact IDs in root attributes.

## 11. Typography

Base `--font-sans` is `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`; `--font-display` and `--font-eyebrow` alias it by default. Body uses sans, headings `h1`–`h3` use display, `.eyebrow` uses eyebrow. Oxblood changes display to `Georgia, 'Times New Roman', serif`. Amber uses `'Palatino Linotype', Palatino, Georgia, serif`. Signal uses `ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace` for eyebrow labels only. Other palette faces resolve to sans. These stacks use system fallback fonts; no external font asset is required by the palette CSS, and rendering may vary by OS/browser. Shared heading weights/size conventions are component-level, not palette-specific tokens.

## 12. Semantic Accent Roles

Primary accent means data/system flow, links, hero eyebrow, and focus. Secondary means control/orchestration flow, decorative/section emphasis and premium control accents. Keep the roles stable even when each palette's hues change. Use `--color-accent-primary-text` for text on ordinary surfaces when it differs from the brand/focus color, `--color-accent-secondary-text` for readable secondary text, and `--color-on-accent` for text placed on primary accent fills. Brand accents are not automatically safe for small text.

Violet & Graphite specifically maps cyan to primary (data/link/focus) and violet to secondary (control/selection/glow). Its light cyan brand `#087b91` has a separate functional text token `#006d82`; the brand color remains for focus/data accents. Dark functional cyan text is `#42cbe3`. Violet is retained for selection, major atmosphere, logo accent and primary-action hover. The alias names `--color-accent-violet` and `--color-accent-cyan` are historical compatibility aliases to secondary and primary roles, not universal hue lookups. Do not swap cyan and violet meanings.

Example semantic usage:

```css
.data-link,
.flow--data {
  color: var(--color-accent-primary-text);
}
.flow--data {
  border-color: var(--color-accent-primary);
}
.flow--control {
  border-color: var(--color-accent-secondary);
}
.primary-action {
  background: var(--color-accent-primary);
  color: var(--color-on-accent);
}
.primary-action:hover {
  background: var(--color-action-hover);
}
.interactive:focus-visible {
  outline: 3px solid var(--color-focus-ring);
}
```

## 13. Diagram Color Semantics

The source defines diagram semantic variables as aliases of active palette tokens; no diagram-specific colors are needed:

| Diagram role                         | Mapping                                    |
| ------------------------------------ | ------------------------------------------ |
| Canvas background                    | `--color-surface`                          |
| Primary node background              | `--color-elevated`                         |
| Secondary node / artifact background | `--color-card`                             |
| Diagram border / strong border       | `--color-border` / `--color-border-strong` |
| Primary, secondary, muted text       | matching `--color-text-*`                  |
| Data connector and arrow             | `--color-accent-primary`                   |
| Control connector and arrow          | `--color-accent-secondary`                 |
| Feedback path                        | secondary accent, dashed `8 8`             |
| Focus                                | `--color-focus-ring`                       |
| Canvas/node shadow                   | `--shadow-card`                            |

Reusable mapping (topology is target-owned):

```css
:root {
  --diagram-canvas-bg: var(--color-surface);
  --diagram-primary-node-bg: var(--color-elevated);
  --diagram-secondary-node-bg: var(--color-card);
  --diagram-border: var(--color-border);
  --diagram-border-strong: var(--color-border-strong);
  --diagram-text-primary: var(--color-text-primary);
  --diagram-text-secondary: var(--color-text-secondary);
  --diagram-text-muted: var(--color-text-muted);
  --diagram-flow-data: var(--color-accent-primary);
  --diagram-flow-control: var(--color-accent-secondary);
  --diagram-focus: var(--color-focus-ring);
  --diagram-shadow: var(--shadow-card);
}
.diagram-flow--data {
  stroke: var(--diagram-flow-data);
  fill: none;
}
.diagram-flow--control,
.diagram-flow--feedback {
  stroke: var(--diagram-flow-control);
  fill: none;
}
.diagram-flow--feedback {
  stroke-dasharray: 8 8;
}
/* Optional geometry defaults from the source diagram token layer. */
:root {
  --diagram-canvas-radius: 1.5rem;
  --diagram-primary-node-radius: 1.25rem;
  --diagram-secondary-node-radius: 0.875rem;
  --diagram-artifact-radius: 1rem;
  --diagram-canvas-padding: 1.25rem;
  --diagram-primary-node-padding: 1rem;
  --diagram-secondary-node-padding-y: 0.625rem;
  --diagram-secondary-node-padding-x: 0.75rem;
  --diagram-primary-stroke: 3px;
  --diagram-secondary-stroke: 2.5px;
  --diagram-feedback-stroke: 2.5px;
  --diagram-feedback-dash: 8 8;
}
@media (min-width: 640px) {
  :root {
    --diagram-primary-stroke: 3.5px;
    --diagram-canvas-padding: 1.75rem;
  }
}
@media (min-width: 1024px) {
  :root {
    --diagram-primary-stroke: 4px;
    --diagram-canvas-padding: 2.25rem;
    --diagram-primary-node-padding: 1.5rem;
  }
}
```

Use matching color on line shafts and arrowheads; preserve a visible shaft. Labels use solid theme-aware surfaces, and color is paired with labels/line styles rather than being the sole state cue. Do not reproduce the source product diagram's topology or labels.

## 14. Appearance State and Persistence

The source state contract is `PaletteId = mineral | oxblood | signal | cobalt | amber | original`; preference `light | dark | system`; effective theme `light | dark`. Registry validation rejects arbitrary saved values. Defaults are palette `mineral`, preference `system`; a server-rendered no-script fallback is Mineral light. On storage read failure or invalid value, each setting independently falls back to its default. A failed write leaves the in-memory change effective for the current session.

At initialization, resolve the preference against `matchMedia('(prefers-color-scheme: dark)')`, then set root `.dark` iff effective dark, `data-theme=effective`, `data-theme-preference=preference`, and `data-palette=id`. Listen to media-query changes; update effective mode only while preference is `system`. Persist preference and palette separately. Keep DOM application in one helper/state owner and ensure the pre-paint initializer mirrors its validation and logic.

## 15. Framework-Independent Implementation

### A. HTML root and CSS switching

```html
<html
  lang="en"
  data-palette="mineral"
  data-theme="light"
  data-theme-preference="system"
>
  <head>
    <meta name="color-scheme" content="light dark" />
  </head>
  <body>
    <!-- site content -->
  </body>
</html>
```

Put the declarations from section 6.1 in a stylesheet loaded before component styles. `data-theme` must be the resolved value (`light` or `dark`); palette selectors then compose with it. Set `.dark` along with the attribute if the target's framework or utilities depend on that convention.

### B. Minimal JavaScript state, persistence, and pre-paint initialization

Place this synchronous script in `<head>` before the palette stylesheet. The same functions can be used by controls after load. Substitute unique storage keys if desired, keeping them consistent. Set CSP nonce/hash as required by the target.

```html
<script>
  (() => {
    const PALETTES = [
      'mineral',
      'oxblood',
      'signal',
      'cobalt',
      'amber',
      'original',
    ];
    const MODES = ['light', 'dark', 'system'];
    const PALETTE_KEY = 'example-site-palette';
    const MODE_KEY = 'example-site-color-mode';
    const read = (key, valid, fallback) => {
      try {
        const value = localStorage.getItem(key);
        return valid.includes(value) ? value : fallback;
      } catch {
        return fallback;
      }
    };
    const state = {
      palette: read(PALETTE_KEY, PALETTES, 'mineral'),
      mode: read(MODE_KEY, MODES, 'system'),
    };
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const effective =
        state.mode === 'system'
          ? media.matches
            ? 'dark'
            : 'light'
          : state.mode;
      const root = document.documentElement;
      root.classList.toggle('dark', effective === 'dark');
      root.dataset.theme = effective;
      root.dataset.themePreference = state.mode;
      root.dataset.palette = state.palette;
      return effective;
    };
    const persist = (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* memory state still applies */
      }
    };
    const setPalette = (value) => {
      if (!PALETTES.includes(value)) return false;
      state.palette = value;
      persist(PALETTE_KEY, value);
      apply();
      return true;
    };
    const setMode = (value) => {
      if (!MODES.includes(value)) return false;
      state.mode = value;
      persist(MODE_KEY, value);
      apply();
      return true;
    };
    media.addEventListener('change', () => {
      if (state.mode === 'system') apply();
    });
    window.appearance = { state, setPalette, setMode, apply };
    apply();
  })();
</script>
```

For strict CSP, use a nonce or a server-generated script hash. Avoid blocking page rendering on network font loads. When setting controls, update their checked state from `window.appearance.state`; never trust unvalidated DOM input.

## 16. React/Next.js Integration

Use one client provider as the sole interactive appearance state owner, with typed/validated palette and preference values. Render stable fallback HTML attributes server-side. Run a small nonce-compatible inline initializer in the document head before first paint; mirror the same defaults, validation, storage keys, media query, and root attributes in the provider. The provider should apply the stored state in a layout effect, persist changes defensively, and register/clean up a `matchMedia` change listener that acts only for System. Suppress only the root hydration warning caused by intentional attribute reconciliation, if the framework requires it. Do not render different initial control markup on server and client based on unavailable browser storage. Avoid both a post-hydration flash and a second competing theme provider.

Equivalent patterns work in Vue/Svelte: initialize root attributes in document head, hydrate a single state store from validated preferences, and subscribe to OS changes only in System mode. Plain HTML uses the standalone script above.

## 17. Accessible Appearance Selector

Use two clearly named radio groups, not six unlabeled swatches and not a third “effects” choice. Provide names in visible text; swatch color is supplementary. Native radios support keyboard navigation and checked state. A dialog should have an accessible name, close button, Escape handling, focus containment/return if modal, and work at narrow widths.

```html
<button
  id="appearance-trigger"
  type="button"
  aria-haspopup="dialog"
  aria-controls="appearance-panel"
>
  Appearance
</button>
<dialog id="appearance-panel" aria-labelledby="appearance-title">
  <h2 id="appearance-title">Appearance</h2>
  <fieldset>
    <legend>Color palette</legend>
    <label
      ><input type="radio" name="palette" value="mineral" checked /> Mineral
      Research</label
    >
    <label
      ><input type="radio" name="palette" value="oxblood" /> Oxblood
      Atelier</label
    >
    <label
      ><input type="radio" name="palette" value="signal" /> Signal Green</label
    >
    <label
      ><input type="radio" name="palette" value="cobalt" /> Cobalt &amp;
      Terracotta</label
    >
    <label
      ><input type="radio" name="palette" value="amber" /> Amber &amp;
      Graphite</label
    >
    <label
      ><input type="radio" name="palette" value="original" /> Violet &amp;
      Graphite</label
    >
  </fieldset>
  <fieldset>
    <legend>Color mode</legend>
    <label><input type="radio" name="mode" value="light" /> Light</label>
    <label><input type="radio" name="mode" value="dark" /> Dark</label>
    <label
      ><input type="radio" name="mode" value="system" checked /> System</label
    >
  </fieldset>
  <button id="appearance-close" type="button">Close</button>
</dialog>
<script>
  const trigger = document.getElementById('appearance-trigger');
  const dialog = document.getElementById('appearance-panel');
  trigger.addEventListener('click', () => dialog.showModal());
  document
    .getElementById('appearance-close')
    .addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => trigger.focus());
  const syncAppearanceRadios = () => {
    document.querySelectorAll('input[name="palette"]').forEach((input) => {
      input.checked = input.value === window.appearance.state.palette;
    });
    document.querySelectorAll('input[name="mode"]').forEach((input) => {
      input.checked = input.value === window.appearance.state.mode;
    });
  };
  syncAppearanceRadios();
  dialog.addEventListener('change', (event) => {
    const input = event.target;
    if (!input.checked) return;
    if (input.name === 'palette') window.appearance.setPalette(input.value);
    if (input.name === 'mode') window.appearance.setMode(input.value);
  });
</script>
```

Production UI should synchronize checked values from state after initialization and opening. If using native `<dialog>`, implement `showModal()` from the trigger, close on Escape/outside policy, and return focus to the trigger. The inline `onclick` is only a minimal illustrative close; prefer listeners in a module under a strict CSP.

## 18. Accessibility and Contrast

The repository's palette test checks all 12 schemes against four grounds (background, surface, card, elevated) using its own hex luminance calculation. Assertions require primary text ≥7:1; secondary and muted text ≥4.5:1; functional primary/secondary text ≥4.5:1; brand primary/secondary accents, strong border, and focus ≥3:1; and on-accent against primary accent ≥4.5:1. The test also asserts exact Violet & Graphite anchors and role relationships. These are source-test assertions, not an independent audit of every rendered component or browser-composited state.

Functional light Violet & Graphite colors differ deliberately from brand colors: muted `#616c7f`, cyan text `#006d82`, while brand cyan remains `#087b91`; dark cyan text remains `#42cbe3`. The design documentation reports tested minima across those four grounds: muted 4.61:1, cyan text 5.20:1, light functional boundaries 3.72:1, dark functional boundaries 3.29:1, and secondary text 6.82:1. This was a bounded palette-token audit, not full-site WCAG certification. Re-test every role against actual target component backgrounds, font sizes/weights, opacity, hover/disabled states, focus indicators, borders, and overlays. Do not use decorative glows or pale borders as meaningful boundaries. Convey status with text/shape as well as color.

## 19. Responsive and Reduced-Motion Behavior

Palette values themselves do not change at breakpoints. Shared styling adapts layout/diagram density: diagram canvas padding is 1.25rem by default, 1.75rem at 640px, 2.25rem at 1024px; primary diagram stroke is 3px, 3.5px at 640px, and 4px at 1024px. Primary-node padding grows to 1.5rem at 1024px. Decorative cards/dividers can be adapted or omitted on narrow layouts if they crowd content. Source page body prevents horizontal overflow, but the receiving site must test its own layouts.

Ordinary palette/material transitions are 180ms; card hover lift is 2px; diagram node transitions are modest and reduced-motion disables lift/transitions. No ambient animated palette effect or special-effects control exists. Honor `prefers-reduced-motion` in target transitions and any existing motion system.

## 20. Receiving-Website Integration Procedure

For the coding agent implementing this guide in a different repository:

1. Inspect the target architecture, runtime, route/rendering model, and current theme behavior.
2. Read its existing agent instructions and design documentation completely.
3. Identify the existing theme state owner, token files, root layout, theme initialization and appearance controls.
4. Compare existing tokens with this guide's 12 schemes and identify unavoidable naming/architecture differences.
5. Reuse existing owners and patterns; do not transplant this source site's component tree or duplicate a provider/store.
6. Add the exact CSS tokens, selector rules, aliases and (if desired) palette-scoped material styling from this guide.
7. Implement palette and Light/Dark/System selection with the existing target control architecture.
8. Add defensive persistence, valid-value fallback, pre-paint initialization and OS preference updates.
9. Exercise every palette in both effective modes (12 schemes), plus System in both OS conditions.
10. Check text, accent, border and focus contrast on target component surfaces and test responsive/reduced-motion behavior.
11. Preserve unrelated routes, content, APIs, branding and features.
12. Run the target repository's own lint, tests, build, and accessibility/browser checks.
13. Report any deviation, incompatible token, contrast exception, or behavior not reproduced; do not silently invent substitutions.

## 21. Validation and Acceptance Tests

- Confirm all six IDs and visible names, in selection order; `mineral` is default and `original` displays as Violet & Graphite.
- Verify all 12 palette/effective-mode pairs, including core backgrounds, surfaces, text, accents, borders, focus, glow, selection and shadow tokens.
- Confirm direct light/dark selection, System with OS light/dark, and live OS changes while System is active.
- Reload after choosing palette and mode; confirm persistence. Test invalid stored IDs and blocked storage without runtime failure.
- Inspect first paint with saved dark/nondefault settings; verify no default flash and root attributes/class agree.
- Check primary vs secondary roles; particularly cyan data/focus and violet control/selection/glow/action-hover/logo for `original`.
- Test focus visibility, keyboard-operated selector, radio announcements, selection text contrast, and reduced motion.
- Check target card/hero/diagram treatments only where used; ensure no overflow at narrow widths and no state is communicated by hue alone.
- Run target-specific unit/component/E2E/lint/build tests; record exact outcomes. The source project's test totals are not a substitute for target validation.

## 22. Troubleshooting

| Symptom                                   | Likely cause / correction                                                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nondefault dark uses Mineral colors       | Dark selector too weak or loaded too early. Preserve the combined palette+dark selector and load overrides after default dark.                                                 |
| First-paint flash                         | Initializer ran after paint/hydration, or initial server attributes disagree with script defaults. Run synchronously in head before palette CSS and share validation/defaults. |
| OS preference overrides manual mode       | Media listener applies unconditionally. Resolve OS mode only when preference is `system`.                                                                                      |
| Root attributes disagree                  | Set `data-theme` to effective value, `.dark` to match it, and preference to the stored choice.                                                                                 |
| Violet text looks too bright/dim          | Use `--color-accent-primary-text` for text and primary brand token for data/focus; preserve secondary violet role.                                                             |
| System UI controls use wrong native theme | Set `color-scheme: light` or `dark` in each effective scheme selector.                                                                                                         |
| Storage throws                            | Wrap property access and get/set separately; keep validated in-memory state usable.                                                                                            |
| Missing font differs between computers    | Stacks use system fallbacks; browser/OS font availability changes rendering. Add a licensed web font only if the target independently chooses to.                              |

## 23. Known Limitations

The guide captures committed source declarations and documented palette test assertions. Those tests use hex luminance and four flat grounds; they do not constitute exhaustive composited/browser contrast certification. Exact appearance also depends on receiving-site typography availability, component geometry, content, browser rendering and layout. The source has static palette-specific utility treatments, but the target's equivalent component selectors must be adapted. No standalone source-independent guarantee can prove that a receiving site has integrated every token correctly.

## 24. Source-to-Guide Traceability Matrix

| Concern                                                | Source authority                                                    | Guide location |
| ------------------------------------------------------ | ------------------------------------------------------------------- | -------------- |
| Registry, storage keys, defaults                       | `src/lib/constants.ts`, `src/types/theme.ts`                        | §§4–5, 14, 15  |
| Exact scheme tokens and selectors                      | `src/styles/tokens.css`, `theme.css`, `palettes.css`                | §6.1           |
| CSS order and root/global surfaces                     | `src/app/globals.css`                                               | §§7–9          |
| Palette material, typography, section, hero treatments | `src/styles/utilities.css`                                          | §§10–11, 19    |
| State validation, fallback and system resolution       | `src/lib/theme.ts`, `ThemeProvider.tsx`, `theme-script.tsx`         | §§8, 14–17     |
| Accent consumers                                       | `HomeHero.tsx`, `LinkButton.tsx`, `SiteLogoMark.tsx`, palette rules | §12            |
| Diagram token inheritance                              | `src/styles/diagrams.css`, `docs/DIAGRAM_DESIGN.md`                 | §13, §19       |
| Contrast contract and limitations                      | `tests/content/palette-styles.test.ts`, `docs/DESIGN.md`            | §18            |
| Runtime behavior and full scheme matrix                | appearance runtime and `tests/e2e/appearance-matrix.spec.ts`        | §§14, 21       |

## 25. Coding-Agent Implementation Checklist

- [ ] Read target instructions and theme/design documentation; map current owners before editing.
- [ ] Preserve palette order, exact IDs/names, all CSS values, aliases, and primary/secondary semantics.
- [ ] Install base, Mineral dark, and palette selectors with tested specificity and load order.
- [ ] Keep `data-theme` effective (`light`/`dark`), preference separate (`light`/`dark`/`system`), and `.dark` synchronized.
- [ ] Validate stored values, tolerate inaccessible storage, persist choices, and follow OS changes only in System mode.
- [ ] Apply saved settings before first paint without creating a hydration mismatch or duplicate state owner.
- [ ] Implement two accessible preference groups and no effects preference.
- [ ] Validate all twelve schemes, role-specific contrast, interaction states, responsive layout, and reduced motion.
- [ ] Preserve unrelated website behavior and run the target repository's own checks.
- [ ] Report exact deviations, limitations, and test results.
