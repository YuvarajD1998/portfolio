import { siteConfig } from '@/config/site';

/**
 * Structured-data (JSON-LD) helpers (Sprint 01 §09, Blueprint §15).
 *
 * Produces schema.org objects for embedding via a <script type="application/
 * ld+json">. Sprint 01 ships the Person graph the whole site shares; per-project
 * CreativeWork graphs arrive with the case study (later sprint).
 */

export interface JsonLd {
  '@context': 'https://schema.org';
  [key: string]: unknown;
}

/**
 * Optional extra Person fields a richer page (e.g. About) can add on top of the
 * base graph. Every field must trace to an approved source (CLAUDE.md golden
 * rule) — this only carries facts the caller has already validated as frozen.
 */
export interface PersonExtras {
  description?: string;
  /** Home location as a plain place name (schema.org Place). */
  homeLocation?: string;
  knowsAbout?: readonly string[];
}

/**
 * The site owner as a schema.org Person. Called bare for the site-wide graph
 * (root layout); the About page passes `extras` to enrich it with frozen facts.
 */
export function personJsonLd(extras?: PersonExtras): JsonLd {
  const base: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };
  if (!extras) return base;
  if (extras.description) base.description = extras.description;
  if (extras.homeLocation) {
    base.homeLocation = { '@type': 'Place', name: extras.homeLocation };
  }
  if (extras.knowsAbout?.length) base.knowsAbout = [...extras.knowsAbout];
  return base;
}

/** A single project as a schema.org CreativeWork (Projects page, P10 §15). */
export interface ProjectCreativeWork {
  name: string;
  description: string;
  /** Absolute URL of the work / its case study. */
  url: string;
  /** Technologies the work is built with (schema.org `keywords`). */
  keywords?: readonly string[];
}

/**
 * The Projects overview graph — the site owner plus one CreativeWork per
 * project (P10 §15 approved model: Person + CreativeWork per project — NOT
 * CollectionPage, which appears in no source). The Person is the `creator` of
 * each work so the graph reads as one authored body of work.
 *
 * Emitted as a JSON-LD array so both node types share one `<script>` block.
 * Every string must trace to frozen content (CLAUDE.md golden rule); the caller
 * passes only validated, frozen values.
 */
export function projectsJsonLd(
  works: readonly ProjectCreativeWork[],
): JsonLd[] {
  const creator = {
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
  } as const;

  const person = personJsonLd();
  const creativeWorks: JsonLd[] = works.map((work) => {
    const node: JsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: work.name,
      description: work.description,
      url: work.url,
      creator,
    };
    if (work.keywords?.length) node.keywords = [...work.keywords];
    return node;
  });

  return [person, ...creativeWorks];
}

/**
 * A single case-study page graph — the site owner as Person plus one
 * CreativeWork for the study (Sprint 07 §22 RULE: CreativeWork is the approved
 * P10 §15 model — Person + CreativeWork per project; `SoftwareApplication` is
 * NOT used unless the Engineering Blueprint sanctions it, which it does not).
 *
 * Mirrors `projectsJsonLd` for the flagship interior: the Person authors the
 * work, so the graph reads as one authored study. Every string must trace to
 * frozen content (CLAUDE.md golden rule) — the caller passes validated values.
 */
export function caseStudyJsonLd(work: ProjectCreativeWork): JsonLd[] {
  const creator = {
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
  } as const;

  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.name,
    description: work.description,
    url: work.url,
    creator,
  };
  if (work.keywords?.length) node.keywords = [...work.keywords];

  return [personJsonLd(), node];
}

/**
 * A bio / practice page graph — the site owner as Person plus a ProfilePage
 * whose `mainEntity` is that Person (the approved P10 §15 model for a page
 * ABOUT the person, e.g. the Engineering page, Sprint 08 §22 RULE). A
 * project-scoped `CreativeWork` / `SoftwareApplication` schema belongs to the
 * case-study pages, NOT here — this deliberately emits neither.
 *
 * Every string must trace to frozen content (CLAUDE.md golden rule); the caller
 * passes only validated, frozen values (SEO strings are content-blocker C8).
 */
export function profilePageJsonLd(args: {
  /** Absolute URL of the page. */
  url: string;
  /** Frozen page description (P10A §08 slot; interim = route metadata). */
  description?: string;
  /** Frozen practice areas — a fact set, not a claim (S08 §22). */
  knowsAbout?: readonly string[];
}): JsonLd[] {
  const person = personJsonLd({
    ...(args.description ? { description: args.description } : {}),
    ...(args.knowsAbout?.length ? { knowsAbout: args.knowsAbout } : {}),
  });

  const profilePage: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: args.url,
    name: siteConfig.name,
    mainEntity: {
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteConfig.url,
    },
  };
  if (args.description) profilePage.description = args.description;

  return [person, profilePage];
}

/**
 * A contact-page graph — the site owner as Person plus a ContactPage whose
 * `mainEntity` is that Person (the approved P10 §15 model for the conversion
 * page, Sprint 12 §15 RULE). The Person carries the frozen contact channels as
 * `contactPoint`s so the graph states the SAME email / phone the page renders —
 * it introduces no new claim (S12 §15 RULE). Reuses the frozen identity facts;
 * the caller passes only validated, frozen values (SEO strings are content-C1).
 */
export function contactPageJsonLd(args: {
  /** Absolute URL of the contact page. */
  url: string;
  /** Frozen page description (P10A §08 slot; interim = route metadata). */
  description?: string;
  /** Frozen contact channels — facts, not claims (S12 §15). */
  email?: string;
  telephone?: string;
}): JsonLd[] {
  const person = personJsonLd({
    ...(args.description ? { description: args.description } : {}),
    homeLocation: 'Bengaluru, India',
  });

  // Attach the frozen channels as schema.org contactPoints — the same facts the
  // page surfaces, never a new one (S12 §15 RULE).
  const contactPoints: JsonLd[] = [];
  if (args.email) {
    contactPoints.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPoint',
      contactType: 'personal',
      email: args.email,
    });
  }
  if (args.telephone) {
    contactPoints.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPoint',
      contactType: 'personal',
      telephone: args.telephone,
    });
  }
  if (contactPoints.length) person.contactPoint = contactPoints;

  const contactPage: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: args.url,
    name: siteConfig.name,
    mainEntity: {
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteConfig.url,
    },
  };
  if (args.description) contactPage.description = args.description;

  return [person, contactPage];
}

/** Serialise an array of JSON-LD nodes for one `<script>` block. */
export function serializeJsonLdGraph(data: readonly JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** The site itself as a schema.org WebSite (homepage graph, Sprint 04 §13). */
export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: siteConfig.role,
    },
  };
}

/** Serialise a JSON-LD object for safe inlining in a script tag. */
export function serializeJsonLd(data: JsonLd): string {
  // Escape `<` to prevent breaking out of the <script> context.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
