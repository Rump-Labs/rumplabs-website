import { Deliverables } from "@/components/site/Deliverables";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { FinePrint } from "@/components/site/FinePrint";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Honesty } from "@/components/site/Honesty";
import { Nav } from "@/components/site/Nav";
import { CtaBand } from "@/components/site/CtaBand";
import { Engagements } from "@/components/site/Engagements";
import { Problem } from "@/components/site/Problem";
import { Services } from "@/components/site/Services";
import { Statement } from "@/components/site/Statement";
import { TheCall } from "@/components/site/TheCall";
import { Ticker } from "@/components/site/Ticker";
import { CALENDLY, ctaBand, faqs, offers } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Rump Labs",
      url: "https://rumplabs.xyz",
      description:
        "Technical services firm: fractional CTO, POC and MVP development, delivery management, AI automation, and Web3/ZK engineering. Every engagement under $5,000.",
      areaServed: "Worldwide",
      potentialAction: {
        "@type": "ScheduleAction",
        target: CALENDLY,
        name: "Book a 30-minute call",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engagements",
        itemListElement: offers.map((o) => ({
          "@type": "Offer",
          name: o.name,
          description: o.promise,
          priceCurrency: "USD",
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Services />
        <Statement />
        <Engagements />
        <CtaBand {...ctaBand.mid} tone="teal" />
        <FinePrint />
        <TheCall />
        <Deliverables />
        <Honesty />
        <CtaBand {...ctaBand.late} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
