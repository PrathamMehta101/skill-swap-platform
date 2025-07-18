"use client";

import { sendSwapRequest } from "@/app/actions/swap.action";

function UserCard({
  user,
}: {
  user: {
    id: string;
    name: string;
    skillsOffered: {
      id: string;
      name: string;
      type: string;
      ownerOfferedId: string | null;
      ownerWantedId: string | null;
    }[];
  };
}) {
  console.log("in usercard component", user);
  console.log("name of the user is ", user.name);
  return (
    <div>
      <h1>WE HAVE, {user.name}</h1>
      {user.skillsOffered.map((skill) => (
        <h2>{skill.name}</h2>
      ))}
      <button onClick={() => sendSwapRequest(user.id)}>Send Request</button>
    </div>
  );
}
export default UserCard;
