"use client";

import { useEffect, useRef, useState } from "react";

export type StoryStep = {
  id: string;
  label: string;
  sub: string;
  story: string;
};

export function AnimatedStoryFlow({
  title,
  steps,
  intervalMs = 2400,
}: {
  title: string;
  steps: StoryStep[];
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!playing || steps.length < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = prev + 1;
        if (next >= steps.length) {
          setPlaying(false);
          return prev;
        }
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [playing, steps.length, intervalMs]);

  useEffect(() => {
    const el = stepRefs.current[active];
    if (!el || !scrollerRef.current) return;
    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  const current = steps[active];

  function handlePlay() {
    if (active >= steps.length - 1) {
      setActive(0);
    }
    setPlaying(true);
  }

  function handlePause() {
    setPlaying(false);
  }

  function goPrev() {
    setPlaying(false);
    setActive((prev) => Math.max(0, prev - 1));
  }

  function goNext() {
    setPlaying(false);
    setActive((prev) => Math.min(steps.length - 1, prev + 1));
  }

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-[0_16px_48px_-32px_rgba(15,28,23,0.45)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)]/70 bg-[linear-gradient(135deg,#eef5f1_0%,#fffdf8_55%,#f7efe4_100%)] px-5 py-4 md:px-6">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
            Animated flow
          </p>
          <p
            className="mt-1 text-lg text-[var(--ink)] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={active === 0}
            className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-sm font-medium text-[var(--ink-soft)] transition enabled:hover:border-[var(--accent)]/40 enabled:hover:text-[var(--ink)] disabled:opacity-40"
          >
            Prev
          </button>
          {playing ? (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <span aria-hidden="true">❚❚</span>
              Pause
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Flow
            </button>
          )}
          <button
            type="button"
            onClick={goNext}
            disabled={active >= steps.length - 1}
            className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-sm font-medium text-[var(--ink-soft)] transition enabled:hover:border-[var(--accent)]/40 enabled:hover:text-[var(--ink)] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      <div className="px-4 py-6 md:px-6 md:py-8">
        {/* Mobile: full vertical list — nothing clipped */}
        <div className="flex flex-col items-center md:hidden">
          {steps.map((step, index) => {
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
                {index < steps.length - 1 && (
                  <div className="relative my-1 flex h-8 w-full items-center justify-center">
                    <div className="h-full w-px bg-[var(--line)]" />
                    <div
                      className={`absolute top-0 h-full w-0.5 origin-top bg-[var(--accent)] transition-transform duration-500 ${
                        isDone || isActive ? "scale-y-100" : "scale-y-0"
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

        {/* Desktop: scrollable row — every step fully visible */}
        <div
          ref={scrollerRef}
          className="hidden overflow-x-auto pb-2 md:block [-ms-overflow-style:none] [scrollbar-width:thin]"
        >
          <div className="flex min-w-min items-center gap-0 px-1 py-2">
            {steps.map((step, index) => {
              const isActive = index === active;
              const isDone = index < active;
              return (
                <div key={step.id} className="flex shrink-0 items-center">
                  <button
                    type="button"
                    ref={(node) => {
                      stepRefs.current[index] = node;
                    }}
                    onClick={() => {
                      setPlaying(false);
                      setActive(index);
                    }}
                    className={`relative w-[148px] rounded-2xl border-2 px-3 py-3.5 text-center transition-all duration-400 ${
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

                  {index < steps.length - 1 && (
                    <div className="story-connector relative mx-1 flex h-8 w-10 shrink-0 items-center justify-center">
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

        <div className="mt-6 rounded-2xl border border-[var(--accent)]/20 bg-[linear-gradient(180deg,#f4faf7_0%,#fffdf8_100%)] px-5 py-4 md:px-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
            Step {active + 1} of {steps.length}
          </p>
          <p className="mt-2 text-base leading-relaxed text-[var(--ink)] md:text-lg">
            {current.story}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {steps.map((step, index) => (
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
