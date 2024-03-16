import { useEffect } from "react";
import { fetchUsers } from "../store";
import { useDispatch, useSelector } from "react-redux";

function UsersLIst() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error..</div>;
  }

  if (data) {
    return <div>{data.length}</div>;
  }
}

export default UsersLIst;
