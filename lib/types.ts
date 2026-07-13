export type ProductCategory =
  | "shower-hygiene"
  | "lighting"
  | "cooking"
  | "sleep-comfort"
  | "power"
  | "tools-safety"
  | "furniture";

export interface Product {
  /** Stable internal id / slug used in URLs */
  slug: string;
  /** CJdropshipping product id (pid) - filled in once matched via live API */
  cjPid?: string;
  /** CJdropshipping cheapest variant id (vid) used for the live freight quote below */
  cjVid?: string;
  /** False when CJ's freight calculator returned no shipping line to Israel for this
   * product (e.g. blades/sensitive goods) - hides the "add to cart" action instead of
   * accepting an order we can't actually fulfill. Defaults to true when omitted. */
  shipsToIsrael?: boolean;
  nameHe: string;
  nameEn: string;
  descriptionHe: string;
  category: ProductCategory;
  /** Supplier cost price in USD (from CJ, or researched estimate while offline) */
  costUsd: number;
  /** Estimated shipping cost to Israel in USD */
  shippingUsd: number;
  /** Estimated delivery time to Israel in days [min, max] */
  etaDays: [number, number];
  /** Whether the price is a live CJ price or a research-based estimate */
  priceSource: "cj-live" | "estimated";
  /** key used to pick a fallback SVG icon illustration when no real photo is available */
  icon: string;
  /** Real product photo URL from CJ - only populated once a live cjPid lookup succeeds */
  imageUrl?: string;
  featured?: boolean;
  specsHe: string[];
}
