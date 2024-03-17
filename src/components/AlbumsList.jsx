/* eslint-disable react/prop-types */
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

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
      <div className="flex items-center justify-between">
        <div>Albums for {user.name}</div>
        <Button onClick={() => addAlbum(user)}>Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
