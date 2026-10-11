export interface GalleryEvent {
  id: string;
  /** folder under /public/gallery */
  dir: string;
  line1: string;
  line2: string;
  /** short name for the index, the mobile bar and the lightbox */
  short: string;
  kicker: string;
  blurb: string;
  /** one caption per photo, in file order (01.webp, 02.webp, …) */
  photos: string[];
  /** 1-based positions of the upright (2:3) frames; everything else is 3:2 */
  portrait?: number[];
}

export const galleryIntro = {
  badge: "Gallery",
  line1: "Off the screen,",
  line2: "in the room.",
  hint: "frames · open any one full size",
  lede: "Hackathons, panels, lectures and workshops. Where the team has shown up, in photographs.",
};

export const galleryEvents: GalleryEvent[] = [
  {
    id: "impetus",
    dir: "impetus",
    line1: "IEM",
    line2: "Impetus",
    short: "IEM Impetus",
    kicker: "Open innovation hackathon · Final round · 12 Jan 2026",
    blurb: "A seat at the judges' table for the final round, then the good part: handing the trophies to the teams that earned them.",
    photos: [
      "A few words to the room",
      "The judges' table, trophies lined up",
      "Final round, full panel",
      "A memento from the organisers",
      "At the judges' table",
      "First trophy changes hands",
      "A winning team",
      "Everyone gets a hand on it",
      "Another team, another trophy",
      "And one more",
    ],
  },
  {
    id: "conclave",
    dir: "teachers-conclave",
    line1: "ToI Teachers'",
    line2: "Conclave",
    short: "ToI Teachers' Conclave",
    kicker: "The Times of India · Panel discussion",
    blurb: "On the panel for “Role of Artificial Intelligence in School Education”, in front of a room of people who teach for a living.",
    photos: [
      "The topic on the screen behind the panel",
      "Making the case",
      "Mid-argument",
      "Four chairs, one question",
      "A question from the moderator",
      "Still on the mic",
      "A lighter moment",
      "Between answers",
      "A few words after the felicitation",
      "A memento from the hosts",
      "Everyone on stage",
      "Back in the audience, mic still in hand",
    ],
    portrait: [2, 8],
  },
  {
    id: "calcutta-hacks",
    dir: "calcutta-hacks",
    line1: "Calcutta",
    line2: "<Hacks/>",
    short: "Calcutta <Hacks/>",
    kicker: "Apex Circle · Techno India",
    blurb: "A talk on zero-knowledge proofs, starting from the three pillars, then prizes for the teams that shipped.",
    photos: [
      "On the mic",
      "The three pillars of a ZKP",
      "From the podium",
      "Walking through the example",
      "On stage with the partners",
      "The partner line-up",
      "Felicitation, with an uttariya",
      "And a memento to go with it",
      "The organisers' desk",
      "Prizes for the builders",
      "A winning team",
      "Trophy, held by everyone at once",
    ],
  },
  {
    id: "stellar-buildathon",
    dir: "stellar-buildathon",
    line1: "Stellar",
    line2: "Build-a-thon",
    short: "Stellar Build-a-thon Kolkata",
    kicker: "Stellar · Kolkata · Judging",
    blurb: "Judging in Kolkata: table to table through what the teams built on Stellar, then on stage to hand over the prizes.",
    photos: [
      "A word to the builders",
      "Judging, one laptop at a time",
      "A team walks through its build",
      "Looking over a demo",
      "Table by table",
      "Reading it up close",
      "Questions for the team",
      "A demo, mid-explanation",
      "Addressing the room",
      "The winning team",
      "Second runner-up",
      "Another prize handed over",
      "The whole room",
    ],
    portrait: [2, 4, 6],
  },
  {
    id: "blockchain-summit",
    dir: "blockchain-summit",
    line1: "Blockchain",
    line2: "Summit 2.0",
    short: "East-India Blockchain Summit 2.0",
    kicker: "IIT Kharagpur · 17–18 January · Invited talk",
    blurb: "An invited talk, “Zero-Knowledge Proofs 101: How Cryptography Shapes Blockchain”, plus two days mentoring the hackathon teams.",
    photos: [
      "Title slide up, hall filling in",
      "On Layer-2 scaling",
      "The sudoku example",
      "A full lecture hall",
      "The scalability trilemma",
      "From the back row",
      "Still on the trilemma",
    ],
    portrait: [2, 5, 7],
  },
  {
    id: "youngpreneurs",
    dir: "youngpreneurs",
    line1: "Youngpreneurs",
    line2: "AI Panel",
    short: "Youngpreneurs Panel on AI in Education",
    kicker: "IIT Kharagpur Research Park · Panel discussion",
    blurb: "A panel on what AI changes about education, and what it should leave alone.",
    photos: [
      "The panel, seated",
      "Making a point",
      "A question, answered across the table",
      "Mid-discussion",
      "Listening to a fellow panellist",
      "The four panellists",
      "A felicitation to close",
      "With the memento",
      "Certificates all round",
      "Everyone on stage",
    ],
  },
  {
    id: "heritage",
    dir: "heritage",
    line1: "Heritage",
    line2: "Agentic AI",
    short: "Heritage: Build Your First AI Agent",
    kicker: "Heritage Institute of Technology · Workshop · 28 Sep 2026",
    blurb: "A department-industry workshop for third-year computer science students: one afternoon in the lab, building a first AI agent.",
    photos: [
      "Starting the session",
      "Slides up, lab full",
      "A room of third-years",
      "Heads down, building",
      "A plant instead of a plaque",
    ],
  },
  {
    id: "isi-lecture",
    dir: "isi-lecture",
    line1: "ISI Kolkata",
    line2: "Invited lecture",
    short: "ISI Kolkata: Invited Lecture",
    kicker: "Indian Statistical Institute · ISEA short-term course",
    blurb: "“Arithmetization Schemes in ZKP”, delivered at a short-term course and hackathon on privacy-preserving cryptographic security.",
    photos: ["At the desk, mid-lecture", "The room", "A memento afterwards"],
  },
  {
    id: "hacker-house-goa",
    dir: "hacker-house-goa",
    line1: "Hacker House",
    line2: "Goa",
    short: "Hacker House Goa",
    kicker: "Goa · 4–9 August 2024 · Talk and mentoring",
    blurb: "Presenting Anon-Aadhaar for the Ethereum Foundation's PSE team, then mentoring the hackathon teams building on it.",
    photos: ["Presenting Anon-Aadhaar", "Questions from the floor"],
    portrait: [1, 2],
  },
];

export const galleryCount = galleryEvents.reduce((n, e) => n + e.photos.length, 0);
