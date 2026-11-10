"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const { notify } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl text-primary-dark">{t.contact.title}</h1>
        <p className="mt-4 text-sm leading-7 text-muted">{t.auth.demoHint}</p>
        <ul className="mt-8 space-y-2 text-sm">
          <li>{t.footer.phone}</li>
          <li>{t.footer.email}</li>
          <li>{t.footer.location}</li>
        </ul>
      </div>
      <form
        className="space-y-4 rounded-3xl border border-border bg-white p-6"
        onSubmit={(e) => {
          e.preventDefault();
          const next: Record<string, string> = {};
          if (!name) next.name = t.checkout.required;
          if (!email.includes("@")) next.email = t.checkout.emailInvalid;
          if (!subject) next.subject = t.checkout.required;
          if (!message) next.message = t.checkout.required;
          setErrors(next);
          if (Object.keys(next).length) return;
          notify(t.contact.success);
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        }}
      >
        <FormInput label={t.checkout.name} value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
        <FormInput label={t.checkout.email} type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <FormInput label={t.contact.subject} value={subject} onChange={(e) => setSubject(e.target.value)} error={errors.subject} />
        <FormTextarea label={t.contact.message} value={message} onChange={(e) => setMessage(e.target.value)} error={errors.message} />
        <Button type="submit">{t.contact.send}</Button>
      </form>
    </div>
  );
}
