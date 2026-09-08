import { Badge, Card, Section } from "../ui";

const DASHBOARD =
  "https://analytics.zoho.sa/open-view/107461000001277972";
const REPORT_TASKS =
  "https://analytics.zoho.sa/open-view/107461000001277271";
const REPORT_CS =
  "https://analytics.zoho.sa/open-view/107461000001277251";

export function CsDashboardTab() {
  return (
    <div>
      <div className="mb-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 md:p-6">
        <Badge tone="live">Live documentation</Badge>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)] md:text-base">
          This page explains how the{" "}
          <strong className="text-[var(--ink)]">Customer Success Dashboard</strong>{" "}
          works. <strong className="text-[var(--ink)]">KPIs and account / task
          data come from Zoho CRM</strong>. The{" "}
          <strong className="text-[var(--ink)]">dashboard and reports are built
          in Zoho Analytics</strong> (workspace: X Analytics) and published as
          open views for the team.
        </p>
      </div>

      <Section eyebrow="Main dashboard" title="Customer Success Dashboard">
        <p className="mb-5 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Overview of Neotek customer accounts and CS workload: total accounts,
          open and overdue tasks, accounts per CS Specialist, and task status by
          account.
        </p>
        <Card>
          <p className="mb-1 text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
            Open live dashboard
          </p>
          <a
            href={DASHBOARD}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-base font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
          >
            {DASHBOARD}
          </a>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            Zoho Analytics view:{" "}
            <strong className="text-[var(--ink)]">Customer Success</strong>. Tabs
            inside the dashboard: <strong className="text-[var(--ink)]">Accounts</strong>{" "}
            and <strong className="text-[var(--ink)]">Tasks</strong>.
          </p>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Accounts",
              value: "13",
              hint: "All CRM accounts in the CS view",
            },
            {
              label: "New Accounts This Month",
              value: "10",
              hint: "Created in the current month",
            },
            {
              label: "With CS Specialist",
              value: "13",
              hint: "Accounts assigned via CS Assignment Pool",
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_12px_40px_-28px_rgba(15,28,23,0.35)]"
            >
              <p className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                {kpi.label}
              </p>
              <p
                className="mt-2 text-3xl font-semibold text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {kpi.value}
              </p>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{kpi.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Card>
            <p className="mb-3 text-sm font-semibold text-[var(--ink)]">
              What you see on the dashboard (from live Analytics)
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-soft)]">
              <li>
                <strong className="text-[var(--ink)]">Accounts tab</strong> —
                KPI cards (Total Accounts, New This Month, With CS Specialist)
                plus chart/table{" "}
                <em>Accounts by CS Specialist</em>.
              </li>
              <li>
                Live split observed:{" "}
                <strong className="text-[var(--ink)]">Mashhor Alqarni — 9</strong>
                , <strong className="text-[var(--ink)]">Nader Elsayed — 4</strong>{" "}
                (Grand Count 13). Chart may also show pool labels such as CS Admin.
              </li>
              <li>
                <strong className="text-[var(--ink)]">Tasks tab</strong> —
                CS workload by task status (open / overdue / completed style
                views aligned to CRM Tasks).
              </li>
              <li>
                Data refreshes from{" "}
                <strong className="text-[var(--ink)]">Zoho CRM → Zoho Analytics</strong>
                . Numbers above are a live snapshot for documentation and will
                change as CRM data changes.
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Detailed reports" title="Supporting Analytics reports">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          These two open-view reports power the deeper drill-down behind the
          main dashboard. Open each link in Zoho Analytics for the full table.
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
              broken down by status. Use it to see how much work sits on each
              customer (and unassigned / no-account rows).
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-soft)]">
              <li>
                Columns include <strong className="text-[var(--ink)]">Account Name</strong>,{" "}
                <strong className="text-[var(--ink)]">Completed</strong>,{" "}
                <strong className="text-[var(--ink)]">Not Started</strong>, and
                subject / count totals.
              </li>
              <li>
                Live snapshot: Grand Count{" "}
                <strong className="text-[var(--ink)]">Completed 26</strong>,{" "}
                <strong className="text-[var(--ink)]">Not Started 21</strong>,{" "}
                total subjects <strong className="text-[var(--ink)]">47</strong>.
              </li>
              <li>
                Example rows: <em>-No Value-</em> (tasks without account) and
                test account <em>ZTEST-10 Darb Al Najah Est.</em>
              </li>
              <li>
                Helps CS leads spot backlog (Not Started) vs finished work per
                account.
              </li>
            </ul>
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
              are owned by each CS Assignment Pool specialist. This is the
              workload balance view for Round Robin and capacity.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-soft)]">
              <li>
                Columns:{" "}
                <strong className="text-[var(--ink)]">CS Assignment Pool Owner Name</strong>{" "}
                and <strong className="text-[var(--ink)]">Account Name Count</strong>.
              </li>
              <li>
                Live snapshot:{" "}
                <strong className="text-[var(--ink)]">Mashhor Alqarni — 9 accounts</strong>
                ; <strong className="text-[var(--ink)]">Nader Elsayed — 4 accounts</strong>
                ; Grand Count <strong className="text-[var(--ink)]">13</strong>.
              </li>
              <li>
                Same split appears on the main Customer Success dashboard chart.
              </li>
              <li>
                Source path: Zoho CRM Accounts ↔ CS Assignment Pool → synced into
                Zoho Analytics.
              </li>
            </ul>
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

      <Section eyebrow="How it fits" title="CRM → Analytics → this dashboard">
        <Card>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            <li>
              <strong className="text-[var(--ink)]">Zoho CRM</strong> holds
              Accounts, CS Assignment Pool, and Tasks (CS workflows create /
              update these).
            </li>
            <li>
              <strong className="text-[var(--ink)]">Zoho Analytics</strong>{" "}
              (X Analytics) builds the Customer Success dashboard and the two
              detailed reports above.
            </li>
            <li>
              <strong className="text-[var(--ink)]">This documentation site</strong>{" "}
              links the live open views so anyone can open the dashboard and
              understand what each KPI / report means — without changing CRM
              data.
            </li>
          </ol>
          <p className="mt-5 text-sm text-[var(--ink-soft)]">
            For CS automation rules (Stage, Round Robin, Tasks), see the{" "}
            <strong className="text-[var(--ink)]">CS Flow</strong> tab.
          </p>
        </Card>
      </Section>
    </div>
  );
}
