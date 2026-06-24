"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LISTING_STATUSES, STATUS_LABEL } from "../../lib/validations/listing";

type Game = { id: string; name: string };

export type ListingInitial = {
  id?: string;
  gameId: string;
  title: string;
  description: string;
  price: number;
  rank: string | null;
  skinCount: number;
  winRate: number | null;
  iconEmoji: string | null;
  status: string;
  isFeatured: boolean;
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-300";

export default function ListingForm({
  games,
  initial,
}: {
  games: Game[];
  initial?: ListingInitial;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);

    const f = new FormData(e.currentTarget);
    const str = (k: string) => String(f.get(k) ?? "").trim();

    const payload = {
      gameId: str("gameId"),
      title: str("title"),
      description: str("description"),
      price: Number(str("price") || 0),
      skinCount: Number(str("skinCount") || 0),
      status: str("status"),
      isFeatured: f.get("isFeatured") === "on",
    };

    try {
      const url = isEdit
        ? `/api/admin/listings/${initial!.id}`
        : "/api/admin/listings";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Gagal menyimpan.");
        if (data.errors) setFieldErrors(data.errors);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setPending(false);
    }
  }

  const err = (k: string) =>
    fieldErrors[k] ? (
      <p className="mt-1 text-xs text-red-400">{fieldErrors[k]}</p>
    ) : null;

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Game</label>
          <select
            name="gameId"
            required
            defaultValue={initial?.gameId ?? ""}
            className={inputCls}
          >
            <option value="" disabled>
              Pilih game
            </option>
            {games.map((g) => (
              <option key={g.id} value={g.id} className="bg-slate-900">
                {g.name}
              </option>
            ))}
          </select>
          {err("gameId")}
        </div>

        <div>
          <label className={labelCls}>Status</label>
          <select
            name="status"
            defaultValue={initial?.status ?? "ACTIVE"}
            className={inputCls}
          >
            {LISTING_STATUSES.map((s) => (
              <option key={s} value={s} className="bg-slate-900">
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Judul Akun</label>
        <input
          name="title"
          required
          defaultValue={initial?.title ?? ""}
          placeholder="Contoh: Akun Mythic Glory, 300+ skin"
          className={inputCls}
        />
        {err("title")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Harga (Rp)</label>
          <input
            name="price"
            type="number"
            min={0}
            required
            defaultValue={initial?.price ?? ""}
            placeholder="1500000"
            className={inputCls}
          />
          {err("price")}
        </div>
        <div>
          <label className={labelCls}>Jumlah Skin</label>
          <input
            name="skinCount"
            type="number"
            min={0}
            defaultValue={initial?.skinCount ?? 0}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Deskripsi</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={initial?.description ?? ""}
          placeholder="Jelaskan kondisi akun, skin langka, dll."
          className={`${inputCls} resize-none`}
        />
        {err("description")}
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          name="isFeatured"
          defaultChecked={initial?.isFeatured ?? false}
          className="accent-sky-400"
        />
        Tampilkan sebagai unggulan (featured)
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {pending ? "Menyimpan…" : isEdit ? "Simpan Perubahan" : "Tambah Akun"}
        </button>
      </div>
    </form>
  );
}
