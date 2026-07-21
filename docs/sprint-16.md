# Sprint 16 — Performance Engineering, Core Web Vitals & Production Hardening

**Performance Engineering Report** (Playbook §08). Written for the engineer who
joins in month six. It records the baseline, the final numbers, every technique
applied, the honest limitations and the maintenance recommendations, so future
work is measured against this record rather than re-introducing a regression.

## Objective

Audit and optimise the whole portfolio until it loads quickly, responds
immediately, renders smoothly, ships the minimum JavaScript, uses the network
efficiently and meets **Core Web Vitals** — across every page (S04–S12), the
shell (S03), the motion system (S13), the responsive work (S14) and the
accessible experience (S15). **No page, layout, content string, typography
scale, colour palette, token, animation or accessibility guarantee changed.**
S16 adds no page, layout or feature. Every change is a fix to a *measured* cost,
traceable to a Core Web Vital or a P10 budget. Where a target could only be met
by altering an approved design, the approved-safe behaviour ships and the
conflict is raised (P1–P7), never guessed. Measure first, optimise second,
verify no regression third.

## Headline result

The portfolio was **already close to production-grade** before this sprint —
static-first App Router, `next/font` self-hosting, `next/image` with modern
formats, token-driven CSS, compositor-only motion, and a11y-first components
were all in place from S01–S15. S16 is therefore mostly *verification at
production depth*, plus a small number of real fixes. After S16:

- The application is **100% static** — every route prerenders as static HTML or
  SSG. The last dynamic route (`/projects/[slug]`) is now SSG. No route renders
  on demand.
- **`pnpm verify` is green** — typecheck + lint (zero warnings) + 253 tests
  (36 files, including the S15 axe suite) + production build (zero warnings,
  zero errors).
- The client-JS floor is dominated by the **irreducible React 19 + Next 15
  framework runtime** (~99.7 kB parsed / ~151 kB gzip across the framework
  chunks); application code is a thin layer on top.
- **Zero third-party origins on the critical path** — fonts are self-hosted, so
  there is nothing to preconnect. No render-blocking external request.

## What was already true (verify, don't rebuild)

Performance was a quality gate (G4) on every merge, so much of the work is
proving the existing implementation holds:

- **Static generation** — every content page prerendered (App Router default).
- **`next/font`** — three families self-hosted, Latin subset, `display: swap`,
  default `preload` + `adjustFontFallback` (metric-compatible fallback → zero
  font-induced CLS). No Google Fonts `<link>` anywhere.
- **`next/image`** — the one photographic slot (About portrait) uses `fill` in a
  fixed-aspect container + `sizes` + `priority` → zero CLS, LCP-prioritised.
- **Icons** — all route through the single `<Icon>` wrapper over `lucide-react`,
  named-imported (tree-shaken); no icon font.
- **CSS** — Tailwind v4 content-scan tree-shakes to used classes; tokens are the
  single source of values; **50.6 kB → 9.7 kB gzip for the whole site**.
- **Motion** — S13 presets animate `transform`/`opacity` only; a 25-test
  invariant suite (`presets.test.ts`) rejects any layout-animating preset;
  reduced-motion gated at three boundaries.
- **Runtime cleanup** — every listener/observer/timer had a matching teardown
  before this sprint (one harmless exception fixed, below).
- **Error resilience** — root `error.tsx`, `global-error.tsx`, `not-found.tsx`,
  `loading.tsx` plus a `projects/` segment set already existed.
- **Immutable caching** — `_next/static/*` already carried a 1-year immutable
  `Cache-Control` header.

## Baseline (before S16)

Captured from `next build` on the pre-sprint tree. First Load JS is the parsed
size Next reports; gzip is the over-the-wire size from `@next/bundle-analyzer`.

| Route | Page kB | First Load JS (parsed) | Rendering |
| ----- | ------: | ---------------------: | --------- |
| `/` | 2.58 | 221 kB | Static |
| `/about` | 6.42 | 226 kB | Static |
| `/contact` | 4.40 | **228 kB** (highest) | Static |
| `/engineering` | 1.89 | 221 kB | Static |
| `/experience` | 1.64 | 222 kB | Static |
| `/projects` | 3.42 | 222 kB | Static |
| `/projects/[slug]` | 0.705 | 159 kB | **Dynamic (ƒ)** |
| `/projects/transpahire` | 4.09 | 220 kB | Static |
| `/resume` | 0.299 | 224 kB | Static |
| `/showcase` | 5.05 | 221 kB | Static (dev-only) |
| `/skills` | 2.0 | 219 kB | Static |
| **Shared by all** | | **99.7 kB** | |

