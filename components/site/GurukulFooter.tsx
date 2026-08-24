"use client";

import Image from "next/image";
import Link from "next/link";
import { GURUKUL_EMAIL, GURUKUL_WHATSAPP, gInstructor } from "@/lib/gurukul";

export function GurukulFooter() {
  return (
    <footer className="ink-scope overflow-hidden bg-canvas pt-[clamp(56px,7vw,88px)] text-text-1">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-10">
        <div className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mono text-text-3">Talk to us</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${GURUKUL_EMAIL}`}
                  className="focus-ring text-[0.92rem] text-text-2 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-text-1 hover:decoration-accent"
                >
                  {GURUKUL_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={GURUKUL_WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring text-[0.92rem] text-text-2 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-text-1 hover:decoration-accent"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mono text-text-3">Instructor</p>
            <ul className="mt-6 space-y-3">
              {gInstructor.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring text-[0.92rem] text-text-2 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-text-1 hover:decoration-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono text-text-3">Payment</p>
            <p className="mt-6 max-w-[34ch] text-[0.92rem] leading-[1.55] text-text-2">
              Razorpay processes payments securely — cards, UPI, wallets and international
              instruments. No documents are stored on our servers.
            </p>
          </div>

          <div>
            <p className="mono text-text-3">Rump Labs</p>
            <p className="mt-6 max-w-[34ch] text-[0.92rem] leading-[1.55] text-text-2">
              Gurukul is the teaching arm of Rump Labs, a technical services firm.
            </p>
            <Link
              href="/"
              className="focus-ring mt-4 inline-block text-[0.92rem] text-text-2 underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-text-1 hover:decoration-accent"
            >
              See the practice →
            </Link>
          </div>
        </div>

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
          <span className="mono text-text-3">Cohort starts January 2026</span>
        </div>
      </div>
    </footer>
  );
}
