"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Gagal masuk. Coba lagi.");
        return;
      }

      await refresh();
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 text-slate-100">
      <div className="w-full max-w-md">
        <div className="relative rounded-3xl border border-white/10 bg-white/3 p-7 backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="relative text-center">
            <span className="grid mx-auto h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-600 text-lg font-black text-black">
              AM
            </span>
            <h1 className="mt-4 text-2xl font-bold text-white">Masuk Admin</h1>
            <p className="mt-1 text-sm text-slate-400">
              Khusus pengelola AthenaMarket
            </p>
          </div>

          {error && (
            <div className="relative mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-center text-sm text-red-300">
              {error}
            </div>
          )}

          <form className="relative mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="admin@athenamarket.id"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 pr-12 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-sky-400"
                >
                  {showPassword ? "Sembunyi" : "Lihat"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Memproses…" : "Masuk"}
            </button>
          </form>

          <p className="relative mt-6 text-center text-xs text-slate-500">
            Mau beli akun?{" "}
            <Link href="/catalog" className="text-sky-400 hover:text-sky-300">
              Lihat katalog
            </Link>{" "}
            — transaksi via WhatsApp, tanpa perlu akun.
          </p>
        </div>
      </div>
    </main>
  );
}
