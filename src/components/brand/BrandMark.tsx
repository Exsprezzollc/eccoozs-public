// src/components/brand/BrandMark.tsx
'use client';

import Link from 'next/link';

type Props = {
  /** Show wordmark text next to the mark. Default true. */
  showWordmark?: boolean;
  /** Where clicking the brand takes the user. Default /home. */
  href?: string | null;
  /** Size preset. 'sm' for page headers (compact), 'md' for hero contexts. */
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * BrandMark — compact, unobtrusive Eccoozs brand lockup for page headers.
 *
 * Design intent: present, not loud. The mark is 20-24px, the wordmark is a
 * small uppercase label, and the whole thing clicks back to home.
 *
 * Previously pages shoved a 28-32px blue "ECCOOZS" wordmark at the top; this
 * replaces those with something you acknowledge, then ignore.
 */
export default function BrandMark({
  showWordmark = true,
  href = '/home',
  size = 'sm',
  className = '',
}: Props) {
  const markSize    = size === 'sm' ? 22 : 28;
  const wordmarkSz  = size === 'sm' ? 'text-[11px] tracking-[0.2em]' : 'text-xs tracking-[0.22em]';
  const gap         = size === 'sm' ? 'gap-1.5' : 'gap-2';

  const inner = (
    <div className={`inline-flex items-center ${gap} ${className}`}>
      {/* Brand mark — E-shape icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/eccoozs-mark.png"
        alt="Eccoozs"
        width={markSize}
        height={markSize}
        className="shrink-0"
        style={{ width: markSize, height: markSize }}
      />

      {showWordmark && (
        <span className={`font-semibold uppercase text-blue-600 ${wordmarkSz} leading-none`}>
        
        </span>
      )}
    </div>
  );

  if (!href) return inner;

  return (
    <Link
      href={href}
      className="group inline-flex items-center opacity-90 transition hover:opacity-100"
      aria-label="Eccoozs home"
    >
      {inner}
    </Link>
  );
}
