import {
  Callout,
  Container,
  Reveal,
  Section,
  Stack,
  Timeline,
} from '@/components';
import { journey } from '@/content/about';

import { SectionIntro } from './SectionIntro';

/**
 * Career journey — five chapters, one line of growth (Sprint 05 §04; P06 §09).
 *
 * Purpose:      Tell the arc from front-end specialist to full-stack engineer as
 *               increasing scope, not a dated job list (Sprint 05 §04 RULE). The
 *               dates live on Experience; the story lives here.
 * A11y:         The chapters render through the S02 Timeline, which is a semantic
 *               <ol>/<li> — so assistive tech announces the sequence and each
 *               chapter's position. Chapter markers are labels, not dates. No
 *               motion gates the content; the Timeline reads fully static.
 * Composition:  Section → Container → intro + through-line Callout + Timeline.
 */
export function CareerJourney() {
  return (
    <Section aria-labelledby="journey-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="journey-heading"
            eyebrow={journey.eyebrow}
            title={journey.title}
          />

          <Reveal>
            <Callout title="The through-line" className="max-w-[52ch]">
              {journey.throughLine}
            </Callout>
          </Reveal>

          <Reveal delay={0.05}>
            <Timeline className="max-w-[60ch]">
              {journey.chapters.map((chapter) => (
                <Timeline.Item
                  key={chapter.title}
                  time={chapter.marker}
                  title={chapter.title}
                >
                  {chapter.body}
                </Timeline.Item>
              ))}
            </Timeline>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
