import { useEffect } from "react";
import { fetchUsers, addUser } from "../store";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import UsersListItem from "./UsersListItem";

function UsersLIst() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, CreatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  function handleUserAdd() {
    doCreateUser();
  }

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={5} className="h-10 w-90% m-5"></Skeleton>;
  } else if (loadingUsersError) {
    content = <div>Error..</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          Add User...
        </Button>
        {CreatingUserError && "Error creating user..."}
      </div>
      {content}
    </div>
  );
}

export default UsersLIst;
