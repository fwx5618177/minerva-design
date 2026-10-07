import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import type { EditorProps, Monaco } from "@monaco-editor/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConfigProvider } from "../../contexts";
import { MonacoCodeEditor, type MonacoCodeEditorProps } from ".";
import styles from "./monacoCodeEditor.module.scss";

const adapter = vi.hoisted(() => ({
  props: {} as EditorProps,
  config: vi.fn(),
  init: vi.fn(),
  mount: true,
  dom: null as HTMLElement | null,
  throwOnRender: false,
  monaco: { editor: { create() {} } } as unknown as Monaco,
}));
vi.mock("@monaco-editor/react", async () => {
  const { useEffect } = await import("react");
  return {
    loader: { config: adapter.config, init: adapter.init },
    default: function MockEditor(props: EditorProps) {
      adapter.props = props;
      if (adapter.throwOnRender) throw new Error("Editor crashed");
      useEffect(() => {
        if (adapter.mount)
          props.onMount?.(
            { getDomNode: () => adapter.dom } as unknown as Parameters<
              NonNullable<EditorProps["onMount"]>
            >[0],
            adapter.monaco,
          );
        // Like the real adapter: onMount only fires once, when the editor
        // instance is created, not on every props change.
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
  adapter.mount = true;
  adapter.throwOnRender = false;
  adapter.props = {};
  adapter.dom = null;
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.useRealTimers();
  delete document.documentElement.dataset.theme;
});

async function render(props: Partial<MonacoCodeEditorProps> = {}) {
  await act(async () =>
    root.render(
      <MonacoCodeEditor
        monaco={adapter.monaco}
        value="<p>Hello</p>"
        onChange={() => {}}
        label="HTML source"
        {...props}
      />,
    ),
  );
}

describe("MonacoCodeEditor", () => {
  it("configures a supplied local engine before initialization and normalizes controlled changes", async () => {
    const onChange = vi.fn();
    await render({ onChange, language: "html" });
    expect(adapter.config).toHaveBeenCalledWith({ monaco: adapter.monaco });
    expect(adapter.config.mock.invocationCallOrder[0]).toBeLessThan(
      adapter.init.mock.invocationCallOrder[0],
    );
    expect(adapter.props.value).toBe("<p>Hello</p>");
    expect(adapter.props.language).toBe("html");
    expect(adapter.props.options).toMatchObject({
      ariaLabel: "HTML source",
      readOnly: false,
      automaticLayout: true,
    });
    act(() => adapter.props.onChange?.(undefined, {} as never));
    expect(onChange).toHaveBeenCalledWith("");
    await render({ onChange, disabled: true, value: "Updated" });
    expect(adapter.props.value).toBe("Updated");
    expect(adapter.props.options?.readOnly).toBe(true);
    act(() => adapter.props.onChange?.("blocked", {} as never));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders a labelled group and editor surface; the label targets the mounted editor input", async () => {
    adapter.dom = document.createElement("div");
    const input = document.createElement("textarea");
    adapter.dom.append(input);
    await render({ className: "consumer" });
    const group = container.querySelector('[role="group"]')!;
    expect(group).toHaveClass(styles.root, "consumer");
    expect(group.getAttribute("aria-label")).toBe("HTML source");
    expect(container.querySelector(`.${styles.surface}`)).toHaveAttribute(
      "aria-busy",
      "false",
    );
    expect(input.id).not.toBe("");
    expect(container.querySelector("label")!.htmlFor).toBe(input.id);
  });

  it("follows the document theme and the ConfigProvider theme; the prop wins", async () => {
    await render();
    expect(adapter.props.theme).toBe("light");
    await act(async () => {
      document.documentElement.dataset.theme = "dark";
    });
    expect(adapter.props.theme).toBe("vs-dark");
    await render({ theme: "light" });
    expect(adapter.props.theme).toBe("light");
    delete document.documentElement.dataset.theme;
    await act(async () =>
      root.render(
        <ConfigProvider theme="dark">
          <MonacoCodeEditor
            monaco={adapter.monaco}
            value=""
            onChange={() => {}}
            label="Source"
          />
        </ConfigProvider>,
      ),
    );
    expect(adapter.props.theme).toBe("vs-dark");
    await act(async () =>
      root.render(
        <ConfigProvider theme="github-dark">
          <MonacoCodeEditor
            monaco={adapter.monaco}
            value=""
            onChange={() => {}}
            label="Source"
          />
        </ConfigProvider>,
      ),
    );
    expect(adapter.props.theme).toBe("vs-dark");
    await act(async () =>
      root.render(
        <ConfigProvider theme="light">
          <MonacoCodeEditor
            monaco={adapter.monaco}
            value=""
            onChange={() => {}}
            label="Source"
          />
        </ConfigProvider>,
      ),
    );
    expect(adapter.props.theme).toBe("light");
  });

  it("rejects a missing or conflicting engine without invoking the network loader", async () => {
    await render({ monaco: undefined as unknown as Monaco });
    expect(adapter.init).not.toHaveBeenCalled();
    expect(container.querySelector("textarea")!.value).toBe("<p>Hello</p>");
    await render();
    adapter.init.mockClear();
    await render({ monaco: { editor: { create() {} } } as unknown as Monaco });
    expect(adapter.init).not.toHaveBeenCalled();
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
  });

  it("fails when the loader resolves another engine", async () => {
    adapter.init.mockResolvedValueOnce({
      editor: { create() {} },
    } as unknown as Monaco);
    await render();
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
  });

  it("offers an editable fallback after failure and retries with the latest controlled value", async () => {
    adapter.init.mockRejectedValueOnce(new Error("Engine unavailable"));
    const onChange = vi.fn();
    await render({ onChange });
    const input = container.querySelector("textarea")!;
    expect(input.getAttribute("aria-label")).toBe("HTML source");
    expect(input.id).not.toBe("");
    expect(container.querySelector("label")!.htmlFor).toBe(input.id);
    expect(container.querySelector('[role="alert"]')!.textContent).toBe(
      "The editor is unavailable",
    );
    act(() => {
      Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value",
      )!.set!.call(input, "Edited");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledWith("Edited");
    await render({ value: "Edited", onChange });
    const retry = container.querySelector<HTMLButtonElement>(
      '[aria-label="Retry editor"]',
    )!;
    expect(retry.textContent).toBe("Retry");
    await act(async () => retry.click());
    expect(adapter.init).toHaveBeenCalledTimes(2);
    expect(container.querySelector("textarea")).toBeNull();
    expect(adapter.props.value).toBe("Edited");
  });

  it("allows overriding the built-in texts", async () => {
    adapter.init.mockRejectedValueOnce(new Error("Engine unavailable"));
    await render({
      unavailableText: "编辑器暂不可用",
      retryText: "重试",
      retryLabel: "重试编辑器",
    });
    expect(container.querySelector('[role="alert"]')!.textContent).toBe(
      "编辑器暂不可用",
    );
    expect(
      container.querySelector('[aria-label="重试编辑器"]')!.textContent,
    ).toBe("重试");
  });

  it("ignores fallback edits while disabled", async () => {
    adapter.init.mockRejectedValueOnce(new Error("Engine unavailable"));
    const onChange = vi.fn();
    await render({ onChange, disabled: true });
    const input = container.querySelector("textarea")!;
    expect(input.disabled).toBe(true);
    act(() => {
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("ends indefinite initialization and adapter mounting with a disabled fallback", async () => {
    vi.useFakeTimers();
    adapter.mount = false;
    await render({ disabled: true, loadingLabel: "Loading source" });
    const status = container.querySelector('[role="status"]')!;
    expect(status).not.toBeNull();
    expect(
      status.querySelector('[aria-label="Loading source"]'),
    ).not.toBeNull();
    await act(async () => {
      vi.advanceTimersByTime(10000);
    });
    expect(container.querySelector("textarea")!.disabled).toBe(true);
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it("supports a custom load timeout", async () => {
    vi.useFakeTimers();
    adapter.init.mockReturnValue(new Promise(() => {}));
    await render({ loadTimeout: 500 });
    await act(async () => {
      vi.advanceTimersByTime(499);
    });
    expect(container.querySelector("textarea")).toBeNull();
    await act(async () => {
      vi.advanceTimersByTime(1);
    });
    expect(container.querySelector("textarea")).not.toBeNull();
  });

  it("ignores a late loader resolution after timeout until explicitly retried", async () => {
    vi.useFakeTimers();
    let resolve!: (monaco: Monaco) => void;
    adapter.init.mockReturnValueOnce(
      new Promise<Monaco>((done) => {
        resolve = done;
      }),
    );
    await render();
    await act(async () => {
      vi.advanceTimersByTime(10000);
    });
    await act(async () => resolve(adapter.monaco));
    expect(container.querySelector("textarea")).not.toBeNull();
  });

  it("falls back when the editor throws while rendering", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    adapter.throwOnRender = true;
    try {
      await render();
      expect(container.querySelector('[role="alert"]')).not.toBeNull();
      expect(container.querySelector("textarea")).not.toBeNull();
    } finally {
      errors.mockRestore();
    }
  });

  it("keeps a bounded editor height throughout loading and failure", async () => {
    adapter.init.mockReturnValue(new Promise(() => {}));
    await render({ height: 900, maxHeight: 500 });
    const surface = () =>
      container.querySelector<HTMLElement>(`.${styles.surface}`)!;
    expect(surface().style.height).toBe("500px");
    await render({ height: 20, minHeight: 160, maxHeight: 500 });
    expect(surface().style.height).toBe("160px");
    await render({ height: Number.NaN, minHeight: -1, maxHeight: 0 });
    expect(surface().style.height).toBe("420px");
  });

  it("renders a loading shell on the server", () => {
    const html = renderToString(
      <MonacoCodeEditor
        monaco={adapter.monaco}
        value=""
        onChange={() => {}}
        label="Source"
      />,
    );
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('role="status"');
  });
});

describe("MonacoCodeEditor native attributes", () => {
  it("forwards style and data-* to the root group", async () => {
    await render({ style: { margin: "2px" }, "data-testid": "editor" });
    const group = container.querySelector(
      '[data-testid="editor"]',
    ) as HTMLElement;
    expect(group.getAttribute("role")).toBe("group");
    expect(group.style.margin).toBe("2px");
  });
});
