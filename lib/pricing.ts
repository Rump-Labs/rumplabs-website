const DOMESTIC_PRICE_INR = 10_000;
const STUDENT_PRICE_INR = 5_000;
const INTERNATIONAL_PRICE_USD = 200;

export type PricingClassification = "domestic" | "international";

export interface PricingResult {
  countryCode: string | null;
  classification: PricingClassification;
  amountDueINR: number;
  domesticINR: number;
  studentINR: number;
  internationalINR: number;
  studentDiscountApplied: boolean;
  usdToInrRate: number;
  reason: string;
}

const COUNTRY_HEADER_CANDIDATES = [
  "x-vercel-ip-country",
  "x-geo-country",
  "x-country",
  "cf-ipcountry",
  "fly-client-ip-country",
];

export function extractCountry(headers: Headers): string | null {
  for (const key of COUNTRY_HEADER_CANDIDATES) {
    const value = headers.get(key);
    if (value) {
      return value.toUpperCase();
    }
  }

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor && xForwardedFor.includes("127.0.0.1")) {
    // Local development fallback – treat as India for easier testing.
    return "IN";
  }

  return null;
}

function getUsdToInrRate(): number {
  const configured = Number(process.env.USD_TO_INR_RATE ?? "0");
  if (Number.isFinite(configured) && configured > 0) {
    return configured;
  }
  return 83; // Reasonable default as of 2025-11.
}

export function buildPricing(headers: Headers, studentVerified = false): PricingResult {
  const countryCode = extractCountry(headers);
  const classification: PricingClassification = countryCode === "IN" ? "domestic" : "international";
  const usdToInrRate = getUsdToInrRate();
  const internationalINR = Math.round(INTERNATIONAL_PRICE_USD * usdToInrRate);

  const studentDiscountApplied = studentVerified && classification === "domestic";

  const amountDueINR = classification === "domestic"
    ? studentDiscountApplied
      ? STUDENT_PRICE_INR
      : DOMESTIC_PRICE_INR
    : internationalINR;

  const reason = classification === "domestic"
    ? "Detected Indian IP – applying domestic pricing."
    : countryCode
      ? "IP detected outside India – applying international pricing."
      : "No country hint detected – defaulting to international pricing.";

  return {
    countryCode,
    classification,
    amountDueINR,
    domesticINR: DOMESTIC_PRICE_INR,
    studentINR: STUDENT_PRICE_INR,
    internationalINR,
    studentDiscountApplied,
    usdToInrRate,
    reason,
  };
}

export function amountInPaise(amountInINR: number): number {
  return Math.max(1, Math.round(amountInINR * 100));
}


