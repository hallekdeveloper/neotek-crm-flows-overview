import { DiagramLegend, FlowDiagram, FlowDiagramRow } from "../Diagram";
import { Badge, Card, Flow, ReqList, Section, Table } from "../ui";

export function OnboardingTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="live">Live — Qaema</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Zoho CRM Onboardings + Zoho Bookings + Zoho Survey. Documented 19 Jul
          2026 (Neotek for Qaema).
        </p>
      </div>

      <Section eyebrow="Onboarding module" title="What this flow does">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          From creating an Onboarding record through appointment booking,
          cancellation / reschedule, and the post-meeting survey — with as little
          manual typing as possible. The CRM user still pastes a fresh Zoho
          Bookings one-time link; everything else is automation.
        </p>
        <Card>
          <ReqList
            items={[
              "When a new Account is created → wait 5 minutes → auto-create Onboarding (if a Contact is linked).",
              "On Onboarding create → Round Robin owner + Welcome Call task.",
              "Contact / Email / Phone / Account / CR are set on create (from Account + first related Contact).",
              "Paste Zoho Bookings one-time base link → workflow builds prefilled link + Saudi timestamp.",
              "About 5 minutes after the link timestamp → Email + WhatsApp invite (if link is set).",
              "Book / reschedule / cancel → Booking Status + Date/Time sync (will not overwrite Completed).",
              "After appointment → Survey → answers land on the Onboarding record.",
              "Cancel → Cancel Reason once (may not re-prompt if already filled).",
            ]}
          />
        </Card>
      </Section>

      <Section title="How an Onboarding record is created">
        <p className="mb-6 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
          The main production path is automatic from Account. Manual create and CSV
          import are additional options. Any new Onboarding still gets Round Robin
          owner + Welcome Call on create.
        </p>

        <FlowDiagram
          title="Primary path — Account → Onboarding (live in Zoho)"
          nodes={[
            {
              id: "acc",
              label: "Account created",
              sub: "Accounts module",
              tone: "live",
            },
            {
              id: "wait",
              label: "Wait 5 minutes",
              sub: "After Created Time · once",
              tone: "live",
            },
            {
              id: "fn",
              label: "Custom function",
              sub: "Dev – Create Onboarding…",
              tone: "live",
            },
            {
              id: "ob",
              label: "Onboardings_2 created",
              sub: "Status = New · workflows fire",
              tone: "live",
            },
          ]}
        />
        <DiagramLegend />

        <h3
          className="mb-3 mt-8 text-lg text-[var(--ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Path A — Auto from Account (live — confirmed in Zoho)
        </h3>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Workflow rule{" "}
          <strong className="text-[var(--ink)]">Dev – Create Onboarding Reco…</strong>{" "}
          on module <strong className="text-[var(--ink)]">Accounts</strong>: trigger{" "}
          <strong className="text-[var(--ink)]">5 Minutes After Created Time</strong>
          , recur once, all Accounts. Instant action runs function{" "}
          <code className="rounded bg-[var(--paper)] px-1.5 py-0.5 text-xs">
            Dev_Create_OnboardingCard_After_1_Day_of_RegistrationDate
          </code>
          . (The function name still says “1 Day”; the workflow timing in Zoho is{" "}
          <strong className="text-[var(--ink)]">5 minutes</strong>.)
        </p>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Why the delay: give time for related Contacts to be imported / linked,
          because Onboarding needs both the Account and a Contact.
        </p>
        <Flow
          steps={[
            {
              title: "Load Account",
              detail: "Function receives account_id and reads the Accounts record.",
              status: "live",
            },
            {
              title: "Load related Contacts",
              detail:
                "getRelatedRecords Contacts under that Account. If none → stop and log “NO CONTACT Linked”.",
              status: "live",
            },
            {
              title: "Use first Contact",
              detail:
                "Takes Full_Name, id, Email, Phone from the first related Contact.",
              status: "live",
            },
            {
              title: "Create Onboardings_2",
              detail:
                "Name = “Onboarding - ” + Account Name. Sets Contact, Phone_Number, Email, Account, CR_Number (from Unified_CR), Onboarding_Status = New. createRecord with workflow trigger so Round Robin / Welcome Call still run.",
              status: "live",
            },
          ]}
        />
        <Table
          headers={["Onboarding field", "Source"]}
          rows={[
            ["Name", "“Onboarding - ” + Account_Name"],
            ["Contact", "First related Contact id"],
            ["Phone_Number", "Contact Phone"],
            ["Email", "Contact Email"],
            ["Account", "Account id (the new Account)"],
            ["CR_Number", "Account Unified_CR (blank if empty)"],
            ["Onboarding_Status", "Fixed: New"],
          ]}
        />

        <h3
          className="mb-3 mt-8 text-lg text-[var(--ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Path B — Manual in CRM
        </h3>
        <Flow
          steps={[
            {
              title: "Open Onboardings module",
              detail:
                "CRM user creates a new record in Onboardings (Onboardings_2).",
              status: "live",
            },
            {
              title: "System runs on create",
              detail:
                "Round Robin assigns Onboarding Owner. Welcome Call task is created.",
              status: "live",
            },
            {
              title: "User selects / confirms Contact",
              detail:
                "Client script can copy Email, Phone, Account, Unified CR if needed. Then paste the Bookings one-time link.",
              status: "live",
            },
          ]}
        />

        <h3
          className="mb-3 mt-8 text-lg text-[var(--ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Path C — One CSV file (Account + Contact + Onboarding)
        </h3>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Sample registration CSVs keyed by{" "}
          <strong className="text-[var(--ink)]">Qaemaa Customer ID</strong> can
          create Account + Contact(s) first. Once the Account exists, Path A’s
          5-minute workflow can create the Onboarding — as long as at least one
          Contact is already linked when the function runs.
        </p>
        <Table
          headers={["CSV column", "Goes into", "Notes"]}
          rows={[
            [
              "Qaemaa Customer ID",
              "Account key",
              "Same ID = one Account; multiple emails = multiple Contacts",
            ],
            ["Account Name", "Account", "Company name"],
            ["Unified CR", "Account · Unified_CR", "Used later as CR_Number on Onboarding"],
            [
              "Customer Email / Mobile Number",
              "Contact",
              "Must exist before the 5-minute function runs",
            ],
          ]}
        />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          <strong className="text-[var(--ink)]">Important:</strong> if Account is
          created with <em>no</em> Contact yet, the 5-minute function skips
          Onboarding creation and logs that no Contact is linked.
        </p>
      </Section>

      <Section title="Systems involved">
        <FlowDiagramRow
          title="Where each step runs"
          nodes={[
            {
              id: "crm",
              label: "Zoho CRM",
              sub: "Onboardings · Contact · Account",
              tone: "live",
            },
            {
              id: "book",
              label: "Zoho Bookings",
              sub: "One-time appointment link",
              tone: "live",
            },
            {
              id: "survey",
              label: "Zoho Survey",
              sub: "Post-meeting evaluation",
              tone: "live",
            },
            {
              id: "msg",
              label: "Email + WhatsApp",
              sub: "Invite & reminders",
              tone: "live",
            },
          ]}
        />
        <DiagramLegend />
      </Section>

      <Section title="End-to-end journey">
        <FlowDiagram
          title="Customer onboarding → booking → survey"
          nodes={[
            {
              id: "1",
              label: "Create Onboarding",
              sub: "Round Robin owner + Welcome Call",
              tone: "live",
            },
            {
              id: "2",
              label: "Select Contact",
              sub: "Email · Phone · Account · CR",
              tone: "live",
            },
            {
              id: "3",
              label: "Paste Bookings base link",
              sub: "One Time Booking Link",
              tone: "live",
            },
            {
              id: "4",
              label: "Prefill + timestamp",
              sub: "Saudi ISO date/time (+03:00)",
              tone: "live",
            },
            {
              id: "5",
              label: "~5 min later",
              sub: "Email + WhatsApp invite",
              tone: "live",
            },
            {
              id: "6",
              label: "Customer books",
              sub: "Status + Date/Time sync",
              tone: "live",
            },
            {
              id: "7",
              label: "Survey after meeting",
              sub: "Answers → Onboarding",
              tone: "live",
            },
          ]}
        />
        <DiagramLegend />
      </Section>

      <Section title="Step by step (what happens in Zoho)">
        <Flow
          steps={[
            {
              title: "Create Onboarding record",
              detail:
                "On create: assign Onboarding Owner by Round Robin, create Welcome Call task, run preparation actions.",
              status: "live",
            },
            {
              title: "Select Contact",
              detail:
                "Client script copies Contact Email and Phone. If Contact has an Account, copies Account Name and Unified CR into the Onboarding.",
              status: "live",
            },
            {
              title: "Paste unique Bookings base link",
              detail:
                "User gets a fresh one-time link from Zoho Bookings (example domain qaema.zohobookings.sa) and pastes it into One Time Booking Link. Do not reuse a used or shared link.",
              status: "live",
            },
            {
              title: "Workflow builds prefilled URL",
              detail:
                "On link change (not empty): append Name, Email, Contact Number (Saudi-normalized), Customer ID (Onboarding ID), CR, Company Name. Write completed URL back to the same field. Stamp One Time Booking Link Date Time Field.",
              status: "live",
            },
            {
              title: "Invite after 5 minutes",
              detail:
                "Rule runs five minutes after the timestamp. If the link is still filled, send Email + WhatsApp with the booking invitation.",
              status: "live",
            },
            {
              title: "Book / reschedule / cancel",
              detail:
                "Bookings syncs Booking Status and Booking Date/Time. Reschedule or cancel may update Onboarding Status only when Onboarding Status is not already Completed.",
              status: "live",
            },
            {
              title: "Survey after appointment",
              detail:
                "At the configured completion point, survey is sent. Submitted answers update Survey Status, completion time, and mapped rating/feedback fields on the same Onboarding.",
              status: "live",
            },
          ]}
        />
      </Section>

      <Section title="Data copy — Contact & Account → Onboarding">
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Prefill only uses data that already exists. Blank Contact or Account
          fields stay blank on the booking page — the system does not invent
          values.
        </p>
        <Table
          headers={["Source", "Source field", "Onboarding destination"]}
          rows={[
            ["Contacts", "Contact Name", "Contact lookup / identity"],
            ["Contacts", "Email", "Email"],
            ["Contacts", "Phone", "Phone (Phone_Number)"],
            ["Contacts", "Account Name", "Account lookup"],
            ["Accounts", "Account Name", "Company on booking form"],
            ["Accounts", "Unified CR (Unified_CR)", "CR Number"],
          ]}
        />
      </Section>

      <Section title="Main Onboarding fields">
        <Table
          headers={["Field label", "API name (where known)", "Updated by", "Purpose"]}
          rows={[
            ["Contact", "Contact", "CRM user", "Starts auto-population"],
            ["Account", "Account", "System when linked", "Company on the record"],
            ["Email", "Email", "System / user", "Booking + emails"],
            ["Phone", "Phone_Number", "System / user", "Booking contact number"],
            ["CR Number", "— (from Unified_CR)", "System / user", "Commercial Registration"],
            [
              "One Time Booking Link",
              "One_Time_Booking_Link",
              "User pastes base → system prefills",
              "Base then completed Bookings URL",
            ],
            [
              "One Time Booking Link Date Time Field",
              "One_Time_Booking_Link_Date_Time_Field",
              "System",
              "Saudi stamp; drives 5-min invite",
            ],
            ["Booking Status", "—", "Bookings integration", "Scheduled / Rescheduled / Cancelled"],
            ["Booking Date/Time", "—", "Bookings integration", "Appointment slot"],
            ["Onboarding Status", "—", "User / workflow", "Operational stage"],
            ["Cancellation Reason", "—", "User / Bookings", "Why cancelled"],
            ["Survey Status + answers", "—", "Survey integration", "Post-meeting evaluation"],
          ]}
        />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Module in admin docs: <strong className="text-[var(--ink)]">Onboardings 2</strong>.
          Account master field for CR:{" "}
          <strong className="text-[var(--ink)]">Unified_CR</strong>. Timestamp
          example format:{" "}
          <code className="rounded bg-[var(--paper)] px-1.5 py-0.5 text-xs">
            2026-07-19T12:30:00+03:00
          </code>
          .
        </p>
      </Section>

      <Section title="What is prefilled on the Bookings page">
        <Table
          headers={["Booking page field", "CRM source"]}
          rows={[
            ["Name", "Selected Contact name"],
            ["Email", "Onboarding Email (from Contact)"],
            ["Contact Number", "Onboarding Phone (Saudi-normalized)"],
            ["Customer ID", "Onboarding CRM record ID"],
            ["CR", "Account Unified CR"],
            ["Company Name", "Account Name"],
          ]}
        />
      </Section>

      <Section title="Booking sync — customer actions">
        <FlowDiagramRow
          title="After the customer uses the link"
          nodes={[
            {
              id: "book",
              label: "Books",
              sub: "Scheduled + Date/Time",
              tone: "live",
            },
            {
              id: "re",
              label: "Reschedules",
              sub: "New status + new slot",
              tone: "live",
            },
            {
              id: "cancel",
              label: "Cancels",
              sub: "Cancelled + reason",
              tone: "live",
            },
          ]}
        />
        <DiagramLegend />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Protection: if Onboarding Status is already{" "}
          <strong className="text-[var(--ink)]">Completed</strong>, the
          reschedule / cancel status workflow does not overwrite it.
        </p>
      </Section>

      <Section title="Cancellation reason">
        <Flow
          steps={[
            {
              title: "Cancel from CRM (Kanban or Status)",
              detail:
                "Set Onboarding Status to Cancelled. If Cancel Reason is empty, user must enter it.",
              status: "live",
            },
            {
              title: "Cancel from Zoho Bookings",
              detail:
                "Booking Status → Cancelled. Reason from integration is stored when supplied; CRM user can clarify.",
              status: "live",
            },
            {
              title: "Cancel again later",
              detail:
                "If a reason is already stored, CRM may not ask again. Review / clear / replace when the new cancel needs a different reason.",
              status: "live",
            },
          ]}
        />
      </Section>

      <Section title="Survey (after the meeting)">
        <Card>
          <ReqList
            items={[
              "Survey Status",
              "Rating of the trainer’s ability to explain",
              "Whether training prepared the customer to use the solution",
              "How clear and easy the training was",
              "Survey Completion Time",
              "Areas of training that could be improved",
            ]}
          />
        </Card>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Answers sync onto the same Onboarding record — no manual re-entry.
        </p>
      </Section>

      <Section title="Daily operating checklist">
        <Table
          headers={["When", "User checks"]}
          rows={[
            [
              "Before the link",
              "Contact: Name, Email, Phone, Account. Account: Name + Unified CR. Select Contact on Onboarding and confirm copied fields.",
            ],
            [
              "Prepare link",
              "Fresh Bookings one-time link → paste into One Time Booking Link → save → wait for prefilled URL + timestamp → open link and verify prefills.",
            ],
            [
              "After invite",
              "Watch Booking Status / Date/Time. Follow up if no book. Confirm cancel reason. After meeting, check Survey Status and answers.",
            ],
          ]}
        />
      </Section>

      <Section title="Important controls">
        <Card>
          <ReqList
            items={[
              "One invite path only — avoid duplicate Email/WhatsApp from both create-record and the 5-minute timestamp rule.",
              "New one-time link for every customer — never reuse a consumed or shared link.",
              "Users own data quality — automation copies; it does not validate that email/phone/CR belong to the right customer.",
              "If API names change, update Deluge + client script before going live.",
            ]}
          />
        </Card>
      </Section>

      <Section title="What is live (this module)">
        <div className="grid gap-3">
          {[
            ["Account create → wait 5 min → auto Onboarding (if Contact linked)", "Live — Dev workflow + function"],
            ["Create Onboarding manually in CRM", "Live"],
            ["On create: Round Robin owner + Welcome Call task", "Live"],
            ["CSV → Account + Contact(s) then Path A can fire", "Supports Path A timing"],
            ["Contact → Email / Phone / Account / CR on auto-create", "Live — first related Contact"],
            ["One-time link → prefilled URL + Saudi timestamp", "Live"],
            ["Email + WhatsApp ~5 min after link timestamp", "Live — different 5-min rule"],
            ["Bookings → Booking Status / Date/Time sync", "Live"],
            ["Completed protection on reschedule/cancel", "Live"],
            ["Cancel Reason capture", "Live"],
            ["Survey → Onboarding survey fields", "Live"],
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
