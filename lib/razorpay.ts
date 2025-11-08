const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export async function loadRazorpay(src: string = RAZORPAY_CHECKOUT_SRC): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  if (document.querySelector(`script[src="${src}"]`)) {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}


