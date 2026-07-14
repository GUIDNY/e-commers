import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
import { createCjOrder, CjOrderShippingDetails } from "@/lib/cj";
import { sendOrderConfirmationEmail } from "@/lib/email";

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

  let email: { ok: boolean; message: string } = { ok: false, message: "No customer email provided." };
  if (shipping.email) {
    const catalog = await getCatalog();
    const emailItems = items.flatMap((item) => {
      const entry = catalog.find((p) => p.slug === item.slug);
      return entry ? [{ nameHe: entry.nameHe, qty: item.qty, priceIls: entry.priceIls }] : [];
    });
    const subtotalIls = emailItems.reduce((sum, i) => sum + i.priceIls * i.qty, 0);
    const shippingIls = items.reduce((sum, item) => {
      const entry = catalog.find((p) => p.slug === item.slug);
      return sum + (entry?.shippingIls ?? 0);
    }, 0);

    email = await sendOrderConfirmationEmail({
      to: shipping.email,
      orderNumber,
      items: emailItems,
      subtotalIls,
      shippingIls,
      totalIls: subtotalIls + shippingIls,
    });
  }

  return NextResponse.json({ cjOrder, skippedSlugs, email });
}
