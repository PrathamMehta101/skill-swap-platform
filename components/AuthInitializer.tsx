"use client";

import { setName, setSkillsOffered, setUser } from "@/store/slices/userSlice";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AuthInitializer() {
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user");
        dispatch(setName(response.data.name));
        dispatch(setSkillsOffered(response.data.skillsOffered));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  });
  return null;
}
export default AuthInitializer;
