import { z } from "zod";

export const LISTING_STATUSES = [
  "ACTIVE",
  "INACTIVE",
  "SOLD",
  "DRAFT",
  "PENDING_REVIEW",
  "REJECTED",
] as const;

export const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Aktif (tayang)",
  INACTIVE: "Nonaktif",
  SOLD: "Terjual",
  DRAFT: "Draft",
  PENDING_REVIEW: "Menunggu Review",
  REJECTED: "Ditolak",
};

export const listingSchema = z.object({
  gameId: z.string().min(1, "Pilih game"),
  title: z.string().min(3, "Judul minimal 3 karakter").max(120),
  description: z.string().min(10, "Deskripsi minimal 10 karakter").max(2000),
  price: z.number().min(0, "Harga tidak valid").max(1_000_000_000),
  skinCount: z.number().int().min(0).max(100000),
  status: z.enum(LISTING_STATUSES),
  isFeatured: z.boolean(),
});

export type ListingInput = z.infer<typeof listingSchema>;
