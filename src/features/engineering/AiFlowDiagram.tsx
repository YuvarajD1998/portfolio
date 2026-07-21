/**
 * AiFlowDiagram — the grounded-AI request path (Sprint 08 §12, content-blocker
 * C3).
 *
 * Purpose:      Render the load-bearing AI engineering decision as a figure: a
 *               model call is never trusted blind. The request flows NestJS →
 *               FastAPI → model cascade, but the return path is re-grounded and
 *               re-validated by the application layer, logged to `ai_call_log`,
 *               and only then surfaced as an inspectable, explanation-backed
 *               result — never a bare score (P10B AI-integration philosophy).
 *               Its accuracy is a review gate (S08 §12 RULE), so it renders only
 *               frozen Product-Book facts.
 * Public API:   No props — the diagram is the fixed §12 grounded-AI path.
 * A11y:         Inline SVG (no external request); `role="img"` with a `<title>` +
 *               `<desc>` text alternative and a visible `<figcaption>` semantic
 *               caption (S08 §12, §22 accessible diagrams). Every node is also
 *               stated as text in the surrounding section, so the figure is never
 *               the sole carrier of meaning.
 * Responsive:   Scales via `viewBox`; the figure scrolls within its own
 *               `overflow-x-auto` container and never forces page overflow
 *               (S08 §21 responsive RULE).
 * Composition:  Inside §12 AI integration, beside the philosophy & workflow
 *               lists.
 *
 * Colours come from CSS custom properties (`var(--token)`) so the figure swaps
 * with the light / dark theme like every other surface — no hardcoded hex.
 */
export function AiFlowDiagram() {
  const titleId = 'ai-flow-title';
  const descId = 'ai-flow-desc';

  return (
    <figure className="border-hairline overflow-hidden rounded-md border">
      <figcaption className="border-hairline bg-surface text-mute text-label border-b px-4 py-2 font-mono tracking-[0.14em] uppercase">
        Grounded AI — the model is never trusted blind
      </figcaption>
      <div className="bg-paper overflow-x-auto p-4">
        <svg
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          viewBox="0 0 720 300"
          className="h-auto w-full min-w-[560px]"
          style={{ color: 'var(--ink)' }}
        >
          <title id={titleId}>Transpahire grounded-AI request path</title>
          <desc id={descId}>
            The NestJS backend calls the stateless FastAPI AI service, which
            runs a model cascade with per-capability fallback. The model output
            is not returned as-is: the application layer re-grounds it against
            the real source text and re-validates it, every call is logged to
            the ai_call_log table for cost and cascade visibility, and only then
            is an inspectable result surfaced — a match score always accompanied
            by a grounded explanation backed by real resume text, never a bare
            or hallucinated score.
          </desc>

          <defs>
            <marker
              id="ai-arrow"
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

          {/* NestJS — caller / authority */}
          <rect
            x="24"
            y="120"
            width="150"
            height="60"
            rx="4"
            fill="var(--signal-tint)"
            stroke="var(--signal)"
          />
          <text
            x="99"
            y="146"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="13"
            fill="var(--ink)"
            fontWeight="600"
          >
            NestJS
          </text>
          <text
            x="99"
            y="164"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            calls · owns authority
          </text>

          {/* FastAPI + model cascade */}
          <rect
            x="230"
            y="30"
            width="200"
            height="60"
            rx="4"
            fill="var(--surface)"
            stroke="var(--hairline)"
          />
          <text
            x="330"
            y="56"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="13"
            fill="var(--ink)"
            fontWeight="600"
          >
            FastAPI · model cascade
          </text>
          <text
            x="330"
            y="74"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            per-capability fallback
          </text>

          {/* Re-ground & re-validate */}
          <rect
            x="230"
            y="120"
            width="200"
            height="60"
            rx="4"
            fill="var(--surface)"
            stroke="var(--hairline)"
          />
          <text
            x="330"
            y="146"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="13"
            fill="var(--ink)"
            fontWeight="600"
          >
            re-ground + re-validate
          </text>
          <text
            x="330"
            y="164"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            against real source text
          </text>

          {/* ai_call_log */}
          <rect
            x="230"
            y="210"
            width="200"
            height="52"
            rx="4"
            fill="var(--surface)"
            stroke="var(--hairline)"
            strokeDasharray="4 3"
          />
          <text
            x="330"
            y="232"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="12"
            fill="var(--ink)"
            fontWeight="600"
          >
            ai_call_log
          </text>
          <text
            x="330"
            y="248"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            cost + cascade visibility
          </text>

          {/* Inspectable result */}
          <rect
            x="486"
            y="120"
            width="210"
            height="60"
            rx="4"
            fill="var(--surface)"
            stroke="var(--hairline)"
          />
          <text
            x="591"
            y="146"
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontSize="13"
            fill="var(--ink)"
            fontWeight="600"
          >
            inspectable result
          </text>
          <text
            x="591"
            y="164"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            score + grounded explanation
          </text>

          {/* Edges */}
          {/* NestJS → cascade */}
          <line
            x1="120"
            y1="120"
            x2="250"
            y2="90"
            stroke="var(--mute)"
            strokeWidth="1.5"
            markerEnd="url(#ai-arrow)"
          />
          <text
            x="120"
            y="100"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--mute)"
          >
            internal key
          </text>
          {/* cascade → re-ground */}
          <line
            x1="330"
            y1="90"
            x2="330"
            y2="120"
            stroke="var(--mute)"
            strokeWidth="1.5"
            markerEnd="url(#ai-arrow)"
          />
          {/* re-ground → ai_call_log */}
          <line
            x1="330"
            y1="180"
            x2="330"
            y2="210"
            stroke="var(--mute)"
            strokeWidth="1.5"
            markerEnd="url(#ai-arrow)"
          />
          {/* re-ground → result */}
          <line
            x1="430"
            y1="150"
            x2="486"
            y2="150"
            stroke="var(--mute)"
            strokeWidth="1.5"
            markerEnd="url(#ai-arrow)"
          />
        </svg>
      </div>
    </figure>
  );
}
