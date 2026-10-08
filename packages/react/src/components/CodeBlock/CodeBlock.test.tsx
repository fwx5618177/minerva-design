import { act, createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import CodeBlock from "./CodeBlock";
import styles from "./codeBlock.module.scss";

describe("CodeBlock", () => {
  it("exposes a named, keyboard-focusable region for scrolling", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Before</button>
        <CodeBlock aria-label="Payload">{"{}"}</CodeBlock>
      </>,
    );
    const region = screen.getByRole("region", { name: "Payload" });
    expect(region.tagName).toBe("PRE");
    expect(region).toHaveClass("codeBlock");
    await user.tab();
    await user.tab();
    expect(region).toHaveFocus();
  });

  it("names the region from aria-label, aria-labelledby or the localized default", () => {
    const { rerender } = render(<CodeBlock aria-label="Config">x</CodeBlock>);
    expect(screen.getByRole("region", { name: "Config" })).toBeInTheDocument();
    rerender(
      <>
        <h2 id="t">Response</h2>
        <CodeBlock aria-labelledby="t">x</CodeBlock>
      </>,
    );
    const region = screen.getByRole("region", { name: "Response" });
    expect(region).not.toHaveAttribute("aria-label");
    rerender(<CodeBlock>x</CodeBlock>);
    expect(screen.getByRole("region", { name: "Code" })).toBeInTheDocument();
  });

  it("preserves whitespace verbatim inside a code element", () => {
    const text = "line 1\n\tindented  spaced\n";
    render(<CodeBlock aria-label="Snippet">{text}</CodeBlock>);
    const code = screen
      .getByRole("region", { name: "Snippet" })
      .querySelector(":scope > code");
    expect(code?.textContent).toBe(text);
  });

  it("merges consumer className and style, letting style override maxHeight", () => {
    const { rerender } = render(
      <CodeBlock
        aria-label="Log"
        className="consumer"
        maxHeight="10rem"
        style={{ color: "red" }}
      >
        x
      </CodeBlock>,
    );
    const pre = screen.getByRole("region", { name: "Log" });
    expect(pre).toHaveClass("codeBlock", "consumer");
    expect(pre.style.maxHeight).toBe("10rem");
    expect(pre.style.color).toBe("red");
    rerender(
      <CodeBlock
        aria-label="Log"
        maxHeight="10rem"
        style={{ maxHeight: "5rem" }}
      >
        x
      </CodeBlock>,
    );
    expect(pre.style.maxHeight).toBe("5rem");
  });

  it("forwards native attributes without leaking layout props", () => {
    render(
      <CodeBlock
        aria-label="Data"
        id="code"
        data-lang="json"
        wrap={false}
        maxHeight={120}
        tabIndex={-1}
      >
        x
      </CodeBlock>,
    );
    const pre = screen.getByRole("region", { name: "Data" });
    expect(pre).toHaveAttribute("id", "code");
    expect(pre).toHaveAttribute("data-lang", "json");
    expect(pre).toHaveAttribute("tabindex", "-1");
    expect(pre).not.toHaveAttribute("wrap");
    expect(pre).not.toHaveAttribute("maxheight");
  });

  it("renders untrusted text as text with region defaults (responsive data layout)", () => {
    const text = '{\n  "text": "<script>unsafe()</script>"\n}';
    const ref = createRef<HTMLPreElement>();
    const { container, rerender } = render(
      <CodeBlock aria-label="Record" ref={ref}>
        {text}
      </CodeBlock>,
    );
    expect(ref.current?.getAttribute("role")).toBe("region");
    expect(ref.current?.getAttribute("aria-label")).toBe("Record");
    expect(ref.current?.tabIndex).toBe(0);
    expect(ref.current?.style.maxHeight).toBe("24rem");
    expect(container.querySelector("code")?.textContent).toBe(text);
    expect(container.querySelector("script")).toBeNull();
    expect(ref.current?.dataset.wrap).toBe("true");
    rerender(
      <CodeBlock aria-label="Raw" wrap={false} maxHeight={200}>
        {text}
      </CodeBlock>,
    );
    expect(container.querySelector("pre")?.dataset.wrap).toBe("false");
    expect(container.querySelector("pre")?.style.maxHeight).toBe("200px");
  });
});

