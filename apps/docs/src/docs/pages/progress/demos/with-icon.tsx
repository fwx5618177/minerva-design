import { CloudUploadIcon } from "minerva-design/icons";
import { ProgressIndicator } from "minerva-design";

export default function WithIconDemo() {
  return (
    <ProgressIndicator
      variant="bar"
      icon={<CloudUploadIcon size="1em" />}
      aria-label="Uploading files"
    />
  );
}
