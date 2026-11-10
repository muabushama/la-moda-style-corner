"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProductById } from "@/data/products";

export default function WishlistPage() {
  const { t } = useLanguage();
  const { ids } = useWishlist();
  const items = ids.map(getProductById).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { label: t.wishlist.title }]} />
      <h1 className="mb-8 font-display text-4xl text-primary-dark">{t.wishlist.title}</h1>
      {items.length === 0 ? (
        <EmptyState title={t.wishlist.empty} hint={t.wishlist.emptyHint} actionHref="/shop" actionLabel={t.cart.continue} />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (p ? <ProductCard key={p.id} product={p} /> : null))}
        </div>
      )}
      {items.length ? (
        <div className="mt-8 text-center">
          <Button href="/shop" variant="outline">
            {t.cart.continue}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
