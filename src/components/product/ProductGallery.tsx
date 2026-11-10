"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { ProductImage } from "./ProductImage";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-lavender"
        onClick={() => setZoom(true)}
      >
        <ProductImage src={images[active]} alt={alt} sizes="50vw" className="transition hover:scale-105" />
      </button>
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border ${i === active ? "border-primary" : "border-border"}`}
          >
            <ProductImage src={src} alt={`${alt} ${i + 1}`} sizes="80px" />
          </button>
        ))}
      </div>
      {zoom ? (
        <div className="fixed inset-0 z-50 bg-black/80 p-6" onClick={() => setZoom(false)}>
          <button type="button" className="absolute end-6 top-6 text-white" onClick={() => setZoom(false)}>
            <X />
          </button>
          <div className="relative mx-auto h-full max-w-3xl">
            <ProductImage src={images[active]} alt={alt} sizes="100vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
