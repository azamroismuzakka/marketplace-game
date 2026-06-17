import Link from "next/link";

export default function DashboardPage() {
    return (
        <main className="min-h-screen text-slate-50">
            <section className="mx-auto max-w-7xl px-6 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
                >
                    ← Kembali
                </Link>

                <div className="space-y-2 mb-12">
                    <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-300 text-sm font-medium border border-cyan-500/30">
                        👤 Dashboard Pengguna
                    </span>
                    <h1 className="text-4xl font-bold">Akun Saya</h1>
                </div>
            </section>

            {/* Stats Cards */}
            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="grid gap-6 md:grid-cols-3 mb-12">
                    {[
                        { icon: "🛒", label: "Pembelian", value: "4", color: "from-cyan-500/20 to-blue-500/20" },
                        { icon: "💰", label: "Penjualan", value: "2", color: "from-emerald-500/20 to-green-500/20" },
                        { icon: "💵", label: "Saldo", value: "Rp 350.000", color: "from-purple-500/20 to-pink-500/20" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className={`rounded-2xl border border-slate-700/50 bg-gradient-to-br ${item.color} p-8 hover:border-slate-600/50 transition-all duration-300`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">{item.icon}</span>
                                <p className="text-sm text-slate-400">{item.label}</p>
                            </div>
                            <p className="text-4xl font-bold text-slate-50">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* History Section */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Purchase History */}
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Riwayat Pembelian</h2>
                            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">4</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { title: 'Legendary Mage Account', status: 'Menunggu pembayaran', color: 'amber' },
                                { title: 'Elite Free Fire Vault', status: 'Sudah selesai', color: 'emerald' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 p-4 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-100">{item.title}</p>
                                            <p className={`text-xs mt-1 ${item.color === 'amber' ? 'text-amber-400' : 'text-emerald-400'
                                                }`}>
                                                {item.status}
                                            </p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${item.color === 'amber'
                                            ? 'bg-amber-500/20 text-amber-300'
                                            : 'bg-emerald-500/20 text-emerald-300'
                                            }`}>
                                            {item.color === 'amber' ? '⏳' : '✓'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sales History */}
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Riwayat Penjualan</h2>
                            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">2</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { title: 'Fighter Account', buyer: 'Buyer #1', amount: 'Rp 95.000' },
                                { title: 'Mage Account', buyer: 'Buyer #2', amount: 'Rp 180.000' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 p-4 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-100">{item.title}</p>
                                            <p className="text-xs text-slate-400 mt-1">{item.buyer}</p>
                                        </div>
                                        <span className="text-emerald-400 font-semibold text-sm">{item.amount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-12 rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                    <h2 className="text-2xl font-bold mb-6">Aksi Cepat</h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Link
                            href="/catalog"
                            className="rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 px-6 py-4 text-center font-semibold transition-all duration-300 hover:border-cyan-500/50"
                        >
                            🛍️ Belanja Akun
                        </Link>
                        <button className="rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 px-6 py-4 text-center font-semibold transition-all duration-300 hover:border-cyan-500/50">
                            📤 Jual Akun
                        </button>
                        <button className="rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 px-6 py-4 text-center font-semibold transition-all duration-300 hover:border-cyan-500/50">
                            ⚙️ Pengaturan
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
