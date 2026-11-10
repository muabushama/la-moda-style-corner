"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { filterProducts, sortProducts } from "@/lib/products";
import type { Product, ProductFilters as Filters, SortOption } from "@/types";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { ProductSorting } from "./ProductSorting";

export function ProductListing({
  products,
  hideCategory,
}: {
  products: Product[];
  hideCategory?: boolean;
}) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<SortOption>("featured");
  const [open, setOpen] = useState(false);

  const list = useMemo(() => sortProducts(filterProducts(products, filters), sort), [products, filters, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden rounded-2xl border border-border bg-white p-5 lg:block">
        <h2 className="mb-4 font-medium">{t.shop.filters}</h2>
        <ProductFilters value={filters} onChange={setFilters} hideCategory={hideCategory} />
      </aside>
      <div>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <p className="text-sm text-muted">
            {list.length} {t.shop.count}
          </p>
          <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto">
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm lg:hidden"
              onClick={() => setOpen(true)}
            >
              <SlidersHorizontal className="size-4" /> {t.shop.filters}
            </button>
            <div className="min-w-0 flex-1 sm:w-52 sm:flex-none">
              <ProductSorting value={sort} onChange={setSort} />
            </div>
          </div>
        </div>
        {list.length ? <ProductGrid products={list} /> : <p className="py-16 text-center text-muted">{t.empty}</p>}
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-primary-dark/40 lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute inset-y-0 start-0 w-full max-w-[320px] overflow-auto bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-medium">{t.shop.filters}</h2>
              <button type="button" onClick={() => setOpen(false)}>
                {t.shop.close}
              </button>
            </div>
            <ProductFilters value={filters} onChange={setFilters} hideCategory={hideCategory} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
