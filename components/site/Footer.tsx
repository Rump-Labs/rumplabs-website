"use client";

import Image from "next/image";
import Link from "next/link";
import { CALENDLY, CONTACT_EMAIL, GITHUB, offers } from "@/lib/content";

const columns = [
  {
    head: "Services",
    links: offers.map((o) => ({ label: o.name, href: "/#services" })),
  },
  {
    head: "Company",
    links: [
      { label: "Services", href: "/#services" },
      { label: "How it works", href: "/#process" },
      { label: "FAQ", href: "/#faq" },
      { label: "Gallery", href: "/gallery" },
      { label: "Research", href: "/research" },
      { label: "Rump Gurukul", href: "/gurukul" },
      { label: "GitHub", href: GITHUB },
    ],
  },
  {
    head: "Talk",
    links: [
      { label: "Book a 30-minute call", href: CALENDLY },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="ink-scope overflow-hidden bg-canvas pt-[clamp(56px,7vw,88px)] text-text-1">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-10">
        <div className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.head}>
              <p className="mono text-text-3">{col.head}</p>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => {
                  const external = l.href.startsWith("http") || l.href.startsWith("mailto:");
                  const cls =
                    "focus-ring text-[0.92rem] text-text-2 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-text-1 hover:decoration-accent-soft";
                  return (
                    <li key={l.label}>
                      {external ? (
                        <a
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className={cls}
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={cls}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* watermark: the real wordmark, fitted to the container */}
        <div
          aria-hidden
          className="pointer-events-none mt-[clamp(48px,6vw,84px)] select-none pb-[clamp(24px,3.5vw,44px)]"
        >
          <Image
            src="/logo.png"
            alt=""
            width={815}
            height={208}
            sizes="(max-width: 1180px) 100vw, 1180px"
            className="h-auto w-full opacity-[0.07]"
          />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-6 sm:px-7 lg:px-10">
          <span className="mono text-text-3">© {new Date().getFullYear()} Rump Labs</span>
          <span className="mono text-text-3">rumplabs.xyz</span>
          <span className="mono text-text-3">Built in India · global hours</span>
        </div>
      </div>
    </footer>
  );
}
