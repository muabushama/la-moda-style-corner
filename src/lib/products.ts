import { products } from "@/data/products";
import type { Product, ProductFilters, SortOption } from "@/types";

export function filterProducts(list: Product[], filters: ProductFilters) {
  return list.filter((p) => {
    if (filters.category && filters.category !== "all" && p.category !== filters.category) return false;
    if (filters.minPrice != null && p.price < filters.minPrice) return false;
    if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
    if (filters.sizes?.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
    if (filters.colors?.length && !filters.colors.some((c) => p.colors.some((pc) => pc.id === c))) return false;
    if (filters.inStock && p.stock <= 0) return false;
    if (filters.onSale && !p.isOnSale) return false;
    if (filters.isNew && !p.isNew) return false;
    return true;
  });
}

export function sortProducts(list: Product[], sort: SortOption) {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "best-selling":
      return copy.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || b.reviewsCount - a.reviewsCount);
    default:
      return copy.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || Number(b.isNew) - Number(a.isNew));
  }
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.nameAr.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.includes(q)
  );
}

export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
export const allColors = Array.from(
  new Map(products.flatMap((p) => p.colors).map((c) => [c.id, c])).values()
);
