import Link from "next/link";

const footerNav = [
  {
    title: "Marketplace",
    links: [
      { href: "/catalog", label: "Semua Akun" },
      { href: "/catalog?game=mobile-legends", label: "Mobile Legends" },
      { href: "/catalog?game=free-fire", label: "Free Fire" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { href: "/#cara-kerja", label: "Cara Kerja" },
      { href: "/#faq", label: "FAQ" },
      { href: "/contact", label: "Hubungi Kami" },
      { href: "/refund", label: "Kebijakan Refund" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { href: "/about", label: "Tentang" },
      { href: "/terms", label: "Syarat & Ketentuan" },
      { href: "/privacy", label: "Privasi" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 text-sm font-black text-black">
                AM
              </span>
              <span className="text-lg text-white">
                Athena<span className="text-sky-400">Market</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Marketplace jual beli akun game paling aman. Setiap transaksi
              dilindungi sistem rekening bersama & verifikasi admin.
            </p>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-sky-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 AthenaMarket. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-500">
            Dibuat untuk para gamer Indonesia 🇮🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
