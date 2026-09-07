"use client";

import { AnimatedStoryFlow, type StoryStep } from "../AnimatedStoryFlow";
import { Badge, Card, Section } from "../ui";

const VIDEOS = {
  ziwo: "https://workdrive.zohoexternal.sa/file/adll70cb09d41eaa04a55a503a440f97a65ec",
  ziwoThumb: "/thumbs/ziwo-crm-call-thumb.png",
  webinar:
    "https://workdrive.zohoexternal.sa/file/adll7c447a5c61a884dce8872ceabae9a6489",
  appointment:
    "https://workdrive.zohoexternal.sa/file/adll71d540ae1c03c453281f53bfc8f830195",
  whatsapp:
    "https://workdrive.zohoexternal.sa/file/adll7294294161e9946949d7b28d6feecad21",
  assist:
    "https://workdrive.zohoexternal.sa/file/adll76d9ce4e920d642a09276da2ec218ded5",
  refund1:
    "https://workdrive.zohoexternal.sa/external/992edbdb110216287bca171af7d29eecb766c7b03f83fd6c64a92d7ef45e44e4",
  refund1Thumb:
    "https://previewengine.zohoexternal.sa/thumbnail/WD/5zcd5da08efda992f4d198bceb1bc1165b896?size=l",
  refund2:
    "https://workdrive.zohoexternal.sa/external/d9a2fab2061e88e75a4a7576c4b6fc0f67f85073268914eee080cedd58a5f349",
  refund2Thumb:
    "https://previewengine.zohoexternal.sa/thumbnail/WD/5zcd54d6212afe0e14e9b8174963116910cd4?size=l",
  retention:
    "https://workdrive.zohoexternal.sa/external/8fc4f49e9f083aeb1cb2d0e7266d5a38c692ccf95107eb0dcb1d15f903e20b6d",
} as const;

const FLOW_ZIWO: StoryStep[] = [
  {
    id: "1",
    label: "Open Contact",
    sub: "Has phone number",
    story: "Open a Contact in Zoho CRM that has a phone number ready to dial.",
  },
  {
    id: "2",
    label: "Call icon",
    sub: "On the Contact",
    story: "Use the Call icon on the Contact record — Ziwo is connected as the phone system (PhoneBridge / click-to-call).",
  },
  {
    id: "3",
    label: "Click Call",
    sub: "Goes through Ziwo",
    story: "Click Call — the outbound call is placed through Ziwo from CRM.",
  },
  {
    id: "4",
    label: "Call activity",
    sub: "Saved on Contact",
    story: "After the call, CRM saves a Call activity on that same Contact.",
  },
  {
    id: "5",
    label: "Open Calls",
    sub: "Then Closed Calls",
    story: "The call shows under Open Activities → Open Calls, and later under Closed Calls when finished — history stays on the Contact.",
  },
];

const FLOW_WEBINAR: StoryStep[] = [
  {
    id: "1",
    label: "CRM Campaigns",
    sub: "Create webinar",
    story: "In Zoho CRM, open Campaigns and create a webinar campaign for the session.",
  },
  {
    id: "2",
    label: "Registration URL",
    sub: "Ready to share",
    story: "CRM shows the Registration URL for guests and Launch Webinar for the host.",
  },
  {
    id: "3",
    label: "Invite people",
    sub: "Link or Contacts",
    story: "Share the registration link, or invite Contacts directly from CRM.",
  },
  {
    id: "4",
    label: "Guest registers",
    sub: "Outside form",
    story: "The person opens the registration page and signs up for the webinar.",
  },
  {
    id: "5",
    label: "Contact linked",
    sub: "Back in CRM",
    story: "CRM creates or links the Contact and attaches them to that webinar campaign.",
  },
  {
    id: "6",
    label: "Host launches",
    sub: "Live from CRM",
    story: "The host starts the live webinar from CRM — the full session stays connected to the campaign.",
  },
];

const FLOW_APPOINTMENT: StoryStep[] = [
  {
    id: "1",
    label: "Open Contact",
    sub: "CRM Contacts",
    story: "Open the customer Contact record in Zoho CRM.",
  },
  {
    id: "2",
    label: "Appointment",
    sub: "Click the button",
    story: "Click the Appointment button on that Contact — no need to create a meeting separately.",
  },
  {
    id: "3",
    label: "Meeting created",
    sub: "Automatic",
    story: "CRM creates a Meeting activity and links it to the same Contact.",
  },
  {
    id: "4",
    label: "Open Activities",
    sub: "Visible on Contact",
    story: "The meeting appears under Open Activities so the team can follow up from one place.",
  },
];

