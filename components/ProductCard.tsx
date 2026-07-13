"use client";

import Link from "next/link";
import { CatalogEntry } from "@/lib/catalog";
import { formatIls } from "@/lib/pricing";
import { ProductThumb } from "./ProductThumb";
import { useCart } from "./CartContext";

export function ProductCard({ product }: { product: CatalogEntry }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-camp-sand-200 bg-white shadow-sm transition hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="grid aspect-square place-items-center overflow-hidden bg-camp-sand-100 text-camp-forest-700">
          <ProductThumb imageUrl={product.imageUrl} icon={product.icon} alt={product.nameHe} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.6em] font-semibold text-camp-bark-800 hover:text-camp-forest-700">
            {product.nameHe}
          </h3>
        </Link>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-lg font-extrabold text-camp-forest-900">{formatIls(product.priceIls)}</p>
            <p className="text-xs text-camp-bark-800/60">
              {product.shipsToIsrael === false ? "לא ניתן למשלוח לישראל" : `+ ${formatIls(product.shippingIls)} משלוח לישראל`}
            </p>
          </div>
          {product.shipsToIsrael === false ? (
            <span className="rounded-full bg-camp-sand-100 px-4 py-2 text-sm font-semibold text-camp-bark-800/50">
              לא זמין
            </span>
          ) : (
            <button
              onClick={() =>
                addItem({
                  slug: product.slug,
                  nameHe: product.nameHe,
                  priceIls: product.priceIls,
                  shippingIls: product.shippingIls,
                  icon: product.icon,
                  imageUrl: product.imageUrl,
                })
              }
              className="rounded-full bg-camp-forest-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-camp-forest-600 active:scale-95"
            >
              הוסף לעגלה
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
