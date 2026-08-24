"use client";

import { services } from "@/lib/content";
import { Reveal } from "./motion";
import { Badge, Heading, Shell } from "./ui";

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <Reveal>
          <Badge>What we do</Badge>
          <Heading line1="Six disciplines." line2="One accountable owner." className="mt-7" />
          <p className="t-lede mt-7">
            Take one. Take the stack. Either way there is a single person who answers for the
            architecture, the code, and the date.
          </p>
        </Reveal>

        <div className="mt-[clamp(44px,5vw,72px)] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={Math.min(i, 5) * 0.06} className="h-full">
              <article className="panel shadow-soft group flex h-full flex-col p-7 transition-transform duration-[500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="mono text-text-3">{s.n}</span>
                  <span
                    aria-hidden
                    className="h-px w-6 bg-line transition-colors duration-200 group-hover:bg-accent"
                  />
                </div>
                <h3 className="t-card mt-7 text-text-1">{s.title}</h3>
                <p className="mt-4 text-[0.98rem] font-medium leading-[1.45] text-text-1">{s.line}</p>
                <p className="t-body mt-3 text-[0.92rem]">{s.body}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-7">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="mono-sm rounded-full border border-line-2 px-2.5 py-1 text-[0.66rem] text-text-3"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
