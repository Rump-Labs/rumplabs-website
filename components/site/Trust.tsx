"use client";

import Link from "next/link";
import { trust } from "@/lib/content";
import { Reveal } from "./motion";
import { Shell } from "./ui";

const linkCls =
  "mono-sm focus-ring text-text-1 underline decoration-line underline-offset-4 transition-colors duration-200 hover:decoration-accent";

export function Trust() {
  return (
    <section id="trust" className="teal-scope scroll-mt-28 bg-canvas py-[clamp(88px,11vw,164px)] text-text-1">
      <Shell>
        <Reveal>
          <span className="mono inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-text-2">
            <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent-soft" />
            {trust.badge}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display t-block mt-10 text-text-1">
            {trust.line1}
            <br />
            {trust.line2}
            <br />
            <span className="text-text-3">{trust.line3}</span>
          </h2>
        </Reveal>

        <div className="mt-[clamp(48px,6vw,80px)] grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {trust.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.06}>
              <p className="mono text-text-3">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-card mt-5 text-text-1">{it.k}</h3>
              <p className="mt-3 text-[0.95rem] leading-[1.55] text-text-2">{it.v}</p>
              {it.links && (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {it.links.map((l) =>
                    l.href.startsWith("http") ? (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={linkCls}>
                        {l.label} ↗
                      </a>
                    ) : (
                      <Link key={l.href} href={l.href} className={linkCls}>
                        {l.label} →
                      </Link>
                    ),
                  )}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 max-w-[60ch] text-[1.02rem] leading-[1.55] text-text-1">{trust.note}</p>
        </Reveal>
      </Shell>
    </section>
  );
}
