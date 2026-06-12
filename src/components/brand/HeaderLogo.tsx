// src/components/brand/HeaderLogo.tsx
'use client';

import Image from 'next/image';

type Props = {
  width?: number;
  className?: string;
};

/**
 * Always show the BLUE ECCOOZS wordmark (no theme logic).
 * Uses a stable, deterministic src to avoid hydration mismatches.
 */
export default function HeaderLogo({ width = 128, className }: Props) {
  // If your file name/path is different, change it here:
  const file = 'eccoozs-wordmark-blue-v2.svg';

  // If you store in Supabase:
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const src = base
    ? `${base}/storage/v1/object/public/brand/${file}`
    : `/brand/${file}`; // fallback if you also keep a copy under /public/brand

  // ~31:128 is a decent wordmark ratio; tweak if your art differs.
  const height = Math.round((width * 31) / 128);

  return (
    <Image
      src={src}
      alt="ECCOOZS"
      width={width}
      height={height}
      className={className ?? 'h-auto'}
      priority
    />
  );
}
