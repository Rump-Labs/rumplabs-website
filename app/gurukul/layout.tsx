import type { Metadata } from "next";

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
};

export default function GurukulLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
