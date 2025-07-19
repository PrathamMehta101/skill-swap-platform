import Navbar from "@/components/Navbar";
import UserList from "@/components/UserList";
import { auth } from "@clerk/nextjs/server";
import { getAllOtherUsers } from "./actions/user.actions";
import { UserType } from "@/lib/propTypes";

async function page() {
  const { userId } = await auth();
  const userList = await getAllOtherUsers();

  if (!userId) return <p>Sign in to use the application pls.</p>;

  return (
    <div>
      <Navbar />
      <UserList userList={userList as UserType[]} />
    </div>
  );
}
export default page;
