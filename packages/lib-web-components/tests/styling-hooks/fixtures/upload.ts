import type { WcHookScenario } from "../types";
import type { MinervaUpload } from "../../../src/components/upload/upload";

export default [
  {
    name: "files, error, dragging",
    html: `<minerva-upload label="Files" accept="image/*" multiple removable retryable></minerva-upload>`,
    setup: (root) => {
      const el = root.querySelector<MinervaUpload>("minerva-upload")!;
      el.items = [
        { id: "1", name: "a.txt", status: "done" },
        { id: "2", name: "b.txt", status: "error", error: "Failed" },
      ];
      const input = el.shadowRoot!.querySelector("input")!;
      Object.defineProperty(input, "files", {
        configurable: true,
        value: [new File(["x"], "c.txt", { type: "text/plain" })],
      });
      input.dispatchEvent(new Event("change"));
      el.shadowRoot!.querySelector(".dropzone")!.dispatchEvent(
        new Event("dragover", { cancelable: true }),
      );
    },
  },
  {
    name: "disabled, loading",
    html: `<minerva-upload label="Files" disabled loading></minerva-upload>`,
  },
] satisfies WcHookScenario[];
