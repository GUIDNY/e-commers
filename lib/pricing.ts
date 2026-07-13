/**
 * Global markup applied on top of the CJdropshipping supplier cost, as requested (30%).
 */
export const MARKUP_RATE = 0.3;

/**
 * Approximate USD -> ILS conversion used for display. CJ prices arrive in USD;
 * update this if you want the storefront pegged to a live exchange-rate feed.
 */
export const USD_TO_ILS = 3.7;

export function applyMarkup(costUsd: number): number {
  return costUsd * (1 + MARKUP_RATE);
}

export function usdToIls(usd: number): number {
  return usd * USD_TO_ILS;
}

export function formatIls(amount: number): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Sell price in ILS, cost + markup converted from USD and rounded to a whole shekel. */
export function sellPriceIls(costUsd: number): number {
  return Math.round(usdToIls(applyMarkup(costUsd)));
}

/** Shipping price in ILS, converted from USD and rounded to a whole shekel. */
export function shippingPriceIls(shippingUsd: number): number {
  return Math.round(usdToIls(shippingUsd));
}
