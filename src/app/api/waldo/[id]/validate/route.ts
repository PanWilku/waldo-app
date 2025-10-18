// app/api/waldo/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@db/prisma/generated/prisma";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const { x, y, width, height } = body;
  const { id } = await params;

  console.log("Waldo check:", { id, x, y, width, height });

  const waldoImageRecord = await prisma.waldoImage.findUnique({
    where: { id: Number(id) },
    select: { waldoSpots: true },
  });

  // Handle case where image is not found
  if (!waldoImageRecord) {
    return NextResponse.json(
      {
        found: false,
        error: "Waldo image not found",
      },
      { status: 404 }
    );
  }

  const waldoSpots = waldoImageRecord.waldoSpots as Record<
    string,
    {
      x: [number, number];
      y: [number, number];
    }
  >;
  console.log("Waldo spots from DB:", waldoSpots);

  // Check if (x, y) is within any of the waldoSpots
  for (const [spotKey, spot] of Object.entries(waldoSpots)) {
    console.log(`Checking spot ${spotKey}:`, spot);

    // Additional null check for the spot
    if (!spot || !spot.x || !spot.y) continue;

    if (x >= spot.x[0] && x <= spot.x[1] && y >= spot.y[0] && y <= spot.y[1]) {
      const found = { message: `You found Waldo!`, score: 1 };
      console.log(found);
      return NextResponse.json({ found });
    }
  }

  // If no spots match, Waldo was not found
  return NextResponse.json({ found: false });
}
