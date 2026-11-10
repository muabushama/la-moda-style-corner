import type { Locale, Product } from "@/types";

export function formatEGP(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function discountPercent(product: Product) {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}

export function productName(product: Product, locale: Locale) {
  return locale === "ar" ? product.nameAr : product.nameEn;
}

export function productDescription(product: Product, locale: Locale) {
  return locale === "ar" ? product.descriptionAr : product.descriptionEn;
}
