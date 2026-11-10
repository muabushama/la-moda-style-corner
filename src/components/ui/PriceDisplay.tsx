"use client";

import { useLanguage } from "@/context/LanguageContext";
import { formatEGP } from "@/lib/format";

export function PriceDisplay({
  price,
  originalPrice,
  className = "",
}: {
  price: number;
  originalPrice?: number;
  className?: string;
}) {
  const { locale } = useLanguage();
  const onSale = originalPrice && originalPrice > price;
  return (
    <div className={`flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className="font-medium text-primary">{formatEGP(price, locale)}</span>
      {onSale ? (
        <span className="text-sm text-muted line-through">{formatEGP(originalPrice, locale)}</span>
      ) : null}
    </div>
  );
}
