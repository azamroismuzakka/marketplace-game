import Link from "next/link";
import AnimeHero from "./components/AnimeHero";
import { featuredStats, gameAccounts } from "./lib/mock-data";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-300 text-sm font-medium border border-cyan-500/30">
                  ✨ Marketplace Terpercaya
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-slate-50 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Jual & Beli Akun Game dengan Aman
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                Temukan akun Mobile Legends dan Free Fire dengan rank tinggi, skin lengkap. Setiap transaksi dilindungi oleh sistem verifikasi admin kami.
              </p>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/catalog"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  Jelajahi Katalog
                </Link>
                <Link
                  href="/checkout"
                  className="px-8 py-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-100 font-semibold transition-all duration-300"
                >
                  Lihat Checkout
                </Link>
              </div>
            </div>

            {/* Anime Hero Illustration */}
            <div className="group relative h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl" />
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimeHero />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 border-t border-slate-800/50 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: "📦", value: "1.2K+", label: "Akun Terjual" },
              { icon: "👥", value: "850+", label: "User Aktif" },
              { icon: "✅", value: "98%", label: "Transaksi Aman" },
              { icon: "🕐", value: "24/7", label: "Admin Verifikasi" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl border border-slate-800/50 hover:border-cyan-500/30 bg-slate-900/30 backdrop-blur hover:bg-slate-900/50 transition-all duration-300 group">
                <p className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-4 mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-300 text-sm font-medium border border-cyan-500/30">
              🎯 Fitur Unggulan
            </span>
            <h2 className="text-4xl font-bold">Semua yang Anda Butuhkan</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🔐",
                title: "Keamanan Terjamin",
                text: "Sistem verifikasi email dan admin untuk setiap transaksi.",
              },
              {
                icon: "📊",
                title: "Filter Akun Lengkap",
                text: "Cari akun berdasarkan rank, skin, hero favorit, dan lainnya.",
              },
              {
                icon: "✅",
                title: "Admin Verifikasi",
                text: "Setiap transaksi diawasi langsung oleh tim admin profesional.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-50">{feature.title}</h3>
                <p className="mt-3 text-slate-400 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Accounts Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-300 text-sm font-medium border border-cyan-500/30">
                ⭐ Pilihan Populer
              </span>
              <h2 className="text-4xl font-bold">Rekomendasi Hari Ini</h2>
            </div>
            <Link href="/catalog" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Lihat Semua →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gameAccounts.slice(0, 3).map((account) => (
              <Link
                key={account.id}
                href={`/account/${account.id}`}
                className="group rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 hover:border-cyan-500/30 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                    {account.game}
                  </span>
                  <span className={`text-xs font-semibold ${account.status === "Ready" ? "text-emerald-400" : "text-amber-400"}`}>
                    {account.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-50 group-hover:text-cyan-300 transition-colors">{account.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{account.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-300 text-xs">
                    {account.rank}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-300 text-xs">
                    {account.skins} Skin
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <div>
                    <p className="text-xs text-slate-400">Harga</p>
                    <p className="text-2xl font-bold text-cyan-400">Rp {account.price.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm font-medium group-hover:bg-cyan-500/30 transition-colors">
                    Lihat →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-2xl" />
            <div className="relative rounded-3xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Siap Mulai?</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pembeli dan penjual yang telah mempercayai platform kami.
              </p>
              <Link
                href="/catalog"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Jelajahi Katalog Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}