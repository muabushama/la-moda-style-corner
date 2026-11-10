"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { locale } = useLanguage();
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 leading-8">
      <h1 className="font-display text-4xl text-primary-dark">
        {locale === "ar" ? "الشروط والأحكام" : "Terms & conditions"}
      </h1>
      <p className="mt-6">
        {locale === "ar"
          ? "باستخدامك هذا الموقع فإنك تفهم أنه عرض تجريبي للواجهة فقط. الطلبات والكوبونات والحسابات محاكاة ولا تنشئ التزاماً تجارياً."
          : "By using this website you understand it is a frontend-only demonstration. Orders, coupons, and accounts are simulated and create no commercial obligation."}
      </p>
      <p className="mt-4">
        {locale === "ar"
          ? "الأسعار بالجنيه المصري وهي عينة للعرض. الصور من مصادر عامة عالية الجودة لأغراض العرض."
          : "Prices in EGP are sample figures. Photography is high-quality public imagery used for presentation."}
      </p>
    </article>
  );
}
