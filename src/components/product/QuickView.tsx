"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { productDescription, productName } from "@/lib/format";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProductImage } from "./ProductImage";

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { t, locale } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-primary-dark/40 p-4" onClick={onClose}>
      <div
        className="grid max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[3/4] bg-lavender">
          <ProductImage src={product.images[0]} alt={productName(product, locale)} sizes="50vw" />
        </div>
        <div className="p-6">
          <button type="button" className="ms-auto mb-2 grid size-8 place-items-center" onClick={onClose}>
            <X className="size-4" />
          </button>
          <h2 className="font-display text-2xl">{productName(product, locale)}</h2>
          <RatingStars rating={product.rating} count={product.reviewsCount} />
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} className="mt-3 text-lg" />
          <p className="mt-3 text-sm leading-7 text-muted">{productDescription(product, locale)}</p>
          <Button href={`/product/${product.slug}`} className="mt-6 w-full">
            {t.hero.shopNow}
          </Button>
          <Link href={`/product/${product.slug}`} className="mt-3 block text-center text-sm text-primary">
            {t.product.sizeGuide}
          </Link>
        </div>
      </div>
    </div>
  );
}
