import { NextResponse } from "next/server";
import sharp from "sharp";
import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth/dal";
import { saveImage, useSupabaseStorage } from "@/app/lib/storage";

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

  const original = Buffer.from(await file.arrayBuffer());

  // Konversi ke WebP (lebih ringan & cepat). Jika sudah WebP, biarkan apa adanya.
  let bytes: Buffer = original;
  if (file.type !== "image/webp") {
    try {
      bytes = await sharp(
        original,
        file.type === "image/gif" ? { animated: true } : {},
      )
        .webp({ quality: 82 })
        .toBuffer();
    } catch (err) {
      console.error("Konversi WebP gagal:", err);
      return NextResponse.json(
        { message: "Gagal memproses gambar." },
        { status: 500 },
      );
    }
  }

  let url: string;
  try {
    ({ url } = await saveImage({
      listingId: id,
      bytes,
      ext: "webp",
      contentType: "image/webp",
    }));
  } catch (err) {
    console.error("Upload gambar gagal:", err);
    const keyDetected = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
    const supabaseNames = Object.keys(process.env).filter((k) =>
      k.includes("SUPABASE"),
    );
    const detail = useSupabaseStorage
      ? err instanceof Error
        ? err.message
        : "error tidak diketahui dari Supabase"
      : `[diag v3] Storage tidak aktif. SERVICE_KEY terbaca: ${keyDetected}. Nama env SUPABASE yang terbaca server: [${
          supabaseNames.join(" | ") || "KOSONG — tidak ada satupun"
        }].`;
    return NextResponse.json(
      { message: `Gagal menyimpan gambar: ${detail}` },
      { status: 500 },
    );
  }

  const max = await prisma.listingImage.aggregate({
    where: { listingId: id },
    _max: { sortOrder: true },
  });
  const sortOrder = (max._max.sortOrder ?? -1) + 1;

  const image = await prisma.listingImage.create({
    data: { listingId: id, url, sortOrder },
    select: { id: true, url: true },
  });

  return NextResponse.json({ image }, { status: 201 });
}
