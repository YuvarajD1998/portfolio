/**
 * Contact & Conversion-page content — the frozen conversion record (Sprint 12).
 *
 * Content lives apart from code (Blueprint §10). Every visible string on the
 * Contact page is declared here, drawn from an approved source, so the feature
 * components hold layout only and never a literal (S12 §01 RULE).
 *
 * PROVENANCE — the approved phases are the single source of truth. The Content
 * Bible (P10A) freezes the Contact inventory by NAME — "all headings &
 * descriptions · CTA text · email, GitHub, LinkedIn, availability ·
 * confirmation, validation & error messages" — and freezes the contact FACTS
 * verbatim (`yuviy0881@gmail.com` · `github.com/YuvarajD1998` ·
 * `linkedin.com/in/yuvarajd8892` · +91 70266 72211). The exact WORDING of the
 * headings, intro, availability line, CTA labels and form messages is not spelled
 * out in P10A, so those are OPEN change requests (blockers C1/C3/C7 below): this
 * module renders the frozen FACTS verbatim and carries honest, on-tone interim
 * copy for the unfrozen strings, reconciled against Book A before ship — never a
 * placeholder, never an invented availability claim (S12 governing principle;
 * CLAUDE.md golden rule).
 *
 * Facts are RE-USED, not re-declared, so a fact stated here and on the Resume /
 * footer resolves to the SAME source string:
 *   - Email / GitHub / LinkedIn / phone facts → `@/config/site` (`siteConfig`).
 *   - Cross-link destinations                  → `@/config/navigation` (`routes`).
 *   - The résumé download                      → `@/features/resume` (S11), the
 *     single canonical asset — Contact reuses it, it forks nothing (S12 §09).
 *
 * The Contact page occupies the CONVERSION altitude (S12 §00 NOTE): the fewest,
 * clearest paths to start a conversation, plus a gentle exit for readers who want
 * to keep exploring. It is NOT the Resume page (S11), the About page (S05) or any
 * project page — where it names a page it LINKS OUT, it never re-tells it.
 */

import { routes } from '@/config/navigation';
import { siteConfig } from '@/config/site';

const { contact: facts, links } = siteConfig;

/* ========================================================================== *
 * §03 — Hero & primary CTA (an open door, stated plainly)
 * ========================================================================== */

/**
 * Hero & primary CTA (S12 §03). Names the page, invites contact, frames what a
 * good conversation looks like, and puts the primary CTA up front so a ready
 * reader never scrolls to act (S12 §03). The page title is the single <h1>.
 *
 * The exact frozen heading + intro string is Content Required (blocker C1) — the
 * interim wording is a faithful, on-tone invitation that adds NO availability or
 * response-time claim the Content Bible does not carry (S12 §03 RULE).
 */
export const hero = {
  eyebrow: 'Contact',
  /** The page's single <h1> — the Content Bible's Contact page title (S12 §03). */
  title: 'Start a conversation.',
  /** [FROZEN] the fixed professional identity line (P10A §04). */
  positioning: 'Senior Frontend / Full-Stack Developer · Bengaluru, India',
  /** C1 interim — an invitation, no availability/response-time claim added. */
  intro:
    'If the work reads like a fit — a role, a product, a collaboration — this ' +
    'is the place to reach out. The fastest paths are below: email directly, ' +
    'connect on LinkedIn or GitHub, or send a message with the form. Tell me a ' +
    'little about what you are working on and I will reply.',
  /** Primary CTA — jumps to the message form (frozen label, C7 for wording). */
  primaryCta: 'Start a conversation',
  primaryCtaHref: '#contact-form',
  /** Secondary CTA — email directly, the always-available fallback channel. */
  secondaryCta: 'Email directly',
  secondaryCtaHref: links.email,
  /** [FROZEN] identity chips, each a fact — Book A §04. */
  chips: [
    'Yuvaraj D',
    'Senior Frontend / Full-Stack Developer',
    'Bengaluru, India',
  ],
} as const;

