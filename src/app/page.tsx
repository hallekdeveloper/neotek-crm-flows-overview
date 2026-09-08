"use client";

import { useEffect, useState } from "react";
import { OverviewTab } from "../components/tabs/OverviewTab";
import { AccountTab } from "../components/tabs/AccountTab";
import { OnboardingTab } from "../components/tabs/OnboardingTab";
import { CsTab } from "../components/tabs/CsTab";
import { CsDashboardTab } from "../components/tabs/CsDashboardTab";
import { RefundTab } from "../components/tabs/RefundTab";
import { RetentionTab } from "../components/tabs/RetentionTab";
import { VideosTab } from "../components/tabs/VideosTab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "account", label: "Account" },
  { id: "onboarding", label: "Onboarding" },
  { id: "cs", label: "CS Flow" },
  { id: "refund", label: "Refund Flow" },
  { id: "retention", label: "Retention Flow" },
  { id: "videos", label: "Video Guides" },
  { id: "cs-dashboard", label: "Dashboards & KPIs" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Home() {
  const [active, setActive] = useState<TabId>("overview");

  // Always open / refresh at the top (Overview hero), not the bottom status list
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--line)]/80 bg-[var(--card)]/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-5 py-5 md:px-8 md:py-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Neotek · Zoho CRM
          </p>
          <h1
            className="mt-2 max-w-2xl text-3xl leading-[1.1] text-[var(--ink)] md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How your CRM flows work
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)] md:text-base">
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
        {active === "onboarding" && <OnboardingTab />}
        {active === "cs" && <CsTab />}
        {active === "refund" && <RefundTab />}
        {active === "retention" && <RetentionTab />}
        {active === "videos" && <VideosTab />}
        {active === "cs-dashboard" && <CsDashboardTab />}
      </main>

      <footer className="border-t border-[var(--line)]/70 py-8 text-center text-sm text-[var(--ink-soft)]">
        Updated 8 Sep 2026 · Built for client review
      </footer>
    </div>
  );
}
