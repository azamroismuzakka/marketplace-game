"use client";

import { useRef, useState } from "react";

type Img = { id: string; url: string };

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

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
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: File[]) {
    if (files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      for (const file of files) {
        if (!ALLOWED.includes(file.type)) {
          setError(`"${file.name}" — format harus PNG/JPG/WEBP/GIF.`);
          continue;
        }
        if (file.size > MAX_BYTES) {
          setError(`"${file.name}" — ukuran melebihi 5MB.`);
          continue;
        }
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch(`/api/admin/listings/${listingId}/images`, {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message ?? "Gagal mengunggah.");
          continue;
        }
        setImages((prev) => [...prev, data.image]);
      }
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
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !uploading) {
            inputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!uploading) uploadFiles(Array.from(e.dataTransfer.files));
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver
            ? "border-sky-400 bg-sky-400/10"
            : "border-white/15 bg-white/3 hover:border-white/30"
        } ${uploading ? "pointer-events-none opacity-70" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => {
            uploadFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
        <p className="text-3xl">{uploading ? "⏳" : "📤"}</p>
        <p className="mt-2 text-sm font-semibold text-white">
          {uploading
            ? "Mengunggah…"
            : "Seret & lepas gambar ke sini, atau klik untuk pilih"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          PNG / JPG / WEBP / GIF · maks 5MB · bisa beberapa file sekaligus
        </p>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      {images.length > 0 && (
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
