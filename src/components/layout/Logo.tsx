import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/la-moda-logo.png"
        alt="LA MODA STYLE CORNER"
        width={compact ? 48 : 64}
        height={compact ? 72 : 96}
        className="h-12 w-auto object-contain md:h-16"
        priority
      />
    </Link>
  );
}
