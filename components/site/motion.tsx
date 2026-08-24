"use client";

import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

export const EASE = cubicBezier(0.2, 0.8, 0.2, 1);
export const SPRING = { stiffness: 160, damping: 22, mass: 0.6 };

/** Scroll-triggered rise. Observes itself — never nest inside its own overflow clip. */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * The page's signature move: words resolve from ghosted to full ink as the
 * block crosses the viewport. Scroll-linked, not scroll-triggered.
 */
export function ScrollText({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map((w, i) => {
          const start = (i / words.length) * 0.85;
          const end = start + 0.2;
          return (
            <span key={`${w}-${i}`}>
              <Word progress={scrollYProgress} range={[start, end]}>
                {w}
              </Word>
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
