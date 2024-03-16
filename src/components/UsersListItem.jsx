/* eslint-disable react/prop-types */
import Button from "./Button";
import { deleteUser } from "../store";
import { GoTrashcan } from "react-icons/go";
import { useThunk } from "../hooks/useThunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
function UsersListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  function handleDeleteUser(user) {
    doDeleteUser(user);
  }
  const header = (
    <>
      <Button
        className="mr-3"
        loading={isLoading}
        onClick={() => handleDeleteUser(user)}
      >
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user...</div>}
      {user.name}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user}></AlbumsList>
    </ExpandablePanel>
  );
}

export default UsersListItem;
