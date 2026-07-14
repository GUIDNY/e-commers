import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
import { createCjOrder, CjOrderShippingDetails } from "@/lib/cj";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { saveOrder } from "@/lib/orders";

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

  const catalog = await getCatalog();
  const orderItems = items.flatMap((item) => {
    const entry = catalog.find((p) => p.slug === item.slug);
    return entry ? [{ slug: item.slug, nameHe: entry.nameHe, qty: item.qty, priceIls: entry.priceIls }] : [];
  });
  const subtotalIls = orderItems.reduce((sum, i) => sum + i.priceIls * i.qty, 0);
  const shippingIls = items.reduce((sum, item) => {
    const entry = catalog.find((p) => p.slug === item.slug);
    return sum + (entry?.shippingIls ?? 0);
  }, 0);
  const totalIls = subtotalIls + shippingIls;

  try {
    await saveOrder({
      orderNumber,
      customerName: shipping.fullName,
      customerEmail: shipping.email || "",
      customerPhone: shipping.phone,
      customerCity: shipping.city,
      customerAddress: shipping.address,
      customerZip: shipping.zip,
      items: orderItems,
      subtotalIls,
      shippingIls,
      totalIls,
      cjOrderId: cjOrder.orderId,
    });
  } catch (err) {
    // Order storage failing shouldn't block checkout - the CJ order and
    // customer email (below) already went out; log for visibility.
    console.error("Failed to save order to database:", err);
  }

  let email: { ok: boolean; message: string } = { ok: false, message: "No customer email provided." };
  if (shipping.email) {
    email = await sendOrderConfirmationEmail({
      to: shipping.email,
      orderNumber,
      items: orderItems,
      subtotalIls,
      shippingIls,
      totalIls,
    });
  }

  return NextResponse.json({ cjOrder, skippedSlugs, email });
}
