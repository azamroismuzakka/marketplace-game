import "server-only";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/lib/auth/dal";

/**
 * Guard untuk Route Handler admin. Kembalikan { user } jika admin, atau
 * { response } berisi 401/403 untuk langsung dikembalikan.
 */
export async function getAdminOrResponse() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null as null,
      response: NextResponse.json({ message: "Belum login." }, { status: 401 }),
    };
  }
  if (user.role !== "ADMIN") {
    return {
      user: null as null,
      response: NextResponse.json({ message: "Akses ditolak." }, { status: 403 }),
    };
  }
  return { user, response: null };
}
