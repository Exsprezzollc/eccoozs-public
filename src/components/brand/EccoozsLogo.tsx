'use client';

import Image from 'next/image';

type Props = {
  variant?: 'svg' | 'png';
  storagePath: string; // e.g. 'eccoozs-wordmark-mono-white-v2.svg'
  width?: number;
  height?: number;
  className?: string;
};

/**
 * Minimal, deterministic image renderer.
 * IMPORTANT: No Date.now()/Math.random() cache-busters here — that breaks hydration.
 */
export default function EccoozsLogo({
  variant = 'svg',
  storagePath,
  width = 128,
  height,
  className,
}: Props) {
  const base =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    ''; // assume you already have this set; otherwise host your asset under /public/brand

  const src =
    base
      ? `${base}/storage/v1/object/public/brand/${storagePath}`
      : `/brand/${storagePath}`; // local fallback if you copied assets to /public/brand

  // If height not provided, let it auto-scale
  return (
    <Image
      src={src}
      alt="ECCOOZS"
      width={width}
      height={height ?? Math.round((width * 31) / 128)} // keep roughly the wordmark ratio
      className={className}
      priority
    />
  );
}
