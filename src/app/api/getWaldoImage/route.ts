import { NextResponse } from "next/server";
import { PrismaClient } from "@db/generated/client/index.js";

const prisma = new PrismaClient();

export async function GET() {
  const images = await prisma.waldoImage.findMany();
  return NextResponse.json({ images });
}
