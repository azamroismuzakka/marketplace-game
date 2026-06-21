import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// Prisma 7 mewajibkan driver adapter. Runtime memakai koneksi pooled
// (DATABASE_URL / pgbouncer) — cocok untuk environment serverless.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Singleton agar tidak membuat banyak instance saat hot-reload di dev.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
