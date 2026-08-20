import type { ReactNode } from "react";

export function Badge({
  tone,
  children,
}: {
  tone: "live" | "partial" | "soon";
  children: ReactNode;
}) {
  const styles = {
    live: "bg-[#e4f0ea] text-[var(--live)]",
    partial: "bg-[#f5ead8] text-[var(--pending)]",
    soon: "bg-[#e8ecf0] text-[var(--soon)]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

export function Section({
  title,
  children,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
          {eyebrow}
        </p>
      )}
      <h2
        className="mb-5 text-2xl text-[var(--ink)] md:text-3xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_12px_40px_-28px_rgba(15,28,23,0.35)] md:p-6">
      {children}
    </div>
  );
}

export function Flow({
  steps,
}: {
  steps: { title: string; detail?: string; status?: "live" | "partial" | "soon" }[];
}) {
  return (
    <ol className="space-y-0">
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
          {i < steps.length - 1 && (
            <span className="absolute top-9 bottom-0 left-[15px] w-px bg-[var(--line)]" />
          )}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-[var(--ink)]">{step.title}</p>
              {step.status === "live" && <Badge tone="live">Live in Zoho</Badge>}
              {step.status === "partial" && <Badge tone="partial">Partly live</Badge>}
              {step.status === "soon" && <Badge tone="soon">Not yet</Badge>}
            </div>
            {step.detail && (
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                {step.detail}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ReqList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[var(--ink-soft)]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="bg-[var(--paper-2)]/80">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-[var(--ink)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[var(--line)] bg-[var(--card)]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[var(--ink-soft)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
