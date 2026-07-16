# DESIGN.md — The Datum Token System in Code

How the approved Design Bible (Phase 05) maps to this codebase. This is the
bridge between design and code: **design and code reference token names, never
raw values.** Change a token in one place and the whole system moves in lockstep.

> Authority: the [Design Bible P05] is binding and supersedes preference. This
> document does not reinterpret it — it records how it is wired.

---

## Where tokens live

| File                     | Role                                                        |
| ------------------------ | ----------------------------------------------------------- |
| `src/styles/tokens.css`  | **The only home for literal values.** All `--token` decls.  |
| `src/styles/globals.css` | `@theme inline` mapping tokens → Tailwind utility names.    |
| `src/theme/tokens.ts`    | TS mirror for code that needs a token outside CSS (motion). |

A raw hex / px / ms outside `tokens.css` is a defect (Bible §15, §16).

## How consumption works

1. `tokens.css` declares `--paper: #faf8f4;` (and its dark remap).
2. `globals.css` exposes it to Tailwind: `--color-paper: var(--paper);`.
3. A component writes `className="bg-paper"` — which resolves to the variable,
   so it **swaps at runtime** under `[data-theme]` with no rebuild.

## Colour — one warm spine, one signal

| Token           | Light     | Role                             |
| --------------- | --------- | -------------------------------- |
| `--paper`       | `#FAF8F4` | Base canvas (warm, never white). |
| `--surface`     | `#F1EEE7` | Raised cards, panels.            |
| `--sunken`      | `#EAE6DD` | Wells, insets, tracks.           |
| `--hairline`    | `#DED9CE` | Borders, datum rules.            |
| `--ink`         | `#17150F` | Primary text (≈15:1).            |
| `--graphite`    | `#55514A` | Body text (>7:1).                |
| `--mute`        | `#8A857A` | Labels (>4.5:1).                 |
| `--signal`      | `#1B3AD6` | Links · focus · primary action.  |
| `--signal-tint` | `#E7EAFC` | Selection · active background.   |
| `--success`     | `#1F7A54` | Confirmed · passing.             |
| `--warning`     | `#B47318` | Caution · pending.               |
| `--danger`      | `#B23A2E` | Error · destructive.             |
| `--info`        | `#2C6E8F` | Neutral notice.                  |

Tailwind names: `bg-paper`, `text-ink`, `border-hairline`, `text-signal`, …

**Rules:** never a second accent competing with Signal; never a gradient
background (none defined); never signal by colour alone (pair with icon/label).

## Typography — three families, closed scale

| Family         | Job                  | Var              |
| -------------- | -------------------- | ---------------- |
| Newsreader     | Display / headings   | `--font-display` |
| Hanken Grotesk | Body / UI            | `--font-ui`      |
| IBM Plex Mono  | Mono / labels / code | `--font-mono`    |

Fonts load via `next/font` (self-hosted, subset, `display: swap`, zero CLS) in
`src/theme/fonts.ts`. Scale steps: `--fs-display … --fs-label`. Never add a
family, weight or size outside the scale (Bible §04, §17).

## Spacing — 4px base, 8px pulse

`--space-1`(4) `-2`(8) `-3`(12) `-4`(16) `-5`(20) `-6`(24) `-8`(32) `-10`(40)
`-12`(48) `-16`(64) `-20`(80) `-24`(96) `-30`(120) `-40`(160).

A value off this scale (18, 28, 52…) is a bug. Density lives _within_ a section
(16–32); air lives _between_ sections (80–160).

## Radius & elevation — near-square, depth by hairline

Radius: `--radius-sm`(2) `-md`(4) `-lg`(6, max) `-0`(0). Never past 6px, no pills.
Elevation ladder: `--e0` flat (default) · `--e1` raised · `--e2` overlay ·
`--e3` modal. Resting cards get a hairline border, **not** a shadow.

## Motion — quick, explanatory

Durations: `--dur-instant`(100) `-micro`(160) `-standard`(240) `-entrance`(360).
Single curve: `--ease: cubic-bezier(.2,.8,.2,1)`. Presets in
`lib/motion/presets.ts` animate only `transform`/`opacity` and honour
`prefers-reduced-motion`. No decorative or looping motion (Bible §10, §17).

## Layout — one grid, measured from the datum

`--container: 1200px` (max content), `--measure: 680px` (max reading width).
Breakpoints: `--bp-sm`(640) `-md`(960) `-lg`(1280) — components respond _within_
them, never around them. Left-align by default; the left datum edge is sacred.

## Theme remap (light → dark)

The dark companion (`[data-theme="dark"]` in `tokens.css`) remaps the same token
names. Notable: `--mute` lifts to `#A29C90` to clear WCAG AA at small sizes
(closes defect D-01 / risk R-05 at the token layer). Signal lifts to `#5E77FF`.

## The absolute constraints (Bible §17)

Never: exceed 1200/680 · use an off-scale value · add a second accent · use a
gradient background · add a font/weight/size off the scale · mix card styles ·
add a shadow outside E0–E3 · round past 6px or use pills · ship a circular
avatar or fake dashboard · signal by colour alone · use AI/stock imagery as
content · drop a focus state or go below AA · **hard-code a value that has a
token** · break the datum-line section signature.

> When in doubt, remove it and add space. Establish the datum, then measure
> everything from it.
