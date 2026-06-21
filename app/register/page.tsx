"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../components/AuthProvider";

type FieldErrors = Record<string, string>;

export default function RegisterPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Gagal mendaftar. Coba lagi.");
        if (data.errors) setFieldErrors(data.errors);
        return;
      }

      await refresh();
      router.push("/dashboard");
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
            <h1 className="text-2xl font-bold text-white">Buat Akun Baru</h1>
            <p className="mt-1 text-sm text-slate-400">
              Gratis, cuma butuh 1 menit
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
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Nama kamu"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="kamu@email.com"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Minimal 6 karakter"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
              />
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-400">
              <input type="checkbox" required className="mt-1 accent-sky-400" />
              <span>
                Saya setuju dengan{" "}
                <Link href="/terms" className="text-sky-400 hover:text-sky-300">
                  Syarat & Ketentuan
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Memproses…" : "Daftar"}
            </button>
          </form>

          <p className="relative mt-6 text-center text-sm text-slate-400">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-sky-400 hover:text-sky-300"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
