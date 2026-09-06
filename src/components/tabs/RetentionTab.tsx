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
        <Badge tone="live">Retention module live</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Button + daily schedule create a{" "}
          <strong className="text-[var(--ink)]">Retention</strong> record (not a
          Task) for yearly subscriptions in the 60-day window.
        </p>
      </div>

      <Section eyebrow="1 · Overview" title="What Retention does today">
        <p className="mb-5 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Retention starts from{" "}
          <strong className="text-[var(--ink)]">Sales Orders Uploading</strong>.
          When a subscription is{" "}
          <strong className="text-[var(--ink)]">Active</strong>,{" "}
          <strong className="text-[var(--ink)]">Yearly / Annual</strong>, and the{" "}
          <strong className="text-[var(--ink)]">Subscription End Date</strong> is
          within <strong className="text-[var(--ink)]">0–60 days</strong>, Zoho
          creates one record in the{" "}
          <strong className="text-[var(--ink)]">Retention</strong> module —
          owned by the Account’s CS Specialist — so the team can follow up before
          expiry.
        </p>
        <p className="mb-5 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Two ways to create it:
        </p>
        <ul className="mb-5 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-soft)]">
          <li>
            <strong className="text-[var(--ink)]">Retention button</strong> on
            the Sales Order (manual) — function{" "}
            <code className="rounded bg-[var(--paper)] px-1.5 py-0.5 text-xs text-[var(--ink)]">
              Dev_REN01_Create_Renewal_FollowUp_Task_Btn
            </code>
          </li>
          <li>
            <strong className="text-[var(--ink)]">Daily schedule</strong>{" "}
            <code className="rounded bg-[var(--paper)] px-1.5 py-0.5 text-xs text-[var(--ink)]">
              REN01_ScanSOsInRenewalWindow
            </code>{" "}
            — automatic scan
          </li>
        </ul>
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
              sub: "Button or daily REN-01",
              tone: "live",
            },
            {
              id: "r",
              label: "Create Retention",
              sub: "Module · Pipeline = Backlog",
              tone: "live",
            },
            {
              id: "cs",
              label: "CS Specialist owns it",
              sub: "Pool → CS Users",
              tone: "live",
            },
            {
              id: "work",
              label: "CS works Retention",
              sub: "Move pipeline · renew / churn",
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
              "Retention button on Sales Orders Uploading — creates a Retention record for that SO.",
              "Schedule function REN01_ScanSOsInRenewalWindow — daily scan of Active SOs in the End Date window.",
              "Rule: only Yearly / Annual payment frequency (Monthly skipped).",
              "Rule: Subscription End Date (or End Date) must be within 0–60 days from today.",
              "Creates a record in the Retention module (not a CRM Task).",
              "Retention Owner = Account → CS Specialists → CS Assignment Pool → CS Users.",
              "Retention Name = {Account Name} - {SO Name}.",
              "Expiration Date = Subscription End Date · Pipeline1 = Backlog.",
              "Field on Sales Orders Uploading: Renewal Task Created (checkbox) — set true after Retention create (or if an open Retention already exists).",
              "No duplicate: skips if Renewal Task Created is already true, or Account already has an open Retention (Pipeline1 not Retained / not Churned).",
              "Skips cleanly when Account / CS Specialists / Pool / CS Users missing.",
              "Same eligibility rules for button and schedule.",
            ]}
          />
        </Card>
      </Section>

      <Section eyebrow="3 · How it works" title="Step by step (button + schedule)">
        <Flow
          steps={[
            {
              title: "Trigger",
              detail:
                "User clicks Retention on a Sales Order, or the daily schedule runs REN01_ScanSOsInRenewalWindow.",
              status: "live",
            },
            {
              title: "Filter the Sales Order",
              detail:
                "Must be Active. Payment Frequency must be Yearly/Annual. End Date must be in 0–60 days. Skip if Renewal Task Created = true.",
              status: "live",
            },
            {
              title: "Resolve Account + CS Owner",
              detail:
                "SO must have Account. Load Account → CS Specialists (Pool) → CS Users (CRM user). Skip if any link is missing.",
              status: "live",
            },
            {
              title: "Check open Retention records",
              detail:
                "If Account already has a Retention whose Pipeline1 is not Retained and not Churned, flag the SO and skip (no second record).",
              status: "live",
            },
            {
              title: "Create the Retention record",
              detail:
                "Name, Account, Owner, Expiration Date, Pipeline1 = Backlog. Then set Renewal Task Created = true on the SO.",
              status: "live",
            },
            {
              title: "CS works the Retention",
              detail:
                "Contact the customer, update pipeline (e.g. toward Retained or Churned) on the Retention record.",
              status: "live",
            },
          ]}
        />
      </Section>

      <Section eyebrow="4 · Retention record" title="When is a Retention created?">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Main output today is a{" "}
          <strong className="text-[var(--ink)]">Retention</strong> module record.
          Use this table when testing or explaining to the client.
        </p>
        <Table
          headers={["Condition", "Retention created?"]}
          rows={[
            [
              "Active + Yearly/Annual + End Date in 0–60 days + Account + CS Pool/User OK + no open Retention + flag false",
              "Yes",
            ],
            ["Renewal Task Created already true on the SO", "No"],
            ["Payment Frequency is Monthly (or not yearly/annual)", "No"],
            ["End Date blank", "No"],
            ["End Date already past (days left < 0)", "No"],
            ["End Date more than 60 days away", "No"],
            ["No Account on SO / Account not found", "No"],
            ["No CS Specialists / Pool / CS Users", "No"],
            [
              "Open Retention already exists on Account (Pipeline ≠ Retained / Churned)",
              "No (flag SO instead)",
            ],
          ]}
        />
        <div className="mt-6">
          <Table
            headers={["Retention field", "What is set"]}
            rows={[
              ["Name", "{Account Name} - {SO Name}"],
              ["Account", "Linked Account from the Sales Order"],
              ["Owner", "CS Users from CS Assignment Pool"],
              ["Expiration Date", "Subscription End Date"],
              ["Pipeline1", "Backlog"],
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="5 · Fields used" title="Sales Orders Uploading + Account">
        <Table
          headers={["Module · Field", "Role in REN-01"]}
          rows={[
            ["SO · Subscription Status", "Must be Active"],
            ["SO · Payment Frequency", "Must contain year or annual"],
            ["SO · Subscription End Date / End Date", "Days left = today → End Date (0–60)"],
            ["SO · Account", "Required — Retention related to this Account"],
            [
              "SO · Renewal Task Created",
              "Checkbox — prevent duplicate Retention creates",
            ],
            ["Account · CS Specialists", "Lookup → CS Assignment Pool"],
            ["Pool · CS Users", "Retention Owner (CRM user)"],
          ]}
        />
      </Section>

      <Section eyebrow="6 · How to test" title="Use cases (button + schedule)">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Today = <strong className="text-[var(--ink)]">{todayLabel}</strong>.
          Use a test Sales Order + Account that already has CS Specialists → Pool →
          CS Users. Clear{" "}
          <strong className="text-[var(--ink)]">Renewal Task Created</strong>{" "}
          before each positive test. Ensure there is no open Retention on that
          Account (or move existing ones to Retained/Churned). Then click the
          Retention button or run the schedule once.
        </p>
        <Table
          headers={["#", "Setup on Sales Order", "Set End Date to", "Expected result"]}
          rows={[
            [
              "B1 · Button happy path",
              "Status = Active · Frequency = Yearly/ANNUAL · Account + CS linked · Renewal Task Created = false",
              fmt(addDays(today, 30)) + " (~30 days left)",
              "YES — Retention created. Pipeline = Backlog. Owner = CS. Flag set true.",
            ],
            [
              "B2 · Button duplicate",
              "After B1 (flag true), click Retention again",
              "Keep End Date in window",
              "NO second Retention — already created.",
            ],
            [
              "S1 · Schedule happy path",
              "Active yearly · CS OK · flag false · no open Retention",
              fmt(addDays(today, 30)),
              "YES — Retention created by schedule.",
            ],
            [
              "S2 · Schedule outside window",
              "Active yearly · CS OK · flag false",
              fmt(addDays(today, 90)) + " (~90 days left)",
              "NO Retention — more than 60 days.",
            ],
            [
              "S3 · Schedule Monthly skipped",
              "Status = Active · Frequency = Monthly · End Date in window · flag false",
              fmt(addDays(today, 20)),
              "NO Retention — yearly/annual only.",
            ],
          ]}
        />
        <div className="mt-6">
          <Card>
            <p className="mb-2 text-sm font-semibold text-[var(--ink)]">
              After a successful create — what to check
            </p>
            <ReqList
              items={[
                "Retention module: one record named “{Account} - {SO}”.",
                "Pipeline1 = Backlog · Expiration Date = SO End Date.",
                "Owner is the CS user from the Pool (not Account Owner unless they are the same person).",
                "Sales Order: Renewal Task Created = true.",
                "Run button or schedule again → no second Retention.",
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section eyebrow="7 · Not yet" title="Still optional / later">
        <Card>
          <ReqList
            items={[
              "Monthly subscriptions creating Retention (today: Yearly/Annual only).",
              "Extra Retention pipeline stages / reasons beyond Backlog → Retained / Churned (team process).",
              "Rename checkbox Renewal Task Created → clearer label (e.g. Retention Created) — functional today as-is.",
            ]}
          />
        </Card>
      </Section>

      <Section
        eyebrow="8 · Previously"
        title="Previously — notes (not important · for info only)"
      >
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          This section is{" "}
          <strong className="text-[var(--ink)]">not important for day-to-day use</strong>.
          It only records what Retention did{" "}
          <strong className="text-[var(--ink)]">before</strong> the client change
          to create Retention module records.
        </p>
        <Card>
          <ReqList
            items={[
              "Previously, REN-01 created a CRM Task (not a Retention module record).",
              "Task Subject was: Renewal follow-up | {Account Name} | expires {dd-MMM-yyyy}.",
              "Task Due Date = today + 3 · Status = Not Started · Priority = High · Related To = Account.",
              "Task Description held a snapshot: customer, tier, frequency, start/end, auto renewal, paid amount, offer, SO, Subscription ID, days left, CS name.",
              "Duplicate control previously checked open Tasks whose Subject contained “Renewal follow-up” (not Retention Pipeline1).",
              "There was no Retention module create from the button/schedule at that time — stages like Contacted / Negotiation were listed as “not yet”.",
              "CS was expected to fill Willing to Renew, Need Support, Wish to Upgrade, and offer notes on the Task.",
              "Schedule originally scanned all Active SOs and filtered by days left in code; later versions search End Date in the 0–60 day window only (faster).",
              "The checkbox Renewal Task Created was named for Tasks; it is still used today to flag that Retention was already created.",
              "Client then asked to stop creating Tasks and instead create a Retention record (Pipeline = Backlog) from both the button and the schedule — that is what is live now.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
