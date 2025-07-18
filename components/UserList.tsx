import { getAllUsers } from "@/app/actions/user.actions";
import UserCard from "./UserCard";

async function UserList() {
  console.log("🟢 Inside userlist");
  const users = await getAllUsers();

  return (
    <div>
      {users.map((user, index) => {
        console.log("USER", user, "INDEX", index);
        return <UserCard key={index} user={user} />;
      })}
    </div>
  );
}
export default UserList;
