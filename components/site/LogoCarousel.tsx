"use client";

import { useReducedMotion } from "framer-motion";
import { Shell } from "./ui";

type Logo = { name: string; mark: React.ReactNode; wordmark?: boolean };

const MARKS: Record<string, React.ReactNode> = {
  Polygon: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="m17.82 16.342 5.692-3.287A.98.98 0 0 0 24 12.21V5.635a.98.98 0 0 0-.488-.846l-5.693-3.286a.98.98 0 0 0-.977 0L11.15 4.789a.98.98 0 0 0-.489.846v11.747L6.67 19.686l-3.992-2.304v-4.61l3.992-2.304 2.633 1.52V8.896L7.158 7.658a.98.98 0 0 0-.977 0L.488 10.945a.98.98 0 0 0-.488.846v6.573a.98.98 0 0 0 .488.847l5.693 3.286a.981.981 0 0 0 .977 0l5.692-3.286a.98.98 0 0 0 .489-.846V6.618l.072-.041 3.92-2.263 3.99 2.305v4.609l-3.99 2.304-2.63-1.517v3.092l2.14 1.236a.981.981 0 0 0 .978 0v-.001Z" />
    </svg>
  ),
  "Ethereum Foundation": (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
    </svg>
  ),
  "AT&T Labs": (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2.6 8.5h18.8M2.6 15.5h18.8M12 2c-3 3-3 17 0 20M12 2c3 3 3 17 0 20" />
    </svg>
  ),
  Binance: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M16.624 13.9202l2.7175 2.7154-7.353 7.353-7.353-7.352 2.7175-2.7164 4.6355 4.6595 4.6356-4.6595zm4.6366-4.6366L24 12l-2.7154 2.7164L18.5682 12l2.6924-2.7164zm-9.272.001l2.7163 2.6914-2.7164 2.7174v-.001L9.2721 12l2.7164-2.7154zm-9.2722-.001L5.4088 12l-2.6914 2.6924L0 12l2.7164-2.7164zM11.9885.0115l7.353 7.329-2.7174 2.7154-4.6356-4.6356-4.6355 4.6595-2.7174-2.7154 7.353-7.353z" />
    </svg>
  ),
  Avalanche: (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm.313 6.833a.77.77 0 00-.698 0c-.203.104-.364.384-.682.944L7.46 20.97c-.314.552-.47.829-.46 1.055a.77.77 0 00.35.602c.19.123.505.123 1.14.123h3.028c.712 0 1.068 0 1.386-.088.349-.104.667-.288.931-.541.243-.232.418-.54.764-1.145l.01-.018 3.926-6.95c.348-.61.52-.916.597-1.239a2.26 2.26 0 000-1.066c-.076-.32-.25-.625-.593-1.226l-.008-.014-1.536-2.686c-.318-.56-.48-.84-.682-.944zm4.664 9.482c-.2.104-.36.377-.678.925l-2.165 3.722-.007.013c-.317.548-.476.821-.464 1.046a.777.777 0 00.348.606c.15.098.387.118.802.122l4.684.001c.64 0 .962 0 1.154-.126a.768.768 0 00.348-.607c.011-.219-.142-.484-.443-1.005l-.032-.054-2.172-3.722-.025-.042c-.305-.517-.46-.778-.657-.879a.762.762 0 00-.693 0z" />
    </svg>
  ),
};

const maskLogo = (file: string, ratio: number, h = 24) => (
  <span
    aria-hidden
    className="block bg-current"
    style={{
      height: h,
      width: h * ratio,
      maskImage: `url(/logos/${file})`,
      WebkitMaskImage: `url(/logos/${file})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
    }}
  />
);

MARKS.Circularise = maskLogo("circularise.svg", 1);
MARKS.Findora = maskLogo("findora.svg", 1, 26);

// Wordmarks already contain the company name, so the text label is skipped.
const WORDMARKS: Record<string, React.ReactNode> = {
  QEDIT: maskLogo("qedit.svg", 1920 / 722, 22),
  Aztec: maskLogo("aztec.svg", 156 / 40, 22),
  "Bolt Labs": (
    <span aria-hidden className="relative block h-7 w-[88px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logos/bolt-labs.jpg"
        alt=""
        className="absolute left-0 top-[-27px] h-[88px] w-[88px] max-w-none mix-blend-multiply [filter:grayscale(1)_contrast(1.5)_brightness(1.1)]"
      />
    </span>
  ),
  "Discreet Labs": (
    <span aria-hidden className="text-[13px] font-bold uppercase tracking-[0.14em]">
      Discreet Labs
    </span>
  ),
};

const LOGOS: Logo[] = [
  ...Object.entries(MARKS).map(([name, mark]) => ({ name, mark })),
  ...Object.entries(WORDMARKS).map(([name, mark]) => ({ name, mark, wordmark: true })),
];

export function LogoCarousel({ label = "Trusted by teams at" }: { label?: string }) {
  const reduced = useReducedMotion();
  // Repeat enough times that the track is wider than any viewport, then
  // duplicate for the seamless -50% loop.
  const base = [...LOGOS, ...LOGOS, ...LOGOS];
  const row = [...base, ...base];

  return (
    <Shell className="mt-[clamp(40px,5vw,64px)]">
      <p className="mono text-text-3">{label}</p>
      <div className={`mt-5 ${reduced ? "overflow-x-auto" : "marquee"}`}>
        <ul
          className={`flex items-center ${reduced ? "" : "marquee-track logo-track"}`}
          style={reduced ? undefined : { animationDuration: `${LOGOS.length * 6.8}s` }}
        >
          {row.map((l, i) => (
            <li
              key={`${l.name}-${i}`}
              className="flex shrink-0 items-center gap-3 px-9 text-text-2 transition-colors duration-200 hover:text-text-1"
              aria-hidden={i >= base.length}
            >
              {l.mark}
              {l.wordmark ? (
                <span className="sr-only">{l.name}</span>
              ) : (
                <span className="whitespace-nowrap text-[15px] font-medium tracking-[-0.01em]">{l.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
