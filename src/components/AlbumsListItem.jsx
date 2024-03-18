/* eslint-disable react/prop-types */
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";
function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  function handleClick() {
    removeAlbum(album);
  }
  const header = (
    <div className="flex items-center">
      <Button
        className="mr-3 hover:bg-red-500 rounded-full p-4"
        onClick={handleClick}
        loading={results.isLoading}
      >
        <GoTrashcan />
      </Button>
      <div>{album.title}</div>
    </div>
  );
  return (
    <ExpandablePanel header={header}>
      <PhotosList album={album}></PhotosList>
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
