"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export function AccountNav() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const path = usePathname();
  const links = [
    { href: "/account", label: t.account.title },
    { href: "/account/orders", label: t.account.orders },
    { href: "/wishlist", label: t.nav.wishlist },
    { href: "/contact", label: t.nav.contact },
  ];
  return (
    <aside className="h-fit rounded-2xl border border-border bg-white p-5">
      <p className="mb-4 font-medium">{user?.name}</p>
      <nav className="space-y-2 text-sm">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`block rounded-xl px-3 py-2 ${path === l.href ? "bg-lavender text-primary" : "hover:bg-lavender"}`}
          >
            {l.label}
          </Link>
        ))}
        <button type="button" className="block w-full rounded-xl px-3 py-2 text-start hover:bg-lavender" onClick={logout}>
          {t.auth.logout}
        </button>
      </nav>
    </aside>
  );
}
