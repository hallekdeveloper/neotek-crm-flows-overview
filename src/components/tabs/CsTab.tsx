import { BranchDiagram, DiagramLegend, FlowDiagram } from "../Diagram";
import { Badge, Card, Flow, ReqList, Section, Table } from "../ui";

export function CsTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="partial">Mostly live</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          CS ownership, Refund bank path, and Renewal Tasks are live. Pool delete
          Round Robin is the next CS Assignment Pool build.
        </p>
      </div>

      <Section eyebrow="CS Flow" title="What CS Flow covers">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Customer Success owns the customer relationship in Zoho. That starts with
          the <strong className="text-[var(--ink)]">CS Assignment Pool</strong>{" "}
          (who is each Account’s specialist), then flows into Tasks, Refunds, and
          Renewal follow-ups for that same person.
        </p>
        <Card>
          <ReqList
            items={[
              "Each CS Assignment Pool record = one CS Specialist (example: Mohamed Alzoubi).",
              "Accounts are linked to a Pool record via CS Specialists.",
              "The Pool’s CS Users field is the CRM user who owns Tasks and Refunds.",
              "If a Pool record is deleted, its Accounts are redistributed with Round Robin.",
              "CS also owns the Refund journey (bank details) and Renewal follow-up Tasks.",
            ]}
          />
        </Card>
      </Section>

      <Section eyebrow="CS Assignment Pool" title="Module — specialists and Accounts">
        <FlowDiagram
          title="From Pool to daily work"
          nodes={[
            {
              id: "pool",
              label: "CS Assignment Pool",
              sub: "One record per specialist",
              tone: "live",
            },
            {
              id: "acc",
              label: "Accounts assigned",
              sub: "CS Specialists lookup",
              tone: "live",
            },
            {
              id: "user",
              label: "CS Users (CRM user)",
              sub: "On the Pool record",
              tone: "live",
            },
            {
              id: "out",
              label: "Tasks · Refunds · Renewal",
              sub: "Owner = that user",
              tone: "live",
            },
          ]}
        />
        <DiagramLegend />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Example: Mohamed Alzoubi’s Pool record may show several Accounts (for
          example 7). Those Accounts all use Mohamed as their CS Specialist until
          the Pool record changes or is removed.
        </p>
      </Section>

      <Section title="Business rule — delete Pool → Round Robin reassign">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="soon">Agreed — build next</Badge>
        </div>
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          When a specialist’s Pool record is deleted, Accounts must not stay
          pointing at a missing specialist. The system redistributes them evenly
          among everyone still in the Pool.
        </p>
        <Flow
          steps={[
            {
              title: "Detect delete",
              detail:
                "A CS Assignment Pool record is deleted (example: Mohamed Alzoubi).",
              status: "soon",
            },
            {
              title: "Find affected Accounts",
              detail:
                "Fetch every Account where CS Specialists equals that deleted Pool record.",
              status: "soon",
            },
            {
              title: "Load remaining specialists",
              detail:
                "Get all other active CS Assignment Pool records (exclude the deleted one).",
              status: "soon",
            },
            {
              title: "Round Robin reassign",
              detail:
                "Walk the Account list and assign B, C, B, C… so workload stays even.",
              status: "soon",
            },
            {
              title: "Handle edge cases",
              detail:
                "One specialist left → all Accounts go there. Zero left → alert Admin / do not leave Accounts empty silently.",
              status: "soon",
            },
          ]}
        />
      </Section>

      <Section title="Round Robin example (client scenario)">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Pool today: Mohamed Alzoubi, Specialist B, Specialist C. Mohamed is
          deleted and had 7 Accounts. Those Accounts move like this:
        </p>
        <Table
          headers={["Account", "Assigned to after delete"]}
          rows={[
            ["Account 1", "Specialist B"],
            ["Account 2", "Specialist C"],
            ["Account 3", "Specialist B"],
            ["Account 4", "Specialist C"],
            ["Account 5", "Specialist B"],
            ["Account 6", "Specialist C"],
            ["Account 7", "Specialist B"],
          ]}
        />
        <div className="mt-6">
          <Table
            headers={["Situation", "What should happen"]}
            rows={[
              [
                "2+ specialists remain",
                "Accounts are split evenly with Round Robin (B, C, B, C…).",
              ],
              [
                "Only 1 specialist remains",
                "All Accounts from the deleted Pool go to that specialist.",
              ],
              [
                "No specialists remain",
                "Do not leave Accounts without CS silently — notify Admin and stop or leave a clear flag.",
              ],
            ]}
          />
        </div>
      </Section>

      <Section title="CS journey on Refunds (already live)">
        <FlowDiagram
          title="What CS does on a Refund"
          nodes={[
            {
              id: "own",
              label: "Refund assigned to CS",
              sub: "Automatic on create",
              tone: "live",
            },
            {
              id: "pipe",
              label: "Move pipeline stages",
              sub: "Refund Cycle blueprint",
              tone: "live",
            },
            {
              id: "bank",
              label: "Choose bank method",
              sub: "Manual or Send Form",
              tone: "live",
            },
            {
              id: "ready",
              label: "Bank details ready",
              sub: "Review IBAN on the record",
              tone: "live",
            },
            {
              id: "fin",
              label: "Notify Finance",
              sub: "Coming next",
              tone: "soon",
            },
            {
              id: "done",
              label: "Payout confirmed",
              sub: "CS + customer emailed",
              tone: "soon",
            },
          ]}
        />
        <DiagramLegend />
        <div className="mt-8">
          <BranchDiagram
            title="Bank collection choice"
            parent={{ id: "m", label: "CS picks method", tone: "live" }}
            leftLabel="Manual"
            rightLabel="Form"
            left={{
              id: "man",
              label: "Type bank details",
              sub: "No customer email",
              tone: "live",
            }}
            right={{
              id: "frm",
              label: "Email form to customer",
              sub: "CS notified on submit",
              tone: "live",
            }}
          />
        </div>
      </Section>

      <Section title="Bank details — two options for CS">
        <Table
          headers={["Option", "What CS does", "What happens"]}
          rows={[
            [
              "Manual Entry",
              "Types Bank Name, Account Number, IBAN",
              "No customer form. No Form Send Date. No 2-day reminder.",
            ],
            [
              "Send Form to Customer",
              "Sends the email with Zoho Form link",
              "Form Send Date is set. Customer fills form. CS gets email. Reminder after 2 days if not submitted.",
            ],
          ]}
        />
      </Section>

      <Section title="What is working now for CS">
        <Card>
          <ReqList
            items={[
              "CS Assignment Pool → Account CS Specialists → CS Users is live for ownership.",
              "Automatic Refund ownership from the Account’s CS Specialist.",
              "Bank Details Collection Method with Manual Entry or Send Form.",
              "Form path updates Bank Name, Account Number, IBAN; CS is emailed on submit.",
              "2-day reminder if the form was sent and not submitted.",
              "Renewal follow-up Tasks (within 60 days of yearly End Date) use the same CS Owner.",
              "Round Robin when a Pool record is deleted — agreed rule, automation next.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
