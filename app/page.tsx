import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Nav } from "@/components/site/Nav";
import { Services } from "@/components/site/Services";
import { Trust } from "@/components/site/Trust";
import { Talks } from "@/components/site/Talks";
import { CALENDLY, faqs, offers } from "@/lib/content";
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
        "Technical services firm: POC sprints, technical briefs, AI workflow automation, smart contract sprints, and fractional CTO retainers. Every engagement is scoped in writing with a fixed price agreed before work starts.",
      areaServed: { "@type": "Place", name: "Worldwide" },
      serviceType: offers.map((o) => o.name),
      potentialAction: {
        "@type": "ScheduleAction",
        name: "Book a 30-minute call",
        target: CALENDLY,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
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
      itemListElement: offers.map((o, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: o.name,
        description: `${o.promise} ${o.deliverable}`,
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
        <Services />
        <Trust />
        <Talks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
