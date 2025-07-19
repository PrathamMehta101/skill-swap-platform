"use server";

import { prismaClient } from "@/lib/prismaClient";
import { SwapType } from "@/lib/propTypes";
import { auth } from "@clerk/nextjs/server";
import { email, string } from "zod";

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
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return swapsSent;
}

export async function acceptSwapRequest(swapId: string) {
  const { userId } = await auth();
  if (!userId) return;

  const swap = await prismaClient.swap.findUnique({
    where: { id: swapId },
  });

  if (!swap?.id || swap.receiverId !== userId) return;

  await prismaClient.swap.update({
    where: { id: swapId },
    data: {
      status: "ACCEPTED",
    },
  });

  return { status: "accepted" };
}

export async function rejectSwapRequest(swapId: string) {
  const { userId } = await auth();
  if (!userId) return;

  const swap = await prismaClient.swap.findUnique({
    where: { id: swapId },
  });

  if (!swap || swap.receiverId !== userId) return;

  await prismaClient.swap.update({
    where: { id: swapId },
    data: { status: "REJECTED" },
  });

  return { status: "rejected" };
}
