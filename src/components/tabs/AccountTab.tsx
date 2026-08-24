import { FlowDiagram, DiagramLegend } from "../Diagram";
import { Badge, Card, Flow, ReqList, Section, Table } from "../ui";

export function AccountTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="live">Live foundation</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Accounts is the home module for CS Flow (section{" "}
          <strong className="text-[var(--ink)]">CS / Health Scores</strong>),
          Onboarding kickoff, and CS Specialist assignment.
        </p>
      </div>

      <Section eyebrow="Account module" title="Why Account matters">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          The Sales Order only stores the Account. From that Account we find the
          Contact (customer email/phone) and the CS Specialist (who owns Tasks,
          Refunds, and Renewal follow-ups). CS health (Stage, Stage Level,
          Customer Health Score) is calculated on the Account itself — not a
          separate module.
        </p>
        <Card>
          <ReqList
            items={[
              "Every Sales Order must have an Account linked.",
              "Account must have at least one Contact (first Contact is used for Refund emails).",
              "Account field CS Specialists points to a CS Assignment Pool record.",
              "That Pool’s CS Users field is the CRM user who owns Tasks and Refunds.",
              "Section CS / Health Scores holds logins, activity counts, Stage, Stage Level, and Health Score.",
            ]}
          />
        </Card>
      </Section>

      <Section eyebrow="On Account create" title="What runs when a new Account is created">
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Several Dev workflows on Accounts fire together (or shortly after). All
          are live. Tasks are created only in the cases listed in the Task
          section below (and on the CS Flow tab).
        </p>
        <Flow
          steps={[
            {
              title: "Dev - Update Account to NEW",
              detail:
                "On create → Field Update: Entered Onboarding = New (static). Description: when a new Account is created, set Enter Onboarding to NEW.",
              status: "live",
            },
            {
              title: "Dev - CS Specialist Round Robin",
              detail:
                "On create, only if Preserve Initial Migration CS is NOT selected → function Dev_Assign_CS_Specialist_Round_Robin. Assigns CS Assignment Pool to CS Specialists; creates Welcome Task for Pool.CS_Users. Never changes Account Owner.",
              status: "live",
            },
            {
              title: "Dev - 1 : Health Score Update Stage…",
              detail:
                "On create, all Accounts → function Dev_Update_Stage_and_Stage_Level_Based_on_Fields_Function. Sets Stage, Stage Level, Customer Health Score; creates Stage follow-up Task only if Stage is At Risk or Low Engagement (not Healthy).",
              status: "live",
            },
            {
              title: "Dev – Create Onboarding Record (5 min)",
              detail:
                "5 minutes after Created Time → create Onboardings_2 if a Contact is linked. Wait allows Contacts to import first.",
              status: "live",
            },
          ]}
        />
      </Section>

      <Section eyebrow="Tasks · critical" title="When is a Task created on Account?">
        <p className="mb-5 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Main client concern:{" "}
          <strong className="text-[var(--ink)]">when Zoho creates a Task</strong>.
          Full detail also on the CS Flow tab.
        </p>
        <Table
          headers={["Task", "Created when…", "Not created when…"]}
          rows={[
            [
              "Welcome Task for CS Specialist",
              "Account created + Round Robin assigns CS Specialists successfully (Preserve Initial Migration CS not selected). ALSO when CS Specialists is changed/updated on an existing Account → Welcome Task for the NEW specialist.",
              "Migration preserve on; already Assigned (create only); Round Robin / update fails.",
            ],
            [
              "Reassign Tasks to new CS",
              "When CS Specialists is changed/updated → related Tasks on that Account are assigned to the NEW CS Specialist (Pool → CS Users).",
              "CS Specialists not changed; Pool / CS Users missing.",
            ],
            [
              "Stage follow-up Task (Stages 1–4)",
              "Health Score runs on create OR on edit of any CS / Health Scores field, and Stage is At Risk or Low Engagement, and CS Specialists → CS Users exists.",
              "Stage = Healthy (5–6); Needs Review; CS Specialists empty.",
            ],
          ]}
        />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Stage 1 Cold · Stage 2 Visited · Stage 3 Dormant · Stage 4 Low Activity
          → <strong className="text-[var(--ink)]">Task yes</strong> (due +3 days).
          Stage 5 No Invoicing · Stage 6 Healthy →{" "}
          <strong className="text-[var(--ink)]">Task no</strong>.
        </p>
      </Section>

      <Section eyebrow="On Account edit" title="Health Score when CS / Health Scores changes">
        <div className="mb-5 rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)] p-5 shadow-[0_12px_40px_-28px_rgba(15,28,23,0.35)] md:p-6">
          <p className="mb-4 text-sm font-semibold tracking-wide text-[var(--accent)] uppercase">
            Highlight — must know
          </p>
          <p className="mb-4 max-w-2xl text-base leading-relaxed text-[var(--ink)]">
            Whenever <strong>any field</strong> in the Account section{" "}
            <strong>CS / Health Scores</strong> is updated:
          </p>
          <ol className="mb-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink)]">
            <li>
              <strong>Stage</strong> and <strong>Stage Level</strong> (and Customer
              Health Score) are recalculated and written on the Account.
            </li>
            <li>
              Close <strong>all open CS Stage Tasks</strong> on that Account (any
              Stage / Stage Level). Mark <strong>Completed</strong>, checkbox{" "}
              <strong>Close By System = true</strong>. Do not close Sales Order
              Upload or manual Tasks. Then create a <strong>new CS Stage Task</strong>{" "}
              (Stages 1–4 only; Healthy = no new Task).
            </li>
          </ol>
          <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
            Workflow: Dev - 2 : Health Score on Edit… → function
            Dev_Update_Stage_and_Stage_Level_Based_on_Fields_Function.
          </p>
        </div>
        <Card>
          <ReqList
            items={[
              "Rule: Dev - 2 : Health Score on Edit Stage and Stage Level Based on Fields.",
              "Trigger: when any field in section Standard → CS / Health Scores is edited (every time).",
              "Condition: all Accounts.",
              "Action: same function Dev_Update_Stage_and_Stage_Level_Based_on_Fields_Function.",
              "Result: update Stage / Stage Level / Health → close ALL open CS Stage Tasks (any stage; Completed + Close By System) → create new Task if not Healthy. Never closes Sales Order / manual Tasks.",
            ]}
          />
        </Card>
      </Section>

      <Section eyebrow="Critical · CS change" title="When CS Specialist is changed or updated">
        <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)] p-5 shadow-[0_12px_40px_-28px_rgba(15,28,23,0.35)] md:p-6">
          <p className="mb-4 text-sm font-semibold tracking-wide text-[var(--accent)] uppercase">
            Highlight — must know
          </p>
          <p className="mb-4 max-w-2xl text-base leading-relaxed text-[var(--ink)]">
            Whenever the Account field{" "}
            <strong>CS Specialists</strong> is{" "}
            <strong>changed or updated</strong> to a new Pool / specialist:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink)]">
            <li>
              <strong>A Welcome Task is created for the new CS Specialist</strong>{" "}
              (workflow: Dev - On Update CS_Specialist Welcome…).
            </li>
            <li>
              <strong>That new CS Specialist is assigned as Owner on the related
              Tasks</strong> for this Account (open CS work moves to the new
              person — Pool → CS Users).
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
            Account Owner is still not changed. Only CS Specialists + Task
            ownership follow the new specialist.
          </p>
        </div>
      </Section>

      <Section eyebrow="CS / Health Scores" title="Fields on the Account (this section)">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Layout section name in Zoho:{" "}
          <strong className="text-[var(--ink)]">CS / Health Scores</strong>. Key
          fields used by automation are listed first; other client fields in the
          same section are included for reference.
        </p>
        <Table
          headers={["Field (UI)", "Role"]}
          rows={[
            ["CS Specialists", "Lookup → CS Assignment Pool (who owns CS work)"],
            ["Login count", "L — drives Stage 1 vs later stages"],
            ["Invoices / Journal / Product / Service / Inventory count", "Sum S = activity; Invoice alone used for Stage 5 vs 6"],
            ["First Login / Last Login", "Last Login → D = today − Last Login (primary)"],
            ["Days Since Last Productive Activity", "Fallback for D; also written by the function"],
            ["Last Customer Activity Date", "Second fallback for D"],
            ["Stage Level", "Stage 1–6 label (e.g. Stage 2 - Visited)"],
            ["Stage", "At Risk / Low Engagement / Healthy"],
            ["Customer Health Score", "1 / 2 / 3"],
            ["Engagement Frequency, Churn Risk Level, Upsell/Cross-Sell…", "Client CS fields (same section)"],
            ["Has integration, Integration Types, Product Usage, NPS…", "Client CS fields (same section)"],
            ["Renewal Date, Accept Renewal, Auto Renewal Activated…", "Retention-related on Account"],
            ["Associated Refund / Associated Retention", "Links to Refund / Retention records"],
            ["Canceled on / Category / Sub Category, Cases status…", "Churn / support fields"],
            ["Activity Delta 15 / 30 days", "Activity trend fields"],
          ]}
        />
      </Section>

      <Section eyebrow="Stage matrix" title="How Stage / Stage Level / Health are calculated">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Inputs:{" "}
          <strong className="text-[var(--ink)]">L</strong> = Login count;{" "}
          <strong className="text-[var(--ink)]">S</strong> = Invoices + Journal +
          Product + Service + Inventory counts;{" "}
          <strong className="text-[var(--ink)]">D</strong> = today − Last Login
          (fallback: Days Since Last Productive Activity, then Last Customer
          Activity Date);{" "}
          <strong className="text-[var(--ink)]">I</strong> = Invoices count alone
          for Stages 5–6.
        </p>
        <Table
          headers={[
            "Stage Level",
            "Stage",
            "Login count",
            "Sum (invoice+journal+product+service+inventory)",
            "today − Last Login (D)",
            "Health",
          ]}
          rows={[
            [
              "Stage 1 - Cold Account",
              "At Risk",
              "L = 0",
              "—",
              "—",
              "1",
            ],
            [
              "Stage 2 - Visited",
              "At Risk",
              "L > 0",
              "S = 0",
              "blank or D < 90",
              "1",
            ],
            [
              "Stage 3 - Dormant",
              "At Risk",
              "L > 0",
              "S ≥ 0",
              "D ≥ 90",
              "1",
            ],
            [
              "Stage 4 - Low Activity",
              "Low Engagement",
              "L > 0",
              "S > 0",
              "45 < D < 90 (45 and 90 not included)",
              "2",
            ],
            [
              "Stage 5 - No Invoicing",
              "Healthy",
              "L > 0",
              "S > 0 and I = 0",
              "D ≤ 45",
              "3",
            ],
            [
              "Stage 6 - Healthy",
              "Healthy",
              "L > 0",
              "S > 0 and I > 0",
              "D ≤ 45",
              "3",
            ],
          ]}
        />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          If no rule matches → Needs Review (no Account update). If Stage =
          Healthy → no follow-up Task. Otherwise → Task for CS Specialist (due in
          3 days). See CS Flow tab for Task behaviour.
        </p>
      </Section>

      <Section eyebrow="CS Assignment Pool" title="How ownership is connected">
        <FlowDiagram
          title="Account → Pool → CRM user"
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

      <Section title="Round Robin on new Account (live)">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="live">Live</Badge>
        </div>
        <p className="mb-4 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Function{" "}
          <code className="rounded bg-[var(--paper)] px-1.5 py-0.5 text-xs text-[var(--ink)]">
            Dev_Assign_CS_Specialist_Round_Robin
          </code>
          . Uses CS Assignment Sequence on the Account and active Pool records
          (Active for Assignment + Assignment Order). Writes Pool into CS
          Specialists; creates Welcome Task. Skips if Preserve Initial Migration
          CS is selected.
        </p>
      </Section>

      <Section title="When a Pool record is deleted (Round Robin)">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="soon">Agreed — build next</Badge>
        </div>
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          If a specialist leaves and their CS Assignment Pool record is deleted,
          Accounts must be redistributed across remaining specialists. This
          reassignment on delete is agreed and not automated yet (separate from
          the live Round Robin on Account create).
        </p>
        <Card>
          <ReqList
            items={[
              "Detect when a CS Assignment Pool record is deleted.",
              "Fetch all Accounts where CS Specialists = that deleted Pool record.",
              "Reassign those Accounts with Round Robin across remaining active Pool records.",
              "If only one specialist remains, all Accounts go there.",
              "If none remain — alert Admin; do not leave Accounts unowned silently.",
            ]}
          />
        </Card>
      </Section>

      <Section title="What is completed (Accounts / CS foundation)">
        <Card>
          <ReqList
            items={[
              "CS / Health Scores section on Accounts with Stage, Stage Level, Health Score.",
              "Health Score function on Account create (Dev - 1) and on edit of CS / Health Scores (Dev - 2).",
              "Any CS / Health Scores field update → Stage + Stage Level recalculated; ALL open CS Stage Tasks (any stage) Completed + Close By System = true; then new Task (Stages 1–4). Sales Order / manual Tasks stay open.",
              "CS Specialist Round Robin on Account create (Preserve Migration CS respected).",
              "When CS Specialists is changed/updated → Welcome Task for the NEW specialist + reassign related Tasks to that specialist.",
              "Entered Onboarding → New on Account create.",
              "Onboarding record 5 minutes after Account create (if Contact linked).",
              "Account → CS Assignment Pool → CS Users used by Refund, CS Tasks, Renewal Tasks.",
              "Pool delete → Round Robin reassign — agreed, not built yet.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
