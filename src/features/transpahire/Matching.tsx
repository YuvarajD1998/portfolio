import {
  Callout,
  Card,
  Disclosure,
  Flex,
  Grid,
  List,
  Stack,
  Text,
} from '@/components';
import { matching } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';
import { StatusBadge } from '@/features/transpahire/StatusBadge';

/**
 * §15 Candidate matching & semantic search — two engines, never unified
 * (Sprint 07 §15).
 *
 * The most heavily engineered subsystem (nine phases, ~20 services). The two
 * scoring engines, the shipped vs. flag-gated split (at true status), and the
 * exact weight formula in a Disclosure depth panel — every weight verbatim,
 * none rounded. Closes on the unified-search + deleted-endpoint RULE.
 */
export function Matching() {
  return (
    <CaseStudySection
      id="matching"
      index="12"
      kicker="Candidate matching & search"
      title="Two engines, never unified."
      lead="Two scoring engines with different weight semantics, kept deliberately separate — a locked decision surfaced as a design choice."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              {matching.jobBased.label}
            </Text>
            <Text variant="small">{matching.jobBased.body}</Text>
          </Stack>
        </Card>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="mute" as="h3">
              {matching.jdLess.label}
            </Text>
            <Text variant="small">{matching.jdLess.body}</Text>
          </Stack>
        </Card>
      </Grid>

      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={2}>
            <Flex gap={2} align="center">
              <Text variant="label" tone="mute" as="h3">
                Shipped
              </Text>
              <StatusBadge status="implemented" />
            </Flex>
            <List>
              {matching.shipped.map((item) => (
                <li key={item}>
                  <Text as="span" variant="small">
                    {item}
                  </Text>
                </li>
              ))}
            </List>
          </Stack>
        </Card>
        <Card level="sunken">
          <Stack gap={2}>
            <Flex gap={2} align="center">
              <Text variant="label" tone="mute" as="h3">
                Held behind a flag
              </Text>
              <StatusBadge status="flag-gated" />
            </Flex>
            <List>
              {matching.flagGated.map((item) => (
                <li key={item}>
                  <Text as="span" variant="small">
                    {item}
                  </Text>
                </li>
              ))}
            </List>
          </Stack>
        </Card>
      </Grid>

      <Disclosure id="matching-weights" summary="The job-based weight formula">
        <Stack gap={3}>
          <div className="overflow-x-auto">
            <table className="text-small w-full border-collapse">
              <caption className="sr-only">
                Job-based matching weight formula (RankerService)
              </caption>
              <thead>
                <tr className="border-hairline border-b text-left">
                  <th
                    scope="col"
                    className="text-mute text-label py-1 pr-4 font-mono tracking-[0.08em] uppercase"
                  >
                    Axis
                  </th>
                  <th
                    scope="col"
                    className="text-mute text-label py-1 font-mono tracking-[0.08em] uppercase"
                  >
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody>
                {matching.weights.map((row) => (
                  <tr
                    key={row.axis}
                    className="border-hairline border-b last:border-0"
                  >
                    <td className="py-1.5 pr-4">{row.axis}</td>
                    <td className="py-1.5 font-mono">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Text variant="small" tone="mute">
            Hard gate: missing any Critical skill zeroes the score.
          </Text>
        </Stack>
      </Disclosure>

      <Callout title="One unified search endpoint">{matching.note}</Callout>
    </CaseStudySection>
  );
}
