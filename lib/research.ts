export interface Paper {
  id: string;
  title: string;
  authors: { name: string; affiliation: string; ours?: boolean }[];
  venue: string;
  date: string;
  status: string;
  category: string;
  keywords: string[];
  summary: string[];
  href: string;
  pdf: string;
  license: string;
}

export const researchIntro = {
  badge: "Research",
  line1: "We publish",
  line2: "the hard parts.",
  lede: "Our engineers do research in cryptography alongside client work. Papers are open access, so you can read the thinking behind what we build.",
};

export const papers: Paper[] = [
  {
    id: "iacr-2026-883",
    title: "Secure Two-Party Quantum Computation with Complete Fairness without Trusted Third Party",
    authors: [
      { name: "Arpita Maitra", affiliation: "TCG CREST" },
      { name: "Goutam Paul", affiliation: "Indian Statistical Institute" },
      { name: "Asim K. Pal", affiliation: "IIM Calcutta" },
      { name: "Asmita Samanta", affiliation: "Indian Statistical Institute" },
      { name: "Hridam Basu", affiliation: "Rump Labs", ours: true },
    ],
    venue: "IACR Cryptology ePrint Archive, 2026/883",
    date: "2026-05-08",
    status: "Preprint",
    category: "Foundations",
    keywords: ["Secure quantum computation", "Fairness", "Millionaires' problem", "Embedded XOR"],
    summary: [
      "In 1997, Lo showed that if one party is malicious, unconditionally secure two-party quantum computation is impossible. Under computational assumptions, such as a one-way permutation secure against quantum adversaries, secure quantum bit-commitment does become possible. Complete fairness, where both parties get the output or neither does, remained open.",
      "This paper shows for the first time that some functions admit secure two-party quantum computation with complete fairness and no trusted third party. That stands in sharp contrast with the impossibility result of Ben-Or et al. (FOCS 2006).",
    ],
    href: "https://eprint.iacr.org/2026/883",
    pdf: "https://eprint.iacr.org/2026/883.pdf",
    license: "CC BY",
  },
];
