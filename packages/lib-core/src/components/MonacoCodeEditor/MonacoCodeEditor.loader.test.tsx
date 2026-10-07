import { act } from "react";
import { createRoot } from "react-dom/client";
import type { Monaco } from "@monaco-editor/react";
import { expect, it, vi } from "vitest";
import { MonacoCodeEditor } from ".";

it("uses the real offline loader and falls back when the local engine cannot create an editor", async () => {
  (
    globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  const engine = {
    editor: {
      getModel: () => null,
      createModel: () => ({}),
      create: () => {
        throw new Error("Local engine failed");
      },
    },
    Uri: { parse: () => ({}) },
  } as unknown as Monaco;
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const errors = vi.spyOn(console, "error").mockImplementation(() => {});
  const scriptCount = document.querySelectorAll("script[src]").length;
  try {
    await act(async () =>
      root.render(
        <MonacoCodeEditor
          monaco={engine}
          label="Source"
          value="Editable source"
          onChange={() => {}}
        />,
      ),
    );
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
    expect(container.querySelector("textarea")!.value).toBe("Editable source");
    expect(container.querySelector("textarea")!.disabled).toBe(false);
    // No CDN loader script was injected
    expect(document.querySelectorAll("script[src]")).toHaveLength(scriptCount);
    expect(
      container.querySelector("[aria-busy]")!.getAttribute("aria-busy"),
    ).toBe("false");
  } finally {
    act(() => root.unmount());
    container.remove();
    errors.mockRestore();
  }
});
