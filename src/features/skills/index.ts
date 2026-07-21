/**
 * Skills feature barrel (Sprint 10).
 *
 * The composed, page-specific UI for `/skills`, in one place so the route
 * imports sections by name. Sections are ordered on the page by the §02
 * narrative (five questions, answered in order), not by this list. Every
 * section renders frozen skills copy from `@/content/skills`; none holds a
 * literal (S10 §01 RULE).
 */
export { Hero } from './Hero';
export { CoreExpertise } from './CoreExpertise';
export { SkillCategories } from './SkillCategories';
export { TechnologyInContext } from './TechnologyInContext';
export { Workflow } from './Workflow';
export { Learning } from './Learning';
export { Certifications } from './Certifications';
export { CallToAction } from './CallToAction';
