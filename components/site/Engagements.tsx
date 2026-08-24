"use client";

import { CALENDLY, offers, type Offer } from "@/lib/content";
import { Reveal } from "./motion";
import { Badge, Heading, Shell } from "./ui";

function Row({ offer }: { offer: Offer }) {
  return (
    <details className="faq group border-t border-line">
      <summary className="focus-ring cursor-pointer px-1 py-8 transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--text-1)_3%,transparent)] md:px-4 md:py-10">
        <div className="grid grid-cols-[34px_1fr_24px] items-start gap-5 md:grid-cols-[52px_1fr_auto_24px] md:gap-8">
          <span className="mono pt-2 text-text-3">{offer.n}</span>

          <div className="min-w-0">
            <h3 className="display text-[clamp(1.4rem,3.1vw,2.35rem)] leading-[1.02] text-text-1 transition-colors duration-300 group-hover:text-teal">
              {offer.name}
            </h3>
            <p className="mt-3 max-w-[52ch] text-[0.98rem] leading-[1.5] text-text-2">
              {offer.promise}
            </p>
          </div>

          <div className="col-start-2 md:col-start-3 md:pt-2 md:text-right">
            <p className="mono-sm text-text-3">{offer.timeline}</p>
            <p className="mono mt-2 text-text-3 md:hidden">Read the scope</p>
          </div>

          <span
            aria-hidden
            className="relative col-start-3 row-start-1 mt-3 block h-3.5 w-3.5 justify-self-end md:col-start-4"
          >
            <span className="absolute left-0 top-1/2 h-[1.5px] w-3.5 rounded bg-text-3 transition-colors duration-300 group-hover:bg-accent" />
            <span className="absolute left-1/2 top-0 h-3.5 w-[1.5px] -translate-x-1/2 rounded bg-text-3 transition-all duration-300 group-hover:bg-accent group-open:rotate-90 group-open:opacity-0" />
          </span>
        </div>
      </summary>

      <div className="grid gap-10 px-1 pb-12 md:grid-cols-[52px_1fr_1fr] md:gap-8 md:px-4">
        <div className="hidden md:block" />

        <div>
          <p className="mono text-text-3">Who it&apos;s for</p>
          <p className="mt-3 max-w-[46ch] text-[0.94rem] leading-[1.55] text-text-2">{offer.who}</p>

          <p className="mono mt-8 text-text-3">What&apos;s included</p>
          <ul className="mt-4 space-y-3">
            {offer.includes.map((it) => (
              <li key={it} className="grid grid-cols-[14px_1fr] items-start gap-3">
                <span aria-hidden className="mt-[0.62em] h-px w-[10px] bg-line" />
                <span className="text-[0.92rem] leading-[1.5] text-text-2">{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="rounded-[22px] bg-[color-mix(in_srgb,var(--text-1)_4%,transparent)] p-6">
            <p className="mono text-text-3">You end up holding</p>
            <p className="mt-3 text-[0.94rem] leading-[1.55] text-text-1">{offer.deliverable}</p>
            <div aria-hidden className="my-5 h-px w-full bg-line-2" />
            <p className="mono text-text-3">Not included</p>
            <p className="mt-3 text-[0.9rem] leading-[1.5] text-text-2">{offer.excluded}</p>
          </div>

          <p className="mono mt-8 text-accent">Guarantee</p>
          <p className="mt-3 text-[0.92rem] leading-[1.55] text-text-2">{offer.guarantee}</p>

          <div className="mt-8">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group/cta inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-text-1 px-7 text-[14px] font-medium text-canvas transition-transform duration-[220ms] hover:-translate-y-0.5"
            >
              Scope this engagement
              <span
                aria-hidden
                className="transition-transform duration-[220ms] group-hover/cta:translate-x-1"
              >
                →
              </span>
            </a>
            <p className="mt-4 max-w-[42ch] text-[0.82rem] leading-[1.5] text-text-3">
              {offer.next}
            </p>
          </div>
        </div>
      </div>
    </details>
  );
}

export function Engagements() {
  return (
    <section id="engagements" className="scroll-mt-28 py-[clamp(80px,10vw,148px)]">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <Reveal>
            <Badge>Engagements</Badge>
            <Heading line1="Five ways in." line2="Scoped before they start." className="mt-7" />
          </Reveal>
          <Reveal delay={0.06}>
            <p className="t-lede lg:pb-2">
              Pick the shape that fits the problem. Each one comes with a written boundary, a
              delivery date, and a number you see before you commit.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(44px,5vw,72px)] border-b border-line">
          {offers.map((o) => (
            <Row key={o.id} offer={o} />
          ))}
        </div>

        <Reveal>
          <p className="mt-8 max-w-[62ch] text-[0.94rem] leading-[1.6] text-text-3">
            Every engagement is fixed-price and agreed in writing before it starts. You get the
            number on the call, along with the scope it covers.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}
