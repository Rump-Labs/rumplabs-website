"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { galleryEvents, type GalleryEvent } from "@/lib/gallery";
import { EASE } from "./motion";
import { Shell } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

const flat = galleryEvents.flatMap((ev, e) =>
  ev.photos.map((caption, p) => ({
    key: `${ev.id}-${pad(p + 1)}`,
    src: `/gallery/${ev.dir}/${pad(p + 1)}.webp`,
    caption,
    portrait: ev.portrait?.includes(p + 1) ?? false,
    e,
    p,
  })),
);
type Photo = (typeof flat)[number];

const THUMB_SIZES = "(min-width: 1024px) 640px, 100vw";
const FOCUS = [0, 0.3, 0.7, 1];
const outline =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]";

/**
 * The page's feature: a rack focus. Each frame enters soft, tilted and a
 * touch small, pulls sharp as it crosses the middle of the viewport, then
 * falls off again on the way out. Scroll-linked, not scroll-triggered.
 */
function FocusPhoto({
  photo,
  total,
  eventName,
  onActive,
  onOpen,
}: {
  photo: Photo;
  total: number;
  eventName: string;
  onActive: (p: number) => void;
  onOpen: (key: string) => void;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tilt = photo.p % 2 ? -1.6 : 1.6;
  const blur = useTransform(scrollYProgress, FOCUS, [5, 0, 0, 5]);
  const scale = useTransform(scrollYProgress, FOCUS, [0.93, 1, 1, 0.93]);
  const rotate = useTransform(scrollYProgress, FOCUS, [tilt, 0, 0, -tilt]);
  const opacity = useTransform(scrollYProgress, FOCUS, [0.55, 1, 1, 0.55]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const centred = useInView(ref, { margin: "-50% 0px -50% 0px" });
  useEffect(() => {
    if (centred) onActive(photo.p);
  }, [centred, onActive, photo.p]);

  const side = photo.p % 3 === 1 ? "lg:ml-auto" : "";
  const lay = photo.portrait
    ? `mx-auto w-[86%] lg:mx-0 lg:w-[58%] ${side}`
    : photo.p % 3 === 0
      ? ""
      : `lg:w-[84%] ${side}`;

  return (
    <motion.div
      ref={ref}
      id={photo.key}
      style={reduced ? undefined : { scale, rotate, opacity, filter }}
      className={`will-change-transform ${lay}`}
    >
      <button
        type="button"
        onClick={() => onOpen(photo.key)}
        aria-label={`Open photo: ${photo.caption}`}
        className={`group block w-full cursor-zoom-in rounded-[24px] border border-line-2 bg-surface p-2 text-left shadow-soft ${outline}`}
      >
        <motion.div
          layoutId={photo.key}
          style={{ borderRadius: 17 }}
          className={`relative overflow-hidden bg-[rgb(20_25_27/0.06)] ${photo.portrait ? "aspect-[2/3]" : "aspect-[3/2]"}`}
        >
          <Image
            src={photo.src}
            alt={`${eventName}: ${photo.caption}`}
            fill
            sizes={THUMB_SIZES}
            className="object-cover transition-transform duration-[520ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.035]"
          />
        </motion.div>
        <span className="flex items-baseline justify-between gap-4 px-2.5 pb-1.5 pt-3">
          <span className="text-[0.92rem] leading-[1.35] text-text-1">{photo.caption}</span>
          <span className="mono-sm shrink-0 text-text-3">
            {pad(photo.p + 1)}/{pad(total)}
          </span>
        </span>
      </button>
    </motion.div>
  );
}

function EventSection({
  ev,
  index,
  onOpen,
}: {
  ev: GalleryEvent;
  index: number;
  onOpen: (key: string) => void;
}) {
  const [active, setActive] = useState(0);
  const total = ev.photos.length;
  const photos = flat.filter((f) => f.e === index);

  const jump = (p: number) =>
    document.getElementById(photos[p].key)?.scrollIntoView({ block: "center" });

  return (
    <section id={ev.id} aria-labelledby={`${ev.id}-title`} className="scroll-mt-20 border-t border-line">
      <Shell className="grid gap-x-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* the title holds still while the photos travel past it */}
        <div className="self-start pb-9 pt-14 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:pb-11 lg:pt-[132px]">
          <p className="mono text-text-3">
            {pad(index + 1)} / {pad(galleryEvents.length)}
          </p>
          <h2
            id={`${ev.id}-title`}
            className="display mt-5 text-[clamp(2.3rem,4.2vw,3.2rem)] text-text-1"
          >
            {ev.line1}
            <br />
            <span className="text-text-3">{ev.line2}</span>
          </h2>
          <p className="mono mt-6 leading-[1.7] text-accent">{ev.kicker}</p>
          <p className="t-body mt-4 max-w-[40ch]">{ev.blurb}</p>

          <div className="mt-auto hidden pt-8 lg:block">
            <div className="flex items-end gap-3">
              <span className="num text-[4.4rem] leading-[0.78] text-text-1">{pad(active + 1)}</span>
              <span className="mono pb-0.5 text-text-3">/ {pad(total)}</span>
            </div>
            <div className="mt-4 h-[1.5rem] overflow-hidden" aria-live="off">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="truncate text-[0.98rem] text-text-2"
                >
                  {ev.photos[active]}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex items-end gap-1">
              {photos.map((ph) => (
                <button
                  key={ph.key}
                  type="button"
                  onClick={() => jump(ph.p)}
                  aria-label={`Go to photo ${ph.p + 1}: ${ph.caption}`}
                  aria-current={ph.p === active}
                  className={`group flex h-9 w-3.5 items-end justify-center rounded-sm ${outline}`}
                >
                  <span
                    className={`w-[3px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      ph.p === active
                        ? "h-9 bg-text-1"
                        : "h-3.5 bg-text-3/45 group-hover:h-5 group-hover:bg-text-3"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pb-[clamp(72px,12vh,150px)] lg:pt-[132px]">
          <div className="sticky top-[84px] z-30 mb-6 lg:hidden">
            <div className="flex items-center justify-between gap-4 rounded-full border border-black/[0.08] bg-white/80 px-4 py-2.5 shadow-[0_10px_30px_-18px_rgba(17,17,16,0.4)] backdrop-blur-xl">
              <span className="mono truncate text-text-1">{ev.short}</span>
              <span className="mono-sm shrink-0 text-text-3">
                {pad(active + 1)}/{pad(total)}
              </span>
            </div>
          </div>
          <div className="space-y-[clamp(26px,5vw,68px)]">
            {photos.map((ph) => (
              <FocusPhoto
                key={ph.key}
                photo={ph}
                total={total}
                eventName={ev.short}
                onActive={setActive}
                onOpen={onOpen}
              />
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

const roundBtn = `flex h-[46px] w-[46px] items-center justify-center rounded-full border border-line text-[17px] text-text-1 transition-colors duration-200 hover:border-text-3 ${outline}`;

function Lightbox({
  index,
  morph,
  onClose,
  onStep,
}: {
  index: number;
  /** true until the first prev/next: the frame is still the thumbnail it grew out of */
  morph: boolean;
  onClose: () => void;
  onStep: (d: 1 | -1) => void;
}) {
  const photo = flat[index];
  const ev = galleryEvents[photo.e];
  const dialog = useRef<HTMLDivElement>(null);
  const [sharp, setSharp] = useState(-1);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "Tab") {
        const els = dialog.current?.querySelectorAll<HTMLElement>("button");
        if (!els?.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${ev.short}: ${photo.caption}`}
      className="ink-scope fixed inset-0 z-[70] flex flex-col text-text-1"
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        {...fade}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-canvas"
      />

      <motion.div
        {...fade}
        transition={{ duration: 0.3 }}
        className="relative flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-6"
      >
        <p className="mono truncate text-text-2">{ev.short}</p>
        <button type="button" data-close onClick={onClose} aria-label="Close photo" className={roundBtn}>
          ✕
        </button>
      </motion.div>

      <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-8">
        <motion.div
          key={morph ? "morph" : photo.key}
          layoutId={morph ? photo.key : undefined}
          initial={morph ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ borderRadius: 17 }}
          className={`pointer-events-auto relative w-full overflow-hidden bg-surface ${
            photo.portrait
              ? "aspect-[2/3] max-w-[calc((100dvh-200px)*2/3)]"
              : "aspect-[3/2] max-w-[min(1500px,calc((100dvh-200px)*1.5))]"
          }`}
        >
          {/* the already-cached thumbnail carries the morph; the full frame fades in over it */}
          <Image src={photo.src} alt="" fill sizes={THUMB_SIZES} className="object-cover" />
          <Image
            src={photo.src}
            alt={`${ev.short}: ${photo.caption}`}
            fill
            sizes="100vw"
            onLoad={() => setSharp(index)}
            className={`object-cover transition-opacity duration-300 ${sharp === index ? "opacity-100" : "opacity-0"}`}
          />
        </motion.div>
      </div>

      <motion.div
        {...fade}
        transition={{ duration: 0.3 }}
        className="relative flex items-center justify-between gap-5 px-5 pb-6 sm:px-8 sm:pb-7"
      >
        <div className="min-w-0">
          <p className="truncate text-[1rem] text-text-1">{photo.caption}</p>
          <p className="mono-sm mt-1.5 text-text-3">
            {pad(index + 1)} / {pad(flat.length)}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => onStep(-1)} aria-label="Previous photo" className={roundBtn}>
            ←
          </button>
          <button type="button" onClick={() => onStep(1)} aria-label="Next photo" className={roundBtn}>
            →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<{ index: number; morph: boolean } | null>(null);

  const onOpen = useCallback(
    (key: string) => setOpen({ index: flat.findIndex((f) => f.key === key), morph: true }),
    [],
  );
  const onClose = useCallback(() => setOpen(null), []);
  const onStep = useCallback(
    (d: 1 | -1) =>
      setOpen((o) => o && { index: (o.index + d + flat.length) % flat.length, morph: false }),
    [],
  );

  return (
    <>
      {galleryEvents.map((ev, i) => (
        <EventSection key={ev.id} ev={ev} index={i} onOpen={onOpen} />
      ))}
      <AnimatePresence>
        {open && <Lightbox index={open.index} morph={open.morph} onClose={onClose} onStep={onStep} />}
      </AnimatePresence>
    </>
  );
}
