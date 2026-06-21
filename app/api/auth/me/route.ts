import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/lib/auth/dal";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}
