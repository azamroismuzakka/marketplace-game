"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 text-slate-100">
      <div className="w-full max-w-md">
        <div className="relative rounded-3xl border border-white/10 bg-white/3 p-7 backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="relative text-center">
            <h1 className="text-2xl font-bold text-white">Lupa Password?</h1>
            <p className="mt-1 text-sm text-slate-400">
              Masukkan email, kami kirimkan tautan reset
            </p>
          </div>

          {sent ? (
            <div className="relative mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-center text-sm text-emerald-300">
              ✅ Demo — tautan reset password telah dikirim ke emailmu.
            </div>
          ) : (
            <form
              className="relative mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="kamu@email.com"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]"
              >
                Kirim Tautan Reset
              </button>
            </form>
          )}

          <p className="relative mt-6 text-center text-sm text-slate-400">
            Ingat password?{" "}
            <Link href="/login" className="font-semibold text-sky-400 hover:text-sky-300">
              Kembali ke login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
