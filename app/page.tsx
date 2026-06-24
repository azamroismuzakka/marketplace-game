import Link from "next/link";
import AccountCard from "./components/AccountCard";
import { getActiveListings } from "./lib/listings";
import { featuredStats } from "./lib/mock-data";

// Revalidasi data listing tiap 60 detik (ISR).
export const revalidate = 60;

const steps = [
  {
    icon: "🔎",
    title: "Pilih Akun",
    text: "Telusuri katalog & filter berdasarkan game, rank, dan skin yang kamu mau.",
  },
  {
    icon: "💬",
    title: "Chat Admin via WhatsApp",
    text: "Klik 'Beli via WhatsApp', lalu sepakati harga & pembayaran langsung dengan admin.",
  },
  {
    icon: "🎮",
    title: "Akun Jadi Milikmu",
    text: "Admin serahkan data login akun setelah transaksi selesai.",
  },
];

const benefits = [
  {
    icon: "💬",
    title: "Transaksi via WhatsApp",
    text: "Beli langsung dengan admin resmi lewat WhatsApp — cepat dan jelas.",
  },
  {
    icon: "✅",
    title: "Verifikasi Admin",
    text: "Setiap akun dicek keasliannya oleh tim sebelum tayang di marketplace.",
  },
  {
    icon: "⚡",
    title: "Proses Cepat",
    text: "Mayoritas transaksi selesai di bawah 15 menit, tanpa ribet.",
  },
  {
    icon: "💬",
    title: "Support 24/7",
    text: "Tim bantuan siap membantu kapan pun lewat live chat & WhatsApp.",
  },
];

const faqs = [
  {
    q: "Apakah aman membeli akun di sini?",
    a: "Aman. Semua akun diverifikasi admin sebelum tayang, dan kamu bertransaksi langsung dengan admin resmi kami lewat WhatsApp.",
  },
  {
    q: "Bagaimana cara membeli akun?",
    a: "Pilih akun di katalog, klik 'Beli via WhatsApp', lalu lanjutkan obrolan dan pembayaran langsung dengan admin. Tidak perlu daftar akun.",
  },
  {
    q: "Berapa biaya transaksinya?",
    a: "Harga yang tertera adalah harga akun. Detail pembayaran diatur langsung dengan admin saat chat WhatsApp — tanpa biaya tersembunyi di web.",
  },
];

export default async function Home() {
  const listings = await getActiveListings({ take: 4 });

  return (
    <main className="text-slate-100">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-medium text-sky-300 sm:text-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
                Marketplace akun game terpercaya #1
              </span>

              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Jual & Beli{" "}
                <span className="bg-linear-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Akun Game
                </span>{" "}
                Aman & Cepat
              </h1>

              <p className="mx-auto max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
                Ribuan akun Mobile Legends & Free Fire rank tinggi, skin lengkap.
                Semua diverifikasi admin — beli mudah langsung via WhatsApp.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/catalog"
                  className="rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-7 py-3.5 text-center text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.03] sm:text-base"
                >
                  Jelajahi Katalog
                </Link>
                <Link
                  href="/#cara-kerja"
                  className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-center text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10 sm:text-base"
                >
                  Cara Kerja
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-500 sm:text-sm lg:justify-start">
                <span className="flex items-center gap-1.5">⭐ 4.9/5 rating</span>
                <span className="flex items-center gap-1.5">💬 Via WhatsApp</span>
                <span className="flex items-center gap-1.5">⚡ Proses cepat</span>
              </div>
            </div>

            {/* Brand logo */}
            <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-6 lg:max-w-none lg:py-0">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-linear-to-br from-sky-500/25 to-blue-600/20 blur-3xl" />
              <div className="flex flex-col items-center gap-7">
                {/* Logo mark — menyala lembut saat ditekan */}
                <button
                  type="button"
                  aria-label="Logo AthenaMarket"
                  className="group relative outline-none"
                >
                  <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[2.5rem] bg-linear-to-br from-sky-400 to-blue-600 opacity-40 blur-2xl transition-opacity duration-300 group-active:opacity-70" />
                  <div className="grid h-40 w-40 place-items-center rounded-[2.5rem] bg-linear-to-br from-sky-400 to-blue-600 text-6xl font-black text-black shadow-2xl shadow-sky-500/40 transition-transform duration-200 group-active:scale-95 sm:h-52 sm:w-52 sm:text-7xl">
                    AM
                  </div>
                </button>
                {/* Wordmark */}
                <div className="text-center">
                  <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Athena<span className="text-sky-400">Market</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Marketplace Akun Game Terpercaya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="border-y border-white/5 bg-white/2">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-10 sm:px-6 lg:grid-cols-4">
          {featuredStats.map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <p className="bg-linear-to-r from-sky-300 to-blue-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="cara-kerja" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-sky-400">CARA KERJA</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Tiga Langkah, Beres
          </h2>
          <p className="mt-3 text-slate-400">
            Tanpa ribet, tanpa khawatir penipuan. Transaksi dijamin aman dari
            awal sampai akhir.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors hover:border-sky-400/30"
            >
              <span className="absolute right-5 top-5 text-5xl font-black text-white/5">
                {i + 1}
              </span>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-400/10 text-2xl">
                {step.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Popular accounts ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-sky-400">
              PILIHAN POPULER
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Rekomendasi Hari Ini
            </h2>
          </div>
          <Link
            href="/catalog"
            className="hidden shrink-0 text-sm font-semibold text-sky-400 hover:text-sky-300 sm:block"
          >
            Lihat Semua →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/catalog"
            className="inline-block rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100"
          >
            Lihat Semua Akun →
          </Link>
        </div>
      </section>

      {/* ===== Benefits ===== */}
      <section id="keunggulan" className="border-t border-white/5 bg-white/2">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-sky-400">
              KENAPA KAMI
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Dibuat Untuk Rasa Aman Kamu
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-white/10 bg-white/3 p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-400/10 text-2xl">
                  {b.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <span className="text-sm font-semibold text-sky-400">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Pertanyaan Umum
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-white/10 bg-white/3 p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-white">
                {faq.q}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-400/10 text-sky-300 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-linear-to-br from-sky-500/10 via-blue-600/5 to-transparent px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">
            Siap Beli Akun Impianmu?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-slate-400">
            Pilih akun di katalog, lalu transaksi langsung dengan admin lewat
            WhatsApp. Cepat, mudah, tanpa perlu daftar akun.
          </p>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/catalog"
              className="rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-8 py-3.5 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.03] sm:text-base"
            >
              Jelajahi Katalog
            </Link>
            <a
              href="https://wa.me/6285867126940"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-100 hover:bg-white/10 sm:text-base"
            >
              💬 Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
