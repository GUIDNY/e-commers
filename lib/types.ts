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
  /** key used to pick a fallback SVG icon illustration */
  icon: string;
  featured?: boolean;
  specsHe: string[];
}
