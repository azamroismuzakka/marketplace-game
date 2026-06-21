import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Admin pemilik/pengelola listing (tidak ada role seller — listing dikelola admin)
  const passwordHash = await bcrypt.hash("admin1234", 10);
  const owner = await prisma.user.upsert({
    where: { email: "admin@athenamarket.id" },
    update: {},
    create: {
      email: "admin@athenamarket.id",
      name: "Athena Admin",
      passwordHash,
      role: "ADMIN",
      isVerified: true,
    },
  });

  // 2. Games
  const mlg = await prisma.game.upsert({
    where: { slug: "mobile-legends" },
    update: {},
    create: { name: "Mobile Legends", slug: "mobile-legends" },
  });
  const ff = await prisma.game.upsert({
    where: { slug: "free-fire" },
    update: {},
    create: { name: "Free Fire", slug: "free-fire" },
  });

  // 3. Listings (id stabil agar URL /account/<id> konsisten)
  const listings = [
    {
      id: "ml-001",
      gameId: mlg.id,
      title: "Sultan Account — Mythic Glory",
      description:
        "All hero unlocked, 320+ skin termasuk Collector & Legend. Akun sultan siap pakai.",
      price: 2500000,
      rank: "Mythical Glory",
      skinCount: 327,
      winRate: 68,
      iconEmoji: "⚔️",
      isFeatured: true,
    },
    {
      id: "ff-001",
      gameId: ff.id,
      title: "Akun Pro — Grandmaster",
      description:
        "Bundle langka, pet maxed, banyak gun skin permanen. Cocok untuk yang serius.",
      price: 1750000,
      rank: "Grandmaster",
      skinCount: 154,
      winRate: 61,
      iconEmoji: "🔥",
      isFeatured: true,
    },
    {
      id: "ml-002",
      gameId: mlg.id,
      title: "Akun Tank Main — Mythic",
      description:
        "Win rate 68%, emblem maxed, cocok untuk push rank dengan role tank.",
      price: 850000,
      rank: "Mythic ⭐50",
      skinCount: 88,
      winRate: 68,
      iconEmoji: "🛡️",
      isFeatured: false,
    },
    {
      id: "ff-002",
      gameId: ff.id,
      title: "Akun Collector — Heroic",
      description:
        "Elite pass lengkap sejak season awal, banyak emote langka & bundle eksklusif.",
      price: 620000,
      rank: "Heroic",
      skinCount: 96,
      winRate: 55,
      iconEmoji: "🎯",
      isFeatured: false,
    },
    {
      id: "ml-003",
      gameId: mlg.id,
      title: "Akun Assassin — Legend",
      description:
        "Fokus hero assassin, banyak skin epic, akun bersih tanpa riwayat banned.",
      price: 430000,
      rank: "Legend III",
      skinCount: 52,
      winRate: 59,
      iconEmoji: "🗡️",
      isFeatured: false,
    },
    {
      id: "ff-003",
      gameId: ff.id,
      title: "Akun Starter — Platinum",
      description:
        "Harga ramah pemula, sudah ada beberapa bundle dan karakter terbuka.",
      price: 180000,
      rank: "Platinum I",
      skinCount: 24,
      winRate: 48,
      iconEmoji: "🎮",
      isFeatured: false,
    },
  ];

  // Screenshot contoh (placeholder berlabel spesifikasi). Di produksi diganti
  // hasil upload penjual/admin. Pakai placehold.co agar terlihat seperti screenshot.
  const screenshotsFor = (l: (typeof listings)[number]) => {
    const enc = (t: string) => encodeURIComponent(t);
    const base = "https://placehold.co/1280x720/0b1220";
    return [
      { url: `${base}/38bdf8/png?text=${enc(l.title)}`, sortOrder: 0 },
      { url: `${base}/7dd3fc/png?text=${enc("Rank: " + l.rank)}`, sortOrder: 1 },
      { url: `${base}/60a5fa/png?text=${enc(l.skinCount + " Skin")}`, sortOrder: 2 },
      { url: `${base}/93c5fd/png?text=${enc("Win Rate " + l.winRate + "%")}`, sortOrder: 3 },
    ];
  };

  for (const data of listings) {
    const images = screenshotsFor(data);
    await prisma.listing.upsert({
      where: { id: data.id },
      update: {
        ...data,
        sellerId: owner.id,
        status: "ACTIVE",
        images: { deleteMany: {}, create: images },
      },
      create: {
        ...data,
        sellerId: owner.id,
        status: "ACTIVE",
        images: { create: images },
      },
    });
  }

  console.log(
    `Seed selesai: 1 admin, 2 game, ${listings.length} listing aktif (dengan screenshot).`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
