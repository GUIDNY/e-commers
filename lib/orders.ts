import "server-only";
import { getSql } from "./db";

export interface OrderItemRecord {
  slug: string;
  nameHe: string;
  qty: number;
  priceIls: number;
}

export type PaymentStatus = "pending" | "paid" | "failed";

export interface NewOrderInput {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  customerZip?: string;
  items: OrderItemRecord[];
  subtotalIls: number;
  shippingIls: number;
  totalIls: number;
  cjOrderId?: string;
  payplusPaymentUrl?: string;
}

export interface OrderRecord extends NewOrderInput {
  id: number;
  paymentStatus: PaymentStatus;
  payplusTransactionUid: string | null;
  shipped: boolean;
  trackingNumber: string | null;
  carrierName: string | null;
  shippedAt: string | null;
  createdAt: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any -- raw driver rows are untyped */
function rowToOrder(row: any): OrderRecord {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    customerCity: row.customer_city,
    customerAddress: row.customer_address,
    customerZip: row.customer_zip ?? undefined,
    items: row.items,
    subtotalIls: row.subtotal_ils,
    shippingIls: row.shipping_ils,
    totalIls: row.total_ils,
    cjOrderId: row.cj_order_id ?? undefined,
    payplusPaymentUrl: row.payplus_payment_url ?? undefined,
    paymentStatus: row.payment_status,
    payplusTransactionUid: row.payplus_transaction_uid,
    shipped: row.shipped,
    trackingNumber: row.tracking_number,
    carrierName: row.carrier_name,
    shippedAt: row.shipped_at,
    createdAt: row.created_at,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function saveOrder(input: NewOrderInput): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO orders (
      order_number, customer_name, customer_email, customer_phone,
      customer_city, customer_address, customer_zip, items,
      subtotal_ils, shipping_ils, total_ils, cj_order_id, payplus_payment_url
    ) VALUES (
      ${input.orderNumber}, ${input.customerName}, ${input.customerEmail}, ${input.customerPhone},
      ${input.customerCity}, ${input.customerAddress}, ${input.customerZip ?? null}, ${JSON.stringify(input.items)},
      ${input.subtotalIls}, ${input.shippingIls}, ${input.totalIls}, ${input.cjOrderId ?? null},
      ${input.payplusPaymentUrl ?? null}
    )
  `;
}

/**
 * Marks an order paid and records the CJ order id created right after
 * (checkout only creates the CJ draft order once payment is confirmed - see
 * app/api/payplus/webhook/route.ts). Only transitions orders still 'pending'
 * so a retried webhook call can't double-process the same order.
 */
export async function markOrderPaid(
  orderNumber: string,
  transactionUid: string,
  cjOrderId?: string
): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    UPDATE orders
    SET payment_status = 'paid', payplus_transaction_uid = ${transactionUid}, cj_order_id = ${cjOrderId ?? null}
    WHERE order_number = ${orderNumber} AND payment_status = 'pending'
    RETURNING id
  `;
  return rows.length > 0;
}

export async function markOrderPaymentFailed(orderNumber: string, transactionUid: string): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE orders
    SET payment_status = 'failed', payplus_transaction_uid = ${transactionUid}
    WHERE order_number = ${orderNumber} AND payment_status = 'pending'
  `;
}

/**
 * Excludes still-pending (unpaid, likely abandoned) checkouts by default -
 * the admin panel is for managing real orders, not incomplete payment
 * attempts. Pass includePending: true to see those too.
 */
export async function listOrders(options?: { includePending?: boolean }): Promise<OrderRecord[]> {
  const sql = getSql();
  const rows = options?.includePending
    ? await sql`SELECT * FROM orders ORDER BY created_at DESC`
    : await sql`SELECT * FROM orders WHERE payment_status != 'pending' ORDER BY created_at DESC`;
  return rows.map(rowToOrder);
}

export async function getOrderByNumber(orderNumber: string): Promise<OrderRecord | null> {
  const sql = getSql();
  const rows = await sql`SELECT * FROM orders WHERE order_number = ${orderNumber} LIMIT 1`;
  return rows.length ? rowToOrder(rows[0]) : null;
}

export async function markOrderShipped(
  orderNumber: string,
  trackingNumber: string,
  carrierName: string
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE orders
    SET shipped = TRUE, tracking_number = ${trackingNumber}, carrier_name = ${carrierName}, shipped_at = now()
    WHERE order_number = ${orderNumber}
  `;
}
