"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useOrders } from "@/context/OrdersContext";
import { formatEGP } from "@/lib/format";

export default function OrdersPage() {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user) {
    return (
      <div className="py-20 text-center">
        <p>{t.account.needLogin}</p>
        <Button href="/login" className="mt-4">
          {t.auth.login}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { href: "/account", label: t.account.title }, { label: t.account.orders }]} />
      <h1 className="mb-6 font-display text-4xl text-primary-dark">{t.account.orders}</h1>
      <ul className="space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="rounded-2xl border border-border bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link href={`/account/orders/${o.id}`} className="font-medium text-primary">
                {o.id}
              </Link>
              <span className="rounded-full bg-lavender px-3 py-1 text-xs">{t.account.status[o.status]}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{new Date(o.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB")}</p>
            <ul className="mt-3 text-sm">
              {o.items.map((item) => (
                <li key={`${item.productId}-${item.size}`}>
                  {locale === "ar" ? item.nameAr : item.nameEn} × {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-medium">{formatEGP(o.total, locale)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
