import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { EditorProps, Monaco } from "@monaco-editor/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MonacoCodeEditor, type MonacoCodeEditorProps } from "./monaco";

const adapter = vi.hoisted(() => ({
  props: {} as EditorProps,
  init: vi.fn(),
  monaco: { editor: { create() {} } } as unknown as Monaco,
}));
vi.mock("@monaco-editor/react", async () => {
  const { useEffect } = await import("react");
  return {
    loader: { config: vi.fn(), init: adapter.init },
    default: function MockEditor(props: EditorProps) {
      adapter.props = props;
      useEffect(() => {
        props.onMount?.(
          {} as Parameters<NonNullable<EditorProps["onMount"]>>[0],
          adapter.monaco,
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    },
  };
});

let container: HTMLDivElement;
let root: Root;
beforeEach(() => {
  (
    globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  adapter.init.mockReset().mockResolvedValue(adapter.monaco);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete document.documentElement.dataset.theme;
});

// Props copied from novel-isr-ui's MonacoCodeEditor tests.
const props: MonacoCodeEditorProps = {
  monaco: {} as Monaco,
  value: "<p>Hello</p>",
  onChange: () => {},
  label: "HTML source",
  language: "html",
  height: 420,
  minHeight: 160,
  maxHeight: 800,
  disabled: false,
  className: "editor",
};

describe("compat: MonacoCodeEditor", () => {
  it("accepts novel props, follows ThemeProvider's data-theme and mounts the editor", async () => {
    await act(async () =>
      root.render(<MonacoCodeEditor {...props} monaco={adapter.monaco} />),
    );
    expect(container.querySelector(".ui-monaco-code-editor")).toHaveClass(
      "editor",
    );
    expect(adapter.props.language).toBe("html");
    expect(adapter.props.theme).toBe("light");
    expect(
      container.querySelector('[role="status"] [aria-label="加载编辑器"]'),
    ).toBeNull(); // mounted: no loading indicator
    // novel's ThemeProvider writes <html data-theme>
    await act(async () => {
      document.documentElement.dataset.theme = "dark";
    });
    expect(adapter.props.theme).toBe("vs-dark");
  });

  it("shows novel's Chinese fallback texts under the default (en) language", async () => {
    adapter.init.mockRejectedValueOnce(new Error("Engine unavailable"));
    await act(async () =>
      root.render(<MonacoCodeEditor {...props} monaco={adapter.monaco} />),
    );
    expect(container.querySelector('[role="alert"]')!.textContent).toBe(
      "编辑器暂不可用",
    );
    const retry = container.querySelector<HTMLButtonElement>(
      '[aria-label="重试编辑器"]',
    )!;
    expect(retry.textContent).toBe("重试");
    await act(async () => retry.click());
    expect(adapter.init).toHaveBeenCalledTimes(2);
    expect(container.querySelector("textarea")).toBeNull();
  });

  it("shows novel's loading label and lets consumer texts override the defaults", async () => {
    adapter.init.mockReturnValueOnce(new Promise(() => {}));
    await act(async () =>
      root.render(<MonacoCodeEditor {...props} monaco={adapter.monaco} />),
    );
    expect(
      container.querySelector('[role="status"] [aria-label="加载编辑器"]'),
    ).not.toBeNull();
    adapter.init.mockRejectedValueOnce(new Error("Engine unavailable"));
    await act(async () =>
      root.render(
        <MonacoCodeEditor
          {...props}
          monaco={{ editor: { create() {} } } as unknown as Monaco}
          unavailableText="Editor unavailable"
          retryLabel="Retry editor"
        />,
      ),
    );
    expect(container.querySelector('[role="alert"]')!.textContent).toBe(
      "Editor unavailable",
    );
    expect(
      container.querySelector('[aria-label="Retry editor"]'),
    ).not.toBeNull();
  });
});
