import { IconButton } from "minerva-design";
import { LuPencil, LuRefreshCw, LuTrash2 } from "react-icons/lu";

export default function LabelDemo() {
  return (
    <>
      <IconButton label="Refresh" shape="square">
        <LuRefreshCw />
      </IconButton>
      <IconButton label="Edit" variant="outline" color="primary">
        <LuPencil />
      </IconButton>
      <IconButton label="Delete" variant="solid" color="danger" size="small">
        <LuTrash2 />
      </IconButton>
    </>
  );
}
