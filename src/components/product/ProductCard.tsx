"use client";

import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { discountPercent, productName } from "@/lib/format";
import type { Product } from "@/types";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ProductImage } from "./ProductImage";
import { WishlistButton } from "./WishlistButton";
import { QuickView } from "./QuickView";

export function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const off = discountPercent(product);
  const name = productName(product, locale);

  return (
    <>
      <article className="group rounded-2xl border border-border bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-lavender">
          <Link href={`/product/${product.slug}`} className="absolute inset-0">
            <ProductImage
              src={product.images[0]}
              alt={name}
              className="transition duration-500 group-hover:scale-105"
            />
          </Link>
          <div className="absolute start-3 top-3 flex flex-col gap-1">
            {product.isOnSale && off > 0 ? (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] text-white">
                -{off}%
              </span>
            ) : null}
            {product.isNew ? (
              <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] text-primary-dark">
                {t.shop.new}
              </span>
            ) : null}
          </div>
          <WishlistButton productId={product.id} className="absolute end-3 top-3" />
          <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 transition group-hover:opacity-100 max-md:opacity-100">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex flex-1 items-center justify-center gap-1 rounded-full bg-white/95 py-2 text-xs"
            >
              <Eye className="size-3.5" /> {t.quickView}
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="grid size-9 place-items-center rounded-full bg-primary text-white"
              aria-label={t.product.addCart}
            >
              <ShoppingBag className="size-4" />
            </Link>
          </div>
        </div>
        <div className="px-1 pt-3">
          <Link href={`/product/${product.slug}`} className="line-clamp-1 text-sm font-medium">
            {name}
          </Link>
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} className="mt-1" />
        </div>
      </article>
      {open ? <QuickView product={product} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
