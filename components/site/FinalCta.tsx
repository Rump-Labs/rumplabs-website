"use client";

import { CALENDLY, CONTACT_EMAIL, finalCta, process } from "@/lib/content";
import { Reveal } from "./motion";
import { Shell } from "./ui";

export function FinalCta() {
  return (
    <section id="book" className="ink-scope scroll-mt-28 bg-canvas py-[clamp(88px,11vw,164px)] text-text-1">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display t-section text-text-1">
                {finalCta.line1}
                <br />
                <span className="text-text-3">{finalCta.line2}</span>
              </h2>
              <p className="t-lede mt-8">{finalCta.body}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full bg-text-1 px-8 text-[15px] font-medium text-canvas transition-transform duration-[220ms] hover:-translate-y-0.5"
                >
                  {finalCta.cta}
                  <span
                    aria-hidden
                    className="transition-transform duration-[220ms] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="focus-ring text-[0.92rem] text-text-2 underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:decoration-accent-soft"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              <p className="mt-6 max-w-[48ch] text-[0.92rem] leading-[1.5] text-text-3">{finalCta.ctaSub}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div id="process" className="scroll-mt-28 rounded-[26px] border border-line p-7 md:p-8">
              <p className="mono text-text-3">How it works</p>
              <ol className="mt-7 space-y-6">
                {process.map((s, i) => (
                  <li key={s.n} className="grid grid-cols-[28px_1fr] gap-4">
                    <span className="mono pt-1 text-text-3">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-[0.98rem] font-medium leading-[1.4] text-text-1">
                        {s.title}
                      </p>
                      <p className="t-body mt-2 text-[0.88rem]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
