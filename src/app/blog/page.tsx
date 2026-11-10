"use client";

import Link from "next/link";
import { ProductImage } from "@/components/product/ProductImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const { t, locale } = useLanguage();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { label: t.blog.title }]} />
      <h1 className="font-display text-4xl text-primary-dark">{t.blog.title}</h1>
      <p className="mt-2 text-muted">{t.blog.subtitle}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:-translate-y-0.5"
          >
            <div className="relative aspect-[4/3]">
              <ProductImage src={post.image} alt={locale === "ar" ? post.titleAr : post.titleEn} sizes="33vw" />
            </div>
            <div className="p-5">
              <p className="text-xs text-muted">{post.date}</p>
              <h2 className="mt-2 font-display text-2xl">{locale === "ar" ? post.titleAr : post.titleEn}</h2>
              <p className="mt-2 text-sm text-muted">{locale === "ar" ? post.excerptAr : post.excerptEn}</p>
              <span className="mt-4 inline-block text-sm text-primary">{t.blog.read}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
