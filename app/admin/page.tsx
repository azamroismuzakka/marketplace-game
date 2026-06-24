import Link from "next/link";
import { requireAdmin } from "../lib/auth/dal";
import { getAdminListings, getAdminStats } from "../lib/listings";
import { STATUS_LABEL } from "../lib/validations/listing";

export const metadata = {
  title: "Dashboard Admin — AthenaMarket",
};

const statusStyle: Record<string, string> = {
  ACTIVE: "bg-emerald-400/15 text-emerald-300",
  PENDING_REVIEW: "bg-amber-400/15 text-amber-300",
  SOLD: "bg-slate-400/15 text-slate-300",
  REJECTED: "bg-red-400/15 text-red-300",
  DRAFT: "bg-slate-400/15 text-slate-300",
  INACTIVE: "bg-slate-400/15 text-slate-400",
};

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const [stats, listings] = await Promise.all([
    getAdminStats(),
    getAdminListings(),
  ]);

  const cards = [
    { label: "Total Akun", value: stats.total, icon: "📦" },
    { label: "Aktif", value: stats.active, icon: "🟢" },
    { label: "Terjual", value: stats.sold, icon: "💸" },
    { label: "Game", value: stats.games, icon: "🎮" },
    { label: "Total Gambar", value: stats.images, icon: "🖼️" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-100 sm:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-sm font-semibold text-sky-400">
            DASHBOARD ADMIN
          </span>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Halo, {admin.name} 👋
          </h1>
        </div>
        <Link
          href="/admin/listings/new"
          className="rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.03]"
        >
          + Tambah Akun
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-white/10 bg-white/3 p-5"
          >
            <p className="text-2xl">{c.icon}</p>
            <p className="mt-2 text-2xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-slate-400">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Kelola Akun</h2>
        <span className="text-sm text-slate-400">{listings.length} listing</span>
      </div>

      <div className="mt-4 space-y-3">
        {listings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/3 p-10 text-center text-sm text-slate-400">
            Belum ada akun. Klik “+ Tambah Akun” untuk mulai.
          </div>
        ) : (
          listings.map((l) => (
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
              <div className="hidden items-center gap-3 sm:flex">
                <span className="text-xs text-slate-500">
                  🖼️ {l.imageCount}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    statusStyle[l.status] ?? "bg-white/5 text-slate-300"
                  }`}
                >
                  {STATUS_LABEL[l.status] ?? l.status}
                </span>
              </div>
              <span className="text-sky-400">→</span>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
