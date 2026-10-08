export const CALENDLY = "https://calendly.com/agnijdutta413/30min";
export const CONTACT_EMAIL = "contact@rumplabs.xyz";
export const GITHUB = "https://github.com/Rump-Labs";

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#process" },
  { label: "Talks", href: "/#talks" },
  { label: "FAQ", href: "/#faq" },
  { label: "Research", href: "/research" },
  { label: "Gurukul", href: "/gurukul" },
];

export const hero = {
  badge: "Technical services · Senior-led",
  line1: "The technical",
  line2: "half of your",
  line3: "company.",
  sub: "Your build is stalled. We finish it: senior engineers, a fixed price agreed up front, and code that lives in your repo.",
  cta: "Book a 30-minute call",
  ctaAlt: "See the services",
  stats: [
    { k: "3 days", v: "Written technical brief, in your hands" },
    { k: "In writing", v: "Scope, boundary and date before work starts" },
    { k: "Day 1", v: "Your repo, your cloud, your keys" },
  ],
};

export const ticker = [
  "SCOPE IN WRITING",
  "DELIVERED IN DAYS",
  "YOUR REPO FROM DAY ONE",
  "A NAMED OWNER",
  "NO HANDOFFS",
  "YOUR CLOUD, YOUR KEYS",
  "FIXED SCOPE",
  "GLOBAL HOURS",
  "SENIOR ONLY",
  "WE SAY NO IN WRITING",
  "THIRTY-MINUTE CALL",
];

export const trust = {
  badge: "Why trust us",
  line1: "Scope first.",
  line2: "Then money",
  line3: "moves.",
  items: [
    {
      k: "Scope in writing",
      v: "What ships, what doesn't, and the date. You read it before anything is signed.",
    },
    {
      k: "You own everything",
      v: "Your repo, your cloud, your keys from day one. Leave any time and keep every commit.",
    },
    {
      k: "You meet the builder",
      v: "No account manager. The engineer on your first call writes your first commit.",
    },
    {
      k: "Public work",
      v: "Read our code, our published research and our zero-knowledge course before you pay for anything.",
      links: [
        { label: "GitHub", href: GITHUB },
        { label: "Research", href: "/research" },
        { label: "Gurukul", href: "/gurukul" },
      ],
    },
  ],
  note: "If your build is bigger than what we do, you hear that on the first call, with the honest range.",
};

export const servicesSection = {
  badge: "Services",
  line1: "Fixed scope, fixed price.",
  line2: "Pick the one you need.",
  lede: "Each one has a written scope, a date and a price. Need something working? Start with the POC Sprint. Unsure? Start with the Brief.",
  footnote: "Prices are fixed. Scope is agreed in writing before work starts, and anything new gets its own price first.",
  cta: "Book a 30-min scoping call",
};

export interface Offer {
  id: string;
  n: string;
  name: string;
  promise: string;
  who: string;
  price: string;
  unit?: string;
  timeline: string;
  tags: string[];
  includes: string[];
  deliverable: string;
  excluded: string;
  guarantee: string;
  next: string;
  featured?: boolean;
}

