import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/catalog";
import { CjOrderShippingDetails } from "@/lib/cj";
import { saveOrder } from "@/lib/orders";
import { generatePaymentLink } from "@/lib/payplus";

interface CheckoutRequestBody {
  orderNumber: string;
  shipping: CjOrderShippingDetails;
  items: { slug: string; qty: number }[];
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://e-commerss-alpha.vercel.app";
}

/**
 * Only saves the order (as 'pending') and hands back a PayPlus payment link -
 * it does NOT create the CJ supplier order or send the confirmation email.
 * Those only happen once PayPlus confirms the charge actually went through
 * (see app/api/payplus/webhook/route.ts), so we never draft a supplier order
 * or email a customer for a payment that never completed.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutRequestBody;
  const { orderNumber, shipping, items } = body;

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

  const payment = await generatePaymentLink({
    orderNumber,
    amountIls: totalIls,
    customerName: shipping.fullName,
    customerEmail: shipping.email,
    customerPhone: shipping.phone,
    // PayPlus requires amount to exactly equal the sum of all items - the
    // flat display shipping fee (lib/pricing.ts) needs its own line item,
    // it's not folded into any product's price.
    items: [
      ...orderItems.map((i) => ({ name: i.nameHe, price: i.priceIls, quantity: i.qty })),
      ...(shippingIls > 0 ? [{ name: "משלוח", price: shippingIls, quantity: 1 }] : []),
    ],
    successUrl: `${siteUrl()}/checkout/success?order=${encodeURIComponent(orderNumber)}`,
    failureUrl: `${siteUrl()}/checkout/failure?order=${encodeURIComponent(orderNumber)}`,
    callbackUrl: `${siteUrl()}/api/payplus/webhook`,
  });

  if (!payment.ok) {
    return NextResponse.json({ payment }, { status: 502 });
  }

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
      payplusPaymentUrl: payment.paymentUrl,
    });
  } catch (err) {
    // If we can't record the order, don't send the customer to pay for
    // something we won't be able to track - fail the checkout instead.
    console.error("Failed to save pending order to database:", err);
    return NextResponse.json({ payment: { ok: false, message: "Failed to save order." } }, { status: 500 });
  }

  return NextResponse.json({ payment });
}
