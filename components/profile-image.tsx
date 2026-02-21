"use client";

import { useState } from "react";

type ProfileImageProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  initials?: string;
};

export function ProfileImage({ src, alt, fallbackSrc, className, initials = "AP" }: ProfileImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isUnavailable, setIsUnavailable] = useState(false);

  const onImageError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    setIsUnavailable(true);
  };

  if (isUnavailable) {
    return (
      <div
        aria-label={alt}
        className={`${className ?? ""} inline-flex items-center justify-center bg-[var(--surface-strong)] text-lg font-semibold text-[var(--accent)]`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={onImageError}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}
