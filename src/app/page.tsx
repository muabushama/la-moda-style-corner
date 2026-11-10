"use client";

import { Award, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryCards } from "@/components/home/CategoryCard";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductImage } from "@/components/product/ProductImage";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { instagramImages, promoBanner } from "@/data/banners";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  const newest = products.filter((p) => p.isNew).slice(0, 8);
  const best = products.filter((p) => p.isBestSeller).slice(0, 8);
  const why = [
    { icon: Award, ...t.why.quality },
    { icon: Truck, ...t.why.delivery },
    { icon: ShieldCheck, ...t.why.secure },
    { icon: RefreshCcw, ...t.why.returns },
  ];
  const collections = [
    { href: "/category/women", label: t.nav.women },
    { href: "/category/boys", label: t.nav.boys },
    { href: "/category/girls", label: t.nav.girls },
    { href: "/shop?new=1", label: t.nav.newArrivals },
    { href: "/shop?sale=1", label: t.nav.sale },
  ];

  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title={t.sections.categories} />
        <CategoryCards />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <SectionHeading title={t.sections.newArrivals} />
        <ProductGrid products={newest} />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <SectionHeading title={t.sections.bestSellers} />
        <ProductGrid products={best} />
      </section>
      <section className="relative mx-auto my-10 max-w-7xl overflow-hidden rounded-[2rem] px-4">
        <div className="relative min-h-72 overflow-hidden rounded-[2rem]">
          <ProductImage src={promoBanner.image} alt={t.promo.title} sizes="100vw" />
          <div className="absolute inset-0 bg-primary-dark/55" />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-8 text-white md:p-14">
            <h2 className="font-display text-4xl">{t.promo.title}</h2>
            <p className="mt-3 max-w-md text-white/85">{t.promo.text}</p>
            <Button href="/shop?sale=1" variant="secondary" className="mt-6">
              {t.promo.cta}
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading title={t.sections.collections} />
        <div className="flex flex-wrap justify-center gap-3">
          {collections.map((c) => (
            <Button key={c.href} href={c.href} variant="outline">
              {c.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="bg-lavender/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={t.sections.why} />
          <div className="grid gap-5 md:grid-cols-4">
            {why.map((item) => (
              <div key={item.t} className="rounded-3xl bg-white p-6 text-center shadow-sm">
                <item.icon className="mx-auto mb-3 size-7 text-primary" />
                <h3 className="font-medium">{item.t}</h3>
                <p className="mt-2 text-sm text-muted">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title={t.sections.testimonials} />
        <Testimonials />
      </section>
      <section className="botanical-bg py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <SectionHeading title={t.sections.newsletter} subtitle={t.newsletter.hint} />
          <NewsletterForm />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title={t.sections.instagram} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {instagramImages.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-2xl">
              <ProductImage src={src} alt="LA MODA" sizes="16vw" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
