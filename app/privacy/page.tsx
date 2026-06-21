import LegalContent from "../components/LegalContent";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: "Kebijakan Privasi — AthenaMarket",
};

const sections = [
  {
    heading: "Data yang Kami Kumpulkan",
    body: "Kami mengumpulkan data yang kamu berikan saat mendaftar dan bertransaksi, seperti nama, email, nomor telepon, dan detail transaksi. Kami juga mencatat data teknis seperti alamat IP untuk keamanan.",
  },
  {
    heading: "Penggunaan Data",
    body: "Data digunakan untuk memproses transaksi, memverifikasi identitas, mencegah penipuan, serta meningkatkan kualitas layanan. Kami tidak menjual data pribadimu kepada pihak ketiga.",
  },
  {
    heading: "Keamanan Data",
    body: "Kami menerapkan enkripsi dan praktik keamanan standar industri untuk melindungi datamu. Meski demikian, tidak ada sistem yang 100% kebal, sehingga kami mendorong kamu menjaga kerahasiaan akun.",
  },
  {
    heading: "Cookie",
    body: "Kami menggunakan cookie untuk menjaga sesi login dan menganalisis penggunaan situs. Kamu dapat menonaktifkan cookie melalui pengaturan browser, namun sebagian fitur mungkin tidak berfungsi optimal.",
  },
  {
    heading: "Hak Pengguna",
    body: "Kamu berhak mengakses, memperbarui, atau menghapus data pribadimu. Hubungi tim support kami untuk mengajukan permintaan terkait data.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="text-slate-100">
      <PageHeader
        eyebrow="LEGAL"
        title="Kebijakan Privasi"
        description="Bagaimana kami mengumpulkan, menggunakan, dan melindungi data kamu."
      />
      <LegalContent sections={sections} updatedAt="1 Juni 2026" />
    </main>
  );
}
