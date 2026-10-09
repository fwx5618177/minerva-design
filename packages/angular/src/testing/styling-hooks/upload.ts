import { Component } from "@angular/core";
import { MnUpload, type UploadItem } from "../../components/upload";
import { fireEvent } from "../index";
import type { HookScenario } from "../types";

@Component({
  imports: [MnUpload],
  template: `<mn-upload
    label="Files"
    [value]="files"
    multiple
    removable
    retryable
  />`,
})
class Files {
  files: UploadItem[] = [
    { id: "1", name: "a.txt", status: "done" },
    { id: "2", name: "b.txt", status: "error", error: "Failed" },
    { id: "3", name: "c.txt", status: "uploading" },
  ];
}
@Component({
  imports: [MnUpload],
  template: `<mn-upload label="Files" disabled loading />`,
})
class Disabled {}
export default [
  {
    name: "files, dragging",
    component: Files,
    setup: ({ root }) => {
      fireEvent.dragOver(root.querySelector('[data-part="dropzone"]')!);
    },
  },
  { name: "disabled, loading", component: Disabled },
] satisfies HookScenario[];
