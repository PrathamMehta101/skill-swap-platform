import Navbar from "./Navbar";
import { auth, currentUser } from "@clerk/nextjs/server";

async function Header() {
  return (
    <header className="bg-red-500">
      Header
      <Navbar />
    </header>
  );
}
export default Header;
