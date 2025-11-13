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

const courseModules = [
  {
    title: "Build Strong Foundations",
    description: "Learn blockchain basics, cryptographic primitives, and the math behind elliptic curves and commitments.",
    icon: "🔐",
  },
  {
    title: "Understand Core ZKP Protocols",
    description: "Explore interactive proofs like Schnorr and Bulletproofs, and see how privacy is achieved without revealing data.",
    icon: "🔒",
  },
  {
    title: "Dive into Modern ZK Systems",
    description: "Master leading proof systems — Groth16, PLONK, STARKs, and recursive frameworks like Halo2, Nova, and SuperNova.",
    icon: "⚡",
  },
  {
    title: "Learn Cutting-Edge Techniques",
    description: "Grasp the concepts of lookup arguments, sum-check protocols, and polynomial commitments like KZG.",
    icon: "🧠",
  },
  {
    title: "Apply ZK to Real-World Blockchain Projects",
    description: "Understand ZK-Rollups, ZK-EVMs, ZK-VMs, and ZK-Bridges, with case studies from ZkSync, StarkNet, Polygon, and Succinct Labs.",
    icon: "🌐",
  },
  {
    title: "Get Practical with Tools & DSLs",
    description: "Write your own ZK circuits using frameworks like Circom, Halo2, Noir, Leo, and Zokrates.",
    icon: "🛠️",
  },
  {
    title: "Build Privacy-Preserving Smart Contracts",
    description: "Learn to create confidential applications on Ethereum using Aztec and similar ecosystems.",
    icon: "📜",
  },
  {
    title: "Showcase Your Work",
    description: "Conclude with hands-on project presentations, demonstrating a full ZK-based blockchain application.",
    icon: "🎯",
  },
];

const courseHighlights = [
  { icon: "📅", title: "10 Week Course", desc: "Comprehensive structured learning" },
  { icon: "🎓", title: "2 Lectures per Week", desc: "Saturdays & Sundays, 11 AM - 1 PM IST" },
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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
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
        <header className="sticky top-0 z-50 flex items-center justify-between rounded-2xl bg-white/5 px-6 py-4 backdrop-blur-md transition-all lg:px-8">
          <BrandLogo size={140} />
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

        {/* Course Modules Section */}
        <section id="syllabus" className="mt-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">What You'll Learn</h2>
              <p className="mx-auto max-w-3xl text-lg text-white/70">
                Zero-Knowledge Proofs in Blockchain: Theory and Applications
              </p>
              <p className="mx-auto mt-2 max-w-3xl text-base text-white/60">
                A hands-on journey from blockchain fundamentals to advanced ZK systems powering the next generation of privacy and scalability.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {courseModules.map((module, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 text-3xl backdrop-blur-sm">
                      {module.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{module.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/80">
                    {module.description}
                  </p>
                </div>
              ))}
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
                  <div className="mb-6 space-y-3 text-sm leading-relaxed text-white/80">
                    <p>
                      Hridam Basu is the <span className="font-semibold text-white">Founder of Rump Labs</span>. He has over a decade of experience in <span className="font-semibold text-white">Cryptography Research and Engineering in the Blockchain industry</span>. He has previously worked with leading Web3 projects such as <span className="font-semibold text-white">Ethereum Foundation&apos;s Privacy and Scaling Explorations (PSE) team, Polygon, Aztec, Findora, Circularise, and Bolt Labs</span>, building advanced systems based on <span className="font-semibold text-white">zero-knowledge proofs</span> and <span className="font-semibold text-white">secure multiparty computation</span>.
                    </p>
                    <p>
                      His work spans confidential transactions, privacy-preserving identity solutions, supply chain traceability, and blockchain gaming wallets. Hridam has also held research roles at <span className="font-semibold text-white">AT&amp;T Labs, NTT Labs</span>, and <span className="font-semibold text-white">TCS Labs</span>, and has been an invited speaker at international conferences like <span className="font-semibold text-white">Devcon</span> and universities worldwide.
                    </p>
                    <p>
                      He holds an <span className="font-semibold text-white">M.S. in Computer Science</span> from <span className="font-semibold text-white">Northeastern University, Boston</span>, and a <span className="font-semibold text-white">B.E. in Information Technology</span> from <span className="font-semibold text-white">Jadavpur University, Kolkata</span>.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                    <a
                      href="https://www.linkedin.com/in/hridam-basu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/hridambasu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                      aria-label="GitHub"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://t.me/hridambasu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                      aria-label="Telegram"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      <span>Telegram</span>
                    </a>
                    <a
                      href="https://x.com/hridambasu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                      aria-label="X (Twitter)"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>X</span>
                    </a>
                    <a
                      href="https://wa.me/919007915334"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/30"
                      aria-label="WhatsApp"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>WhatsApp</span>
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
                    <span><strong className="text-white">Schedule:</strong> Saturdays & Sundays, 11 AM - 1 PM IST</span>
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
                    Name <span className="text-rose-500">*</span>
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
                    Email ID <span className="text-rose-500">*</span>
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
                    Phone Number/WhatsApp <span className="text-rose-500">*</span>
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

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="profession">
                    Profession <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="">Select profession</option>
                    <option value="Student">Student</option>
                    <option value="Industry Professional">Industry Professional</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="university">
                    University/College <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="university"
                    name="university"
                    type="text"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="Your university or college name"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="major">
                    Major <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="major"
                    name="major"
                    type="text"
                    value={formData.major}
                    onChange={handleChange}
                    placeholder="Your field of study"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="currentCompany">
                    Current Company
                  </label>
                  <input
                    id="currentCompany"
                    name="currentCompany"
                    type="text"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    placeholder="Your current company (if applicable)"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="twitterHandle">
                    Twitter/X Handle
                  </label>
                  <input
                    id="twitterHandle"
                    name="twitterHandle"
                    type="text"
                    value={formData.twitterHandle}
                    onChange={handleChange}
                    placeholder="@yourhandle"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="interestReason">
                    Why are you interested in this course? <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="interestReason"
                    name="interestReason"
                    value={formData.interestReason}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us why you want to join this course..."
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 resize-none"
                  />
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="knowledgeLevel">
                    Assess your Blockchain/Cryptography Knowledge <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="knowledgeLevel"
                    name="knowledgeLevel"
                    value={formData.knowledgeLevel}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="">Select your level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="telegramId">
                    Telegram ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="telegramId"
                    name="telegramId"
                    type="text"
                    value={formData.telegramId}
                    onChange={handleChange}
                    placeholder="@yourtelegram"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="linkedinId">
                    LinkedIn ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="linkedinId"
                    name="linkedinId"
                    type="text"
                    value={formData.linkedinId}
                    onChange={handleChange}
                    placeholder="linkedin.com/in/yourprofile"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="githubId">
                    GitHub ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="githubId"
                    name="githubId"
                    type="text"
                    value={formData.githubId}
                    onChange={handleChange}
                    placeholder="github.com/yourusername"
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
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hridam.basu@gmail.com"
                  className="flex items-center gap-2 text-sm text-white/70 transition hover:text-emerald-300"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  <span>hridam.basu@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/919007915334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 transition hover:text-emerald-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Connect</h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/hridam-basu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/hridambasu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/hridambasu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Telegram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/hridambasu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="X (Twitter)"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
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
