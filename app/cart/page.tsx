"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatIls } from "@/lib/pricing";
import { ProductIcon } from "@/components/Icons";

export default function CartPage() {
  const { items, setQty, removeItem, subtotalIls, shippingIls, totalIls } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-camp-forest-900">העגלה שלך ריקה</h1>
        <p className="mt-2 text-camp-bark-800/70">עדיין לא הוספתם מוצרים לעגלה.</p>
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
      <h1 className="mb-6 text-2xl font-extrabold text-camp-forest-900">עגלת קניות</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex items-center gap-4 rounded-2xl border border-camp-sand-200 bg-white p-4"
          >
            <Link href={`/products/${item.slug}`} className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-camp-sand-100 text-camp-forest-700">
              <ProductIcon icon={item.icon} className="h-9 w-9" />
            </Link>
            <div className="flex-1">
              <Link href={`/products/${item.slug}`} className="font-semibold text-camp-bark-800 hover:text-camp-forest-700">
                {item.nameHe}
              </Link>
              <p className="text-sm text-camp-bark-800/60">{formatIls(item.priceIls)} ליחידה</p>
            </div>
            <div className="flex items-center rounded-full border border-camp-sand-200">
              <button
                className="grid h-9 w-9 place-items-center text-lg font-bold text-camp-forest-700"
                onClick={() => setQty(item.slug, item.qty - 1)}
                aria-label="הפחת כמות"
              >
                −
              </button>
              <span className="w-7 text-center font-semibold">{item.qty}</span>
              <button
                className="grid h-9 w-9 place-items-center text-lg font-bold text-camp-forest-700"
                onClick={() => setQty(item.slug, item.qty + 1)}
                aria-label="הוסף כמות"
              >
                +
              </button>
            </div>
            <p className="w-20 text-left font-bold text-camp-forest-900">{formatIls(item.priceIls * item.qty)}</p>
            <button
              onClick={() => removeItem(item.slug)}
              className="text-sm text-red-600/80 hover:text-red-700"
              aria-label="הסר מהעגלה"
            >
              הסר
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 mr-auto w-full max-w-sm space-y-2 rounded-2xl border border-camp-sand-200 bg-camp-sand-50 p-5">
        <div className="flex justify-between text-sm text-camp-bark-800">
          <span>סכום ביניים</span>
          <span>{formatIls(subtotalIls)}</span>
        </div>
        <div className="flex justify-between text-sm text-camp-bark-800">
          <span>משלוח לישראל</span>
          <span>{formatIls(shippingIls)}</span>
        </div>
        <div className="flex justify-between border-t border-camp-sand-200 pt-2 text-lg font-extrabold text-camp-forest-900">
          <span>סה&quot;כ</span>
          <span>{formatIls(totalIls)}</span>
        </div>
        <Link
          href="/checkout"
          className="mt-3 block rounded-full bg-camp-amber-600 px-6 py-3 text-center text-sm font-bold text-white hover:bg-camp-amber-500"
        >
          המשך לתשלום
        </Link>
      </div>
    </div>
  );
}
