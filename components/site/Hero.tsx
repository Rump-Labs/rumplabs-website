"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CALENDLY, hero } from "@/lib/content";
import { EASE } from "./motion";
import { Shell } from "./ui";
import { LogoCarousel } from "./LogoCarousel";

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.78, ease: EASE } },
};
const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

export function Hero() {
  const reduced = useReducedMotion();
  const anim = reduced ? {} : { initial: "hidden" as const, animate: "show" as const };

  return (
    <section className="relative overflow-hidden pt-[124px] sm:pt-[140px]">
      <Shell>
        <motion.div variants={parent} {...anim}>
          <motion.span
            variants={rise}
            className="mono inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-text-2"
          >
            <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
            {hero.badge}
          </motion.span>

          <motion.h1 variants={parent} className="display t-hero mt-8 text-text-1">
            <motion.span variants={rise} className="block">
              {hero.line1}
            </motion.span>
            <motion.span variants={rise} className="block">
              {hero.line2}
            </motion.span>
            <motion.span variants={rise} className="block text-text-3">
              {hero.line3}
            </motion.span>
          </motion.h1>

          <div className="mt-[clamp(36px,4vw,56px)] grid gap-10 border-t border-line pt-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.p variants={rise} className="t-lede max-w-[52ch]">
            {hero.sub}
          </motion.p>

          <motion.div variants={rise} className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full bg-text-1 px-8 text-[15px] font-medium text-canvas transition-all duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(20,25,27,0.5)]"
            >
              {hero.cta}
              <span
                aria-hidden
                className="transition-transform duration-[220ms] group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#engagements"
              className="focus-ring inline-flex h-[56px] items-center justify-center rounded-full border border-line px-7 text-[15px] font-medium text-text-1 transition-all duration-[220ms] hover:-translate-y-0.5 hover:border-text-3"
            >
              {hero.ctaAlt}
            </a>
          </motion.div>

          </div>
        </motion.div>
      </Shell>

      <LogoCarousel />

      <Shell className="mt-[clamp(56px,7vw,96px)]">
        <motion.dl
          variants={parent}
          {...anim}
          className="grid overflow-hidden rounded-[26px] border border-line-2 bg-panel shadow-soft sm:grid-cols-3"
        >
          {hero.stats.map((s, i) => (
            <motion.div
              key={s.k}
              variants={rise}
              className={`px-7 py-8 ${i > 0 ? "border-t border-line-2 sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="num text-[clamp(1.9rem,3vw,2.6rem)] leading-none text-text-1">{s.k}</dt>
              <dd className="t-body mt-3 text-[0.94rem]">{s.v}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </Shell>
    </section>
  );
}
