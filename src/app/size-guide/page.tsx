"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { sizeGuide } from "@/data/sizeGuide";
import type { CategorySlug } from "@/types";

export default function SizeGuidePage() {
  const { t, locale } = useLanguage();
  const [tab, setTab] = useState<CategorySlug>("women");
  const data = sizeGuide[tab];
  const tabs: CategorySlug[] = ["women", "boys", "girls"];

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="font-display text-4xl text-primary-dark">{t.size.title}</h1>
      <p className="mt-3 text-sm text-muted">{t.size.how}</p>
      <div className="mt-6 flex gap-2">
        {tabs.map((slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => setTab(slug)}
            className={`rounded-full px-4 py-2 text-sm ${tab === slug ? "bg-primary text-white" : "bg-lavender"}`}
          >
            {t.nav[slug]}
          </button>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-lavender">
              <th className="p-3 text-start" />
              {data.headers.map((h) => (
                <th key={h} className="p-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.labelEn} className="border-t border-border">
                <td className="p-3">{locale === "ar" ? row.labelAr : row.labelEn}</td>
                {row.values.map((v) => (
                  <td key={v} className="p-3 text-center">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
