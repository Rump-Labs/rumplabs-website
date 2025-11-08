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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f525f] via-[#1d6c7a] to-[#2c8a91] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 lg:px-12">
        <header className="flex items-center justify-between">
          <BrandLogo size={56} />
          <div className="hidden gap-6 text-sm font-medium md:flex">
            <span className="text-white/80">Eligibility-first onboarding</span>
            <span className="text-white/80">Global-ready payments</span>
          </div>
          <a
            href="#pricing"
            className="hidden rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 md:inline-flex"
          >
            View Pricing
          </a>
        </header>

        <main className="mt-14 grid flex-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          <section className="flex flex-col justify-between rounded-3xl bg-white/10 p-8 backdrop-blur-sm lg:p-12">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/80">
                Verified access • Razorpay{sheerIdConfigured ? " + SheerID" : ""}
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                Accept payments with built-in eligibility checks.
              </h1>
              <p className="max-w-xl text-base text-white/80 md:text-lg">
                Rump Labs Payment Desk pairs Razorpay checkout{sheerIdConfigured ? " with SheerID student verification" : ""} so you can offer instant discounts to eligible learners while keeping global customers on a single streamlined flow.
              </p>
            </div>

            <dl className="mt-12 grid gap-6 text-sm text-white/80 md:grid-cols-3">
              <div>
                <dt className="font-medium text-white">Domestic pricing</dt>
                <dd>₹{quote?.domesticINR.toLocaleString("en-IN") ?? "10,000"}</dd>
              </div>
              <div>
                <dt className="font-medium text-white">Student offer</dt>
                <dd>₹{quote?.studentINR.toLocaleString("en-IN") ?? "5,000"}</dd>
              </div>
              <div>
                <dt className="font-medium text-white">International</dt>
                <dd>
                  ₹{quote?.internationalINR.toLocaleString("en-IN") ?? "16,600"}
                  <span className="block text-xs text-white/60">≈ $200 @ ₹{quote?.usdToInrRate ?? 83}</span>
                </dd>
              </div>
            </dl>
          </section>

          <section id="pricing" className="flex flex-col gap-6 rounded-3xl bg-white text-slate-900 shadow-2xl shadow-black/10">
            <div className="space-y-2 rounded-t-3xl bg-gradient-to-r from-emerald-100 via-cyan-100 to-sky-100 px-8 py-6">
              <p className="text-sm font-semibold text-teal-800">
                {loadingQuote ? "Detecting your region…" : quote?.classification === "domestic" ? "India pricing" : "International pricing"}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-teal-900">{formattedAmount}</span>
                <span className="text-sm text-slate-600">due today</span>
              </div>
              {quote && (
                <p className="text-xs text-slate-600">
                  {quote.reason}
                </p>
              )}
              {quoteError && (
                <p className="text-xs font-medium text-rose-600">{quoteError}</p>
              )}
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
                  placeholder="Priya Sharma"
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
                  placeholder="you@rumplabs.com"
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
                      <p className="font-semibold">Student discount</p>
                      <p className="text-xs text-teal-700">
                        {sheerIdConfigured
                          ? `Verify a valid student ID with SheerID to unlock ₹${quote?.studentINR.toLocaleString("en-IN") ?? "5,000"} pricing.`
                          : `Are you a student? Claim ₹${quote?.studentINR.toLocaleString("en-IN") ?? "5,000"} pricing. (SheerID verification not configured)`}
                      </p>
                    </div>
                    {sheerIdConfigured ? (
                      <button
                        type="button"
                        onClick={() => setSheerIdOpen(true)}
                        className="rounded-full border border-teal-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal-700 transition hover:bg-teal-500 hover:text-white"
                      >
                        {studentVerified ? "Verified" : "Verify now"}
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
                By continuing you agree to Rump Labs&apos; secure checkout. Razorpay processes the payment{sheerIdConfigured ? " while SheerID confirms eligibility" : ""}; no documents are stored on our servers.
              </p>
            </form>
          </section>
        </main>

        <footer className="mt-12 grid gap-4 text-xs text-white/70 md:grid-cols-3">
          {sheerIdConfigured && (
            <div>
              <p className="font-semibold text-white">Instant decisions</p>
              <p>SheerID runs verification in real time so eligible students see their discount immediately.</p>
            </div>
          )}
          <div>
            <p className="font-semibold text-white">Razorpay flexibility</p>
            <p>Supports cards, UPI, wallets, and international instruments with one integration.</p>
          </div>
          <div>
            <p className="font-semibold text-white">Human-centered design</p>
            <p>Delightful UI aligned with Rump Labs&apos; values—no jargon, just clarity.</p>
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
