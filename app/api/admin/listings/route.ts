import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getAdminOrResponse } from "@/app/lib/auth/admin-api";
import { fieldErrors } from "@/app/lib/validations/auth";
import { listingSchema } from "@/app/lib/validations/listing";

// POST /api/admin/listings — buat listing baru
export async function POST(request: Request) {
  const { user, response } = await getAdminOrResponse();
  if (!user) return response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Body tidak valid." }, { status: 400 });
  }

  const parsed = listingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Periksa kembali data.", errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }
  const d = parsed.data;

  const game = await prisma.game.findUnique({
    where: { id: d.gameId },
    select: { id: true },
  });
  if (!game) {
    return NextResponse.json(
      { message: "Game tidak valid.", errors: { gameId: "Game tidak ditemukan." } },
      { status: 422 },
    );
  }

  const listing = await prisma.listing.create({
    data: {
      sellerId: user.id,
      gameId: d.gameId,
      title: d.title.trim(),
      description: d.description.trim(),
      price: d.price,
      skinCount: d.skinCount,
      status: d.status,
      isFeatured: d.isFeatured,
    },
    select: { id: true },
  });

  return NextResponse.json({ id: listing.id }, { status: 201 });
}
