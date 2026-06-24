import { NextResponse } from "next/server";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/app/lib/prisma";
import { getAdminOrResponse } from "@/app/lib/auth/admin-api";
import { fieldErrors } from "@/app/lib/validations/auth";
import { listingSchema } from "@/app/lib/validations/listing";

// PATCH /api/admin/listings/[id] — update listing
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { user, response } = await getAdminOrResponse();
  if (!user) return response;

  const { id } = await params;
  const existing = await prisma.listing.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!existing) {
    return NextResponse.json(
      { message: "Listing tidak ditemukan." },
      { status: 404 },
    );
  }

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

  await prisma.listing.update({
    where: { id },
    data: {
      gameId: d.gameId,
      title: d.title.trim(),
      description: d.description.trim(),
      price: d.price,
      rank: d.rank?.trim() || null,
      skinCount: d.skinCount,
      winRate: d.winRate ?? null,
      iconEmoji: d.iconEmoji?.trim() || null,
      status: d.status,
      isFeatured: d.isFeatured,
    },
  });

  return NextResponse.json({ id });
}

// DELETE /api/admin/listings/[id] — hapus listing + file gambar lokalnya
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { user, response } = await getAdminOrResponse();
  if (!user) return response;

  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { images: { select: { url: true } } },
  });
  if (!listing) {
    return NextResponse.json(
      { message: "Listing tidak ditemukan." },
      { status: 404 },
    );
  }

  // Hapus file gambar lokal (yang di /uploads).
  for (const img of listing.images) {
    if (img.url.startsWith("/uploads/")) {
      try {
        await unlink(path.join(process.cwd(), "public", img.url));
      } catch {
        // abaikan jika file sudah tidak ada
      }
    }
  }

  try {
    await prisma.listing.delete({ where: { id } });
  } catch {
    return NextResponse.json(
      {
        message:
          "Tidak bisa dihapus — kemungkinan masih terkait transaksi/ulasan.",
      },
      { status: 409 },
    );
  }

  return NextResponse.json({ success: true });
}
