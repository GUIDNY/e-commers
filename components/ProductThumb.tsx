"use client";

import { useState } from "react";
import { ProductIcon } from "./Icons";

/**
 * Shows a real product photo when available (imageUrl - either a live CJ photo,
 * see lib/catalog.ts, or a curated stock photo from lib/products.ts), otherwise
 * falls back to the local category icon. Falls back to the icon automatically
 * if the photo URL fails to load (broken link, hotlink block, etc).
 */
export function ProductThumb({
  imageUrl,
  icon,
  alt,
  iconClassName = "h-20 w-20",
}: {
  imageUrl?: string;
  icon: string;
  alt: string;
  iconClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (imageUrl && !failed) {
    // eslint-disable-next-line @next/next/no-img-element -- external photo host domain isn't known ahead of time
    return (
      <img
        src={imageUrl}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <ProductIcon icon={icon} className={`${iconClassName} transition group-hover:scale-105`} />;
}
