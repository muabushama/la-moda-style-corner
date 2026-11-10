"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { WishlistButton } from "@/components/product/WishlistButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { RatingStars } from "@/components/ui/RatingStars";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { useToast } from "@/context/ToastContext";
import { getReviewsForProduct } from "@/data/reviews";
import { getProductById, getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { discountPercent, productDescription, productName } from "@/lib/format";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const { t, locale } = useLanguage();
  const { addItem } = useCart();
  const { notify } = useToast();
  const { add, ids } = useRecentlyViewed();
  const [size, setSize] = useState("");
  const [colorId, setColorId] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) add(product.id);
  }, [product, add]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p>{t.notFound.title}</p>
        <Button href="/shop" className="mt-4">
          {t.nav.shop}
        </Button>
      </div>
    );
  }

  const name = productName(product, locale);
  const off = discountPercent(product);
  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product);
  const recent = ids.map(getProductById).filter(Boolean).filter((p) => p && p.id !== product.id).slice(0, 4);

  const addToCart = () => {
    if (!size || !colorId) {
      notify(t.product.needOptions);
      return;
    }
    addItem({ productId: product.id, size, colorId, quantity: qty });
    notify(t.product.addedCart);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: t.nav.home },
          { href: `/category/${product.category}`, label: t.nav[product.category] },
          { label: name },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={name} />
        <div>
          <h1 className="font-display text-4xl text-primary-dark">{name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={product.rating} count={product.reviewsCount} />
            <span className="text-xs text-muted">
              {product.reviewsCount} {t.product.reviews}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} className="text-xl" />
            {off ? (
              <span className="rounded-full bg-mint px-2 py-0.5 text-xs text-primary-dark">
                {off}% {t.product.discount}
              </span>
            ) : null}
          </div>
          <p className="mt-5 text-sm leading-7 text-muted">{productDescription(product, locale)}</p>
          <p className="mt-3 text-sm">{product.stock > 0 ? t.product.stock : t.product.out}</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">{t.product.selectColor}</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={locale === "ar" ? c.nameAr : c.nameEn}
                  onClick={() => setColorId(c.id)}
                  className={`size-9 rounded-full border ${colorId === c.id ? "ring-2 ring-primary ring-offset-2" : "border-border"}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="mb-2 text-sm font-medium">{t.product.selectSize}</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-4 py-1.5 text-sm ${size === s ? "border-primary bg-lavender" : "border-border"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <Link href="/size-guide" className="mt-2 inline-block text-sm text-primary">
              {t.product.sizeGuide}
            </Link>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">{t.product.qty}</p>
            <QuantitySelector value={qty} onChange={setQty} max={Math.max(1, product.stock)} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button onClick={addToCart} disabled={product.stock <= 0}>
              {t.product.addCart}
            </Button>
            <div className="flex items-center gap-2">
              <WishlistButton productId={product.id} />
              <span className="text-sm">{t.product.wishlist}</span>
            </div>
          </div>
          <div className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-5 text-sm">
            <h2 className="font-medium">{t.product.details}</h2>
            <p className="text-muted">{locale === "ar" ? product.materialsAr : product.materialsEn}</p>
            <h2 className="font-medium">{t.product.delivery}</h2>
            <p className="text-muted">{t.product.deliveryText}</p>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 font-display text-3xl">{t.sections.reviews}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <article key={r.id} className="rounded-2xl border border-border bg-white p-5">
              <RatingStars rating={r.rating} />
              <p className="mt-2 text-sm">{locale === "ar" ? r.commentAr : r.commentEn}</p>
              <p className="mt-2 text-xs text-muted">{locale === "ar" ? r.nameAr : r.nameEn}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 font-display text-3xl">{t.sections.related}</h2>
        <ProductGrid products={related} />
      </section>
      {recent.length ? (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-3xl">{t.sections.recently}</h2>
          <ProductGrid products={recent as typeof products} />
        </section>
      ) : null}
    </div>
  );
}
