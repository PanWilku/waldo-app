import { NextResponse } from "next/server";
import { PrismaClient } from "@db/prisma/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const images = await prisma.waldoImage.findMany();
  return NextResponse.json(images);
}
