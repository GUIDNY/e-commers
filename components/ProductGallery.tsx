"use client";

import { useEffect, useState } from "react";
import { ProductThumb } from "./ProductThumb";
import { ProductIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";

/**
 * Product photo gallery: shows one main photo (+ thumbnail strip when CJ gave
 * us more than one). Clicking any photo opens a fullscreen lightbox with all
 * of CJ's real gallery photos for this pid, navigable by arrows/keyboard.
 */
export function ProductGallery({
  images,
  icon,
  alt,
}: {
  images: string[];
  icon: string;
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowRight") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, images.length]);

  if (images.length === 0) {
    return (
      <div className="grid aspect-square place-items-center overflow-hidden rounded-3xl bg-camp-sand-100 text-camp-forest-700 shadow-[0_4px_20px_rgba(31,51,39,0.08)]">
        <ProductIcon icon={icon} className="h-40 w-40" />
      </div>
    );
  }

  const showThumbs = images.length > 1;
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid aspect-square w-full cursor-zoom-in place-items-center overflow-hidden rounded-3xl bg-camp-sand-100 text-camp-forest-700 shadow-[0_4px_20px_rgba(31,51,39,0.08)]"
        aria-label={`הגדל את התמונה - ${alt}`}
      >
        <ProductThumb imageUrl={images[index]} icon={icon} alt={alt} iconClassName="h-40 w-40" />
      </button>

      {showThumbs && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                i === index ? "border-camp-forest-700" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`תמונה ${i + 1} מתוך ${images.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external photo host domain isn't known ahead of time */}
              <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute left-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="סגור"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-4"
                aria-label="התמונה הקודמת"
              >
                <ChevronRightIcon className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-4"
                aria-label="התמונה הבאה"
              >
                <ChevronLeftIcon className="h-7 w-7" />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element -- external photo host domain isn't known ahead of time */}
          <img
            src={images[index]}
            alt={alt}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <div dir="ltr" className="absolute bottom-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              {index + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
