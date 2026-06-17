import Link from "next/link";

export default function CheckoutPage() {
    return (
        <main className="min-h-screen text-slate-50">
            <section className="mx-auto max-w-7xl px-6 py-8">
                <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
                >
                    ← Kembali ke Katalog
                </Link>

                <div className="space-y-2 mb-12">
                    <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-300 text-sm font-medium border border-cyan-500/30">
                        🛒 Checkout
                    </span>
                    <h1 className="text-4xl font-bold">Selesaikan Pembelian</h1>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    {/* Payment Section */}
                    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                        <div className="space-y-8">
                            {/* Order Review */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Ulasan Pesanan</h2>
                                <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="text-sm text-slate-400">Akun yang dipilih</p>
                                            <h3 className="text-xl font-bold text-slate-100 mt-1">Legendary Mage Account</h3>
                                        </div>
                                        <span className="text-2xl">⚔️</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
                                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium">
                                            Mobile Legends
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs">
                                            Mythic+
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs">
                                            48 Skin
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Metode Pembayaran</h2>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {[
                                        { name: 'QRIS', icon: '📱' },
                                        { name: 'Bank Transfer', icon: '🏦' },
                                        { name: 'E-Wallet', icon: '💳' }
                                    ].map((method) => (
                                        <button
                                            key={method.name}
                                            className="rounded-2xl border border-slate-700/50 bg-slate-800/50 hover:bg-cyan-500/10 hover:border-cyan-500/30 px-4 py-4 text-sm font-medium transition-all duration-300"
                                        >
                                            <div className="text-2xl mb-2">{method.icon}</div>
                                            {method.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-4">
                                <p className="text-sm text-cyan-300 flex gap-2">
                                    <span>ℹ️</span>
                                    <span>Pembayaran akan diverifikasi dalam 5 menit. Akun akan ditransfer setelah verifikasi selesai.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="h-fit sticky top-20">
                        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 space-y-6">
                            <h2 className="text-2xl font-bold">Ringkasan</h2>

                            <div className="space-y-4 pb-6 border-b border-slate-700/50">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Harga akun</span>
                                    <span className="font-semibold">Rp 250.000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Biaya layanan</span>
                                    <span className="font-semibold">Rp 10.000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Pajak (5%)</span>
                                    <span className="font-semibold">Rp 13.000</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-3xl font-bold text-cyan-400">Rp 273.000</span>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                                💳 Bayar Sekarang
                            </button>

                            <button className="w-full py-3 rounded-xl border border-slate-700 bg-slate-900/50 text-slate-200 font-semibold hover:bg-slate-800 hover:border-cyan-500/30 transition-all duration-300">
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
