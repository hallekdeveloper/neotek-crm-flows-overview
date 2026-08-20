"use client";

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

export function RefundTab() {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const todayLabel = fmt(today);

  const monthlyRows = [
    ["M1", "Same day (day 0)", fmt(today), "MONTHLY", "Create refund"],
    ["M2", "Last allowed day (day 3)", fmt(addDays(today, -3)), "MONTHLY", "Create refund"],
    ["M3", "One day late (day 4)", fmt(addDays(today, -4)), "MONTHLY", "Blocked — window closed"],
    ["M4", "Start in future", fmt(addDays(today, 3)), "MONTHLY", "Blocked — Start in the future"],
  ];

  const annualRows = [
    ["A1", "Same day (day 0)", fmt(today), "ANNUAL", "Create refund"],
    ["A2", "Last allowed day (day 5)", fmt(addDays(today, -5)), "ANNUAL", "Create refund"],
    ["A3", "One day late (day 6)", fmt(addDays(today, -6)), "ANNUAL", "Blocked — window closed"],
    ["A4", "Start in future", fmt(addDays(today, 3)), "ANNUAL", "Blocked — Start in the future"],
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="partial">Create + bank collection live</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Finance payout confirmation is the remaining piece.
        </p>
      </div>

      <Section eyebrow="Refund Flow" title="Business requirements">
        <Card>
          <ReqList
            items={[
              "One button on Sales Orders Uploading creates the Refund.",
              "Only Active subscriptions.",
              "Monthly: (Today − Start Date) ≤ 3 days.",
              "Annual / Yearly: (Today − Start Date) ≤ 5 days.",
              "End Date is ignored for eligibility (it is the subscription end).",
              "Map Account, first Contact, CS Owner, amount, CR, subscription number.",
              "Pipeline uses existing Refund Cycle (Backlog → … → Ticket Closed).",
              "Collect bank details (manual or form), then Finance pays and closes.",
            ]}
          />
        </Card>
      </Section>

      <Section title="End-to-end flow">
        <Card>
          <Flow
            steps={[
              {
                title: "Click Create Refund on Sales Order",
                detail: "Checks Active + Monthly/Annual window. Creates Refund in Backlog.",
                status: "live",
              },
              {
                title: "CS reviews (Refund Cycle blueprint)",
                detail: "Move through stages such as In Contact → Eligible → Waiting for Response.",
                status: "live",
              },
              {
                title: "Collect bank details",
                detail: "Manual Entry or Send Form to Customer (email). Reminder after 2 days if needed.",
                status: "live",
              },
              {
                title: "CS notifies Finance",
                detail: "Action / option still to be added.",
                status: "soon",
              },
              {
                title: "Finance deposits and confirms done",
                detail: "Then emails to CS and customer.",
                status: "soon",
              },
            ]}
          />
        </Card>
      </Section>

      <Section title="Eligibility — old vs new (your feedback)">
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <Card>
            <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--pending)] uppercase">
              Before
            </p>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
              We wrongly required End Date to be exactly 3 or 5 days after Start.
              Real Annual End Dates are ~1 year later, so valid orders were blocked.
            </p>
          </Card>
          <Card>
            <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--live)] uppercase">
              Now (live)
            </p>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
              We only compare Today to Start Date. Monthly ≤ 3 days. Annual ≤ 5 days.
              End Date is not used for this check.
            </p>
          </Card>
        </div>
        <Table
          headers={["Plan", "Rule", `Example (Start ${todayLabel})`, "Last day"]}
          rows={[
            [
              "Monthly",
              "(Today − Start) ≤ 3",
              `${todayLabel} → ${fmt(addDays(today, 3))} allowed`,
              fmt(addDays(today, 3)),
            ],
            [
              "Annual",
              "(Today − Start) ≤ 5",
              `${todayLabel} → ${fmt(addDays(today, 5))} allowed`,
              fmt(addDays(today, 5)),
            ],
          ]}
        />
      </Section>

      <Section eyebrow="For testers" title="Test cases — use these Start Dates">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Today is treated as <strong className="text-[var(--ink)]">{todayLabel}</strong>.
          On the Sales Order: set <strong className="text-[var(--ink)]">Subscription Status = Active</strong>,
          set <strong className="text-[var(--ink)]">Payment Frequency</strong>, change only{" "}
          <strong className="text-[var(--ink)]">Start Date</strong> as below, then click Create Refund.
          End Date can stay as-is. Close any open Refund for that subscription first.
        </p>

        <p className="mb-3 text-sm font-semibold text-[var(--ink)]">
          MONTHLY — allowed if (Today − Start) ≤ 3
        </p>
        <div className="mb-8">
          <Table
            headers={["#", "Case", "Set Start Date to", "Payment Frequency", "Expected"]}
            rows={monthlyRows}
          />
        </div>

        <p className="mb-3 text-sm font-semibold text-[var(--ink)]">
          ANNUAL / YEARLY — allowed if (Today − Start) ≤ 5
        </p>
        <Table
          headers={["#", "Case", "Set Start Date to", "Payment Frequency", "Expected"]}
          rows={annualRows}
        />
      </Section>

      <Section title="What is completed and running in Zoho">
        <Card>
          <ReqList
            items={[
              "Dev / Create Refund button on Sales Orders Uploading — working.",
              "Eligibility Active + 3/5 days — working (tested 20 Aug).",
              "Owner = CS Specialist; Account + Contact mapped — working.",
              "Bank Details Collection Method — working.",
              "Zoho Form → Bank Name, Account Number, IBAN + related list — working.",
              "CS notification email on form submit — working.",
              "2-day form reminder workflow — working.",
              "Finance notify + completion emails — not live yet.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
