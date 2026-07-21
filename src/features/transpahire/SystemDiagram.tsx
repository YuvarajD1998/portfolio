/**
 * SystemDiagram — the four-repos / one-database architecture figure
 * (Sprint 07 §09, content-blocker C4).
 *
 * Purpose:      The high-level system diagram the Product Book flags as
 *               MISSING from the source repos — building it clearly here is a
 *               genuine contribution of the case study, and its accuracy is a
 *               review gate (S07 §09 callout). It renders the frozen facts: four
 *               independently deployed repos, the browser → NestJS → FastAPI
 *               call direction, and the load-bearing rule that NestJS owns all
 *               authority while FastAPI is stateless AI compute sharing ONE
 *               Postgres DB (Prisma owns migrations even for FastAPI's tables).
 * Public API:   No props — the diagram is the fixed §09 architecture.
 * A11y:         Inline SVG (no external request); `role="img"` with a `<title>`
 *               + `<desc>` text alternative, and a visible `<figcaption>`
 *               semantic caption (S07 §09 RULE, §22 accessible diagrams). All
 *               nodes are also stated as text in the surrounding section, so the
 *               figure is never the sole carrier of meaning.
 * Responsive:   Scales via `viewBox`; the figure scrolls within its own
 *               `overflow-x-auto` container and never forces page overflow
 *               (S07 §21 responsive RULE).
 * Composition:  Inside §09 System architecture, beside the repo cards + scale.
 *
 * Colours come from CSS custom properties (`var(--token)`) so the figure swaps
 * with the light/dark theme like every other surface — no hardcoded hex.
 */
export function SystemDiagram() {
  const titleId = 'system-diagram-title';
  const descId = 'system-diagram-desc';

  return (
    <figure className="border-hairline overflow-hidden rounded-md border">
      <figcaption className="border-hairline bg-surface text-mute text-label border-b px-4 py-2 font-mono tracking-[0.14em] uppercase">
        System architecture — four repos, one database
      </figcaption>
      <div className="bg-paper overflow-x-auto p-4">
        <svg
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          viewBox="0 0 720 360"
          className="h-auto w-full min-w-[560px]"
          style={{ color: 'var(--ink)' }}
        >
          <title id={titleId}>Transpahire system architecture</title>
          <desc id={descId}>
            The browser SPA and the static landing site sit at the top. The
            browser calls the NestJS backend, which owns all authority, every
            write and every migration. NestJS alone calls the stateless FastAPI
            AI service over an internal API key; the frontend never calls
            FastAPI directly. Both NestJS and FastAPI connect to one shared
            PostgreSQL database with pgvector, but Prisma (in NestJS) is the
            sole owner of schema migrations even for the embedding and
            ai_call_log tables FastAPI reads and writes. NestJS also uses Redis
            with BullMQ for background jobs.
          </desc>

          {/* shared token-driven styles */}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--mute)" />
            </marker>
          </defs>

          {/* Clients row */}
          <g>
            <rect
              x="40"
              y="20"
              width="200"
              height="56"
              rx="4"
              fill="var(--surface)"
              stroke="var(--hairline)"
            />
            <text
              x="140"
              y="44"
              textAnchor="middle"
              fontFamily="var(--font-ui)"
              fontSize="14"
              fill="var(--ink)"
              fontWeight="600"
            >
              frontend · SPA
            </text>
            <text
              x="140"
              y="62"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--mute)"
            >
              React 19 / Vite 6
            </text>

            <rect
              x="480"
              y="20"
              width="200"
              height="56"
              rx="4"
              fill="var(--surface)"
              stroke="var(--hairline)"
            />
            <text
              x="580"
              y="44"
              textAnchor="middle"
              fontFamily="var(--font-ui)"
              fontSize="14"
              fill="var(--ink)"
              fontWeight="600"
            >
              transpahire-landing
            </text>
            <text
              x="580"
              y="62"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--mute)"
            >
              static · no API calls
            </text>
          </g>

          {/* NestJS — authority */}
          <rect
            x="40"
            y="140"
            width="240"
            height="72"
            rx="4"
            fill="var(--signal-tint)"
            stroke="var(--signal)"
          />
          <text
            x="160"
            y="168"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="14"
            fill="var(--ink)"
            fontWeight="600"
          >
            transpahire-backend · NestJS
          </text>
          <text
            x="160"
            y="186"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--signal)"
          >
            owns ALL authority + migrations
          </text>
          <text
            x="160"
            y="202"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--mute)"
          >
            Prisma · JWT · guards
          </text>

          {/* FastAPI — stateless compute */}
          <rect
            x="440"
            y="140"
            width="240"
            height="72"
            rx="4"
            fill="var(--surface)"
            stroke="var(--hairline)"
          />
          <text
            x="560"
            y="168"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="14"
            fill="var(--ink)"
            fontWeight="600"
          >
            fastapi-backend · Python
          </text>
          <text
            x="560"
            y="186"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--mute)"
          >
            stateless AI compute
          </text>
          <text
            x="560"
            y="202"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--mute)"
          >
            no authority
          </text>

          {/* Redis */}
          <rect
            x="40"
            y="270"
            width="160"
            height="52"
            rx="4"
            fill="var(--surface)"
            stroke="var(--hairline)"
          />
          <text
            x="120"
            y="292"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="13"
            fill="var(--ink)"
            fontWeight="600"
          >
            Redis · BullMQ
          </text>
          <text
            x="120"
            y="308"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            queues + caches
          </text>

          {/* Shared Postgres */}
          <rect
            x="280"
            y="270"
            width="240"
            height="52"
            rx="4"
            fill="var(--surface)"
            stroke="var(--hairline)"
            strokeDasharray="0"
          />
          <text
            x="400"
            y="292"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="13"
            fill="var(--ink)"
            fontWeight="600"
          >
            PostgreSQL + pgvector
          </text>
          <text
            x="400"
            y="308"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            one shared database
          </text>

          {/* Edges */}
          {/* browser → NestJS */}
          <line
            x1="140"
            y1="76"
            x2="150"
            y2="140"
            stroke="var(--mute)"
            strokeWidth="1.5"
            markerEnd="url(#arrow)"
          />
          <text
            x="120"
            y="112"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            REST / JWT
          </text>

          {/* NestJS → FastAPI (only path) */}
          <line
            x1="280"
            y1="176"
            x2="440"
            y2="176"
            stroke="var(--mute)"
            strokeWidth="1.5"
            markerEnd="url(#arrow)"
          />
          <text
            x="300"
            y="166"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            internal API key only
          </text>

          {/* NestJS → Redis */}
          <line
            x1="120"
            y1="212"
            x2="120"
            y2="270"
            stroke="var(--mute)"
            strokeWidth="1.5"
            markerEnd="url(#arrow)"
          />

          {/* NestJS → Postgres */}
          <line
            x1="200"
            y1="212"
            x2="340"
            y2="270"
            stroke="var(--mute)"
            strokeWidth="1.5"
            markerEnd="url(#arrow)"
          />
          {/* FastAPI → Postgres */}
          <line
            x1="540"
            y1="212"
            x2="460"
            y2="270"
            stroke="var(--mute)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#arrow)"
          />
          <text
            x="470"
            y="250"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            raw SQLAlchemy (read/write few tables)
          </text>
        </svg>
      </div>
    </figure>
  );
}
