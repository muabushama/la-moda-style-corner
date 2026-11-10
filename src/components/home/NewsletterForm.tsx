"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const { notify } = useToast();
  const [email, setEmail] = useState("");

  return (
    <form
      className={compact ? "space-y-2" : "mx-auto flex max-w-md flex-col gap-3 sm:flex-row"}
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@")) return;
        notify(t.newsletter.success);
        setEmail("");
      }}
    >
      {!compact ? <p className="sr-only">{t.newsletter.hint}</p> : <p className="text-sm text-muted">{t.newsletter.hint}</p>}
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.newsletter.placeholder}
        className="flex-1 rounded-full border border-border bg-white px-4 py-2.5 text-sm outline-none"
      />
      <button type="submit" className="rounded-full bg-primary px-5 py-2.5 text-sm text-white">
        {t.newsletter.cta}
      </button>
    </form>
  );
}