const FLOW_WHATSAPP: StoryStep[] = [
  {
    id: "1",
    label: "Customer WhatsApp",
    sub: "First message",
    story: "The customer sends their first WhatsApp message into the connected channel.",
  },
  {
    id: "2",
    label: "Zoho Desk",
    sub: "Ticket opens",
    story: "Zoho Desk creates a support ticket for that WhatsApp conversation.",
  },
  {
    id: "3",
    label: "Zoho CRM",
    sub: "Contact created",
    story: "At the same time, CRM creates or links a Contact for the same person.",
  },
  {
    id: "4",
    label: "Teams in sync",
    sub: "Support + Sales",
    story: "Support works the Desk ticket; Sales/CS see the Contact in CRM — both stay aligned.",
  },
];

const FLOW_ASSIST: StoryStep[] = [
  {
    id: "1",
    label: "Open Contact",
    sub: "CRM Contacts",
    story: "Open the customer Contact in Zoho CRM where you need remote help.",
  },
  {
    id: "2",
    label: "Remote Assist",
    sub: "Click the button",
    story: "Click Remote Assist on the Contact to start a Zoho Assist session from CRM.",
  },
  {
    id: "3",
    label: "Invite sent",
    sub: "Email to customer",
    story: "CRM / Assist sends an invite link to the customer by email.",
  },
  {
    id: "4",
    label: "Customer opens",
    sub: "Accepts invite",
    story: "The customer opens the email, clicks the link, and joins the remote session.",
  },
  {
    id: "5",
    label: "Screen + control",
    sub: "Agent helps live",
    story: "The agent sees the customer screen and can take remote control — all from the Contact in CRM.",
  },
];

const FLOW_REFUND_1: StoryStep[] = [
  {
    id: "1",
    label: "Sales Order",
    sub: "Create Refund",
    story: "On Sales Orders Uploading, click Create Refund for an eligible subscription.",
  },
  {
    id: "2",
    label: "Eligibility",
    sub: "Active + window",
    story: "CRM checks Active status and the Start Date window (Monthly ≤ 3 days, Annual ≤ 5 days).",
  },
  {
    id: "3",
    label: "Refund record",
    sub: "CS Owner",
    story: "A Refund is created with Account, Contact, and CS Owner from the Pool.",
  },
  {
    id: "4",
    label: "Bank details",
    sub: "Manual or form",
    story: "CS collects bank details by Manual Entry or by sending the Zoho Form to the customer.",
  },
  {
    id: "5",
    label: "Finance Yes/No",
    sub: "Then Done",
    story: "Pipeline moves to Notify Finance; Finance answers Yes or No — Refund Done or CS is notified.",
  },
];

const FLOW_REFUND_2: StoryStep[] = [
  {
    id: "1",
    label: "Prepare SO",
    sub: "Test Start Date",
    story: "Set Status = Active and the Start Date for your test case (see Refund Flow tab tables).",
  },
  {
    id: "2",
    label: "Create Refund",
    sub: "Run the button",
    story: "Click Create Refund and confirm the record is created (or blocked if outside the window).",
  },
  {
    id: "3",
    label: "Bank path",
    sub: "Manual or form",
    story: "Walk Manual Entry or Send Form — including form submit and the 2-day reminder rule.",
  },
  {
    id: "4",
    label: "Notify Finance",
    sub: "Email Finance",
    story: "Move pipeline to Notify Finance so Finance receives the processing email.",
  },
  {
    id: "5",
    label: "Yes / No result",
    sub: "Status form",
    story: "Finance submits Yes → Refund Done + emails; No → CS Owner is notified.",
  },
];

const FLOW_RETENTION: StoryStep[] = [
  {
    id: "1",
    label: "Sales Order",
    sub: "Active · Yearly",
    story: "Start from an Active yearly/annual Sales Order with Account and CS Specialist linked.",
  },
  {
    id: "2",
    label: "60-day window",
    sub: "End Date near",
    story: "Subscription End Date must be within 0–60 days. Button or daily schedule can run.",
  },
  {
    id: "3",
    label: "Safety checks",
    sub: "No duplicates",
    story: "Skip if Renewal Task Created is true, or if an open Retention already exists on the Account.",
  },
  {
    id: "4",
    label: "Retention created",
    sub: "Backlog · CS Owner",
    story: "CRM creates a Retention record (Name, Account, Owner, Expiration Date, Pipeline = Backlog).",
  },
  {
    id: "5",
    label: "Flag + follow-up",
    sub: "CS works it",
    story: "SO is flagged Renewal Task Created. CS follows up on the Retention toward renew or churn.",
  },
];

