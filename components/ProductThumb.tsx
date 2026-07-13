import { ProductIcon } from "./Icons";

/**
 * Shows the real CJ product photo when available (imageUrl, populated once a
 * live cjPid lookup succeeds - see lib/catalog.ts), otherwise falls back to
 * the local category icon.
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
  if (imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element -- external CJ CDN domain isn't known ahead of time
    return <img src={imageUrl} alt={alt} className="h-full w-full object-cover" loading="lazy" />;
  }
  return <ProductIcon icon={icon} className={`${iconClassName} transition group-hover:scale-105`} />;
}
