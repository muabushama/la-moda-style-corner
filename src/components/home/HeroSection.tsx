"use client";

import Image from "next/image";
import { RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden botanical-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 lg:grid-cols-2 lg:gap-10 lg:py-16">
        <div className="min-w-0">
          <h1 className="font-display text-3xl leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
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
        <div className="relative mx-auto flex aspect-[4/5] w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border border-white bg-lavender/70 p-3 shadow-xl sm:aspect-[5/4] sm:max-w-none sm:rounded-[2.5rem] sm:p-4">
          <Image
            src="/images/la-moda-logo.png"
            alt="LA MODA STYLE CORNER"
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-contain p-4 sm:p-6"
            priority
          />
          <p className="relative z-10 mt-auto max-w-full rounded-2xl bg-white/90 px-3 py-2 text-center font-display text-base leading-snug text-primary sm:px-4 sm:text-lg md:text-2xl">
            {t.hero.overlay}
          </p>
        </div>
      </div>
    </section>
  );
}