function VideoCard({
  href,
  thumb,
  fileName,
  cta,
}: {
  href: string;
  thumb?: string;
  fileName: string;
  cta: string;
}) {
  return (
    <Card>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-4 block overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <div className="relative aspect-video w-full">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt={`${fileName} thumbnail`}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,#1a3a32_0%,#0f1c17_55%,#2d5a4a_100%)]" />
          )}
          <span
            className={`absolute inset-0 ${
              thumb
                ? "bg-[linear-gradient(to_top,rgba(15,28,23,0.45),transparent_40%)]"
                : "bg-[linear-gradient(to_top,rgba(15,28,23,0.55),transparent_45%)]"
            }`}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[var(--accent)] shadow-lg transition group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-7 w-7 fill-current"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
            <span className="text-sm font-semibold text-white">{fileName}</span>
            <span className="text-xs font-medium text-white/90">Opens on WorkDrive ↗</span>
          </span>
        </div>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        {cta}
        <span aria-hidden="true">↗</span>
      </a>
    </Card>
  );
}

function GuideBlock({
  eyebrow,
  title,
  status,
  summary,
  whatYouSee,
  result,
  href,
  thumb,
  fileName,
  cta,
  flowTitle,
  steps,
}: {
  eyebrow: string;
  title: string;
  status: "live" | "partial" | "soon";
  summary: string;
  whatYouSee: string[];
  result: string;
  href: string;
  thumb?: string;
  fileName: string;
  cta: string;
  flowTitle: string;
  steps: StoryStep[];
}) {
  return (
    <Section eyebrow={eyebrow} title={title}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge tone={status}>
          {status === "live" ? "Live" : status === "partial" ? "Partly live" : "Not yet"}
        </Badge>
      </div>
      <p className="mb-4 max-w-3xl leading-relaxed text-[var(--ink-soft)]">{summary}</p>
      <p className="mb-2 text-sm font-semibold text-[var(--ink)]">In the video you will see</p>
      <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        {whatYouSee.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)]">
        <strong className="font-semibold text-[var(--ink)]">Result: </strong>
        {result}
      </p>
      <div className="mb-6">
        <AnimatedStoryFlow title={flowTitle} steps={steps} />
      </div>
      <VideoCard href={href} thumb={thumb} fileName={fileName} cta={cta} />
    </Section>
  );
}

