import Link from "next/link";
import ListingForm from "../../../components/admin/ListingForm";
import { requireAdmin } from "../../../lib/auth/dal";
import { getGames } from "../../../lib/listings";

export const metadata = {
  title: "Tambah Akun — Panel Admin",
};

export default async function NewListingPage() {
  await requireAdmin();
  const games = await getGames();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-100 sm:px-6">
      <nav className="flex items-center gap-2 text-sm text-slate-400">
        <Link href="/admin" className="hover:text-sky-400">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-200">Tambah Akun</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
        Tambah Akun Baru
      </h1>
      <p className="mt-1 text-sm text-slate-400">
        Isi detail akun. Gambar bisa ditambahkan setelah akun dibuat.
      </p>

      <div className="mt-8">
        <ListingForm games={games} />
      </div>
    </main>
  );
}
