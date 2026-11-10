"use client";

import { useLanguage } from "@/context/LanguageContext";

export function AnnouncementBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-primary-dark text-center text-xs text-white md:text-sm">
      <p className="px-4 py-2">{t.announce}</p>
    </div>
  );
}
