"use client";

import { useState } from "react";

const channels: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}[] = [
  {
    icon: "📱",
    label: "WhatsApp",
    value: "0858-6712-6940",
    href: "https://wa.me/6285867126940",
  },
  {
    icon: "📧",
    label: "Email",
    value: "azamroismuzakka123@gmail.com",
    href: "mailto:azamroismuzakka123@gmail.com",
  },
  { icon: "💬", label: "Live Chat", value: "Tersedia 24/7 di pojok kanan bawah" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="text-slate-100">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <span className="text-sm font-semibold text-sky-400">HUBUNGI KAMI</span>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Ada Pertanyaan? Kami Siap Bantu
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Tim support kami responsif dan ramah. Pilih cara yang paling nyaman
            buat kamu.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Channels */}
        <div className="space-y-4">
          {channels.map((c) => {
            const inner = (
              <>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-400/10 text-xl">
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-white">{c.label}</p>
                  <p className="mt-0.5 break-all text-sm text-slate-400">
                    {c.value}
                  </p>
                </div>
              </>
            );
            const base =
              "flex items-start gap-4 rounded-2xl border border-white/10 bg-white/3 p-5";
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} transition-colors hover:border-sky-400/40`}
              >
                {inner}
              </a>
            ) : (
              <div key={c.label} className={base}>
                {inner}
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-white/3 p-6 sm:p-7">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <p className="text-4xl">📨</p>
              <h2 className="mt-3 text-xl font-bold text-white">Pesan Terkirim!</h2>
              <p className="mt-2 text-sm text-slate-400">
                Demo — kami akan membalas pesanmu secepatnya.
              </p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Nama
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama kamu"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
                />
              </div>
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
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Pesan
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tulis pertanyaan atau keluhanmu..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-600 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.01]"
              >
                Kirim Pesan
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
