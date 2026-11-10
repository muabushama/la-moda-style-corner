"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? "/images/la-moda-logo.png" : src}
      alt={alt}
      fill
      sizes={sizes}
      className={failed ? `object-contain p-6 ${className}` : `object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
