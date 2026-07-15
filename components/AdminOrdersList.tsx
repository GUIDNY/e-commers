"use client";

import { useState } from "react";
import type { OrderRecord } from "@/lib/orders";
import { formatIls } from "@/lib/pricing";

export function AdminOrdersList({ orders }: { orders: OrderRecord[] }) {
  if (orders.length === 0) {
    return <p className="text-camp-bark-800/60">עדיין אין הזמנות.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderCard key={order.orderNumber} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: OrderRecord }) {
  const [open, setOpen] = useState(false);
  const [tracking, setTracking] = useState(order.trackingNumber || "");
  const [carrier, setCarrier] = useState(order.carrierName || "");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function handleSend() {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch(`/api/admin/orders/${order.orderNumber}/ship`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber: tracking, carrierName: carrier, message }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ ok: false, message: "השליחה נכשלה - נסו שוב." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-camp-sand-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm text-camp-bark-800/60">{order.orderNumber}</p>
          <p className="font-bold text-camp-forest-900">{order.customerName}</p>
          <p className="text-sm text-camp-bark-800/70">
            {order.customerEmail} · {order.customerPhone}
          </p>
          <p className="text-sm text-camp-bark-800/70">
            {order.customerCity}, {order.customerAddress}
          </p>
        </div>
        <div className="text-left">
          <p className="text-lg font-extrabold text-camp-forest-900">{formatIls(order.totalIls)}</p>
          <p className="text-xs text-camp-bark-800/50">{new Date(order.createdAt).toLocaleString("he-IL")}</p>
          {order.paymentStatus === "failed" ? (
            <span className="mt-1 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              תשלום נכשל
            </span>
          ) : (
            <span className="mt-1 inline-block rounded-full bg-camp-forest-700/10 px-3 py-1 text-xs font-semibold text-camp-forest-700">
              שולם ✓
            </span>
          )}
          {order.shipped ? (
            <span className="mt-1 inline-block rounded-full bg-camp-forest-700/10 px-3 py-1 text-xs font-semibold text-camp-forest-700">
              נשלח ✓
            </span>
          ) : (
            <span className="mt-1 inline-block rounded-full bg-camp-amber-600/10 px-3 py-1 text-xs font-semibold text-camp-amber-600">
              ממתין למשלוח
            </span>
          )}
        </div>
      </div>

      <ul className="mt-3 space-y-1 text-sm text-camp-bark-800/80">
        {order.items.map((item) => (
          <li key={item.slug}>
            {item.nameHe} × {item.qty}
          </li>
        ))}
      </ul>

      {order.cjOrderId && (
        <p className="mt-2 text-xs text-camp-bark-800/50">
          הזמנת CJ: <span className="font-mono">{order.cjOrderId}</span>
        </p>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 text-sm font-semibold text-camp-forest-700 hover:underline"
      >
        {open ? "סגור" : order.shipped ? "עדכן פרטי משלוח" : "שלח עדכון משלוח ללקוח"}
      </button>

      {open && (
        <div className="mt-3 grid gap-3 rounded-xl bg-camp-sand-50 p-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-camp-bark-800">
            חברת שילוח
            <input
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="mt-1 w-full rounded-xl border border-camp-sand-200 px-3 py-2 outline-none focus:border-camp-forest-600 focus:ring-2 focus:ring-camp-forest-600/15"
            />
          </label>
          <label className="block text-sm font-medium text-camp-bark-800">
            מספר מעקב
            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="mt-1 w-full rounded-xl border border-camp-sand-200 px-3 py-2 outline-none focus:border-camp-forest-600 focus:ring-2 focus:ring-camp-forest-600/15"
            />
          </label>
          <label className="block text-sm font-medium text-camp-bark-800 sm:col-span-2">
            הודעה אישית (אופציונלי)
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-camp-sand-200 px-3 py-2 outline-none focus:border-camp-forest-600 focus:ring-2 focus:ring-camp-forest-600/15"
            />
          </label>
          {result && (
            <p className={`sm:col-span-2 text-sm ${result.ok ? "text-camp-forest-700" : "text-red-600"}`}>
              {result.ok ? "✅ נשלח ללקוח" : `⚠️ ${result.message}`}
            </p>
          )}
          <button
            onClick={handleSend}
            disabled={sending || !tracking || !carrier}
            className="sm:col-span-2 rounded-full bg-camp-amber-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-camp-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "שולח..." : "שלח מייל עדכון ללקוח"}
          </button>
        </div>
      )}
    </div>
  );
}
