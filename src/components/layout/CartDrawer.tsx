"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { getProductById } from "@/data/products";
import { formatEGP, productName } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, count } = useCart();
  const { t, locale } = useLanguage();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-primary-dark/40" onClick={onClose}>
      <aside
        className="absolute inset-y-0 end-0 flex w-[min(100%,400px)] flex-col bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-medium">
            {t.cart.title} ({count})
          </h2>
          <button type="button" onClick={onClose} aria-label={t.close}>
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {items.length === 0 ? (
            <p className="text-sm text-muted">{t.cart.empty}</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const p = getProductById(item.productId);
                if (!p) return null;
                return (
                  <li key={`${item.productId}-${item.size}-${item.colorId}`} className="flex gap-3">
                    <div className="relative h-20 w-16 overflow-hidden rounded-xl bg-lavender">
                      <ProductImage src={p.images[0]} alt={productName(p, locale)} sizes="64px" />
                    </div>
                    <div className="text-sm">
                      <p>{productName(p, locale)}</p>
                      <p className="text-muted">
                        {item.size} · {item.quantity} × {formatEGP(p.price, locale)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-border p-5">
          <p className="mb-3 flex justify-between text-sm">
            <span>{t.cart.subtotal}</span>
            <span>{formatEGP(subtotal, locale)}</span>
          </p>
          <Button href="/cart" className="mb-2 w-full" onClick={onClose}>
            {t.nav.cart}
          </Button>
          <Link href="/shop" onClick={onClose} className="block text-center text-sm text-primary">
            {t.cart.continue}
          </Link>
        </div>
      </aside>
    </div>
  );
}
