import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { createCjOrder, CjOrderShippingDetails } from "@/lib/cj";

interface CheckoutRequestBody {
  orderNumber: string;
  shipping: CjOrderShippingDetails;
  items: { slug: string; qty: number }[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutRequestBody;
  const { orderNumber, shipping, items } = body;

  const cjLineItems: { vid: string; quantity: number }[] = [];
  const skippedSlugs: string[] = [];

  for (const item of items) {
    const product = getProductBySlug(item.slug);
    if (product?.cjVid && product.shipsToIsrael !== false) {
      cjLineItems.push({ vid: product.cjVid, quantity: item.qty });
    } else {
      skippedSlugs.push(item.slug);
    }
  }

  const cjOrder = await createCjOrder(orderNumber, shipping, cjLineItems);

  return NextResponse.json({ cjOrder, skippedSlugs });
}
