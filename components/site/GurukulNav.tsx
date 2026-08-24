"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gurukulNav } from "@/lib/gurukul";

export function GurukulNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5">
      <div className="mx-auto w-full max-w-[1180px]">
        <div
          className={`flex items-center justify-between gap-3 rounded-full border border-line-2 px-3 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:px-4 ${
            solid
              ? "bg-[color-mix(in_srgb,var(--panel)_88%,transparent)] shadow-[0_10px_34px_-22px_rgba(20,25,27,0.4)] backdrop-blur-xl"
              : "bg-[color-mix(in_srgb,var(--panel)_62%,transparent)] backdrop-blur-md"
          }`}
        >
          <Link href="/" aria-label="Rump Labs home" className="flex shrink-0 items-center gap-3 pl-2">
            <Image
              src="/logo.png"
              alt="Rump Labs"
              width={132}
              height={34}
              priority
              className="h-[22px] w-auto brightness-0 sm:h-[25px]"
            />
            <span className="mono hidden border-l border-line pl-3 text-text-3 sm:inline">Gurukul</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {gurukulNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-text-2 transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--text-1)_5%,transparent)] hover:text-text-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#enrol"
              className="focus-ring hidden h-[40px] items-center rounded-full bg-text-1 px-5 text-[13.5px] font-medium text-canvas transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
            >
              Enrol now
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            >
              <span className="relative block h-[9px] w-[16px]">
                <span
                  className={`absolute inset-x-0 top-0 h-[1.5px] rounded bg-text-1 transition-transform duration-300 ${
                    open ? "translate-y-[4px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-[1.5px] rounded bg-text-1 transition-transform duration-300 ${
                    open ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 rounded-[26px] border border-line-2 bg-panel p-3 shadow-soft md:hidden">
            {gurukulNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-text-1"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#enrol"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-[48px] items-center justify-center rounded-full bg-text-1 text-[15px] font-medium text-canvas"
            >
              Enrol now
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
