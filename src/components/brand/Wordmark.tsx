// src/components/brand/Wordmark.tsx
import Image from "next/image";
import Link from "next/link";

type Props = {
  width?: number;
  height?: number;
  className?: string;
  href?: string;
  priority?: boolean;
};

export default function Wordmark({
  width = 140,
  height = 28,
  className = "h-6 md:h-5 w-auto select-none translate-y-[1px]",
  href = "/",
  priority = true,
}: Props) {
  return (
    <Link href={href} className="inline-flex items-center" aria-label="ECCOOZS Home">
      {/* Light (blue) */}
      <Image
        src="/brand/eccoozs-wordmark-blue-v2-640.png"
        alt="ECCOOZS"
        width={width}
        height={height}
        className={`block dark:hidden ${className}`}
        priority={priority}
        draggable={false}
      />
      {/* Dark (white) */}
      <Image
        src="/brand-mono/eccoozs-wordmark-mono-white-v2-640.png"
        alt="ECCOOZS"
        width={width}
        height={height}
        className={`hidden dark:block ${className}`}
        priority={priority}
        draggable={false}
      />
    </Link>
  );
}
