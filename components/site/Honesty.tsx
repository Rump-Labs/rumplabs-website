"use client";

import Link from "next/link";
import { limits, trust } from "@/lib/content";
import { Reveal } from "./motion";
import { Badge, Heading, Shell } from "./ui";

export function Honesty() {
  return (
    <section className="pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <Reveal>
          <Badge>{trust.badge}</Badge>
          <Heading line1={trust.line1} line2={trust.line2} className="mt-7" />
        </Reveal>

        <div className="mt-[clamp(44px,5vw,72px)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.06} className="h-full">
              <div className="panel shadow-soft flex h-full flex-col p-7">
                <span className="mono text-text-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-card mt-6 text-text-1">{it.k}</h3>
                <p className="t-body mt-3 text-[0.92rem]">{it.v}</p>
                {it.href && (
                  <div className="mt-auto pt-6">
                    {it.href.startsWith("http") ? (
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mono-sm focus-ring text-text-1 underline decoration-line underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                      >
                        {it.linkLabel} ↗
                      </a>
                    ) : (
                      <Link
                        href={it.href}
                        className="mono-sm focus-ring text-text-1 underline decoration-line underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                      >
                        {it.linkLabel} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-[clamp(56px,7vw,96px)]">
          <Reveal>
            <Badge>{limits.badge}</Badge>
            <Heading line1={limits.line1} line2={limits.line2} className="mt-7" />
            <p className="t-lede mt-6">{limits.lede}</p>
          </Reveal>

          <div className="mt-11 overflow-hidden rounded-[26px] border border-line-2 bg-panel shadow-soft">
            {limits.items.map((it, i) => (
              <Reveal key={it.k} delay={Math.min(i, 5) * 0.05}>
                <div
                  className={`grid gap-2 px-6 py-6 md:grid-cols-[0.75fr_1.25fr] md:gap-8 md:px-9 md:py-7 ${
                    i > 0 ? "border-t border-line-2" : ""
                  }`}
                >
                  <p className="t-card text-[1rem] text-text-1">{it.k}</p>
                  <p className="t-body text-[0.92rem]">{it.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
