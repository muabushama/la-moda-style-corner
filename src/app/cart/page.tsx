"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product/ProductImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import { getProductById } from "@/data/products";
import { formatEGP, productName } from "@/lib/format";

export default function CartPage() {
  const { t, locale } = useLanguage();
  const { items, updateQty, removeItem, subtotal, discount, coupon, applyCoupon } = useCart();
  const { notify } = useToast();
  const [code, setCode] = useState(coupon ?? "");
  const shipping = items.length ? 60 : 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { label: t.cart.title }]} />
      <h1 className="mb-8 font-display text-4xl text-primary-dark">{t.cart.title}</h1>
      {items.length === 0 ? (
        <EmptyState title={t.cart.empty} hint={t.cart.emptyHint} actionHref="/shop" actionLabel={t.cart.continue} />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {items.map((item) => {
              const p = getProductById(item.productId);
              if (!p) return null;
              const color = p.colors.find((c) => c.id === item.colorId);
              return (
                <li
                  key={`${item.productId}-${item.size}-${item.colorId}`}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-3 sm:flex-row sm:gap-4 sm:p-4"
                >
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-lavender">
                    <ProductImage src={p.images[0]} alt={productName(p, locale)} sizes="96px" />
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-medium">{productName(p, locale)}</p>
                    <p className="mt-1 text-muted">
                      {t.cart.size}: {item.size} · {t.cart.color}: {color ? (locale === "ar" ? color.nameAr : color.nameEn) : item.colorId}
                    </p>
                    <p className="mt-1">{formatEGP(p.price, locale)}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <QuantitySelector value={item.quantity} onChange={(n) => updateQty(item, n)} />
                      <button type="button" className="text-primary" onClick={() => removeItem(item)}>
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium sm:text-end">{formatEGP(p.price * item.quantity, locale)}</p>
                </li>
              );
            })}
          </ul>
          <aside className="h-fit rounded-2xl border border-border bg-white p-5">
            <div className="mb-3 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.cart.coupon}
                className="flex-1 rounded-full border border-border px-3 py-2 text-sm"
              />
              <Button
                variant="secondary"
                onClick={() => notify(applyCoupon(code) ? t.cart.couponOk : t.cart.couponBad)}
              >
                {t.cart.apply}
              </Button>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>{t.cart.subtotal}</dt>
                <dd>{formatEGP(subtotal, locale)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t.cart.shipping}</dt>
                <dd>{formatEGP(shipping, locale)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t.cart.discount}</dt>
                <dd>-{formatEGP(discount, locale)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-medium">
                <dt>{t.cart.total}</dt>
                <dd>{formatEGP(total, locale)}</dd>
              </div>
            </dl>
            <Button href="/checkout" className="mt-5 w-full">
              {t.cart.checkout}
            </Button>
            <Button href="/shop" variant="ghost" className="mt-2 w-full">
              {t.cart.continue}
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
