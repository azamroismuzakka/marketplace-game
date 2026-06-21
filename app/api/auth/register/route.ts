import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/auth/password";
import { createSession } from "@/app/lib/auth/session";
import { fieldErrors, registerSchema } from "@/app/lib/validations/auth";

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

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Periksa kembali data kamu.", errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const name = parsed.data.name.trim();
  const email = parsed.data.email.trim().toLowerCase();
  const { password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { message: "Email sudah terdaftar.", errors: { email: "Email sudah terdaftar." } },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, name: true, email: true, role: true, avatarUrl: true, isVerified: true },
  });

  await createSession({ userId: user.id, role: user.role });

  return NextResponse.json({ user }, { status: 201 });
}
