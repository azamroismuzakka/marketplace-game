import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";

export type SessionPayload = {
  userId: string;
  role: string;
};

const COOKIE_NAME = "session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 hari

// Dibaca secara lazy (bukan saat modul di-load) supaya `next build` tidak gagal
// ketika SESSION_SECRET belum tersedia di lingkungan build. Error hanya muncul
// saat fungsi auth benar-benar dipanggil (runtime).
function getEncodedKey(): Uint8Array {
  const secretKey = process.env.SESSION_SECRET;
  if (!secretKey) {
    throw new Error("SESSION_SECRET belum diset di environment (.env).");
  }
  return new TextEncoder().encode(secretKey);
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getEncodedKey());
}

export async function decrypt(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getEncodedKey(), {
      algorithms: ["HS256"],
    });
    if (!payload.userId) return null;
    return { userId: String(payload.userId), role: String(payload.role) };
  } catch {
    return null; // token invalid / kedaluwarsa
  }
}

/** Buat session baru & set cookie httpOnly. */
export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await encrypt(payload);
  const cookieStore = await cookies();

  // `Secure` hanya saat koneksi benar-benar HTTPS. Ini penting agar login
  // tetap jalan ketika diakses dari HP lewat IP LAN over HTTP (browser
  // menolak cookie Secure di koneksi non-HTTPS selain localhost).
  const proto = (await headers()).get("x-forwarded-proto");
  const isHttps = proto === "https";

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

/** Baca & verifikasi session dari cookie. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return decrypt(cookieStore.get(COOKIE_NAME)?.value);
}

/** Hapus cookie session (logout). */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
