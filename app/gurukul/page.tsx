"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { CheckoutButton, CheckoutSuccessPayload } from "@/components/CheckoutButton";
import { GurukulFooter } from "@/components/site/GurukulFooter";
import { GurukulNav } from "@/components/site/GurukulNav";
import { Ticker } from "@/components/site/Ticker";
import { Reveal, ScrollText } from "@/components/site/motion";
import { Badge, Heading, Shell } from "@/components/site/ui";
import {
  GURUKUL_WHATSAPP,
  gDetails,
  gFields,
  gHero,
  gIncluded,
  gInstructor,
  gModules,
  gStatement,
  gTicker,
  type GField,
} from "@/lib/gurukul";

interface QuoteResponse {
  countryCode: string | null;
  classification: "domestic" | "international";
  amountDueINR: number;
  domesticINR: number;
  domesticListINR: number;
  internationalINR: number;
  usdToInrRate: number;
  reason: string;
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Resets the design tokens to the light palette so the enrolment card
 *  renders as a white panel inside the dark section around it. */
const LIGHT_SCOPE = {
  "--canvas": "#ffffff",
  "--surface": "#ffffff",
  "--text-1": "#14191b",
  "--text-2": "#55605f",
  "--text-3": "#8a9391",
  "--line": "rgb(20 25 27 / 0.12)",
  "--line-2": "rgb(20 25 27 / 0.07)",
  "--accent": "#0f525f",
  "--focus": "#0f525f",
} as React.CSSProperties;

const inputCls =
  "focus-ring w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-[0.95rem] text-text-1 placeholder:text-text-3 transition-colors duration-200 hover:border-text-3 focus:border-text-3 focus:outline-none";

export default function GurukulPage() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    profession: "",
    university: "",
    major: "",
    currentCompany: "",
    twitterHandle: "",
    interestReason: "",
    knowledgeLevel: "",
    telegramId: "",
    linkedinId: "",
    githubId: "",
  });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoadingQuote(true);
        const response = await fetch("/api/quote", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to fetch pricing.");
        }
        const data: QuoteResponse = await response.json();
        setQuote(data);
      } catch (error) {
        console.error(error);
        setQuoteError("Could not determine pricing from your location. Showing standard rates.");
        setQuote({
          countryCode: null,
          classification: "international",
          amountDueINR: 16600,
          domesticINR: 20000,
          domesticListINR: 25000,
          internationalINR: 16600,
          usdToInrRate: 83,
          reason: "Fallback pricing.",
        });
      } finally {
        setLoadingQuote(false);
      }
    };

    void fetchQuote();
  }, []);

  useEffect(() => {
    if (!alert) {
      return;
    }
    const timeout = window.setTimeout(() => setAlert(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [alert]);

  const earlyBird = quote?.classification === "domestic";

  const amountDueINR = useMemo(() => {
    if (!quote) {
      return 0;
    }
    return quote.classification === "domestic" ? quote.domesticINR : quote.internationalINR;
  }, [quote]);

  const formattedAmount = amountDueINR ? currencyFormatter.format(amountDueINR) : "—";

  const onPaymentSuccess = (response: CheckoutSuccessPayload) => {
    setAlert({
      type: "success",
      text: `Payment successful. Reference: ${response.razorpay_payment_id}`,
    });
  };

  const handleError = (message: string) => setAlert({ type: "error", text: message });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const formValid =
    formData.name.trim().length > 2 &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.contact.trim().length >= 8 &&
    formData.profession !== "" &&
    formData.university.trim().length > 0 &&
    formData.major.trim().length > 0 &&
    formData.interestReason.trim().length > 0 &&
    formData.knowledgeLevel !== "" &&
    formData.telegramId.trim().length > 0 &&
    formData.linkedinId.trim().length > 0 &&
    formData.githubId.trim().length > 0;

  const renderField = (f: GField) => {
    const value = formData[f.name as keyof typeof formData];
    const label = (
      <label className="mono block text-text-3" htmlFor={f.name}>
        {f.label}
        {f.required && <span className="pl-1 text-accent">*</span>}
      </label>
    );

    return (
      <div key={f.name} className={f.full ? "sm:col-span-2" : undefined}>
        {label}
        <div className="mt-2.5">
          {f.type === "select" ? (
            <select
              id={f.name}
              name={f.name}
              value={value}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Select…</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : f.type === "textarea" ? (
            <textarea
              id={f.name}
              name={f.name}
              value={value}
              onChange={handleChange}
              rows={4}
              placeholder={f.placeholder}
              className={`${inputCls} resize-none`}
            />
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type ?? "text"}
              value={value}
              onChange={handleChange}
              placeholder={f.placeholder}
              className={inputCls}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <GurukulNav />

      <main>
        {/* Hero */}
        <section className="pt-[124px] sm:pt-[140px]">
          <Shell>
            <Reveal>
              <Badge>{gHero.badge}</Badge>
              <h1 className="display mt-8 text-[clamp(2.4rem,6.4vw,5.4rem)] tracking-[-0.03em] text-text-1">
                {gHero.line1}
                <br />
                {gHero.line2}
                <br />
                <span className="text-text-3">{gHero.line3}</span>
              </h1>

              <div className="mt-[clamp(36px,4vw,56px)] grid gap-10 border-t border-line pt-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                <p className="t-lede max-w-[52ch]">{gHero.sub}</p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
                  <a
                    href="#enrol"
                    className="focus-ring group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full bg-text-1 px-8 text-[15px] font-medium text-canvas transition-all duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(20,25,27,0.5)]"
                  >
                    {gHero.cta}
                    <span
                      aria-hidden
                      className="transition-transform duration-[220ms] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                  <a
                    href={GURUKUL_WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex h-[56px] items-center justify-center rounded-full border border-line px-7 text-[15px] font-medium text-text-1 transition-all duration-[220ms] hover:-translate-y-0.5 hover:border-text-3"
                  >
                    {gHero.ctaAlt}
                  </a>
                </div>
              </div>

              <p className="mt-6 text-[0.92rem] leading-[1.5] text-text-3">{gHero.ctaSub}</p>
            </Reveal>
          </Shell>

          <Shell className="mt-[clamp(56px,7vw,96px)]">
            <Reveal delay={0.06}>
              <dl className="grid overflow-hidden rounded-[26px] border border-line-2 bg-panel shadow-soft sm:grid-cols-3">
                {gHero.stats.map((s, i) => (
                  <div
                    key={s.k}
                    className={`px-7 py-8 ${i > 0 ? "border-t border-line-2 sm:border-l sm:border-t-0" : ""}`}
                  >
                    <dt className="num text-[clamp(1.7rem,2.6vw,2.3rem)] leading-none text-text-1">
                      {s.k}
                    </dt>
                    <dd className="t-body mt-3 text-[0.94rem]">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Shell>
        </section>

        <Ticker items={gTicker} />

        {/* Syllabus */}
        <section id="syllabus" className="scroll-mt-28 py-[clamp(80px,10vw,148px)]">
          <Shell>
            <Reveal>
              <Badge>The syllabus</Badge>
              <Heading line1="Eight modules." line2="Fundamentals to circuits." className="mt-7" />
              <p className="t-lede mt-7">
                Zero-knowledge proofs in blockchain, theory and applications — a hands-on route from
                first principles to the systems running in production today.
              </p>
            </Reveal>

            <div className="mt-[clamp(44px,5vw,72px)] grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {gModules.map((m, i) => (
                <Reveal key={m.n} delay={Math.min(i, 5) * 0.05} className="h-full">
                  <article className="panel shadow-soft group flex h-full flex-col p-7 transition-transform duration-[500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className="mono text-text-3">{m.n}</span>
                      <span
                        aria-hidden
                        className="h-px w-6 bg-line transition-colors duration-200 group-hover:bg-accent"
                      />
                    </div>
                    <h3 className="t-card mt-7 text-text-1">{m.title}</h3>
                    <p className="t-body mt-4 text-[0.92rem]">{m.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* Statement */}
        <section className="teal-scope bg-canvas py-[clamp(88px,11vw,164px)] text-text-1">
          <Shell>
            <Reveal>
              <span className="mono inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-text-2">
                <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent-soft" />
                {gStatement.badge}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display t-block mt-10 text-text-1">
                {gStatement.line1}
                <br />
                {gStatement.line2}
                <br />
                <span className="text-text-3">{gStatement.line3}</span>
              </h2>
            </Reveal>
            <div className="mt-[clamp(48px,6vw,80px)] grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
              {[gStatement.left, gStatement.right].map((col) => (
                <div key={col.label}>
                  <p className="mono text-text-3">{col.label}</p>
                  <ScrollText
                    text={col.body}
                    className="mt-5 text-[clamp(1rem,1.3vw,1.12rem)] leading-[1.6] text-text-1"
                  />
                </div>
              ))}
            </div>
          </Shell>
        </section>

        {/* What you get */}
        <section id="included" className="scroll-mt-28 py-[clamp(80px,10vw,148px)]">
          <Shell>
            <Reveal>
              <Badge>What you get</Badge>
              <Heading line1="Nine things" line2="in the box." className="mt-7" />
            </Reveal>
            <div className="mt-[clamp(44px,5vw,72px)] grid gap-px overflow-hidden rounded-[26px] border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-3">
              {gIncluded.map((it, i) => (
                <Reveal key={it.k} delay={Math.min(i, 5) * 0.05} className="bg-panel">
                  <div className="h-full px-7 py-8">
                    <p className="mono text-text-3">{String(i + 1).padStart(2, "0")}</p>
                    <p className="t-card mt-5 text-[1rem] text-text-1">{it.k}</p>
                    <p className="t-body mt-3 text-[0.9rem]">{it.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* Instructor */}
        <section id="instructor" className="scroll-mt-28 pb-[clamp(80px,10vw,148px)]">
          <Shell>
            <Reveal>
              <Badge>{gInstructor.badge}</Badge>
              <Heading line1={gInstructor.name} className="mt-7" />
              <p className="t-lede mt-5 max-w-[56ch]">{gInstructor.role}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="panel shadow-soft mt-[clamp(40px,5vw,64px)] overflow-hidden">
                <div className="grid gap-10 p-7 md:p-10 lg:grid-cols-[280px_1fr] lg:gap-14">
                  <div>
                    <div className="overflow-hidden rounded-[22px] border border-line-2">
                      <Image
                        src={gInstructor.photo}
                        alt={gInstructor.name}
                        width={404}
                        height={404}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {gInstructor.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mono focus-ring rounded-full border border-line px-3 py-1.5 text-text-2 transition-colors duration-200 hover:border-text-3 hover:text-text-1"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    {gInstructor.bio.map((p) => (
                      <p key={p} className="t-body mb-4 text-[1rem] last:mb-0">
                        {p}
                      </p>
                    ))}

                    <div className="mt-9 grid gap-px overflow-hidden rounded-[20px] border border-line-2 bg-line-2">
                      {gInstructor.credentials.map((c) => (
                        <div key={c.k} className="grid gap-1.5 bg-panel px-6 py-5 sm:grid-cols-[110px_1fr] sm:gap-6">
                          <p className="mono pt-[0.25em] text-text-3">{c.k}</p>
                          <p className="text-[0.92rem] leading-[1.55] text-text-1">{c.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* Enrol */}
        <section id="enrol" className="ink-scope scroll-mt-28 bg-canvas py-[clamp(88px,11vw,164px)] text-text-1">
          <Shell>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <Reveal>
                  <span className="mono inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-text-2">
                    <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent-soft" />
                    Enrolment
                  </span>
                  <h2 className="display t-section mt-7 text-text-1">
                    Ten weeks.
                    <br />
                    <span className="text-text-3">Starting January.</span>
                  </h2>

                  <div className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line">
                    {gDetails.map((d) => (
                      <div key={d.k} className="grid gap-1.5 bg-canvas px-6 py-5 sm:grid-cols-[130px_1fr] sm:gap-5">
                        <p className="mono pt-[0.25em] text-text-3">{d.k}</p>
                        <p className="text-[0.92rem] leading-[1.55] text-text-1">{d.v}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.08}>
                <div style={LIGHT_SCOPE} className="rounded-[30px] border border-line-2 bg-canvas p-7 text-text-1 shadow-soft md:p-9">
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="mono text-text-3">Course fee</p>
                        {earlyBird && !loadingQuote && (
                          <span className="mono rounded-full bg-[color-mix(in_srgb,var(--teal)_12%,transparent)] px-3 py-1 text-teal">
                            Early bird discount
                          </span>
                        )}
                      </div>
                      <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        {earlyBird && !loadingQuote && quote && (
                          <s className="num text-[clamp(1.2rem,2vw,1.5rem)] leading-none text-text-3">
                            <span className="sr-only">Was </span>
                            {currencyFormatter.format(quote.domesticListINR)}
                          </s>
                        )}
                        <span className="num text-[clamp(2.2rem,4vw,2.9rem)] leading-none text-text-1">
                          {earlyBird && !loadingQuote && <span className="sr-only">Now </span>}
                          {loadingQuote ? "…" : formattedAmount}
                        </span>
                      </p>
                    </div>
                    {quote && !loadingQuote && (
                      <p className="mono text-text-3">
                        {quote.classification === "domestic" ? "India" : "International"}
                      </p>
                    )}
                  </div>

                  {quoteError && (
                    <p className="mt-5 rounded-2xl bg-[color-mix(in_srgb,var(--text-1)_5%,transparent)] px-4 py-3 text-[0.85rem] leading-[1.5] text-text-2">
                      {quoteError}
                    </p>
                  )}

                  <form className="mt-7 grid gap-5 sm:grid-cols-2">
                    {gFields.map(renderField)}
                  </form>

                  <div className="mt-7">
                    <CheckoutButton
                      amountINR={amountDueINR}
                      customer={formData}
                      disabled={!formValid || !amountDueINR}
                      onSuccess={onPaymentSuccess}
                      onError={handleError}
                    />
                  </div>

                  <p className="mt-5 text-[0.8rem] leading-[1.55] text-text-3">
                    By enrolling you agree to Rump Labs&apos; secure checkout. Razorpay processes the
                    payment; no card details are stored on our servers.
                  </p>
                </div>
              </Reveal>
            </div>
          </Shell>
        </section>
      </main>

      <GurukulFooter />

      {alert && (
        <div
          role="status"
          className={`fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-full px-6 py-3.5 text-center text-[0.9rem] font-medium shadow-[0_18px_44px_-18px_rgba(0,0,0,0.5)] ${
            alert.type === "success" ? "bg-[color:var(--teal)] text-white" : "bg-[#b4402f] text-white"
          }`}
        >
          {alert.text}
        </div>
      )}
    </>
  );
}
