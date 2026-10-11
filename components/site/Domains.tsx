"use client";

import Link from "next/link";
import { domains } from "@/lib/content";
import { Reveal } from "./motion";
import { Badge, Heading, Shell } from "./ui";

const tag = "mono-sm rounded-full border border-line-2 px-2.5 py-1 text-[0.66rem] text-text-3";

export function Domains() {
  return (
    <section id="domains" className="scroll-mt-28 pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <Reveal className="border-t border-line pt-[clamp(64px,8vw,112px)]">
          <Badge>{domains.badge}</Badge>
          <Heading line1={domains.line1} line2={domains.line2} className="mt-7" />
          <p className="t-lede mt-6 max-w-[58ch]">{domains.lede}</p>
        </Reveal>

        <div className="mt-[clamp(44px,5vw,72px)] grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.items.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.06} className="h-full">
              <article className="panel shadow-soft flex h-full flex-col p-7 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1">
                <span className="mono text-text-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-card mt-6 text-text-1">{d.name}</h3>
                <p className="mt-3 text-[0.94rem] leading-[1.55] text-text-2">{d.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {d.stacks.map((s) => (
                    <li key={s} className={tag}>
                      {s}
                    </li>
                  ))}
                </ul>
                {d.link && (
                  <div className="mt-auto pt-6">
                    <Link
                      href={d.link.href}
                      className="focus-ring group inline-flex items-center gap-2 text-[0.9rem] font-medium text-accent"
                    >
                      {d.link.label}
                      <span aria-hidden className="transition-transform duration-[220ms] group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                )}
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.12} className="h-full">
            <div className="ink-scope flex h-full flex-col rounded-[30px] bg-canvas p-7 text-text-1">
              <span className="mono text-text-3">{domains.stacksTitle}</span>
              <dl className="mt-6 space-y-5">
                {domains.stacks.map((s) => (
                  <div key={s.k}>
                    <dt className="t-card text-text-1">{s.k}</dt>
                    <dd className="mt-1.5 text-[0.9rem] leading-[1.5] text-text-2">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
