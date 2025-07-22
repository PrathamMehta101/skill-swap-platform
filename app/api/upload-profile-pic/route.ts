import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prismaClient } from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { imageUrl } = await req.json();

  await prismaClient.user.update({
    where: { id: userId },
    data: { profilePhoto: imageUrl },
  });

  return NextResponse.json({ success: true });
}
