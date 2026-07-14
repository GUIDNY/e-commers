"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CatalogEntry } from "@/lib/catalog";
import { formatIls } from "@/lib/pricing";
import { ProductThumb } from "./ProductThumb";
import { useCart } from "./CartContext";
import { CartIcon, CheckIcon } from "./Icons";

export function ProductCard({ product }: { product: CatalogEntry }) {
  const { addItem, buyNow } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const cartItem = {
    slug: product.slug,
    nameHe: product.nameHe,
    priceIls: product.priceIls,
    shippingIls: product.shippingIls,
    icon: product.icon,
    imageUrl: product.imageUrl,
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-camp-sand-200 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(31,51,39,0.12)]">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="grid aspect-square place-items-center overflow-hidden bg-camp-sand-100 text-camp-forest-700">
          <div className="h-full w-full transition duration-300 group-hover:scale-[1.04]">
            <ProductThumb imageUrl={product.imageUrl} icon={product.icon} alt={product.nameHe} />
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-semibold text-camp-bark-800 transition group-hover:text-camp-forest-700">
            {product.nameHe}
          </h3>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="text-lg font-extrabold text-camp-forest-900">{formatIls(product.priceIls)}</p>
            <p className="text-xs text-camp-bark-800/60">
              {product.shipsToIsrael === false ? "לא זמין למשלוח" : `+ ${formatIls(product.shippingIls)} משלוח`}
            </p>
          </div>
          {product.shipsToIsrael === false ? (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-camp-sand-100 text-[10px] font-semibold leading-tight text-camp-bark-800/50">
              לא זמין
            </span>
          ) : (
            <button
              onClick={() => {
                addItem(cartItem);
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              aria-label="הוסף לעגלה"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-camp-forest-700 text-white transition hover:bg-camp-forest-600 active:scale-90"
            >
              {added ? <CheckIcon className="h-5 w-5" /> : <CartIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
        {product.shipsToIsrael !== false && (
          <button
            onClick={() => {
              buyNow(cartItem);
              router.push("/checkout");
            }}
            className="mt-1 w-full rounded-full bg-camp-amber-600 py-2 text-xs font-bold text-white transition hover:bg-camp-amber-500 active:scale-95"
          >
            קנה עכשיו
          </button>
        )}
      </div>
    </div>
  );
}
