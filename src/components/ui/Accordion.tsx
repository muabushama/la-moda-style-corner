"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Accordion({
  items,
}: {
  items: { id: string; title: string; body: string }[];
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="font-medium">{item.title}</span>
              <ChevronDown className={`size-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen ? <p className="px-5 pb-4 text-sm leading-7 text-muted">{item.body}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
