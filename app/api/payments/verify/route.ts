import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

interface PaymentVerificationBody {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  customer?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return NextResponse.json(
      { message: "Razorpay credentials are not configured." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as PaymentVerificationBody;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer } = body;

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValidSignature = generatedSignature === razorpay_signature;

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid payment signature." },
        { status: 400 },
      );
    }

    // Update enrollment in Supabase
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({
          razorpay_payment_id: razorpay_payment_id,
          payment_status: 'paid',
          payment_signature: razorpay_signature,
          paid_at: new Date().toISOString(),
        })
        .eq('razorpay_order_id', razorpay_order_id);

      if (error) {
        console.error('Failed to update enrollment in Supabase:', error);
        // If record doesn't exist, create it
        if (customer) {
          await supabase.from('enrollments').insert({
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            name: customer.name,
            email: customer.email,
            contact: customer.contact,
            payment_status: 'paid',
            payment_signature: razorpay_signature,
            paid_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          });
        }
      }
    } catch (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Continue even if Supabase fails
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      payment_id: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Payment verification failed", error);
    return NextResponse.json(
      { message: "Unable to verify payment." },
      { status: 500 },
    );
  }
}

