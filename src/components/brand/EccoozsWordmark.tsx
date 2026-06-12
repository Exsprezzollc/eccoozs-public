// src/components/brand/EccoozsWordmark.tsx
// src/components/brand/EccoozsWordmark.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function EccoozsWordmark({ className }: Props) {
  return (
    <Link
      href="/"
      aria-label="ECCOOZS home"
      className={cn(
        "font-brand text-2xl md:text-3xl tracking-tight select-none",
        "ecc-wordmark-gradient dark:ecc-wordmark-solid",
        className
      )}
    >
      ECCOOZS
    </Link>
  );
}
