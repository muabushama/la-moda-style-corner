"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useWishlist } from "@/context/WishlistContext";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartDrawer } from "./CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";

export function Header() {
  const { t } = useLanguage();
  const { count } = useCart();
  const { ids } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/category/women", label: t.nav.women },
    { href: "/category/boys", label: t.nav.boys },
    { href: "/category/girls", label: t.nav.girls },
    { href: "/shop?new=1", label: t.nav.newArrivals },
    { href: "/shop?sale=1", label: t.nav.sale },
    { href: "/blog", label: t.nav.blog },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button type="button" className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
          <Menu className="size-6" />
        </button>
        <Logo compact />
        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <button type="button" className="grid size-10 place-items-center" onClick={() => setSearchOpen((v) => !v)} aria-label={t.nav.search}>
            <Search className="size-5" />
          </button>
          <Link href="/account" className="hidden size-10 place-items-center sm:grid" aria-label={t.nav.account}>
            <User className="size-5" />
          </Link>
          <Link href="/wishlist" className="relative grid size-10 place-items-center" aria-label={t.nav.wishlist}>
            <Heart className="size-5" />
            {ids.length ? (
              <span className="absolute end-1 top-1 grid min-w-4 place-items-center rounded-full bg-mint px-1 text-[10px] text-primary-dark">
                {ids.length}
              </span>
            ) : null}
          </Link>
          <button type="button" className="relative grid size-10 place-items-center" onClick={() => setCartOpen(true)} aria-label={t.nav.cart}>
            <ShoppingBag className="size-5" />
            {count ? (
              <span className="absolute end-1 top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-white">
                {count}
              </span>
            ) : null}
          </button>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      {searchOpen ? (
        <div className="border-t border-border bg-white px-4 py-3">
          <div className="mx-auto max-w-xl">
            <SearchBar onSubmit={() => setSearchOpen(false)} />
          </div>
        </div>
      ) : null}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
