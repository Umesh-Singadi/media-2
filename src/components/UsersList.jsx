import { useEffect } from "react";
import { fetchUsers } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "./Skeleton";

function UsersLIst() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.users);
  console.log(data);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton times={5} className="h-10 w-90% m-5"></Skeleton>;
  }
  if (error) {
    return <div>Error..</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded m-5">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });
  return <>{renderedUsers}</>;
}

export default UsersLIst;
