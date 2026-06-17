import Link from "next/link";

export default function AdminPage() {
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
                        ⚙️ Admin Panel
                    </span>
                    <h1 className="text-4xl font-bold">Kelola Platform</h1>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-16">
                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    {[
                        { icon: "👥", label: "Pengguna", value: "128", color: "from-cyan-500/20 to-blue-500/20" },
                        { icon: "📦", label: "Akun Dijual", value: "46", color: "from-emerald-500/20 to-green-500/20" },
                        { icon: "💱", label: "Transaksi", value: "89", color: "from-purple-500/20 to-pink-500/20" },
                        { icon: "✅", label: "Verifikasi Pending", value: "7", color: "from-amber-500/20 to-orange-500/20" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className={`rounded-2xl border border-slate-700/50 bg-gradient-to-br ${stat.color} p-6 hover:border-slate-600/50 transition-all duration-300`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-3xl">{stat.icon}</span>
                                <p className="text-xs text-slate-400">{stat.label}</p>
                            </div>
                            <p className="text-3xl font-bold text-slate-50">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-2 mb-12">
                    {/* Payment Verification */}
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Verifikasi Pembayaran</h2>
                            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">7</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { id: "101", status: "pending", time: "5 menit lalu" },
                                { id: "102", status: "verified", time: "1 jam lalu" },
                                { id: "103", status: "pending", time: "15 menit lalu" },
                            ].map((order) => (
                                <div
                                    key={order.id}
                                    className="rounded-2xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 p-4 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-bold">
                                                #{order.id}
                                            </div>
                                            <div>
                                                <p className="font-semibold">Order #{order.id}</p>
                                                <p className="text-xs text-slate-400">{order.time}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "verified"
                                                ? "bg-emerald-500/20 text-emerald-300"
                                                : "bg-amber-500/20 text-amber-300"
                                            }`}>
                                            {order.status === "verified" ? "✓ Verified" : "⏳ Pending"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Account Management */}
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Kelola Akun</h2>
                            <button className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-colors">
                                + Tambah
                            </button>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: "Legendary Mage Account", status: "active", game: "ML" },
                                { name: "Battle Ready FF Account", status: "pending", game: "FF" },
                                { name: "Elite Shooter Setup", status: "active", game: "FF" },
                            ].map((account, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 p-4 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">
                                                {account.game === "ML" ? "⚔️" : "🔫"}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{account.name}</p>
                                                <p className="text-xs text-slate-400">{account.game} Account</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${account.status === "active"
                                                    ? "bg-emerald-500/20 text-emerald-300"
                                                    : "bg-amber-500/20 text-amber-300"
                                                }`}>
                                                {account.status === "active" ? "Active" : "Pending"}
                                            </span>
                                            <button className="px-2 py-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                                                ⋯
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                    <h2 className="text-2xl font-bold mb-6">Aksi Cepat</h2>
                    <div className="grid gap-4 sm:grid-cols-4">
                        <button className="rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 px-6 py-4 text-center font-semibold transition-all duration-300 hover:border-cyan-500/50">
                            📊 Laporan
                        </button>
                        <button className="rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 px-6 py-4 text-center font-semibold transition-all duration-300 hover:border-cyan-500/50">
                            👥 Kelola User
                        </button>
                        <button className="rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 px-6 py-4 text-center font-semibold transition-all duration-300 hover:border-cyan-500/50">
                            ⚠️ Laporan Masalah
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
