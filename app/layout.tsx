import type { Metadata } from "next";
import { Archivo, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE = "https://rumplabs.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Rump Labs — Your build is stalled. We finish it.",
    template: "%s · Rump Labs",
  },
  description:
    "The technical half of your company. Consultancy, POCs, delivery, AI automation and Web3/ZK engineering — scoped in writing, delivered in days. You own the repo, the cloud account and the keys from day one.",
  keywords: [
    "fractional CTO",
    "MVP development agency",
    "technical consultancy",
    "AI automation",
    "LLM agents",
    "Web3 development",
    "zero-knowledge proofs",
    "startup incubator",
  ],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Rump Labs",
    title: "Rump Labs — Your build is stalled. We finish it.",
    description:
      "Scoped in writing, delivered in days. One accountable engineer, and your repo, cloud account and keys from day one.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rump Labs — Your build is stalled. We finish it.",
    description:
      "Consultancy, POCs, delivery, AI automation and Web3/ZK. Scope first, then money moves.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
