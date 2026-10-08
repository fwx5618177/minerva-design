import { h } from "vue";
import { Upload } from "../../components/Upload";
import type { UploadItem } from "../../components/Upload";
import type { HookScenario } from "./types";

const files: UploadItem[] = [
  { id: "1", name: "a.txt", status: "done" },
  { id: "2", name: "b.txt", status: "error", error: "Failed" },
  { id: "3", name: "c.txt", status: "uploading" },
];

export default [
  {
    name: "files, dragging",
    render: () =>
      h(Upload, {
        label: "Files",
        modelValue: files,
        multiple: true,
        onFilesSelected: () => {},
        onRemove: () => {},
        onRetry: () => {},
      }),
    setup: ({ container }) => {
      container
        .querySelector('[data-part="dropzone"]')!
        .dispatchEvent(new Event("dragover", { bubbles: true }));
    },
  },
  {
    name: "disabled, loading",
    render: () =>
      h(Upload, {
        label: "Files",
        modelValue: [],
        onFilesSelected: () => {},
        disabled: true,
        loading: true,
      }),
  },
  {
    name: "selection error",
    render: () => h(Upload, { label: "Files", accept: ".pdf" }),
    setup: ({ container }) => {
      const drop = new Event("drop", { bubbles: true });
      Object.defineProperty(drop, "dataTransfer", {
        value: { files: [new File(["x"], "a.txt", { type: "text/plain" })] },
      });
      container.querySelector('[data-part="dropzone"]')!.dispatchEvent(drop);
    },
  },
] satisfies HookScenario[];
