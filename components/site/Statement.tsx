"use client";

import { statement } from "@/lib/content";
import { Reveal, ScrollText } from "./motion";
import { Shell } from "./ui";

export function Statement() {
  return (
    <section className="teal-scope bg-canvas py-[clamp(88px,11vw,164px)] text-text-1">
      <Shell>
        <Reveal>
          <span className="mono inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-text-2">
            <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent-soft" />
            {statement.badge}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display t-block mt-10 text-text-1">
            {statement.line1}
            <br />
            {statement.line2}
            <br />
            <span className="text-text-3">{statement.line3}</span>
          </h2>
        </Reveal>

        <div className="mt-[clamp(48px,6vw,80px)] grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
          {[statement.left, statement.right].map((col) => (
            <div key={col.label}>
              <p className="mono text-text-3">{col.label}</p>
              <ScrollText
                text={col.body}
                className="mt-5 text-[clamp(1rem,1.3vw,1.12rem)] leading-[1.6] text-text-1"
              />
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
