import Link from "next/link";
import CheckoutClient from "../components/CheckoutClient";
import { requireUser } from "../lib/auth/dal";
import { getListingDetail } from "../lib/listings";

export const metadata = {
  title: "Checkout — AthenaMarket",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ account?: string }>;
}) {
  // Wajib login untuk checkout.
  await requireUser();

  const { account: accountId } = await searchParams;
  const account = accountId ? await getListingDetail(accountId) : null;

  if (!account) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-24 text-center text-slate-100">
        <p className="text-4xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold text-white">
          Tidak ada akun dipilih
        </h1>
        <p className="mt-2 text-slate-400">
          Pilih akun dari katalog untuk melanjutkan checkout.
        </p>
        <Link
          href="/catalog"
          className="mt-6 inline-block rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-black"
        >
          Ke Katalog
        </Link>
      </main>
    );
  }

  return (
    <CheckoutClient
      account={{
        id: account.id,
        title: account.title,
        game: account.game,
        emoji: account.emoji,
        price: account.price,
      }}
    />
  );
}
