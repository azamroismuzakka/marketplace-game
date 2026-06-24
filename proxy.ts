import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Optimistic auth check: hanya membaca & memverifikasi cookie (tanpa query DB).
// Pertahanan utama tetap di server (requireUser / DAL pada masing-masing halaman).

const PROTECTED = ["/dashboard", "/admin"];
const AUTH_PAGES = ["/login"];

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

async function hasValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return Boolean(payload.userId);
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED.some(
    (r) => path === r || path.startsWith(`${r}/`),
  );
  const isAuthPage = AUTH_PAGES.includes(path);

  if (!isProtected && !isAuthPage) return NextResponse.next();

  const loggedIn = await hasValidSession(
    request.cookies.get("session")?.value,
  );

  // Belum login tapi akses halaman terproteksi → ke /login.
  if (isProtected && !loggedIn) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Sudah login tapi buka /login → ke panel admin.
  if (isAuthPage && loggedIn) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan di semua rute kecuali aset & API.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
