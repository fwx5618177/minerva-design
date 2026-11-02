import { act, createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { detectCodeLanguage } from "@minerva/core";
import i18n from "../../config/i18n";
import CodeBlock from "./CodeBlock";
import styles from "./codeBlock.module.scss";

// a pass-through spy, to count the detections
vi.mock("@minerva/core", async (importOriginal) => {
  const core = await importOriginal<typeof import("@minerva/core")>();
  return { ...core, detectCodeLanguage: vi.fn(core.detectCodeLanguage) };
});

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

describe("CodeBlock highlighting", () => {
  const json = '{\n  "id": 42,\n  "ok": true\n}';
  const code = (container: HTMLElement) => container.querySelector("code")!;

  it("renders plain text without a language", () => {
    const { container } = render(<CodeBlock>{json}</CodeBlock>);
    expect(code(container).children).toHaveLength(0);
    expect(code(container).textContent).toBe(json);
    expect(code(container)).not.toHaveAttribute("data-language");
  });

  it("renders token spans with the token classes, keeping the text verbatim", () => {
    const { container } = render(<CodeBlock language="json">{json}</CodeBlock>);
    const el = code(container);
    expect(el).toHaveClass("language-json");
    expect(el).toHaveAttribute("data-language", "json");
    expect(el.textContent).toBe(json);
    const property = el.querySelectorAll(`.${styles["token-property"]}`);
    expect([...property].map((s) => s.textContent)).toEqual(['"id"', '"ok"']);
    expect(el.querySelector(`.${styles["token-number"]}`)?.textContent).toBe(
      "42",
    );
    expect(el.querySelector(`.${styles["token-boolean"]}`)?.textContent).toBe(
      "true",
    );
  });

  it("never parses the code as HTML", () => {
    const text = '<img src=x onerror="alert(1)"><script>x()</script>';
    const { container } = render(<CodeBlock language="html">{text}</CodeBlock>);
    expect(container.querySelector("img, script")).toBeNull();
    expect(code(container).textContent).toBe(text);
    expect(
      code(container).querySelector(`.${styles["token-tag"]}`)?.textContent,
    ).toBe("img");
  });

  it("highlight={false} renders plain text", () => {
    const { container } = render(
      <CodeBlock language="json" highlight={false}>
        {json}
      </CodeBlock>,
    );
    expect(code(container).querySelector("span")).toBeNull();
    expect(code(container)).toHaveAttribute("data-language", "json");
  });

  it("numbers the lines in an aria-hidden gutter outside the text", () => {
    const text = "a\nb\n\nc\n";
    const { container } = render(
      <CodeBlock language="js" showLineNumbers>
        {text}
      </CodeBlock>,
    );
    const numbers = container.querySelectorAll(`.${styles.lineNumber}`);
    expect([...numbers].map((n) => n.getAttribute("data-line"))).toEqual([
      "1",
      "2",
      "3",
      "4",
    ]);
    for (const n of numbers) {
      expect(n).toHaveAttribute("aria-hidden", "true");
      expect(n.textContent).toBe("");
    }
    expect(code(container).textContent).toBe(text);
    expect(code(container).style.getPropertyValue("--code-line-digits")).toBe(
      "2",
    );
  });

  it("numbers the lines without a language", () => {
    const { container } = render(
      <CodeBlock showLineNumbers>{"x\ny"}</CodeBlock>,
    );
    expect(container.querySelectorAll(`.${styles.lineNumber}`)).toHaveLength(2);
    expect(code(container).textContent).toBe("x\ny");
  });

  it("shows the language label only with showLanguage", () => {
    const { container, rerender } = render(
      <CodeBlock language="json">{json}</CodeBlock>,
    );
    expect(container.firstElementChild?.tagName).toBe("PRE");
    rerender(
      <CodeBlock language="json" showLanguage>
        {json}
      </CodeBlock>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("DIV");
    const label = root.querySelector(`.${styles.language}`);
    expect(label?.textContent).toBe("JSON");
    expect(label).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("button")).toBeNull();
    expect(root.querySelector('[aria-live="polite"]')).toBeNull();
  });

  it("copies the raw text of highlighted, numbered code", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(
      <CodeBlock language="json" showLineNumbers showLanguage copyable>
        {json}
      </CodeBlock>,
    );
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith(json);
    delete (navigator as { clipboard?: unknown }).clipboard;
  });
});

