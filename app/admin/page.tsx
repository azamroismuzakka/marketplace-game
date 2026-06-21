import Link from "next/link";
import { requireAdmin } from "../lib/auth/dal";
import { getAdminListings } from "../lib/listings";

export const metadata = {
  title: "Panel Admin — AthenaMarket",
};

const statusStyle: Record<string, string> = {
  ACTIVE: "text-emerald-400",
  PENDING_REVIEW: "text-amber-400",
  SOLD: "text-slate-400",
  REJECTED: "text-red-400",
  DRAFT: "text-slate-400",
  INACTIVE: "text-slate-500",
};

export default async function AdminPage() {
  await requireAdmin();
  const listings = await getAdminListings();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-100 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-sky-400">PANEL ADMIN</span>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Kelola Akun
          </h1>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300">
          {listings.length} listing
        </span>
      </div>

      <div className="mt-8 space-y-3">
        {listings.map((l) => (
          <Link
            key={l.id}
            href={`/admin/listings/${l.id}`}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 transition-colors hover:border-sky-400/40"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-sky-400/15 to-blue-600/15 text-2xl">
              {l.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{l.title}</p>
              <p className="text-sm text-slate-400">
                {l.game} · Rp {l.price.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className={`text-xs font-semibold ${statusStyle[l.status] ?? "text-slate-400"}`}>
                {l.status}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                🖼️ {l.imageCount} gambar
              </p>
            </div>
            <span className="text-sky-400">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
