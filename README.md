## Rump Labs

Two surfaces in one Next.js app:

- **`/` — the agency landing page.** Rump Labs positioned as a technical-services firm: fractional CTO, POC/MVP builds, delivery ownership, AI automation, and Web3/ZK engineering. Copy lives in `lib/content.ts`; sections in `components/site/`; design tokens in `app/globals.css`. Every CTA books https://calendly.com/agnijdutta413/30min.
- **`/gurukul` — the ZK course registration page** (the original payment desk, moved from `/`).

The hero's visual payload is `components/site/ProductCards.tsx` — a fanned row of real product surfaces (deploy log, PR review, contract test run, agent eval, ADR, sprint status, ZK circuit) rendered as HTML/CSS. No stock imagery, no decorative artwork.

### Gurukul payment desk

Eligibility-aware checkout that combines Razorpay payments with SheerID student verification. Domestic visitors from India see ₹10,000 pricing with an instant ₹5,000 concession once their student ID is verified. International visitors are quoted the INR equivalent of $200.

### Prerequisites

- Node.js 18.18+ / 20+
- Razorpay account with API key/secret
- (Optional) SheerID hosted verification program for student discount feature

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
# Optional: SheerID (only needed for student discount feature)
NEXT_PUBLIC_SHEERID_PROGRAM_ID=your_sheerid_program
NEXT_PUBLIC_SHEERID_ORIGIN=https://services.sandbox.sheerid.com
```

`USD_TO_INR_RATE` lets you fine-tune the exchange rate without redeploying. If you don't configure SheerID, the student discount option will be hidden and the payment flow will work with standard domestic (₹10,000) and international pricing only.

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
- `SheerIDModal` (optional) embeds the hosted verification experience in an iframe and listens for the `verification.completed` postMessage event from SheerID before enabling the discount. If SheerID isn't configured, the student discount section is hidden.
- `CheckoutButton` lazy-loads the Razorpay checkout script, prefills buyer details, and surfaces success/error feedback inline.

### Production checklist

- Swap sandbox Razorpay keys for live credentials.
- (Optional) If using SheerID, update `NEXT_PUBLIC_SHEERID_ORIGIN` to the production SheerID domain if it differs from the sandbox endpoint.
- Configure a webhook (outside the scope of this demo) to reconcile successful payments and completed SheerID verifications in your CRM.
- Ensure your deployment platform forwards country headers (Vercel exposes `x-vercel-ip-country` automatically).

### Additional reading

- Razorpay Node SDK orders: https://github.com/razorpay/razorpay-node/blob/master/documents/order.md
- Next.js App Router guides: https://nextjs.org/docs/app/building-your-application
