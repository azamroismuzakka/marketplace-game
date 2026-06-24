import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth/session";

/**
 * Ambil user yang sedang login berdasarkan session cookie.
 * Di-memoize dengan React cache agar tidak query berulang dalam satu render.
 * Hanya mengembalikan kolom aman (tanpa passwordHash).
 */
export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session?.userId) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatarUrl: true,
      isVerified: true,
      createdAt: true,
    },
  });
});

/** Wajib login — redirect ke /login jika tidak ada session. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Wajib admin — redirect jika belum login atau bukan admin. */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/");
  return user;
}

export type CurrentUser = NonNullable<
  Awaited<ReturnType<typeof getCurrentUser>>
>;
