/**
 * About-page content (Sprint 05).
 *
 * ── PROVENANCE & A NOTED DEVIATION FROM THE FREEZE ────────────────────────────
 * The About page's narrative prose does NOT exist verbatim in the approved
 * sources. Two independent audits of the Content Bible (P10A) and the design
 * phases (P02 Storytelling, P06 IA, P07 UX, P08 Hi-Fi) found that those books
 * specify the About page's *purpose, structure, tone and the five-chapter
 * career arc* — a design brief — but never write the section-level copy the
 * Sprint 05 item list enumerates (the eight philosophy principles, six
 * product-thinking points, five values, six working-style points, five
 * learning/growth points, and the closing CTA).
 *
 * The Sprint 05 freeze RULE says missing copy is a change request, never
 * fabricated in code. That change request was raised and the owner explicitly
 * authorised authoring the About prose here, grounded strictly in the frozen
 * facts. So every string below is one of:
 *   [FROZEN]   — verbatim from an approved source (owner profile P10A §04/§05,
 *               contact RULE P10A §07, the career through-line callout P10A §05,
 *               or the four engineering principles already frozen in home.ts).
 *   [AUTHORED] — written for this sprint under the owner's sign-off, framing
 *               only facts that are frozen; it invents no employer, role,
 *               metric, date or credential beyond the owner profile.
 *
 * Hard guardrails honoured throughout (so nothing contradicts what is frozen):
 *   • "4+ years", never "10 years" (home.ts corrected the P08 mockup).
 *   • No "founding engineer", no invented companies (e.g. "Fintech Co").
 *   • Dates live on Experience, not here (P06 §09; Sprint 05 §04 RULE).
 *   • Structure follows P06 §09 (five chapters) and P07 §04 (portrait + identity,
 *     philosophy as a position, three-plus values one line each, → Contact).
 *
 * Facts are read from the single sources (`siteConfig`, `routes`) wherever they
 * already live, so nothing is duplicated.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { routes } from '@/config/navigation';
import { siteConfig } from '@/config/site';

/**
 * 03 · Introduction — the person, before the résumé (Sprint 05 §03; P07/P08 §04).
 * Holds the page's single <h1>. Identity line and facts are [FROZEN] (P10A §04);
 * the intro paragraphs are [AUTHORED] and frame only frozen facts.
 */
export const intro = {
  eyebrow: 'About', // [FROZEN] P07 line 258 / P08 line 377 eyebrow.
  /** [AUTHORED] page H1 — the human register, no fabricated claim. */
  title: 'Competence, turned into a person.',
  /** [FROZEN] the fixed professional identity line (P10A §04). */
  identity: 'Senior Frontend / Full-Stack Developer · Bengaluru',
  /** [AUTHORED] primary introduction — grounded in the frozen through-line. */
  lead:
    'I build production software end to end — from the data model and the API ' +
    'contract to the pixel and the person on the other side of it. What began ' +
    'as front-end craft has grown into full-stack ownership: I now design the ' +
    'systems behind the interfaces I used to only style.',
  /** [AUTHORED] supporting description — reflects the real BlueRose/Concentrix arc. */
  body:
    'Over four-plus years across BlueRose Technologies and Concentrix, I have ' +
    'moved from shipping React features inside enterprise teams to owning ' +
    'production APIs, authentication and AI-powered recruitment workflows. My ' +
    'flagship, TranspaHire, is an AI recruitment platform I am building end to ' +
    'end — proof of the whole system, not a single layer.',
  /** [FROZEN-derived] the identity tag row (stack core, P10A §04). */
  tags: ['React', 'TypeScript', 'NestJS', 'FastAPI', 'Python'],
  /**
   * Portrait — spec is [FROZEN] (P08 §04: square-ish crop, descriptive alt) but
   * NO approved image asset exists in the repo. Rendering a fabricated photo
   * would itself be an invented asset, so until an approved portrait lands the
   * introduction shows a datum-framed monogram (decorative, marked aria-hidden)
   * in the portrait slot. The slot, alt contract and no-layout-shift sizing are
   * all in place for the asset to drop in. `alt` is the descriptive text the
   * real portrait will carry.
   */
  portrait: {
    src: null as string | null,
    alt: 'Portrait of Yuvaraj D, Senior Frontend / Full-Stack Developer based in Bengaluru.',
    monogram: 'YD',
  },
} as const;

