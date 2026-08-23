import { FlowDiagram, DiagramLegend } from "../Diagram";
import { Badge, Card, ReqList, Section, Table } from "../ui";

export function AccountTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="live">Live foundation</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Everything else depends on a correct Account and CS Assignment Pool setup.
        </p>
      </div>

      <Section eyebrow="Account module" title="Why Account matters">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          The Sales Order only stores the Account. From that Account we find the
          Contact (customer email/phone) and the CS Specialist (who owns Tasks,
          Refunds, and Renewal follow-ups). If Account data is incomplete, those
          automations stop with a clear message.
        </p>
        <Card>
          <ReqList
            items={[
              "Every Sales Order must have an Account linked.",
              "Account must have at least one Contact (we use the first Contact for Refund emails).",
              "Account must have CS Specialists pointing to a CS Assignment Pool record.",
              "That Pool record has CS Users — the real CRM user who owns the work.",
            ]}
          />
        </Card>
      </Section>

      <Section eyebrow="CS Assignment Pool" title="What this module is">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          <strong className="text-[var(--ink)]">CS Assignment Pool</strong> is the
          list of Customer Success specialists. Each record is one specialist
          (for example, Mohamed Alzoubi). Accounts point to a Pool record via the
          field <strong className="text-[var(--ink)]">CS Specialists</strong>. The
          Pool then points to the CRM user who actually receives Tasks and Refunds.
        </p>
        <FlowDiagram
          title="How ownership is connected"
          nodes={[
            {
              id: "acc",
              label: "Account",
              sub: "Customer company",
              tone: "live",
            },
            {
              id: "cs",
              label: "CS Specialists",
              sub: "Lookup on Account",
              tone: "live",
            },
            {
              id: "pool",
              label: "CS Assignment Pool",
              sub: "e.g. Mohamed Alzoubi",
              tone: "live",
            },
            {
              id: "user",
              label: "CS Users",
              sub: "Real CRM user",
              tone: "live",
            },
            {
              id: "work",
              label: "Owner of Tasks / Refunds",
              sub: "That CRM user",
              tone: "live",
            },
          ]}
        />
        <DiagramLegend />
      </Section>

      <Section title="When a Pool record is deleted (Round Robin)">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="soon">Agreed — build next</Badge>
        </div>
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          If a specialist leaves and their CS Assignment Pool record is deleted,
          their Accounts must not stay empty. The system finds every Account still
          pointing to that specialist, then redistributes them evenly across the
          remaining specialists using Round Robin.
        </p>
        <Card>
          <ReqList
            items={[
              "Detect when a CS Assignment Pool record is deleted (example: Mohamed Alzoubi).",
              "Fetch all Accounts where CS Specialists = that deleted Pool record.",
              "Load the remaining active CS Assignment Pool records (exclude the deleted one).",
              "Reassign those Accounts one by one in Round Robin order.",
              "If only one specialist remains, all Accounts go to that person.",
              "If no specialists remain, do not leave Accounts unowned silently — stop or alert Admin.",
            ]}
          />
        </Card>
      </Section>

      <Section title="Round Robin example">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Assume three Pool records exist: Mohamed Alzoubi, Specialist B, and
          Specialist C. Mohamed has 7 Accounts. After Mohamed is deleted, those 7
          Accounts are shared between B and C like this:
        </p>
        <Table
          headers={["Account", "New CS Assignment Pool"]}
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
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Result: workload stays balanced. Nobody is left without a CS Specialist.
        </p>
      </Section>

      <Section title="What is working now">
        <Card>
          <ReqList
            items={[
              "Account → CS Assignment Pool → CS Users is live and used by Refund, CS Tasks, and Renewal Tasks.",
              "Create Refund / Renewal Task blocks if Account, Contact, or CS Specialist is missing.",
              "Round Robin reassignment when a Pool record is deleted is agreed and will be automated next.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
