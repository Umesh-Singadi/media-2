import { useEffect } from "react";
import { fetchUsers, addUser, deleteUser } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useState } from "react";

function UsersLIst() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUserError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCratingUserError] = useState(null);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => setLoadingUsersError(err))
      .finally(() => setIsLoadingUsers(false));
  }, [dispatch]);

  function handleUserAdd() {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((err) => setCratingUserError(err))
      .finally(() => setIsCreatingUser(false));
  }

  function handleDeleteClick(id) {
    dispatch(deleteUser(id));
  }
  if (isLoadingUsers) {
    return <Skeleton times={5} className="h-10 w-90% m-5"></Skeleton>;
  }
  if (loadingUserError) {
    return <div>Error..</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded m-5">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
          <Button onClick={() => handleDeleteClick(user.id)}>Delete</Button>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleUserAdd}>
          {isCreatingUser ? "Crating user..." : " + Add User"}
        </Button>
        {creatingUserError && "Error creating user..."}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersLIst;
