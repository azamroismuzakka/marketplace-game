"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteListingButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (
      !window.confirm(
        `Hapus akun "${title}"? Tindakan ini permanen dan ikut menghapus gambarnya.`,
      )
    ) {
      return;
    }
    setPending(true);
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      window.alert(data.message ?? "Gagal menghapus.");
    } catch {
      window.alert("Terjadi kesalahan jaringan.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="rounded-xl border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-300 hover:bg-red-400/20 disabled:opacity-60"
    >
      {pending ? "Menghapus…" : "Hapus Akun"}
    </button>
  );
}
