import { FlowDiagramRow, DiagramLegend } from "../Diagram";
import { Badge, Card, ReqList, Section } from "../ui";

type Go = (id: "account" | "cs" | "refund" | "retention") => void;

export function OverviewTab({ onGo }: { onGo: Go }) {
  return (
    <div>
      <Section eyebrow="Start here" title="What this project covers">
        <p className="mb-6 max-w-2xl text-[var(--ink-soft)] leading-relaxed">
          Your Zoho CRM connects Sales Orders, Accounts, Contacts, CS Specialists,
          and Refunds. Below is the big picture. Open each tab for the full flow.
        </p>

        <div className="mb-8">
          <FlowDiagramRow
            title="Big picture"
            nodes={[
              { id: "a", label: "Account", sub: "Foundation", tone: "live" },
              { id: "c", label: "CS Flow", sub: "Owns refund", tone: "partial" },
              { id: "r", label: "Refund Flow", sub: "Create → bank → pay", tone: "partial" },
              { id: "t", label: "Retention", sub: "Not started", tone: "soon" },
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
              text: "Customer company, Contact, and CS Specialist — used by every other flow.",
            },
            {
              id: "cs" as const,
              title: "CS Flow",
              status: "partial" as const,
              text: "CS owns the refund, sends or enters bank details, gets notified, then involves Finance.",
            },
            {
              id: "refund" as const,
              title: "Refund Flow",
              status: "partial" as const,
              text: "Create refund from Sales Order, eligibility rules, bank form, reminders, payout.",
            },
            {
              id: "retention" as const,
              title: "Retention Flow",
              status: "soon" as const,
              text: "Not built yet. This tab is ready for requirements when you share them.",
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
              "Create a Refund from Sales Orders Uploading with one button.",
              "Refund Owner must be the Account’s CS Specialist.",
              "Map Account and the first Contact (name, email, phone) onto the Refund.",
              "Only Active subscriptions can be refunded.",
              "Monthly: refund allowed if today is within 3 days of Start Date.",
              "Annual / Yearly: refund allowed if today is within 5 days of Start Date.",
              "End Date is the subscription end — it is not used for the refund window.",
              "Bank details: either filled by the team (Manual Entry) or collected via email form to the customer.",
              "If the form is sent and not submitted in 2 days, send a reminder email.",
              "When the customer submits the form, update bank fields and email the CS Owner.",
              "CS then notifies Finance; Finance pays and confirms; CS and customer are notified (Finance path next).",
              "WhatsApp for the form can come later — email works now.",
            ]}
          />
        </Card>
      </Section>

      <Section title="What is live in Zoho right now">
        <div className="grid gap-3">
          {[
            ["Create Refund button", "Live — creates Refund, assigns CS, maps Account + Contact"],
            ["Eligibility (Active + 3/5 days)", "Live — updated 20 Aug after your feedback"],
            ["Bank collection method", "Live — Manual Entry or Send Form to Customer"],
            ["Customer bank form + CS email", "Live — form updates Bank Name, Account, IBAN"],
            ["2-day reminder if form not submitted", "Live — based on Form Send Date"],
            ["CS → Finance → done emails", "Not yet — next build"],
            ["Retention automation", "Not yet"],
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
