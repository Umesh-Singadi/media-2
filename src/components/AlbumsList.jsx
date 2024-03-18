/* eslint-disable react/prop-types */
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import AlbumsListItem from "./AlbumsListItem";
function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  let content;
  if (isFetching) {
    content = <Skeleton times={5} />;
  } else if (error) {
    content = <div>Error loading album...</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album}></AlbumsListItem>;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>Albums for {user.name}</div>
        <Button loading={results.isFetching} onClick={() => addAlbum(user)}>
          Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
