import "server-only";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Pakai SUPABASE_URL (variabel server biasa, dibaca saat runtime) lebih dulu.
// NEXT_PUBLIC_SUPABASE_URL ditanam saat build dan bisa jadi `undefined` bila
// ditandai "Sensitive" di Vercel — makanya jangan diandalkan di server.
// Fallback terakhir: URL proyek (ini URL publik, aman ditaruh di kode) supaya
// Storage tetap aktif walau env URL belum diset di Vercel.
const SUPABASE_URL =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://nizbqtevmjqgiekazckx.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "listings";

/** True jika Supabase Storage siap dipakai (punya URL + service role key). */
export const useSupabaseStorage = Boolean(SUPABASE_URL && SERVICE_KEY);

let client: SupabaseClient | null = null;
function getClient(): SupabaseClient {
  if (!client) {
    client = createClient(SUPABASE_URL as string, SERVICE_KEY as string, {
      auth: { persistSession: false },
    });
  }
  return client;
}

let bucketReady = false;
async function ensureBucket(supabase: SupabaseClient) {
  if (bucketReady) return;
  // Buat bucket publik bila belum ada (abaikan error "sudah ada").
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});
  // Pastikan publik walau bucket sudah ada sebelumnya (mis. dibuat private).
  // Tanpa ini, getPublicUrl menghasilkan URL yang tidak bisa diakses (broken).
  await supabase.storage.updateBucket(BUCKET, { public: true }).catch(() => {});
  bucketReady = true;
}

export type UploadResult = { url: string };

/** Simpan gambar — ke Supabase Storage jika dikonfigurasi, jika tidak ke /public/uploads. */
export async function saveImage(opts: {
  listingId: string;
  bytes: Buffer;
  ext: string;
  contentType: string;
}): Promise<UploadResult> {
  const filename = `${randomUUID()}.${opts.ext}`;

  if (useSupabaseStorage) {
    const supabase = getClient();
    await ensureBucket(supabase);
    const objectPath = `${opts.listingId}/${filename}`;
    // Bungkus buffer sebagai Blob agar data biner TIDAK pernah lewat jalur teks.
    // Di sebagian runtime (mis. Node/undici di Vercel), Buffer mentah bisa
    // ter-encode sebagai UTF-8 saat upload — header RIFF/WebP (byte ASCII) selamat
    // tapi payload (byte ≥0x80) membengkak & rusak, hasilnya file WebP korup
    // yang gagal di-render (tampil sebagai gambar hitam/rusak).
    const body = new Blob([new Uint8Array(opts.bytes)], {
      type: opts.contentType,
    });
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(objectPath, body, {
        contentType: opts.contentType,
        upsert: false,
      });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
    return { url: data.publicUrl };
  }

  // Fallback lokal (dev / self-host).
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), opts.bytes);
  return { url: `/uploads/${filename}` };
}

/** Hapus gambar berdasarkan URL (Supabase atau lokal). */
export async function deleteImage(url: string): Promise<void> {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);

  if (idx !== -1 && useSupabaseStorage) {
    const objectPath = url.slice(idx + marker.length);
    await getClient().storage.from(BUCKET).remove([objectPath]);
    return;
  }

  if (url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", url));
    } catch {
      // file mungkin sudah tidak ada — abaikan
    }
  }
}
