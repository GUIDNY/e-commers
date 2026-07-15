import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { createCjOrder } from "@/lib/cj";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { getOrderByNumber, markOrderPaid, markOrderPaymentFailed } from "@/lib/orders";
import { isPayPlusSuccess, verifyPayPlusSignature, PayPlusCallbackPayload } from "@/lib/payplus";

/**
 * PayPlus calls this once a customer finishes (or abandons) the hosted
 * payment page. Only on a verified, successful charge do we create the CJ
 * supplier order and send the customer's confirmation email - so a customer
 * is never emailed "your order is on its way" for a payment that failed.
 *
 * Must read the raw body text (not request.json()) because signature
 * verification hashes the exact bytes PayPlus sent - re-serializing the
 * parsed JSON can reorder keys and break the hash check.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const hash = request.headers.get("hash");

  if (!verifyPayPlusSignature(rawBody, hash)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as PayPlusCallbackPayload;
  const orderNumber = payload.transaction?.more_info;
  const transactionUid = payload.transaction?.uid;

  if (!orderNumber || !transactionUid) {
    return NextResponse.json({ error: "missing order reference" }, { status: 400 });
  }

  if (!isPayPlusSuccess(payload)) {
    await markOrderPaymentFailed(orderNumber, transactionUid);
    return NextResponse.json({ ok: true });
  }

  const order = await getOrderByNumber(orderNumber);
  if (!order) {
    return NextResponse.json({ error: "unknown order" }, { status: 404 });
  }

  // Already processed by an earlier (possibly retried) callback - ack and stop.
  if (order.paymentStatus !== "pending") {
    return NextResponse.json({ ok: true });
  }

  const cjLineItems: { vid: string; quantity: number }[] = [];
  for (const item of order.items) {
    const product = getProductBySlug(item.slug);
    if (product?.cjVid && product.shipsToIsrael !== false) {
      cjLineItems.push({ vid: product.cjVid, quantity: item.qty });
    }
  }

  const cjOrder = await createCjOrder(
    orderNumber,
    {
      fullName: order.customerName,
      phone: order.customerPhone,
      email: order.customerEmail,
      city: order.customerCity,
      address: order.customerAddress,
      zip: order.customerZip ?? undefined,
    },
    cjLineItems
  );

  const marked = await markOrderPaid(orderNumber, transactionUid, cjOrder.orderId);
  if (!marked) {
    // Lost a race with another callback for the same order - don't double-email.
    return NextResponse.json({ ok: true });
  }

  if (order.customerEmail) {
    await sendOrderConfirmationEmail({
      to: order.customerEmail,
      orderNumber,
      items: order.items,
      subtotalIls: order.subtotalIls,
      shippingIls: order.shippingIls,
      totalIls: order.totalIls,
    });
  }

  return NextResponse.json({ ok: true });
}
