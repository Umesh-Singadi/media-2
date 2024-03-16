/* eslint-disable react/prop-types */
import Button from "./Button";
import { deleteUser } from "../store";
import { GoTrashcan } from "react-icons/go";
import { useThunk } from "../hooks/useThunk";

function UsersListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  function handleDeleteUser(user) {
    doDeleteUser(user);
  }
  return (
    <div className="mb-2 border rounded m-5">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <Button
            className="mr-3"
            loading={isLoading}
            onClick={() => handleDeleteUser(user)}
          >
            <GoTrashcan />
          </Button>
          {error && <div>Error deleting user...</div>}
          {user.name}
        </div>
      </div>
    </div>
  );
}

export default UsersListItem;
