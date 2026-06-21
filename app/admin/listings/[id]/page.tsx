import Link from "next/link";
import { notFound } from "next/navigation";
import ImageManager from "../../../components/admin/ImageManager";
import { requireAdmin } from "../../../lib/auth/dal";
import { getAdminListing } from "../../../lib/listings";

export const metadata = {
  title: "Kelola Gambar — Panel Admin",
};

export default async function AdminListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const listing = await getAdminListing(id);
  if (!listing) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-100 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400">
        <Link href="/admin" className="hover:text-sky-400">
          Panel Admin
        </Link>
        <span>/</span>
        <span className="truncate text-slate-200">{listing.title}</span>
      </nav>

      <div className="mt-6 flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-sky-400/15 to-blue-600/15 text-2xl">
          {listing.emoji}
        </div>
        <div>
          <h1 className="text-xl font-bold text-white sm:text-2xl">
            {listing.title}
          </h1>
          <p className="text-sm text-slate-400">
            {listing.game} · Rp {listing.price.toLocaleString("id-ID")}
          </p>
        </div>
        <Link
          href={`/account/${listing.id}`}
          className="ml-auto rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
        >
          Lihat halaman ↗
        </Link>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-white">Screenshot Akun</h2>
        <p className="mt-1 text-sm text-slate-400">
          Gambar yang diunggah akan tampil di galeri halaman detail akun.
        </p>
        <div className="mt-5">
          <ImageManager listingId={listing.id} initialImages={listing.images} />
        </div>
      </section>
    </main>
  );
}
