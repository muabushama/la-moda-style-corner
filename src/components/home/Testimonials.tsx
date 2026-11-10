"use client";

import { useLanguage } from "@/context/LanguageContext";
import { testimonials } from "@/data/testimonials";
import { RatingStars } from "@/components/ui/RatingStars";

export function Testimonials() {
  const { locale } = useLanguage();
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {testimonials.map((item) => (
        <blockquote key={item.id} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
          <RatingStars rating={item.rating} />
          <p className="mt-3 text-sm leading-7">{locale === "ar" ? item.quoteAr : item.quoteEn}</p>
          <footer className="mt-4 text-sm text-muted">
            {locale === "ar" ? item.nameAr : item.nameEn} · {locale === "ar" ? item.cityAr : item.cityEn}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
