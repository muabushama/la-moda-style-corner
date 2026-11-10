import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Link href="/" className="shrink-0" aria-label="LA MODA STYLE CORNER">
        <span className="relative block size-14 overflow-hidden rounded-full bg-white p-0.5 shadow-md ring-2 ring-primary/25 sm:size-16 lg:size-20">
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
        className="h-20 w-auto max-w-full object-contain sm:h-28"
      />
    </Link>
  );
}
