import type { CatalogEntry } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function CrossSellStrip({ products }: { products: CatalogEntry[] }) {
  return (
    <section className="mt-16 border-t border-camp-sand-200 pt-10">
      <h2 className="mb-6 text-xl font-extrabold text-camp-forest-900">מתאים גם לטיול הבא שלכם</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
