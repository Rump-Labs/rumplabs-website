"use client";

import { faqs } from "@/lib/content";
import { Reveal } from "./motion";
import { Badge, Heading, Shell } from "./ui";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Badge>Questions</Badge>
              <Heading line1="The hard" line2="ones." className="mt-7" />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="overflow-hidden rounded-[26px] border border-line-2 bg-panel shadow-soft">
              {faqs.map((f, i) => (
                <details key={f.q} className={`faq group ${i > 0 ? "border-t border-line-2" : ""}`}>
                  <summary className="focus-ring grid cursor-pointer grid-cols-[32px_1fr_20px] items-start gap-4 px-6 py-6 transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--text-1)_3%,transparent)] md:px-8">
                    <span className="mono pt-1 text-text-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[clamp(1rem,1.3vw,1.12rem)] font-medium leading-[1.42] text-text-1">
                      {f.q}
                    </span>
                    <span aria-hidden className="relative mt-2 block h-3 w-3 justify-self-end">
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-3 rounded bg-text-3 transition-colors duration-300 group-hover:bg-accent" />
                      <span className="absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 rounded bg-text-3 transition-all duration-300 group-hover:bg-accent group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="t-body max-w-[64ch] px-6 pb-7 pl-[68px] pr-8 text-[0.95rem] md:px-8 md:pl-[68px]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
