import type { ExperienceScript, ExploreBeat, ChoiceBeat, Vec3 } from "../types";

const campus = { position: [24, 18, 28] as Vec3, target: [0, 2, 0] as Vec3 };
const control = { position: [13, 11, 19] as Vec3, target: [0, 2, -2] as Vec3 };
const data = { position: [14, 12, 18] as Vec3, target: [0, 2, 0] as Vec3 };
/** All names, dates, sample sizes and outcomes below are invented teaching material. */
export const aiRevolutionScript: ExperienceScript = {
  chapterId: "ai-revolution",
  title: "The Release Room",
  era: "2032 · A fictional near-future exercise",
  startBeat: "arrival",
  initialStats: { chaos: 20, freedom: 50, diplomacy: 50, strength: 50 },
  defaultEnding: "repair",
  beats: {
    arrival: {
      id: "arrival",
      kind: "cinematic",
      environment: "ai-campus",
      next: "evidence",
      shots: [
        {
          path: [
            [38, 23, 36],
            [23, 14, 24],
            [15, 9, 19],
          ],
          lookPath: [[0, 2, 0]],
          duration: 16,
          fov: 48,
        },
      ],
      narration: [
        {
          speaker: "FICTIONAL SCENARIO",
          text: "2032. At the fictional Meridian research cooperative, a public-service assistant is approaching release. You chair the readiness review. This is not a forecast or a claim about any real AI product.",
        },
        {
          speaker: "Mina · evaluation lead",
          text: "It can draft useful answers. It can also give confident wrong ones. Inspect the evidence, fund two tests, and decide who carries the risk. There is no countdown and no perfect score.",
        },
      ],
    },
    evidence: {
      id: "evidence",
      kind: "explore",
      environment: "ai-campus",
      camera: campus,
      prompt:
        "Visit all three review stations. Read the finding, not just the headline.",
      hotspots: [
        {
          id: "eval",
          position: [-8, 2, -3],
          label: "Evaluation lab",
          title: "Averages conceal gaps",
          icon: "01",
          description:
            "Fictional test: 920 of 1,000 routine answers were judged correct. Only 24 of 40 regional-language cases were correct. The small subgroup sample is uncertain; the overall score cannot establish readiness for every community.",
        },
        {
          id: "workers",
          position: [8, 2, -3],
          label: "Worker council",
          title: "Oversight needs paid time",
          icon: "02",
          description:
            "The worker council reports that reviewers can check 30 answers per hour, while the planned queue sends 90. A nominal human reviewer is not meaningful oversight without staffing, training and authority to stop the system.",
        },
        {
          id: "public",
          position: [0, 2, 6],
          label: "Public forum",
          title: "Benefits and an appeal route",
          icon: "03",
          description:
            "Residents want shorter waits, accessible language support and a human alternative. One resident asks: “If the assistant misdirects my application, who will correct it?” A pilot can teach you something, but its participants still bear real burdens inside this story.",
        },
      ],
    } satisfies ExploreBeat,
    evaluation: {
      id: "evaluation",
      kind: "choice",
      environment: "ai-control",
      camera: control,
      title: "Two test slots. Three unanswered questions.",
      prompt:
        "Fund a pair. The omitted test remains an explicit uncertainty, not a passing result. No choice proves the system safe.",
      options: [
        {
          id: "people",
          icon: "A",
          label: "Language + recovery",
          description:
            "Test underserved cases and rehearse rollback. Permission-boundary testing remains incomplete.",
          flags: ["tested-language", "tested-recovery"],
          next: "release",
        },
        {
          id: "systems",
          icon: "B",
          label: "Permissions + recovery",
          description:
            "Test tool access and rehearse rollback. Regional-language evidence remains thin.",
          flags: ["tested-permissions", "tested-recovery"],
          next: "release",
        },
        {
          id: "coverage",
          icon: "C",
          label: "Language + permissions",
          description:
            "Broaden evidence about users and tool access. Recovery remains an untested procedure.",
          flags: ["tested-language", "tested-permissions"],
          next: "release",
        },
      ],
    } satisfies ChoiceBeat,
    release: {
      id: "release",
      kind: "choice",
      environment: "ai-control",
      camera: control,
      title: "Sign the release boundary",
      prompt:
        "Your selected tests reveal issues, not a green light. What may the system do while those issues are addressed?",
      options: [
        {
          id: "pilot",
          icon: "01",
          label: "Staffed, read-only pilot",
          description:
            "Limit to 100 volunteers, retain the human service and cap review volume at staff capacity. Slower access; a smaller exposure boundary.",
          flags: ["pilot"],
          next: "pilot-signal",
        },
        {
          id: "hold",
          icon: "02",
          label: "Hold public release",
          description:
            "Keep testing offline and fund manual support. No public AI exposure, but queues and operating costs remain.",
          flags: ["hold"],
          next: "drill-signal",
        },
        {
          id: "wide",
          icon: "03",
          label: "Broad release with tool access",
          description:
            "Offer faster service to 10,000 fictional residents despite known gaps. Reviewers will be overloaded; the release is not evidence-backed.",
          flags: ["wide"],
          next: "wide-signal",
        },
      ],
    },
    "pilot-signal": {
      id: "pilot-signal",
      kind: "cinematic",
      environment: "ai-datacenter",
      next: "incident",
      shots: [
        {
          path: [
            [17, 10, 20],
            [10, 7, 15],
          ],
          lookPath: [[0, 2, 0]],
          duration: 10,
        },
      ],
      narration: [
        {
          speaker: "Jon · incident lead",
          text: "Pilot feedback: several volunteers received a fabricated office address. Read-only access prevented record changes, not misinformation. The staffed queue catches the report. The release decision must now become an operating decision.",
        },
      ],
    },
    "drill-signal": {
      id: "drill-signal",
      kind: "cinematic",
      environment: "ai-datacenter",
      next: "incident",
      shots: [
        {
          path: [
            [17, 10, 20],
            [10, 7, 15],
          ],
          lookPath: [[0, 2, 0]],
          duration: 10,
        },
      ],
      narration: [
        {
          speaker: "Jon · incident lead",
          text: "Offline drill: the assistant fabricates an office address and attempts a record update. No resident is exposed. This rehearsal tests whether your team can isolate a faulty release without losing the evidence needed to learn.",
        },
      ],
    },
    "wide-signal": {
      id: "wide-signal",
      kind: "cinematic",
      environment: "ai-datacenter",
      next: "incident",
      shots: [
        {
          path: [
            [17, 10, 20],
            [10, 7, 15],
          ],
          lookPath: [[0, 2, 0]],
          duration: 10,
        },
      ],
      narration: [
        {
          speaker: "Jon · incident lead",
          text: "Public incident: fabricated addresses are spreading through a queue the review team cannot cover. Tool-enabled requests may have changed records. The extent is unknown. A good aggregate test score is not an incident response plan.",
        },
      ],
    },
    incident: {
      id: "incident",
      kind: "explore",
      environment: "ai-datacenter",
      camera: data,
      prompt:
        "Inspect the incident console before choosing a response. Preserve evidence; distinguish verified facts from assumptions.",
      hotspots: [
        {
          id: "trace",
          position: [-6, 2, 1],
          icon: "01",
          label: "Event trace",
          title: "What do you actually know?",
          description:
            "The trace confirms invented addresses. It does not establish the full scope of affected requests. Preserve access-controlled logs, identify the release version and verify downstream changes. Do not publish personal records.",
        },
        {
          id: "recovery",
          position: [0, 2, -5],
          icon: "02",
          label: "Recovery console",
          title: "Rollback is a procedure, not a button",
          description:
            "First freeze new work and retain evidence. Then restore the last reviewed version or manual service. Finally verify routing and affected records. A previous rehearsal reduces recovery uncertainty but does not remove the need to check.",
        },
        {
          id: "support",
          position: [6, 2, 1],
          icon: "03",
          label: "Support desk",
          title: "People need correction, not reassurance",
          description:
            "Give affected people a staffed contact and a correction route. Tell them what is known, unknown and being checked. Keep worker time funded. A silent patch leaves them carrying the consequences.",
        },
      ],
    },
    response: {
      id: "response",
      kind: "choice",
      environment: "ai-datacenter",
      camera: data,
      title: "Choose the incident boundary",
      prompt:
        "The next controls enact your response. Work already done outside the system cannot be undone by a model rollback.",
      options: [
        {
          id: "rollback",
          icon: "↶",
          label: "Freeze and restore",
          description:
            "Stop new requests, preserve logs, restore manual service and verify the route. Accept downtime while correcting affected work.",
          flags: ["rollback"],
          next: "recovery-check",
        },
        {
          id: "isolate",
          icon: "□",
          label: "Isolate the failing route",
          description:
            "Disable the affected feature and tool access; keep other read-only service under staffed review. Unknown failure scope still matters.",
          flags: ["isolate"],
          next: "accountability",
        },
        {
          id: "continue",
          icon: "→",
          label: "Patch while continuing",
          description:
            "Keep throughput while changing the prompt. The failure scope is still unknown, and the original exposure remains.",
          flags: ["continue"],
          next: "accountability",
        },
      ],
    },
    "recovery-check": {
      id: "recovery-check",
      kind: "explore",
      environment: "ai-datacenter",
      camera: data,
      prompt:
        "Execute the recovery checklist in order. Each completed control is recorded once.",
      hotspots: [
        {
          id: "freeze",
          position: [-6, 2, 1],
          icon: "1",
          label: "Freeze + preserve",
          title: "1 · Freeze + preserve",
          description:
            "New model requests are paused. Restricted logs and the release identifier are retained for investigation. Existing affected work still needs review.",
        },
        {
          id: "restore",
          position: [0, 2, -5],
          icon: "2",
          label: "Restore human service",
          title: "2 · Restore human service",
          description:
            "The model route is disconnected. Requests return to the staffed manual queue. This protects new requests, but increases waiting time.",
        },
        {
          id: "verify",
          position: [6, 2, 1],
          icon: "3",
          label: "Verify + reconcile",
          title: "3 · Verify + reconcile",
          description:
            "A test request reaches the human queue. The team begins reconciling earlier outputs and any record changes. Recovery is verified; remediation continues.",
        },
      ],
    },
    accountability: {
      id: "accountability",
      kind: "choice",
      environment: "ai-control",
      camera: control,
      title: "Who can challenge the next release?",
      prompt:
        "Choose the review structure and public record. Your earlier decisions remain in the outcome.",
      options: [
        {
          id: "public",
          icon: "◎",
          label: "Publish limits; fund independent review",
          description:
            "Name an accountable owner, publish non-personal findings, staff appeals and give workers and residents a seat in the next review. This costs time and money.",
          flags: ["accountable"],
          next: "end",
        },
        {
          id: "internal",
          icon: "▣",
          label: "Keep review inside the launch team",
          description:
            "Reduce review overhead and make a short assurance statement. Affected people cannot inspect the findings or challenge the next release.",
          flags: ["closed"],
          next: "end",
        },
      ],
    },
    end: { id: "end", kind: "ending" },
  },
  endings: [
    {
      id: "exposure",
      title: "The unfinished incident",
      subtitle: "Continuing service is not the same as resolving harm.",
      icon: "△",
      color: "#fb923c",
      priority: 50,
      requiresFlags: ["continue"],
      forbidsFlags: ["hold"],
      epilogue: [
        {
          text: "In this fictional outcome, new requests remain exposed while the team investigates. Public review can improve the next decision, but cannot retroactively protect today’s users. Revisit the response boundary.",
        },
      ],
    },
    {
      id: "closed",
      title: "An unaccountable release gate",
      subtitle: "A technical fix without a public correction route.",
      icon: "▣",
      color: "#c4b5fd",
      priority: 40,
      requiresFlags: ["closed"],
      epilogue: [
        {
          text: "In this fictional outcome, the launch team retains control of the evidence. Even a cautious deployment or successful rollback leaves residents and workers without a meaningful voice in the next review.",
        },
      ],
    },
    {
      id: "hold",
      title: "A deliberate pause",
      subtitle: "No public deployment, but unmet needs remain.",
      icon: "◷",
      color: "#93c5fd",
      priority: 30,
      requiresFlags: ["hold", "accountable"],
      epilogue: [
        {
          text: "In this fictional outcome, testing stays offline, human support continues and the review becomes contestable. Delaying is not cost-free. Publish milestones for the missing evidence instead of promising an arbitrary launch date.",
        },
      ],
    },
    {
      id: "staged",
      title: "A bounded, answerable pilot",
      subtitle: "Useful service is earned through continued review.",
      icon: "◎",
      color: "#5eead4",
      priority: 20,
      requiresFlags: ["pilot", "accountable", "tested-recovery"],
      forbidsFlags: ["continue"],
      epilogue: [
        {
          text: "In this fictional outcome, a small release boundary and rehearsed recovery limit exposure. Residents receive corrections and workers keep stop authority. This is a process for learning and repair, not proof that alignment is solved.",
        },
      ],
    },
    {
      id: "repair",
      title: "The long work of repair",
      subtitle: "The incident is bounded; trust is not restored by a switch.",
      icon: "↶",
      color: "#fcd34d",
      priority: 0,
      epilogue: [
        {
          text: "In this fictional outcome, the team contains the route and opens its decisions to scrutiny. Broad exposure or an unrehearsed recovery makes correction harder. Keep manual support and investigate before another expansion.",
        },
      ],
    },
  ],
};

export const aiReviewNext: Record<string, string> = {
  evidence: "evaluation",
  incident: "response",
  "recovery-check": "accountability",
};