/* ========================================================================== *
 * §04 / §08 — Contact methods & social links (every channel, as recorded)
 * ========================================================================== */

/**
 * Contact methods (S12 §04) & social + professional links (S12 §08). Every
 * approved channel as an accessible, correctly-behaving link — `mailto:` for
 * email, `tel:` for phone, secure external links for the profiles. The VALUES
 * are frozen in Book A and rendered verbatim; no channel is added, edited or
 * dropped (S12 §04 RULE, §08 RULE).
 *
 * `kind` drives link behaviour, not copy: `email`/`phone` are same-tab protocol
 * links, `external` opens securely in a new tab with an accessible name that
 * states the destination opens externally (S12 §08 RULE). The phone's PRESENCE
 * on the public page is the approved-design gap C2 — the value is frozen; it is
 * surfaced here as a first-class channel per the approved Contact design, and can
 * be withdrawn by removing this one entry without touching a component.
 */
export const methods = {
  eyebrow: 'Contact methods',
  title: 'Every channel, exactly as recorded.',
  lead:
    'The approved ways to reach me — each a real, accessible link. Email is the ' +
    'most direct; the profiles open in a new tab.',
  items: [
    {
      id: 'email',
      kind: 'email' as const,
      label: 'Email',
      value: facts.emailAddress,
      href: links.email,
      hint: 'The most direct channel',
      /** Accessible name stating the action (S12 §04 RULE). */
      accessibleName: `Email ${facts.emailAddress}`,
    },
    {
      id: 'linkedin',
      kind: 'external' as const,
      label: 'LinkedIn',
      value: facts.linkedinHandle,
      href: links.linkedin,
      hint: 'Connect professionally',
      accessibleName: 'LinkedIn profile (opens in a new tab)',
    },
    {
      id: 'github',
      kind: 'external' as const,
      label: 'GitHub',
      value: facts.githubHandle,
      href: links.github,
      hint: 'See the code',
      accessibleName: 'GitHub profile (opens in a new tab)',
    },
    {
      id: 'phone',
      kind: 'phone' as const,
      label: 'Phone',
      value: facts.phone,
      href: facts.phoneHref,
      hint: 'Call or text',
      accessibleName: `Call ${facts.phone}`,
    },
  ],
} as const;

/**
 * The social / professional link set (S12 §08) — GitHub + LinkedIn only, the
 * exact set Book A lists. Adding any other platform is forbidden (S12 §08 RULE).
 * Re-uses the same frozen method entries so the two sections never diverge.
 */
export const socialLinks = {
  eyebrow: 'Social & professional links',
  title: 'Only the approved platforms.',
  lead:
    'The professional profiles on the record — GitHub and LinkedIn. Both open ' +
    'in a new tab.',
  /** [FROZEN] exactly the external channels, reused from `methods` (no new set). */
  items: methods.items.filter((m) => m.kind === 'external'),
} as const;

/* ========================================================================== *
 * §05 / §06 — Contact form: fields, states & the frozen messages
 * ========================================================================== */

/**
 * Contact form (S12 §05) & its four states (S12 §06). The form is APPROVED —
 * Book A freezes the form's confirmation / validation / error messages by name
 * (P10A). The approved fields are name / email / subject / message, built from
 * the Sprint 02 input primitives, in a semantic <form>, wired to the approved
 * config-driven endpoint (`@/config/contact-form`, P10) — no backend is invented
 * beyond that architecture (S12 §05).
 *
 * The exact field LABELS, PLACEHOLDERS and the frozen VALIDATION / CONFIRMATION /
 * ERROR strings are Content Required (blocker C3): P10A freezes their EXISTENCE,
 * not their wording. The strings below are honest, on-tone interim copy —
 * reconciled against Book A before ship, never improvised for style and never
 * carrying a claim the record does not (S12 §05 HONEST, §06 RULE). Because they
 * are single-sourced here, the four form states render the IDENTICAL string the
 * validation uses, and a copy change is a content-file edit, not a code change.
 */
