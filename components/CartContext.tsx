"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export interface CartItem {
  slug: string;
  nameHe: string;
  priceIls: number;
  shippingIls: number;
  icon: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  subtotalIls: number;
  shippingIls: number;
  totalIls: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "camp-store-cart";

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const [hydrated, setHydrated] = useState(false);

  // First client render must match the server-rendered (empty) markup, so we
  // only trust localStorage once mounted, then let the write-back effect below
  // persist further changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from an external store (localStorage), not a derived-state update
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) => (i.slug === item.slug ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeItem = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));

  const setQty = (slug: string, qty: number) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const { subtotalIls, shippingIls, count } = useMemo(() => {
    const subtotalIls = items.reduce((sum, i) => sum + i.priceIls * i.qty, 0);
    // Charge shipping once per distinct product line, not per unit.
    const shippingIls = items.reduce((sum, i) => sum + i.shippingIls, 0);
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    return { subtotalIls, shippingIls, count };
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    setQty,
    clear,
    subtotalIls,
    shippingIls,
    totalIls: subtotalIls + shippingIls,
    count,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
