import Link from "next/link";
import { requireUser } from "../lib/auth/dal";

export const metadata = {
  title: "Dashboard — AthenaMarket",
};

const roleLabel: Record<string, string> = {
  BUYER: "Pembeli",
  ADMIN: "Admin",
};

export default async function DashboardPage() {
  // Proteksi server-side: redirect ke /login jika belum login.
  const user = await requireUser();

  const memberSince = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(user.createdAt);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-100 sm:px-6">
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-600 text-2xl font-black text-black">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Halo, {user.name} 👋
          </h1>
          <p className="text-sm text-slate-400">
            Selamat datang kembali di dashboard kamu.
          </p>
        </div>
      </div>

      {/* Profil */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
          <p className="text-xs text-slate-500">Email</p>
          <p className="mt-1 font-semibold text-white">{user.email}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
          <p className="text-xs text-slate-500">Tipe Akun</p>
          <p className="mt-1 font-semibold text-white">
            {roleLabel[user.role] ?? user.role}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
          <p className="text-xs text-slate-500">Status Verifikasi</p>
          <p
            className={`mt-1 font-semibold ${
              user.isVerified ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {user.isVerified ? "✓ Terverifikasi" : "Belum diverifikasi"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
          <p className="text-xs text-slate-500">Bergabung Sejak</p>
          <p className="mt-1 font-semibold text-white">{memberSince}</p>
        </div>
      </section>

      {/* Panel admin (hanya admin) */}
      {user.role === "ADMIN" && (
        <Link
          href="/admin"
          className="mt-8 flex items-center gap-4 rounded-2xl border border-sky-400/30 bg-linear-to-r from-sky-500/10 to-blue-600/5 p-5 transition-colors hover:border-sky-400/60"
        >
          <p className="text-2xl">🛠️</p>
          <div>
            <p className="font-semibold text-white">Panel Admin</p>
            <p className="text-sm text-slate-400">
              Kelola akun & unggah screenshot.
            </p>
          </div>
          <span className="ml-auto text-sky-400">→</span>
        </Link>
      )}

      {/* Aksi cepat */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-white">Aksi Cepat</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            href="/catalog"
            className="rounded-2xl border border-white/10 bg-white/3 p-5 transition-colors hover:border-sky-400/40"
          >
            <p className="text-2xl">🛒</p>
            <p className="mt-2 font-semibold text-white">Jelajahi Katalog</p>
            <p className="mt-1 text-sm text-slate-400">
              Cari akun game impianmu.
            </p>
          </Link>
          <Link
            href="/contact"
            className="rounded-2xl border border-white/10 bg-white/3 p-5 transition-colors hover:border-sky-400/40"
          >
            <p className="text-2xl">💬</p>
            <p className="mt-2 font-semibold text-white">Bantuan</p>
            <p className="mt-1 text-sm text-slate-400">
              Hubungi tim support kami.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
