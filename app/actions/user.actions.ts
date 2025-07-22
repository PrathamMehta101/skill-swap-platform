"use server";

import { prismaClient } from "@/lib/prismaClient";
import { userConfigurationSchema } from "@/lib/schemas/userConfigurationSchema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(data: unknown) {
  const { userId } = await auth();

  if (!userId) return;

  const parsed = userConfigurationSchema.safeParse(data);

  if (!parsed.success) {
    console.log(parsed.error.format());
    return { error: "Validation failed" };
  }

  const { name, availability, skillsOffered } = parsed.data;

  const cleanedSkills = skillsOffered.map((skill) => {
    return skill.value.trim();
  });

  console.log("Deleting existing skills");
  await prismaClient.skill.deleteMany({
    where: { ownerOfferedId: userId, type: "OFFERED" },
  });

  console.log("Adding new skills");
  await prismaClient.user.update({
    where: { id: userId },
    data: {
      name,
      availability,

      skillsOffered: {
        create: cleanedSkills.map((skill) => ({
          name: skill,
          type: "OFFERED",
        })),
      },

      profileConfigured: true,
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function getAllOtherUsers() {
  const { userId } = await auth();
  if (!userId) return;

  const users = await prismaClient.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    select: {
      id: true,
      name: true,
      skillsOffered: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return users;
}

export async function getUserSkills() {
  const { userId } = await auth();
  if (!userId) return;

  const skills = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      skillsOffered: {
        select: {
          name: true,
        },
      },
    },
  });

  return skills?.skillsOffered.map((skill) => skill.name);
}

export async function getUserDetails() {
  const { userId } = await auth();
  if (!userId) return;

  const details = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      availability: true,
      skillsOffered: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return details;
}

export async function getUserFromDb() {
  const { userId } = await auth();
  if (!userId) return;

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      profilePhoto: true,
    },
  });

  return user;
}
