# Datum — Yuvaraj's Engineering Portfolio

The production codebase for Yuvaraj's engineering portfolio, built on the
**Datum** design system. Flagship case study: **Transpahire** (AI recruitment
platform).

This repository is the implementation of an approved eleven-phase design and
engineering specification. The code introduces **no new design decisions** — it
faithfully implements the approved phases (Design Bible P05, Frontend Blueprint
P10, Production Playbook P11).

> **Status — Sprint 01 (Project Foundation) complete.** The repository holds
> the architecture, tokens, theme, shell, primitives and guardrails. **No
> portfolio page has been built yet** — that begins in Sprint 04.

---

## Stack

| Concern         | Choice                                |
| --------------- | ------------------------------------- |
| Framework       | Next.js 15 (App Router)               |
| Language        | TypeScript (strict)                   |
| Styling         | Tailwind CSS v4 (CSS-variable tokens) |
| Animation       | Motion                                |
| Icons           | Lucide React (wrapped)                |
| UI primitives   | Radix UI (`@radix-ui/react-slot`)     |
| Lint / format   | ESLint (flat) · Prettier              |
| Testing         | Vitest · React Testing Library        |
| Package manager | pnpm                                  |
| Deployment      | Vercel                                |

## Requirements

- Node.js ≥ 20.11
- pnpm ≥ 9

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional; sensible defaults ship in-code
pnpm dev                     # http://localhost:3000
```

## Scripts

| Script               | What it does                                     |
| -------------------- | ------------------------------------------------ |
| `pnpm dev`           | Start the dev server.                            |
| `pnpm build`         | Production build (fails on any type/lint error). |
| `pnpm start`         | Serve the production build.                      |
| `pnpm typecheck`     | `tsc --noEmit`.                                  |
| `pnpm lint`          | ESLint (Next core-web-vitals + project rules).   |
| `pnpm format`        | Apply Prettier (+ Tailwind class sort).          |
| `pnpm format:check`  | Verify formatting.                               |
| `pnpm test`          | Run the Vitest suite once.                       |
| `pnpm test:watch`    | Watch mode.                                      |
| `pnpm test:coverage` | Coverage report (v8).                            |
| `pnpm verify`        | typecheck → lint → test → build (the full gate). |

> **Note on `pnpm start`:** with pnpm's symlinked layout, `next start` can fail
> to resolve vendor chunks (`Cannot find module ./vendor-chunks/...`). This is a
> pnpm/Next serving quirk, **not** a build failure — `pnpm build` succeeds and
> prerenders every route. Use `pnpm dev` locally; production is served by Vercel,
> which builds and runs in its own environment. If a local production run is
> needed, add `output: 'standalone'` to `next.config.mjs` and run the standalone
> server.

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** — conventions, architecture and how future
  sprints add components. Read this before contributing.
- **[DESIGN.md](./DESIGN.md)** — the token system and how the design maps to code.
- **[docs/sprint-01.md](./docs/sprint-01.md)** — the Sprint 01 record.

## License


Private. All rights reserved.



