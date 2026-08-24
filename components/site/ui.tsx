"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  scope,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  scope?: "teal" | "ink";
}) {
  const s = scope === "teal" ? "teal-scope" : scope === "ink" ? "ink-scope" : "";
  return (
    <section id={id} className={`relative scroll-mt-28 ${s} ${className}`}>
      {children}
    </section>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="mono inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-text-2">
      <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
      {children}
    </span>
  );
}

/** Two-line uppercase display heading. Line two is muted — the eye lands on line one. */
export function Heading({
  line1,
  line2,
  size = "section",
  className = "",
}: {
  line1: string;
  line2?: string;
  size?: "section" | "hero" | "block";
  className?: string;
}) {
  const s = size === "hero" ? "t-hero" : size === "block" ? "t-block" : "t-section";
  return (
    <h2 className={`display ${s} text-text-1 ${className}`}>
      {line1}
      {line2 && (
        <>
          <br />
          <span className="text-text-3">{line2}</span>
        </>
      )}
    </h2>
  );
}

export function Cta({
  href,
  children,
  variant = "solid",
  size = "lg",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "lg" | "sm";
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const pad = size === "lg" ? "h-[54px] px-8 text-[15px]" : "h-[46px] px-6 text-[14px]";
  const look =
    variant === "solid"
      ? "bg-text-1 text-canvas hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-16px_rgba(20,25,27,0.5)]"
      : "border border-line text-text-1 hover:border-text-3 hover:-translate-y-0.5";
  const cls = `focus-ring group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${pad} ${look} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`panel shadow-soft ${className}`}>{children}</div>;
}
