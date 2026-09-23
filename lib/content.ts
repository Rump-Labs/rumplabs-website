export const CALENDLY = "https://calendly.com/agnijdutta413/30min";
export const CONTACT_EMAIL = "contact@rumplabs.xyz";
export const GITHUB = "https://github.com/Rump-Labs";

export const nav = [
  { label: "What we do", href: "#services" },
  { label: "Engagements", href: "#engagements" },
  { label: "How it works", href: "#process" },
  { label: "Talks", href: "#talks" },
  { label: "FAQ", href: "#faq" },
  { label: "Gurukul", href: "/gurukul" },
];

export const hero = {
  badge: "Technical services · Senior-led",
  line1: "The technical",
  line2: "half of your",
  line3: "company.",
  sub: "Your build is stalled. We finish it.",
  cta: "Book a 30-minute call",
  ctaAlt: "See the engagements",
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

export const problem = {
  badge: "The gap",
  line1: "You know what",
  line2: "you want built.",
  lede: "What you don't have is anyone technical you can trust to tell you the truth about it.",
  points: [
    {
      k: "Three quotes, 4× apart",
      v: "None of them explains why. You have no way to tell which number is the honest one.",
    },
    {
      k: "The last agency vanished",
      v: "They shipped a demo, invoiced, and went quiet. Nobody can explain the codebase now.",
    },
    {
      k: "Every call routes to you",
      v: "You're making six-figure architecture decisions on instinct, because there's nobody else to make them.",
    },
    {
      k: "A CTO takes 9 months",
      v: "And $180k before equity. Your runway doesn't care how long hiring takes.",
    },
  ],
};

export const services = [
  {
    n: "01",
    title: "Technical consultancy",
    line: "We answer the technical questions you can't safely answer alone.",
    body: "We review what you have or plan to build, then write down the decision: the stack, the tradeoffs, the failure modes, and what it costs you in six months.",
    tags: ["Architecture review", "Build-vs-buy analysis", "ADR log", "Cost + scaling model"],
  },
  {
    n: "02",
    title: "POC & MVP development",
    line: "We build the smallest working version of your idea, and it actually runs.",
    body: "One core use case, built end to end and deployed where real users can touch it. A repository you own with a running deployment attached — not a prototype that works on our laptop.",
    tags: ["Next.js / React", "Postgres schema design", "Typed API layer", "CI on GitHub Actions"],
  },
  {
    n: "03",
    title: "Delivery management",
    line: "We run the build so you don't have to babysit engineers.",
    body: "A fuzzy goal becomes a scoped plan with dates. We own the standups and the tracker, and tell you early when something is slipping — over your team or ours.",
    tags: ["Scope doc with in/out list", "Weekly demo cadence", "Linear / GitHub Projects", "Written status brief"],
  },
  {
    n: "04",
    title: "Technical distribution",
    line: "Launch, infrastructure, and adoption — the work after the code is written.",
    body: "Deployed on infrastructure you own, with domains, environments, monitoring and analytics wired up. Docs and quickstarts are product, and we treat them that way.",
    tags: ["Vercel / Cloudflare / AWS", "CI/CD + staging", "API docs + quickstart", "PostHog, Sentry"],
  },
  {
    n: "05",
    title: "AI automation",
    line: "We put AI inside a workflow you already run, and measure whether it works.",
    body: "We map the manual process, build the agent or pipeline that performs it, and instrument accuracy, latency and cost per run. If the numbers don't justify it, we say so before you commit.",
    tags: ["Eval harness + labeled set", "Retrieval pipelines", "Tool-calling agents", "Cost-per-run instrumentation"],
  },
  {
    n: "06",
    title: "Web3 & zero-knowledge",
    line: "Contracts and proof systems, built to be reviewed by someone hostile.",
    body: "Contracts tested against adversarial conditions. ZK circuits where constraint count and proof cost are budgeted up front, not discovered late. Prepared for audit, not hoping to survive one.",
    tags: ["Solidity + Foundry", "Invariant + fuzz testing", "Circom / Noir circuits", "Gas + proving-cost profiling"],
  },
];

export const statement = {
  badge: "How we work",
  line1: "Scope first.",
  line2: "Then money",
  line3: "moves.",
  left: {
    label: "How the work is shaped",
    body: "Every engagement starts as a document: the problem, the boundary, what ships, what does not, and the date. You read it before anything is signed. Then it gets built in days, in your repo, against that document. Scope changes are a new document, not a surprise on the invoice.",
  },
  right: {
    label: "What we tell you early",
    body: "Some builds are bigger than the shape we work in. When yours is one of them, you get that in writing on the first call, with the honest range and the reason, even though it costs us the engagement. A build broken into pieces that hide its true size is a worse outcome than a clear no.",
  },
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
  includes: string[];
  deliverable: string;
  excluded: string;
  guarantee: string;
  next: string;
  featured?: boolean;
}

export const offers: Offer[] = [
  {
    id: "brief",
    n: "01",
    name: "The Technical Brief",
    promise: "A written technical read on your product, from someone who would have to build it.",
    who: "Founders with a spec, a half-built codebase, or an agency quote they don't trust.",
    price: "$490",
    timeline: "3 business days",
    includes: [
      "60-minute recorded working session on the product and constraints",
      "Review of what exists — repo, spec, designs, or a prior vendor proposal",
      "Written brief: recommended architecture, build sequence, the decisions that matter",
      "A real cost and time range for the full build, including the option where you don't build it",
      "Named risks, with a mitigation against each",
      "One follow-up round of written questions after you've read it",
    ],
    deliverable: "A 4–8 page technical brief, in your drive, yours to hand to any developer or investor.",
    excluded: "Code. Designs. Vendor introductions. More than one codebase or spec.",
    guarantee:
      "If the brief tells you nothing you didn't already know, reply within 7 days and we refund it in full. You keep the document.",
    next: "Most briefs end in one of three recommendations — a retainer, a single sprint, or a phased sequence. The brief names which, and the price.",
  },
  {
    id: "fractional-cto",
    n: "02",
    name: "Fractional CTO",
    promise: "A technical co-founder's judgment, on a meter you can see.",
    who: "Non-technical founders with a dev team or contractor, and nobody senior to check the work.",
    price: "$1,750",
    unit: "per month",
    timeline: "Monthly, rolling · 30 days notice",
    includes: [
      "8 hours per month, tracked and reported — no rollover, no surprise overage",
      "Two 60-minute scheduled calls (architecture, hiring, vendor, roadmap)",
      "Async access on a shared channel, replies within one business day",
      "Code and PR review on request, up to 4 hours of the monthly cap",
      "Hiring input: JDs, interview questions, sitting in on final-round technical interviews",
      "A monthly one-page note: what changed, what we're watching, what to decide next",
    ],
    deliverable:
      "A monthly written record of every technical decision and its reasoning — the thing that normally lives only in someone's head.",
    excluded: "Implementation work. Being on call. Managing your developers day-to-day.",
    guarantee: "Cancel any time before day 30 of your first month and we refund that month.",
    next: "When a retainer conversation turns into \"someone needs to build this,\" it becomes a sprint — quoted from context we already have, no re-discovery fee.",
  },
  {
    id: "automation",
    n: "03",
    name: "One Workflow, Automated",
    promise: "One manual process your team repeats, running without them.",
    who: "Teams doing the same 20–60 minutes of copy-paste, triage, or data-shuffling every day.",
    price: "$2,900",
    timeline: "10 business days",
    includes: [
      "Mapping session on one workflow, with the person who currently does it",
      "Build and deploy — LLM steps, API calls, and glue — on your infrastructure",
      "Integration with up to three systems you already use",
      "Failure handling: retries, a dead-letter path, and an alert to a channel you choose",
      "A short Loom walkthrough plus a written runbook for whoever owns it",
      "14 days of post-launch fixes on the delivered workflow",
    ],
    deliverable: "A running automation, its source in your repo, and a runbook that lets someone else maintain it.",
    excluded: "A second workflow. A UI or dashboard. Model fine-tuning. Systems with no API.",
    guarantee: "If the workflow doesn't run end-to-end on your data by day 10, you don't pay the second half.",
    next: "Workflow two moves faster than workflow one — the integration, alerting and deploy plumbing is already yours.",
  },
  {
    id: "contract",
    n: "04",
    name: "Contract Sprint",
    promise: "One smart contract, written or torn down, by people who have shipped both.",
    who: "Teams shipping a single on-chain mechanism, or holding a contract they need read hard before mainnet.",
    price: "$3,900",
    timeline: "12 business days",
    includes: [
      "Build track: one Solidity contract to spec, full unit and fork test suite, deploy script, testnet deployment",
      "Teardown track: line-by-line review of one contract up to 500 lines, findings graded by severity",
      "Gas notes on the hot paths, with before/after numbers where we change something",
      "A written report — assumptions, trust model, and what an attacker gets to do",
      "One walkthrough call on the report or the code",
      "One round of revisions within 14 days",
    ],
    deliverable:
      "The contract and its tests in your repo, or a severity-graded findings report you can send to your auditor.",
    excluded:
      "A formal audit or certificate — this is pre-audit work and we say so in writing. Mainnet deployment or key custody. Contracts over 500 lines.",
    guarantee:
      "On the teardown track, if we return zero findings above informational severity, you pay half and keep the report.",
    next: "Build-track output goes to a formal audit — we name firms and prep the package. Teardown output usually becomes a fix sprint.",
  },
  {
    id: "poc",
    n: "05",
    name: "POC Sprint",
    promise: "One demo-able feature. Real code. Three weeks.",
    who: "Founders who need to show one thing working — to a customer, an investor, or their board.",
    price: "$4,900",
    timeline: "3 weeks from scope-lock",
    featured: true,
    includes: [
      "Scope-lock session in week zero: one user, one path, one outcome, written and signed off",
      "Build of that single path — working frontend, real backend, real data, deployed to a URL",
      "Auth and a seeded demo account, so it survives being handed to someone else",
      "A repo with commit history, README, and setup a second developer can pick up",
      "A recorded demo run, so the POC is showable when you can't be there to click through it",
      "A closing note: what would make this production-grade, and what that costs",
    ],
    deliverable: "A live URL, the repository, and a demo recording.",
    excluded:
      "Production hardening, scale, or SLAs. Payments or compliance. A second user path. Mobile apps. App-store submission.",
    guarantee:
      "Scope is locked in writing before we start. If the locked scope isn't demo-able at the end of week three, we keep working at no charge until it is.",
    next: "POC to production is typically 3–6 sprints, not one. The closing note lays out that sequence with prices and gates.",
  },
];

export const scope = {
  badge: "Scope discipline",
  line1: "What fits",
  line2: "in the box.",
  blocks: [
    {
      k: "The edge is fixed",
      v: "Every offer has a written edge — one workflow, one contract, one user path — signed off by both of us before work starts. That is what makes the price real.",
    },
    {
      k: "When something doesn't fit",
      v: "It happens on most projects, usually around day four. We stop and name it, then either trade it against something inside the locked scope, or quote it as the next sprint. You choose which.",
    },
    {
      k: "Change requests",
      v: "Priced before they are built, never after. Under two hours of work, we usually just do it.",
    },
    {
      k: "What we will tell you",
      v: "If your project is bigger than the shape we work in, you hear that in the first conversation, with the honest range and the reason. We'd rather lose the engagement than sell a sprint into the wrong problem.",
    },
  ],
};

export const operatingModel = {
  badge: "The operating model",
  line1: "Why it moves",
  line2: "this fast.",
  paras: [
    "There is no account manager, no discovery phase that bills for itself, and no handoff between the people who scope the work and the people who write the code. The engineer on your first call is on your first commit. Requirements do not degrade in translation, so the time between \"we agree\" and \"it runs\" is measured in days.",
    "Most firms staff the work with whoever happens to be free. We staff it with the people you spoke to. They have shipped consultancy, POCs, delivery management, AI automation, and Web3 and ZK systems, and they carry the context rather than relaying it. You get judgment on the first call instead of questions taken back to someone senior.",
    "Fixed scope requires knowing the shape of the work before quoting it, which requires refusing work whose shape is unclear. So the brief comes first, always, and it is a deliverable in its own right. By the time a number is attached, the boundary is written down, the unknowns are named, and both sides are agreeing to the same thing.",
  ],
};

export const process = [
  {
    n: "01",
    title: "You talk for ten minutes",
    body: "What you're building, what's stuck, what you've already spent. No deck from us.",
  },
  {
    n: "02",
    title: "We scope it out loud",
    body: "Architecture, sequence, and the parts that will be harder than they look. You hear the reasoning, not just the conclusion.",
  },
  {
    n: "03",
    title: "You get a written scope",
    body: "What ships, what does not, when it lands, and the number attached to it. One document, before anything is signed.",
  },
  {
    n: "04",
    title: "You leave with the plan either way",
    body: "The scope is yours. Build it in-house, hand it to another firm, or come back to us. No follow-up sequence, no invoice for the conversation.",
  },
];

export const questions = {
  badge: "The call itself",
  line1: "Eight questions.",
  line2: "No deck.",
  lede: "This is the actual agenda. If nobody has asked you these, that is the problem we're describing.",
  items: [
    { q: "What is the specific decision or deadline forcing this conversation now?", why: "Tells us whether you need a build, an answer, or a second opinion. Three different prices." },
    { q: "What already exists — code, a design file, a spreadsheet someone runs manually?", why: "There is almost always something. It tells us what we can build on instead of starting from zero." },
    { q: "Who keeps this running, and what happens the week they're unavailable?", why: "Reveals the single points of failure that never appear in a requirements document." },
    { q: "Where does your data live, and who has the credentials?", why: "Determines integration work, security scope, and whether you actually own your infrastructure." },
    { q: "What does the system need to survive — how many users, how much data, how often?", why: "Real numbers change the architecture. Guessing high costs money; guessing low costs a rebuild." },
    { q: "What have you already tried that failed, and what was the failure?", why: "The failure mode is the most useful information in the call. It tells us what not to repeat." },
    { q: "If this works, what is the one thing that becomes true afterward?", why: "This becomes the acceptance criterion. If we can't state it in one sentence, the scope isn't ready." },
    { q: "Who has to approve this, and what would make them say no?", why: "Surfaces the security review or the board question before it kills the work at week three." },
  ],
};

export const derisk = {
  badge: "How we de-risk a build",
  line1: "The finish line",
  line2: "is checkable.",
  items: [
    { k: "Scope locked in writing", v: "The document lists what is out of scope as explicitly as what is in, so a mid-build request becomes a priced change rather than a silent delay." },
    { k: "Working software every week", v: "Progress is a running deployment, not a percentage, because a demo cannot hide integration problems that a status update can." },
    { k: "Deployed where you own it", v: "Your cloud account, your repository, your domain — so the engagement can end at any point without you losing access to what you paid for." },
    { k: "Tests are the acceptance criteria", v: "\"Done\" means a defined test suite passes or an eval hits an agreed threshold, which makes the finish line something you can verify without trusting us." },
    { k: "Decisions written as they're made", v: "The ADR log records what we chose, what we rejected, and why, so the next engineer can change our decisions instead of reverse-engineering them." },
  ],
};

export const deliverables = {
  badge: "What you actually receive",
  line1: "Every engagement",
  line2: "ends in an artifact.",
  rows: [
    ["Architecture review", "Written technical brief: stack, tradeoffs, risks, cost model"],
    ["POC / MVP build", "Git repository in your organization, plus a deployed URL"],
    ["AI automation build", "Eval report: accuracy, latency and cost-per-run against a labeled test set"],
    ["Smart contract work", "Contract repo with Foundry test suite, coverage report, pre-audit findings"],
    ["Launch / infra setup", "Runbook: deploy steps, env vars, rollback procedure, on-call notes"],
    ["Delivery management", "Scope document, weekly written status briefs, and a decision log"],
    ["Any build engagement", "ADR log — every architectural decision, why it was made, what was rejected"],
    ["Handover", "Loom walkthrough of the codebase and deployment, for whoever inherits it"],
  ],
};

export const talks = {
  badge: "Talks",
  line1: "We show up",
  line2: "and explain the work.",
  lede: "No slide deck of logos — just the team on stage, walking through the cryptography and the tradeoffs, in public.",
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

export const trust = {
  badge: "Why trust us",
  line1: "You don't have to",
  line2: "take our word.",
  items: [
    {
      k: "Public work",
      v: "We don't have a slide of client logos. We have repositories. Read the code before you pay for any of it.",
      href: GITHUB,
      linkLabel: "Read the code",
    },
    {
      k: "You meet the builder",
      v: "There is no account manager between you and the engineers. The people on your intro call are the ones who commit the code.",
    },
    {
      k: "We teach the hard part",
      v: "Rump Gurukul is our zero-knowledge proofs course. Anyone can claim ZK depth on a landing page. Fewer can teach it for weeks.",
      href: "/gurukul",
      linkLabel: "See the course",
    },
    {
      k: "Nothing is locked to us",
      v: "Your GitHub organisation, your cloud account, your keys, your domain. Our leverage is that you want us back, not that leaving is expensive.",
    },
  ],
};

export const limits = {
  badge: "Honest limits",
  line1: "What we",
  line2: "don't do.",
  lede: "Stated plainly, because finding out on week three is worse for both of us.",
  items: [
    { k: "Compliance-certified healthcare or finance", v: "HIPAA and SOC 2 need audit trails and organizational controls we can't honestly provide. Hire a firm with the certification on paper." },
    { k: "24/7 on-call SRE rotations", v: "We work global hours and will build you monitoring and a runbook, but we are not a pager rotation. Staff it internally or use a managed provider." },
    { k: "Mobile app store operations", v: "Release management and review appeals are an ongoing function, not a project. We'll build the backend; someone else should own the store." },
    { k: "Staff augmentation", v: "We take ownership of scoped work, not seats on your org chart. If you need engineers embedded in your team for a year, you need a recruiting partner — and we'll say so on the first call." },
    { k: "Quarter-long enterprise programs", v: "Everything here is scoped in days or weeks, against a boundary written down in advance. If the work genuinely takes three months, either our estimate was wrong or the engagement isn't ours — and you'll hear that in writing, not discover it three invoices in." },
  ],
};

export const faqs = [
  {
    q: "Can the scope grow once you have started?",
    a: "Not silently. The scope document names what ships and what does not, and anything outside that boundary is a new document with its own number and its own date, agreed before work on it begins. You will never find added work on an invoice you did not approve first. Most engagements finish inside their original boundary because the boundary is written before money moves, not after the first surprise. If we misjudged the shape, that is our estimate to own, and we say so.",
  },
  {
    q: "Why should I trust a firm I haven't heard of?",
    a: "Don't take it on faith — take it on what you hold. The work is public, so read the repositories before you commit to anything. You get a written scope, with the boundary and the date, before any money moves. From day one the repository, the cloud account and the keys are yours, so leaving is easy and nothing is held hostage. And the guarantees cost us real money if we are wrong, which is the only kind of promise worth reading.",
  },
  {
    q: "Who owns the code?",
    a: "You do, from the first commit. Everything is built in your GitHub organisation, on your cloud account, with your keys. No wrappers, no licensed black box, no hosting you rent from us. If you fire us on day three, you keep every commit and any competent engineer can pick it up on day four.",
  },
  {
    q: "You're based in India. How do I know the quality is there?",
    a: "Judge the code, not the timezone. Our repositories and technical writing are public — read them before you book. Then judge the terms: fixed price, written scope, weekly working demos, and a first month you can cancel. We work global hours with a live call at a time that suits you, and every deliverable lands in your repo where you can inspect it.",
  },
  {
    q: "We already have developers. What do you add?",
    a: "Then you probably don't want our build team — you want the Technical Brief or the Fractional CTO retainer. We add the layer above your devs: architecture decisions, code review, sprint discipline, and one person accountable for the ship date. Most stalled teams don't lack engineers; they lack someone arbitrating scope.",
  },
  {
    q: "What if you disappear halfway through?",
    a: "The structure is designed so that isn't fatal. Work lands continuously in your repository, deployments run in your cloud account, and every architectural decision is written down as it's made. Engagements are days or weeks, not quarters, so the maximum exposure is small by construction. And on retainer, thirty days' notice ends it with no penalty either way.",
  },
  {
    q: "Is three weeks realistic for a POC, or is that a sales number?",
    a: "Realistic for one locked user path — one user, one journey, real data, deployed. It is not realistic for an unbounded product whose scope moves weekly. That's why week zero locks the build, and anything outside the lock becomes the next sprint instead of a slipped date. If your scope can't ship in three weeks, we'll tell you in the Brief — not after your money is in.",
  },
  {
    q: "What happens if I just want the brief and nothing else?",
    a: "That's a completely normal outcome and it's priced to be one. The brief is written to be useful to whoever builds it, including a team that isn't us. Take it to another firm, hand it to your own developer, or use it to decide not to build at all. There's no follow-up sequence.",
  },
];

export const ctaBand = {
  mid: {
    label: "Ready when you are",
    line: "Bring the problem, not the spec.",
    body: "Most engagements start as one thing and get scoped into another on the call. Describe what you're trying to ship and we'll tell you which shape fits — or that none of them do.",
    cta: "Tell us what is broken",
    sub: "Most calls end in one of two ways: a scope, or an honest referral elsewhere.",
  },
  late: {
    label: "Still deciding",
    line: "Bring the half-finished repo.",
    body: "We'll tell you what it would take to finish it, what it would cost, and whether we're the right people to do it. You keep the scope either way.",
    cta: "Book a 30-minute call",
    sub: "No deck, no sales rep. An engineer takes the call.",
  },
};

export const finalCta = {
  line1: "You've read enough",
  line2: "to know if it fits.",
  body: "The next step is thirty minutes, and it costs nothing. Bring the idea, the stalled repo, or the quote that scared you. We'll tell you what it takes to build, what it costs, and whether we're the right people to do it.",
  kicker: "If we're not, we'll say so on the call.",
  cta: "Book the call",
  ctaSub: "If we're the wrong fit, we'll say so on the call and not send an invoice for the opinion.",
};
