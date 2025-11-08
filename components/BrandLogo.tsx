import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  size?: number;
}

export function BrandLogo({ size = 48 }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-white transition-opacity hover:opacity-90"
      aria-label="Rump Labs home"
    >
      <Image
        src="/logo.svg"
        alt="Rump Labs"
        width={size}
        height={size}
        priority
      />
      <span className="text-lg font-semibold tracking-wide text-white md:text-xl">
        Rump Labs
      </span>
    </Link>
  );
}


