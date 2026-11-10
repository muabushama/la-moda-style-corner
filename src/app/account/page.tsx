"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useOrders } from "@/context/OrdersContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatEGP } from "@/lib/format";
import { AccountNav } from "@/components/account/AccountNav";

export default function AccountPage() {
  const { t, locale } = useLanguage();
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const { ids } = useWishlist();

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl">{t.account.title}</h1>
        <p className="mt-3 text-muted">{t.account.needLogin}</p>
        <Button href="/login" className="mt-6">
          {t.auth.login}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[220px_1fr]">
      <AccountNav />
      <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-primary-dark">
            {t.auth.welcome}, {user.name}
          </h1>
          <p className="mt-2 text-sm text-muted">{user.email}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          {t.auth.logout}
        </Button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="text-sm text-muted">{t.account.orders}</p>
          <p className="mt-1 text-3xl text-primary">{orders.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="text-sm text-muted">{t.account.wishSummary}</p>
          <p className="mt-1 text-3xl text-primary">{ids.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="text-sm text-muted">{t.account.profile}</p>
          <p className="mt-1 text-sm">{user.phone || "—"}</p>
        </div>
      </div>
      <nav className="mt-6 flex gap-4 text-sm">
        <Link href="/account/orders" className="text-primary">
          {t.account.orders}
        </Link>
        <Link href="/wishlist" className="text-primary">
          {t.nav.wishlist}
        </Link>
      </nav>
      <h2 className="mt-10 font-display text-2xl">{t.account.recent}</h2>
      <ul className="mt-4 space-y-3">
        {orders.slice(0, 3).map((o) => (
          <li key={o.id} className="flex items-center justify-between rounded-2xl border border-border bg-white p-4 text-sm">
            <Link href={`/account/orders/${o.id}`} className="font-medium">
              {o.id}
            </Link>
            <span>{t.account.status[o.status]}</span>
            <span>{formatEGP(o.total, locale)}</span>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
