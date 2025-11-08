"use client";

import { useState } from "react";
import { loadRazorpay } from "@/lib/razorpay";

interface CheckoutButtonProps {
  amountINR: number;
  studentVerified: boolean;
  disabled?: boolean;
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  onSuccess(response: RazorpaySuccessResponse): void;
  onError(message: string): void;
}

export type CheckoutSuccessPayload = RazorpaySuccessResponse;

export function CheckoutButton(props: CheckoutButtonProps) {
  const { amountINR, studentVerified, customer, disabled, onError, onSuccess } = props;
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded || !window.Razorpay) {
        onError("Razorpay SDK failed to initialize.");
        return;
      }

      const response = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentVerified,
          customer,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message ?? "Unable to create order.");
      }

      const data = await response.json();

      const options: RazorpayCheckoutOptions = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Rump Labs",
        description: "Eligibility-first payment experience",
        order_id: data.orderId,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.contact,
        },
        notes: {
          student_discount: data.pricing.studentDiscountApplied ? "yes" : "no",
        },
        theme: {
          color: "#2C8A91",
        },
        handler: (paymentResponse) => {
          onSuccess(paymentResponse);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      onError(error instanceof Error ? error.message : "Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-900 shadow-lg shadow-black/10 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Processing…" : `Pay ₹${amountINR.toLocaleString("en-IN")}`}
    </button>
  );
}


