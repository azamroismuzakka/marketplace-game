import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteListingButton from "../../../components/admin/DeleteListingButton";
import ImageManager from "../../../components/admin/ImageManager";
import ListingForm from "../../../components/admin/ListingForm";
import { requireAdmin } from "../../../lib/auth/dal";
import { getAdminListing, getGames } from "../../../lib/listings";

export const metadata = {
  title: "Edit Akun — Panel Admin",
};

export default async function AdminListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [listing, games] = await Promise.all([getAdminListing(id), getGames()]);
  if (!listing) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-100 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400">
        <Link href="/admin" className="hover:text-sky-400">
          Dashboard
        </Link>
        <span>/</span>
        <span className="truncate text-slate-200">{listing.title}</span>
      </nav>

      <div className="mt-6 flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-sky-400/15 to-blue-600/15 text-2xl">
          {listing.emoji}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-white sm:text-2xl">
            {listing.title}
          </h1>
          <p className="text-sm text-slate-400">{listing.game}</p>
        </div>
        <Link
          href={`/account/${listing.id}`}
          target="_blank"
          className="ml-auto rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
        >
          Lihat halaman ↗
        </Link>
      </div>

      {/* Edit detail */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-6">
        <h2 className="text-lg font-semibold text-white">Detail Akun</h2>
        <div className="mt-5">
          <ListingForm
            games={games}
            initial={{
              id: listing.id,
              gameId: listing.gameId,
              title: listing.title,
              description: listing.description,
              price: listing.price,
              rank: listing.rank,
              skinCount: listing.skinCount,
              winRate: listing.winRate,
              iconEmoji: listing.iconEmoji,
              status: listing.status,
              isFeatured: listing.isFeatured,
            }}
          />
        </div>
      </section>

      {/* Images */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-6">
        <h2 className="text-lg font-semibold text-white">Screenshot Akun</h2>
        <p className="mt-1 text-sm text-slate-400">
          Gambar tampil di galeri halaman detail akun.
        </p>
        <div className="mt-5">
          <ImageManager listingId={listing.id} initialImages={listing.images} />
        </div>
      </section>

      {/* Danger zone */}
      <section className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
        <h2 className="text-lg font-semibold text-white">Hapus Akun</h2>
        <p className="mt-1 text-sm text-slate-400">
          Menghapus akun ini permanen beserta semua gambarnya.
        </p>
        <div className="mt-4">
          <DeleteListingButton id={listing.id} title={listing.title} />
        </div>
      </section>
    </main>
  );
}
