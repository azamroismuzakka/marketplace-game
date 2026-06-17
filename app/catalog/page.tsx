"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, gameAccounts } from "../lib/mock-data";

export default function CatalogPage() {
    const [selectedFilter, setSelectedFilter] = useState("Semua");

    const filteredAccounts = selectedFilter === "Semua"
        ? gameAccounts
        : gameAccounts.filter(account => {
            if (selectedFilter === "Mobile Legends") return account.game === "Mobile Legends";
            if (selectedFilter === "Free Fire") return account.game === "Free Fire";
            if (selectedFilter === "Rank Tinggi") return account.rank.includes("Epic") || account.rank.includes("Mythic");
            if (selectedFilter === "Harga Rendah") return account.price <= 100000;
            return true;
        });

    return (
        <main className="min-h-screen text-slate-50">
            {/* Header Section */}
            <section className="relative border-b border-slate-800/30 bg-gradient-to-b from-slate-900/50 to-transparent py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-300 text-sm font-medium border border-cyan-500/30">
                                📚 Katalog Lengkap
                            </span>
                            <h1 className="mt-4 text-4xl font-bold">Pilih Akun Sesuai Kebutuhanmu</h1>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <p className="text-slate-400 max-w-lg">
                                Ribuan akun game dengan berbagai rank, skin, dan hero. Semua telah diverifikasi oleh tim admin kami.
                            </p>
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                                {categories.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setSelectedFilter(item)}
                                        className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${selectedFilter === item
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                                            : "border border-slate-700 bg-slate-900/50 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Catalog Grid */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                {filteredAccounts.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredAccounts.map((account) => (
                            <Link
                                key={account.id}
                                href={`/account/${account.id}`}
                                className="group rounded-2xl border border-slate-700/50 bg-slate-900/50 hover:bg-slate-900/80 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">
                                            {account.game === "Mobile Legends" ? "⚔️" : "🔫"}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                                            {account.game}
                                        </span>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${account.status === "Ready"
                                        ? "bg-emerald-500/20 text-emerald-300"
                                        : "bg-amber-500/20 text-amber-300"
                                        }`}>
                                        {account.status}
                                    </span>
                                </div>

                                <h2 className="text-lg font-semibold text-slate-50 group-hover:text-cyan-300 transition-colors">
                                    {account.title}
                                </h2>
                                <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                                    {account.description}
                                </p>

                                <div className="mt-4 space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-300 text-xs font-medium border border-slate-700/50">
                                            Rank: {account.rank}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-300 text-xs font-medium border border-slate-700/50">
                                            {account.skins} Skin
                                        </span>
                                    </div>

                                    {account.heroes.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {account.heroes.slice(0, 3).map((hero) => (
                                                <span key={hero} className="px-2 py-1 rounded bg-slate-800/40 text-slate-300 text-xs">
                                                    {hero}
                                                </span>
                                            ))}
                                            {account.heroes.length > 3 && (
                                                <span className="px-2 py-1 rounded bg-slate-800/40 text-slate-300 text-xs">
                                                    +{account.heroes.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-700/50">
                                    <div>
                                        <p className="text-xs text-slate-400">Harga</p>
                                        <p className="text-2xl font-bold text-cyan-400">
                                            Rp {account.price.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm font-semibold group-hover:bg-cyan-500/30 transition-colors">
                                        Lihat →
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-700/50">
                                    <p className="text-xs text-slate-500">Penjual: <span className="text-slate-300">{account.seller}</span></p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-slate-200 mb-2">Tidak ada akun ditemukan</h3>
                        <p className="text-slate-400">Coba filter yang berbeda atau kembali ke semua akun</p>
                    </div>
                )}
            </section>
        </main>
    );
}
