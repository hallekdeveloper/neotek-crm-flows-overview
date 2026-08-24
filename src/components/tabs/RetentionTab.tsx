"use client";

import { FlowDiagram, DiagramLegend } from "../Diagram";
import { Badge, Card, Flow, ReqList, Section, Table } from "../ui";

function fmt(d: Date) {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function addDays(base: Date, n: number) {
  const d = new Date(base);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}

export function RetentionTab() {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const todayLabel = fmt(today);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="partial">REN-01 live · stages next</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Retention starts with a daily renewal Task for yearly subscriptions.
          Full Retention stages come later.
        </p>
      </div>

      <Section eyebrow="1 · Overview" title="What Retention does today">
        <p className="mb-5 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Every day, Zoho runs schedule function{" "}
          <code className="rounded bg-[var(--paper)] px-1.5 py-0.5 text-xs text-[var(--ink)]">
            REN01_ScanSOsInRenewalWindow
          </code>
          . It looks at{" "}
          <strong className="text-[var(--ink)]">Sales Orders Uploading</strong>{" "}
          that are <strong className="text-[var(--ink)]">Active</strong> and{" "}
          <strong className="text-[var(--ink)]">Yearly / Annual</strong>. If the
          subscription ends within <strong className="text-[var(--ink)]">60 days</strong>,
          it creates one{" "}
          <strong className="text-[var(--ink)]">Renewal follow-up Task</strong>{" "}
          for the Account’s CS Specialist so they can call the customer before
          expiry.
        </p>
        <FlowDiagram
          title="Simple picture"
          nodes={[
            {
              id: "so",
              label: "Active yearly SO",
              sub: "Sales Orders Uploading",
              tone: "live",
            },
            {
              id: "w",
              label: "End Date within 60 days?",
              sub: "Daily schedule REN-01",
              tone: "live",
            },
            {
              id: "t",
              label: "Create Task",
              sub: "Renewal follow-up",
              tone: "live",
            },
            {
              id: "cs",
              label: "CS Specialist owns Task",
              sub: "Pool → CS Users",
              tone: "live",
            },
            {
              id: "call",
              label: "CS calls customer",
              sub: "Fill Task retention fields",
              tone: "live",
            },
          ]}
        />
        <DiagramLegend />
      </Section>

      <Section eyebrow="2 · Completed" title="What we built (client checklist)">
        <Card>
          <ReqList
            items={[
              "Schedule function REN01_ScanSOsInRenewalWindow — daily scan of Active Sales Orders Uploading.",
              "Rule: only Yearly / Annual payment frequency (Monthly skipped).",
              "Rule: Subscription End Date (or End Date) must be within 0–60 days from today.",
              "Creates a CRM Task related to the Account (not a separate Retention module yet).",
              "Task Owner = Account → CS Specialists → CS Assignment Pool → CS Users.",
              "Task Subject: Renewal follow-up | {Account Name} | expires {dd-MMM-yyyy}.",
              "Task Description snapshot: customer, tier, frequency, start/end, auto renewal, paid amount, offer, SO name, Subscription ID, days left, CS name.",
              "Due Date = today + 3 days · Status = Not Started · Priority = High.",
              "Field on Sales Orders Uploading: Renewal Task Created (checkbox) — set true after Task create (or if an open renewal Task already exists).",
              "No duplicate: skips if Renewal Task Created is already true, or an open Task subject contains “Renewal follow-up”.",
              "Skips cleanly when Account / CS Specialists / Pool / CS Users missing.",
            ]}
          />
        </Card>
      </Section>

      <Section eyebrow="3 · How it works" title="Step by step (REN-01)">
        <Flow
          steps={[
            {
              title: "Daily job starts",
              detail:
                "Pages Active Sales Orders Uploading (up to 15 × 200 records). Window = 60 days.",
              status: "live",
            },
            {
              title: "Filter each Sales Order",
              detail:
                "Skip if Renewal Task Created = true. Skip if Payment Frequency is not yearly/annual. Skip if no End Date. Skip if days left < 0 or > 60.",
              status: "live",
            },
            {
              title: "Resolve Account + CS Owner",
              detail:
                "SO must have Account. Load Account → CS Specialists (Pool) → CS Users (CRM user). Skip if any link is missing.",
              status: "live",
            },
            {
              title: "Check open renewal Tasks",
              detail:
                "If Account already has an open Task whose Subject contains “Renewal follow-up”, flag the SO and skip (no second Task).",
              status: "live",
            },
            {
              title: "Create the Task",
              detail:
                "Subject + Description + Owner + Due (+3) + Priority High + related to Account. Then set Renewal Task Created = true on the SO.",
              status: "live",
            },
            {
              title: "CS works the Task",
              detail:
                "Call the customer. Fill Willing to Renew, Need Support, Wish to Upgrade, Offer (and related Task fields). Complete the Task when done.",
              status: "live",
            },
            {
              title: "Later: Retention stages",
              detail:
                "Contacted → Negotiation → Renewed / Lost — not built yet (optional Retention record).",
              status: "soon",
            },
          ]}
        />
      </Section>

      <Section eyebrow="4 · Tasks" title="When is a Renewal Task created?">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Main output of Retention today is a{" "}
          <strong className="text-[var(--ink)]">Task</strong>. Use this table
          when testing or explaining to the client.
        </p>
        <Table
          headers={["Condition", "Task created?"]}
          rows={[
            [
              "Active + Yearly/Annual + End Date in 0–60 days + Account + CS Pool/User OK + no open renewal Task + flag false",
              "Yes",
            ],
            ["Renewal Task Created already true on the SO", "No"],
            ["Payment Frequency is Monthly (or not yearly/annual)", "No"],
            ["End Date blank", "No"],
            ["End Date already past (days left < 0)", "No"],
            ["End Date more than 60 days away", "No"],
            ["No Account on SO / Account not found", "No"],
            ["No CS Specialists / Pool / CS Users", "No"],
            ["Open Task already contains “Renewal follow-up”", "No (flag SO instead)"],
          ]}
        />
        <div className="mt-6">
          <Table
            headers={["Task field", "What is set"]}
            rows={[
              ["Subject", "Renewal follow-up | {Account Name} | expires {dd-MMM-yyyy}"],
              ["Owner", "CS Users from CS Assignment Pool"],
              ["Related To", "Account"],
              ["Due Date", "Today + 3 days"],
              ["Status", "Not Started"],
              ["Priority", "High"],
              [
                "Description",
                "Customer Name, Sub tier, Payment frequency, Start/End, Auto renewal, Paid amount, Offer, SO, Subscription ID, Days left, CS Specialist",
              ],
              [
                "CS fills on Task (manual)",
                "Willing to Renew · Need Support · Wish to Upgrade · Offer / outcome notes",
              ],
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="5 · Fields used" title="Sales Orders Uploading + Account">
        <Table
          headers={["Module · Field", "Role in REN-01"]}
          rows={[
            ["SO · Subscription Status", "Must be Active (search filter)"],
            ["SO · Payment Frequency", "Must contain year or annual"],
            ["SO · Subscription End Date / End Date", "Days left = today → End Date (0–60)"],
            ["SO · Subscription Start Date / Start Date", "Written into Task Description"],
            ["SO · Account", "Required — Task related to this Account"],
            ["SO · Renewal Task Created", "Checkbox — prevent duplicate Tasks"],
            ["SO · Product Tier / Product Name", "Description snapshot"],
            ["SO · Auto Renewal / Auto Renewal Activated", "Description snapshot"],
            ["SO · Offer Name / Offers", "Description snapshot"],
            ["SO · Actual Paid Amount", "Description snapshot"],
            ["SO · Subscription ID / Name", "Description snapshot"],
            ["Account · CS Specialists", "Lookup → CS Assignment Pool"],
            ["Pool · CS Users", "Task Owner (CRM user)"],
          ]}
        />
      </Section>

      <Section eyebrow="6 · How to test" title="5 use cases (client can run these)">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Today = <strong className="text-[var(--ink)]">{todayLabel}</strong>.
          Use a test Sales Order + Account that already has CS Specialists → Pool →
          CS Users. Clear <strong className="text-[var(--ink)]">Renewal Task Created</strong>{" "}
          before each positive test (set to false / unchecked). Close or delete any
          open “Renewal follow-up” Task on that Account first. Then run the schedule
          (or wait for the daily job) and check Tasks on the Account.
        </p>
        <Table
          headers={["#", "Setup on Sales Order", "Set End Date to", "Expected result"]}
          rows={[
            [
              "T1 · Happy path",
              "Status = Active · Frequency = Yearly or Annual · Account + CS linked · Renewal Task Created = false",
              fmt(addDays(today, 30)) + " (~30 days left)",
              "YES — Task created. Subject has Renewal follow-up. Owner = CS. Flag set true.",
            ],
            [
              "T2 · Outside window",
              "Same as T1 (Active yearly + CS OK + flag false)",
              fmt(addDays(today, 61)) + " (61 days left)",
              "NO Task — more than 60 days.",
            ],
            [
              "T3 · Monthly skipped",
              "Status = Active · Frequency = Monthly · End Date in window · flag false",
              fmt(addDays(today, 20)),
              "NO Task — yearly/annual only.",
            ],
            [
              "T4 · Already expired",
              "Active yearly · flag false · CS OK",
              fmt(addDays(today, -5)) + " (past)",
              "NO Task — days left < 0.",
            ],
            [
              "T5 · No duplicate",
              "After T1 succeeds (flag true), OR leave an open Renewal follow-up Task on the Account",
              "Keep End Date in window",
              "NO second Task — skipped (already flagged or open renewal Task).",
            ],
          ]}
        />
        <div className="mt-6">
          <Card>
            <p className="mb-2 text-sm font-semibold text-[var(--ink)]">
              After a successful T1 — what to check
            </p>
            <ReqList
              items={[
                "Account → related Tasks: one Task with Subject starting “Renewal follow-up | …”.",
                "Task Owner is the CS user from the Pool (not Account Owner unless they are the same person).",
                "Description lists customer, dates, days left, SO name.",
                "Sales Order: Renewal Task Created = true.",
                "Run the schedule again → no second Task (T5).",
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section eyebrow="7 · Not yet" title="Still to build">
        <Card>
          <ReqList
            items={[
              "Retention module / stages: Contacted, Negotiation, Renewed, Lost (with reason).",
              "Optional: auto-create a Retention record in addition to the Task.",
              "Optional: button on one Sales Order to create a renewal Task manually.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
