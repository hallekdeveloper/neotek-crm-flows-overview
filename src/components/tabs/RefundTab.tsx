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

function EmailCard({
  name,
  to,
  subject,
  body,
  status,
}: {
  name: string;
  to: string;
  subject: string;
  body: string;
  status: "live" | "partial" | "soon";
}) {
  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h3 className="font-semibold text-[var(--ink)]">{name}</h3>
        <Badge tone={status}>
          {status === "live" ? "Live" : status === "partial" ? "Partly live" : "Not yet"}
        </Badge>
      </div>
      <p className="mb-1 text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
        To · {to}
      </p>
      <p className="mb-3 text-sm font-medium text-[var(--ink)]">Subject: {subject}</p>
      <pre className="whitespace-pre-wrap rounded-xl bg-[var(--paper)] p-4 text-sm leading-relaxed text-[var(--ink-soft)]">
        {body}
      </pre>
    </Card>
  );
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
          Full refund picture below — modules, fields, form, emails, and test cases.
        </p>
      </div>

      {/* 1 Requirements */}
      <Section eyebrow="1 · Requirements" title="What the client asked for">
        <Card>
          <ReqList
            items={[
              "Button on Sales Orders Uploading creates a Refund.",
              "Refund Owner = Account CS Specialist.",
              "Map Account + first Contact (email & phone).",
              "Only Active subscriptions.",
              "Monthly: (Today − Start Date) ≤ 3 days.",
              "Annual / Yearly: (Today − Start Date) ≤ 5 days.",
              "End Date is subscription end — not used for the refund window.",
              "Bank details: Manual Entry OR email Zoho Form to customer.",
              "If form not submitted in 2 days → reminder email.",
              "When form is submitted → update bank fields + email CS Owner.",
              "CS notifies Finance → Finance pays → confirm done → email CS + customer.",
              "WhatsApp for form can come later (email works now).",
            ]}
          />
        </Card>
      </Section>

      {/* 2 Modules */}
      <Section eyebrow="2 · Modules in Zoho" title="Which modules are involved">
        <Table
          headers={["Module", "Role in Refund"]}
          rows={[
            ["Sales Orders Uploading", "Source record. Create Refund button lives here."],
            ["Accounts", "Company. Holds CS Specialists and related Contacts."],
            ["Contacts", "First Contact under Account → Refund Contact, Email, Phone."],
            ["CS Assignment Pool", "CS Specialists lookup → CS Users = Refund Owner."],
            ["Refund", "Main refund ticket. Pipeline, bank details, emails."],
            ["Zoho Forms", "Bank Details Form — customer fills IBAN etc."],
          ]}
        />
      </Section>

      {/* 3 Complete flow */}
      <Section eyebrow="3 · Complete flow" title="Step by step (everything)">
        <Card>
          <Flow
            steps={[
              {
                title: "Sales Order — click Create Refund",
                detail:
                  "Checks Active + Monthly/Annual window. Blocks if Account, Contact, or CS Specialist missing. Blocks second open refund for same subscription.",
                status: "live",
              },
              {
                title: "Refund created",
                detail:
                  "Owner = CS Specialist. Account + Contact + Email + Phone filled. Pipeline = Backlog (or New | Backlog). Amount, CR, Subscription Number copied.",
                status: "live",
              },
              {
                title: "CS moves Refund Cycle blueprint",
                detail:
                  "Backlog → In Contact → Eligible / Not Eligible → Waiting for Response → Compensation / Refund → Ticket Closed.",
                status: "live",
              },
              {
                title: "CS chooses Bank Details Collection Method",
                detail: "Manual Entry OR Send Form to Customer.",
                status: "live",
              },
              {
                title: "A) Manual Entry",
                detail: "CS types Bank Name, Account Number, IBAN on the Refund. No form email. No Form Send Date. No 2-day reminder.",
                status: "live",
              },
              {
                title: "B) Send Form to Customer",
                detail:
                  "Email with Zoho Form link. Form Send Date set. Customer submits → Bank Name / Account / IBAN updated + form on related list. Bank Detail Submit checked. CS emailed immediately.",
                status: "live",
              },
              {
                title: "Reminder (form path only)",
                detail:
                  "2 days after Form Send Date, if Bank Detail Submit still empty → reminder email to customer.",
                status: "live",
              },
              {
                title: "CS notifies Finance",
                detail: "Dedicated option / action — to be added.",
                status: "soon",
              },
              {
                title: "Finance pays and marks refund done",
                detail: "Then emails to CS and customer.",
                status: "soon",
              },
            ]}
          />
        </Card>
      </Section>

      {/* 4 Eligibility */}
      <Section eyebrow="4 · Eligibility" title="When Create Refund is allowed">
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <Card>
            <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--pending)] uppercase">
              Before (wrong)
            </p>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
              Required End Date exactly 3 or 5 days after Start. Real Annual End Dates
              (~1 year later) were blocked.
            </p>
          </Card>
          <Card>
            <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--live)] uppercase">
              Now (live)
            </p>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
              Active + (Today − Start Date) ≤ 3 for Monthly, ≤ 5 for Annual. End Date ignored.
            </p>
          </Card>
        </div>
        <Table
          headers={["Plan", "Rule", "Last allowed day if Start = today"]}
          rows={[
            ["Monthly", "(Today − Start) ≤ 3", fmt(addDays(today, 3))],
            ["Annual / Yearly", "(Today − Start) ≤ 5", fmt(addDays(today, 5))],
          ]}
        />
      </Section>

      {/* 5 Fields SO */}
      <Section eyebrow="5 · Fields" title="Sales Orders Uploading (source)">
        <Table
          headers={["Field", "Used for"]}
          rows={[
            ["Name", "Refund name e.g. REF-SO-40033-…"],
            ["Account", "Lookup — required"],
            ["Subscription Status", "Must be Active"],
            ["Payment Frequency", "MONTHLY → 3 days · ANNUAL/YEARLY → 5 days"],
            ["Start Date", "Refund window start"],
            ["End Date", "Subscription end only — not used for eligibility"],
            ["Subscription ID", "Copied to Refund · blocks duplicate open refunds"],
            ["Customer CR", "Normal CR / FL Number / Unified CR"],
            ["Qaemaa Account ID", "Written in eligibility notes"],
            ["Actual Paid Amount", "Refund Amount"],
          ]}
        />
      </Section>

      <Section title="Refund module (main fields)">
        <Table
          headers={["Field", "How it is filled"]}
          rows={[
            ["Refund Name", "Auto: REF-{SO}-{StartDate}"],
            ["Owner", "CS Users from CS Assignment Pool"],
            ["Account", "From Sales Order"],
            ["Contacts", "First Contact under Account"],
            ["Email / Phone", "From that Contact"],
            ["Subscription Number", "From Subscription ID"],
            ["Normal CR / FL Number / Unified CR", "From Customer CR"],
            ["Pipeline", "Starts Backlog · Refund Cycle blueprint"],
            ["Refund Amount", "From Actual Paid Amount"],
            ["Expiration Date", "Last day of refund window (Start + 3 or 5)"],
            ["Missing Info for the Refund", "Eligibility summary note"],
            ["Bank Details Collection Method", "Manual Entry | Send Form to Customer"],
            ["Bank Name / Bank Account Number / IBAN", "Manual or from Zoho Form"],
            ["Form Send Date", "When form email is sent"],
            ["Bank Detail Submit", "Checkbox — checked when form submitted"],
            ["Refund Reason / Compensation / Refunded?", "Filled by team in blueprint"],
          ]}
        />
      </Section>

      {/* 6 Blueprint */}
      <Section eyebrow="6 · Pipeline" title="Refund Cycle blueprint stages">
        <Table
          headers={["Stage", "Meaning"]}
          rows={[
            ["Backlog", "New refund — starting point"],
            ["In Contact", "CS contacting customer"],
            ["Not Eligible for Refund", "Rejected"],
            ["Eligible", "Approved for refund"],
            ["Waiting for Response", "Waiting (e.g. bank form)"],
            ["Compensation", "Compensation path"],
            ["Refund", "Payout path"],
            ["Ticket Closed", "Finished"],
          ]}
        />
        <p className="mt-3 text-sm text-[var(--ink-soft)]">
          We reuse this existing blueprint — no second blueprint was created.
        </p>
      </Section>

      {/* 7 Bank paths */}
      <Section eyebrow="7 · Bank details" title="Two collection paths">
        <Table
          headers={["Option", "What happens", "Reminder?"]}
          rows={[
            [
              "Manual Entry",
              "CS types Bank Name, Account Number, IBAN on the Refund",
              "No",
            ],
            [
              "Send Form to Customer",
              "Email with Zoho Form → customer submits → CRM updated + CS emailed",
              "Yes — after 2 days if not submitted",
            ],
          ]}
        />
      </Section>

      {/* 8 Zoho Form */}
      <Section eyebrow="8 · Zoho Form" title="Bank Details Form">
        <p className="mb-3 text-sm text-[var(--ink-soft)]">
          Live form (example):{" "}
          <a
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
            href="https://forms.zohopublic.sa/qaema/form/BankDetailsForm/formperma/WtBkdJ-O4HPQaQDgY9nKPyUxJkZsFXpyr4SnEw7COEY"
            target="_blank"
            rel="noreferrer"
          >
            Bank Details Form
          </a>
        </p>
        <Table
          headers={["Form field", "Visible?", "Goes to CRM"]}
          rows={[
            ["Name (customerName)", "Yes / prefill", "Contact context"],
            ["Phone (customerPhone)", "Yes / prefill", "Phone"],
            ["Email (customerEmail)", "Yes / prefill", "Email"],
            ["Dev - Refund Name", "Hidden / prefill", "Match Refund"],
            ["Dev - refund Reason", "Hidden / prefill", "Reason context"],
            ["Dev - Refund Pipeline", "Hidden", "Stage context"],
            ["Dev - Bank Detail Submit", "Hidden (checked on submit)", "Bank Detail Submit = Yes"],
            ["Bank Name", "Yes", "Bank Name"],
            ["Bank Account Number", "Yes", "Bank Account Number"],
            ["IBAN", "Yes", "IBAN"],
          ]}
        />
        <Card>
          <p className="mb-2 text-sm font-semibold text-[var(--ink)]">Important</p>
          <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
            Prefill URL must not contain raw spaces or Arabic in the link (that caused
            the blank Zoho Insights page). Prefer a clean link or a stored Bank Form Link
            field on the Refund.
          </p>
        </Card>
      </Section>

      {/* 9 Reminder workflow */}
      <Section eyebrow="9 · Reminder" title="2-day form reminder (live)">
        <Card>
          <ReqList
            items={[
              "When: 2 days after Form Send Date (e.g. 08:00), once.",
              "Only if Form Send Date is filled AND Bank Detail Submit is still empty.",
              "Action: reminder email to the customer.",
              "If the customer already submitted, checkbox is checked → no reminder.",
            ]}
          />
        </Card>
      </Section>

      {/* 10 Emails */}
      <Section eyebrow="10 · Email templates" title="Emails in this flow">
        <div className="space-y-4">
          <EmailCard
            name="1 · Bank form to customer"
            to="Contact Email (Refund.Email)"
            subject="Action Required: Bank Details for Refund"
            status="live"
            body={`Dear {Contact Name},

Your refund request has been approved.

To process the payout, please submit your bank details using the secure form below:

[Form Link]

Please include:
• Beneficiary name (account holder)
• Bank name
• IBAN (Saudi IBAN starting with SA)

This link is unique to your request. Do not share it with others.

After we receive your details, our Finance team will process the refund.

Regards,
Neotek Finance`}
          />
          <EmailCard
            name="2 · Reminder to customer (after 2 days)"
            to="Contact Email"
            subject="Reminder: bank details needed for your refund"
            status="live"
            body={`Dear {Contact Name},

This is a reminder to submit your bank details for refund {Refund Name}.

Please use the form link from our previous email (or the link in this reminder).

Regards,
Neotek Finance`}
          />
          <EmailCard
            name="3 · Notify CS — bank details received"
            to="Refund Owner (CS Specialist)"
            subject="Bank details received — please review and hand over to Finance | {Refund Name}"
            status="live"
            body={`Dear {CS Owner},

The customer has submitted bank details for refund {Refund Name}.

Please review the Refund in CRM, confirm the details, then coordinate with Finance.

• Account / Contact / Amount
• Bank name / Account number / IBAN

Next: notify Finance to process the payout.

Regards,
Neotek Refund System`}
          />
          <EmailCard
            name="4 · Notify Finance (CS action)"
            to="Finance mailbox"
            subject="Refund ready for payout — {Refund Name}"
            status="soon"
            body={`Dear Finance,

CS has confirmed bank details for {Refund Name}.

Please process the payout, then mark the refund as done.

• Amount / Bank / IBAN / CRM link

Regards,
Neotek`}
          />
          <EmailCard
            name="5 · Refund completed — CS + customer"
            to="CS Owner and Customer"
            subject="Refund completed — {Refund Name}"
            status="soon"
            body={`Dear {Name},

Your refund {Refund Name} has been processed.

Amount: {Amount}
Reference: {Transaction ref if any}

The amount should appear in your account within a few business days.

Regards,
Neotek Finance`}
          />
        </div>
      </Section>

      {/* 11 Test cases */}
      <Section eyebrow="11 · Testing" title="Test cases — use these Start Dates">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Today = <strong className="text-[var(--ink)]">{todayLabel}</strong>. Set Status =
          Active, set Payment Frequency, change only Start Date, then click Create Refund.
          Close any open Refund for that subscription first. End Date can stay as-is.
        </p>
        <p className="mb-3 text-sm font-semibold text-[var(--ink)]">
          MONTHLY — (Today − Start) ≤ 3
        </p>
        <div className="mb-8">
          <Table
            headers={["#", "Case", "Set Start Date to", "Payment Frequency", "Expected"]}
            rows={monthlyRows}
          />
        </div>
        <p className="mb-3 text-sm font-semibold text-[var(--ink)]">
          ANNUAL / YEARLY — (Today − Start) ≤ 5
        </p>
        <Table
          headers={["#", "Case", "Set Start Date to", "Payment Frequency", "Expected"]}
          rows={annualRows}
        />
      </Section>

      {/* 12 Status */}
      <Section eyebrow="12 · Status" title="What is live vs not yet">
        <div className="grid gap-3">
          {[
            ["Create Refund button + eligibility 3/5", "Live"],
            ["Account / Contact / CS Owner mapping", "Live"],
            ["Refund Cycle blueprint", "Live (existing)"],
            ["Manual Entry bank details", "Live"],
            ["Send Form + customer email", "Live"],
            ["Form → Bank fields + related list", "Live"],
            ["CS email on form submit", "Live"],
            ["2-day reminder workflow", "Live"],
            ["CS → Finance notify action", "Not yet"],
            ["Finance marks done + CS/customer emails", "Not yet"],
            ["WhatsApp form message", "Later (email only now)"],
          ].map(([name, state]) => (
            <div
              key={name}
              className="flex flex-col gap-1 rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-medium text-[var(--ink)]">{name}</span>
              <span className="text-sm text-[var(--ink-soft)]">{state}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
