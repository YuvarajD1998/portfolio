import { type ReactNode } from 'react';

import { Card, Grid, List, Stack, Text } from '@/components';

/**
 * PracticePanels — the shared "titled lists side by side" layout (Sprint 08).
 *
 * Purpose:      Most practice movements present two-to-three titled point lists
 *               (the S08 brief's paired boxes). Rendering them through one
 *               component keeps every section structurally identical and holds
 *               reuse to the design system's rule — designed at the third use,
 *               not per section (S08 §05, §16).
 * Public API:   `panels` — one entry per titled column; optional `cols`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one card-grid treatment; column count is data.
 * A11y:         Each panel title is an H3 (movements own the single H2); the
 *               points are a real `<ul>`. A panel may carry prose instead of a
 *               list where the brief's box is a paragraph, not bullets.
 * Responsive:   Grid collapses to one column below md; cards wrap.
 * Composition:  Inside an EngineeringSection body; fed frozen content arrays.
 */
export interface PracticePanel {
  title: string;
  /** Bulleted points (the common case). Mutually exclusive with `body`. */
  points?: readonly string[];
  /** A single prose block where the brief's box is a paragraph, not a list. */
  body?: ReactNode;
}

export function PracticePanels({
  panels,
  cols = 2,
}: {
  panels: readonly PracticePanel[];
  cols?: 2 | 3;
}) {
  return (
    <Grid cols={{ base: 1, md: cols, lg: cols }} gap={6}>
      {panels.map((panel) => (
        <Card key={panel.title}>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              {panel.title}
            </Text>
            {panel.points ? (
              <List>
                {panel.points.map((point) => (
                  <li key={point}>
                    <Text as="span" variant="small">
                      {point}
                    </Text>
                  </li>
                ))}
              </List>
            ) : (
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {panel.body}
              </Text>
            )}
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
