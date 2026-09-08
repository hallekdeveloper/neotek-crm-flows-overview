"use client";

import { useEffect, useState } from "react";

const STEPS = [
  {
    id: "crm",
    label: "Zoho CRM",
    sub: "Accounts · Tasks · CS Pool",
    story:
      "Live CS data sits in Zoho CRM — Accounts, CS Assignment Pool, and Tasks update as specialists work.",
  },
  {
    id: "sync",
    label: "Syncing",
    sub: "CRM → Analytics",
    story:
      "Data keeps syncing into Zoho Analytics. The pipeline stays on so reports stay close to CRM reality.",
  },
  {
    id: "analytics",
    label: "Zoho Analytics",
    sub: "X Analytics workspace",
    story:
      "Zoho Analytics (X Analytics) receives the CRM tables and builds the Customer Success models.",
  },
  {
    id: "kpis",
    label: "Dashboards & KPIs",
    sub: "Reports refresh",
    story:
      "The Customer Success dashboard and reports refresh — totals, CS workload, and task status stay current.",
  },
] as const;

const KPI_FLASH = [
  { label: "Accounts", value: "13" },
  { label: "Tasks open", value: "21" },
  { label: "Completed", value: "26" },
];

export function KpiSyncAnimation() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
      setTick((t) => t + 1);
    }, 2200);
    return () => window.clearInterval(id);
  }, [playing]);

  const current = STEPS[active];
  const onKpis = current.id === "kpis";
  const onSync = current.id === "sync";

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-[0_16px_48px_-32px_rgba(15,28,23,0.45)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)]/70 bg-[linear-gradient(135deg,#eef5f1_0%,#fffdf8_55%,#f7efe4_100%)] px-5 py-4 md:px-6">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
            <span
              className={`inline-block h-2 w-2 rounded-full bg-[var(--accent)] ${
                playing ? "kpi-sync-pulse" : ""
              }`}
              aria-hidden
            />
            Live sync loop
          </p>
          <p
            className="mt-1 text-lg text-[var(--ink)] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CRM → Analytics → Dashboards & KPIs
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {playing ? (
            <>
              <span aria-hidden="true">❚❚</span>
              Pause sync
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Resume sync
            </>
          )}
        </button>
      </div>

      <div className="px-4 py-6 md:px-6 md:py-8">
        {/* Mobile vertical */}
        <div className="flex flex-col items-center md:hidden">
          {STEPS.map((step, index) => {
            const isActive = index === active;
            const isDone = index < active;
            return (
              <div key={step.id} className="flex w-full max-w-sm flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setActive(index);
                  }}
                  className={`relative w-full rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-400 ${
                    isActive
                      ? "border-[var(--accent)] bg-[#e8f3ed] shadow-[0_12px_32px_-16px_rgba(26,92,69,0.55)]"
                      : isDone
                        ? "border-[#1a5c45]/35 bg-[#f3f8f5]"
                        : "border-[var(--line)] bg-[var(--paper)]"
                  }`}
                >
                  <span
                    className={`mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                      isActive
                        ? "bg-[var(--accent)] text-white"
                        : isDone
                          ? "bg-[#1a5c45]/20 text-[var(--accent)]"
                          : "bg-[var(--paper-2)] text-[var(--ink-soft)]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold text-[var(--ink)]">{step.label}</p>
                  <p className="mt-1 text-[11px] text-[var(--ink-soft)]">{step.sub}</p>
                  {isActive && (
                    <span className="story-ring pointer-events-none absolute inset-0 rounded-2xl" />
                  )}
                </button>
                {index < STEPS.length - 1 && (
                  <div className="relative my-1 flex h-8 w-full items-center justify-center">
                    <div className="h-full w-px bg-[var(--line)]" />
                    <div
                      className={`absolute top-0 h-full w-0.5 origin-top bg-[var(--accent)] transition-transform duration-500 ${
                        isDone || isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    {(isActive || (playing && index === active)) && (
                      <span className="story-dot story-dot-run absolute h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(26,92,69,0.18)]" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop horizontal */}
        <div className="hidden overflow-x-auto pb-2 md:block [-ms-overflow-style:none] [scrollbar-width:thin]">
          <div className="flex min-w-min items-center justify-center gap-0 px-1 py-2">
            {STEPS.map((step, index) => {
              const isActive = index === active;
              const isDone = index < active;
              return (
                <div key={step.id} className="flex shrink-0 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setActive(index);
                    }}
                    className={`relative w-[150px] rounded-2xl border-2 px-3 py-3.5 text-center transition-all duration-400 ${
                      isActive
                        ? "border-[var(--accent)] bg-[#e8f3ed] shadow-[0_12px_32px_-16px_rgba(26,92,69,0.55)]"
                        : isDone
                          ? "border-[#1a5c45]/35 bg-[#f3f8f5]"
                          : "border-[var(--line)] bg-[var(--paper)]"
                    }`}
                  >
                    <span
                      className={`mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                        isActive
                          ? "bg-[var(--accent)] text-white"
                          : isDone
                            ? "bg-[#1a5c45]/20 text-[var(--accent)]"
                            : "bg-[var(--paper-2)] text-[var(--ink-soft)]"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold leading-snug text-[var(--ink)]">
                      {step.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-[var(--ink-soft)]">
                      {step.sub}
                    </p>
                    {isActive && (
                      <span className="story-ring pointer-events-none absolute inset-0 rounded-2xl" />
                    )}
                  </button>

                  {index < STEPS.length - 1 && (
                    <div className="story-connector relative mx-1 flex h-8 w-12 shrink-0 items-center justify-center">
                      <div className="absolute inset-y-1/2 left-0 right-0 h-px -translate-y-1/2 bg-[var(--line)]" />
                      <div
                        className={`absolute inset-y-1/2 left-0 right-0 h-0.5 -translate-y-1/2 origin-left bg-[var(--accent)] transition-transform duration-500 ${
                          isDone || isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                      {isActive && (
                        <span className="story-dot story-dot-run absolute h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(26,92,69,0.18)]" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sync status + KPI flash */}
        <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-[var(--accent)]/20 bg-[linear-gradient(180deg,#f4faf7_0%,#fffdf8_100%)] px-5 py-4 md:px-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
              {onSync ? "Syncing now" : `Step ${active + 1} of ${STEPS.length}`}
              {playing && (
                <span className="ml-2 inline-flex items-center gap-1 font-medium normal-case tracking-normal text-[var(--ink-soft)]">
                  <span className="kpi-sync-spin inline-block h-3 w-3 rounded-full border-2 border-[var(--accent)]/25 border-t-[var(--accent)]" />
                  looping
                </span>
              )}
            </p>
            <p className="mt-2 text-base leading-relaxed text-[var(--ink)] md:text-lg">
              {current.story}
            </p>
          </div>

          <div
            className={`rounded-2xl border px-4 py-4 transition-all duration-500 ${
              onKpis
                ? "border-[var(--accent)]/40 bg-[#e8f3ed] shadow-[0_12px_32px_-20px_rgba(26,92,69,0.45)]"
                : "border-[var(--line)] bg-[var(--paper)]/70"
            }`}
          >
            <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
              {onKpis ? "KPIs updating" : "KPI preview"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {KPI_FLASH.map((kpi) => (
                <div
                  key={`${kpi.label}-${onKpis ? tick : "idle"}`}
                  className={`rounded-xl border border-[var(--line)] bg-[var(--card)] px-2 py-2.5 text-center ${
                    onKpis ? "kpi-value-pop" : ""
                  }`}
                >
                  <p
                    className="text-xl font-semibold text-[var(--ink)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-tight text-[var(--ink-soft)]">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              type="button"
              aria-label={`Go to step ${index + 1}`}
              onClick={() => {
                setPlaying(false);
                setActive(index);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-7 bg-[var(--accent)]"
                  : "w-2.5 bg-[var(--line)] hover:bg-[var(--accent)]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
