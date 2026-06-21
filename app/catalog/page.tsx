import Link from "next/link";
import AccountCard from "../components/AccountCard";
import PageHeader from "../components/PageHeader";
import { getActiveListings } from "../lib/listings";

export const metadata = {
  title: "Katalog Akun — AthenaMarket",
  description: "Jelajahi ribuan akun game siap pakai dengan harga terbaik.",
};

const filters = [
  { slug: "", label: "Semua Game" },
  { slug: "mobile-legends", label: "Mobile Legends" },
  { slug: "free-fire", label: "Free Fire" },
];

const slugToGame: Record<string, string> = {
  "mobile-legends": "Mobile Legends",
  "free-fire": "Free Fire",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ game?: string }>;
}) {
  const { game = "" } = await searchParams;
  const activeGame = slugToGame[game] ?? null;
  const list = await getActiveListings(game ? { gameSlug: game } : undefined);

  return (
    <main className="text-slate-100">
      <PageHeader
        eyebrow="KATALOG"
        title="Temukan Akun Impianmu"
        description="Semua akun sudah diverifikasi admin dan dilindungi rekening bersama."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const isActive = game === f.slug;
            return (
              <Link
                key={f.slug || "all"}
                href={f.slug ? `/catalog?game=${f.slug}` : "/catalog"}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-linear-to-r from-sky-400 to-blue-600 text-black"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Menampilkan <span className="font-semibold text-white">{list.length}</span>{" "}
          akun{activeGame ? ` untuk ${activeGame}` : ""}.
        </p>

        {list.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/3 p-12 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-4 font-semibold text-white">Belum ada akun</p>
            <p className="mt-1 text-sm text-slate-400">
              Coba pilih filter game yang lain.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
