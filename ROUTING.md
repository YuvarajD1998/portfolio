# ROUTING.md — Application Shell, Routing & Navigation

How the portfolio's shell is wired: the routes, the layout hierarchy, the
navigation model, the page templates, and the conventions a future sprint
follows to add a route without touching the shell (Sprint 03).

**The golden rule of this sprint:** future sprints replace placeholders with
real page content — they never rebuild the shell, routing or navigation. If a
task writes words a visitor reads as the site's message, it belongs to a later
sprint (S03 §01).

---

## Routing strategy

The App Router mirrors the approved IA site-map tree (P06 §03) exactly. A route
that isn't in the IA is not invented; a route that is must resolve.

```
app/
├─ layout.tsx                              Root layout — the shell (all routes)
├─ page.tsx                                /                    Home
├─ loading.tsx  error.tsx  global-error.tsx  not-found.tsx      Shell surfaces
├─ about/page.tsx                          /about
├─ experience/page.tsx                     /experience
├─ skills/page.tsx                         /skills
├─ resume/page.tsx                         /resume
├─ contact/page.tsx                        /contact
└─ projects/
   ├─ page.tsx                             /projects            "Work" index
   ├─ loading.tsx  error.tsx               Segment loading + error boundary
   ├─ [slug]/page.tsx                      /projects/:slug      Future case studies
   └─ transpahire/
      ├─ page.tsx                          /projects/transpahire        Flagship
      └─ engineering/page.tsx              /projects/transpahire/engineering
```

Notes:

- **Transpahire is a project-detail slug, not a top-level route** (P06 §03). It
  ships as a dedicated `transpahire/` folder — the seed instance of the
  `/projects/[slug]` spine — because it has bespoke depth (its own
  `engineering/` child) that generic future studies don't yet define. A
  dedicated segment wins over the dynamic `[slug]` segment in the App Router.
- **`/projects/[slug]`** serves future case studies. Until their content lands,
  it recognises no slug and calls `notFound()`, rendering the segment's
  `not-found.tsx` (branded, in-voice, with a way back), so the route always
  resolves and never shows an empty page. The unknown-slug metadata is
  `noindex`. (Note: `notFound()` from a dynamic route renders the 404 UI but the
  HTTP status is 200 — a documented Next.js App Router streaming behaviour; a
  route with no match at all, e.g. `/nope`, still 404s via the root
  `not-found.tsx`.) Add a slug to `KNOWN_SLUGS` (with content) in a later sprint.
- **Engineering** (`/projects/transpahire/engineering`) is a child of the
  Transpahire case study, not a nav item (P06 §03).
- No Next.js route groups (`(site)`) are used — the design specifies one global
  shell for every page, which the root layout already provides.

## Layout hierarchy

```
RootLayout (app/layout.tsx)                 <html> · fonts · theme script · metadata
└─ Providers                                ThemeProvider → ToastProvider
   └─ AppShell (layouts/AppShell.tsx)       skip link · header · main · footer + helpers
      ├─ SkipNavigation                     first tab stop → #main-content
      ├─ SiteHeader                         sticky, hide-on-scroll header
      ├─ <main id="main-content">           the route's page renders here
      │  └─ {page}                          picks a template from templates/
      ├─ SiteFooter                         the site index of record
      ├─ ScrollToTop                        back-to-top affordance
      └─ RouteAnnouncer                     SR route-change announcements + focus
```

Every route mounts inside `AppShell`, so error and loading surfaces render
**inside the shell** — the header, footer and theme stay intact when a route
fails or is pending (S03 §12). A failed route never drops to a bare browser
error: `error.tsx` (route boundary) → `global-error.tsx` (layout-level
last resort).

## Navigation architecture

Navigation is **data-driven from one file**: `src/config/navigation.ts`. Add a
route there and it appears in the header (if listed in `primaryNav`), the footer
index, the sitemap, and route-existence tests — without touching a component.

- **`routes`** — the typed route model (href, label, title, description) every
  surface reads from.
- **`primaryNav`** — the four-item header model: **Work · About · Contact**,
  with **Resume** rendered separately as a CTA and the logotype returning home
  (P06 §04). `Work` points at `/projects`.
