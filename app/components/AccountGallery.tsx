"use client";

import { useState } from "react";

export default function AccountGallery({
  images,
  emoji,
  title,
}: {
  images: string[];
  emoji: string;
  title: string;
}) {
  const [active, setActive] = useState(0);

  // Fallback: tampilkan emoji jika belum ada screenshot.
  if (images.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-sky-500/10 to-blue-600/10 p-10 text-center">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        <span className="relative text-7xl sm:text-8xl">{emoji}</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Gambar utama */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={`${title} — screenshot ${active + 1}`}
          className="aspect-video w-full object-cover"
        />
      </div>

      {/* Thumbnail */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Lihat screenshot ${i + 1}`}
              className={`overflow-hidden rounded-xl border transition-colors ${
                i === active
                  ? "border-sky-400"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="aspect-video w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
