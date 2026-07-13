import { NextResponse } from "next/server";
import { getCatalogEntry } from "@/lib/catalog";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getCatalogEntry(slug);
  if (!entry) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ product: entry });
}
