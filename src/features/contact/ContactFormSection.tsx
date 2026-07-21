import { form } from '@/content/contact';
import { ContactForm } from '@/features/contact/ContactForm';
import { ContactSection } from '@/features/contact/ContactSection';

/**
 * §05 Contact-form section — a form that is easy and honest (Sprint 12 §05).
 *
 * The section frame around the approved `ContactForm`. It carries the frozen
 * heading / lead (C3 interim) and owns the `#contact-form` anchor the hero and
 * closing CTA jump to (S12 §03, §11). The form itself owns fields, validation and
 * the four accessible states — this holds layout only (S12 §01 RULE).
 */
export function ContactFormSection() {
  return (
    <ContactSection
      id="contact-form"
      index="05"
      kicker={form.eyebrow}
      title={form.title}
      lead={form.lead}
    >
      <ContactForm />
    </ContactSection>
  );
}
