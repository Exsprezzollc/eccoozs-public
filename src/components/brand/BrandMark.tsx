// src/components/brand/BrandMark.tsx
'use client';

import Link from 'next/link';

type Props = {
  showWordmark?: boolean;
  href?: string | null;
  size?: 'sm' | 'md';
  className?: string;
};

export default function BrandMark({
  showWordmark = true,
  href = '/welcome',
  size = 'sm',
  className = '',
}: Props) {
  const markSize = size === 'sm' ? 22 : 28;
  const wordmarkWidth = size === 'sm' ? 92 : 116;

  const inner = (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/eccoozs-mark-official.png"
        alt="ECCOOZS"
        width={markSize}
        height={markSize}
        className="shrink-0"
        style={{ width: markSize, height: markSize }}
      />
      {showWordmark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/eccoozs-wordmark.png"
          alt="ECCOOZS"
          width={wordmarkWidth}
          className="h-auto select-none"
        />
      )}
    </div>
  );

  if (!href) return inner;

  return (
    <Link
      href={href}
      className="group inline-flex items-center opacity-90 transition hover:opacity-100"
      aria-label="ECCOOZS home"
    >
      {inner}
    </Link>
  );
}
