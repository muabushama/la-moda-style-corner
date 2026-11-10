"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { t, toggleLocale } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-primary"
    >
      {t.lang}
    </button>
  );
}
