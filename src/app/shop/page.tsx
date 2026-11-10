"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductListing } from "@/components/product/ProductListing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { Suspense } from "react";

function ShopInner() {
  const { t } = useLanguage();
  const params = useSearchParams();
  const list = useMemo(() => {
    let next = products;
    if (params.get("sale")) next = next.filter((p) => p.isOnSale);
    if (params.get("new")) next = next.filter((p) => p.isNew);
    return next;
  }, [params]);

  const title = params.get("sale") ? t.nav.sale : params.get("new") ? t.nav.newArrivals : t.shop.title;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { label: title }]} />
      <h1 className="mb-8 font-display text-4xl text-primary-dark">{title}</h1>
      <ProductListing products={list} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopInner />
    </Suspense>
  );
}
