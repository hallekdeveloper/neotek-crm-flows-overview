"use client";

import { useState } from "react";
import { OverviewTab } from "../components/tabs/OverviewTab";
import { AccountTab } from "../components/tabs/AccountTab";
import { CsTab } from "../components/tabs/CsTab";
import { RefundTab } from "../components/tabs/RefundTab";
import { RetentionTab } from "../components/tabs/RetentionTab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "account", label: "Account" },
  { id: "cs", label: "CS Flow" },
  { id: "refund", label: "Refund Flow" },
  { id: "retention", label: "Retention Flow" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Home() {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)]/80 bg-[var(--card)]/70 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">
          <p className="text-xs font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Neotek · Zoho CRM
          </p>
          <h1
            className="mt-3 max-w-2xl text-4xl leading-[1.1] text-[var(--ink)] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How your CRM flows work
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">
            One simple place to see business rules, what is live in Zoho today,
            and what comes next. No technical jargon.
          </p>
        </div>

        <nav className="mx-auto max-w-5xl overflow-x-auto px-5 md:px-8">
          <div className="flex min-w-max gap-1 border-t border-[var(--line)]/60 pt-1">
            {tabs.map((tab) => {
              const on = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`relative px-4 py-3.5 text-sm font-medium transition-colors ${
                    on
                      ? "text-[var(--accent)]"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {tab.label}
                  {on && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
        {active === "overview" && <OverviewTab onGo={setActive} />}
        {active === "account" && <AccountTab />}
        {active === "cs" && <CsTab />}
        {active === "refund" && <RefundTab />}
        {active === "retention" && <RetentionTab />}
      </main>

      <footer className="border-t border-[var(--line)]/70 py-8 text-center text-sm text-[var(--ink-soft)]">
        Updated 20 Aug 2026 · Built for client review
      </footer>
    </div>
  );
}
