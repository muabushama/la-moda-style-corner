"use client";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="botanical-bg mx-auto max-w-lg px-4 py-24 text-center">
      <svg viewBox="0 0 120 80" className="mx-auto h-24 w-36 text-primary" aria-hidden>
        <path d="M20 18h80" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M35 18c8 18 42 18 50 0" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M60 18v8" stroke="currentColor" strokeWidth="3" />
        <circle cx="60" cy="10" r="5" fill="currentColor" />
      </svg>
      <p className="font-display text-7xl text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl">{t.notFound.title}</h1>
      <p className="mt-2 text-muted">{t.notFound.text}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">{t.notFound.home}</Button>
        <Button href="/shop" variant="outline">
          {t.cart.continue}
        </Button>
      </div>
    </div>
  );
}
