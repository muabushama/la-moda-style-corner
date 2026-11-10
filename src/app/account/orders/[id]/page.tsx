"use client";

import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useOrders } from "@/context/OrdersContext";
import { formatEGP } from "@/lib/format";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useLanguage();
  const { getOrder } = useOrders();
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p>{t.notFound.title}</p>
        <Button href="/account/orders" className="mt-4">
          {t.account.orders}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { href: "/account", label: t.account.title },
          { href: "/account/orders", label: t.account.orders },
          { label: order.id },
        ]}
      />
      <h1 className="font-display text-3xl">{order.id}</h1>
      <p className="mt-2 text-sm text-muted">
        {new Date(order.createdAt).toLocaleString(locale === "ar" ? "ar-EG" : "en-GB")} · {t.account.status[order.status]}
      </p>
      <div className="mt-6 rounded-2xl border border-border bg-white p-5 text-sm">
        {order.items.map((item) => (
          <p key={`${item.productId}-${item.size}`} className="flex justify-between py-2">
            <span>
              {locale === "ar" ? item.nameAr : item.nameEn} × {item.quantity}
            </span>
            <span>{formatEGP(item.price * item.quantity, locale)}</span>
          </p>
        ))}
        <p className="mt-4 font-medium">
          {t.cart.total}: {formatEGP(order.total, locale)}
        </p>
        <p className="mt-4 text-muted">
          {order.customer.fullName}
          <br />
          {order.customer.street}, {order.customer.area}, {order.customer.city}
        </p>
      </div>
    </div>
  );
}
