"use client";

import Link from "next/link";
import { ProductImage } from "@/components/product/ProductImage";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/categories";

export function CategoryCards() {
  const { locale } = useLanguage();
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/category/${c.slug}`}
          className="group relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <ProductImage src={c.image} alt={locale === "ar" ? c.nameAr : c.nameEn} sizes="33vw" className="transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <h3 className="font-display text-3xl">{locale === "ar" ? c.nameAr : c.nameEn}</h3>
            <p className="mt-1 text-sm text-white/80">{locale === "ar" ? c.descriptionAr : c.descriptionEn}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
