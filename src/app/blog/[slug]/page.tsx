"use client";

import { useParams } from "next/navigation";
import { ProductImage } from "@/components/product/ProductImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts } from "@/data/blog";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <div className="py-20 text-center">
        <p>{t.notFound.title}</p>
        <Button href="/blog" className="mt-4">
          {t.blog.all}
        </Button>
      </div>
    );
  }
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        items={[
          { href: "/", label: t.nav.home },
          { href: "/blog", label: t.blog.title },
          { label: locale === "ar" ? post.titleAr : post.titleEn },
        ]}
      />
      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl">
        <ProductImage src={post.image} alt={locale === "ar" ? post.titleAr : post.titleEn} sizes="100vw" />
      </div>
      <p className="text-sm text-muted">{post.date}</p>
      <h1 className="mt-2 font-display text-4xl text-primary-dark">
        {locale === "ar" ? post.titleAr : post.titleEn}
      </h1>
      <p className="mt-6 leading-8">{locale === "ar" ? post.bodyAr : post.bodyEn}</p>
      <Button href="/blog" variant="outline" className="mt-10">
        {t.blog.all}
      </Button>
    </article>
  );
}
