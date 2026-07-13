import { NextResponse } from "next/server";
import { searchCjProducts } from "@/lib/cj";

/**
 * Admin/debug passthrough for discovering live CJdropshipping product IDs
 * (pid) to attach to catalog entries in lib/products.ts. Not linked from the
 * storefront UI. Requires CJ_EMAIL/CJ_PASSWORD or CJ_API_KEY_RAW to be
 * configured and reachable.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q");
  if (!keyword) {
    return NextResponse.json({ error: "Missing ?q= search keyword" }, { status: 400 });
  }

  const results = await searchCjProducts(keyword);
  if (results === null) {
    return NextResponse.json(
      { error: "CJdropshipping API unreachable or not configured. Check CJ_EMAIL/CJ_PASSWORD env vars." },
      { status: 502 }
    );
  }
  return NextResponse.json({ results });
}
