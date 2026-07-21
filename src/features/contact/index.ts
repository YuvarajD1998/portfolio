/**
 * Contact feature barrel (Sprint 12).
 *
 * The composed, page-specific UI for `/contact`, in one place so the route
 * imports sections by name. Sections are ordered on the page by the §02
 * narrative (five questions, then an action), not by this list. Every section
 * renders frozen contact copy from `@/content/contact`; none holds a literal
 * (S12 §01 RULE). The résumé download is REUSED from the Sprint 11 feature — the
 * Contact page forks nothing (S12 §09).
 */
export { Hero } from './Hero';
export { ContactMethods } from './ContactMethods';
export { ContactFormSection } from './ContactFormSection';
export { ContactForm } from './ContactForm';
export { Availability } from './Availability';
export { SocialLinks } from './SocialLinks';
export { ResumeAccess } from './ResumeAccess';
export { Faq } from './Faq';
export { CrossLinks } from './CrossLinks';
export { FinalCta } from './FinalCta';
