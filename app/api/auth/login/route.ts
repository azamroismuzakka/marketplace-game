import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyPassword } from "@/app/lib/auth/password";
import { createSession } from "@/app/lib/auth/session";
import { fieldErrors, loginSchema } from "@/app/lib/validations/auth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Body request tidak valid." },
      { status: 400 },
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Periksa kembali data kamu.", errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  const { password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  // Pesan sengaja generik agar tidak membocorkan email mana yang terdaftar.
  const invalid = NextResponse.json(
    { message: "Email atau password salah." },
    { status: 401 },
  );

  if (!user) return invalid;

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return invalid;

  await createSession({ userId: user.id, role: user.role });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      isVerified: user.isVerified,
    },
  });
}