export const form = {
  eyebrow: 'Send a message',
  title: 'A form that is easy and honest.',
  lead:
    'Prefer to write here? Four short fields. I read every message and reply ' +
    'personally — there is no autoresponder.',
  /** Field definitions — C3 interim labels/placeholders (reconciled before ship). */
  fields: {
    name: {
      name: 'name',
      label: 'Name',
      placeholder: 'Your name',
      autoComplete: 'name',
      required: true,
      /** C3 — the frozen required-field validation string. */
      requiredError: 'Please enter your name.',
    },
    email: {
      name: 'email',
      label: 'Email',
      placeholder: 'you@example.com',
      autoComplete: 'email',
      required: true,
      type: 'email' as const,
      requiredError: 'Please enter your email address.',
      /** C3 — the frozen email-format validation string. */
      formatError: 'Please enter a valid email address.',
    },
    subject: {
      name: 'subject',
      label: 'Subject',
      placeholder: 'What is this about?',
      autoComplete: 'off',
      required: true,
      requiredError: 'Please enter a subject.',
    },
    message: {
      name: 'message',
      label: 'Message',
      placeholder: 'A little about the role, product or collaboration…',
      autoComplete: 'off',
      required: true,
      rows: 6,
      requiredError: 'Please enter a message.',
    },
  },
  /** Submit control label + its pending (loading) label (C3 interim). */
  submit: 'Send message',
  submitPending: 'Sending…',
  /**
   * The four form-state messages (S12 §06) — every one a C3-interim string,
   * rendered verbatim and announced to AT via `aria-live`. Never reworded per
   * state; the success/failure copy is the single source below.
   */
  states: {
    /** Screen-reader summary announced when validation blocks submission. */
    invalidSummary:
      'The form has errors. Please review the highlighted fields.',
    /** Loading — announced politely while the request is in flight (§06). */
    loading: 'Sending your message…',
    /** Success — the frozen confirmation message (C3). */
    successTitle: 'Message sent',
    success:
      'Thank you — your message has been sent. I read every message and will ' +
      'get back to you as soon as I can.',
    /** Failure — the frozen error message, always offering the email fallback. */
    errorTitle: 'Message not sent',
    error:
      'Something went wrong sending your message. Please try again, or email me ' +
      'directly at ',
    /** The honest "not yet wired" delivery-path notice while C4 is open. */
    unavailableTitle: 'Form delivery is being finalised',
    unavailable:
      'The message form is not connected to its delivery service yet. In the ' +
      'meantime, please email me directly at ',
  },
  /** The always-visible email fallback appended to the failure/unavailable notes. */
  fallbackEmail: {
    label: facts.emailAddress,
    href: links.email,
  },
} as const;

/* ========================================================================== *
 * §07 — Professional availability (what fits, stated honestly)
 * ========================================================================== */

/**
 * Professional availability (S12 §07). The frozen statement of which
 * opportunities are appropriate, so a reader can self-qualify before writing.
 * Availability is a FACTUAL CLAIM about the person — the exact frozen wording is
 * Content Required (blocker C1). No availability statement is generated; the
 * interim copy is deliberately conservative — it states openness to conversation
 * without promising a commitment, a rate, a start date or a response time the
 * record does not carry (S12 §07 HONEST). The only geographic fact is the frozen
 * location (Bengaluru); no other dimension is invented.
 */
export const availability = {
  eyebrow: 'Professional availability',
  title: 'What fits, stated honestly.',
  /** C1 interim — conservative, adds no commitment/rate/date/response-time claim. */
  lead:
    'A quick note on fit, so you can decide before you write. The specifics — ' +
    'engagement type, timing, notice — are best discussed directly; here is the ' +
    'shape of what tends to be a good match.',
  /**
   * Availability points — each conservative and on the record. `pending: true`
   * marks a dimension whose exact wording is C1 and shown as such, never guessed.
   */
  points: [
    {
      id: 'opportunities',
      label: 'Opportunities',
      body:
        'Senior frontend and full-stack roles, and product work where interface ' +
        'craft and system thinking both matter.',
    },
    {
      id: 'interests',
      label: 'Collaboration interests',
      body:
        'Production web applications — React & TypeScript front ends with NestJS ' +
        'or FastAPI services, and AI-powered or real-time product features.',
    },
    {
      id: 'location',
      label: 'Location',
      /** [FROZEN] the only geographic fact already on the record. */
      body: 'Based in Bengaluru, India. Open to discussing arrangements.',
    },
  ],
  /**
   * Honest gap note for the availability wording (C1). Shown as calm context, not
   * as a defect — the specifics are settled in conversation, not asserted here.
   */
  note:
    'Exact engagement terms are confirmed in conversation — nothing here is a ' +
    'commitment or a rate.',
} as const;

