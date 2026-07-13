"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatIls } from "@/lib/pricing";

export default function CheckoutPage() {
  const { items, subtotalIls, shippingIls, totalIls, clear } = useCart();
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const orderId = `CE-${Date.now().toString().slice(-8)}`;
    setSubmitted(orderId);
    clear();
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-camp-forest-900">בקשת ההזמנה התקבלה! 🎉</h1>
        <p className="mt-3 text-camp-bark-800/80">
          מספר הזמנה: <span className="font-mono font-semibold">{submitted}</span>
        </p>
        <p className="mt-2 text-camp-bark-800/70">
          ניצור איתך קשר בהקדם לאישור סופי ותשלום מאובטח. תודה שקנית ב-קמפאיזי!
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-full bg-camp-forest-700 px-6 py-3 text-sm font-bold text-white hover:bg-camp-forest-600"
        >
          המשך בקנייה
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-camp-forest-900">אין פריטים לתשלום</h1>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-camp-forest-700 px-6 py-3 text-sm font-bold text-white hover:bg-camp-forest-600"
        >
          למוצרים
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-extrabold text-camp-forest-900">פרטי משלוח</h1>
      <p className="mb-6 text-sm text-camp-bark-800/60">
        זהו שלב הזמנה לדוגמה - ללא סליקת תשלום מחוברת. לאחר השליחה ניצור קשר להשלמת התשלום.
      </p>

      <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-camp-sand-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="שם מלא" name="fullName" required />
            <Field label="טלפון" name="phone" type="tel" required />
          </div>
          <Field label="דוא&quot;ל" name="email" type="email" required />
          <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
            <Field label="עיר" name="city" required />
            <Field label="מיקוד" name="zip" />
          </div>
          <Field label="כתובת למשלוח" name="address" required />
          <Field label="הערות להזמנה (אופציונלי)" name="notes" textarea />

          <button
            type="submit"
            className="w-full rounded-full bg-camp-amber-600 px-6 py-3 text-sm font-bold text-white hover:bg-camp-amber-500"
          >
            שליחת בקשת הזמנה
          </button>
        </form>

        <div className="h-fit space-y-3 rounded-2xl border border-camp-sand-200 bg-camp-sand-50 p-5">
          <h2 className="font-bold text-camp-forest-900">סיכום הזמנה</h2>
          <ul className="space-y-1 text-sm text-camp-bark-800">
            {items.map((item) => (
              <li key={item.slug} className="flex justify-between gap-2">
                <span className="line-clamp-1">
                  {item.nameHe} × {item.qty}
                </span>
                <span className="shrink-0">{formatIls(item.priceIls * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 border-t border-camp-sand-200 pt-2 text-sm text-camp-bark-800">
            <div className="flex justify-between">
              <span>סכום ביניים</span>
              <span>{formatIls(subtotalIls)}</span>
            </div>
            <div className="flex justify-between">
              <span>משלוח לישראל</span>
              <span>{formatIls(shippingIls)}</span>
            </div>
          </div>
          <div className="flex justify-between border-t border-camp-sand-200 pt-2 text-lg font-extrabold text-camp-forest-900">
            <span>סה&quot;כ</span>
            <span>{formatIls(totalIls)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-camp-bark-800">
      {label}
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          className="mt-1 w-full rounded-xl border border-camp-sand-200 px-3 py-2 outline-none focus:border-camp-forest-600"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="mt-1 w-full rounded-xl border border-camp-sand-200 px-3 py-2 outline-none focus:border-camp-forest-600"
        />
      )}
    </label>
  );
}
