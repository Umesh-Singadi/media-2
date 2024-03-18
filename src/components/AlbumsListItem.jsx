/* eslint-disable react/prop-types */
import ExpandablePanel from "./ExpandablePanel";

function AlbumsListItem({ album }) {
  const header = <div>{album.title}</div>;
  return (
    <ExpandablePanel key={album.id} header={header}>
      <div>{album.title} Album Photos</div>
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
