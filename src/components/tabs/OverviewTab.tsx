import { FlowDiagramRow, DiagramLegend } from "../Diagram";
import { Badge, Card, ReqList, Section } from "../ui";

type Go = (
  id: "account" | "onboarding" | "cs" | "refund" | "retention",
) => void;

export function OverviewTab({ onGo }: { onGo: Go }) {
  return (
    <div>
      <Section eyebrow="Start here" title="What this project covers">
        <p className="mb-6 max-w-2xl text-[var(--ink-soft)] leading-relaxed">
          Your Zoho CRM connects Accounts, Contacts, Qaema Onboarding (Bookings +
          Survey), the CS Assignment Pool, Refunds, and Retention. Below is the
          big picture. Open each tab for the full flow.
        </p>

        <div className="mb-8">
          <FlowDiagramRow
            title="Big picture"
            nodes={[
              { id: "a", label: "Account", sub: "Foundation + Pool", tone: "live" },
              {
                id: "o",
                label: "Onboarding",
                sub: "Bookings + Survey",
                tone: "live",
              },
              { id: "c", label: "CS Flow", sub: "Pool · Refund · Renew", tone: "partial" },
              { id: "r", label: "Refund Flow", sub: "Create → bank → Finance", tone: "live" },
              { id: "t", label: "Retention", sub: "Renewal task live", tone: "partial" },
            ]}
          />
          <DiagramLegend />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              id: "account" as const,
              title: "Account",
              status: "live" as const,
              text: "Customer company, CS / Health Scores, Round Robin CS assign, Onboarding kickoff.",
            },
            {
              id: "onboarding" as const,
              title: "Onboarding",
              status: "live" as const,
              text: "Qaema: Account → 5 min → Onboarding; Round Robin, Bookings link, Email/WhatsApp, Survey.",
            },
            {
              id: "cs" as const,
              title: "CS Flow",
              status: "partial" as const,
              text: "CS / Health Scores on Accounts, Stage 1–6, Round Robin assign, Tasks. Pool delete next.",
            },
            {
              id: "refund" as const,
              title: "Refund Flow",
              status: "live" as const,
              text: "Create → bank forms → Notify Finance → Yes/No → Done. Testing videos on Refund tab.",
            },
            {
              id: "retention" as const,
              title: "Retention Flow",
              status: "partial" as const,
              text: "REN-01: daily Active yearly SO within 60 days → Renewal Task for CS. 5 test cases on tab.",
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onGo(item.id)}
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 text-left transition hover:border-[var(--accent)]/40 hover:shadow-[0_16px_40px_-28px_rgba(15,28,23,0.4)]"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3
                  className="text-xl text-[var(--ink)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <Badge tone={item.status}>
                  {item.status === "live"
                    ? "Live"
                    : item.status === "partial"
                      ? "In progress"
                      : "Coming soon"}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{item.text}</p>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Client business requirements (agreed)">
        <Card>
          <ReqList
            items={[
              "Onboarding (Qaema): new Account → wait 5 minutes → auto-create Onboarding if a Contact is linked.",
              "Onboarding (Qaema): Round Robin owner + Welcome Call on Onboarding create; Bookings link → Email/WhatsApp; Survey returns to CRM.",
              "Onboarding: Book/reschedule/cancel sync; Cancel Reason once.",
              "CS Assignment Pool: each record is one CS Specialist; Accounts link via CS Specialists.",
              "On Account create: Round Robin assigns CS Specialists (skip if Preserve Initial Migration CS); creates Welcome Task; never changes Account Owner.",
              "Accounts section CS / Health Scores: Stage, Stage Level, Health Score from login_count, activity sum, and days since Last Login (Stages 1–6).",
              "Health Score recalculates on Account create and whenever any CS / Health Scores field is edited → Stage + Stage Level updated; ALL open CS Stage Tasks on that Account (any stage) Completed + Close By System = true; then new Task if Stages 1–4. Does not close Sales Order Upload or manual Tasks.",
              "TASK: Stage follow-up Task is created only for Stages 1–4 (At Risk / Low Engagement). Stages 5–6 Healthy = no Task. Needs Review = no Task. Requires CS Specialists → Pool → CS Users.",
              "TASK: Welcome Task is created when Round Robin assignment succeeds on Account create.",
              "TASK: When CS Specialists is changed/updated on an Account → Welcome Task for the NEW CS Specialist AND related Tasks are reassigned to that new specialist.",
              "If a Pool record is deleted, redistributes its Accounts to remaining specialists with Round Robin.",
              "Create a Refund from Sales Orders Uploading with one button.",
              "Refund Owner must be the Account’s CS Specialist (from the Pool → CS Users).",
              "Map Account and the first Contact (name, email, phone) onto the Refund.",
              "Only Active subscriptions can be refunded.",
              "Monthly: refund allowed if today is within 3 days of Start Date.",
              "Annual / Yearly: refund allowed if today is within 5 days of Start Date.",
              "End Date is the subscription end — it is not used for the refund window.",
              "Bank details: either filled by the team (Manual Entry) or collected via email form to the customer.",
              "If the form is sent and not submitted in 2 days, send a reminder email.",
              "When the customer submits the form, update bank fields and email the CS Owner.",
              "CS moves pipeline to Notify Finance → email Finance; Finance Yes → Refund Done (+ CS + customer emails); Finance No → notify CS Owner.",
              "Two Zoho Forms: Bank Details Form (customer) + Refund Status (Finance Yes/No).",
              "Yearly Active SOs within 60 days of Subscription End Date get a Renewal follow-up Task for the CS Owner (REN-01 daily schedule). See Retention tab for 5 test cases.",
              "WhatsApp for the refund form can come later — email works now.",
            ]}
          />
        </Card>
      </Section>

      <Section title="What is live in Zoho right now">
        <div className="grid gap-3">
          {[
            ["Onboarding — Account create → 5 min → Onboardings_2", "Live — Dev workflow"],
            ["Onboarding — Round Robin + Welcome Call + Bookings + Survey", "Live — Qaema"],
            ["Account → Entered Onboarding = New on create", "Live"],
            ["Account → CS Specialist Round Robin on create", "Live — Welcome Task"],
            ["Account CS / Health Scores → Stage 1–6 + Health Score", "Live — create + edit"],
            ["CS / Health Scores edit → close all CS Stage Tasks + new Task", "Live — any stage; Close By System; skip Sales Order / manual"],
            ["CS follow-up Task when Stage is not Healthy", "Live — Stages 1–4 only; Healthy = no Task"],
            ["Welcome Task on Round Robin assign", "Live — Account create"],
            ["CS Specialists changed → Welcome Task + reassign Tasks", "Live — highlighted"],
            ["Account → CS Assignment Pool → CS Users", "Live — used by Refund, CS Tasks, Renewal Tasks"],
            ["Create Refund button", "Live — creates Refund, assigns CS, maps Account + Contact"],
            ["Eligibility (Active + 3/5 days)", "Live — updated 20 Aug after your feedback"],
            ["Bank collection method", "Live — Manual Entry or Send Form to Customer"],
            ["Customer bank form + CS email", "Live — form updates Bank Name, Account, IBAN"],
            ["2-day reminder if form not submitted", "Live — based on Form Send Date"],
            ["Notify Finance → Finance Yes/No (Refund Status form)", "Live"],
            ["Finance Yes → Refund Done + CS + customer emails", "Live"],
            ["Finance No → notify CS Owner", "Live"],
            ["Renewal Task (REN-01 yearly, ≤ 60 days to End Date)", "Live — daily + CS Owner + 5 test cases"],
            ["Pool delete → Round Robin reassign", "Agreed — build next"],
            ["Retention stages (Contacted / Negotiation / …)", "Not yet"],
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