/**
 * 04 · Career journey — five chapters, one line of growth (Sprint 05 §04; P06 §09).
 * The five-chapter STRUCTURE is [FROZEN] (P06 §09 "A trajectory, not a timeline");
 * the per-chapter prose is [AUTHORED] from those frozen chapter descriptions +
 * the owner profile. No dates (they live on Experience).
 */
export const journey = {
  eyebrow: 'The path here',
  title: 'A trajectory, not a timeline.', // [FROZEN] P06 §09 H2.
  /** [FROZEN] the through-line callout, verbatim (P10A §05). */
  throughLine:
    'The through-line is the transition from front-end specialist to ' +
    'full-stack engineer: a legacy-to-React SPA migration in 45 days, then ' +
    'owning production APIs, auth systems and AI-powered recruitment workflows.',
  /**
   * Five chapters + a forward beat (P06 §09). `marker` is a chapter label, not a
   * date. Bodies are [AUTHORED] paraphrases of P06's frozen chapter descriptions.
   */
  chapters: [
    {
      marker: 'Chapter 01',
      title: 'Early learning',
      body:
        'Curiosity and self-teaching — the drive to take things apart and ' +
        'understand how they work. It is the trait every later chapter compounds.',
    },
    {
      marker: 'Chapter 02',
      title: 'Frontend specialisation',
      body:
        'Depth in the interface layer: craft, component systems and an eye for ' +
        'detail. React and TypeScript features shipped inside enterprise teams — ' +
        'the foundation this portfolio itself demonstrates.',
    },
    {
      marker: 'Chapter 03',
      title: 'Full-stack growth',
      body:
        'Reaching past the interface into data, APIs and systems — NestJS and ' +
        'FastAPI services, a multi-tenant data model, real-time features. The ' +
        'move from building screens to building products.',
    },
    {
      marker: 'Chapter 04',
      title: 'Product ownership',
      body:
        'Owning outcomes, not tickets. Making the product and UX calls, ' +
        'balancing users against constraints — the pivot from executor to author.',
    },
    {
      marker: 'Chapter 05',
      title: 'AI product development',
      body:
        'TranspaHire — the synthesis of every prior chapter into a ' +
        'self-conceived AI recruitment platform, built end to end. The present peak.',
    },
    {
      marker: 'Next',
      title: 'Where this is heading',
      body:
        'Toward harder systems and wider ownership — engineering that treats ' +
        'AI, accessibility and performance as defaults, not afterthoughts.',
    },
  ],
} as const;

/**
 * 05 · Engineering philosophy — how the work gets made (Sprint 05 §05; P07/P08).
 * P07 §04 says philosophy is "a position, not a list", so the section leads with
 * a quotable [AUTHORED] position, then supports it with the FOUR principles that
 * are already [FROZEN] in home.ts (reused verbatim — not an About-only variant),
 * plus [AUTHORED] extensions grounded in the same frozen voice. The Sprint 05
 * item list names eight facets; they are honoured as the principle set below,
 * bodies authored where no frozen text existed.
 */
export const philosophy = {
  eyebrow: 'How I build',
  title: 'How the work gets made.',
  /** [AUTHORED] the quotable position (P07 §04 "a short, quotable position"). */
  position:
    'Good software is legible before it is clever. I build systems the ' +
    'engineer who joins in month six can navigate from the folder name alone — ' +
    'and that a user never has to think about at all.',
  principles: [
    // The next four are [FROZEN] — verbatim from home.ts philosophy.principles.
    {
      title: 'User-first, product-minded',
      body:
        'Start from the problem and the person on the other side of the ' +
        'screen, then build the software that answers it.',
    },
    {
      title: 'Clean, maintainable architecture',
      body:
        'Code the engineer who joins in month six can navigate from the ' +
        'folder name alone. Structure is a feature.',
    },
    {
      title: 'Accessibility & performance as defaults',
      body:
        'WCAG and Core Web Vitals are not a late pass. They are how the work ' +
        'is built from the first commit.',
    },
    {
      title: 'Scalable, reviewed, always learning',
      body:
        'Systems that hold up under real data, decisions made in the open ' +
        'through review, and a standard that keeps rising.',
    },
    // The next four are [AUTHORED] — the remaining facets from the Sprint 05
    // item list, written in the same frozen voice, no invented claims.
    {
      title: 'Simplicity over cleverness',
      body:
        'The simplest thing that fully solves the problem, and no more. ' +
        'Abstractions earn their place by removing weight, not adding it.',
    },
    {
      title: 'Correctness you can trust',
      body:
        'Types, tests and small reviewable changes — so a green build means ' +
        'the real flows still work, not that the coverage number looks good.',
    },
    {
      title: 'Collaboration in the open',
      body:
        'The best decisions survive being questioned. I write them down, ' +
        'review generously and let the team make the work better.',
    },
    {
      title: 'Continuous learning',
      body:
        'Every project should teach the next one something. The standard is ' +
        'not what I knew last year — it is what the work needs now.',
    },
  ],
} as const;

