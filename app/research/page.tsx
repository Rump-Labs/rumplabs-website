import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/motion";
import { Badge, Heading, Shell } from "@/components/site/ui";
import { papers, researchIntro } from "@/lib/research";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Open-access cryptography research from Rump Labs engineers, including secure two-party quantum computation with complete fairness.",
  alternates: { canonical: "/research" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": papers.map((p) => ({
    "@type": "ScholarlyArticle",
    "@id": `${SITE}/research#${p.id}`,
    headline: p.title,
    url: p.href,
    datePublished: p.date,
    keywords: p.keywords.join(", "),
    license: "https://creativecommons.org/licenses/by/4.0/",
    isPartOf: { "@type": "Periodical", name: "IACR Cryptology ePrint Archive" },
    author: p.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      affiliation: { "@type": "Organization", name: a.affiliation },
    })),
  })),
};

const linkCls =
  "focus-ring group inline-flex h-[46px] items-center justify-center gap-2.5 rounded-full px-6 text-[14px] font-medium transition-transform duration-[220ms] hover:-translate-y-0.5";

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="pt-[124px] pb-[clamp(80px,10vw,148px)] sm:pt-[140px]">
        <Shell>
          <Reveal>
            <Badge>{researchIntro.badge}</Badge>
            <Heading line1={researchIntro.line1} line2={researchIntro.line2} className="mt-7" />
            <p className="t-lede mt-7 max-w-[56ch]">{researchIntro.lede}</p>
          </Reveal>

          <div className="mt-[clamp(44px,5vw,72px)] space-y-6">
            {papers.map((p) => (
              <Reveal key={p.id}>
                <article id={p.id} className="panel shadow-soft scroll-mt-28 p-7 md:p-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="mono text-text-3">{p.venue}</span>
                    <span className="mono-sm rounded-full border border-line-2 px-2.5 py-1 text-[0.66rem] text-text-3">
                      {p.status} · {p.category}
                    </span>
                  </div>

                  <h2 className="display mt-6 max-w-[28ch] text-[clamp(1.5rem,3vw,2.3rem)] leading-[1.05] text-text-1">
                    {p.title}
                  </h2>

                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem] leading-[1.5]">
                    {p.authors.map((a) => (
                      <li key={a.name} className={a.ours ? "text-text-1" : "text-text-2"}>
                        <span className={a.ours ? "font-medium" : ""}>{a.name}</span>
                        <span className="text-text-3"> · {a.affiliation}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 grid gap-5 border-t border-line-2 pt-8 lg:grid-cols-2 lg:gap-10">
                    {p.summary.map((para) => (
                      <p key={para} className="t-body text-[0.98rem]">
                        {para}
                      </p>
                    ))}
                  </div>

                  <ul className="mt-8 flex flex-wrap gap-1.5">
                    {p.keywords.map((k) => (
                      <li
                        key={k}
                        className="mono-sm rounded-full border border-line-2 px-2.5 py-1 text-[0.66rem] text-text-3"
                      >
                        {k}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a href={p.pdf} target="_blank" rel="noreferrer" className={`${linkCls} bg-text-1 text-canvas`}>
                      Read the paper (PDF)
                      <span aria-hidden className="transition-transform duration-[220ms] group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                    <a href={p.href} target="_blank" rel="noreferrer" className={`${linkCls} border border-line text-text-1`}>
                      ePrint page ↗
                    </a>
                    <span className="mono-sm text-text-3 sm:ml-2">
                      {new Date(p.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })} · {p.license}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Shell>
      </main>
      <Footer />
    </>
  );
}
