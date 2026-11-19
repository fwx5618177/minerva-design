import { EditIcon, RefreshIcon, TrashIcon } from "minerva-design/icons";
import { IconButton } from "minerva-design";

export default function LabelDemo() {
  return (
    <>
      <IconButton label="Refresh" shape="square">
        <RefreshIcon size="1em" />
      </IconButton>
      <IconButton label="Edit" variant="outline" color="primary">
        <EditIcon size="1em" />
      </IconButton>
      <IconButton label="Delete" variant="solid" color="danger" size="small">
        <TrashIcon size="1em" />
      </IconButton>
    </>
  );
}