/**
 * 06 · Product thinking — engineering in service of users (Sprint 05 §06).
 * Entirely [AUTHORED] (no frozen source), grounded in the real recruitment-
 * workflow work on TranspaHire. Each point is a concrete stance, not a platitude.
 */
export const product = {
  eyebrow: 'Beyond the code',
  title: 'Engineering in service of users.',
  lead:
    'Code is the means, not the point. I weigh the user and the business ' +
    'alongside the implementation — the way real calls got made on real ' +
    'products like TranspaHire.',
  points: [
    {
      title: 'User-first thinking',
      body:
        'Every feature starts with the person it is for. On TranspaHire that ' +
        'meant ranking candidates by meaning, not keywords — because a keyword ' +
        'filter rejects strong people on vocabulary, not ability.',
    },
    {
      title: 'Problem solving',
      body:
        'Name the real problem before reaching for a solution. Most bad ' +
        'features are good answers to the wrong question.',
    },
    {
      title: 'Research mindset',
      body:
        'Understand the domain before modelling it. Recruitment has its own ' +
        'logic; the schema has to respect it, not fight it.',
    },
    {
      title: 'Iteration',
      body:
        'Ship the smallest honest version, learn from it, and let real usage ' +
        'decide what comes next — over guessing the whole thing up front.',
    },
    {
      title: 'Decision making',
      body:
        'Make the trade-off explicit and reversible where it can be. A ' +
        'documented decision is easier to revisit than a silent assumption.',
    },
    {
      title: 'Business ↔ engineering balance',
      body:
        'The right technical answer that ignores cost or timeline is the ' +
        'wrong answer. I optimise for the outcome, not the elegance.',
    },
  ],
} as const;

/**
 * 07 · Core values — what holds under pressure (Sprint 05 §07; P07 §04).
 * P07 §04 asks for values "each one line, each tied to how he works — never
 * generic virtues". [AUTHORED] one-liners, tied to the frozen work. The Sprint 05
 * item list names five values; kept to exactly that set, neither padded nor
 * trimmed.
 */
export const values = {
  eyebrow: 'Under pressure',
  title: 'What holds under pressure.',
  items: [
    {
      title: 'Ownership',
      body: 'I take the outcome, not just the ticket — and I stay with it to production.',
    },
    {
      title: 'Curiosity',
      body: 'I take things apart to understand them; the habit that taught me every layer.',
    },
    {
      title: 'Craftsmanship',
      body: 'The detail a user never notices is exactly the detail worth getting right.',
    },
    {
      title: 'Transparency',
      body: 'I make decisions and trade-offs visible, so the team can trust and improve them.',
    },
    {
      title: 'Continuous improvement',
      body: 'The standard keeps rising; last year’s best is this year’s baseline.',
    },
  ],
} as const;

/**
 * 08 · Working style — how the work happens with others (Sprint 05 §08).
 * [AUTHORED], claims kept at the level the frozen sources support (Sprint 05 §08
 * RULE: no inflated lead/mentoring scope). Frames collaboration inside the real
 * enterprise-team context (BlueRose, Concentrix), never claiming a title not held.
 */
export const workingStyle = {
  eyebrow: 'With a team',
  title: 'How the work happens with others.',
  lead:
    'Software is a team sport. Here is how I show up in one — inside ' +
    'cross-functional enterprise teams and on my own product work alike.',
  points: [
    {
      title: 'Team collaboration',
      body:
        'I work across function — design, product and backend — and treat the ' +
        'boundary between roles as a place to help, not a wall.',
    },
    {
      title: 'Communication',
      body:
        'Clear, written and early. A short design note before the code saves ' +
        'far more time than it costs.',
    },
    {
      title: 'Code reviews',
      body:
        'I review to make the change better, not to gate it — and I want the ' +
        'same in return. Small PRs, specific feedback.',
    },
    {
      title: 'Technical discussions',
      body:
        'Disagree on the idea, not the person. The goal is the strongest ' +
        'decision, whoever it comes from.',
    },
    {
      title: 'Product ownership',
      body:
        'I hold the outcome of what I build — from the spec through the edge ' +
        'cases to how it behaves in production.',
    },
    {
      title: 'Delivery mindset',
      body:
        'Done means shipped, observable and holding up under real data — not ' +
        'merged and forgotten.',
    },
  ],
} as const;

