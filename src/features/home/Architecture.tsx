import {
  ArchitecturePanel,
  Container,
  Reveal,
  Section,
  Stack,
} from '@/components';
import { architecture } from '@/content/home';

import { SectionIntro } from './SectionIntro';

/**
 * Architecture — the blueprint, teased (Sprint 04 §04 RULE; P03 §04).
 *
 * A hint at the system shape, not the full diagram: three layers (client,
 * services, data) drawn with the S02 ArchitecturePanel. The signature
 * node-by-node diagram and "trace a request" interaction belong to the case
 * study, not the homepage.
 *
 * A11y:  ArchitecturePanel renders a <figure>; the panel title is its caption.
 *        Section labelled by its heading.
 */
export function Architecture() {
  return (
    <Section spacing="sm" aria-labelledby="architecture-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="architecture-heading"
            eyebrow={architecture.eyebrow}
            title={architecture.title}
            lead={architecture.lead}
          />
          <Reveal delay={0.05}>
            <ArchitecturePanel title="TranspaHire — system overview">
              {architecture.layers.map((layer) => (
                <ArchitecturePanel.Layer key={layer.label} label={layer.label}>
                  {layer.nodes.map((node) => (
                    <ArchitecturePanel.Node key={node}>
                      {node}
                    </ArchitecturePanel.Node>
                  ))}
                </ArchitecturePanel.Layer>
              ))}
            </ArchitecturePanel>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
