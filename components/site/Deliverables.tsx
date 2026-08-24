"use client";

import { deliverables, derisk } from "@/lib/content";
import { Reveal } from "./motion";
import { Badge, Heading, Shell } from "./ui";

export function Deliverables() {
  return (
    <section className="pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
          {/* headings share row 1 so both panels start on the same line */}
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <Badge>{deliverables.badge}</Badge>
            <Heading line1={deliverables.line1} line2={deliverables.line2} className="mt-6" />
          </Reveal>

          <div className="lg:col-start-1 lg:row-start-2 lg:mt-2">
            <Reveal>
              <div className="overflow-hidden rounded-[26px] border border-line-2 bg-panel shadow-soft">
                {deliverables.rows.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid gap-2 px-6 py-5 transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--text-1)_3%,transparent)] sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-7 md:px-7 ${
                      i > 0 ? "border-t border-line-2" : ""
                    }`}
                  >
                    <p className="mono pt-[0.3em] leading-[1.5] text-text-3">{k}</p>
                    <p className="text-[0.92rem] leading-[1.5] text-text-1">{v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-4 lg:col-start-2 lg:row-start-1 lg:mt-0">
            <Badge>{derisk.badge}</Badge>
            <Heading line1={derisk.line1} line2={derisk.line2} className="mt-6" />
          </Reveal>

          <div className="lg:col-start-2 lg:row-start-2 lg:mt-2">
            <div className="overflow-hidden rounded-[26px] border border-line-2 bg-panel shadow-soft">
              {derisk.items.map((it, i) => (
                <Reveal key={it.k} delay={Math.min(i, 5) * 0.05}>
                  <div
                    className={`px-6 py-6 md:px-7 ${i > 0 ? "border-t border-line-2" : ""}`}
                  >
                    <div className="grid grid-cols-[18px_1fr] items-start gap-3">
                      <span aria-hidden className="mt-[0.62em] h-px w-3.5 bg-accent" />
                      <p className="t-card text-[0.98rem] text-text-1">{it.k}</p>
                    </div>
                    <p className="t-body mt-3 pl-[30px] text-[0.9rem]">{it.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
