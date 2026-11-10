"use client";

import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-4 font-display text-3xl">{t.auth.forgot}</h1>
        {sent ? (
          <p className="mt-6 text-sm leading-7 text-muted">{t.auth.sent}</p>
        ) : (
          <form
            className="mt-6 space-y-4 text-start"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <FormInput label={t.auth.email} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" className="w-full">
              {t.checkout.next}
            </Button>
          </form>
        )}
        <Button href="/login" variant="ghost" className="mt-4">
          {t.auth.login}
        </Button>
      </div>
    </div>
  );
}
