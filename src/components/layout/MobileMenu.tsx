"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SearchBar } from "./SearchBar";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  if (!open) return null;
  const links = [
    ["/", t.nav.home],
    ["/category/women", t.nav.women],
    ["/category/boys", t.nav.boys],
    ["/category/girls", t.nav.girls],
    ["/shop?new=1", t.nav.newArrivals],
    ["/shop?sale=1", t.nav.sale],
    ["/blog", t.nav.blog],
    ["/about", t.nav.about],
    ["/account", t.nav.account],
    ["/wishlist", t.nav.wishlist],
    ["/contact", t.nav.contact],
  ] as const;

  return (
    <div className="fixed inset-0 z-50 bg-primary-dark/40 md:hidden" onClick={onClose}>
      <nav
        className="absolute inset-y-0 start-0 w-[min(100%,320px)] overflow-auto bg-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium">{t.nav.shop}</span>
          <button type="button" onClick={onClose}>
            <X />
          </button>
        </div>
        <SearchBar onSubmit={onClose} />
        <ul className="mt-6 space-y-3">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link href={href} onClick={onClose} className="block py-1">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
