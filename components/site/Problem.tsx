"use client";

import { problem } from "@/lib/content";
import { Reveal, ScrollText } from "./motion";
import { Badge, Heading, Shell } from "./ui";

export function Problem() {
  return (
    <section className="py-[clamp(80px,10vw,148px)]">
      <Shell>
        <Reveal>
          <Badge>{problem.badge}</Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <Heading line1={problem.line1} line2={problem.line2} className="mt-7" />
        </Reveal>

        <ScrollText
          text={problem.lede}
          className="t-lede mt-8 max-w-[38ch] text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.4] text-text-1"
        />

        <div className="mt-[clamp(44px,5vw,72px)] grid gap-px overflow-hidden rounded-[26px] border border-line-2 bg-line-2 sm:grid-cols-2">
          {problem.points.map((p, i) => (
            <Reveal key={p.k} delay={Math.min(i, 4) * 0.06} className="bg-panel">
              <div className="h-full px-7 py-8 md:px-9 md:py-10">
                <p className="mono text-text-3">{String(i + 1).padStart(2, "0")}</p>
                <p className="t-card mt-5 text-text-1">{p.k}</p>
                <p className="t-body mt-3 text-[0.95rem]">{p.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
