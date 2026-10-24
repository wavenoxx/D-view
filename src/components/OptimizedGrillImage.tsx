import React, { useState, useEffect } from 'react';

export interface OptimizedGrillImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string; // e.g. '16/9', '4/3', '4/5', '3/4', '1/1'
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  fallbackSrc?: string;
  objectFit?: 'cover' | 'contain';
  sharpen?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const VERIFIED_GRILL_FALLBACK = '/images/visakhapatnam-hero.jpg';

/**
 * Eagerly pre-fetches next slide images in the background so rapid sliding never stutters.
 */
export function prefetchGrillImages(imageUrls: (string | undefined | null)[]) {
  if (typeof window === 'undefined') return;
  imageUrls.forEach((src) => {
    if (!src) return;
    const clean = src.split('?')[0];
    const img = new Image();
    img.src = clean;
  });
}

/**
 * OptimizedGrillImage Component
 * - Loads original high-resolution master asset directly (minimum 1200px)
 * - Zero downscaled thumbnails, zero compression blur
 * - Hardware-accelerated with crisp image-rendering rules for clean 2mm SS-316 cables
 */
export default function OptimizedGrillImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  aspectRatio,
  width,
  height,
  priority = false,
  loading,
  fetchPriority,
  fallbackSrc = VERIFIED_GRILL_FALLBACK,
  objectFit = 'cover',
  style,
  onClick
}: OptimizedGrillImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  const cleanSrc = currentSrc.split('?')[0];
  const effectiveLoading = loading || (priority ? 'eager' : 'lazy');
  const effectiveFetchPriority = fetchPriority || (priority ? 'high' : 'low');
  const formattedAspect = aspectRatio ? aspectRatio.replace(':', ' / ') : undefined;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...(formattedAspect ? { aspectRatio: formattedAspect } : {}),
        ...style
      }}
      onClick={onClick}
    >
      <img
        src={cleanSrc}
        alt={alt}
        loading={effectiveLoading}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={effectiveFetchPriority}
        width={width}
        height={height}
        onError={handleError}
        className={`w-full h-full object-${objectFit} ${imageClassName}`}
        style={{
          imageRendering: '-webkit-optimize-contrast' as any,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
}
