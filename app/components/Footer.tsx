import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-slate-800/50 bg-gradient-to-b from-slate-950 to-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-8 md:grid-cols-4 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            ClevatesMarket
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            Marketplace terpercaya untuk jual beli akun game favorit Anda.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-100">Produk</h4>
                        <ul className="mt-3 space-y-2">
                            <li><Link href="/catalog" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Katalog</Link></li>
                            <li><Link href="/dashboard" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-100">Layanan</h4>
                        <ul className="mt-3 space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Bantuan</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Kebijakan Privasi</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-100">Hubungi</h4>
                        <ul className="mt-3 space-y-2 text-slate-400 text-sm">
                            <li>📧 azamroismuzakka123@gmail.com</li>
                            <li>📱 085867126940</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800/50 pt-8">
                    <p className="text-center text-sm text-slate-500">
                        © 2024 ClevatesMarket. Semua hak dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
