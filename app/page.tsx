import AuthInitializer from "@/components/AuthInitializer";
import Navbar from "@/components/Navbar";
import UserList from "@/components/UserList";
import { auth } from "@clerk/nextjs/server";

async function page() {
  const { userId } = await auth();

  if (!userId) return <p>Sign in to use the application pls.</p>;
  return (
    <div>
      <AuthInitializer />
      <Navbar />
      <UserList />
    </div>
  );
}
export default page;
