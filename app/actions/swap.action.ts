"use server";

import { prismaClient } from "@/lib/prismaClient";
import { auth } from "@clerk/nextjs/server";

export async function sendSwapRequest(receiverId: string) {
  const { userId: senderId } = await auth();
  if (!senderId) return;

  const existing = await prismaClient.swap.findFirst({
    where: { senderId, receiverId, status: "PENDING" },
  });

  if (existing) {
    return { status: "already_sent" };
  }

  await prismaClient.swap.create({
    data: {
      senderId,
      receiverId,
    },
  });

  return { status: "success" };
}

export async function getReceivedSwapRequests() {
  const { userId } = await auth();
  if (!userId) return;

  const swapsReceived = await prismaClient.swap.findMany({
    where: {
      receiverId: userId,
      status: "PENDING",
    },
    include: {
      sender: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return swapsReceived;
}

export async function getSentSwapRequests() {
  const { userId } = await auth();
  if (!userId) return;

  const swapsSent = await prismaClient.swap.findMany({
    where: {
      senderId: userId,
      status: "PENDING",
    },
    include: {
      receiver: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return swapsSent;
}