export const offers: Offer[] = [
  {
    id: "poc",
    n: "01",
    name: "POC Sprint",
    promise: "One feature, real code, live on a URL in three weeks.",
    who: "You need to show one thing working to a customer, an investor or your board, and slides won't do it.",
    price: "$4,900",
    timeline: "3 weeks from scope-lock",
    featured: true,
    tags: ["Next.js / React", "Postgres", "Typed API", "Vercel / AWS"],
    includes: [
      "Week zero: one user, one path, one outcome, locked in writing",
      "That path built end to end: frontend, real backend, real data",
      "Deployed to a live URL, with auth and a seeded demo account",
      "A repo with history and a README a second developer can pick up",
      "A recorded demo run, plus a costed path-to-production note",
    ],
    deliverable:
      "A live URL anyone can log into, the repo in your GitHub, and a demo recording for when you can't be in the room.",
    excluded:
      "Production hardening, scale or SLAs. Payments or compliance. Mobile apps or app-store submission. A second user path.",
    guarantee:
      "Scope is locked in writing before we start. If it isn't demo-able at the end of week three, we keep working at no charge until it is.",
    next: "Production is usually 3–6 sprints, not one. Your closing note lays out that sequence, with a price and a gate on each.",
  },
  {
    id: "brief",
    n: "02",
    name: "The Technical Brief",
    promise: "Know what to build and what it costs, before you spend.",
    who: "You have a spec, a half-built codebase, or an agency quote you don't trust, and want a straight answer.",
    price: "$490",
    timeline: "3 business days",
    tags: ["Architecture review", "Build vs buy", "Cost model", "Risk register"],
    includes: [
      "60-minute recorded working session on your product and constraints",
      "Review of what exists: repo, spec, designs or a vendor's proposal",
      "Recommended architecture and build sequence, with named risks and mitigations",
      "A real cost and time range, including the option of not building",
      "One round of written follow-up questions after you've read it",
    ],
    deliverable: "A 4–8 page brief in your drive. Hand it to any developer or investor.",
    excluded: "Code. Designs. Vendor introductions. More than one codebase or spec.",
    guarantee:
      "If it tells you nothing you didn't already know, reply within 7 days for a full refund. You keep the document.",
    next: "Most briefs recommend one of three next steps: a retainer, one sprint, or a phased plan. The brief names which, and the price.",
  },
  {
    id: "automation",
    n: "03",
    name: "One Workflow, Automated",
    promise: "One task your team repeats daily, running without them.",
    who: "Your team spends 20–60 minutes a day on the same copy-paste, triage or data-shuffling.",
    price: "$2,900",
    timeline: "10 business days",
    tags: ["Tool-calling agents", "Retrieval pipelines", "API integrations", "Retries + alerting"],
    includes: [
      "Mapping session on one workflow, with the person who does it now",
      "Built and deployed on your infrastructure: LLM steps, API calls, glue code",
      "Connected to up to three systems you already use",
      "Retries, a dead-letter path, and alerts to a channel you choose",
      "Loom walkthrough, written runbook, and 14 days of post-launch fixes",
    ],
    deliverable: "A running automation, its source in your repo, and a runbook someone else can maintain it from.",
    excluded: "A second workflow. A UI or dashboard. Model fine-tuning. Systems with no API.",
    guarantee: "If it doesn't run end to end on your data by day 10, you don't pay the second half.",
    next: "Workflow two moves faster. The integrations, alerting and deploy plumbing are already yours.",
  },
  {
    id: "contract",
    n: "04",
    name: "Contract Sprint",
    promise: "One smart contract, written or torn down before mainnet.",
    who: "You're shipping one on-chain mechanism, or holding a contract that needs a hard read before mainnet.",
    price: "$3,900",
    timeline: "12 business days",
    tags: ["Solidity", "Foundry", "Fuzz + invariant tests", "Gas profiling", "ZK circuits (Circom / Noir)"],
    includes: [
      "Build track: one Solidity contract to spec, full tests, testnet deploy",
      "Teardown track: line-by-line review up to 500 lines, graded by severity",
      "Gas notes on hot paths, with before/after numbers where we change things",
      "Written report: assumptions, trust model, and what an attacker can do",
      "One walkthrough call, and one revision round within 14 days",
    ],
    deliverable: "The contract and its tests in your repo, or a severity-graded findings report for your auditor.",
    excluded:
      "A formal audit or certificate. This is pre-audit work, and we say so in writing. Mainnet deploys, key custody, contracts over 500 lines.",
    guarantee: "Teardown track: if we find nothing above informational severity, you pay half and keep the report.",
    next: "Build output goes to a formal audit; we name firms and prep the package. Teardown output usually becomes a fix sprint.",
  },
  {
    id: "fractional-cto",
    n: "05",
    name: "Fractional CTO",
    promise: "A senior engineer checking the work, eight hours a month.",
    who: "You have developers or a contractor, and nobody senior on your side checking what they build.",
    price: "$1,750",
    unit: "per month",
    timeline: "Monthly, rolling · 30 days notice",
    tags: ["Architecture calls", "PR review", "Hiring loops", "Decision log"],
    includes: [
      "8 hours a month, tracked and reported. No rollover, no surprise overage.",
      "Two 60-minute calls a month: architecture, hiring, vendors, roadmap",
      "Shared async channel, with replies within one business day",
      "Code and PR review on request, up to 4 of your 8 hours",
      "Hiring help: JDs, interview questions, final-round technical interviews",
    ],
    deliverable:
      "A one-page monthly note: every technical decision, the reasoning behind it, and what to decide next.",
    excluded: "Writing the code. Being on call. Managing your developers day to day.",
    guarantee: "Cancel before day 30 of your first month and we refund that month.",
    next: "When it turns into \"someone needs to build this,\" it becomes a sprint, quoted from context we already have. No re-discovery fee.",
  },
];

