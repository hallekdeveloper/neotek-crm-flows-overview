import { Badge, Card, Flow, ReqList, Section, Table } from "../ui";

export function CsTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="partial">Mostly live</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          CS owns the Refund from create through bank details. Finance handoff is next.
        </p>
      </div>

      <Section eyebrow="CS Flow" title="Business requirements">
        <Card>
          <ReqList
            items={[
              "CS Specialist is automatically the Refund Owner.",
              "CS chooses how to collect bank details: Manual Entry or Send Form to Customer.",
              "If form is used, CS gets an email when the customer submits.",
              "If the customer does not submit in 2 days, a reminder email is sent.",
              "After bank details are ready, CS notifies Finance to pay (option to be added).",
              "When Finance marks refund done, CS (and customer) get a confirmation email.",
            ]}
          />
        </Card>
      </Section>

      <Section title="CS journey (simple)">
        <Card>
          <Flow
            steps={[
              {
                title: "Refund is created",
                detail: "Owner = CS Specialist. Pipeline starts at Backlog / New.",
                status: "live",
              },
              {
                title: "CS reviews and moves the pipeline",
                detail: "Uses existing Refund Cycle blueprint (Eligible, Waiting for Response, etc.).",
                status: "live",
              },
              {
                title: "CS chooses bank collection method",
                detail: "Manual Entry = type IBAN on the record. Send Form = email to customer.",
                status: "live",
              },
              {
                title: "Bank details arrive",
                detail: "From form or manual typing. CS is emailed when the form is submitted.",
                status: "live",
              },
              {
                title: "CS notifies Finance",
                detail: "Dedicated action / option — to be added next.",
                status: "soon",
              },
              {
                title: "Finance pays → CS + customer notified",
                detail: "Completion emails after Finance confirms.",
                status: "soon",
              },
            ]}
          />
        </Card>
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
              "Automatic ownership when Refund is created.",
              "Bank Details Collection Method field with both options.",
              "Form path updates Bank Name, Account Number, IBAN on the Refund.",
              "Immediate email to CS Owner when customer submits the form.",
              "Reminder workflow: 2 days after Form Send Date if Bank Detail Submit is still empty.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
