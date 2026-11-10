"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { sampleOrders } from "@/data/orders";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";
import type { DemoOrder } from "@/types";

type OrdersContextValue = {
  orders: DemoOrder[];
  addOrder: (order: DemoOrder) => void;
  getOrder: (id: string) => DemoOrder | undefined;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [placed, setPlaced] = useState<DemoOrder[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPlaced(readStorage<DemoOrder[]>(STORAGE_KEYS.orders, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeStorage(STORAGE_KEYS.orders, placed);
  }, [placed, ready]);

  const addOrder = useCallback((order: DemoOrder) => {
    setPlaced((prev) => [order, ...prev]);
  }, []);

  const orders = useMemo(() => {
    const map = new Map<string, DemoOrder>();
    [...placed, ...sampleOrders].forEach((o) => map.set(o.id, o));
    return Array.from(map.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [placed]);

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  const value = useMemo(() => ({ orders, addOrder, getOrder }), [orders, addOrder, getOrder]);
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