/* ========================================================================== *
 * §09 — Résumé access (reuse the S11 download, don't rebuild it)
 * ========================================================================== */

/**
 * Résumé access (S12 §09). The Contact page offers the résumé by REUSING the
 * Sprint 11 download component and the single canonical asset — it forks nothing
 * (S12 §09 RULE). The asset, file name and version are the SAME Content-Required
 * item as S11 (shared blocker C5); Contact introduces no second file. This module
 * carries only the section framing — the download control, its accessible name,
 * MIME type and graceful-failure path all come from S11 (`@/features/resume`).
 */
export const resumeAccess = {
  eyebrow: 'Résumé',
  title: 'Prefer to start with the résumé?',
  lead:
    'The same one-page summary offered on the Resume page — download it here, ' +
    'or open the full page for the detail.',
  /** Links to the owning Resume page for the full summary (S12 §09). */
  fullPage: {
    href: routes.resume.href,
    label: 'View the full résumé page',
  },
} as const;

/* ========================================================================== *
 * §10 — FAQ (content-gated; ships only if Book A supplies approved Q&A)
 * ========================================================================== */

/**
 * FAQ (S12 §10) — an "if approved" section. The Content Bible's Contact inventory
 * freezes headings, descriptions, CTA text, contact facts, availability and form
 * messages; it does NOT list FAQ question / answer pairs (blocker C6). Therefore
 * NO FAQ copy is written by the implementer: the section ships only if the content
 * owner supplies approved Q&A here, and until then it is OMITTED and its absence
 * is not a defect (S12 §10 RULE). `items` is intentionally empty.
 */
export const faq = {
  eyebrow: 'Questions',
  title: 'Answers only if they’re on the record.',
  /** C6 — no approved Q&A on the record; the section is omitted while empty. */
  items: [] as readonly { id: string; question: string; answer: string }[],
} as const;

/* ========================================================================== *
 * §11 / §12 / §13 — CTAs, cross-links & the final call-to-action
 * ========================================================================== */

/**
 * Cross-linking (S12 §12). A way back in for a reader not yet ready to write —
 * links to the pages that own the depth. The Contact page ROUTES; it never
 * re-tells those pages (S12 §12 RULE). Every destination resolves to a canonical,
 * approved-IA route (`@/config/navigation`). Footer navigation is the S03 shell's
 * and is NOT re-implemented here.
 */
export const crossLinks = {
  eyebrow: 'Not ready to write yet?',
  title: 'Keep exploring.',
  lead:
    'No rush. The pages below carry the full picture — come back to this one ' +
    'when the fit is clear.',
  links: [
    {
      href: routes.projects.href,
      label: 'Projects',
      blurb: 'The wider body of work',
    },
    {
      href: routes.transpahire.href,
      label: 'Transpahire',
      blurb: 'The flagship case study',
    },
    { href: routes.about.href, label: 'About', blurb: 'The full story' },
    {
      href: routes.experience.href,
      label: 'Experience',
      blurb: 'Chronology & responsibilities',
    },
    {
      href: routes.skills.href,
      label: 'Skills',
      blurb: 'Categorized capability',
    },
    {
      href: routes.resume.href,
      label: 'Resume',
      blurb: 'The downloadable summary',
    },
  ],
} as const;

