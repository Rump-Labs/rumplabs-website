"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CALENDLY, nav } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:pt-5">
      <div
        className={`mx-auto flex w-full max-w-[980px] items-center justify-between gap-3 rounded-full border border-black/[0.08] py-2 pl-4 pr-2 transition-all duration-300 md:pl-5 ${
          scrolled
            ? "bg-white/80 shadow-[0_10px_34px_-18px_rgba(17,17,16,0.35)] backdrop-blur-xl"
            : "bg-white/55 backdrop-blur-md"
        }`}
      >
        <Link href="/" aria-label="Rump Labs home" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Rump Labs"
            width={132}
            height={34}
            priority
            className="h-[22px] w-auto brightness-0"
          />
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-text-2 transition-colors duration-200 hover:text-text-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Book a Call
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden"
          >
            <span className="relative block h-[9px] w-[15px]">
              <span
                className={`absolute inset-x-0 top-0 h-[1.5px] rounded bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-[1.5px] rounded bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 w-full max-w-[980px] rounded-[24px] border border-black/[0.08] bg-white/95 p-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display border-b border-black/[0.07] py-3 text-[20px] last:border-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white"
            >
              Book a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
