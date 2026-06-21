"use client";

import { useState } from "react";

type CheckoutAccount = {
  id: string;
  title: string;
  game: string;
  emoji: string;
  price: number;
};

const paymentMethods = [
  { id: "qris", label: "QRIS", desc: "Scan & bayar dari semua e-wallet" },
  { id: "va", label: "Virtual Account", desc: "BCA, BNI, Mandiri, BRI" },
  { id: "ewallet", label: "E-Wallet", desc: "GoPay, OVO, Dana, ShopeePay" },
];

export default function CheckoutClient({
  account,
}: {
  account: CheckoutAccount;
}) {
  const [method, setMethod] = useState("qris");
  const [paid, setPaid] = useState(false);

  const adminFee = 5000;
  const total = account.price + adminFee;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-100 sm:px-6">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">Checkout</h1>
      <p className="mt-1 text-sm text-slate-400">
        Selesaikan pembayaran untuk mengamankan akun pilihanmu.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Payment methods */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-300">
            Metode Pembayaran
          </h2>
          {paymentMethods.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${
                method === m.id
                  ? "border-sky-400/50 bg-sky-400/10"
                  : "border-white/10 bg-white/3 hover:bg-white/6"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={m.id}
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
                className="accent-sky-400"
              />
              <div>
                <p className="font-semibold text-white">{m.label}</p>
                <p className="text-sm text-slate-400">{m.desc}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
            <h2 className="text-sm font-semibold text-slate-300">
              Ringkasan Pesanan
            </h2>

            <div className="mt-4 flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-sky-400/15 to-blue-600/15 text-2xl">
                {account.emoji}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">
                  {account.title}
                </p>
                <p className="text-xs text-slate-400">{account.game}</p>
              </div>
            </div>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-400">Harga akun</dt>
                <dd className="text-white">
                  Rp {account.price.toLocaleString("id-ID")}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Biaya admin</dt>
                <dd className="text-white">
                  Rp {adminFee.toLocaleString("id-ID")}
                </dd>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3 text-base font-bold">
                <dt className="text-white">Total</dt>
                <dd className="text-sky-300">
                  Rp {total.toLocaleString("id-ID")}
                </dd>
              </div>
            </dl>

            {paid ? (
              <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-center text-sm text-emerald-300">
                ✅ Demo — pembayaran berhasil! Dana ditahan di rekening bersama
                hingga akun kamu terima.
              </div>
            ) : (
              <button
                onClick={() => setPaid(true)}
                className="mt-5 w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]"
              >
                Bayar Sekarang
              </button>
            )}

            <p className="mt-3 text-center text-xs text-slate-500">
              🔒 Dilindungi rekening bersama
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
