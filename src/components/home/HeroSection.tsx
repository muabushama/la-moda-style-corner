"use client";

import Image from "next/image";
import { RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

const rack =
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=80";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden botanical-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:py-16">
        <div>
          <h1 className="font-display text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-4 max-w-md text-muted leading-7">{t.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-primary">
            <span className="inline-flex items-center gap-2">
              <Truck className="size-4" /> {t.hero.fast}
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4" /> {t.hero.secure}
            </span>
            <span className="inline-flex items-center gap-2">
              <RefreshCcw className="size-4" /> {t.hero.returns}
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/shop">{t.hero.shopNow} →</Button>
            <Button href="/category/women" variant="secondary">
              {t.hero.explore}
            </Button>
          </div>
        </div>
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem] border border-white shadow-xl">
          <Image src={rack} alt={t.hero.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
        </div>
      </div>
    </section>
  );
}
