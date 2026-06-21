import LegalContent from "../components/LegalContent";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: "Syarat & Ketentuan — AthenaMarket",
};

const sections = [
  {
    heading: "Penerimaan Ketentuan",
    body: "Dengan menggunakan AthenaMarket, kamu menyetujui seluruh syarat dan ketentuan yang berlaku. Jika tidak setuju, mohon untuk tidak menggunakan layanan kami.",
  },
  {
    heading: "Akun Pengguna",
    body: "Kamu bertanggung jawab menjaga kerahasiaan kredensial akunmu. Segala aktivitas yang terjadi melalui akunmu menjadi tanggung jawabmu sepenuhnya.",
  },
  {
    heading: "Transaksi & Rekening Bersama",
    body: "Seluruh transaksi jual beli akun menggunakan sistem rekening bersama (escrow). Dana pembeli ditahan oleh platform dan baru diteruskan ke penjual setelah pembeli mengonfirmasi penerimaan akun.",
  },
  {
    heading: "Kewajiban Penjual",
    body: "Penjual wajib memberikan informasi akun yang benar dan menyerahkan seluruh data kepemilikan. Pemberian informasi palsu dapat berakibat pemblokiran akun dan tindakan hukum.",
  },
  {
    heading: "Larangan",
    body: "Dilarang menjual akun hasil curian, melakukan penipuan, atau menyalahgunakan sistem. Pelanggaran akan ditindak tegas tanpa pengembalian dana komisi.",
  },
  {
    heading: "Perubahan Ketentuan",
    body: "Kami berhak memperbarui syarat dan ketentuan kapan saja. Perubahan akan diberitahukan melalui platform dan berlaku sejak dipublikasikan.",
  },
];

export default function TermsPage() {
  return (
    <main className="text-slate-100">
      <PageHeader
        eyebrow="LEGAL"
        title="Syarat & Ketentuan"
        description="Aturan main yang menjaga transaksi tetap adil dan aman untuk semua."
      />
      <LegalContent sections={sections} updatedAt="1 Juni 2026" />
    </main>
  );
}
