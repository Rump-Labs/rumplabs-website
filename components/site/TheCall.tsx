"use client";

import { process, questions } from "@/lib/content";
import { Reveal } from "./motion";
import { Badge, Heading, Shell } from "./ui";

export function TheCall() {
  return (
    <section id="process" className="scroll-mt-28 pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <Reveal>
          <Badge>How it works</Badge>
          <Heading line1="Thirty minutes." line2="Four things happen." className="mt-7" />
        </Reveal>

        <div className="mt-[clamp(44px,5vw,72px)] grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07} className="h-full">
              <div className="panel shadow-soft flex h-full flex-col p-7">
                <span className="num text-[2.4rem] leading-none text-text-3">{s.n}</span>
                <h3 className="t-card mt-7 text-text-1">{s.title}</h3>
                <p className="t-body mt-3 text-[0.92rem]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-[clamp(56px,7vw,96px)]">
          <Reveal>
            <Badge>{questions.badge}</Badge>
            <Heading line1={questions.line1} line2={questions.line2} className="mt-7" />
            <p className="t-lede mt-6">{questions.lede}</p>
          </Reveal>

          <div className="mt-11 overflow-hidden rounded-[26px] border border-line-2 bg-panel shadow-soft">
            {questions.items.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i, 6) * 0.04}>
                <div
                  className={`grid gap-2 px-6 py-6 md:grid-cols-[40px_1.1fr_1fr] md:gap-6 md:px-9 md:py-7 ${
                    i > 0 ? "border-t border-line-2" : ""
                  }`}
                >
                  <span className="mono pt-1 text-text-3">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[1rem] font-medium leading-[1.45] text-text-1">{item.q}</p>
                  <p className="t-body text-[0.9rem]">{item.why}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
