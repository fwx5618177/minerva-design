import { ProgressIndicator } from "@minerva/lib-core";
import { FiUploadCloud } from "react-icons/fi";

export default function WithIconDemo() {
  return (
    <ProgressIndicator
      variant="bar"
      icon={<FiUploadCloud />}
      aria-label="Uploading files"
    />
  );
}
