"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useOrders } from "@/context/OrdersContext";
import { getProductById } from "@/data/products";
import { deliveryOptions } from "@/data/shipping";
import { formatEGP, productName } from "@/lib/format";
import type { CheckoutInfo, DemoOrder } from "@/types";

const empty: CheckoutInfo = {
  fullName: "",
  email: "",
  phone: "",
  country: "Egypt",
  city: "",
  area: "",
  street: "",
  apartment: "",
};

export default function CheckoutPage() {
  const { t, locale } = useLanguage();
  const { items, subtotal, discount, coupon, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState<CheckoutInfo>({
    ...empty,
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deliveryId, setDeliveryId] = useState(deliveryOptions[0].id);

  const delivery = deliveryOptions.find((d) => d.id === deliveryId)!;
  const total = subtotal - discount + delivery.price;

  const validate = () => {
    const next: Record<string, string> = {};
    (["fullName", "email", "phone", "country", "city", "area", "street"] as const).forEach((k) => {
      if (!info[k]?.trim()) next[k] = t.checkout.required;
    });
    if (info.email && !info.email.includes("@")) next.email = t.checkout.emailInvalid;
    if (info.phone && info.phone.replace(/\D/g, "").length < 8) next.phone = t.checkout.phoneInvalid;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const place = () => {
    if (!validate()) {
      setStep(1);
      return;
    }
    const id = `LM-${Math.floor(10000 + Math.random() * 89999)}`;
    const order: DemoOrder = {
      id,
      createdAt: new Date().toISOString(),
      items: items.map((item) => {
        const p = getProductById(item.productId)!;
        return {
          ...item,
          nameAr: p.nameAr,
          nameEn: p.nameEn,
          price: p.price,
          image: p.images[0],
        };
      }),
      customer: info,
      deliveryId,
      payment: "cod",
      subtotal,
      shipping: delivery.price,
      discount,
      total,
      status: "processing",
      coupon: coupon ?? undefined,
    };
    addOrder(order);
    clearCart();
    router.push(`/order-success?id=${id}`);
  };

  if (!items.length) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p>{t.cart.empty}</p>
        <Button href="/shop" className="mt-4">
          {t.cart.continue}
        </Button>
      </div>
    );
  }

  const set = (key: keyof CheckoutInfo, value: string) => setInfo((p) => ({ ...p, [key]: value }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { href: "/cart", label: t.cart.title }, { label: t.checkout.title }]} />
      <h1 className="mb-4 font-display text-4xl text-primary-dark">{t.checkout.title}</h1>
      <CheckoutStepper step={step} labels={[t.checkout.step1, t.checkout.step2, t.checkout.step3, t.checkout.step4]} />

      {step === 1 ? (
        <div className="grid gap-4 rounded-3xl border border-border bg-white p-6 md:grid-cols-2">
          <FormInput label={t.checkout.name} value={info.fullName} onChange={(e) => set("fullName", e.target.value)} error={errors.fullName} />
          <FormInput label={t.checkout.email} type="email" value={info.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
          <FormInput label={t.checkout.phone} value={info.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
          <FormInput label={t.checkout.country} value={info.country} onChange={(e) => set("country", e.target.value)} error={errors.country} />
          <FormInput label={t.checkout.city} value={info.city} onChange={(e) => set("city", e.target.value)} error={errors.city} />
          <FormInput label={t.checkout.area} value={info.area} onChange={(e) => set("area", e.target.value)} error={errors.area} />
          <FormInput label={t.checkout.street} value={info.street} onChange={(e) => set("street", e.target.value)} error={errors.street} />
          <FormInput label={t.checkout.apt} value={info.apartment ?? ""} onChange={(e) => set("apartment", e.target.value)} />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-3 rounded-3xl border border-border bg-white p-6">
          {deliveryOptions.map((opt) => (
            <label key={opt.id} className="flex cursor-pointer items-center justify-between rounded-2xl border border-border p-4">
              <span>
                <input type="radio" className="me-3" checked={deliveryId === opt.id} onChange={() => setDeliveryId(opt.id)} />
                {locale === "ar" ? opt.nameAr : opt.nameEn}
                <span className="ms-2 text-sm text-muted">{locale === "ar" ? opt.daysAr : opt.daysEn}</span>
              </span>
              <span>{formatEGP(opt.price, locale)}</span>
            </label>
          ))}
        </div>
      ) : null}

      {step === 3 ? (
        <div className="rounded-3xl border border-border bg-white p-6">
          <label className="flex items-start gap-3 rounded-2xl border border-primary bg-lavender p-4">
            <input type="radio" checked readOnly />
            <span>
              <strong>{t.checkout.demoPay}</strong>
              <p className="mt-1 text-sm text-muted">{t.checkout.demoPayHint}</p>
            </span>
          </label>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-4 rounded-3xl border border-border bg-white p-6 text-sm">
          <p>
            {info.fullName} · {info.email} · {info.phone}
          </p>
          <p className="text-muted">
            {info.street}, {info.area}, {info.city}, {info.country}
          </p>
          <p>{t.checkout.demoPay}</p>
          <ul className="divide-y divide-border">
            {items.map((item) => {
              const p = getProductById(item.productId);
              if (!p) return null;
              return (
                <li key={`${item.productId}-${item.size}`} className="flex justify-between py-2">
                  <span>
                    {productName(p, locale)} × {item.quantity}
                  </span>
                  <span>{formatEGP(p.price * item.quantity, locale)}</span>
                </li>
              );
            })}
          </ul>
          <p className="flex justify-between">
            <span>{t.cart.subtotal}</span>
            <span>{formatEGP(subtotal, locale)}</span>
          </p>
          <p className="flex justify-between">
            <span>{t.cart.shipping}</span>
            <span>{formatEGP(delivery.price, locale)}</span>
          </p>
          <p className="flex justify-between">
            <span>{t.cart.discount}</span>
            <span>-{formatEGP(discount, locale)}</span>
          </p>
          <p className="flex justify-between font-medium">
            <span>{t.cart.total}</span>
            <span>{formatEGP(total, locale)}</span>
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            {t.checkout.back}
          </Button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <Button
            onClick={() => {
              if (step === 1 && !validate()) return;
              setStep(step + 1);
            }}
          >
            {t.checkout.next}
          </Button>
        ) : (
          <Button onClick={place}>{t.checkout.place}</Button>
        )}
      </div>
    </div>
  );
}
