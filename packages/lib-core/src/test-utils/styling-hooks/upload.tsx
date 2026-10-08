import { fireEvent } from "@testing-library/react";
import { Upload } from "../../components/Upload";
import type { HookScenario } from "./types";

const files = [
  { id: "1", name: "a.txt", status: "done" as const },
  { id: "2", name: "b.txt", status: "error" as const, error: "Failed" },
  { id: "3", name: "c.txt", status: "uploading" as const },
];

export default [
  {
    name: "files, dragging",
    element: (
      <Upload
        label="Files"
        value={files}
        multiple
        onFilesSelected={() => {}}
        onRemove={() => {}}
        onRetry={() => {}}
      />
    ),
    setup: ({ container }) => {
      fireEvent.dragOver(container.querySelector('[data-part="dropzone"]')!);
    },
  },
  {
    name: "disabled, loading",
    element: (
      <Upload
        label="Files"
        value={[]}
        onFilesSelected={() => {}}
        disabled
        loading
      />
    ),
  },
] satisfies HookScenario[];
