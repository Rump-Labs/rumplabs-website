"use client";

import { BrandLogo } from "@/components/BrandLogo";
import { CheckoutButton, CheckoutSuccessPayload } from "@/components/CheckoutButton";
import { SheerIDModal } from "@/components/SheerIDModal";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

interface QuoteResponse {
  countryCode: string | null;
  classification: "domestic" | "international";
  amountDueINR: number;
  domesticINR: number;
  studentINR: number;
  internationalINR: number;
  studentDiscountApplied: boolean;
  usdToInrRate: number;
  reason: string;
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const lectures = [
  { num: 1, title: "Introduction to Blockchains" },
  { num: 2, title: "Math Primer: Elliptic Curve Cryptography" },
  { num: 3, title: "Basics of Cryptography Primer: Public Key Crypto, Signatures, Commitment Scheme" },
  { num: 4, title: "Introduction to ZKPs: Schnorr Protocol, BulletProofs" },
  { num: 5, title: "Applications of ZKPs in Blockchains" },
  { num: 6, title: "Polynomial Commitment Schemes: KZG, Plonkish, FRI" },
  { num: 7, title: "Zk-SNARKs Primer: Groth 16, Sonic, Marlin, PLONK and its variants" },
  { num: 8, title: "Zk-STARKs" },
  { num: 9, title: "Recursive Proof Systems: Mina, IVC, Halo2, Nova, SuperNova, HyperNova, CCS" },
  { num: 10, title: "Lookup Arguments: Plookup, LogUp, CQ, Lasso, Jolt" },
  { num: 11, title: "Sum Check Protocols: LFKN, GKR, Optimisations" },
  { num: 12, title: "Zk-Rollups - Zk-Sync Era, Scroll, Polygon (Zero, EVM), StarkNet" },
  { num: 13, title: "Zk-EVM - Hermez, Sovereign Labs" },
  { num: 14, title: "Zk-VM - Risc0, Succinct SP1, Polygon Miden" },
  { num: 15, title: "Zk-Bridges - nil foundation, Succinct Labs" },
  { num: 16, title: "Privacy-Preserving Smart Contracts with Solidity - Aztec" },
  { num: 17, title: "Writing Circuits with DSLs - Leo, Zokrates, Circom, Halo2, Noir" },
  { num: 18, title: "Starkware Ecosystem - StarkNet, StarkEx, Cairo" },
  { num: 19, title: "Project Presentations" },
  { num: 20, title: "Project Presentations" },
];

const courseHighlights = [
  { icon: "📅", title: "10 Week Course", desc: "Comprehensive structured learning" },
  { icon: "🎓", title: "2 Lectures per Week", desc: "Saturdays & Sundays, 11 AM - 1 PM" },
  { icon: "⏱️", title: "2 Hours Each Lecture", desc: "In-depth coverage of topics" },
  { icon: "👥", title: "Group Projects", desc: "Collaborative hands-on experience" },
  { icon: "🎤", title: "Project Presentations", desc: "Showcase your work at the end" },
  { icon: "📜", title: "Certificates", desc: "Official course completion certificate" },
  { icon: "💼", title: "Job Referrals", desc: "Potential crypto/blockchain job referrals" },
  { icon: "🚀", title: "Internship Opportunities", desc: "At Rump Labs based on performance" },
  { icon: "📹", title: "Session Recordings", desc: "Never miss a class—recordings available" },
];

export default function Home() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [studentVerified, setStudentVerified] = useState(false);
  const [sheerIdOpen, setSheerIdOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
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
        setStudentVerified(data.studentDiscountApplied);
      } catch (error) {
        console.error(error);
        setQuoteError("Could not determine pricing from IP. Using fallback values.");
        setQuote({
          countryCode: null,
          classification: "international",
          amountDueINR: 16600,
          domesticINR: 10000,
          studentINR: 5000,
          internationalINR: 16600,
          studentDiscountApplied: false,
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

  const studentEligible = quote?.classification === "domestic";
  const sheerIdConfigured = Boolean(process.env.NEXT_PUBLIC_SHEERID_PROGRAM_ID);

  const amountDueINR = useMemo(() => {
    if (!quote) {
      return 0;
    }

    if (quote.classification === "domestic") {
      return studentVerified ? quote.studentINR : quote.domesticINR;
    }

    return quote.internationalINR;
  }, [quote, studentVerified]);

  const formattedAmount = amountDueINR
    ? currencyFormatter.format(amountDueINR)
    : "--";

  const onPaymentSuccess = (response: CheckoutSuccessPayload) => {
    setAlert({
      type: "success",
      text: `Payment successful. Reference: ${response.razorpay_payment_id}`,
    });
  };

  const handleError = (message: string) => {
    setAlert({ type: "error", text: message });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const formValid =
    formData.name.trim().length > 2 &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.contact.trim().length >= 8;

  const scrollToEnroll = () => {
    const pricingElement = document.getElementById("pricing");
    pricingElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    pricingElement?.classList.add("ring-4", "ring-teal-400", "ring-opacity-70");
    setTimeout(() => {
      pricingElement?.classList.remove("ring-4", "ring-teal-400", "ring-opacity-70");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f525f] via-[#1d6c7a] to-[#2c8a91] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-8 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <BrandLogo size={56} />
          <div className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#syllabus" className="text-white/80 transition hover:text-white">Syllabus</a>
            <a href="#instructor" className="text-white/80 transition hover:text-white">Instructor</a>
          </div>
          <button
            onClick={scrollToEnroll}
            className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-2 text-sm font-bold text-slate-900 shadow-lg transition hover:shadow-xl hover:scale-105"
          >
            Enroll Now
          </button>
        </header>

        {/* Hero Section */}
        <section className="mt-16 text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-2 text-sm font-medium backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Starting January 2026
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-transparent">
              Rump Labs Gurukul
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/90 md:text-2xl font-light">
              Master Blockchain, Cryptography & Zero-Knowledge Proofs
            </p>
            <p className="mx-auto max-w-3xl text-base text-white/70 md:text-lg">
              No Pre-requisites. No Coding Knowledge Required. A comprehensive 10-week certification course to unlock your future career in Web3.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={scrollToEnroll}
                className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-8 py-4 text-base font-bold text-slate-900 shadow-xl transition hover:shadow-2xl hover:scale-105"
              >
                Secure Your Spot
              </button>
              <a
                href="https://wa.me/919007915334"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Course Highlights Grid */}
        <section className="mt-24">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">What You Get</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courseHighlights.map((highlight, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition hover:bg-white/15 hover:scale-105"
              >
                <div className="mb-3 text-4xl">{highlight.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-white">{highlight.title}</h3>
                <p className="text-sm text-white/70">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Syllabus Section */}
        <section id="syllabus" className="mt-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Complete Course Syllabus</h2>
            <p className="mb-8 text-center text-white/70">20 Lectures covering everything from basics to advanced ZK protocols</p>
            
            {/* Scrollable Timeline Container */}
            <div className="relative rounded-3xl bg-white/5 p-8 backdrop-blur-sm">
              {/* Gradient overlays for scroll indication */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#1d6c7a] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#1d6c7a] to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-12 w-full bg-gradient-to-t from-[#1d6c7a]/50 to-transparent md:hidden" />
              
              {/* Scrollable content */}
              <div className="relative max-h-[600px] overflow-y-auto pr-4 scrollbar-thin">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-cyan-400 to-emerald-400 opacity-30" />
                
                {/* Lectures */}
                <div className="relative space-y-6">
                  {lectures.map((lecture) => (
                    <div
                      key={lecture.num}
                      className="group relative flex gap-6 transition-all duration-300 hover:translate-x-2"
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-sm font-bold text-slate-900 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-emerald-400/50">
                          {lecture.num}
                        </div>
                        {/* Connecting line to card */}
                        <div className="absolute left-full top-1/2 h-0.5 w-6 -translate-y-1/2 bg-gradient-to-r from-cyan-400/50 to-transparent" />
                      </div>
                      
                      {/* Lecture card */}
                      <div className="flex-1 rounded-xl bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/15 group-hover:shadow-lg">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                                Lecture {lecture.num}
                              </span>
                              {lecture.num <= 4 && (
                                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                                  Foundations
                                </span>
                              )}
                              {lecture.num >= 5 && lecture.num <= 11 && (
                                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                                  Core ZK
                                </span>
                              )}
                              {lecture.num >= 12 && lecture.num <= 18 && (
                                <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-300">
                                  Applications
                                </span>
                              )}
                              {lecture.num >= 19 && (
                                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
                                  Projects
                                </span>
                              )}
                            </div>
                            <h3 className="text-base font-semibold leading-relaxed text-white transition-colors group-hover:text-cyan-100">
                              {lecture.title}
                            </h3>
                          </div>
                          <div className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                            <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Scroll hint */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50">
                <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span>Scroll to explore all lectures</span>
                <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section id="instructor" className="mt-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Meet Your Instructor</h2>
            <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-sm md:p-12">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                <div className="flex-shrink-0">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 p-1 shadow-xl">
                    <img
                      src="/image.png"
                      alt="Hridam Basu"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-2 text-2xl font-bold text-white">Hridam Basu</h3>
                  <p className="mb-4 text-lg text-emerald-300">Founder, Senior Cryptography Researcher & Engineer</p>
                  <div className="mb-4 space-y-2 text-sm text-white/80">
                    <p>Alumni: <span className="font-semibold text-white">Northeastern University (USA)</span> • <span className="font-semibold text-white">Jadavpur University</span></p>
                    <p>Cryptography and blockchain researcher with global perspective, pioneer in zero-knowledge proofs and next-gen Web3 solutions.</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                    <a
                      href="https://www.linkedin.com/in/hridam-basu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                    >
                      LinkedIn Profile
                    </a>
                    <a
                      href="https://github.com/hridambasu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://wa.me/919007915334"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/30"
                    >
                      WhatsApp: 9007915334
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment Section */}
        <section className="mt-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_1fr]">
            {/* Info Card */}
            <div className="flex flex-col justify-between rounded-3xl bg-white/10 p-8 backdrop-blur-sm lg:p-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  Course Details
                </div>
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  Transform Your Career in 10 Weeks
                </h2>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Duration:</strong> 10 weeks, 2 lectures per week</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Schedule:</strong> Saturdays & Sundays, 11 AM - 1 PM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Format:</strong> 2 hours per lecture with hands-on projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Certificate:</strong> Official completion certificate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Career Support:</strong> Job referrals & internship opportunities</span>
                  </li>
                </ul>
              </div>

              <dl className="mt-12 grid gap-6 text-sm text-white/80 md:grid-cols-3">
                <div>
                  <dt className="font-medium text-white">Domestic</dt>
                  <dd className="text-2xl font-bold text-emerald-300">₹{quote?.domesticINR.toLocaleString("en-IN") ?? "10,000"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-white">Student</dt>
                  <dd className="text-2xl font-bold text-cyan-300">₹{quote?.studentINR.toLocaleString("en-IN") ?? "5,000"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-white">International</dt>
                  <dd className="text-2xl font-bold text-white">
                    ₹{quote?.internationalINR.toLocaleString("en-IN") ?? "16,600"}
                    <span className="block text-xs text-white/60">≈ $200 @ ₹{quote?.usdToInrRate ?? 83}</span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Payment Form */}
            <section id="pricing" className="flex flex-col gap-6 rounded-3xl bg-white text-slate-900 shadow-2xl shadow-black/10 transition-all">
              <div className="space-y-2 rounded-t-3xl bg-gradient-to-r from-emerald-100 via-cyan-100 to-sky-100 px-8 py-6">
                <p className="text-sm font-semibold text-teal-800">
                  Course Enrollment
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-teal-900">{formattedAmount}</span>
                  <span className="text-sm text-slate-600">course fee</span>
                </div>
              </div>

              <form className="space-y-5 px-8 pb-8">
                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>
                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>
                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="contact">
                    Phone number
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    autoComplete="tel"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {studentEligible && (
                  <div className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/80 px-4 py-4 text-sm text-teal-900">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">Student discount available</p>
                        <p className="text-xs text-teal-700">
                          {sheerIdConfigured
                            ? `Verify a valid student ID to unlock ₹${quote?.studentINR.toLocaleString("en-IN") ?? "5,000"} pricing.`
                            : `Are you a student? Claim ₹${quote?.studentINR.toLocaleString("en-IN") ?? "5,000"} pricing.`}
                        </p>
                      </div>
                      {sheerIdConfigured ? (
                        <button
                          type="button"
                          onClick={() => setSheerIdOpen(true)}
                          className="rounded-full border border-teal-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal-700 transition hover:bg-teal-500 hover:text-white"
                        >
                          {studentVerified ? "✓ Verified" : "Verify now"}
                        </button>
                      ) : (
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={studentVerified}
                            onChange={(e) => setStudentVerified(e.target.checked)}
                            className="h-4 w-4 rounded border-teal-500 text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-xs font-semibold text-teal-700">I&apos;m a student</span>
                        </label>
                      )}
                    </div>
                    {studentVerified && (
                      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-teal-700">
                        {sheerIdConfigured ? "✓ SheerID verification captured" : "✓ Student discount applied"}
                      </p>
                    )}
                  </div>
                )}

                <CheckoutButton
                  amountINR={amountDueINR}
                  studentVerified={studentVerified}
                  customer={formData}
                  disabled={!formValid || !amountDueINR}
                  onSuccess={onPaymentSuccess}
                  onError={handleError}
                />

                <p className="text-xs text-slate-500">
                  By enrolling you agree to Rump Labs&apos; secure checkout. Razorpay processes the payment{sheerIdConfigured ? " while SheerID confirms eligibility" : ""}; no documents are stored on our servers.
                </p>
              </form>
            </section>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-white/10 pt-12 pb-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-4 font-semibold text-white">Contact</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p>WhatsApp: <a href="https://wa.me/919007915334" className="text-emerald-300 hover:underline">9007915334</a></p>
                <p>Starting: January 2026</p>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Instructor</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p><a href="https://www.linkedin.com/in/hridam-basu/" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:underline">LinkedIn Profile</a></p>
                <p><a href="https://github.com/hridambasu" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:underline">GitHub Profile</a></p>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Payment Security</h4>
              <p className="text-sm text-white/70">Razorpay processes payments securely. Supports cards, UPI, wallets, and international instruments.</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Course Format</h4>
              <p className="text-sm text-white/70">Live online sessions with recordings, hands-on projects, and lifetime access to course materials.</p>
            </div>
          </div>
          <div className="mt-12 text-center text-sm text-white/60">
            © 2025 Rump Labs. All rights reserved.
          </div>
        </footer>

        {alert && (
          <div
            className={`pointer-events-auto fixed bottom-6 left-1/2 z-40 w-[90%] max-w-md -translate-x-1/2 rounded-full px-6 py-3 text-sm font-medium shadow-lg ${alert.type === "success" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}
          >
            {alert.text}
          </div>
        )}
      </div>

      <SheerIDModal
        open={sheerIdOpen}
        onClose={() => setSheerIdOpen(false)}
        onVerified={() => setStudentVerified(true)}
      />
    </div>
  );
}
