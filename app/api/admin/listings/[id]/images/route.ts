import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth/dal";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Belum login." }, { status: 401 });
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json({ message: "Akses ditolak." }, { status: 403 });
  }

  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!listing) {
    return NextResponse.json(
      { message: "Listing tidak ditemukan." },
      { status: 404 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "File tidak ada." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: "Format harus gambar (PNG/JPG/WEBP/GIF)." },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { message: "Ukuran maksimal 5MB." },
      { status: 413 },
    );
  }

  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const filename = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), bytes);

  const max = await prisma.listingImage.aggregate({
    where: { listingId: id },
    _max: { sortOrder: true },
  });
  const sortOrder = (max._max.sortOrder ?? -1) + 1;

  const image = await prisma.listingImage.create({
    data: { listingId: id, url: `/uploads/${filename}`, sortOrder },
    select: { id: true, url: true },
  });

  return NextResponse.json({ image }, { status: 201 });
}
