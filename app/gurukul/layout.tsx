import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rump Gurukul — Zero-knowledge proofs, taught properly",
  description:
    "A ten-week certification cohort taking you from blockchain fundamentals to writing your own ZK circuits. No prerequisites. Live sessions, recorded, with group projects and a completion certificate.",
  openGraph: {
    type: "website",
    title: "Rump Gurukul — Zero-knowledge proofs, taught properly",
    description:
      "Ten weeks, two live lectures a week. Groth16, PLONK, STARKs, Circom, Halo2 and Noir. No prerequisites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rump Gurukul — Zero-knowledge proofs, taught properly",
    description:
      "A ten-week certification cohort. No prerequisites. Live sessions, recorded, with group projects and a completion certificate.",
  },
  alternates: { canonical: "/gurukul" },
  keywords: [
    "zero-knowledge proofs course",
    "ZK proofs certification",
    "learn zero knowledge proofs",
    "Circom course",
    "Halo2 course",
    "Noir ZK",
    "Groth16 PLONK STARKs",
    "blockchain cryptography course",
    "ZK rollup course",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport = {
  themeColor: "#f3f1ec",
  colorScheme: "light" as const,
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": `${SITE}/gurukul#course`,
      name: "Rump Gurukul — Zero-Knowledge Proofs in Blockchain",
      description:
        "A ten-week certification cohort taking students from blockchain fundamentals and cryptographic primitives to writing their own zero-knowledge circuits and presenting a working ZK application. No prerequisites and no prior coding or cryptography knowledge required.",
      url: `${SITE}/gurukul`,
      image: `${SITE}/gurukul/opengraph-image.png`,
      inLanguage: "en",
      educationalLevel: "Beginner to advanced",
      teaches: [
        "Cryptographic primitives and elliptic curves",
        "Interactive proofs: Schnorr and Bulletproofs",
        "Proof systems: Groth16, PLONK and STARKs",
        "Recursive frameworks: Halo2, Nova and SuperNova",
        "Lookup arguments, sum-check protocols and KZG commitments",
        "ZK-Rollups, ZK-EVMs, ZK-VMs and ZK-Bridges",
        "Circuit development in Circom, Halo2, Noir, Leo and ZoKrates",
        "Privacy-preserving smart contracts on Aztec",
      ],
      coursePrerequisites: "None. No prior coding or cryptography knowledge required.",
      numberOfCredits: 0,
      timeRequired: "P10W",
      provider: { "@id": `${SITE}/#organization` },
      offers: {
        "@type": "Offer",
        category: "Paid",
        priceCurrency: "INR",
        availability: "https://schema.org/PreOrder",
        url: `${SITE}/gurukul#enrol`,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "PT4H",
        startDate: "2026-01",
        location: { "@type": "VirtualLocation", url: `${SITE}/gurukul` },
        instructor: { "@id": `${SITE}/#hridam-basu` },
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#hridam-basu`,
      name: "Hridam Basu",
      jobTitle: "Founder, Rump Labs — cryptography researcher and engineer",
      worksFor: { "@id": `${SITE}/#organization` },
      image: `${SITE}/image.png`,
      description:
        "Cryptography researcher and engineer with over a decade in the blockchain industry, building systems based on zero-knowledge proofs and secure multiparty computation.",
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Northeastern University" },
        { "@type": "CollegeOrUniversity", name: "Jadavpur University" },
      ],
      knowsAbout: [
        "Zero-knowledge proofs",
        "Secure multiparty computation",
        "Smart contract engineering",
        "Confidential transactions",
      ],
      sameAs: [
        "https://www.linkedin.com/in/hridam-basu/",
        "https://github.com/hridambasu",
        "https://x.com/hridambasu",
        "https://t.me/hridambasu",
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Rump Labs", item: SITE },
        { "@type": "ListItem", position: 2, name: "Gurukul", item: `${SITE}/gurukul` },
      ],
    },
  ],
};

export default function GurukulLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {children}
    </>
  );
}
