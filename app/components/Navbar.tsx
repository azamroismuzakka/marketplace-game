"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

const navLinks = [
  { href: "/catalog", label: "Katalog" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
  { href: "/#keunggulan", label: "Keunggulan" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 text-sm font-black text-black shadow-lg shadow-sky-500/30">
            AM
          </span>
          <span className="text-lg text-white">
            Athena<span className="text-sky-400">Market</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-white/5" />
          ) : user ? (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-200 hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-xs font-black text-black">
                  {initial}
                </span>
                <span className="max-w-32 truncate">{user.name}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-white"
              >
                Keluar
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-white"
            >
              Masuk Admin
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu (overlay) */}
      <div
        className={`absolute inset-x-0 top-16 z-50 border-t border-white/5 bg-black/95 backdrop-blur-xl transition-opacity duration-200 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="space-y-1 pt-3">
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-white/5"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-xs font-black text-black">
                  {initial}
                </span>
                {user.name}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm font-semibold text-slate-100"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="pt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm font-semibold text-slate-100"
              >
                Masuk Admin
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
