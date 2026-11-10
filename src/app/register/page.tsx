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

export default function RegisterPage() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const { notify } = useToast();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-4 text-center font-display text-3xl">{t.auth.register}</h1>
        <p className="mt-2 text-center text-xs text-muted">{t.auth.demoHint}</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (pass !== confirm) {
              setError(t.auth.mismatch);
              return;
            }
            if (!terms) {
              setError(t.auth.termsNeed);
              return;
            }
            login({ name, email, phone });
            notify(t.auth.welcome);
            router.push("/account");
          }}
        >
          <FormInput label={t.auth.name} required value={name} onChange={(e) => setName(e.target.value)} />
          <FormInput label={t.auth.email} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormInput label={t.auth.phone} required value={phone} onChange={(e) => setPhone(e.target.value)} />
          <FormInput label={t.auth.password} type="password" required value={pass} onChange={(e) => setPass(e.target.value)} />
          <FormInput label={t.auth.confirm} type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            {t.auth.terms}
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full">
            {t.auth.register}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          {t.auth.haveAccount}{" "}
          <Link href="/login" className="text-primary">
            {t.auth.login}
          </Link>
        </p>
      </div>
    </div>
  );
}
