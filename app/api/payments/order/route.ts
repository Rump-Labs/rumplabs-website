import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { amountInPaise, buildPricing } from "@/lib/pricing";

interface CheckoutRequestBody {
  studentVerified?: boolean;
  customer?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { message: "Razorpay credentials are not configured." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as CheckoutRequestBody;
  const pricing = buildPricing(request.headers, Boolean(body.studentVerified));

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: amountInPaise(pricing.amountDueINR),
      currency: "INR",
      receipt: `rump-labs-${Date.now()}`,
      notes: {
        classification: pricing.classification,
        country: pricing.countryCode ?? "unknown",
        student_discount: pricing.studentDiscountApplied ? "yes" : "no",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: keyId,
      pricing,
    });
  } catch (error) {
    console.error("Failed to create Razorpay order", error);
    return NextResponse.json(
      { message: "Unable to create Razorpay order." },
      { status: 500 },
    );
  }
}


