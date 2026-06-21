import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20 text-center text-slate-100">
      <p className="bg-linear-to-r from-sky-300 to-blue-500 bg-clip-text text-7xl font-extrabold text-transparent sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-white">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 max-w-md text-slate-400">
        Sepertinya halaman yang kamu cari sudah berpindah atau tidak pernah ada.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.03]"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/catalog"
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10"
        >
          Lihat Katalog
        </Link>
      </div>
    </main>
  );
}
