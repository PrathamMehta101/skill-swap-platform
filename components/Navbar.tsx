"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function Navbar() {
  const name = useSelector((state: RootState) => state.user.name);

  return <div className="bg-emerald-500">Welcome {name}</div>;
}
export default Navbar;
