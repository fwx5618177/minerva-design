import { IconButton } from "@minerva/lib-core";
import { LuPencil, LuRefreshCw, LuTrash2 } from "react-icons/lu";

export default function LabelDemo() {
  return (
    <>
      <IconButton label="Refresh" shape="square">
        <LuRefreshCw />
      </IconButton>
      <IconButton label="Edit" appearance="outline" variant="primary">
        <LuPencil />
      </IconButton>
      <IconButton
        label="Delete"
        appearance="solid"
        variant="danger"
        size="small"
      >
        <LuTrash2 />
      </IconButton>
    </>
  );
}