describe("CodeBlock copyable", () => {
  const original = Object.getOwnPropertyDescriptor(navigator, "clipboard");

  const mockClipboard = (value: unknown) => {
    Object.defineProperty(navigator, "clipboard", {
      value,
      configurable: true,
    });
  };

  afterEach(() => {
    if (original) Object.defineProperty(navigator, "clipboard", original);
    else delete (navigator as { clipboard?: unknown }).clipboard;
    vi.useRealTimers();
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  const liveRegion = (container: HTMLElement) =>
    container.querySelector('[aria-live="polite"]');

  it("renders no button by default", () => {
    const { container } = render(<CodeBlock aria-label="Code">x</CodeBlock>);
    expect(screen.queryByRole("button")).toBeNull();
    expect(liveRegion(container)).toBeNull();
    expect(container.firstElementChild?.tagName).toBe("PRE");
  });

  it("wraps the region and puts className, style and native attributes on the wrapper", () => {
    const ref = createRef<HTMLPreElement>();
    const { container } = render(
      <CodeBlock
        copyable
        ref={ref}
        aria-label="Log"
        className="consumer"
        style={{ color: "red" }}
        id="log"
        maxHeight="10rem"
      >
        x
      </CodeBlock>,
    );
    const root = container.firstElementChild as HTMLElement;
    const region = screen.getByRole("region", { name: "Log" });
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass(styles.root, "consumer");
    expect(root).toHaveAttribute("id", "log");
    expect(root.style.color).toBe("red");
    expect(root.style.maxHeight).toBe("10rem");
    expect(ref.current).toBe(region);
    expect(region.tagName).toBe("PRE");
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region.querySelector("button")).toBeNull();
  });

  it("copies the text and announces success, then resets", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard({ writeText });
    const { container } = render(
      <CodeBlock copyable aria-label="Snippet">
        {"npm i minerva"}
      </CodeBlock>,
    );
    const button = screen.getByRole("button", { name: "Copy code" });
    expect(button).toHaveAttribute("type", "button");
    expect(liveRegion(container)).toHaveTextContent("");
    await user.click(button);
    expect(writeText).toHaveBeenCalledWith("npm i minerva");
    expect(
      await screen.findByRole("button", { name: "Copied" }),
    ).toBeInTheDocument();
    expect(liveRegion(container)).toHaveTextContent("Copied");
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(
      screen.getByRole("button", { name: "Copy code" }),
    ).toBeInTheDocument();
    expect(liveRegion(container)).toHaveTextContent("");
  });

  it("calls onCopied with the text after a successful copy, keeping the native onCopy", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard({ writeText });
    const onCopied = vi.fn();
    const onCopy = vi.fn();
    const { container } = render(
      <CodeBlock copyable onCopied={onCopied} onCopy={onCopy}>
        {"pnpm add minerva-design"}
      </CodeBlock>,
    );
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    await screen.findByRole("button", { name: "Copied" });
    expect(onCopied).toHaveBeenCalledTimes(1);
    expect(onCopied).toHaveBeenCalledWith("pnpm add minerva-design");
    // the copy button does not trigger the native clipboard event
    expect(onCopy).not.toHaveBeenCalled();
    // the native onCopy still reaches the element (user copying a selection)
    fireEvent.copy(container.querySelector("pre")!);
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onCopied).toHaveBeenCalledTimes(1);
  });

  it("reports a failure when writeText rejects", async () => {
    const user = userEvent.setup();
    mockClipboard({ writeText: vi.fn().mockRejectedValue(new Error("no")) });
    const onCopied = vi.fn();
    const { container } = render(
      <CodeBlock copyable onCopied={onCopied}>
        x
      </CodeBlock>,
    );
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(
      await screen.findByRole("button", { name: "Copy failed" }),
    ).toBeInTheDocument();
    expect(liveRegion(container)).toHaveTextContent("Copy failed");
    expect(onCopied).not.toHaveBeenCalled();
  });

  it("reports a failure when the clipboard API is missing", async () => {
    const user = userEvent.setup();
    mockClipboard(undefined);
    const onCopied = vi.fn();
    const { container } = render(
      <CodeBlock copyable onCopied={onCopied}>
        x
      </CodeBlock>,
    );
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(
      await screen.findByRole("button", { name: "Copy failed" }),
    ).toBeInTheDocument();
    expect(liveRegion(container)).toHaveTextContent("Copy failed");
    expect(onCopied).not.toHaveBeenCalled();
  });

  it("clears the feedback timer on unmount", async () => {
    const user = userEvent.setup();
    mockClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
    const clear = vi.spyOn(globalThis, "clearTimeout");
    const { unmount } = render(<CodeBlock copyable>x</CodeBlock>);
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    await screen.findByRole("button", { name: "Copied" });
    clear.mockClear();
    unmount();
    expect(clear).toHaveBeenCalled();
    clear.mockRestore();
  });

  it("localizes the button and the announcement", async () => {
    const user = userEvent.setup();
    mockClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
    act(() => {
      i18n.changeLanguage("zh");
    });
    const { container } = render(<CodeBlock copyable>x</CodeBlock>);
    expect(screen.getByRole("region", { name: "代码" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "复制代码" }));
    expect(
      await screen.findByRole("button", { name: "已复制" }),
    ).toBeInTheDocument();
    expect(liveRegion(container)).toHaveTextContent("已复制");
  });
});
