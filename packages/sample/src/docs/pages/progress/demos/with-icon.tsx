import { ProgressIndicator } from "@minerva/lib-core";
import { FiUploadCloud } from "react-icons/fi";

export default function WithIconDemo() {
  return (
    <ProgressIndicator
      type="bar"
      icon={<FiUploadCloud />}
      ariaLabel="Uploading files"
    />
  );
}
