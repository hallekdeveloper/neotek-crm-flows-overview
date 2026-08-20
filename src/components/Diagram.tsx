"use client";

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  tone?: "live" | "partial" | "soon" | "neutral";
};

const toneClass = {
  live: "border-[#1a5c45]/45 bg-[#e8f3ed] text-[var(--ink)]",
  partial: "border-[#9a6b2f]/40 bg-[#f7ecdc] text-[var(--ink)]",
  soon: "border-[#5c6b7a]/35 bg-[#eef1f4] text-[var(--ink)]",
  neutral: "border-[var(--line)] bg-[var(--card)] text-[var(--ink)]",
} as const;

function ArrowDown() {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden>
      <div className="h-5 w-px bg-[var(--accent)]/50" />
      <svg width="14" height="10" viewBox="0 0 14 10" className="text-[var(--accent)]">
        <path d="M7 10L0 0h14L7 10z" fill="currentColor" />
      </svg>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="hidden items-center px-1 md:flex" aria-hidden>
      <div className="h-px w-6 bg-[var(--accent)]/50" />
      <svg width="10" height="14" viewBox="0 0 10 14" className="text-[var(--accent)]">
        <path d="M10 7L0 0v14L10 7z" fill="currentColor" />
      </svg>
    </div>
  );
}

function NodeBox({ node }: { node: DiagramNode }) {
  const tone = node.tone ?? "neutral";
  return (
    <div
      className={`min-w-[140px] max-w-[200px] rounded-xl border-2 px-3.5 py-3 text-center shadow-[0_8px_24px_-18px_rgba(15,28,23,0.45)] ${toneClass[tone]}`}
    >
      <p className="text-sm font-semibold leading-snug">{node.label}</p>
      {node.sub && (
        <p className="mt-1 text-[11px] leading-snug text-[var(--ink-soft)]">{node.sub}</p>
      )}
    </div>
  );
}

/** Vertical main path — best for long flows */
export function FlowDiagram({
  title,
  nodes,
}: {
  title?: string;
  nodes: DiagramNode[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 md:p-7">
      {title && (
        <p className="mb-5 text-center text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
          {title}
        </p>
      )}
      <div className="flex flex-col items-center">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center">
            <NodeBox node={node} />
            {i < nodes.length - 1 && <ArrowDown />}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Horizontal strip for short paths (stacks on mobile) */
export function FlowDiagramRow({
  title,
  nodes,
}: {
  title?: string;
  nodes: DiagramNode[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 md:p-6">
      {title && (
        <p className="mb-5 text-center text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
          {title}
        </p>
      )}
      <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:gap-y-3">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center md:flex-row">
            <NodeBox node={node} />
            {i < nodes.length - 1 && (
              <>
                <div className="md:hidden">
                  <ArrowDown />
                </div>
                <ArrowRight />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Branch: one parent → two children */
export function BranchDiagram({
  title,
  parent,
  left,
  right,
  leftLabel,
  rightLabel,
}: {
  title?: string;
  parent: DiagramNode;
  left: DiagramNode;
  right: DiagramNode;
  leftLabel?: string;
  rightLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 md:p-7">
      {title && (
        <p className="mb-5 text-center text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
          {title}
        </p>
      )}
      <div className="flex flex-col items-center">
        <NodeBox node={parent} />
        <ArrowDown />
        {/* fork line */}
        <div className="relative mb-2 w-full max-w-md">
          <div className="mx-auto h-px w-[70%] bg-[var(--accent)]/45" />
          <div className="absolute top-0 left-[15%] h-4 w-px bg-[var(--accent)]/45" />
          <div className="absolute top-0 right-[15%] h-4 w-px bg-[var(--accent)]/45" />
        </div>
        <div className="grid w-full max-w-lg grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center">
            {leftLabel && (
              <span className="mb-2 rounded-full bg-[var(--paper-2)] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                {leftLabel}
              </span>
            )}
            <NodeBox node={left} />
          </div>
          <div className="flex flex-col items-center">
            {rightLabel && (
              <span className="mb-2 rounded-full bg-[var(--paper-2)] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                {rightLabel}
              </span>
            )}
            <NodeBox node={right} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DiagramLegend() {
  return (
    <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--ink-soft)]">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-3 rounded border-2 border-[#1a5c45]/45 bg-[#e8f3ed]" /> Live
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-3 rounded border-2 border-[#9a6b2f]/40 bg-[#f7ecdc]" /> Partly live
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-3 rounded border-2 border-[#5c6b7a]/35 bg-[#eef1f4]" /> Not yet
      </span>
    </div>
  );
}
