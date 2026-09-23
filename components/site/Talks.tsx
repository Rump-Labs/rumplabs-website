"use client";

import Image from "next/image";
import { useState } from "react";
import { talks } from "@/lib/content";
import { Reveal } from "./motion";
import { Badge, Heading, Shell } from "./ui";

function TalkCard({ talk, i }: { talk: (typeof talks.items)[number]; i: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Reveal delay={i * 0.06} className="h-full">
      <div className="panel shadow-soft flex h-full flex-col overflow-hidden">
        <div className="relative aspect-video w-full overflow-hidden bg-ink">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${talk.id}?autoplay=1&rel=0`}
              title={talk.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play: ${talk.title}`}
              className="focus-ring group absolute inset-0 h-full w-full"
            >
              <Image
                src={`https://i.ytimg.com/vi/${talk.id}/hqdefault.jpg`}
                alt=""
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="scale-[1.02] object-cover transition-transform duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.08]"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(10,12,12,0.55)_100%)]" />
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
              >
                <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-ink" />
              </span>
              <span className="mono-sm absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-white backdrop-blur">
                {talk.venue}
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="t-card text-text-1">{talk.title}</h3>
          <p className="mono-sm mt-3 text-text-3">{talk.speaker}</p>
          <div className="mt-auto pt-6">
            <a
              href={talk.href}
              target="_blank"
              rel="noreferrer"
              className="mono-sm focus-ring text-text-1 underline decoration-line underline-offset-4 transition-colors duration-200 hover:decoration-accent"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Talks() {
  return (
    <section id="talks" className="scroll-mt-28 pb-[clamp(80px,10vw,148px)]">
      <Shell>
        <Reveal>
          <Badge>{talks.badge}</Badge>
          <Heading line1={talks.line1} line2={talks.line2} className="mt-7" />
          <p className="t-lede mt-6 max-w-[62ch]">{talks.lede}</p>
        </Reveal>

        <div className="mt-[clamp(44px,5vw,72px)] grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {talks.items.map((t, i) => (
            <TalkCard key={t.id} talk={t} i={i} />
          ))}
        </div>
      </Shell>
    </section>
  );
}
