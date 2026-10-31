import { Button } from "minerva-design";
import {
  DownloadIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from "minerva-design/icons";

export default function BasicDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <HomeIcon />
      <SearchIcon />
      <SettingsIcon />
      <Button startIcon={<DownloadIcon size={16} />}>Download</Button>
      <Button
        color="danger"
        variant="outline"
        startIcon={<TrashIcon size={16} />}
      >
        Delete
      </Button>
    </div>
  );
}
