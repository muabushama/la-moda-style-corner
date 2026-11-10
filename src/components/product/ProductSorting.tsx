"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { SortOption } from "@/types";
import { SelectField } from "@/components/ui/SelectField";

export function ProductSorting({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  const { t } = useLanguage();
  return (
    <SelectField value={value} onChange={(e) => onChange(e.target.value as SortOption)} label={t.shop.sort}>
      <option value="featured">{t.shop.featured}</option>
      <option value="newest">{t.shop.newest}</option>
      <option value="price-asc">{t.shop.priceAsc}</option>
      <option value="price-desc">{t.shop.priceDesc}</option>
      <option value="best-selling">{t.shop.best}</option>
    </SelectField>
  );
}
