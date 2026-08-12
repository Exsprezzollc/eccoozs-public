// src/components/brand/HeaderLogo.tsx
'use client';

import Image from 'next/image';

type Props = {
  width?: number;
  className?: string;
};

/** Shared ECCOOZS header wordmark using the current official public asset. */
export default function HeaderLogo({ width = 128, className }: Props) {
  const height = Math.round((width * 31) / 128);

  return (
    <Image
      src="/eccoozs-wordmark.png"
      alt="ECCOOZS"
      width={width}
      height={height}
      className={className ?? 'h-auto'}
      priority
    />
  );
}
