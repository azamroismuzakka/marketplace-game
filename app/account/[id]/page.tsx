import Link from "next/link";
import { notFound } from "next/navigation";
import AccountGallery from "../../components/AccountGallery";
import {
  getListingDetail,
  getRelatedListings,
} from "../../lib/listings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const account = await getListingDetail(id);
  return {
    title: account
      ? `${account.title} — AthenaMarket`
      : "Akun tidak ditemukan",
  };
}

export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const account = await getListingDetail(id);

  if (!account) notFound();

  const related = await getRelatedListings(account.gameId, account.id);

  const specs = [
    { label: "Game", value: account.game },
    { label: "Rank", value: account.rank },
    { label: "Jumlah Skin", value: `${account.skins} Skin` },
    { label: "Status", value: account.status },
  ];

  return (
    <main className="text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-sky-400">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-sky-400">
            Katalog
          </Link>
          <span>/</span>
          <span className="truncate text-slate-200">{account.title}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: visual + details */}
          <div className="space-y-6">
            <AccountGallery
              images={account.images}
              emoji={account.emoji}
              title={account.title}
            />

            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-lg font-semibold text-white">Spesifikasi</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-white/5 bg-white/3 p-4"
                  >
                    <dt className="text-xs text-slate-500">{spec.label}</dt>
                    <dd className="mt-1 font-semibold text-white">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-lg font-semibold text-white">Deskripsi</h2>
              <p className="mt-3 leading-relaxed text-slate-400">
                {account.description} Akun ini telah melalui proses verifikasi
                admin untuk memastikan keaslian dan keamanannya. Untuk membeli,
                klik tombol di samping dan lanjutkan transaksi langsung dengan
                admin lewat WhatsApp.
              </p>
            </div>
          </div>

          {/* Right: purchase box */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <span className="rounded-full bg-sky-400/15 px-2.5 py-1 text-[11px] font-semibold text-sky-300">
                {account.game}
              </span>
              <h1 className="mt-3 text-2xl font-bold text-white">
                {account.title}
              </h1>

              <div className="mt-5 border-y border-white/5 py-5">
                <p className="text-xs text-slate-500">Harga</p>
                <p className="text-3xl font-extrabold text-sky-300">
                  Rp {account.price.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <a
                  href={`https://wa.me/6285867126940?text=${encodeURIComponent(
                    `Halo admin AthenaMarket, saya mau BELI akun "${account.title}" (${account.id}) seharga Rp ${account.price.toLocaleString("id-ID")}. Apakah masih tersedia?`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]"
                >
                  💬 Beli via WhatsApp
                </a>
                <a
                  href={`https://wa.me/6285867126940?text=${encodeURIComponent(
                    `Halo admin AthenaMarket, saya mau tanya tentang akun "${account.title}" (${account.id}).`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-slate-100 hover:bg-white/10"
                >
                  Tanya Admin Dulu
                </a>
                <a
                  href="https://www.instagram.com/athenamarket.id?igsh=aDFxMjhpa3BnN25o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-pink-400/30 bg-pink-400/10 px-6 py-3.5 text-center text-sm font-semibold text-pink-300 hover:bg-pink-400/20"
                >
                  📷 Ikuti Instagram Kami
                </a>
                <a
                  href="https://whatsapp.com/channel/0029VbDHh1v2975326u5NU27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-3.5 text-center text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20"
                >
                  📢 Saluran WhatsApp
                </a>
              </div>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-sky-400">✓</span> Transaksi langsung via
                  WhatsApp
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400">✓</span> Sudah diverifikasi admin
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400">✓</span> Respons cepat & ramah
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-white">
              Akun {account.game} Lainnya
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/account/${a.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 transition-colors hover:border-sky-400/40"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-sky-400/15 to-blue-600/15 text-2xl">
                    {a.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white group-hover:text-sky-300">
                      {a.title}
                    </p>
                    <p className="text-sm text-sky-300">
                      Rp {a.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
