"use client";

import { sendSwapRequest } from "@/app/actions/swap.action";
import { UserType } from "@/lib/propTypes";

function UserCard({ user }: { user: UserType }) {
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
