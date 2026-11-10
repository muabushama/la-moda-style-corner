"use client";

import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/categories";
import { allColors, allSizes } from "@/lib/products";
import type { CategorySlug, ProductFilters as Filters } from "@/types";

export function ProductFilters({
  value,
  onChange,
  hideCategory,
}: {
  value: Filters;
  onChange: (next: Filters) => void;
  hideCategory?: boolean;
}) {
  const { t, locale } = useLanguage();
  const toggle = (key: "sizes" | "colors", item: string) => {
    const current = value[key] ?? [];
    const next = current.includes(item) ? current.filter((x) => x !== item) : [...current, item];
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="space-y-6 text-sm">
      {!hideCategory ? (
        <fieldset>
          <legend className="mb-2 font-medium">{t.shop.category}</legend>
          <label className="mb-1 flex items-center gap-2">
            <input
              type="radio"
              name="cat"
              checked={!value.category || value.category === "all"}
              onChange={() => onChange({ ...value, category: "all" })}
            />
            {t.shop.all}
          </label>
          {categories.map((c) => (
            <label key={c.slug} className="mb-1 flex items-center gap-2">
              <input
                type="radio"
                name="cat"
                checked={value.category === c.slug}
                onChange={() => onChange({ ...value, category: c.slug as CategorySlug })}
              />
              {locale === "ar" ? c.nameAr : c.nameEn}
            </label>
          ))}
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="mb-2 font-medium">{t.shop.price}</legend>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="0"
            className="w-full rounded-xl border border-border px-2 py-2"
            value={value.minPrice ?? ""}
            onChange={(e) => onChange({ ...value, minPrice: e.target.value ? Number(e.target.value) : undefined })}
          />
          <input
            type="number"
            placeholder="3000"
            className="w-full rounded-xl border border-border px-2 py-2"
            value={value.maxPrice ?? ""}
            onChange={(e) => onChange({ ...value, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-medium">{t.shop.size}</legend>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle("sizes", s)}
              className={`rounded-full border px-3 py-1 text-xs ${
                value.sizes?.includes(s) ? "border-primary bg-lavender" : "border-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-medium">{t.shop.color}</legend>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c.id}
              type="button"
              title={locale === "ar" ? c.nameAr : c.nameEn}
              onClick={() => toggle("colors", c.id)}
              className={`size-7 rounded-full border ${value.colors?.includes(c.id) ? "ring-2 ring-primary" : "border-border"}`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </fieldset>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!value.inStock}
          onChange={(e) => onChange({ ...value, inStock: e.target.checked })}
        />
        {t.shop.inStock}
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!value.onSale}
          onChange={(e) => onChange({ ...value, onSale: e.target.checked })}
        />
        {t.shop.sale}
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!value.isNew}
          onChange={(e) => onChange({ ...value, isNew: e.target.checked })}
        />
        {t.shop.new}
      </label>

      <button type="button" className="text-sm text-primary" onClick={() => onChange({})}>
        {t.shop.reset}
      </button>
    </div>
  );
}
