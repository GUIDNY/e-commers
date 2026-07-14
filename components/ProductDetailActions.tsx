"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CatalogEntry } from "@/lib/catalog";
import { formatIls } from "@/lib/pricing";
import { useCart } from "./CartContext";

export function ProductDetailActions({ product }: { product: CatalogEntry }) {
  const { addItem, buyNow } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const cartItem = {
    slug: product.slug,
    nameHe: product.nameHe,
    priceIls: product.priceIls,
    shippingIls: product.shippingIls,
    icon: product.icon,
    imageUrl: product.imageUrl,
  };

  if (product.shipsToIsrael === false) {
    return (
      <div className="mt-6 flex flex-col gap-4">
        <span className="text-3xl font-extrabold text-camp-forest-900">{formatIls(product.priceIls)}</span>
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          מוצר זה כרגע לא זמין למשלוח מהספק - לא זמין להזמנה.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-camp-forest-900">{formatIls(product.priceIls)}</span>
        <span className="text-sm text-camp-bark-800/60">+ {formatIls(product.shippingIls)} משלוח</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-camp-sand-200">
          <button
            className="grid h-10 w-10 place-items-center text-lg font-bold text-camp-forest-700"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="הפחת כמות"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{qty}</span>
          <button
            className="grid h-10 w-10 place-items-center text-lg font-bold text-camp-forest-700"
            onClick={() => setQty((q) => q + 1)}
            aria-label="הוסף כמות"
          >
            +
          </button>
        </div>

        <button
          onClick={() => {
            addItem(cartItem, qty);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          className="flex-1 rounded-full border-2 border-camp-forest-700 px-6 py-3 text-sm font-bold text-camp-forest-700 transition hover:bg-camp-forest-700/5 active:scale-95"
        >
          {added ? "נוסף לעגלה ✓" : "הוסף לעגלה"}
        </button>
      </div>

      <button
        onClick={() => {
          buyNow(cartItem, qty);
          router.push("/checkout");
        }}
        className="rounded-full bg-camp-amber-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-camp-amber-600/20 transition hover:bg-camp-amber-500 active:scale-95"
      >
        קנה עכשיו
      </button>
    </div>
  );
}
