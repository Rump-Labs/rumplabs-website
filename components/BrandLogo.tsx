import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  size?: number;
}

export function BrandLogo({ size = 120 }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center text-white transition-opacity hover:opacity-90"
      aria-label="Rump Labs home"
    >
      <Image
        src="/logo.png"
        alt="Rump Labs"
        width={size}
        height={size}
        priority
        className="drop-shadow-lg"
      />
    </Link>
  );
}


