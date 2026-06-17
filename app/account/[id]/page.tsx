import Link from "next/link";
import { notFound } from "next/navigation";
import { gameAccounts } from "../../lib/mock-data";

export default async function AccountDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const account = gameAccounts.find((item) => item.id === id);

    if (!account) {
        notFound();
    }

    return (
        <main className="min-h-screen text-slate-50">
            <section className="mx-auto max-w-7xl px-6 py-8">
                <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
                >
                    ← Kembali ke Katalog
                </Link>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Header Card */}
                        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 hover:border-cyan-500/30 transition-all duration-300">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-3xl">
                                            {account.game === "Mobile Legends" ? "⚔️" : "🔫"}
                                        </span>
                                        <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold border border-cyan-500/30">
                                            {account.game}
                                        </span>
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${account.status === "Ready"
                                                ? "bg-emerald-500/20 text-emerald-300"
                                                : "bg-amber-500/20 text-amber-300"
                                            }`}>
                                            {account.status}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl font-bold text-slate-50">{account.title}</h1>
                                </div>
                            </div>

                            <p className="text-lg text-slate-300 leading-relaxed">{account.description}</p>

                            {/* Stats Grid */}
                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 hover:border-cyan-500/20 transition-colors">
                                    <p className="text-sm text-slate-400 mb-2">Rank</p>
                                    <p className="text-3xl font-bold text-cyan-400">{account.rank}</p>
                                </div>
                                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 hover:border-cyan-500/20 transition-colors">
                                    <p className="text-sm text-slate-400 mb-2">Total Skin</p>
                                    <p className="text-3xl font-bold text-cyan-400">{account.skins}</p>
                                </div>
                                <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 hover:border-cyan-500/20 transition-colors">
                                    <p className="text-sm text-slate-400 mb-2">Win Rate</p>
                                    <p className="text-3xl font-bold text-cyan-400">78%</p>
                                </div>
                            </div>
                        </div>

                        {/* Heroes Section */}
                        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                            <h2 className="text-2xl font-bold mb-6">Hero Andalan</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {account.heroes.map((hero, idx) => (
                                    <div
                                        key={hero}
                                        className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4 text-center hover:border-cyan-500/30 hover:bg-slate-800 transition-all duration-300"
                                    >
                                        <div className="text-3xl mb-2">🎮</div>
                                        <p className="font-semibold text-slate-100">{hero}</p>
                                        <p className="text-xs text-slate-400 mt-1">Mastery {idx + 1}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Screenshots */}
                        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                            <h2 className="text-2xl font-bold mb-6">Galeri Akun</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div
                                        key={item}
                                        className="group relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 aspect-video flex items-center justify-center cursor-pointer hover:border-cyan-500/30 transition-all duration-300"
                                    >
                                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors" />
                                        <div className="relative text-center">
                                            <div className="text-3xl mb-2">📸</div>
                                            <p className="text-sm text-slate-300">Screenshot {item}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                            <h2 className="text-2xl font-bold mb-6">Informasi Akun</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <span className="text-slate-400">Level</span>
                                    <span className="font-semibold">Level 35</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <span className="text-slate-400">Mata Uang Dalam Game</span>
                                    <span className="font-semibold">1,250 BP</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <span className="text-slate-400">Status</span>
                                    <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-300">Aktif</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="h-fit sticky top-20">
                        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 space-y-6">
                            {/* Seller Info */}
                            <div>
                                <p className="text-sm text-slate-400">Penjual</p>
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                                    <div>
                                        <p className="font-semibold">{account.seller}</p>
                                        <p className="text-sm text-slate-400">⭐ 4.8 (240 rating)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="pt-4 border-t border-slate-700/50">
                                <p className="text-sm text-slate-400 mb-2">Harga</p>
                                <p className="text-4xl font-bold text-cyan-400">
                                    Rp {account.price.toLocaleString("id-ID")}
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-3">
                                <Link
                                    href="/checkout"
                                    className="block w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                                >
                                    Beli Sekarang
                                </Link>
                                <button className="w-full py-4 rounded-xl border border-slate-700 bg-slate-900/50 text-slate-200 font-semibold hover:bg-slate-800 hover:border-cyan-500/30 transition-all duration-300">
                                    💬 Hubungi Penjual
                                </button>
                            </div>

                            {/* Info Box */}
                            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                                <p className="text-sm text-cyan-300 flex gap-2">
                                    <span>ℹ️</span>
                                    <span>Pembayaran diverifikasi oleh admin. Akun akan ditransfer setelah verifikasi selesai.</span>
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