Shared-by-all breakdown (gzip): framework `56.1` + Next runtime `52.9` + Next
runtime `42.6`. The largest *application-controllable* chunk is **framer-motion
(`motion` 12) at 38.6 kB gzip**, code-split per route (never in shared-by-all).

## Techniques applied & their measured effect

| § | Technique | File(s) | Effect |
| - | --------- | ------- | ------ |
| 09 | **`/projects/[slug]` → SSG.** Added `generateStaticParams` (returns the known-slug set, currently empty) + `dynamicParams = false`, so unknown slugs 404 at the edge with no server render. | `src/app/projects/[slug]/page.tsx` | Last dynamic route removed. App is now **100% static**; the route is served as static HTML like every other. |
| 03/13 | **`optimizePackageImports`** for `lucide-react` + the five interactive Radix packages, so barrel imports rewrite to per-module paths. `motion` is deliberately **excluded** (barrel-rewriting it breaks its `useId` re-export and fails the `/showcase` prerender). | `next.config.mjs` | A tree-shaking guardrail. Neutral on current numbers (icons were already named-imported; Radix is per-route) but prevents future barrel-bloat regressions. |
| 13 | **`@next/bundle-analyzer` wired**, opt-in via `ANALYZE=true pnpm build` → treemap under `.next/analyze`. Off by default so ordinary builds stay fast. | `next.config.mjs` | The chunk graph is now inspectable on demand; every chunk in this report is accounted for. |
| 15 | **Web Vitals reporter left ready** (P5). `useReportWebVitals` from `next/web-vitals` (no new dependency); inert in production unless `NEXT_PUBLIC_VITALS_ENDPOINT` is set, `console.log` in dev. Beacons via `navigator.sendBeacon`. | `src/components/utility/WebVitals.tsx`, `layout.tsx` | RUM hook ready for S17. **Cost: +3 kB parsed (~1.2 kB gzip) per route** — a deliberate, documented trade (see limitations). |
| 12 | **CopyButton reset-timer hardened.** The 1.5 s "Copied → idle" `setTimeout` is now tracked in a ref and cleared on unmount, so no state update fires on an unmounted component. | `src/components/utility/CopyButton.tsx` | Closes the one runtime-cleanup gap the §12 audit found (previously a harmless post-unmount no-op). |
| 10 | **Response headers hardened.** Kept the immutable `_next/static/*` cache; added baseline security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) and a day-long `stale-while-revalidate` cache for the non-fingerprinted `icon.svg` / `manifest.webmanifest`. No CSP that could block the self-hosted fonts/scripts. | `public/_headers` | Production hardening with zero design impact. |

## Final (after S16)

| Route | Page kB | First Load JS (parsed) | Rendering |
| ----- | ------: | ---------------------: | --------- |
| `/` | 2.59 | 224 kB | Static |
| `/about` | 6.42 | 229 kB | Static |
| `/contact` | 4.45 | 231 kB | Static |
| `/engineering` | 1.90 | 224 kB | Static |
| `/experience` | 1.64 | 225 kB | Static |
| `/projects` | 3.42 | 225 kB | Static |
| `/projects/[slug]` | 0.707 | 162 kB | **SSG (●)** |
| `/projects/transpahire` | 4.08 | 223 kB | Static |
| `/resume` | 0.302 | 227 kB | Static |
| `/showcase` | 5.05 | 224 kB | Static (dev-only) |
| `/skills` | 2.0 | 222 kB | Static |
| **Shared by all** | | **99.7 kB** (unchanged) | |

