import { UserType } from "@/lib/propTypes";
import UserCard from "./UserCard";

function UserList({ userList }: { userList: UserType[] }) {
  return (
    <div>
      {userList.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
}
export default UserList;
