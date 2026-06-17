import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
                    >
                        <Logo />
                        ClevatesMarket
                    </Link>

                    <div className="flex gap-1 bg-slate-900/50 rounded-full p-1 backdrop-blur">
                        <Link
                            href="/catalog"
                            className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 transition-all duration-300"
                        >
                            Katalog
                        </Link>
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 transition-all duration-300"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/admin"
                            className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 transition-all duration-300"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
