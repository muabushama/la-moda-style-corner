"use client";

import { Accordion } from "@/components/ui/Accordion";
import { useLanguage } from "@/context/LanguageContext";
import { faqItems } from "@/data/faq";

export default function FaqPage() {
  const { t, locale } = useLanguage();
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="mb-8 font-display text-4xl text-primary-dark">{t.nav.faq}</h1>
      <Accordion
        items={faqItems.map((item) => ({
          id: item.id,
          title: locale === "ar" ? item.qAr : item.qEn,
          body: locale === "ar" ? item.aAr : item.aEn,
        }))}
      />
    </div>
  );
}
