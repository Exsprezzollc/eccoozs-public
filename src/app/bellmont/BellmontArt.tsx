type BellmontArtProps = { index: number; alt?: string; className?: string };

export default function BellmontArt({ index, alt = "", className = "" }: BellmontArtProps) {
  const sprite = index < 9 ? "/bellmont/page-set-1.webp" : "/bellmont/page-set-2.webp";
  const localIndex = index < 9 ? index : index - 9;
  const y = -(localIndex * 1200);
  return (
    <svg className={className} viewBox="0 0 800 1200" role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} preserveAspectRatio="xMidYMid meet">
      <image href={sprite} x="0" y={y} width="800" height="10800" />
    </svg>
  );
}
