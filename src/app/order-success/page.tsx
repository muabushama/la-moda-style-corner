"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useOrders } from "@/context/OrdersContext";
import { formatEGP } from "@/lib/format";
import { deliveryOptions } from "@/data/shipping";

function SuccessInner() {
  const { t, locale } = useLanguage();
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  const { getOrder } = useOrders();
  const order = getOrder(id);
  const delivery = deliveryOptions.find((d) => d.id === order?.deliveryId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <CheckCircle2 className="mx-auto size-14 text-mint" />
      <h1 className="mt-4 font-display text-4xl text-primary-dark">{t.orderSuccess.title}</h1>
      <p className="mt-3 text-sm text-muted">{t.orderSuccess.hint}</p>
      {order ? (
        <div className="mt-8 rounded-3xl border border-border bg-white p-6 text-start text-sm">
          <p className="font-medium">
            {t.orderSuccess.number}: {order.id}
          </p>
          <ul className="mt-4 space-y-2">
            {order.items.map((item) => (
              <li key={`${item.productId}-${item.size}`} className="flex justify-between">
                <span>
                  {locale === "ar" ? item.nameAr : item.nameEn} × {item.quantity}
                </span>
                <span>{formatEGP(item.price * item.quantity, locale)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-muted">
            {order.customer.fullName} · {order.customer.city}
            {delivery ? ` · ${locale === "ar" ? delivery.nameAr : delivery.nameEn}` : ""}
          </p>
          <p className="mt-2 font-medium">
            {t.cart.total}: {formatEGP(order.total, locale)}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-muted">{id}</p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/shop">{t.orderSuccess.shop}</Button>
        <Button href="/account/orders" variant="outline">
          {t.orderSuccess.orders}
        </Button>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}
