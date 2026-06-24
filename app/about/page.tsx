import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { featuredStats } from "../lib/mock-data";

export const metadata = {
  title: "Tentang Kami — AthenaMarket",
};

const values = [
  {
    icon: "🛡️",
    title: "Keamanan #1",
    text: "Setiap rupiah dilindungi rekening bersama. Tidak ada transaksi tanpa jaminan.",
  },
  {
    icon: "🤝",
    title: "Kepercayaan",
    text: "Verifikasi berlapis untuk setiap akun memastikan kamu bertransaksi dengan tenang.",
  },
  {
    icon: "⚡",
    title: "Cepat & Mudah",
    text: "Antarmuka sederhana, proses ringkas. Beli atau jual akun cuma butuh beberapa menit.",
  },
];

export default function AboutPage() {
  return (
    <main className="text-slate-100">
      <PageHeader
        eyebrow="TENTANG KAMI"
        title="Marketplace Akun Game untuk Gamer Indonesia"
        description="AthenaMarket lahir dari satu misi sederhana: membuat jual beli akun game jadi aman, mudah, dan bebas penipuan."
      />

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-4 text-slate-400">
          <p>
            Berawal dari keresahan para gamer yang sering jadi korban penipuan
            saat jual beli akun, kami membangun platform yang menempatkan
            keamanan sebagai prioritas utama. Sistem rekening bersama memastikan
            uang pembeli tidak berpindah sebelum akun benar-benar diterima.
          </p>
          <p>
            Hari ini, ribuan gamer mempercayai AthenaMarket untuk transaksi
            akun Mobile Legends, Free Fire, dan game populer lainnya. Kami terus
            berkembang demi pengalaman jual beli yang lebih baik.
          </p>
        </div>
      </section>

      {/* Stats */}
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

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Nilai yang Kami Pegang
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-white/10 bg-white/3 p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-400/10 text-2xl">
                {v.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-sky-400/20 bg-linear-to-br from-sky-500/10 via-blue-600/5 to-transparent px-6 py-12 text-center sm:py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Mau gabung jadi bagian dari kami?
          </h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/catalog"
              className="rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.03]"
            >
              Jelajahi Katalog
            </Link>
            <a
              href="https://wa.me/6285867126940"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10"
            >
              💬 Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
