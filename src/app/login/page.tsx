"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login, loginDemo } = useAuth();
  const { notify } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="mx-auto my-10 grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-white shadow-sm md:grid-cols-2">
      <div
        className="relative hidden min-h-80 bg-cover bg-center md:block"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80)",
        }}
      />
      <div className="p-8 text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-4 font-display text-3xl">{t.auth.login}</h1>
        <p className="mt-2 text-xs text-muted">{t.auth.demoHint}</p>
        <form
          className="mt-6 space-y-4 text-start"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) return;
            login({ name: email.split("@")[0], email, phone: "" });
            notify(t.auth.welcome);
            router.push("/account");
          }}
        >
          <FormInput label={t.auth.email} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormInput label={t.auth.password} type="password" required placeholder="••••••••" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            {t.auth.remember}
          </label>
          <Button type="submit" className="w-full">
            {t.auth.login}
          </Button>
        </form>
        <Button
          variant="secondary"
          className="mt-3 w-full"
          onClick={() => {
            loginDemo();
            notify(t.auth.welcome);
            router.push("/account");
          }}
        >
          {t.auth.demo}
        </Button>
        <p className="mt-4 text-sm">
          <Link href="/forgot-password" className="text-primary">
            {t.auth.forgot}
          </Link>
        </p>
        <p className="mt-2 text-sm text-muted">
          {t.auth.noAccount}{" "}
          <Link href="/register" className="text-primary">
            {t.auth.register}
          </Link>
        </p>
        <div className="mt-6 grid gap-2">
          <p className="text-xs text-muted">{t.auth.social}</p>
          <button type="button" className="rounded-full border border-border py-2 text-sm" onClick={() => notify(t.auth.demoHint)}>
            Google
          </button>
          <button type="button" className="rounded-full border border-border py-2 text-sm" onClick={() => notify(t.auth.demoHint)}>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

