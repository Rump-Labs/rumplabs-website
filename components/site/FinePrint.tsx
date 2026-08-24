"use client";

import { operatingModel, scope } from "@/lib/content";
import { Reveal, ScrollText } from "./motion";
import { Badge, Heading, Shell } from "./ui";

export function FinePrint() {
  return (
    <section className="pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <div className="panel shadow-soft overflow-hidden p-7 md:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <Badge>{scope.badge}</Badge>
              <Heading line1={scope.line1} line2={scope.line2} className="mt-7" />
            </Reveal>

            <div className="grid gap-px overflow-hidden rounded-[22px] border border-line-2 bg-line-2 sm:grid-cols-2">
              {scope.blocks.map((b, i) => (
                <Reveal key={b.k} delay={Math.min(i, 4) * 0.06} className="bg-panel">
                  <div className="h-full p-6">
                    <p className="t-card text-[1rem] text-text-1">{b.k}</p>
                    <p className="t-body mt-3 text-[0.9rem]">{b.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-line-2 pt-14">
            <Reveal>
              <Badge>{operatingModel.badge}</Badge>
              <Heading line1={operatingModel.line1} line2={operatingModel.line2} className="mt-7" />
            </Reveal>
            <div className="mt-9 grid gap-8 lg:grid-cols-3">
              {operatingModel.paras.map((p: string, i: number) => (
                <ScrollText
                  key={i}
                  text={p}
                  className="text-[0.98rem] leading-[1.6] text-text-1"
                />
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
