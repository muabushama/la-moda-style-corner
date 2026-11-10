"use client";

import { useLanguage } from "@/context/LanguageContext";
import { deliveryOptions } from "@/data/shipping";
import { formatEGP } from "@/lib/format";

export default function ShippingReturnsPage() {
  const { t, locale } = useLanguage();
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 leading-8">
      <h1 className="font-display text-4xl text-primary-dark">{t.shippingPage.title}</h1>
      <p className="mt-4 text-muted">{t.auth.demoHint}</p>
      <h2 className="mt-8 font-display text-2xl">{t.checkout.step2}</h2>
      <ul className="mt-3 list-disc ps-5">
        {deliveryOptions.map((d) => (
          <li key={d.id}>
            {locale === "ar" ? d.nameAr : d.nameEn} — {locale === "ar" ? d.daysAr : d.daysEn} — {formatEGP(d.price, locale)}
          </li>
        ))}
      </ul>
      <h2 className="mt-8 font-display text-2xl">{locale === "ar" ? "الإرجاع والاستبدال" : "Returns & exchanges"}</h2>
      <p className="mt-3">
        {locale === "ar"
          ? "يمكن إرجاع القطع غير المستخدمة خلال 14 يوماً من الاستلام في العرض التوضيحي. الاستبدال متاح حسب المخزون الظاهر. لا تتم عمليات مالية حقيقية."
          : "Unused pieces may be returned within 14 days of receipt in this demo. Exchanges depend on visible stock. No real money is processed."}
      </p>
      <h2 className="mt-8 font-display text-2xl">{locale === "ar" ? "الاسترداد" : "Refunds"}</h2>
      <p className="mt-3">
        {locale === "ar"
          ? "في متجر حيّ سيتم الاسترداد عبر نفس طريقة الدفع. هنا لا يُخصم أي مبلغ أصلاً."
          : "On a live store refunds would follow the original payment method. Here nothing is charged."}
      </p>
    </article>
  );
}
