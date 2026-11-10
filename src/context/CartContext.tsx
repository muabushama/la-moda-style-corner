"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEMO_COUPON, DEMO_COUPON_RATE } from "@/data/shipping";
import { getProductById } from "@/data/products";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";
import type { CartItem } from "@/types";

type CartContextValue = {
  items: CartItem[];
  coupon: string | null;
  addItem: (item: CartItem) => void;
  updateQty: (item: CartItem, quantity: number) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  subtotal: number;
  discount: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function sameLine(a: CartItem, b: Pick<CartItem, "productId" | "size" | "colorId">) {
  return a.productId === b.productId && a.size === b.size && a.colorId === b.colorId;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readStorage<CartItem[]>(STORAGE_KEYS.cart, []));
    setCoupon(readStorage<string | null>(STORAGE_KEYS.coupon, null));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeStorage(STORAGE_KEYS.cart, items);
  }, [items, ready]);

  useEffect(() => {
    if (ready) writeStorage(STORAGE_KEYS.coupon, coupon);
  }, [coupon, ready]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => sameLine(p, item));
      if (existing) {
        return prev.map((p) =>
          sameLine(p, item) ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  }, []);

  const updateQty = useCallback((item: CartItem, quantity: number) => {
    setItems((prev) =>
      prev
        .map((p) => (sameLine(p, item) ? { ...p, quantity } : p))
        .filter((p) => p.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((item: CartItem) => {
    setItems((prev) => prev.filter((p) => !sameLine(p, item)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const ok = code.trim().toUpperCase() === DEMO_COUPON;
    setCoupon(ok ? DEMO_COUPON : null);
    return ok;
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [items]
  );

  const discount = coupon === DEMO_COUPON ? Math.round(subtotal * DEMO_COUPON_RATE) : 0;
  const count = items.reduce((n, i) => n + i.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      coupon,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      applyCoupon,
      subtotal,
      discount,
      count,
    }),
    [items, coupon, addItem, updateQty, removeItem, clearCart, applyCoupon, subtotal, discount, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
