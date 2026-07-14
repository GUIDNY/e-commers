/**
 * Global markup applied on top of the CJdropshipping supplier cost, as requested (30%).
 */
export const MARKUP_RATE = 0.3;

/**
 * Minimum flat profit (in ILS) per unit, regardless of the percentage markup
 * above - a 30% margin on a $1.53 item is a few agorot, not worth selling.
 * The actual markup applied is whichever of the two is larger.
 */
export const MIN_MARKUP_ILS = 35;

/**
 * Approximate USD -> ILS conversion used for display. CJ prices arrive in USD;
 * update this if you want the storefront pegged to a live exchange-rate feed.
 */
export const USD_TO_ILS = 3.7;

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

/** Sell price in ILS: supplier cost plus whichever markup is larger -
 * 30% of cost, or a flat MIN_MARKUP_ILS floor - rounded to a whole shekel. */
export function sellPriceIls(costUsd: number): number {
  const costIls = usdToIls(costUsd);
  const profitIls = Math.max(costIls * MARKUP_RATE, MIN_MARKUP_ILS);
  return Math.round(costIls + profitIls);
}

/** Real shipping cost in ILS (from CJ's live freight quote), converted from USD. */
export function shippingPriceIls(shippingUsd: number): number {
  return Math.round(usdToIls(shippingUsd));
}

/**
 * Flat shipping fee shown to the customer, regardless of the real per-product
 * cost above - matches how Israeli retailers usually present shipping (a
 * small fixed fee), rather than the highly-variable real supplier freight
 * cost, which can look alarming next to a cheap item's price. The gap
 * between the real cost and this flat fee is absorbed into the displayed
 * item price (see `displayPricing`) so the total the customer pays is
 * unchanged - only the price/shipping split is normalized.
 */
export const DISPLAY_SHIPPING_ILS = 20;

export interface DisplayPricing {
  /** Item price shown to the customer - absorbs the gap between real
   * shipping cost and the flat DISPLAY_SHIPPING_ILS fee. */
  priceIls: number;
  /** Always DISPLAY_SHIPPING_ILS - what the customer sees as "shipping". */
  shippingIls: number;
}

/** Combines cost+markup and real shipping into a (price, flat-shipping) pair
 * whose sum always equals the true total (sellPriceIls + real shippingIls). */
export function displayPricing(costUsd: number, shippingUsd: number): DisplayPricing {
  const trueTotal = sellPriceIls(costUsd) + shippingPriceIls(shippingUsd);
  return {
    priceIls: Math.max(0, Math.round(trueTotal - DISPLAY_SHIPPING_ILS)),
    shippingIls: DISPLAY_SHIPPING_ILS,
  };
}
