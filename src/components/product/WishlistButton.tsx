"use client";

import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import { useWishlist } from "@/context/WishlistContext";

export function WishlistButton({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const { notify } = useToast();
  const { t } = useLanguage();
  const active = has(productId);
  return (
    <button
      type="button"
      aria-label={t.product.wishlist}
      className={`grid size-10 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-105 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggle(productId);
        notify(added ? t.product.addedWish : t.product.removedWish);
      }}
    >
      <Heart className={`size-4 ${active ? "fill-primary text-primary" : "text-primary"}`} />
    </button>
  );
}
