declare global {
  interface RazorpayPrefill {
    name?: string;
    email?: string;
    contact?: string;
  }

  interface RazorpayThemeOptions {
    color?: string;
  }

  interface RazorpayModalOptions {
    ondismiss?: () => void;
  }

  interface RazorpayCheckoutOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    prefill?: RazorpayPrefill;
    notes?: Record<string, string>;
    theme?: RazorpayThemeOptions;
    handler?(response: RazorpaySuccessResponse): void;
    modal?: RazorpayModalOptions;
  }

  interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface RazorpayInstance {
    open(): void;
  }

  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

export {};


