"use client";

import { CALENDLY } from "@/lib/content";
import { Reveal } from "./motion";
import { Shell } from "./ui";

export function CtaBand({
  label,
  line,
  body,
  cta,
  sub,
  tone = "paper",
}: {
  label: string;
  line: string;
  body: string;
  cta: string;
  sub: string;
  tone?: "paper" | "teal";
}) {
  const teal = tone === "teal";
  return (
    <section className="pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <Reveal>
          <div
            className={`flex flex-col gap-9 rounded-[30px] p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16 ${
              teal ? "teal-scope bg-canvas text-text-1" : "border border-line bg-panel shadow-soft"
            }`}
          >
            <div className="max-w-[640px]">
              <p className="mono text-text-3">{label}</p>
              <p className="display mt-5 text-[clamp(1.6rem,3.1vw,2.5rem)] leading-[1.02] text-text-1">
                {line}
              </p>
              <p className="t-body mt-5 text-[0.98rem]">{body}</p>
            </div>
            <div className="shrink-0">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noreferrer"
                className={`focus-ring group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full px-8 text-[15px] font-medium transition-transform duration-[220ms] hover:-translate-y-0.5 ${
                  teal ? "bg-white text-teal" : "bg-text-1 text-canvas"
                }`}
              >
                {cta}
                <span
                  aria-hidden
                  className="transition-transform duration-[220ms] group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <p className="mt-4 max-w-[38ch] text-[0.85rem] leading-[1.5] text-text-3">{sub}</p>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
