import Navbar from "@/components/Navbar";
import UserList from "@/components/UserList";
import { auth } from "@clerk/nextjs/server";
import { getAllOtherUsers, getUserFromDb } from "./actions/user.actions";
import { UserType } from "@/lib/propTypes";

async function page() {
  const { userId } = await auth();
  const userList = await getAllOtherUsers();
  const user = await getUserFromDb();

  if (!userId) return <p>Sign in to use the application pls.</p>;

  return (
    <div>
      <Navbar />
      <div>
        <h1>{user?.name}</h1>
        {user?.profilePhoto && (
          <img
            src={user?.profilePhoto}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        )}
      </div>
      <ProfileUploader />
      <UserList userList={userList as UserType[]} />
    </div>
  );
}
export default page;

import Image from "next/image";
import ProfileUploader from "@/components/ProfileUploader";
