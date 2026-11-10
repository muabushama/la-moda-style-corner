"use client";

import { useParams } from "next/navigation";
import { ProductListing } from "@/components/product/ProductListing";
import { ProductImage } from "@/components/product/ProductImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import type { CategorySlug } from "@/types";
import Link from "next/link";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useLanguage();
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return (
      <div className="py-20 text-center">
        <p>{t.notFound.title}</p>
        <Link href="/shop" className="text-primary">
          {t.nav.shop}
        </Link>
      </div>
    );
  }
  const list = products.filter((p) => p.category === (slug as CategorySlug));
  const name = locale === "ar" ? category.nameAr : category.nameEn;

  return (
    <div>
      <div className="relative h-56 overflow-hidden md:h-72">
        <ProductImage src={category.image} alt={name} sizes="100vw" />
        <div className="absolute inset-0 bg-primary-dark/45" />
        <div className="absolute inset-0 flex items-end p-8 text-white md:p-12">
          <div>
            <h1 className="font-display text-4xl">{name}</h1>
            <p className="mt-2 max-w-xl text-white/85">{locale === "ar" ? category.descriptionAr : category.descriptionEn}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { href: "/shop", label: t.nav.shop }, { label: name }]} />
        <ProductListing products={list} hideCategory />
      </div>
    </div>
  );
}
