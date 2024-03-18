/* eslint-disable react/prop-types */
import {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();
  const [removePhoto] = useRemovePhotoMutation();
  function handleAddPhoto() {
    addPhoto(album);
  }
  let content;
  if (isFetching) {
    content = <Skeleton times={5} className="h-10 w-90%"></Skeleton>;
  } else if (error) {
    content = <div>Error fetching photos</div>;
  } else {
    content = data.map((photo) => {
      return (
        <div key={photo.id} className="flex mb-2 border p-2 m-2 rounded">
          <Button onClick={() => removePhoto(photo)} className="mr-3">
            Delete
          </Button>
          <div>{photo.title}</div>
        </div>
      );
    });
  }
  return (
    <div>
      <div className="flex justify-between">
        <div>{album.title} Album Photos</div>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          Add Photo
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default PhotosList;