export const process = [
  {
    n: "01",
    title: "You talk, we listen",
    body: "What you're building, what's stuck, what you've already spent. No deck from us.",
  },
  {
    n: "02",
    title: "We scope it out loud",
    body: "Architecture, sequence, and the parts that will be harder than they look.",
  },
  {
    n: "03",
    title: "You get it in writing",
    body: "What ships, what doesn't, the date, and the price. Before anything is signed.",
  },
  {
    n: "04",
    title: "The plan is yours",
    body: "Build it with us, in-house, or with someone else. No follow-up sequence.",
  },
];

export const talks = {
  badge: "Talks",
  line1: "We show up",
  line2: "and explain the work.",
  lede: "The team on stage, walking through the cryptography and the tradeoffs in public.",
  items: [
    {
      id: "kUv1nR3HQ8w",
      title: "Anon-Aadhaar: a privacy-preserving identity protocol using Halo2 and Noir",
      speaker: "Hridam Basu",
      venue: "Devcon SEA",
      href: "https://www.youtube.com/watch?v=kUv1nR3HQ8w",
    },
  ],
};

export const faqs = [
  {
    q: "Who owns the code?",
    a: "You do, from the first commit. Everything lives in your GitHub organisation and your cloud account, with your keys. If you stop working with us, any competent engineer can pick it up the next day.",
  },
  {
    q: "Can the scope grow once you've started?",
    a: "Not silently. Anything outside the written scope becomes a new document with its own price and date, agreed before we build it. You never find unapproved work on an invoice.",
  },
  {
    q: "Why should I trust a firm I haven't heard of?",
    a: "Judge what you can check. Our code is public, you get a written scope before money moves, and everything is built in accounts you own. We're based in India and work global hours, with calls at a time that suits you.",
  },
  {
    q: "We already have developers. What do you add?",
    a: "The layer above them: architecture decisions, code review, sprint discipline, and one person accountable for the ship date. That's usually the Technical Brief or the Fractional CTO retainer, not a build.",
  },
  {
    q: "What if you disappear halfway through?",
    a: "Work lands in your repo continuously, deploys run in your cloud, and decisions are written down as they're made. Engagements last days or weeks, so your exposure is small by design.",
  },
  {
    q: "Is three weeks realistic for a POC?",
    a: "Yes, for one locked user path: one user, one journey, real data, deployed. If your scope can't ship in three weeks, we'll say so in the Brief, before you pay for a sprint.",
  },
  {
    q: "What don't you take on?",
    a: "Compliance-certified healthcare or finance (HIPAA, SOC 2), 24/7 on-call rotations, app store operations, staff augmentation, and quarter-long enterprise programs. If that's what you need, we'll tell you on the first call.",
  },
  {
    q: "Can I just buy the brief?",
    a: "Yes, and plenty of people do. The brief is written so any developer can build from it, including a team that isn't us.",
  },
];

export const finalCta = {
  line1: "Bring the stalled repo.",
  line2: "Leave with a plan.",
  body: "Thirty minutes with an engineer, free. You'll hear what it takes to build, what it costs, and whether we're the right people to do it.",
  cta: "Book a 30-minute call",
  ctaSub: "If we're the wrong fit, we'll say so on the call.",
};
