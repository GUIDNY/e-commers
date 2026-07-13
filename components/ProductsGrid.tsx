"use client";

import { useMemo, useState } from "react";
import { CatalogEntry } from "@/lib/catalog";
import { ProductCategory } from "@/lib/types";
import { ProductCard } from "./ProductCard";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "shower-hygiene": "היגיינה ומקלחות",
  lighting: "תאורה",
  cooking: "בישול שטח",
  "sleep-comfort": "שינה ונוחות",
  power: "סוללות וחשמל",
  "tools-safety": "כלים ובטיחות",
  furniture: "ריהוט שטח",
};

export function ProductsGrid({ products }: { products: CatalogEntry[] }) {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            active === "all"
              ? "bg-camp-forest-700 text-white"
              : "bg-camp-sand-100 text-camp-bark-800 hover:bg-camp-sand-200"
          }`}
        >
          הכל
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              active === cat
                ? "bg-camp-forest-700 text-white"
                : "bg-camp-sand-100 text-camp-bark-800 hover:bg-camp-sand-200"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
