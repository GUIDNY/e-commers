"use client";

import { useState } from "react";
import { CatalogEntry } from "@/lib/catalog";
import { formatIls } from "@/lib/pricing";
import { useCart } from "./CartContext";

export function ProductDetailActions({ product }: { product: CatalogEntry }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-camp-forest-900">{formatIls(product.priceIls)}</span>
        <span className="text-sm text-camp-bark-800/60">+ {formatIls(product.shippingIls)} משלוח לישראל</span>
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
            addItem(
              {
                slug: product.slug,
                nameHe: product.nameHe,
                priceIls: product.priceIls,
                shippingIls: product.shippingIls,
                icon: product.icon,
              },
              qty
            );
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          className="flex-1 rounded-full bg-camp-forest-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-camp-forest-600 active:scale-95"
        >
          {added ? "נוסף לעגלה ✓" : "הוסף לעגלה"}
        </button>
      </div>
    </div>
  );
}
