import { UserType } from "@/lib/propTypes";
import UserCard from "./UserCard";

function UserList({ userList }: { userList: UserType[] }) {
  return (
    <div>
      {userList.map((user, index) => {
        console.log("USER", user, "INDEX", index);
        return <UserCard key={index} user={user} />;
      })}
    </div>
  );
}
export default UserList;