describe('CodeBlock language="auto"', () => {
  const python = "def greet(name):\n    return f'Hello {name}'\n";
  const code = (container: HTMLElement) => container.querySelector("code")!;

  afterEach(() => {
    vi.mocked(detectCodeLanguage).mockClear();
  });

  it("highlights, labels and tags the detected language", () => {
    const { container } = render(
      <CodeBlock language="auto" showLanguage>
        {python}
      </CodeBlock>,
    );
    const el = code(container);
    expect(el).toHaveClass("language-python");
    expect(el).toHaveAttribute("data-language", "python");
    expect(container.querySelector(`.${styles.language}`)?.textContent).toBe(
      "PYTHON",
    );
    const keywords = el.querySelectorAll(`.${styles["token-keyword"]}`);
    expect([...keywords].map((k) => k.textContent)).toContain("def");
    expect(el.textContent).toBe(python);
  });

  it("accepts any case and keeps undetected text plain", () => {
    const { container } = render(
      <CodeBlock language=" Auto " showLanguage>
        {"Just a sentence."}
      </CodeBlock>,
    );
    expect(code(container)).toHaveAttribute("data-language", "plain");
    expect(code(container).querySelector("span")).toBeNull();
    expect(container.querySelector(`.${styles.language}`)?.textContent).toBe(
      "PLAIN",
    );
  });

  it("detects once per text and follows text changes", () => {
    const { container, rerender } = render(
      <CodeBlock language="auto">{python}</CodeBlock>,
    );
    rerender(
      <CodeBlock language="auto" showLineNumbers>
        {python}
      </CodeBlock>,
    );
    expect(detectCodeLanguage).toHaveBeenCalledTimes(1);
    rerender(<CodeBlock language="auto">{'{"ok": true}'}</CodeBlock>);
    expect(detectCodeLanguage).toHaveBeenCalledTimes(2);
    expect(code(container)).toHaveAttribute("data-language", "json");
  });

  it("keeps the language with highlight={false}", () => {
    const { container } = render(
      <CodeBlock language="auto" highlight={false}>
        {python}
      </CodeBlock>,
    );
    expect(code(container)).toHaveAttribute("data-language", "python");
    expect(code(container).querySelector("span")).toBeNull();
  });

  it("lays marks over the detected highlighting", () => {
    const { container } = render(
      <CodeBlock language="auto" marks={[{ start: 4, end: 9, id: "m" }]}>
        {python}
      </CodeBlock>,
    );
    const mark = container.querySelector("mark")!;
    expect(mark.textContent).toBe("greet");
    expect(mark).toHaveAttribute("data-mark-id", "m");
    expect(
      code(container).querySelector(`.${styles["token-keyword"]}`)?.textContent,
    ).toBe("def");
    expect(code(container).textContent).toBe(python);
  });
});

