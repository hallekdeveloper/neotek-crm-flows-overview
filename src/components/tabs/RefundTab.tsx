"use client";

import {
  BranchDiagram,
  DiagramLegend,
  FlowDiagram,
  FlowDiagramRow,
} from "../Diagram";
import { Badge, Card, ReqList, Section, Table } from "../ui";

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

const REFUND_VIDEO_1 =
  "https://workdrive.zohoexternal.sa/external/992edbdb110216287bca171af7d29eecb766c7b03f83fd6c64a92d7ef45e44e4";
const REFUND_VIDEO_1_THUMB =
  "https://previewengine.zohoexternal.sa/thumbnail/WD/5zcd5da08efda992f4d198bceb1bc1165b896?size=l";
const REFUND_VIDEO_2 =
  "https://workdrive.zohoexternal.sa/external/d9a2fab2061e88e75a4a7576c4b6fc0f67f85073268914eee080cedd58a5f349";
const REFUND_VIDEO_2_THUMB =
  "https://previewengine.zohoexternal.sa/thumbnail/WD/5zcd54d6212afe0e14e9b8174963116910cd4?size=l";

function VideoCard({
  href,
  thumb,
  label,
  fileName,
  note,
  cta,
}: {
  href: string;
  thumb: string;
  label: string;
  fileName: string;
  note: string;
  cta: string;
}) {
  return (
    <Card>
      <p className="mb-1 text-xs font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
        {label}
      </p>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">{note}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-4 block overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <div className="relative aspect-video w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={`${fileName} thumbnail`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,28,23,0.55),transparent_45%)]" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[var(--accent)] shadow-lg transition group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-7 w-7 fill-current"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
            <span className="text-sm font-semibold text-white">{fileName}</span>
            <span className="text-xs font-medium text-white/90">Opens on WorkDrive ↗</span>
          </span>
        </div>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        {cta}
        <span aria-hidden="true">↗</span>
      </a>
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
        <Badge tone="live">Create → bank → Finance live</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Full refund picture — pipeline, two Zoho Forms, Finance Yes/No, emails,
          workflows, and test videos.
        </p>
      </div>

      <Section eyebrow="Demo · Testing videos" title="Refund Flow walkthrough">
        <div className="grid gap-5">
          <VideoCard
            label="Video 1 · Flow overview"
            fileName="Screen Recording 2026-08-18 175236.mp4"
            href={REFUND_VIDEO_1}
            thumb={REFUND_VIDEO_1_THUMB}
            cta="Open video 1 — flow only"
            note="Only watch the flow. Ignore any subscription Start Date shown or spoken in this recording — those dates are outdated. For complete testing, use Video 2."
          />
          <VideoCard
            label="Video 2 · Complete testing"
            fileName="Refund FLow.mp4"
            href={REFUND_VIDEO_2}
            thumb={REFUND_VIDEO_2_THUMB}
            cta="Open video 2 — full testing"
            note="Full testing walkthrough — use this video (with the Start Date cases below) for complete Refund testing."
          />
        </div>
      </Section>

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
              "CS moves pipeline to Notify Finance → email Finance team (template: Refund Processing Required).",
              "Finance responds Yes → Refund stage = Refund Done → notify CS Owner + customer.",
              "Finance responds No → notify CS Owner (Refund Not Processed by Finance).",
              "Two Zoho Forms: Bank Details Form + Refund Status.",
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
            ["Zoho Forms — Bank Details Form", "Customer fills Bank Name / Account / IBAN (created Aug 17, 2026)."],
            ["Zoho Forms — Refund Status", "Finance Yes/No response form (created Dec 31, 2025)."],
          ]}
        />
      </Section>

      {/* 3 Complete flow — diagrams */}
      <Section eyebrow="3 · Complete flow" title="Diagrams (follow the arrows)">
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Green = live in Zoho. Amber = partly live. Grey = not built yet.
        </p>

        <div className="mb-8">
          <FlowDiagram
            title="Main refund journey"
            nodes={[
              {
                id: "so",
                label: "Sales Orders Uploading",
                sub: "Click Create Refund",
                tone: "live",
              },
              {
                id: "check",
                label: "Eligibility check",
                sub: "Active + Monthly ≤3 / Annual ≤5 days",
                tone: "live",
              },
              {
                id: "create",
                label: "Refund created",
                sub: "CS Owner · Account · Contact · Backlog",
                tone: "live",
              },
              {
                id: "bp",
                label: "Refund Cycle blueprint",
                sub: "CS moves the stages",
                tone: "live",
              },
              {
                id: "method",
                label: "Bank collection method",
                sub: "CS chooses one option",
                tone: "live",
              },
              {
                id: "bank",
                label: "Bank details ready",
                sub: "IBAN on the Refund record",
                tone: "live",
              },
              {
                id: "fin",
                label: "Notify Finance",
                sub: "Email Finance team",
                tone: "live",
              },
              {
                id: "yn",
                label: "Finance Yes / No",
                sub: "Refund Status form",
                tone: "live",
              },
              {
                id: "pay",
                label: "Refund Done or notify CS",
                sub: "Yes → Done · No → Owner email",
                tone: "live",
              },
            ]}
          />
          <DiagramLegend />
        </div>

        <div className="mb-8">
          <BranchDiagram
            title="Bank details — two paths"
            parent={{
              id: "choose",
              label: "Bank Details Collection Method",
              tone: "live",
            }}
            leftLabel="Option A"
            rightLabel="Option B"
            left={{
              id: "manual",
              label: "Manual Entry",
              sub: "CS types Bank Name · Account · IBAN. No form. No reminder.",
              tone: "live",
            }}
            right={{
              id: "form",
              label: "Send Form to Customer",
              sub: "Email Zoho Form → customer fills → CRM updates → CS emailed",
              tone: "live",
            }}
          />
        </div>

        <div className="mb-8">
          <FlowDiagram
            title="Form path detail (when Send Form is chosen)"
            nodes={[
              {
                id: "email",
                label: "Email to customer",
                sub: "Form link + Form Send Date set",
                tone: "live",
              },
              {
                id: "wait",
                label: "Customer opens Zoho Form",
                sub: "Fills Bank Name · Account · IBAN",
                tone: "live",
              },
              {
                id: "submit",
                label: "Form submitted",
                sub: "Related list + bank fields + checkbox",
                tone: "live",
              },
              {
                id: "csmail",
                label: "Email to CS Owner",
                sub: "Review and prepare for Finance",
                tone: "live",
              },
            ]}
          />
        </div>

        <div className="mb-8">
          <FlowDiagramRow
            title="Reminder (only if form not submitted)"
            nodes={[
              {
                id: "sent",
                label: "Form Send Date",
                sub: "Day 0",
                tone: "live",
              },
              {
                id: "d2",
                label: "After 2 days",
                sub: "Workflow runs",
                tone: "live",
              },
              {
                id: "chk",
                label: "Bank Detail Submit empty?",
                sub: "Yes → send reminder",
                tone: "live",
              },
              {
                id: "rem",
                label: "Reminder email",
                sub: "To customer",
                tone: "live",
              },
            ]}
          />
        </div>

        <div className="mb-8">
          <BranchDiagram
            title="Notify Finance → Finance Yes / No (live)"
            parent={{
              id: "nf",
              label: "Stage = Notify Finance",
              tone: "live",
            }}
            leftLabel="Yes"
            rightLabel="No"
            left={{
              id: "yes",
              label: "Refund Done",
              sub: "Update stage + email CS Owner + customer",
              tone: "live",
            }}
            right={{
              id: "no",
              label: "Notify CS Owner",
              sub: "Refund Not Processed by Finance",
              tone: "live",
            }}
          />
        </div>

        <div className="mb-2">
          <FlowDiagramRow
            title="Refund Pipeline (blueprint stages)"
            nodes={[
              { id: "p0", label: "NEW | Backlog", tone: "live" },
              { id: "p1", label: "In Contact", tone: "live" },
              { id: "p2", label: "Eligible / Not Eligible", tone: "live" },
              { id: "p3", label: "Waiting for Response", tone: "live" },
              { id: "p4", label: "Notify Finance", tone: "live" },
              { id: "p5", label: "Compensation / Refund Done", tone: "live" },
              { id: "p6", label: "Ticket Closed", tone: "live" },
            ]}
          />
        </div>
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
            ["Pipeline", "Starts NEW | Backlog · full Refund Pipeline below"],
            ["Refund Amount", "From Actual Paid Amount"],
            ["Expiration Date", "Last day of refund window (Start + 3 or 5)"],
            ["Missing Info for the Refund", "Eligibility summary note"],
            ["Bank Details Collection Method", "Manual Entry | Send Form to Customer"],
            ["Bank Name / Bank Account Number / IBAN", "Manual or from Bank Details Form"],
            ["Form Send Date", "When form email is sent"],
            ["Bank Detail Submit", "Checkbox — checked when form submitted"],
            ["Finance response (Yes / No)", "From Refund Status form — drives Done vs Owner notify"],
            ["Refund Reason / Compensation / Refunded?", "Filled by team in blueprint"],
          ]}
        />
      </Section>

      {/* 6 Blueprint */}
      <Section eyebrow="6 · Pipeline" title="Refund Pipeline stages">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Existing Refund Cycle / Refund Pipeline on the Refund module. New
          refunds start at <strong className="text-[var(--ink)]">NEW | Backlog</strong>.
        </p>
        <Table
          headers={["Stage", "Meaning"]}
          rows={[
            ["-None-", "Empty / not set"],
            ["NEW | Backlog", "New refund — starting point after Create Refund"],
            ["In Contact", "CS contacting customer"],
            ["Not Eligible for Refund", "Rejected — not eligible"],
            ["Eligible", "Approved for refund"],
            ["Waiting for Response", "Waiting (e.g. bank form from customer)"],
            [
              "Notify Finance",
              "CS hands over to Finance → email Finance team (live)",
            ],
            ["Compensation", "Compensation path (alternative to cash refund)"],
            ["Refund Done", "Payout completed (Finance Yes)"],
            ["Ticket Closed", "Ticket finished"],
          ]}
        />
        <div className="mt-6">
          <Card>
            <p className="mb-3 text-sm font-semibold text-[var(--ink)]">
              Notify Finance → Finance Yes / No (live)
            </p>
            <ReqList
              items={[
                "When pipeline moves to Notify Finance → workflow Dev - Notify Finance Team sends email to Finance (template: Dev - Notify Finance Team for Refund and Review · subject Refund Processing Required).",
                "Finance uses the Refund Status form to answer Yes or No.",
                "Finance Yes → workflow Dev - Finance Response Yes, No… updates Refund stage to Refund Done → emails CS Owner (Refund Completed by Finance) and customer (Your Refund Has Been Processed).",
                "Finance No → notify Refund Owner / CS (template: Dev - Notify CS Owner Refund Not Processed by Finance · subject Refund Not Processed by Finance).",
              ]}
            />
          </Card>
        </div>
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

      {/* 8 Zoho Forms */}
      <Section eyebrow="8 · Zoho Forms" title="Two forms used in Refund">
        <Table
          headers={["Form", "Created", "Purpose"]}
          rows={[
            [
              "Bank Details Form",
              "Aug 17, 2026",
              "Customer submits Bank Name, Account Number, IBAN. Prefills Refund / Contact. Updates bank fields + Bank Detail Submit.",
            ],
            [
              "Refund Status",
              "Dec 31, 2025",
              "Finance responds Yes or No after Notify Finance. Yes → Refund Done; No → notify CS Owner.",
            ],
          ]}
        />
        <p className="mt-5 mb-3 text-sm font-semibold text-[var(--ink)]">
          Bank Details Form — fields
        </p>
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
      <Section eyebrow="10 · Email templates" title="Folder: Refund Templates (Setup → Templates)">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          All templates are on the <strong className="text-[var(--ink)]">Refund</strong>{" "}
          module under folder <strong className="text-[var(--ink)]">Refund Templates</strong>.
        </p>
        <Table
          headers={["Template name", "Subject", "When used", "Status"]}
          rows={[
            [
              "Refund — Bank Details Form Module",
              "Action Required: Bank Details for Refund",
              "Send Form to Customer",
              "Live",
            ],
            [
              "Dev - Notify CS - Customer submitted bank details",
              "Customer submitted bank details",
              "Customer submits Bank Details Form",
              "Live",
            ],
            [
              "Dev - Send Reminder… (workflow)",
              "Reminder: bank details needed…",
              "2 days after Form Send Date if not submitted",
              "Live",
            ],
            [
              "Dev - Notify Finance Team for Refund and Review",
              "Refund Processing Required",
              "Pipeline → Notify Finance",
              "Live",
            ],
            [
              "Dev - Notify CS Owner on Refund Completed by Finance",
              "Refund Completed by Finance",
              "Finance Yes → Refund Done",
              "Live",
            ],
            [
              "Dev - Notify Customer - Your Refund Has Been Processed",
              "Your Refund Has Been Processed",
              "Finance Yes → customer notified",
              "Live",
            ],
            [
              "Dev - Notify CS Owner Refund Not Processed by Finance",
              "Refund Not Processed by Finance",
              "Finance No → notify Owner",
              "Live",
            ],
          ]}
        />
        <div className="mt-6 space-y-4">
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
            subject="Customer submitted bank details"
            status="live"
            body={`Dear {CS Owner},

The customer has submitted bank details for refund {Refund Name}.

Please review the Refund in CRM, confirm the details, then move the pipeline to Notify Finance when ready.

• Account / Contact / Amount
• Bank name / Account number / IBAN

Regards,
Neotek Refund System`}
          />
          <EmailCard
            name="4 · Notify Finance Team"
            to="Finance mailbox"
            subject="Refund Processing Required"
            status="live"
            body={`Dear Finance,

CS has moved refund {Refund Name} to Notify Finance.

Please review and respond Yes (process payout → Refund Done) or No (not processed → notify CS Owner) via the Refund Status form / CRM.

• Amount / Bank / IBAN / CRM link

Regards,
Neotek`}
          />
          <EmailCard
            name="5 · Finance Yes — CS Owner"
            to="Refund Owner (CS Specialist)"
            subject="Refund Completed by Finance"
            status="live"
            body={`Dear {CS Owner},

Finance has completed refund {Refund Name}. Stage is updated to Refund Done.

Regards,
Neotek Refund System`}
          />
          <EmailCard
            name="6 · Finance Yes — Customer"
            to="Contact Email"
            subject="Your Refund Has Been Processed"
            status="live"
            body={`Dear {Contact Name},

Your refund {Refund Name} has been processed.

The amount should appear in your account within a few business days.

Regards,
Neotek Finance`}
          />
          <EmailCard
            name="7 · Finance No — CS Owner"
            to="Refund Owner (CS Specialist)"
            subject="Refund Not Processed by Finance"
            status="live"
            body={`Dear {CS Owner},

Finance did not process refund {Refund Name}. Please review and follow up.

Regards,
Neotek Refund System`}
          />
        </div>
      </Section>

      {/* 10b Workflows */}
      <Section eyebrow="10b · Workflows" title="Refund module workflow rules (live)">
        <Table
          headers={["Rule", "Execute on", "What it does"]}
          rows={[
            [
              "Dev - Refund — Bank Details Form",
              "Modified",
              "Send Bank Details Form email / related bank-form actions",
            ],
            [
              "Dev - Notify CS Owner Custome…",
              "Modified",
              "Email CS when customer submitted bank details",
            ],
            [
              "Dev - Send Reminder Email after…",
              "Form Send Date (+2 days)",
              "Reminder if Bank Detail Submit still empty",
            ],
            [
              "Dev - Notify Finance Team",
              "Modified (→ Notify Finance)",
              "Email Finance: Refund Processing Required",
            ],
            [
              "Dev - Finance Response Yes, No …",
              "Modified",
              "Yes → Refund Done + CS/customer emails · No → notify Owner",
            ],
          ]}
        />
      </Section>

      {/* 11 Test cases */}
      <Section eyebrow="11 · Testing" title="Test cases — use these Start Dates">
        <Card>
          <p className="mb-3 text-sm leading-relaxed text-[var(--ink-soft)]">
            <strong className="text-[var(--ink)]">Video 1</strong> — only watch the flow;
            ignore subscription Start Date in that recording.{" "}
            <strong className="text-[var(--ink)]">Video 2</strong> — complete testing.
            Then run the Start Date cases below.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            <a
              href={REFUND_VIDEO_1}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              Video 1 — flow only (ignore Start Date)
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={REFUND_VIDEO_2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              Video 2 — complete testing (Refund FLow.mp4)
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Card>
        <p className="mt-6 mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
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
            ["Refund Pipeline (NEW | Backlog → … → Ticket Closed)", "Live"],
            ["Manual Entry bank details", "Live"],
            ["Send Form + customer email (Bank Details Form)", "Live"],
            ["Form → Bank fields + related list", "Live"],
            ["CS email on form submit", "Live"],
            ["2-day reminder workflow", "Live"],
            ["Notify Finance → email Finance team", "Live"],
            ["Finance Yes → Refund Done + CS + customer emails", "Live"],
            ["Finance No → notify CS Owner", "Live"],
            ["Refund Status form (Finance Yes/No)", "Live"],
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
