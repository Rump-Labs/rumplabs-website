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
import { Talks } from "@/components/site/Talks";
import { TheCall } from "@/components/site/TheCall";
import { Ticker } from "@/components/site/Ticker";
import { CALENDLY, ctaBand, faqs, offers, services } from "@/lib/content";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: "Rump Labs",
      url: SITE,
      parentOrganization: { "@id": `${SITE}/#organization` },
      description:
        "Technical services firm: fractional CTO, POC and MVP development, delivery management, technical distribution, AI automation, and Web3/ZK engineering. Every engagement is scoped in writing with a fixed price agreed before work starts.",
      areaServed: { "@type": "Place", name: "Worldwide" },
      serviceType: services.map((s) => s.title),
      potentialAction: {
        "@type": "ScheduleAction",
        name: "Book a 30-minute call",
        target: CALENDLY,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engagements",
        itemListElement: offers.map((o, i) => ({
          "@type": "Offer",
          position: i + 1,
          name: o.name,
          description: o.promise,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          category: o.timeline,
          itemOffered: {
            "@type": "Service",
            name: o.name,
            description: `${o.promise} ${o.deliverable}`,
            provider: { "@id": `${SITE}/#organization` },
          },
        })),
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE}/#services`,
      name: "What Rump Labs does",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        description: `${s.line} ${s.body}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: SITE,
      name: "Rump Labs — Your build is stalled. We finish it.",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#organization` },
      primaryImageOfPage: `${SITE}/opengraph-image.png`,
      inLanguage: "en",
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
        <Talks />
        <CtaBand {...ctaBand.late} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