export function VideosTab() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge tone="live">All walkthrough videos</Badge>
        <p className="text-sm text-[var(--ink-soft)]">
          Watch each animated flow step by step, then open the matching video.
        </p>
      </div>

      <Section eyebrow="How to use this tab" title="Video guides & references">
        <Card>
          <p className="leading-relaxed text-[var(--ink-soft)]">
            Each guide has an animated story of the live path. Press{" "}
            <strong className="text-[var(--ink)]">Play Flow</strong> to watch steps move, or use{" "}
            <strong className="text-[var(--ink)]">Prev / Next</strong>. Then open the WorkDrive
            video to see the same flow in CRM.
          </p>
        </Card>
      </Section>

      <GuideBlock
        eyebrow="1 · Integration"
        title="Ziwo (click-to-call from CRM)"
        status="live"
        summary="Ziwo is connected to Zoho CRM as the phone system (PhoneBridge / click-to-call). Dial from a Contact — the call goes through Ziwo and the call log stays on that Contact."
        whatYouSee={[
          "Opening a Contact that has a phone number",
          "The Call icon on the Contact",
          "Clicking Call — the call goes out through Ziwo",
          "After the call: CRM saving a Call activity on that Contact",
          "The call under Open Activities → Open Calls (and later Closed Calls when finished)",
        ]}
        result="The agent dials from the Contact record. The call log stays on the same Contact, so the team can see history without leaving CRM."
        href={VIDEOS.ziwo}
        thumb={VIDEOS.ziwoThumb}
        fileName="Ziwo click-to-call from CRM.mp4"
        cta="Open Ziwo walkthrough"
        flowTitle="Ziwo — Contact to call log"
        steps={FLOW_ZIWO}
      />

      <GuideBlock
        eyebrow="2 · Integration"
        title="Zoho Webinar with CRM"
        status="live"
        summary="Webinars are managed from CRM. Create the webinar, share registration, link Contacts, and launch the live session from CRM."
        whatYouSee={[
          "A webinar campaign created in CRM",
          "Registration URL for guests, and Launch Webinar for the host",
          "Sharing the registration link or inviting Contacts from CRM",
          "After someone registers — Contact created/linked on that campaign",
          "The host starting the live session from CRM",
        ]}
        result="Create webinar → share Registration URL or invite Contacts → person registers → Contact linked → host launches from CRM."
        href={VIDEOS.webinar}
        fileName="Zoho Webinar + CRM.mp4"
        cta="Open Webinar walkthrough"
        flowTitle="Webinar — end to end"
        steps={FLOW_WEBINAR}
      />

      <GuideBlock
        eyebrow="3 · Integration"
        title="Appointment → Meeting on a Contact"
        status="live"
        summary="From a Contact record, the Appointment button creates a Meeting automatically and shows it under Open Activities."
        whatYouSee={[
          "Opening a Contact in CRM",
          "Clicking the Appointment button",
          "A new Meeting created automatically",
          "That meeting under Open Activities on the same Contact",
        ]}
        result="Team schedules and follows up from the Contact record in one place."
        href={VIDEOS.appointment}
        fileName="Appointment → Meeting.mp4"
        cta="Open Appointment walkthrough"
        flowTitle="Appointment — Contact to Meeting"
        steps={FLOW_APPOINTMENT}
      />

      <GuideBlock
        eyebrow="4 · Integration"
        title="WhatsApp → Desk ticket + CRM Contact"
        status="live"
        summary="When a customer sends their first WhatsApp message, Desk opens a ticket and CRM creates/links a Contact for the same person."
        whatYouSee={[
          "The incoming WhatsApp message",
          "A Zoho Desk ticket created for that conversation",
          "A Contact created in Zoho CRM for the same person",
        ]}
        result="From the first message: support has a ticket, sales/CRM has a contact — both stay in sync."
        href={VIDEOS.whatsapp}
        fileName="WhatsApp → Desk + CRM.mp4"
        cta="Open WhatsApp walkthrough"
        flowTitle="WhatsApp — message to Desk + CRM"
        steps={FLOW_WHATSAPP}
      />

      <GuideBlock
        eyebrow="5 · Integration"
        title="Zoho Assist (Remote Assist from CRM)"
        status="live"
        summary="From a Contact in CRM, start Remote Assist, send the invite link to the customer, and help them live after they open it — without leaving CRM."
        whatYouSee={[
          "Opening a Contact record",
          "Clicking Remote Assist",
          "Starting a remote session from CRM",
          "Invite sent to the client by email",
          "After accept: agent views screen and can take remote control",
        ]}
        result="The whole session stays inside CRM on the Contact record."
        href={VIDEOS.assist}
        fileName="Zoho Assist from CRM.mp4"
        cta="Open Zoho Assist walkthrough"
        flowTitle="Zoho Assist — Contact to remote help"
        steps={FLOW_ASSIST}
      />

      <GuideBlock
        eyebrow="6 · CRM flow"
        title="Refund Flow — Video 1 (flow overview)"
        status="live"
        summary="High-level Refund walkthrough from Sales Orders Uploading. Watch the flow only — ignore any subscription Start Date spoken or shown in this older recording."
        whatYouSee={[
          "Create Refund from Sales Orders Uploading",
          "Eligibility idea (Active + window from Start Date)",
          "Refund path toward bank details and Finance",
        ]}
        result="Use this for the story of the flow. For full testing, use Refund Video 2. Rules are on the Refund Flow tab."
        href={VIDEOS.refund1}
        thumb={VIDEOS.refund1Thumb}
        fileName="Screen Recording — Refund flow.mp4"
        cta="Open Refund Video 1"
        flowTitle="Refund — create to Finance"
        steps={FLOW_REFUND_1}
      />

      <GuideBlock
        eyebrow="7 · CRM flow"
        title="Refund Flow — Video 2 (complete testing)"
        status="live"
        summary="Full Refund testing walkthrough. Use with the Start Date test cases on the Refund Flow tab."
        whatYouSee={[
          "End-to-end Refund create and checks",
          "Bank collection paths in practice",
          "How to validate with the documented test dates",
        ]}
        result="Best video when you want to re-test Refund with the client using the live rules."
        href={VIDEOS.refund2}
        thumb={VIDEOS.refund2Thumb}
        fileName="Refund FLow.mp4"
        cta="Open Refund Video 2"
        flowTitle="Refund — testing path"
        steps={FLOW_REFUND_2}
      />

      <GuideBlock
        eyebrow="8 · CRM flow"
        title="Retention Flow walkthrough"
        status="live"
        summary="Button and daily schedule create a Retention module record (Backlog) for yearly subscriptions in the 0–60 day End Date window — not a CRM Task."
        whatYouSee={[
          "Retention button / schedule behaviour",
          "Yearly Active SO inside the 60-day window",
          "Retention created for the CS Owner (via Pool)",
          "Duplicate control with Renewal Task Created / open Retention",
        ]}
        result="CS works the Retention record toward renew / churn. Full rules are on the Retention Flow tab."
        href={VIDEOS.retention}
        fileName="Retention Flow Video.mp4"
        cta="Open Retention walkthrough"
        flowTitle="Retention — SO to Retention record"
        steps={FLOW_RETENTION}
      />

      <Section eyebrow="Also see" title="Full written rules">
        <Card>
          <p className="leading-relaxed text-[var(--ink-soft)]">
            Videos and animations show the live path. Field rules, emails, and test tables stay on{" "}
            <strong className="text-[var(--ink)]">Refund Flow</strong> and{" "}
            <strong className="text-[var(--ink)]">Retention Flow</strong> tabs.
          </p>
        </Card>
      </Section>
    </div>
  );
}
