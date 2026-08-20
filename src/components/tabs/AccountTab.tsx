import { Badge, Card, Flow, ReqList, Section } from "../ui";

export function AccountTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="live">Live foundation</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Everything else depends on a correct Account setup.
        </p>
      </div>

      <Section eyebrow="Account module" title="Why Account matters">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          The Sales Order only stores the Account. From that Account we find the
          Contact (customer email/phone) and the CS Specialist (Refund Owner).
          If Account data is incomplete, Create Refund will stop with a clear message.
        </p>
        <Card>
          <ReqList
            items={[
              "Every Sales Order must have an Account linked.",
              "Account must have at least one Contact (we use the first Contact).",
              "Account must have CS Specialists → CS Assignment Pool → CS Users (CRM user).",
              "Contact Email is used when we send the bank details form.",
            ]}
          />
        </Card>
      </Section>

      <Section title="How data is connected">
        <Card>
          <Flow
            steps={[
              {
                title: "Sales Orders Uploading",
                detail: "Has Account lookup only (no Contact field on the SO).",
                status: "live",
              },
              {
                title: "Account",
                detail: "Company record — e.g. Test Zoho Draft.",
                status: "live",
              },
              {
                title: "First Contact under Account",
                detail: "Name, Email, Phone copied to the Refund.",
                status: "live",
              },
              {
                title: "CS Specialists → CS Assignment Pool → CS Users",
                detail: "That user becomes Refund Owner.",
                status: "live",
              },
            ]}
          />
        </Card>
      </Section>

      <Section title="What is working now">
        <Card>
          <ReqList
            items={[
              "Create Refund reads Account from the Sales Order.",
              "Creates Refund with Account + Contacts filled.",
              "Sets Email and Phone from the first Contact.",
              "Sets Owner from CS Users on the Assignment Pool.",
              "Blocks create if Account, Contact, or CS Specialist is missing.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