/**
 * 09 · Learning & growth — staying sharp on purpose (Sprint 05 §09).
 * [AUTHORED] point of view (Sprint 05 §09 RULE: not a résumé, no cert dumps —
 * those live on Resume). Reads as how the craft is kept sharp and where it heads.
 */
export const learning = {
  eyebrow: 'Staying sharp',
  title: 'Staying sharp on purpose.',
  lead:
    'The full credentials live on the résumé. This is how I keep learning, ' +
    'and where I think the craft is heading.',
  points: [
    {
      title: 'Skill development',
      body:
        'I learn by building the thing, not by collecting courses — each ' +
        'project deliberately reaches one layer past what I already know.',
    },
    {
      title: 'Emerging tech',
      body:
        'I adopt new tools when they earn it against a real problem, not for ' +
        'novelty. The bar is: does it make the work better or simpler?',
    },
    {
      title: 'AI',
      body:
        'Building TranspaHire taught me to treat AI as engineered judgement — ' +
        'retrieval and ranking you can trace and explain, not a black box.',
    },
    {
      title: 'Frontend evolution',
      body:
        'The frontend keeps absorbing the stack — data, rendering, even ' +
        'inference. I follow it there, staying full-stack by necessity.',
    },
    {
      title: 'Engineering excellence',
      body:
        'The parts users never see — accessibility, performance, tests — are ' +
        'where I most want to keep getting better.',
    },
  ],
} as const;

/**
 * 10 · Call to action — the close, and the handoff (Sprint 05 §10; P07 §04).
 * P07 §04: the About page "ends by pointing at Contact, never dead-ending". The
 * headline is [AUTHORED]; every destination is a real existing route (no invented
 * links). GitHub already lives in the shell footer, so it is NOT repeated here
 * (Sprint 05 §10 RULE). The Transpahire link points at the flagship case study.
 */
export const callToAction = {
  eyebrow: 'What’s next',
  title: 'You know how I think. Let’s build something.',
  lead:
    'If the way I work fits what you are building, the fastest way forward ' +
    'is a conversation. Or keep exploring the work first — both lead the ' +
    'same place.',
  /** Real routes only (Sprint 05 §10 RULE). */
  links: [
    { label: 'Explore projects', href: routes.projects.href, primary: false },
    {
      label: 'Read the Transpahire case study',
      href: routes.transpahire.href,
      primary: false,
    },
    {
      label: 'Review the engineering deep-dive',
      href: routes.transpahireEngineering.href,
      primary: false,
    },
    { label: 'Make contact', href: routes.contact.href, primary: true },
  ],
} as const;

/**
 * SEO — About-page metadata (Sprint 05 §13). No frozen About SEO block exists;
 * [AUTHORED] from the frozen owner facts, consistent with the homepage SEO voice
 * in home.ts (honest, specific, not keyword-stuffed).
 */
export const seo = {
  title: 'About — Yuvaraj D',
  description:
    'Yuvaraj D — a Senior Frontend / Full-Stack Developer in Bengaluru who ' +
    'builds software end to end. How I think, how I work, and the path from ' +
    'front-end craft to owning AI recruitment products like TranspaHire.',
} as const;

/**
 * Person structured-data extension for the About page (Sprint 05 §13). The base
 * Person graph (name, jobTitle, url, sameAs) ships from the root layout via
 * `personJsonLd()`; here we add only fields the frozen facts support.
 * `description` and `knowsAbout` reflect the owner profile; `homeLocation` is the
 * frozen location (P10A §04). Nothing beyond the frozen sources.
 */
export const personExtra = {
  description:
    'Senior Frontend / Full-Stack Developer building production software end ' +
    'to end, from data model to interface. Creator of TranspaHire, an AI ' +
    'recruitment platform.',
  homeLocation: 'Bengaluru, India', // [FROZEN] P10A §04.
  knowsAbout: [
    'React',
    'TypeScript',
    'NestJS',
    'FastAPI',
    'Python',
    'Full-stack engineering',
    'AI product development',
    'Web accessibility',
  ],
} as const;

/** Contact facts for the CTA — reused from the single source (siteConfig). */
export const contact = {
  email: siteConfig.links.email.replace(/^mailto:/, ''),
} as const;
