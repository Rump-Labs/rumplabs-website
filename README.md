## Rump Labs

Two surfaces in one Next.js app:

- **`/` — the agency landing page.** Rump Labs positioned as a technical-services firm: fractional CTO, POC/MVP builds, delivery ownership, AI automation, and Web3/ZK engineering. Copy lives in `lib/content.ts`; sections in `components/site/`; design tokens in `app/globals.css`. Every CTA books https://calendly.com/agnijdutta413/30min.
- **`/gurukul` — the ZK course registration page** (the original payment desk, moved from `/`).

The hero's visual payload is `components/site/ProductCards.tsx` — a fanned row of real product surfaces (deploy log, PR review, contract test run, agent eval, ADR, sprint status, ZK circuit) rendered as HTML/CSS. No stock imagery, no decorative artwork.

### Gurukul payment desk

Location-aware checkout built on Razorpay. Domestic visitors from India see an early-bird price of ₹20,000 (struck through from ₹25,000). International visitors are quoted the INR equivalent of $200.

### Prerequisites

- Node.js 18.18+ / 20+
- Razorpay account with API key/secret

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `env.example` to `.env.local` and populate the keys:

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
USD_TO_INR_RATE=83                      # optional override
```

`USD_TO_INR_RATE` lets you fine-tune the exchange rate without redeploying.

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`. For local testing you can spoof the Geo-IP header with tools such as curl:

```bash
curl -H "x-vercel-ip-country: IN" http://localhost:3000/api/quote
```

### Architecture highlights

- `app/api/quote` inspects request headers (`x-vercel-ip-country`, `cf-ipcountry`, etc.) to classify visitors as domestic or international and calculate the correct amount.
- `app/api/payments/order` safely rebuilds the pricing server-side, creates a Razorpay order via the official Node SDK, and hands back the public key for checkout.
- `CheckoutButton` lazy-loads the Razorpay checkout script, prefills buyer details, and surfaces success/error feedback inline.

### Production checklist

- Swap sandbox Razorpay keys for live credentials.
- Configure a webhook (outside the scope of this demo) to reconcile successful payments in your CRM.
- Ensure your deployment platform forwards country headers (Vercel exposes `x-vercel-ip-country` automatically).

### Additional reading

- Razorpay Node SDK orders: https://github.com/razorpay/razorpay-node/blob/master/documents/order.md
- Next.js App Router guides: https://nextjs.org/docs/app/building-your-application
