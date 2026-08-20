import { Badge, Card, ReqList, Section } from "../ui";

export function RetentionTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="soon">Not started</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          We have not built Retention automation yet. Share requirements when ready.
        </p>
      </div>

      <Section eyebrow="Retention Flow" title="Status">
        <Card>
          <p className="mb-4 leading-relaxed text-[var(--ink-soft)]">
            The Retention module exists in your Zoho CRM sidebar, but this project
            has focused on <strong className="text-[var(--ink)]">Account</strong>,{" "}
            <strong className="text-[var(--ink)]">CS</strong>, and{" "}
            <strong className="text-[var(--ink)]">Refund</strong> so far.
          </p>
          <ReqList
            items={[
              "No Retention business rules have been confirmed for this build.",
              "No Retention button, blueprint, or form work is live from this project.",
              "When you send Retention requirements (who, when, emails, stages), we will add them here the same way as Refund.",
            ]}
          />
        </Card>
      </Section>

      <Section title="What we need from you to start">
        <Card>
          <ReqList
            items={[
              "When should a Retention case be created?",
              "Who owns it (CS, another team)?",
              "What stages / pipeline do you want?",
              "What emails or forms are required?",
              "How does it connect to Account, Contact, or Sales Order?",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
