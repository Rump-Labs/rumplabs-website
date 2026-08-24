import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
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
  alternates: { canonical: "/" },
  applicationName: "Rump Labs",
  category: "technology",
  authors: [{ name: "Rump Labs", url: SITE }],
  creator: "Rump Labs",
  publisher: "Rump Labs",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#14191b" },
  ],
  colorScheme: "light",
};

/** Sitewide entity graph. Page-level schema (services, FAQ, course) lives on
 *  the pages themselves and references these by @id. */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Rump Labs",
      alternateName: "Rump Labs Technical Services",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/icon.png`, width: 512, height: 512 },
      image: `${SITE}/opengraph-image.png`,
      description:
        "Technical services firm acting as the technical half of a founder's company: consultancy, POC and MVP development, delivery management, technical distribution, AI automation, and Web3/ZK engineering.",
      email: "contact@rumplabs.xyz",
      foundingLocation: { "@type": "Place", name: "India" },
      areaServed: { "@type": "Place", name: "Worldwide" },
      knowsAbout: [
        "Fractional CTO",
        "Proof of concept development",
        "Minimum viable product development",
        "Technical delivery management",
        "AI automation",
        "LLM agent systems",
        "Smart contract engineering",
        "Zero-knowledge proofs",
      ],
      sameAs: ["https://github.com/Rump-Labs"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "contact@rumplabs.xyz",
          url: "https://calendly.com/agnijdutta413/30min",
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Rump Labs",
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
