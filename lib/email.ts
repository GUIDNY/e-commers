import "server-only";
import { Resend } from "resend";

/**
 * Server-only email client (Resend). Never throws - checkout must succeed
 * even when email isn't configured yet or the send fails; callers just get
 * back ok:false and log/display accordingly.
 *
 * Required env vars (see .env.example):
 *  - RESEND_API_KEY
 *  - EMAIL_FROM - must be on a domain verified in Resend, e.g. '"קמפאיזי" <orders@yourdomain.com>'
 *  - STORE_OWNER_EMAIL (optional) - your real inbox; set as reply-to so customer
 *    replies land directly with you, and BCC'd on every order notification.
 */

interface OrderEmailItem {
  nameHe: string;
  qty: number;
  priceIls: number;
}

export interface OrderConfirmationInput {
  to: string;
  orderNumber: string;
  items: OrderEmailItem[];
  subtotalIls: number;
  shippingIls: number;
  totalIls: number;
}

export interface EmailOutcome {
  ok: boolean;
  message: string;
}

function resolveClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function formatIls(amount: number): string {
  return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(
    amount
  );
}

export async function sendOrderConfirmationEmail(input: OrderConfirmationInput): Promise<EmailOutcome> {
  const client = resolveClient();
  const from = process.env.EMAIL_FROM;
  if (!client || !from) {
    return { ok: false, message: "Email not configured (missing RESEND_API_KEY or EMAIL_FROM)." };
  }

  const ownerEmail = process.env.STORE_OWNER_EMAIL;
  const itemsHtml = input.items
    .map(
      (item) =>
        `<tr><td style="padding:4px 0">${item.nameHe} × ${item.qty}</td><td style="padding:4px 0;text-align:left">${formatIls(item.priceIls * item.qty)}</td></tr>`
    )
    .join("");

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;color:#24201a;max-width:480px;margin:0 auto">
      <h2 style="color:#1f3327">תודה על ההזמנה!</h2>
      <p>מספר הזמנה: <strong>${input.orderNumber}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        ${itemsHtml}
        <tr><td style="padding-top:8px;border-top:1px solid #e8dcc0">סכום ביניים</td><td style="padding-top:8px;border-top:1px solid #e8dcc0;text-align:left">${formatIls(input.subtotalIls)}</td></tr>
        <tr><td>משלוח</td><td style="text-align:left">${formatIls(input.shippingIls)}</td></tr>
        <tr><td style="font-weight:bold;padding-top:8px">סה"כ</td><td style="font-weight:bold;padding-top:8px;text-align:left">${formatIls(input.totalIls)}</td></tr>
      </table>
      <p>ניצור איתך קשר בהקדם לאישור סופי ותשלום מאובטח. תודה שקנית!</p>
    </div>
  `;

  try {
    const { error } = await client.emails.send({
      from,
      to: input.to,
      replyTo: ownerEmail,
      bcc: ownerEmail,
      subject: `אישור הזמנה ${input.orderNumber}`,
      html,
    });
    if (error) {
      return { ok: false, message: error.message };
    }
    return { ok: true, message: "Order confirmation email sent." };
  } catch {
    return { ok: false, message: "Email send request failed (network/timeout)." };
  }
}

export interface ShippingUpdateInput {
  to: string;
  orderNumber: string;
  trackingNumber: string;
  carrierName: string;
  message?: string;
}

export async function sendShippingUpdateEmail(input: ShippingUpdateInput): Promise<EmailOutcome> {
  const client = resolveClient();
  const from = process.env.EMAIL_FROM;
  if (!client || !from) {
    return { ok: false, message: "Email not configured (missing RESEND_API_KEY or EMAIL_FROM)." };
  }

  const ownerEmail = process.env.STORE_OWNER_EMAIL;
  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;color:#24201a;max-width:480px;margin:0 auto">
      <h2 style="color:#1f3327">ההזמנה שלך בדרך! 📦</h2>
      <p>מספר הזמנה: <strong>${input.orderNumber}</strong></p>
      <p>חברת שילוח: <strong>${input.carrierName}</strong></p>
      <p>מספר מעקב: <strong style="font-family:monospace">${input.trackingNumber}</strong></p>
      ${input.message ? `<p style="margin-top:16px;white-space:pre-line">${input.message}</p>` : ""}
      <p style="margin-top:16px">תודה שקנית!</p>
    </div>
  `;

  try {
    const { error } = await client.emails.send({
      from,
      to: input.to,
      replyTo: ownerEmail,
      bcc: ownerEmail,
      subject: `עדכון משלוח - הזמנה ${input.orderNumber}`,
      html,
    });
    if (error) {
      return { ok: false, message: error.message };
    }
    return { ok: true, message: "Shipping update email sent." };
  } catch {
    return { ok: false, message: "Email send request failed (network/timeout)." };
  }
}
