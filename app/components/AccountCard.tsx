import Link from "next/link";
import type { ListingCard } from "../lib/listings";

export default function AccountCard({ account }: { account: ListingCard }) {
  return (
    <Link
      href={`/account/${account.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/3 p-5 transition-all hover:border-sky-400/40 hover:bg-white/6"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-sky-400/15 px-2.5 py-1 text-[11px] font-semibold text-sky-300">
          {account.game}
        </span>
        <span
          className={`text-[11px] font-semibold ${
            account.status === "Ready" ? "text-emerald-400" : "text-amber-400"
          }`}
        >
          ● {account.status}
        </span>
      </div>

      <div className="mt-4 grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-sky-400/15 to-blue-600/15 text-2xl">
        {account.emoji}
      </div>

      <h3 className="mt-4 font-semibold text-white group-hover:text-sky-300">
        {account.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-slate-400">
        {account.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-5">
        <div>
          <p className="text-[11px] text-slate-500">Harga</p>
          <p className="text-lg font-bold text-sky-300">
            Rp {account.price.toLocaleString("id-ID")}
          </p>
        </div>
        <span className="rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-sky-300 transition-colors group-hover:bg-sky-400/20">
          Detail →
        </span>
      </div>
    </Link>
  );
}
