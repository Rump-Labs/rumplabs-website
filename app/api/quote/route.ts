import { buildPricing } from "@/lib/pricing";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const pricing = buildPricing(request.headers);

  return NextResponse.json({
    ...pricing,
  });
}


