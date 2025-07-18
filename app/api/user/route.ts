import { prismaClient } from "@/lib/prismaClient";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { name: true, skillsOffered: true },
    });

    if (!dbUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(dbUser);
  } catch (error) {
    console.log("Error fetching  user", error);
    return NextResponse.json({ message: "Server Error" }, { status: 404 });
  }
}
