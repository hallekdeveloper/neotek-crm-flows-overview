"use client";

import { KpiSyncAnimation } from "../KpiSyncAnimation";
import { Badge, Card, Section, Table } from "../ui";

const DASHBOARD =
  "https://analytics.zoho.sa/open-view/107461000001277972";
const REPORT_TASKS =
  "https://analytics.zoho.sa/open-view/107461000001277271";
const REPORT_CS =
  "https://analytics.zoho.sa/open-view/107461000001277251";

const MODULE_TABS = [
  {
    name: "Accounts",
    focus: "Customer companies and CS ownership",
    shows: [
      "Top KPIs / totals for Accounts",
      "Trends by CS Specialist",
      "Breakdown by industry",
      "Breakdown by Account type",
    ],
  },
  {
    name: "Tasks",
    focus: "CS follow-up and work queue",
    shows: [
      "Open / overdue overview",
      "Status breakdown",
      "Supporting Task reports under the KPIs",
    ],
  },
  {
    name: "Contacts",
    focus: "People linked to customers",
    shows: [
      "Contact volume KPIs",
      "Lead source view",
      "Monthly trend",
    ],
  },
  {
    name: "Retention",
    focus: "Renewal follow-up records",
    shows: [
      "Retention totals",
      "Breakdown by Owner (CS)",
      "Supporting Retention reports",
    ],
  },
  {
    name: "Refund",
    focus: "Refund pipeline volume",
    shows: [
      "Refund totals",
      "Breakdown by Owner (CS)",
      "Supporting Refund reports",
    ],
  },
  {
    name: "Sales Orders Uploading",
    focus: "Subscription upload volume",
    shows: [
      "Upload volume by Owner",
      "Supporting SO reports under the KPIs",
    ],
  },
] as const;

export function CsDashboardTab() {
  return (
    <div>
      <div className="mb-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 md:p-6">
        <Badge tone="live">Zoho Analytics · live</Badge>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)] md:text-base">
          The{" "}
          <strong className="text-[var(--ink)]">Customer Success</strong> dashboard
          is built in Zoho Analytics (workspace: X Analytics).{" "}
          <strong className="text-[var(--ink)]">KPIs come from Zoho CRM</strong>.
          There is <strong className="text-[var(--ink)]">one tab per module</strong> —
          each tab shows top KPIs first, then supporting reports underneath.
        </p>
      </div>

      <div className="mb-10">
        <KpiSyncAnimation />
      </div>

      <Section eyebrow="1 · Open dashboard" title="Customer Success dashboard">
        <p className="mb-5 max-w-3xl leading-relaxed text-[var(--ink-soft)]">
          Use this dashboard to see totals and trends across Accounts, Tasks,
          Contacts, Retention, Refund, and Sales Orders Uploading — without opening
          each CRM module separately.
        </p>
        <Card>
          <p className="mb-1 text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
            Open live dashboard
          </p>
          <a
            href={DASHBOARD}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Open Customer Success dashboard
            <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-3 break-all text-xs text-[var(--ink-soft)]">{DASHBOARD}</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            In Analytics, use the <strong className="text-[var(--ink)]">tabs at the top</strong>{" "}
            to switch modules.
          </p>
        </Card>
      </Section>

      <Section eyebrow="2 · Preview" title="Dashboard in this page">
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)]">
          If the embed loads below, you can browse here. If your browser blocks it,
          use the button above for full screen.
        </p>
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-[0_16px_48px_-32px_rgba(15,28,23,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)]/70 bg-[linear-gradient(135deg,#eef5f1_0%,#fffdf8_55%,#f7efe4_100%)] px-4 py-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
              Zoho Analytics · Customer Success
            </p>
            <a
              href={DASHBOARD}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              Full screen ↗
            </a>
          </div>
          <iframe
            title="Customer Success dashboard — Zoho Analytics"
            src={DASHBOARD}
            className="h-[720px] w-full bg-white"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="fullscreen"
          />
        </div>
      </Section>

      <Section eyebrow="3 · Tabs inside the dashboard" title="What each module tab shows">
        <p className="mb-5 max-w-3xl leading-relaxed text-[var(--ink-soft)]">
          The dashboard has <strong className="text-[var(--ink)]">six module tabs</strong>.
          Open a tab for that module’s KPIs and the reports under them.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {MODULE_TABS.map((tab, index) => (
            <Card key={tab.name}>
              <p className="mb-1 text-xs font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                Tab {index + 1}
              </p>
              <h3
                className="mb-1 text-xl text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tab.name}
              </h3>
              <p className="mb-3 text-sm text-[var(--ink-soft)]">{tab.focus}</p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--ink-soft)]">
                {tab.shows.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="4 · Quick map" title="Module → what you measure">
        <Table
          headers={["Dashboard tab", "CRM area", "Main view"]}
          rows={[
            ["Accounts", "Accounts", "Totals + trends by CS Specialist, industry, type"],
            ["Tasks", "Tasks", "Open / overdue + status breakdown"],
            ["Contacts", "Contacts", "Volume + lead source / monthly trend"],
            ["Retention", "Retention", "Totals + by Owner"],
            ["Refund", "Refund", "Totals + by Owner"],
            [
              "Sales Orders Uploading",
              "Sales Orders Uploading",
              "By Owner (upload volume)",
            ],
          ]}
        />
      </Section>

      <Section eyebrow="5 · Supporting reports" title="Detailed Analytics reports">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          These open-view reports support deeper drill-down behind the main
          dashboard.
        </p>

        <div className="space-y-5">
          <Card>
            <p className="mb-1 text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
              Report 1
            </p>
            <h3
              className="text-xl text-[var(--ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Accounts Tasks by Status
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              Shows <strong className="text-[var(--ink)]">CRM Tasks per Account</strong>,
              broken down by status — backlog (Not Started) vs finished work per
              customer.
            </p>
            <a
              href={REPORT_TASKS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block break-all text-sm font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              {REPORT_TASKS}
            </a>
          </Card>

          <Card>
            <p className="mb-1 text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
              Report 2
            </p>
            <h3
              className="text-xl text-[var(--ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Accounts by CS Specialist
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              Shows how many <strong className="text-[var(--ink)]">Accounts</strong>{" "}
              sit with each CS Assignment Pool specialist — workload balance for
              Round Robin and capacity.
            </p>
            <a
              href={REPORT_CS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block break-all text-sm font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              {REPORT_CS}
            </a>
          </Card>
        </div>
      </Section>

      <Section eyebrow="6 · How to use" title="Simple reading guide">
        <Card>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            <li>Open the dashboard (button or embed above).</li>
            <li>
              Pick a module tab (Accounts, Tasks, Contacts, Retention, Refund, or
              Sales Orders Uploading).
            </li>
            <li>
              Read the <strong className="text-[var(--ink)]">top KPIs</strong> first.
            </li>
            <li>
              Scroll to the <strong className="text-[var(--ink)]">reports underneath</strong>{" "}
              for trends, owners, and breakdowns.
            </li>
            <li>
              For business rules behind the numbers, use{" "}
              <strong className="text-[var(--ink)]">CS Flow</strong>,{" "}
              <strong className="text-[var(--ink)]">Refund Flow</strong>, and{" "}
              <strong className="text-[var(--ink)]">Retention Flow</strong> tabs.
            </li>
          </ol>
          <p className="mt-5 text-sm text-[var(--ink-soft)]">
            Path: <strong className="text-[var(--ink)]">Zoho CRM → Zoho Analytics → this documentation</strong>.
            Numbers refresh as CRM data changes.
          </p>
        </Card>
      </Section>
    </div>
  );
}
