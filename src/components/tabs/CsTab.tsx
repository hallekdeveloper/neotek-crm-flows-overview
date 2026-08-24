import { BranchDiagram, DiagramLegend, FlowDiagram } from "../Diagram";
import { Badge, Card, Flow, ReqList, Section, Table } from "../ui";

export function CsTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="partial">Mostly live</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          CS Flow lives mainly on the <strong className="text-[var(--ink)]">Accounts</strong>{" "}
          module (section CS / Health Scores) plus CS Assignment Pool. Health
          stages, Round Robin assign, and CS Tasks are live. Pool delete
          reassignment is next.
        </p>
      </div>

      <Section eyebrow="CS Flow" title="What CS Flow covers">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Customer Success owns the customer relationship in Zoho. Home data sits
          on <strong className="text-[var(--ink)]">Accounts → CS / Health Scores</strong>.
          Ownership comes from <strong className="text-[var(--ink)]">CS Assignment Pool</strong>.
          Automations set Stage / Stage Level / Health, assign specialists, and
          create follow-up Tasks. The same CS user owns Refunds and Renewal Tasks.
        </p>
        <Card>
          <ReqList
            items={[
              "Main module: Accounts (section CS / Health Scores).",
              "Each CS Assignment Pool record = one CS Specialist (example: Mohamed Alzoubi).",
              "Accounts.CS Specialists → Pool; Pool.CS Users → CRM user who owns Tasks / Refunds.",
              "On create: Round Robin assigns Pool (unless Preserve Initial Migration CS).",
              "On create + on edit of CS / Health Scores: recalculate Stage, Stage Level, Health Score; Task if not Healthy.",
              "CS also owns Refund bank path and Renewal follow-up Tasks.",
              "If a Pool record is deleted → redistribute Accounts (agreed — next build).",
            ]}
          />
        </Card>
      </Section>

      <Section eyebrow="Tasks · critical" title="When is a Task created?">
        <p className="mb-5 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Client main concern:{" "}
          <strong className="text-[var(--ink)]">Tasks</strong>. Below is every
          case where Zoho creates a Task for the CS Specialist from the Account /
          CS Flow (plus related Renewal). If a condition is not met,{" "}
          <strong className="text-[var(--ink)]">no Task</strong> is created.
        </p>
        <Table
          headers={["Task type", "When it is created", "When it is NOT created", "Owner / due"]}
          rows={[
            [
              "Welcome Task for CS Specialist",
              "① New Account + Round Robin assigns CS Specialists. ② CS Specialists changed/updated on existing Account → Welcome Task for the NEW specialist.",
              "Preserve Migration CS; create-path already Assigned; assignment fails.",
              "Pool → CS Users · Due = today · Priority Highest",
            ],
            [
              "Reassign open Tasks to new CS",
              "CS Specialists on Account is changed/updated → related Tasks for that Account are assigned to the NEW CS Specialist (Pool → CS Users).",
              "CS Specialists not changed; Pool / CS Users missing.",
              "Same Account’s Tasks → new Owner",
            ],
            [
              "Stage follow-up Task",
              "Health Score function runs (Account create OR any field in CS / Health Scores is edited) AND Stage is calculated as At Risk or Low Engagement (Stages 1–4) AND CS Specialists → Pool → CS Users is filled.",
              "Stage = Healthy (Stages 5–6); Needs Review (no rule match); CS Specialists empty; Pool or CS Users missing.",
              "Pool → CS Users · Due = today + 3 days · Priority High",
            ],
            [
              "Renewal follow-up Task",
              "Daily schedule finds Active yearly Sales Order within 60 days of Subscription End Date (Retention flow).",
              "Outside the 60-day window; not yearly/Active; CS Owner missing.",
              "Same CS Owner · see Retention tab",
            ],
          ]}
        />
        <div className="mt-6 rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)] p-5 md:p-6">
          <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--accent)] uppercase">
            Highlight — CS Specialist change
          </p>
          <p className="text-sm leading-relaxed text-[var(--ink)]">
            <strong>Whenever CS Specialists is changed or updated on an Account:</strong>{" "}
            (1) a <strong>Welcome Task is created for the new CS Specialist</strong>, and
            (2) <strong>related Tasks on that Account are reassigned to the new CS
            Specialist</strong>. Workflow: Dev - On Update CS_Specialist Welcome…
          </p>
        </div>
        <div className="mt-5 rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)] p-5 md:p-6">
          <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--accent)] uppercase">
            Highlight — CS / Health Scores edit
          </p>
          <p className="mb-3 text-sm leading-relaxed text-[var(--ink)]">
            <strong>Whenever any field in CS / Health Scores is updated:</strong>
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink)]">
            <li>
              <strong>Stage</strong> and <strong>Stage Level</strong> (and Health
              Score) are recalculated and saved on the Account.
            </li>
            <li>
              Close <strong>all open CS Stage Tasks</strong> on that Account (any
              Stage / Stage Level) → Status <strong>Completed</strong>,{" "}
              <strong>Close By System = true</strong>. Do{" "}
              <strong>not</strong> close Sales Order Upload or manual Tasks.
            </li>
            <li>
              Then <strong>create a new CS Stage Task</strong> (Stages 1–4 only;
              Healthy = no Task).
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <Card>
            <p className="mb-3 text-sm font-semibold text-[var(--ink)]">
              Stage follow-up Task — created only for these stages
            </p>
            <Table
              headers={["Stage Level", "Stage", "Task created?"]}
              rows={[
                ["Stage 1 - Cold Account", "At Risk", "Yes"],
                ["Stage 2 - Visited", "At Risk", "Yes"],
                ["Stage 3 - Dormant", "At Risk", "Yes"],
                ["Stage 4 - Low Activity", "Low Engagement", "Yes"],
                ["Stage 5 - No Invoicing", "Healthy", "No"],
                ["Stage 6 - Healthy", "Healthy", "No"],
                ["Needs Review (no match)", "—", "No"],
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
              Subject format:{" "}
              <code className="rounded bg-[var(--paper)] px-1.5 py-0.5 text-xs text-[var(--ink)]">
                {"{Stage Level} | {Stage} | Follow-up call – check blockers/challenges with the product"}
              </code>
              . Before creating, <strong className="text-[var(--ink)]">all open CS
              Stage Tasks</strong> on the Account (any Stage) are{" "}
              <strong className="text-[var(--ink)]">Completed</strong> with{" "}
              <strong className="text-[var(--ink)]">Close By System = true</strong>.
              Sales Order Upload and manual Tasks are left alone. Then a{" "}
              <strong className="text-[var(--ink)]">new CS Stage Task</strong> is created.
            </p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Live workflows" title="Accounts automations for CS">
        <Table
          headers={["Workflow", "When", "What it does", "Status"]}
          rows={[
            [
              "Dev - CS Specialist Round Robin",
              "Account create; Preserve Initial Migration CS is NOT selected",
              "Function Dev_Assign_CS_Specialist_Round_Robin → set CS Specialists + Welcome Task",
              "Live",
            ],
            [
              "Dev - 1 : Health Score Update Stage…",
              "Account create (all Accounts)",
              "Function Dev_Update_Stage_and_Stage_Level_Based_on_Fields_Function",
              "Live",
            ],
            [
              "Dev - 2 : Health Score on Edit…",
              "Any field in section CS / Health Scores edited",
              "Recalculate Stage / Stage Level / Health → close ALL open CS Stage Tasks (any stage; Completed + Close By System) → create new Task if not Healthy. Never closes Sales Order / manual Tasks",
              "Live — highlighted",
            ],
            [
              "Dev - Update Account to NEW",
              "Account create",
              "Entered Onboarding = New",
              "Live",
            ],
            [
              "Dev – Create Onboarding Record 5 Min…",
              "5 min after Created Time",
              "Create Onboarding if Contact linked (see Onboarding tab)",
              "Live",
            ],
            [
              "Dev - On Update CS_Specialist Welcome…",
              "Account modified — CS Specialists changed/updated",
              "Welcome Task for NEW CS Specialist + reassign related Tasks to that specialist",
              "Live — highlighted",
            ],
            [
              "Dev_move_Account_to_stage_At_Risk…",
              "Based on Last Customer Activity Date",
              "Related At Risk movement (existing rule)",
              "Live",
            ],
          ]}
        />
      </Section>

      <Section eyebrow="Stage matrix" title="Client rules — Stage Level / Stage / Health">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Exact client table.{" "}
          <strong className="text-[var(--ink)]">L</strong> = login_count;{" "}
          <strong className="text-[var(--ink)]">S</strong> = sum(invoice, journal,
          product, service, inventory);{" "}
          <strong className="text-[var(--ink)]">D</strong> = today − Last Login;
          <strong className="text-[var(--ink)]"> I</strong> = invoice count alone
          for Stages 5–6.
        </p>
        <Table
          headers={[
            "Stage Level",
            "Stage (CRM)",
            "login_count",
            "sum (invoice, journal, product, service, inventory)",
            "today − Last login date",
            "Health Score",
          ]}
          rows={[
            [
              "Stage 1 - Cold Account",
              "At Risk",
              "login_count = 0",
              "—",
              "—",
              "1",
            ],
            [
              "Stage 2 - Visited",
              "At Risk",
              "login_count > 0",
              "S = 0",
              "blank or less than 90",
              "1",
            ],
            [
              "Stage 3 - Dormant",
              "At Risk",
              "login_count > 0",
              "S ≥ 0",
              "greater than or equal 90",
              "1",
            ],
            [
              "Stage 4 - Low Activity",
              "Low Engagement",
              "login_count > 0",
              "greater than 0",
              "45 < D < 90 (45 and 90 not included)",
              "2",
            ],
            [
              "Stage 5 - No Invoicing",
              "Healthy",
              "login_count > 0",
              "S > 0 and invoice = 0",
              "less than or equal 45",
              "3",
            ],
            [
              "Stage 6 - Healthy",
              "Healthy",
              "login_count > 0",
              "S > 0 and invoice > 0",
              "less than or equal 45",
              "3",
            ],
          ]}
        />
      </Section>

      <Section eyebrow="Function" title="Dev_Update_Stage_and_Stage_Level_Based_on_Fields">
        <Flow
          steps={[
            {
              title: "Read inputs from Account",
              detail:
                "L, I, Product/Service/Journal/Inventory counts → S. D from Last Login, else Days Since Last Productive Activity, else Last Customer Activity Date.",
              status: "live",
            },
            {
              title: "Calculate Stage / Stage Level / Health",
              detail:
                "Apply Stage 1–6 rules above. No match → Needs Review (exit, no update).",
              status: "live",
            },
            {
              title: "Update Account",
              detail:
                "Write Stage, Stage_Level, Customer_Health_Score; refresh Days_Since_Last_Productive_Activity when D is known.",
              status: "live",
            },
            {
              title: "Healthy → stop",
              detail: "If Stage = Healthy, do not create a Task.",
              status: "live",
            },
            {
              title: "Close all open CS Stage Tasks",
              detail:
                "Any open CS Stage Task on this Account (subject starts with “Stage …” + follow-up action, or description “Auto-created after Stage update.”) → Completed + Close_By_System = true. Does not close Sales Order Upload or manual Tasks.",
              status: "live",
            },
            {
              title: "Resolve CS owner via Pool",
              detail:
                "CS Specialists → CS Assignment Pool → CS_Users. If empty → log error, no Task.",
              status: "live",
            },
            {
              title: "Create follow-up Task (new)",
              detail:
                "Subject: Stage Level | Stage | Follow-up call – check blockers/challenges with the product. Owner = CS user. Due = today + 3. Priority High. Related to Account. Close_By_System = false on the new Task.",
              status: "live",
            },
          ]}
        />
      </Section>

      <Section eyebrow="Round Robin assign" title="Dev_Assign_CS_Specialist_Round_Robin (live)">
        <FlowDiagram
          title="New Account → CS Specialist"
          nodes={[
            {
              id: "a",
              label: "Account created",
              sub: "Preserve Migration CS off",
              tone: "live",
            },
            {
              id: "s",
              label: "CS Assignment Sequence",
              sub: "Auto number on Account",
              tone: "live",
            },
            {
              id: "p",
              label: "Active Pool records",
              sub: "Assignment Order ASC",
              tone: "live",
            },
            {
              id: "i",
              label: "Round Robin pick",
              sub: "(sequence − 1) % count",
              tone: "live",
            },
            {
              id: "u",
              label: "CS Specialists = Pool",
              sub: "+ Welcome Task",
              tone: "live",
            },
          ]}
        />
        <DiagramLegend />
        <div className="mt-6">
          <Card>
            <ReqList
              items={[
                "Never updates Account Owner — only CS Specialists (Pool lookup).",
                "If Preserve Initial Migration CS = true → status Migration Preserved; skip assign.",
                "If already Assigned with CS Specialists filled → skip (no duplicate).",
                "Active_for_Assignment + CS_Users + Assignment_Order required on Pool.",
                "Welcome Task: “Welcome Task for CS Specialist - {Account Name}”, Priority Highest, due today.",
                "Errors write CS_Assignment_Status = Error and CS_Assignment_Error text.",
              ]}
            />
          </Card>
        </div>
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
      </Section>

      <Section title="Business rule — delete Pool → Round Robin reassign">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="soon">Agreed — build next</Badge>
        </div>
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          Separate from Round Robin on create. When a Pool record is deleted,
          Accounts still pointing at it must be redistributed evenly among
          remaining specialists.
        </p>
        <Flow
          steps={[
            {
              title: "Detect delete",
              detail: "CS Assignment Pool record deleted (example: Mohamed Alzoubi).",
              status: "soon",
            },
            {
              title: "Find affected Accounts",
              detail: "CS Specialists = deleted Pool record.",
              status: "soon",
            },
            {
              title: "Round Robin reassign",
              detail: "Walk Accounts across remaining active Pool records.",
              status: "soon",
            },
            {
              title: "Edge cases",
              detail:
                "One left → all go there. Zero left → alert Admin; do not leave empty silently.",
              status: "soon",
            },
          ]}
        />
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
              sub: "Email Finance · Yes/No live",
              tone: "live",
            },
            {
              id: "done",
              label: "Refund Done / notify CS",
              sub: "Yes → Done · No → Owner",
              tone: "live",
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

      <Section title="What is completed for CS (send to client)">
        <Card>
          <ReqList
            items={[
              "Accounts section CS / Health Scores — Stage, Stage Level, Customer Health Score driven by login + activity + days since last login.",
              "Stage 1–6 matrix implemented in Dev_Update_Stage_and_Stage_Level_Based_on_Fields_Function.",
              "Workflow Dev - 1 on Account create + Dev - 2 on edit of CS / Health Scores.",
              "Non-Healthy stages (1–4) create High-priority CS Task (due +3 days); Healthy (5–6) = no Task; Needs Review = no Task; all previous open CS Stage Tasks closed by system.",
              "On any CS / Health Scores field update: Stage + Stage Level recalculated; ALL open CS Stage Tasks (any stage) → Completed + Close By System = true → then new Task created (if not Healthy). Sales Order / manual Tasks are not closed.",
              "Welcome Task created when Round Robin assigns CS on Account create (not when Migration CS is preserved).",
              "When CS Specialists is changed/updated → Welcome Task for the NEW specialist + reassign related Account Tasks to that specialist (highlighted).",
              "CS Assignment Pool → CS Specialists → CS Users ownership for Tasks, Refunds, Renewal.",
              "Entered Onboarding = New + Onboarding create after 5 minutes (related Account/Onboarding path).",
              "Refund bank path (Manual / Form / reminder) and Renewal Task ownership for CS — live.",
              "Not yet: Pool delete → Round Robin redistribute.",
            ]}
          />
        </Card>
      </Section>
    </div>
  );
}
