"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";

type WishlistContextValue = {
  ids: string[];
  toggle: (id: string) => boolean;
  has: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIds(readStorage<string[]>(STORAGE_KEYS.wishlist, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeStorage(STORAGE_KEYS.wishlist, ids);
  }, [ids, ready]);

  const toggle = useCallback((id: string) => {
    const exists = ids.includes(id);
    setIds((prev) => (exists ? prev.filter((x) => x !== id) : [...prev, id]));
    return !exists;
  }, [ids]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
