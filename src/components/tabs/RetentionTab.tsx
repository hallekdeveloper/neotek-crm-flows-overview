import { Badge, Card, Flow, ReqList, Section, Table } from "../ui";

export function RetentionTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="partial">Partly live</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Renewal follow-up Tasks are live. Retention stages and case records are next.
        </p>
      </div>

      <Section eyebrow="Retention Flow" title="What is live today">
        <Card>
          <ReqList
            items={[
              "A daily job checks Active yearly Sales Orders Uploading records.",
              "If Subscription End Date is within 60 days, it creates one Renewal follow-up Task on the Account.",
              "Task Owner = the Account’s CS Specialist (CS Assignment Pool → CS Users).",
              "Task Description shows customer name, tier, dates, paid amount, and related SO details.",
              "CS fills Willing to Renew, Need Support, Wish to Upgrade, and Offer fields on the Task.",
              "No second Task is created if one is already open or the SO is already flagged.",
            ]}
          />
        </Card>
      </Section>

      <Section title="How it works">
        <Flow
          steps={[
            {
              title: "Daily scan",
              detail: "Looks at Active Sales Orders with Yearly / Annual payment frequency.",
              status: "live",
            },
            {
              title: "Inside 60-day window?",
              detail: "Days left = today → Subscription End Date. Create only if 0–60.",
              status: "live",
            },
            {
              title: "Create Task for CS",
              detail: "Related to Account. Owner from CS Assignment Pool. Snapshot in Description.",
              status: "live",
            },
            {
              title: "CS follows up",
              detail: "Calls the customer and updates Retention fields on the Task.",
              status: "live",
            },
            {
              title: "Retention stages / case record",
              detail: "Contacted → Negotiation → Renewed / Lost — not built yet.",
              status: "soon",
            },
          ]}
        />
      </Section>

      <Section title="Quick test cases">
        <Table
          headers={["Case", "Expect"]}
          rows={[
            ["Active + Yearly + End Date ~30 days out", "Task created for CS"],
            ["Active + Yearly + End Date 61 days out", "No Task"],
            ["Active + Monthly + End Date ~30 days out", "No Task (yearly only)"],
            ["Active + Yearly + End Date already past", "No Task"],
          ]}
        />
      </Section>

      <Section title="Still to build">
        <Card>
          <ReqList
            items={[
              "Retention module stages: Contacted, Negotiation, Renewed, Lost with reason.",
              "Optional: auto-create a Retention record in addition to the Task.",
              "Optional: button on Sales Orders Uploading to create a renewal Task for one SO.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