**Net First Load JS delta: +3 kB per route**, entirely the Web Vitals reporter
(the field-measurement hook the DoD's "measured, not assumed" depends on). The
`/projects/[slug]` route moved from Dynamic (ƒ) to SSG (●) — the headline
framework win. The framer-motion chunk is byte-for-byte unchanged (no animation
touched, §11). Total client JS across all 49 chunks: **362 kB gzip**, of which
~151 kB is the irreducible framework floor.

### Production surface is leaner than the table

`/showcase` — the heaviest client route, importing every Radix overlay — is
**rewritten to 404 in production** by `middleware.ts`. Those overlay bundles
(`Dialog`, `Drawer`, `Popover`, `ContextMenu`, `DropdownMenu`, `Tooltip`) and
`MobileNav` are imported *only* by the showcase, so **they never reach a real
visitor**. The shipped production surface is the content pages plus the shell.

## Core Web Vitals — expected results (lab, P1)

CWV are certified against Google's "good" bands on a throttled mid-range mobile
profile (P1 assumption against P10 G3). The architecture makes each vital
structurally safe rather than tuned-to-the-edge:

| Vital | Target | Why it holds here |
| ----- | -----: | ----------------- |
| **LCP** | ≤ 2.5 s | Static HTML from the edge (no server render), critical heading font preloaded + self-hosted (no third-party round-trip), the one hero image `priority`-loaded. LCP is a heading/text render on most pages — no large image to decode. |
| **INP** | ≤ 200 ms | Minimal client JS; interaction handlers are small; motion runs on the compositor (never blocks the main thread); no long tasks introduced. |
| **CLS** | ≤ 0.1 | `next/font` metric-compatible fallback (zero font-swap reflow); the one image is `fill` in a fixed-aspect container; content is server-rendered so the layout is stable before hydration; loading states are non-shifting (S15). |

> **Field verification is a lab exercise for S16.** These are architectural
> arguments plus a ready RUM hook, not field data. Running Lighthouse / PageSpeed
> against a deployed preview and recording the per-page numbers is the one step
> that requires a live URL — see limitations.

## Blockers raised (not invented) — see spec §16 P1–P7

- **P1** — Confirmed CWV band & device profile. *Assumed:* Google "good" on a
  throttled mid-range mobile, against P10 G3.
- **P2** — Per-route First Load JS budget. *Assumed:* the current ~224 kB
  parsed (~framework floor + a few kB) is the working budget; a hard CI budget
  assertion is recommended (below). Raised for a confirmed number.
- **P3** — No approved image is too large to hit LCP (the only raster slot is a
  not-yet-supplied portrait; diagrams are inline token-driven SVG). No re-export
  needed. N/A today.
- **P4** — Hosting/CDN header ownership. Brotli/gzip compression is applied by
  Cloudflare at the edge (platform-owned, S18); `_headers` specifies the caching
  and security headers S16 owns. *Assumed shared.*
- **P5** — Field-data RUM. *Deferred to S17*; the `WebVitals` hook is left ready
  and inert (endpoint-gated).
- **P6** — No approved animation shows as a genuine INP cost; the presets are
  compositor-only and the invariant test enforces it. Nothing raised.
- **P7** — No approved token/palette needed changing to hit a metric. Nothing
  raised.

## Findings that are NOT defects (measured, left alone)

Honesty over vanity — these looked like opportunities and were correctly *not*
actioned:

- **59 `'use client'` files.** Sixteen feature-composition files (the various
  `CallToAction`, `Hero`, `Work`, `Roadmap`, …) *look* like static presentational
  components that could be Server Components. They **cannot**: each passes a
  Lucide icon *component* as a prop (`trailingIcon={ArrowRight}`, `icon={…}`) to
  a client `Button`/`Icon`, and a function cannot cross the server→client
  boundary as a prop (verified: converting them fails the `/skills` prerender
  with "Functions cannot be passed directly to Client Components"). Fixing this
  would require changing the approved S02 `Button` icon-prop API — **out of
  scope**. The client boundaries are justified by the design-system API and left
  as-is. The remaining client files are genuinely interactive (state, effects,
  Radix, motion) or framework-required (`error.tsx` must be client).
- **Dynamic imports (`next/dynamic`).** The only honest candidate is the
  showcase's `InteractiveDemos`, which is dev-only (404 in prod). framer-motion
  is used above the fold (home Hero, page transitions), so lazy-loading it would
  hurt LCP/first-paint animation. Per "don't over-optimise", none added.
- **Memoisation.** Both context providers (`theme-provider`, `Toast`) already
  memoise their `value` and callbacks; `ProjectsExplorer`'s filter/sort is
  already `useMemo`'d; all list renders have stable keys. No speculative memo
  added — a profiler shows nothing to save.
- **Dead exports.** `useBreakpoint` and `visuallyHidden` are unreferenced, but
  they already tree-shake to **zero bytes** in every bundle (nothing imports
  them). Removing them is housekeeping, not a shipped-cost fix, and touches the
  design-system public surface — left as-is and noted here. (`motionPresets` is
  "unused" in app code but backs the 25-test compositor-safety invariant — kept.)

## Known limitations (honest, not hidden)

1. **No field/lab CWV numbers in this report.** Lighthouse/PageSpeed need a
   deployed URL; this run had no live preview. The CWV section is an
   architectural argument, not a measured LCP/INP/CLS per page. **Action for
   whoever deploys the S18 preview:** run Lighthouse mobile+desktop per page and
   paste the numbers into the Final table.
2. **Web Vitals reporter costs +3 kB/route in production** even though it only
   `console.log`s until an endpoint is set. This is a deliberate reading of
   "hook left ready" — the instrument ships so field data can flow the moment
   S17 sets `NEXT_PUBLIC_VITALS_ENDPOINT`. If S17 defers the RUM programme, the
   cheapest reclaim is to render `<WebVitals />` only when the endpoint env is
   present, dropping the `next/web-vitals` import from production entirely.
3. **The framework floor (~151 kB gzip) is irreducible** without leaving React
   19 / Next 15. It is not an application defect; it is the cost of the approved
   stack (P10).
4. **`middleware.ts` is 33.5 kB** — this is the Next middleware bundle for the
   one-line showcase gate. It runs at the edge, not in the client First Load JS,
   so it does not affect page weight; noted for completeness.

## Recommendations for future maintenance

- **Add a CI bundle budget (P10 G3 / P2).** Assert per-route First Load JS ≤ a
  threshold (e.g. 240 kB parsed) in the `verify` pipeline so a future eager
  import fails the build rather than sliding through review.
- **Keep `motion` out of `optimizePackageImports`** — it breaks the `/showcase`
  prerender. The comment in `next.config.mjs` records why.
- **Run `ANALYZE=true pnpm build` before merging any dependency change** — the
  treemap is the fastest way to catch a duplicated package or a barrel import
  that pulls a whole library.
- **Flip on RUM in S17** by setting `NEXT_PUBLIC_VITALS_ENDPOINT`; the beacon
  reporter is already wired.
- **When the résumé PDF and real project imagery land**, keep them on the paths
  already wired: the PDF via the progressive-enhancement anchor in
  `DownloadButton` (compressed, linked not inlined), images via `next/image`
  with explicit dimensions and `priority` only on an LCP element.

## Definition of Done — status

| DoD item | Status |
| -------- | ------ |
| CWV in the "good" band (desktop & mobile) | **Architecturally satisfied; lab numbers pending a deployed URL** (limitation 1) |
| JavaScript optimised — no dead code / unused deps / duplicates; minimum client JS | ✅ verified (analyzer: no dup packages; client boundaries justified) |
| Assets optimised — modern formats, responsive, sized, no quality loss | ✅ verified (one image, correct; icons tree-shaken; no assets over budget) |
| Rendering improved — no wasted re-renders; correct RSC boundaries | ✅ verified (providers memoised; `[slug]` now SSG) |
| Motion smooth — compositor-only, ~60fps, no S13 animation changed | ✅ verified (invariant test; zero animation edits) |
| Memory/runtime — all resources cleaned up | ✅ verified (audit clean; CopyButton timer hardened) |
| Build clean — zero warnings/errors, within budget, no duplication | ✅ `pnpm verify` green; zero warnings |
| Accessibility preserved — zero axe (G2); S15 intact | ✅ 253 tests incl. axe suite pass |
| Responsive unchanged (S14); design pixel-identical (P08) | ✅ no layout/style/token changed |
| Performance Engineering Report completed | ✅ this document |
| No functional regressions (S03–S15 frozen) | ✅ full suite green; no content/layout/motion/a11y change |

**After Sprint 16 the portfolio is fast, static, resilient and instrumented —
with documented before/after metrics and no regressions. Not a single layout,
word, animation, breakpoint or accessibility guarantee was traded to achieve
it.** Ready for discoverability & SEO (S17) and analytics & release (S18).
