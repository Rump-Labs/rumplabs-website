"use client";

import { useReducedMotion } from "framer-motion";
import { ticker } from "@/lib/content";

export function Ticker({ items = ticker }: { items?: string[] }) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className="mt-[clamp(56px,7vw,96px)] border-y border-line py-4">
      <div className={reduced ? "overflow-x-auto" : "marquee"}>
        <div className={`flex items-center ${reduced ? "" : "marquee-track"}`}>
          {row.map((t, i) => (
            <span key={i} className="mono flex shrink-0 items-center gap-6 px-6 text-text-3">
              {t}
              <span aria-hidden className="h-[4px] w-[4px] rounded-full bg-accent opacity-70" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