- **`footerColumns`** — the footer's full site index, grouped for layout.

Active state: `isActivePath(pathname, href)` (`lib/active-path.ts`) — home
matches only `/`; every other link matches its path and any nested path, so
`/projects` ("Work") stays current inside `/projects/transpahire`. The active
item carries `aria-current="page"` and is signalled by weight + underline, not
colour alone.

- **Desktop** — `NavigationBar` of `NavItem`s at `md+`.
- **Mobile** — a `MobileNav` drawer (built on the Radix Dialog overlay, so focus
  trap, Esc and overlay dismissal are inherited) below `md`. The `NavToggle`
  owns the open state; the panel closes on route change.
- **Breadcrumb** (`BreadcrumbTrail`) — shown only two levels deep and beyond,
  i.e. on `/projects/transpahire/engineering` (P06 §04).
- **Section rail** (`SectionRail`) — the in-page "on this page" anchors, scoped
  to case studies only (P06 §04 / P07 §06). Scroll-spy is `useActiveSection`
  (IntersectionObserver, offset by the header height).

## Page-template usage

A future page **picks a template and fills its slots** rather than inventing a
layout (S03 §08 RULE). Templates live in `src/templates/` and compose only
Sprint 02 primitives. Each opens with the shared `PageHeader` (the page's one
`<h1>`).

| Template            | Use for                                 | Used by                             |
| ------------------- | --------------------------------------- | ----------------------------------- |
| `StandardPage`      | Short single-column pages               | About, Projects, Experience, Skills |
| `ContentPage`       | Long-form reading at a measure          | Resume                              |
| `CaseStudyPage`     | Case studies with a sticky section rail | Transpahire, `/projects/[slug]`     |
| `DocumentationPage` | Technical deep-dive (rail + breadcrumb) | Transpahire › Engineering           |
| `ContactPage`       | Centred, narrow "get in touch" layout   | Contact                             |

`CaseStudyPage` / `DocumentationPage` take `sections` (the rail anchors) and
`crumbs` (the breadcrumb). Content `<section>`s carry an `id` matching
`sections[].id` and `scroll-mt-[calc(var(--header-height)+var(--space-8))]` so
anchored jumps clear the sticky header.

## Adding a new route

1. Add its entry to `routes` in `src/config/navigation.ts` (href, label, title,
   description). Add it to `primaryNav` / `footerColumns` if it belongs there.
2. Create `app/<path>/page.tsx`. Export `metadata` via `buildMetadata({...})`
   (or `generateMetadata` for a dynamic route).
3. Choose a template from `src/templates/` and fill its slots. Do not hand-roll
   a layout unless the design has no matching template.
4. If the route loads data or can fail, add a segment `loading.tsx` /
   `error.tsx` (the shared `RouteError` body keeps failures in-shell).
5. `pnpm verify`. The sitemap and route-existence test pick the route up
   automatically from the config.

## Metadata conventions

- Title pattern is **`Page — Yuvaraj`** (P06 §14). The root layout sets the
  template `%s · Yuvaraj` and the site defaults; each page passes its own
  `title`/`description`/`path` to `buildMetadata` (`lib/seo.ts`), which fills
  canonical URL, Open Graph and Twitter cards.
- One `<h1>` per page (owned by `PageHeader`); `H2/H3` map to section structure.
- Dynamic routes use `generateMetadata`; unknown slugs return `noindex`.
- Structured data: the shared `Person` JSON-LD is emitted from the root layout;
  per-case-study `CreativeWork` graphs arrive with real content later.

## Scroll & theme behaviour

- **Anchor offset** — `scroll-padding-top: var(--header-height)` on `html`
  keeps anchored targets clear of the sticky header; reduced motion disables
  smooth scrolling globally.
- **Theme** — a single `ThemeProvider` owns light/dark; a pre-hydration script
  sets the attribute before first paint (no FOUC). Components read tokens that
  swap on `[data-theme]` — they never branch on a theme flag.
- **Route change** — `RouteAnnouncer` announces the new page title to assistive
  tech and moves focus to `#main-content`, so keyboard users start at the
  content, not stranded on the previous page's link.
