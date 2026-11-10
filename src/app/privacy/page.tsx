"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { locale } = useLanguage();
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 leading-8">
      <h1 className="font-display text-4xl text-primary-dark">
        {locale === "ar" ? "سياسة الخصوصية" : "Privacy policy"}
      </h1>
      <p className="mt-6">
        {locale === "ar"
          ? "هذا الموقع نسخة عرض لعميل LA MODA STYLE CORNER. لا توجد قاعدة بيانات ولا خادم ولا واجهة برمجية. أي معلومات تدخلينها تبقى في متصفحك عبر localStorage ولا تُرسل إلى أي طرف."
          : "This website is a client presentation demo for LA MODA STYLE CORNER. There is no database, server, or API. Information you enter stays in your browser via localStorage and is not transmitted."}
      </p>
      <p className="mt-4">
        {locale === "ar"
          ? "لا نجمع كلمات مرور ولا بيانات بطاقات ائتمان. الجلسة التجريبية تحفظ الاسم والبريد والهاتف فقط على هذا الجهاز."
          : "We do not collect passwords or card details. The demo session stores only name, email, and phone on this device."}
      </p>
    </article>
  );
}
