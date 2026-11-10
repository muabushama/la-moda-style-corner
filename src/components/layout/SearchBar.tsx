"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function SearchBar({ onSubmit }: { onSubmit?: () => void }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      className="flex w-full items-center rounded-full border border-border bg-white px-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim()) return;
        router.push(`/search?q=${encodeURIComponent(q.trim())}`);
        onSubmit?.();
      }}
    >
      <Search className="size-4 text-muted" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.search.placeholder}
        className="w-full bg-transparent px-2 py-2 text-sm outline-none"
      />
    </form>
  );
}
