export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const STORAGE_KEYS = {
  lang: "lamoda-lang",
  cart: "lamoda-cart",
  wishlist: "lamoda-wishlist",
  user: "lamoda-user",
  viewed: "lamoda-viewed",
  orders: "lamoda-orders",
  coupon: "lamoda-coupon",
} as const;