/**
 * Conversion & CTA strategy (S12 §11) + final call-to-action (S12 §13). The page
 * closes by making the single most likely next action obvious — reach out — and
 * restates the primary channel (email). CTA microcopy is the frozen Book A set;
 * the exact closing string is C7 (interim below, on-tone, no urgency/scarcity).
 * "Schedule a discussion" ships ONLY if an approved scheduling target exists in
 * the record — it does not, so it is omitted, not linked to a guess (S12 §11
 * RULE, blocker C7). Contact facts are the fixed ones, never edited here.
 */
export const callToAction = {
  eyebrow: 'One message away',
  title: 'The best work starts with a conversation.',
  /** C7 interim — warm, no urgency or scarcity language (S12 §13 RULE). */
  lead:
    'That is the whole site. If any of it resonates, send a message or email ' +
    'directly — I would be glad to hear from you.',
  primaryCta: 'Start a conversation',
  primaryCtaHref: hero.primaryCtaHref,
  /** [FROZEN] the fixed primary channel, restated at the close (S12 §13 RULE). */
  email: {
    label: facts.emailAddress,
    href: links.email,
  },
} as const;

/* ========================================================================== *
 * §15 — SEO & structured data
 * ========================================================================== */

/**
 * Contact-page SEO (S12 §15). The final title / description / OG values are an
 * unwritten P10A slot (interim = the approved route metadata + frozen site
 * identity). Structured data is a Person + ContactPage graph that reuses the same
 * frozen identity and contact facts as the rest of the site — it introduces no
 * new claim (S12 §15 RULE).
 */
export const seo = {
  title: routes.contact.title,
  description: routes.contact.description,
} as const;

/* ========================================================================== *
 * Content blockers — OPEN change requests, never fabricated (S12 §16)
 * ========================================================================== */

export const blockers = [
  {
    id: 'C1',
    slot: 'The exact frozen availability statement & the Contact hero intro copy',
    bibleRef: 'P10A — Contact inventory freezes these by name, not by wording',
    interim:
      'an on-tone invitation + a conservative availability note; no commitment, ' +
      'rate, start date or response-time claim is added',
  },
  {
    id: 'C2',
    slot: 'Whether the phone number & location are surfaced on the public page, and how',
    bibleRef:
      'P10A §07 — the values are frozen; on-page treatment is per the design',
    interim:
      'the frozen phone value is surfaced as a first-class contact method; it can ' +
      'be withdrawn by removing one content entry',
  },
  {
    id: 'C3',
    slot: 'Exact form field labels, placeholders & the validation / confirmation / error strings',
    bibleRef:
      'P10A — the messages are frozen by name; wording reconciled vs. Book A',
    interim:
      'honest, on-tone labels & state messages, single-sourced in `form`',
  },
  {
    id: 'C4',
    slot: 'The form submission endpoint / provider & any spam-protection mechanism',
    bibleRef:
      'P10 — Blueprint names a config-driven contact endpoint, no provider',
    interim:
      'config-driven endpoint (`NEXT_PUBLIC_CONTACT_ENDPOINT`) with a honeypot; ' +
      'while unset the form shows the honest delivery-path notice + email fallback',
  },
  {
    id: 'C5',
    slot: 'The final résumé file, its canonical file name & displayed version (shared with S11)',
    bibleRef: 'P10A / P10 — asset supplied by the content owner into /public',
    interim:
      'the S11 download control is reused; no second file, no placeholder ships',
  },
  {
    id: 'C6',
    slot: 'FAQ question / answer copy, if an FAQ section is approved',
    bibleRef: 'P10A — Contact inventory lists no FAQ Q&A',
    interim: 'the FAQ section is omitted while no approved Q&A exists',
  },
  {
    id: 'C7',
    slot: 'Frozen CTA microcopy & a "schedule a discussion" target, if that CTA is approved',
    bibleRef:
      'P10A §07/§08 — CTA labels frozen by name; no scheduling target on record',
    interim:
      'on-tone CTA labels, no urgency/scarcity; the scheduling CTA is omitted, not guessed',
  },
] as const;