describe("CodeBlock marks", () => {
  const source = 'const name = "x";\nlog(name);';
  const code = (container: HTMLElement) => container.querySelector("code")!;
  const marksOf = (container: HTMLElement) => [
    ...container.querySelectorAll<HTMLElement>("mark"),
  ];

  afterEach(() => {
    window.getSelection()?.removeAllRanges();
  });

  it("wraps the ranges in <mark>s, keeping the token colors inside", () => {
    const { container } = render(
      <CodeBlock
        language="js"
        marks={[
          { start: 6, end: 15, id: "a", title: "Note", className: "saved" },
        ]}
      >
        {source}
      </CodeBlock>,
    );
    const [mark] = marksOf(container);
    expect(mark.textContent).toBe('name = "x');
    expect(mark).toHaveClass(styles.mark, "saved");
    expect(mark).toHaveAttribute("data-mark-id", "a");
    expect(mark).toHaveAttribute("title", "Note");
    expect(mark).toHaveAttribute("data-part", "code-mark");
    expect(mark.querySelector(`.${styles["token-string"]}`)?.textContent).toBe(
      '"x',
    );
    expect(mark.querySelector(`.${styles["token-operator"]}`)).not.toBeNull();
    expect(code(container).textContent).toBe(source);
    expect(
      code(container).querySelector(`.${styles["token-keyword"]}`)?.textContent,
    ).toBe("const");
  });

  it("marks plain text without a language", () => {
    const { container } = render(
      <CodeBlock marks={[{ start: 0, end: 5 }]}>{source}</CodeBlock>,
    );
    expect(marksOf(container).map((m) => m.textContent)).toEqual(["const"]);
    expect(code(container).querySelector("span")).toBeNull();
    expect(code(container).textContent).toBe(source);
  });

  it("colors marks with theme names or CSS colors", () => {
    const { container } = render(
      <CodeBlock
        marks={[
          { start: 0, end: 1 },
          { start: 2, end: 3, color: "success" },
          { start: 4, end: 5, color: "rgb(0 0 255 / 0.2)" },
        ]}
      >
        {source}
      </CodeBlock>,
    );
    const [plain, scheme, custom] = marksOf(container);
    expect(plain.style.getPropertyValue("--code-mark-bg")).toBe("");
    expect(plain).not.toHaveAttribute("data-mark-color");
    expect(scheme).toHaveAttribute("data-mark-color", "success");
    expect(scheme.style.getPropertyValue("--code-mark-bg")).toBe(
      "color-mix(in srgb, var(--success-color) 30%, transparent)",
    );
    expect(custom.style.getPropertyValue("--code-mark-bg")).toBe(
      "rgb(0 0 255 / 0.2)",
    );
  });

  it("lets the later mark win over an earlier overlapping one", () => {
    const { container } = render(
      <CodeBlock
        marks={[
          { start: 0, end: 10, id: "outer" },
          { start: 2, end: 4, id: "inner" },
        ]}
      >
        {source}
      </CodeBlock>,
    );
    expect(
      marksOf(container).map((m) => [
        m.textContent,
        m.getAttribute("data-mark-id"),
      ]),
    ).toEqual([
      ["co", "outer"],
      ["ns", "inner"],
      ["t name", "outer"],
    ]);
    expect(container.querySelector("mark mark")).toBeNull();
  });

  it("cuts a multi-line mark per line with line numbers", () => {
    const { container } = render(
      <CodeBlock language="js" showLineNumbers marks={[{ start: 13, end: 21 }]}>
        {source}
      </CodeBlock>,
    );
    const marks = marksOf(container);
    expect(marks.map((m) => m.textContent)).toEqual(['"x";', "log"]);
    expect(marks.map((m) => m.closest(`.${styles.line}`))).toEqual([
      ...container.querySelectorAll(`.${styles.line}`),
    ]);
    expect(
      [...container.querySelectorAll(`.${styles.lineNumber}`)].map((n) =>
        n.getAttribute("data-line"),
      ),
    ).toEqual(["1", "2"]);
    expect(code(container).textContent).toBe(source);
  });

  it("clamps out-of-range marks and ignores empty ones", () => {
    const { container } = render(
      <CodeBlock
        marks={[
          { start: -4, end: 2 },
          { start: 7, end: 7 },
          { start: 23, end: 99 },
        ]}
      >
        {source}
      </CodeBlock>,
    );
    expect(marksOf(container).map((m) => m.textContent)).toEqual([
      "co",
      "ame);",
    ]);
  });

  it("calls onMarkClick with the mark, not after a selection drag", async () => {
    const user = userEvent.setup();
    const onMarkClick = vi.fn();
    const marks = [{ start: 0, end: 5, id: "a" }];
    const { container } = render(
      <CodeBlock language="js" marks={marks} onMarkClick={onMarkClick}>
        {source}
      </CodeBlock>,
    );
    const [mark] = marksOf(container);
    expect(mark).toHaveClass(styles.markClickable);
    await user.click(mark.firstElementChild!);
    expect(onMarkClick).toHaveBeenCalledTimes(1);
    expect(onMarkClick.mock.calls[0][0]).toBe(marks[0]);
    expect(onMarkClick.mock.calls[0][1].type).toBe("click");
    // not on unmarked text
    await user.click(code(container));
    expect(onMarkClick).toHaveBeenCalledTimes(1);
    // a click ending a text selection in the code is not a mark click
    const range = document.createRange();
    range.selectNodeContents(code(container));
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);
    fireEvent.click(mark);
    expect(onMarkClick).toHaveBeenCalledTimes(1);
  });

  it("has no click affordance without onMarkClick", () => {
    const { container } = render(
      <CodeBlock marks={[{ start: 0, end: 5 }]}>{source}</CodeBlock>,
    );
    expect(marksOf(container)[0]).not.toHaveClass(styles.markClickable);
  });

  it("copies the raw code, not the marks", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(
      <CodeBlock
        language="js"
        copyable
        showLineNumbers
        marks={[{ start: 2, end: 20 }]}
      >
        {source}
      </CodeBlock>,
    );
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith(source);
    delete (navigator as { clipboard?: unknown }).clipboard;
  });
});
