import "server-only";
import crypto from "node:crypto";

/**
 * Server-only client for the PayPlus Payment Page API.
 * Docs: https://docs.payplus.co.il/reference/introduction
 *
 * This account's payment_page_uid was originally set up for a different
 * business of the store owner's (a ski-booking site, EUR by default) - we
 * always pass currency_code: "ILS" explicitly on every request so amounts
 * are never silently charged in EUR. Customers will see that page's own
 * branding (name/logo) until a dedicated קמפאיזי payment page is created.
 */

const BASE_URL = "https://restapi.payplus.co.il/api/v1.0";

function resolveConfig() {
  const apiKey = process.env.PAYPLUS_API_KEY;
  const secretKey = process.env.PAYPLUS_SECRET_KEY;
  const paymentPageUid = process.env.PAYPLUS_PAYMENT_PAGE_UID;
  if (!apiKey || !secretKey || !paymentPageUid) return null;
  return { apiKey, secretKey, paymentPageUid };
}

export interface GenerateLinkItem {
  name: string;
  price: number;
  quantity: number;
}

export interface GenerateLinkInput {
  orderNumber: string;
  amountIls: number;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  items: GenerateLinkItem[];
  successUrl: string;
  failureUrl: string;
  callbackUrl: string;
}

export interface GenerateLinkOutcome {
  ok: boolean;
  paymentUrl?: string;
  message: string;
}

interface PayPlusGenerateLinkResponse {
  results: { status: string; code: number; description: string };
  data?: { payment_page_link: string; page_request_uid: string };
}

export async function generatePaymentLink(input: GenerateLinkInput): Promise<GenerateLinkOutcome> {
  const config = resolveConfig();
  if (!config) {
    return { ok: false, message: "PayPlus is not configured (missing API credentials)." };
  }

  try {
    const res = await fetch(`${BASE_URL}/PaymentPages/generateLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.apiKey,
        "secret-key": config.secretKey,
      },
      body: JSON.stringify({
        payment_page_uid: config.paymentPageUid,
        amount: input.amountIls,
        currency_code: "ILS",
        language_code: "he",
        more_info: input.orderNumber,
        customer: {
          customer_name: input.customerName,
          email: input.customerEmail || undefined,
          phone: input.customerPhone,
        },
        items: input.items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          vat_type: 1,
        })),
        refURL_success: input.successUrl,
        refURL_failure: input.failureUrl,
        refURL_callback: input.callbackUrl,
        sendEmailApproval: false,
        sendEmailFailure: false,
      }),
    });

    const json = (await res.json()) as PayPlusGenerateLinkResponse;
    if (json.results?.status !== "success" || !json.data?.payment_page_link) {
      return { ok: false, message: json.results?.description || "PayPlus generateLink failed." };
    }

    return { ok: true, paymentUrl: json.data.payment_page_link, message: "Payment link created." };
  } catch {
    return { ok: false, message: "PayPlus request failed (network/timeout)." };
  }
}

/**
 * Verifies the `hash` header PayPlus sends on every webhook call: HMAC-SHA256
 * of the raw request body (base64), keyed with our secret key. Must be run
 * against the exact raw bytes received - re-serializing the parsed JSON can
 * reorder keys and silently break verification.
 */
export function verifyPayPlusSignature(rawBody: string, hashHeader: string | null): boolean {
  const config = resolveConfig();
  if (!config || !hashHeader) return false;

  const expected = crypto.createHmac("sha256", config.secretKey).update(rawBody).digest("base64");

  const a = Buffer.from(expected);
  const b = Buffer.from(hashHeader);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export interface PayPlusCallbackPayload {
  transaction_type: string;
  transaction: {
    uid: string;
    status_code: string;
    amount: number;
    currency: string;
    more_info?: string;
  };
}

/** "000" is PayPlus's success status code for a completed charge. */
export function isPayPlusSuccess(payload: PayPlusCallbackPayload): boolean {
  return payload.transaction_type === "Charge" && payload.transaction?.status_code === "000";
}
