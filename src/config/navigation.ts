/**
 * Navigation model — the IA made literal (Sprint 03 §02, §06; P06 IA).
 *
 * The single source of truth for the site's routes and wayfinding. The header,
 * footer, breadcrumb, sitemap and placeholder pages all read from here, so a
 * new route appears everywhere by editing this one file (Sprint 03 §06: nav is
 * data-driven — a new route appears without touching a component).
 *
 * Structure mirrors the approved IA site-map tree (P06 §03):
 *   /                                     Home
 *   /about  /projects  /engineering  /experience  /skills  /resume  /contact
 *   /projects/[slug]                      Project detail (dynamic)
 *   /projects/transpahire                 Flagship case study (seed slug)
 *   /projects/transpahire/engineering     Engineering deep-dive
 *
 * No route here is invented: the IA is the source (Sprint 03 §02 RULE).
 */

export interface RouteMeta {
  /** Literal URL path (App Router). */
  href: string;
  /** Page label / short title. */
  label: string;
  /** `<title>` value; the layout template appends the owner suffix. */
  title: string;
  /** One-line description for metadata + placeholder copy. */
  description: string;
}

/**
 * Every real, static route in the site. Dynamic `/projects/[slug]` is not
 * listed (it has no fixed path); the flagship `/projects/transpahire` is the
 * one concrete slug that ships in this sprint.
 */
export const routes = {
  home: {
    href: '/',
    label: 'Home',
    title: 'Yuvaraj — Senior Frontend / Full-Stack Engineer',
    description:
      'Portfolio of Yuvaraj, a senior frontend and full-stack engineer.',
  },
  about: {
    href: '/about',
    label: 'About',
    title: 'About',
    description: 'Who I am, how I work, and the path that got me here.',
  },
  projects: {
    href: '/projects',
    label: 'Projects',
    title: 'Projects',
    description: 'Selected work — the products and systems I have built.',
  },
  engineering: {
    href: '/engineering',
    label: 'Engineering',
    title: 'Engineering',
    description:
      'How I approach architecture, technical decision-making and the ' +
      'disciplines of performance, accessibility and maintainability — ' +
      'beyond any single project.',
  },
  experience: {
    href: '/experience',
    label: 'Experience',
    title: 'Experience',
    description: 'Roles, teams and the work delivered across them.',
  },
  skills: {
    href: '/skills',
    label: 'Skills',
    title: 'Skills',
    description: 'The tools, languages and practices I work in.',
  },
  resume: {
    href: '/resume',
    label: 'Resume',
    title: 'Resume',
    description: 'A concise, printable summary of experience and skills.',
  },
  contact: {
    href: '/contact',
    label: 'Contact',
    title: 'Contact',
    description: 'Ways to reach me and start a conversation.',
  },
  transpahire: {
    href: '/projects/transpahire',
    label: 'Transpahire',
    title: 'Transpahire',
    description:
      'The flagship case study — an enterprise-grade AI hiring product.',
  },
  transpahireEngineering: {
    href: '/projects/transpahire/engineering',
    label: 'Engineering',
    title: 'Transpahire — Engineering',
    description: 'The engineering deep-dive behind the Transpahire case study.',
  },
} as const satisfies Record<string, RouteMeta>;

export type RouteKey = keyof typeof routes;

export interface NavLink {
  href: string;
  label: string;
  /** External destinations open in a new tab and are not path-matched. */
  external?: boolean;
}

/**
 * Primary navigation — four items, no more (P06 §04). The label "Work" points
 * at the Projects index; the logotype returns Home; Resume renders as a CTA.
 */
export const primaryNav: NavLink[] = [
  { href: routes.projects.href, label: 'Work' },
  { href: routes.about.href, label: 'About' },
  { href: routes.contact.href, label: 'Contact' },
];

/** The Resume link is separated so the header can render it as a CTA. */
export const resumeNav: NavLink = {
  href: routes.resume.href,
  label: 'Resume',
};

/**
 * Footer — the site's index of record (P06 §04). Grouped for layout; every
 * page is reachable from here. Column titles are structural, not final copy.
 */
export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Site',
    links: [
      routes.home,
      routes.about,
      routes.projects,
      routes.engineering,
      routes.experience,
      routes.skills,
    ].map(({ href, label }) => ({ href, label })),
  },
  {
    title: 'Work',
    links: [
      { href: routes.transpahire.href, label: routes.transpahire.label },
      {
        href: routes.transpahireEngineering.href,
        label: 'Transpahire — Engineering',
      },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: routes.resume.href, label: routes.resume.label },
      { href: routes.contact.href, label: routes.contact.label },
    ],
  },
];

/** All static paths for the sitemap and route-existence tests. */
export const allRoutePaths: string[] = Object.values(routes).map((r) => r.href);
