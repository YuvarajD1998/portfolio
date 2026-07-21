/**
 * Resume feature barrel (Sprint 11).
 *
 * The composed, page-specific UI for `/resume`, in one place so the route
 * imports sections by name. Sections are ordered on the page by the §02
 * narrative (five questions, answered in order), not by this list. Every section
 * renders frozen résumé copy from `@/content/resume`; none holds a literal
 * (S11 §01 RULE). The `DownloadButton` is the robust download control reused by
 * the hero, the dedicated download section and the closing CTA (S11 §11).
 */
export { Hero } from './Hero';
export { ProfessionalSummary } from './ProfessionalSummary';
export { Highlights } from './Highlights';
export { EmploymentSummary } from './EmploymentSummary';
export { Education } from './Education';
export { Certifications } from './Certifications';
export { SkillsSnapshot } from './SkillsSnapshot';
export { DownloadSection } from './DownloadSection';
export { CrossLinks } from './CrossLinks';
export { CallToAction } from './CallToAction';
export { DownloadButton } from './DownloadButton';
