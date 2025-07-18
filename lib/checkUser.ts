import { auth, currentUser } from "@clerk/nextjs/server";
import { prismaClient } from "./prismaClient";

export async function checkUser() {
  const user = await currentUser();
  const { userId } = await auth();

  if (!user || !userId) return;

  const dbUser = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (dbUser) return dbUser;

  const newUser = await prismaClient.user.create({
    data: {
      id: userId,
      name: user.firstName as string,
      email: user.emailAddresses[0].emailAddress,
      profilePhoto: user.imageUrl,
    },
  });

  return newUser;
}
