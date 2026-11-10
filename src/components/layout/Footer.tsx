"use client";

import Link from "next/link";
import { Mail, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/home/NewsletterForm";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{t.footer.about}</p>
          <div className="mt-4 flex gap-3 text-primary">
            <Share2 className="size-5" aria-hidden />
            <Mail className="size-5" aria-hidden />
          </div>
          <div className="mt-6 max-w-sm">
            <NewsletterForm compact />
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-medium">{t.footer.quick}</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/about">{t.nav.about}</Link></li>
            <li><Link href="/blog">{t.nav.blog}</Link></li>
            <li><Link href="/shop">{t.nav.shop}</Link></li>
            <li><Link href="/faq">{t.nav.faq}</Link></li>
            <li><Link href="/contact">{t.nav.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium">{t.footer.cats}</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/category/women">{t.nav.women}</Link></li>
            <li><Link href="/category/boys">{t.nav.boys}</Link></li>
            <li><Link href="/category/girls">{t.nav.girls}</Link></li>
            <li><Link href="/shop?sale=1">{t.nav.sale}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium">{t.footer.service}</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/shipping-returns">{t.shippingPage.title}</Link></li>
            <li><Link href="/size-guide">{t.product.sizeGuide}</Link></li>
            <li><Link href="/privacy">{t.legal.privacy}</Link></li>
            <li><Link href="/terms">{t.legal.terms}</Link></li>
            <li className="pt-2 text-foreground">{t.footer.phone}</li>
            <li>{t.footer.email}</li>
            <li>{t.footer.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        <p>{t.footer.copy}</p>
        <p className="mt-2 font-medium text-primary">
          Powerd by PIXEL 01 -{" "}
          <a href="tel:01034029665" className="hover:underline" dir="ltr">
            01034029665
          </a>
        </p>
      </div>
    </footer>
  );
}
