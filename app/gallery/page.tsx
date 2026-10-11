import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/motion";
import { Badge, Heading, Shell } from "@/components/site/ui";
import { galleryCount, galleryEvents, galleryIntro } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Rump Labs in the room: photographs from IEM Impetus, the Times of India Teachers' Conclave and Calcutta <Hacks/>.",
  alternates: { canonical: "/gallery" },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main className="pt-[124px] sm:pt-[140px]">
        <Shell className="pb-[clamp(48px,6vw,84px)]">
          <Reveal>
            <Badge>{galleryIntro.badge}</Badge>
            <Heading line1={galleryIntro.line1} line2={galleryIntro.line2} className="mt-7" />
            <p className="t-lede mt-7 max-w-[52ch]">{galleryIntro.lede}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="mt-[clamp(40px,5vw,64px)] border-t border-line">
              {galleryEvents.map((ev, i) => (
                <li key={ev.id} className="border-b border-line">
                  <a
                    href={`#${ev.id}`}
                    className="group flex items-baseline gap-5 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
                  >
                    <span className="mono w-7 shrink-0 text-text-3">{pad(i + 1)}</span>
                    <span className="t-card flex-1 text-text-1 transition-colors duration-200 group-hover:text-accent">
                      {ev.short}
                    </span>
                    <span className="mono-sm hidden text-text-3 sm:inline">{ev.photos.length} photos</span>
                    <span
                      aria-hidden
                      className="text-text-3 transition-transform duration-[220ms] group-hover:translate-y-1 group-hover:text-text-1"
                    >
                      ↓
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="mono mt-5 text-text-3">{galleryCount} {galleryIntro.hint}</p>
          </Reveal>
        </Shell>

        <Gallery />
      </main>
      <Footer />
    </>
  );
}
