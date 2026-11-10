"use client";

import { ProductImage } from "@/components/product/ProductImage";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, locale } = useLanguage();
  return (
    <div>
      <div className="relative h-64 md:h-80">
        <ProductImage
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80"
          alt={t.about.title}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-dark/45" />
        <h1 className="absolute inset-0 flex items-end p-8 font-display text-4xl text-white md:p-14 md:text-5xl">
          {t.about.title}
        </h1>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-lg leading-8">{t.about.intro}</p>
        <p className="mt-6 leading-8 text-muted">{t.about.philosophy}</p>
        <div className="mt-10 grid gap-4 text-center md:grid-cols-3">
          <div className="rounded-2xl border border-border p-5">
            <p className="text-2xl font-medium text-primary">10K+</p>
            <p className="text-sm text-muted">{locale === "ar" ? "عميلات سعيدات" : "Happy customers"}</p>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <p className="text-2xl font-medium text-primary">99%</p>
            <p className="text-sm text-muted">{locale === "ar" ? "رضا" : "Satisfaction rate"}</p>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <p className="text-2xl font-medium text-primary">24/7</p>
            <p className="text-sm text-muted">{t.nav.contact}</p>
          </div>
        </div>
        <h2 className="mt-10 font-display text-3xl">{t.about.values}</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {[t.about.v1, t.about.v2, t.about.v3].map((v) => (
            <li key={v} className="rounded-2xl bg-lavender p-5 text-center">
              {v}
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Button href="/shop">{t.hero.shopNow}</Button>
        </div>
      </div>
    </div>
  );
}
