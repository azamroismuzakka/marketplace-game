import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth/dal";
import { deleteImage } from "@/app/lib/storage";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Belum login." }, { status: 401 });
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json({ message: "Akses ditolak." }, { status: 403 });
  }

  const { id, imageId } = await params;
  const image = await prisma.listingImage.findFirst({
    where: { id: imageId, listingId: id },
  });
  if (!image) {
    return NextResponse.json(
      { message: "Gambar tidak ditemukan." },
      { status: 404 },
    );
  }

  await deleteImage(image.url);
  await prisma.listingImage.delete({ where: { id: imageId } });
  return NextResponse.json({ success: true });
}
