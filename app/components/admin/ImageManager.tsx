"use client";

import { useState } from "react";

type Img = { id: string; url: string };

export default function ImageManager({
  listingId,
  initialImages,
}: {
  listingId: string;
  initialImages: Img[];
}) {
  const [images, setImages] = useState<Img[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset agar file sama bisa diupload lagi
    if (!file) return;

    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/admin/listings/${listingId}/images`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Gagal mengunggah.");
        return;
      }
      setImages((prev) => [...prev, data.image]);
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(imageId: string) {
    setError(null);
    const prev = images;
    setImages((imgs) => imgs.filter((i) => i.id !== imageId)); // optimistic
    const res = await fetch(
      `/api/admin/listings/${listingId}/images/${imageId}`,
      { method: "DELETE" },
    );
    if (!res.ok) {
      setImages(prev); // rollback
      const data = await res.json().catch(() => ({}));
      setError(data.message ?? "Gagal menghapus.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <label
          className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-5 py-2.5 text-sm font-semibold text-black transition-opacity ${
            uploading ? "opacity-60" : "hover:opacity-90"
          }`}
        >
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          {uploading ? "Mengunggah…" : "+ Upload Screenshot"}
        </label>
        <span className="text-xs text-slate-500">
          PNG/JPG/WEBP/GIF, maksimal 5MB.
        </span>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/3 p-10 text-center text-sm text-slate-400">
          Belum ada gambar. Unggah screenshot agar pembeli bisa melihat
          spesifikasi akun.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt="Screenshot akun"
                className="aspect-video w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                className="absolute right-2 top-2 rounded-lg bg-black/70 px-2.5 py-1 text-xs font-semibold text-red-300 opacity-0 transition-opacity hover:bg-black/90 group-hover:opacity-100"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
