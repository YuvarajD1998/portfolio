'use client';

import { Rocket, Star, Zap } from 'lucide-react';

import {
  Alert,
  ArchitecturePanel,
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  Code,
  CodeBlock,
  Container,
  CopyButton,
  Display,
  Divider,
  EmptyState,
  ErrorState,
  ExternalLink,
  Fade,
  FeatureCard,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  InlineCode,
  Link,
  List,
  LoadingState,
  MetricCard,
  Progress,
  Quote,
  QuoteBlock,
  Section,
  Skeleton,
  Spinner,
  Stack,
  StatisticBlock,
  Subheading,
  SuccessState,
  Tag,
  Text,
  ThemeToggle,
  Timeline,
  TooltipProvider,
  ToastProvider,
} from '@/components';

import { Demo, DemoSection } from './_parts';
import { InteractiveDemos } from './InteractiveDemos';

/**
 * Component showcase (Sprint 02 §12) — the isolated development surface.
 *
 * Renders every component with variants + states, in whichever theme the toggle
 * sets. NOT a portfolio page and excluded from production (see middleware.ts).
 * It composes only library components — no page-specific styling.
 */
export default function ShowcasePage() {
  return (
    <ToastProvider>
      <TooltipProvider delayDuration={200}>
        <Section spacing="sm">
          <Container>
            <Stack gap={4}>
              <Flex justify="between" align="center" wrap>
                <Text variant="label" tone="mute">
                  Datum · Sprint 02 · dev showcase
                </Text>
                <ThemeToggle />
              </Flex>
              <Display>The component library</Display>
              <Subheading>
                Every part, in both themes, with variants and states exercised —
                the validation surface for the design system.
              </Subheading>
            </Stack>

            <div className="mt-16">
              <Stack gap={16}>
                {/* ---- Typography ---- */}
                <DemoSection id="typography" title="Typography" meta="§04">
                  <Demo label="Scale">
                    <Stack gap={3}>
                      <Heading size="h1" as="h3">
                        Heading H1
                      </Heading>
                      <Heading size="h2" as="h3">
                        Heading H2
                      </Heading>
                      <Heading size="h3" as="h3">
                        Heading H3
                      </Heading>
                      <Text>Body text — the workhorse paragraph style.</Text>
                      <Text variant="small">
                        Small text for captions and meta.
                      </Text>
                      <Text variant="label">Mono label</Text>
                      <Text>
                        Inline <InlineCode>code</InlineCode> inside a sentence,
                        and a <Link href="#typography">link</Link>.
                      </Text>
                    </Stack>
                  </Demo>
                  <Demo label="Quote & list">
                    <Stack gap={5}>
                      <Quote attribution="— Design Bible">
                        Whitespace is content; the datum rule is structure.
                      </Quote>
                      <List>
                        <List.Item>First item</List.Item>
                        <List.Item>Second item</List.Item>
                      </List>
                    </Stack>
                  </Demo>
                  <Demo label="Code block">
                    <Code>{`const x = 1;\nconst y = 2;`}</Code>
                  </Demo>
                </DemoSection>

                {/* ---- Buttons ---- */}
                <DemoSection id="buttons" title="Button system" meta="§06">
                  <Demo label="Variants">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </Demo>
                  <Demo label="Sizes, icons, states">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button leadingIcon={Rocket}>Leading</Button>
                    <Button trailingIcon={Zap}>Trailing</Button>
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <IconButton icon={Star} label="Favourite" />
                  </Demo>
                </DemoSection>

                {/* ---- Data display ---- */}
                <DemoSection id="data-display" title="Data display" meta="§07">
                  <Demo label="Cards & feature cards">
                    <Grid cols={{ base: 1, md: 3 }} className="w-full">
                      <Card>
                        <Text>A plain card surface.</Text>
                      </Card>
                      <FeatureCard icon={Zap} title="Fast">
                        Feature card with an icon, title and copy.
                      </FeatureCard>
                      <MetricCard
                        label="Uptime"
                        value="99.9%"
                        trend={{ direction: 'up', delta: '+0.2%' }}
                      />
                    </Grid>
                  </Demo>
                  <Demo label="Badges, tags, avatar">
                    <Badge tone="signal">Signal</Badge>
                    <Badge tone="success">Success</Badge>
                    <Badge tone="warning">Warning</Badge>
                    <Badge tone="danger">Danger</Badge>
                    <Tag>Keyword</Tag>
                    <Tag onRemove={() => undefined}>Removable</Tag>
                    <Avatar name="Yuvaraj D" />
                  </Demo>
                  <Demo label="Statistic, timeline">
                    <Flex gap={12} align="start" wrap>
                      <StatisticBlock value="12+" caption="years shipping" />
                      <Timeline>
                        <Timeline.Item time="2024" title="Milestone one">
                          Something happened.
                        </Timeline.Item>
                        <Timeline.Item time="2025" title="Milestone two">
                          Something else happened.
                        </Timeline.Item>
                      </Timeline>
                    </Flex>
                  </Demo>
                  <Demo label="Code block, callout, quote block">
                    <Stack gap={5} className="w-full">
                      <CodeBlock
                        filename="Button.tsx"
                        language="tsx"
                        code={`<Button variant="primary">Save</Button>`}
                      />
                      <Callout title="Governing principle">
                        Build the parts, not the pages.
                      </Callout>
                      <QuoteBlock
                        quote="A calm, legible system that stays out of the way."
                        authorName="Yuvaraj D"
                        authorRole="Engineer"
                      />
                    </Stack>
                  </Demo>
                  <Demo label="Architecture panel">
                    <ArchitecturePanel title="System">
                      <ArchitecturePanel.Layer label="Frontend">
                        <ArchitecturePanel.Node>React</ArchitecturePanel.Node>
                        <ArchitecturePanel.Node>Next.js</ArchitecturePanel.Node>
                      </ArchitecturePanel.Layer>
                      <ArchitecturePanel.Layer label="Backend">
                        <ArchitecturePanel.Node>NestJS</ArchitecturePanel.Node>
                        <ArchitecturePanel.Node>
                          Postgres
                        </ArchitecturePanel.Node>
                      </ArchitecturePanel.Layer>
                    </ArchitecturePanel>
                  </Demo>
                </DemoSection>

                {/* ---- Feedback (static) ---- */}
                <DemoSection id="feedback" title="Feedback" meta="§08">
                  <Demo label="Alerts">
                    <Stack gap={3} className="w-full">
                      <Alert status="info" title="Heads up">
                        Informational.
                      </Alert>
                      <Alert status="success" title="Done">
                        It worked.
                      </Alert>
                      <Alert status="warning" title="Careful">
                        Check this.
                      </Alert>
                      <Alert status="error" title="Failed">
                        Something broke.
                      </Alert>
                    </Stack>
                  </Demo>
                  <Demo label="Loaders">
                    <Spinner label="Loading" />
                    <div className="w-40">
                      <Progress value={65} label="Progress" />
                    </div>
                    <div className="w-40">
                      <Skeleton />
                      <div className="mt-2">
                        <Skeleton width="60%" />
                      </div>
                    </div>
                  </Demo>
                  <Demo label="State panels">
                    <Grid cols={{ base: 1, md: 2 }} className="w-full">
                      <Card padding="none">
                        <EmptyState
                          title="Nothing here yet"
                          description="Add your first item."
                        />
                      </Card>
                      <Card padding="none">
                        <LoadingState />
                      </Card>
                      <Card padding="none">
                        <SuccessState
                          title="All set"
                          description="You're done."
                        />
                      </Card>
                      <Card padding="none">
                        <ErrorState description="Try again in a moment." />
                      </Card>
                    </Grid>
                  </Demo>
                </DemoSection>

                {/* ---- Interactive (client) ---- */}
                <DemoSection
                  id="interactive"
                  title="Forms, overlays & nav"
                  meta="§07/§08/§05"
                >
                  <InteractiveDemos />
                </DemoSection>

                {/* ---- Utility & motion ---- */}
                <DemoSection
                  id="utility"
                  title="Utility, icons & motion"
                  meta="§09"
                >
                  <Demo label="Icons & copy & external">
                    <Icon icon={Star} />
                    <CopyButton value="copied text" />
                    <ExternalLink href="https://example.com">
                      External link
                    </ExternalLink>
                  </Demo>
                  <Demo label="Motion — reveal on scroll (honours reduced-motion)">
                    <Fade>
                      <Card>
                        <Text>This card fades in.</Text>
                      </Card>
                    </Fade>
                  </Demo>
                  <Demo label="Divider weights">
                    <Stack gap={4} className="w-full">
                      <Divider weight="hairline" />
                      <Divider weight="rule" />
                      <Divider weight="datum" />
                    </Stack>
                  </Demo>
                </DemoSection>
              </Stack>
            </div>
          </Container>
        </Section>
      </TooltipProvider>
    </ToastProvider>
  );
}
