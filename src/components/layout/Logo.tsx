import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Link href="/" className="shrink-0" aria-label="LA MODA STYLE CORNER">
        <span className="relative block size-24 overflow-hidden rounded-full bg-white p-1 shadow-md ring-2 ring-primary/25 md:size-28">
          <Image
            src="/images/la-moda-logo.png"
            alt="LA MODA STYLE CORNER"
            fill
            sizes="112px"
            className="object-contain p-1"
            priority
          />
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex">
      <Image
        src="/images/la-moda-logo.png"
        alt="LA MODA STYLE CORNER"
        width={160}
        height={240}
        className="h-28 w-auto object-contain"
      />
    </Link>
  );
}
