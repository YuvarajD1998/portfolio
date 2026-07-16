# Sprint 01 — Project Foundation & Engineering Setup

**Record** (Playbook §08). Written for the engineer who joins in month six.

## Objective

Create the complete, production-ready project foundation — architecture,
tooling, tokens, theme, shell, primitives and guardrails — so every later sprint
adds features without revisiting a foundational decision. **No portfolio page
was built.**

## What was implemented

- **Project & tooling.** Next.js 15 (App Router) · TypeScript strict · pnpm ·
  Tailwind v4 · ESLint (flat, with import-boundary rules) · Prettier (+ Tailwind
  class sort). Path alias `@/*` → `src/*`. Scripts: `dev/build/start/typecheck/
lint/format/test/verify`.
- **Folder architecture** (§03) — the full layered tree with barrel exports and
  a lint-enforced import boundary (primitives can't import up).
- **Design tokens** (§04) — the entire Design Bible §15 set as CSS variables in
  `styles/tokens.css`, plus the families §04 lists (opacity, borders,
  breakpoints, containers, durations, easing, z-index). Exposed to Tailwind via
  `@theme inline` so tokens swap at runtime.
- **Theme** (§05) — light + dark as token remaps; single `ThemeProvider`;
  system-preference detection; localStorage persistence; a pre-hydration script
  that prevents FOUC; an accessible `ThemeToggle`.
- **Global styles & shell** (§06) — reset/base type, focus ring, selection,
  scrollbar, skip link, reduced-motion; root `layout.tsx` wiring fonts +
  providers + shell + JSON-LD; `AppShell` (SkipLink/Header/main/Footer);
  `error`/`loading`/`not-found`/`global-error` placeholders. Fonts via
  `next/font` (Newsreader, Hanken Grotesk, IBM Plex Mono).
- **Primitives** (§07) — 11 layout & text primitives (Container, Section, Stack,
  Grid, Flex, Spacer, Heading, Text, Link, Divider, Surface), each declaring the
  eight facets, token-styled and theme-aware. No page imports them yet.
- **Utility / icon / motion** (§08) — `cn()`, a11y/media-query/reduced-motion
  helpers, a single `Icon` wrapper, and reusable motion presets. No page
  animation.
- **A11y & SEO** (§09) — skip link, focus ring, landmarks, reduced-motion;
  Metadata API defaults + canonical helper, OG/Twitter defaults, `robots.ts`,
  `sitemap.ts` (placeholder), `manifest.ts`, `icon.svg`, and a Person JSON-LD
  helper.
- **Performance & env** (§10) — typed `config/env.ts`, `config/site.ts`,
  `next/image` AVIF/WebP, analytics placeholder slot, `.env.example`.
- **Testing** (§11) — Vitest + RTL, jsdom setup, coverage (v8). 18 passing tests
  across `cn`, a11y math, `Icon`, `Heading`, and the theme provider.
- **Docs** — README, CLAUDE.md, DESIGN.md, this record.

## Architectural decisions

- **Tokens are the only home for literals** — enforced by convention + review;
  a raw-value lint rule lands with the design system (S02).
- **Dark = token remap, not parallel styles.** Components never branch on theme.
- **`@theme inline`** (not static `@theme`) so token references stay live and
  swap at runtime under `[data-theme]`.
- **Server-first components**; `'use client'` only for the theme provider,
  toggle and hooks that touch `window`.
- **Import boundaries** in ESLint so the layered architecture can't erode.

## Acceptance (all met)

`A1` Next.js configured · `A2` Tailwind v4 integrated · `A3` tokens as CSS
variables · `A4` theme works (light/dark/persisted, no flash) · `A5` folder
architecture finalised · `A6` shared utilities & primitives exist · `A7` root
layout, SEO, motion & a11y foundations complete · `A8` testing/linting/
formatting working.

**Definition of done:** `pnpm build` succeeds with zero warnings or errors; all
8 routes prerender; the app contains no portfolio page. `typecheck`, `lint`,
`test` and `format:check` are green.

## Known limitations

- `next start` under pnpm can fail to resolve vendor chunks (a pnpm/Next serving
  quirk, not a build failure). Verified via `pnpm dev`; production runs on
  Vercel. Add `output: 'standalone'` if a local prod server is needed.
- Primitive test coverage is partial by design — they're exercised once pages
  consume them (S02 hardens the library with full facet tests).
- OG image is a referenced placeholder path; the templated `next/og` image is
  produced in the SEO sprint (S17).
- Social links in `config/site.ts` are placeholders pending real handles.

## Future dependencies

- **S02 (Design system)** consumes `styles/tokens.css` and the primitives; adds
  Button/Card/Tag/Input/Field and the raw-value lint rule.
- **S03 (Layout & nav)** composes real navigation into `SiteHeader` and the
  mobile Sheet.
- **S04+ (Pages)** mount into `AppShell`; content pipeline (MDX/JSON) added then.

## Follow-up tasks

- [ ] Add the no-hardcoded-value ESLint rule (with the DS, S02).
- [ ] Produce the templated OG image (S17).
- [ ] Wire Vercel Analytics + Web Vitals (later sprint).
- [ ] Add Playwright + axe E2E once flows exist (S13+/hardening).
- [ ] Replace placeholder social handles and contact endpoint.
