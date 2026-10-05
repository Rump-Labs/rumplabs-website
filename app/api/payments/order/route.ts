import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { amountInPaise, buildPricing } from "@/lib/pricing";
import { supabase } from "@/lib/supabase";

interface CheckoutRequestBody {
  customer?: {
    name?: string;
    email?: string;
    contact?: string;
    profession?: string;
    university?: string;
    major?: string;
    currentCompany?: string;
    twitterHandle?: string;
    interestReason?: string;
    knowledgeLevel?: string;
    telegramId?: string;
    linkedinId?: string;
    githubId?: string;
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
  const pricing = await buildPricing(request.headers);

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: amountInPaise(pricing.amountDueINR),
      currency: "INR",
      receipt: `rump-labs-${Date.now()}`,
      notes: {
        classification: pricing.classification,
        country: pricing.countryCode ?? "unknown",
      },
    });

    // Save order and customer data to Supabase
    if (body.customer) {
      try {
        const { error } = await supabase.from('enrollments').insert({
          razorpay_order_id: order.id,
          name: body.customer.name,
          email: body.customer.email,
          contact: body.customer.contact,
          profession: body.customer.profession || null,
          university: body.customer.university || null,
          major: body.customer.major || null,
          current_company: body.customer.currentCompany || null,
          twitter_handle: body.customer.twitterHandle || null,
          interest_reason: body.customer.interestReason || null,
          knowledge_level: body.customer.knowledgeLevel || null,
          telegram_id: body.customer.telegramId || null,
          linkedin_id: body.customer.linkedinId || null,
          github_id: body.customer.githubId || null,
          amount_due_inr: pricing.amountDueINR,
          classification: pricing.classification,
          country_code: pricing.countryCode,
          student_verified: false,
          student_discount_applied: false,
          payment_status: 'pending',
          created_at: new Date().toISOString(),
        });

        if (error) {
          console.error('Failed to save enrollment to Supabase:', error);
          // Don't fail the request if Supabase save fails
        }
      } catch (supabaseError) {
        console.error('Supabase error:', supabaseError);
        // Continue even if Supabase fails
      }
    }

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


