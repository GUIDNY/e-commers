import { products as seedProducts } from "./products";
import { getCjProduct, parseCjCost } from "./cj";
import { sellPriceIls, shippingPriceIls, displayPricing } from "./pricing";
import { Product } from "./types";

export interface CatalogEntry extends Product {
  priceIls: number;
  shippingIls: number;
}

/**
 * Returns the full catalog with computed shekel prices. For any product with
 * a known cjPid, tries a live CJ lookup to refresh the supplier cost; falls
 * back to the curated estimate if CJ is unreachable (e.g. no network access,
 * expired token, or the pid isn't configured yet).
 */
export async function getCatalog(): Promise<CatalogEntry[]> {
  const entries = await Promise.all(
    seedProducts.map(async (product) => {
      let live = product;
      if (product.cjPid) {
        const cj = await getCjProduct(product.cjPid);
        if (cj?.sellPrice) {
          live = {
            ...product,
            costUsd: parseCjCost(cj.sellPrice),
            priceSource: "cj-live",
            // Always show CJ's own current listing photo for matched products -
            // the customer should see exactly what's on the supplier's dashboard
            // for that pid, not a hand-picked alternate (even if CJ's is a
            // busier marketing banner). Falls back to our curated photo only
            // if CJ has none for this pid. Use bigImage, not productImage -
            // on the product/query detail response productImage is a
            // JSON-array-encoded string of every gallery photo, not a single
            // URL (found live: it broke portable-water-filter-straw's image).
            imageUrl: cj.bigImage || product.imageUrl,
          };
        }
      }
      // Products that can't ship to Israel aren't purchasable at all (see
      // ProductCard/ProductDetailActions), so they keep the raw cost-based
      // price with no shipping line rather than the flat-fee transform below.
      const { priceIls, shippingIls } =
        live.shipsToIsrael === false
          ? { priceIls: sellPriceIls(live.costUsd), shippingIls: 0 }
          : displayPricing(live.costUsd, live.shippingUsd);

      return {
        ...live,
        priceIls,
        shippingIls,
      } satisfies CatalogEntry;
    })
  );
  return entries;
}

export async function getCatalogEntry(slug: string): Promise<CatalogEntry | undefined> {
  const catalog = await getCatalog();
  return catalog.find((p) => p.slug === slug);
}
