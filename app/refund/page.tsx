import LegalContent from "../components/LegalContent";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: "Kebijakan Refund — AthenaMarket",
};

const sections = [
  {
    heading: "Jaminan Rekening Bersama",
    body: "Karena seluruh transaksi memakai sistem rekening bersama, danamu aman. Jika akun tidak diterima atau tidak sesuai deskripsi, dana akan dikembalikan 100%.",
  },
  {
    heading: "Syarat Pengajuan Refund",
    body: "Refund dapat diajukan jika: akun tidak dapat diakses, data login salah, atau spesifikasi akun berbeda jauh dari yang diiklankan. Pengajuan dilakukan sebelum kamu menekan tombol konfirmasi penerimaan.",
  },
  {
    heading: "Proses Refund",
    body: "Pengajuan diverifikasi tim kami maksimal 1×24 jam. Setelah disetujui, dana dikembalikan ke metode pembayaran asal dalam 1–3 hari kerja, tergantung penyedia pembayaran.",
  },
  {
    heading: "Pengecualian",
    body: "Refund tidak berlaku jika akun sudah dikonfirmasi diterima dan terjadi perubahan oleh pembeli (misalnya ganti email/password), atau jika kerusakan terjadi akibat kelalaian pembeli.",
  },
];

export default function RefundPage() {
  return (
    <main className="text-slate-100">
      <PageHeader
        eyebrow="LEGAL"
        title="Kebijakan Refund"
        description="Komitmen kami: transaksi gagal, uang kembali. Tanpa drama."
      />
      <LegalContent sections={sections} updatedAt="1 Juni 2026" />
    </main>
  );
}
