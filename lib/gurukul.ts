export const GURUKUL_WHATSAPP = "https://wa.me/919007915334";
export const GURUKUL_EMAIL = "contact@rumplabs.xyz";

export const gurukulNav = [
  { label: "Syllabus", href: "#syllabus" },
  { label: "Instructor", href: "#instructor" },
  { label: "What you get", href: "#included" },
  { label: "Enrol", href: "#enrol" },
];

export const gHero = {
  badge: "Cohort starts January 2026",
  line1: "Zero-knowledge",
  line2: "proofs,",
  line3: "taught properly.",
  sub: "A ten-week certification course taking you from blockchain fundamentals to writing your own ZK circuits. No prerequisites. No prior coding knowledge required.",
  cta: "Enrol in the cohort",
  ctaAlt: "Ask a question",
  ctaSub: "Live sessions, recorded. Group projects, presented. Certificate on completion.",
  stats: [
    { k: "10 weeks", v: "Two live lectures every week" },
    { k: "Sat & Sun", v: "11:00–13:00 IST, two hours each" },
    { k: "Recorded", v: "Every session, yours to rewatch" },
  ],
};

export const gTicker = [
  "NO PREREQUISITES",
  "LIVE + RECORDED",
  "GROUP PROJECTS",
  "CIRCOM · HALO2 · NOIR",
  "GROTH16 · PLONK · STARKS",
  "ZK-ROLLUPS & ZK-EVMS",
  "COMPLETION CERTIFICATE",
  "PROJECT PRESENTATIONS",
  "INTERNSHIP TRACK",
];

export const gStatement = {
  badge: "Who this is for",
  line1: "You don't need",
  line2: "a cryptography",
  line3: "background.",
  left: {
    label: "Where we start",
    body: "Week one assumes nothing. We build the mathematics you need — elliptic curves, commitments, the primitives — as we go, in the order you need them. Engineers, students and career-switchers have all started here without a cryptography background.",
  },
  right: {
    label: "Where you finish",
    body: "By week ten you will have written your own circuits in Circom or Noir, understood why one proof system is chosen over another, and presented a working ZK application you built with your group. Not a certificate of attendance — something you can show.",
  },
};

export const gModules = [
  {
    n: "01",
    title: "Build strong foundations",
    body: "Blockchain basics, cryptographic primitives, and the mathematics behind elliptic curves and commitments.",
  },
  {
    n: "02",
    title: "Core ZKP protocols",
    body: "Interactive proofs like Schnorr and Bulletproofs, and how privacy is achieved without revealing the underlying data.",
  },
  {
    n: "03",
    title: "Modern proof systems",
    body: "Groth16, PLONK and STARKs, plus recursive frameworks including Halo2, Nova and SuperNova.",
  },
  {
    n: "04",
    title: "Cutting-edge techniques",
    body: "Lookup arguments, sum-check protocols, and polynomial commitments such as KZG.",
  },
  {
    n: "05",
    title: "ZK in production",
    body: "ZK-Rollups, ZK-EVMs, ZK-VMs and ZK-Bridges, with case studies from zkSync, StarkNet, Polygon and Succinct Labs.",
  },
  {
    n: "06",
    title: "Tools and DSLs",
    body: "Write your own circuits using Circom, Halo2, Noir, Leo and ZoKrates.",
  },
  {
    n: "07",
    title: "Privacy-preserving contracts",
    body: "Build confidential applications on Ethereum using Aztec and comparable ecosystems.",
  },
  {
    n: "08",
    title: "Ship and present",
    body: "Hands-on project work, concluding with a presentation of a full ZK-based blockchain application.",
  },
];

export const gIncluded = [
  { k: "Ten-week structure", v: "Two live lectures a week, sequenced so each builds on the last." },
  { k: "Two hours per lecture", v: "Saturdays and Sundays, 11:00–13:00 IST." },
  { k: "Session recordings", v: "Every lecture recorded. Miss one and nothing is lost." },
  { k: "Group projects", v: "Collaborative build work, not solo exercises." },
  { k: "Project presentations", v: "You present what you built at the end of the cohort." },
  { k: "Completion certificate", v: "Issued by Rump Labs on finishing the cohort." },
  { k: "Job referrals", v: "Referrals into crypto and blockchain roles where we can make them." },
  { k: "Internship track", v: "Internship opportunities at Rump Labs based on performance." },
  { k: "Course materials", v: "Slides, circuits and reading, yours to keep afterwards." },
];

export const gInstructor = {
  badge: "Who teaches it",
  name: "Hridam Basu",
  role: "Founder, Rump Labs · Cryptography researcher and engineer",
  photo: "/image.png",
  bio: [
    "Over a decade of cryptography research and engineering in the blockchain industry, building systems based on zero-knowledge proofs and secure multiparty computation.",
    "His work spans confidential transactions, privacy-preserving identity, supply-chain traceability and blockchain gaming wallets. He has been an invited speaker at Devcon and at universities internationally.",
  ],
  credentials: [
    { k: "Web3", v: "Ethereum Foundation PSE · Polygon · Aztec · Findora · Circularise · Bolt Labs" },
    { k: "Research", v: "AT&T Labs · NTT Labs · TCS Labs" },
    { k: "Education", v: "M.S. Computer Science, Northeastern University · B.E. Information Technology, Jadavpur University" },
    { k: "Speaking", v: "Devcon, plus university lectures worldwide" },
  ],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hridam-basu/" },
    { label: "GitHub", href: "https://github.com/hridambasu" },
    { label: "Telegram", href: "https://t.me/hridambasu" },
    { label: "X", href: "https://x.com/hridambasu" },
  ],
};

export const gDetails = [
  { k: "Duration", v: "10 weeks, two lectures per week" },
  { k: "Schedule", v: "Saturdays & Sundays, 11:00–13:00 IST" },
  { k: "Format", v: "Live online, recorded, with hands-on project work" },
  { k: "Prerequisites", v: "None. No prior coding or cryptography needed" },
  { k: "Certificate", v: "Official completion certificate from Rump Labs" },
  { k: "After the cohort", v: "Job referrals and internship opportunities" },
];

export interface GField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  full?: boolean;
}

export const gFields: GField[] = [
  { name: "name", label: "Name", placeholder: "Your full name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
  { name: "contact", label: "Phone", type: "tel", placeholder: "+91 98765 43210", required: true },
  {
    name: "profession",
    label: "Profession",
    type: "select",
    required: true,
    options: ["Student", "Industry Professional", "Both"],
  },
  { name: "university", label: "University or college", placeholder: "Where you studied or study", required: true },
  { name: "major", label: "Field of study", placeholder: "Your major", required: true },
  { name: "currentCompany", label: "Current company", placeholder: "If applicable" },
  { name: "twitterHandle", label: "X handle", placeholder: "@yourhandle" },
  { name: "telegramId", label: "Telegram", placeholder: "@yourtelegram", required: true },
  { name: "linkedinId", label: "LinkedIn", placeholder: "linkedin.com/in/yourprofile", required: true },
  { name: "githubId", label: "GitHub", placeholder: "github.com/yourusername", required: true },
  {
    name: "knowledgeLevel",
    label: "Current level",
    type: "select",
    required: true,
    options: ["Beginner", "Intermediate", "Expert"],
  },
  {
    name: "interestReason",
    label: "Why do you want to join?",
    type: "textarea",
    placeholder: "A couple of lines on what you're hoping to get out of the cohort.",
    required: true,
    full: true,
  },
];
