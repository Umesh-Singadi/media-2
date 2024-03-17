/* eslint-disable react/prop-types */
import { useFetchAlbumsQuery } from "../store";
import ExpandablePanel from "./ExpandablePanel";

import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  let content;
  if (isLoading) {
    content = <Skeleton times={5} />;
  } else if (error) {
    content = <div>Error loading album...</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          <div>{album.title} Album Photos</div>
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div>
        <div>Albums for {user.name}</div>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
