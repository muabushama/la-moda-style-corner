"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductListing } from "@/components/product/ProductListing";
import { SearchBar } from "@/components/layout/SearchBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categories } from "@/data/categories";
import { useLanguage } from "@/context/LanguageContext";
import { searchProducts } from "@/lib/products";

function SearchInner() {
  const { t, locale } = useLanguage();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const results = q ? searchProducts(q) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { label: t.search.title }]} />
      <h1 className="mb-6 font-display text-4xl text-primary-dark">{t.search.title}</h1>
      <div className="mb-8 max-w-xl">
        <SearchBar />
      </div>
      {q ? (
        <p className="mb-6 text-sm text-muted">
          {t.search.results} “{q}” — {results.length} {t.shop.count}
        </p>
      ) : null}
      {q && results.length === 0 ? (
        <div className="rounded-3xl border border-border bg-white p-10 text-center">
          <p>{t.search.none}</p>
          <p className="mt-4 text-sm text-muted">{t.search.suggest}</p>
          <div className="mt-4 flex justify-center gap-3">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="text-primary">
                {locale === "ar" ? c.nameAr : c.nameEn}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <ProductListing products={results.length ? results : []} />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
