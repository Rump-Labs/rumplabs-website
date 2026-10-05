const LIST_PRICE_INR = 25_000;
const EARLY_BIRD_PRICE_INR = 20_000;
const FX_RATE_URL = "https://open.er-api.com/v6/latest/USD";

export type PricingClassification = "domestic" | "international";

export interface PricingResult {
  countryCode: string | null;
  classification: PricingClassification;
  amountDueINR: number;
  listINR: number;
  amountDueUSD: number;
  listUSD: number;
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

function getFallbackUsdToInrRate(): number {
  const configured = Number(process.env.USD_TO_INR_RATE ?? "0");
  if (Number.isFinite(configured) && configured > 0) {
    return configured;
  }
  return 96; // Reasonable default as of 2026-10.
}

/** Market USD→INR rate, refreshed at most hourly. Falls back to
 *  USD_TO_INR_RATE (or a hardcoded default) if the feed is unavailable. */
async function getUsdToInrRate(): Promise<number> {
  try {
    const response = await fetch(FX_RATE_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      const data = (await response.json()) as { result?: string; rates?: Record<string, number> };
      const rate = data.rates?.INR;
      if (data.result === "success" && typeof rate === "number" && rate > 0) {
        return rate;
      }
    }
  } catch (error) {
    console.error("Failed to fetch USD→INR rate", error);
  }
  return getFallbackUsdToInrRate();
}

/** Everyone pays the same INR price (charged in INR); international
 *  visitors are shown the USD equivalent at the market rate. */
export async function buildPricing(headers: Headers): Promise<PricingResult> {
  const countryCode = extractCountry(headers);
  const classification: PricingClassification = countryCode === "IN" ? "domestic" : "international";
  const usdToInrRate = await getUsdToInrRate();

  const reason = classification === "domestic"
    ? "Detected Indian IP – showing INR pricing."
    : countryCode
      ? "IP detected outside India – showing USD equivalent at market rate."
      : "No country hint detected – showing USD equivalent at market rate.";

  return {
    countryCode,
    classification,
    amountDueINR: EARLY_BIRD_PRICE_INR,
    listINR: LIST_PRICE_INR,
    amountDueUSD: Math.round(EARLY_BIRD_PRICE_INR / usdToInrRate),
    listUSD: Math.round(LIST_PRICE_INR / usdToInrRate),
    usdToInrRate,
    reason,
  };
}

export function amountInPaise(amountInINR: number): number {
  return Math.max(1, Math.round(amountInINR * 100));
}


