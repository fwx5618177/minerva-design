import { useEffect, useRef, useState } from "react";
import { Upload, type UploadItem } from "minerva-design/native";
export default function Basic() {
  const resources = useRef(new Set<string>());
  useEffect(() => {
    const issued = resources.current;
    return () => {
      for (const uri of issued) URL.revokeObjectURL(uri);
    };
  }, []);
  const [files, setFiles] = useState<UploadItem[]>([]);
  return (
    <Upload
      label="Documents"
      value={files}
      multiple
      pickFiles={(options) =>
        pickBrowserFiles(options, (uri) => resources.current.add(uri))
      }
      onFilesSelected={(items) =>
        setFiles((current) => [
          ...current,
          ...items.map((file) => ({
            id: file.uri,
            name: file.name,
            status: "done" as const,
          })),
        ])
      }
      onRemove={(item) => {
        URL.revokeObjectURL(item.id);
        resources.current.delete(item.id);
        setFiles((current) => current.filter((file) => file.id !== item.id));
      }}
      labels={{ done: "Selected" }}
    />
  );
}
// Browser documentation host; the Expo example supplies expo-document-picker on iOS/Android.
function pickBrowserFiles(
  {
    accept,
    multiple,
  }: {
    accept: string;
    multiple: boolean;
  },
  recordUri: (uri: string) => void,
) {
  return new Promise<import("minerva-design/native").NativeUploadFile[] | null>(
    (resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept === "*" ? "" : accept;
      input.multiple = multiple;
      input.oncancel = () => resolve(null);
      input.onchange = () =>
        resolve(
          Array.from(input.files ?? []).map((file) => {
            const uri = URL.createObjectURL(file);
            recordUri(uri);
            return {
              name: file.name,
              uri,
              size: file.size,
              mimeType: file.type,
            };
          }),
        );
      input.click();
    },
  );
}
