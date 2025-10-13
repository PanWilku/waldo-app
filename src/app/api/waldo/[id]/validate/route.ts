// app/api/waldo/[id]/route.ts
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; // dynamic segment from URL
  const body = await request.json(); // { x, y, ...dimensions }

  console.log("Waldo check:", { id, body });

  //logic here

  const found = { x: body.x, y: body.y };

  return NextResponse.json({ found });
}
