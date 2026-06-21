import "server-only";
import { prisma } from "./prisma";

/** Bentuk data yang dipakai kartu akun & detail (sudah diserialisasi/aman untuk UI). */
export type ListingCard = {
  id: string;
  game: string;
  title: string;
  description: string;
  rank: string;
  skins: number;
  price: number;
  status: "Ready" | "Nego";
  emoji: string;
};

type RawListing = {
  id: string;
  title: string;
  description: string;
  price: { toString(): string };
  rank: string | null;
  skinCount: number;
  iconEmoji: string | null;
  game: { name: string };
};

function toCard(listing: RawListing): ListingCard {
  return {
    id: listing.id,
    game: listing.game.name,
    title: listing.title,
    description: listing.description,
    rank: listing.rank ?? "—",
    skins: listing.skinCount,
    price: Number(listing.price),
    status: "Ready",
    emoji: listing.iconEmoji ?? "🎮",
  };
}

const cardInclude = { game: { select: { name: true } } } as const;

/** Listing aktif untuk katalog/beranda, opsional difilter per game (slug). */
export async function getActiveListings(opts?: {
  gameSlug?: string;
  take?: number;
}): Promise<ListingCard[]> {
  const listings = await prisma.listing.findMany({
    where: {
      status: "ACTIVE",
      ...(opts?.gameSlug ? { game: { slug: opts.gameSlug } } : {}),
    },
    include: cardInclude,
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: opts?.take,
  });
  return listings.map(toCard);
}

export type ListingDetail = ListingCard & {
  gameId: string;
  images: string[];
};

/** Detail satu listing aktif (null jika tidak ada). */
export async function getListingDetail(
  id: string,
): Promise<ListingDetail | null> {
  const listing = await prisma.listing.findFirst({
    where: { id, status: "ACTIVE" },
    include: {
      game: { select: { name: true, id: true } },
      images: { orderBy: { sortOrder: "asc" }, select: { url: true } },
    },
  });
  if (!listing) return null;
  return {
    ...toCard(listing),
    gameId: listing.game.id,
    images: listing.images.map((img) => img.url),
  };
}

/** ADMIN: semua listing (apa pun statusnya) + jumlah gambar. */
export async function getAdminListings() {
  const listings = await prisma.listing.findMany({
    include: {
      game: { select: { name: true } },
      _count: { select: { images: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return listings.map((l) => ({
    id: l.id,
    title: l.title,
    game: l.game.name,
    status: l.status,
    price: Number(l.price),
    imageCount: l._count.images,
    emoji: l.iconEmoji ?? "🎮",
  }));
}

/** ADMIN: satu listing + daftar gambar (dengan id, untuk dikelola). */
export async function getAdminListing(id: string) {
  const l = await prisma.listing.findUnique({
    where: { id },
    include: {
      game: { select: { name: true } },
      images: { orderBy: { sortOrder: "asc" }, select: { id: true, url: true } },
    },
  });
  if (!l) return null;
  return {
    id: l.id,
    title: l.title,
    game: l.game.name,
    status: l.status,
    price: Number(l.price),
    emoji: l.iconEmoji ?? "🎮",
    images: l.images,
  };
}

/** Listing lain dari game yang sama (untuk rekomendasi). */
export async function getRelatedListings(
  gameId: string,
  excludeId: string,
  take = 3,
): Promise<ListingCard[]> {
  const listings = await prisma.listing.findMany({
    where: { status: "ACTIVE", gameId, id: { not: excludeId } },
    include: cardInclude,
    take,
  });
  return listings.map(toCard);
}
