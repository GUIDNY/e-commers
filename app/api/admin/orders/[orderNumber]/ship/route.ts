import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getOrderByNumber, markOrderShipped } from "@/lib/orders";
import { sendShippingUpdateEmail } from "@/lib/email";

export async function POST(request: Request, { params }: { params: Promise<{ orderNumber: string }> }) {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
  if (!isAuthed) {
    return NextResponse.json({ ok: false, message: "לא מחובר" }, { status: 401 });
  }

  const { orderNumber } = await params;
  const { trackingNumber, carrierName, message } = (await request.json()) as {
    trackingNumber?: string;
    carrierName?: string;
    message?: string;
  };

  if (!trackingNumber || !carrierName) {
    return NextResponse.json({ ok: false, message: "חסר מספר מעקב או חברת שילוח" }, { status: 400 });
  }

  const order = await getOrderByNumber(orderNumber);
  if (!order) {
    return NextResponse.json({ ok: false, message: "הזמנה לא נמצאה" }, { status: 404 });
  }

  const email = await sendShippingUpdateEmail({
    to: order.customerEmail,
    orderNumber,
    trackingNumber,
    carrierName,
    message,
  });

  if (email.ok) {
    await markOrderShipped(orderNumber, trackingNumber, carrierName);
  }

  return NextResponse.json(email);
}
