import { Disclosure, Stack } from '@/components';
import { faq } from '@/content/contact';
import { ContactSection } from '@/features/contact/ContactSection';

/**
 * §10 FAQ — answers only if they're on the record (Sprint 12 §10).
 *
 * A content-gated "if approved" section. The Content Bible's Contact inventory
 * lists NO FAQ question / answer pairs (blocker C6), so no FAQ copy is written by
 * the implementer: while `faq.items` is empty this component renders NOTHING and
 * its absence is not a defect (S12 §10 RULE). If the content owner supplies
 * approved Q&A in `@/content/contact`, it ships as an accessible disclosure list
 * built on the native `<details>/<summary>` Disclosure primitive.
 */
export function Faq() {
  // C6 — omit the section entirely until approved Q&A exists (S12 §10 RULE).
  if (faq.items.length === 0) return null;

  return (
    <ContactSection id="faq" index="10" kicker={faq.eyebrow} title={faq.title}>
      <Stack gap={3}>
        {faq.items.map((item) => (
          <Disclosure key={item.id} id={item.id} summary={item.question}>
            {item.answer}
          </Disclosure>
        ))}
      </Stack>
    </ContactSection>
  );
}
