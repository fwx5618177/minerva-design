import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaCodeBlock } from "./code-block";
import "../../elements/code-block";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  resetDevWarnings();
});

const pre = (el: Element) => $<HTMLPreElement>(el, "pre");
const copyButton = (el: Element) =>
  $<HTMLButtonElement>(el, "[part=copy-button]");

function mockClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: vi.fn(writeText) },
  });
  return navigator.clipboard.writeText as ReturnType<typeof vi.fn>;
}

describe("<minerva-code-block>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-code-block")).toBe(MinervaCodeBlock);
  });

  it("renders a focusable named region with the verbatim text", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block>&lt;b&gt;bold&lt;/b&gt;</minerva-code-block>`,
    );
    const region = pre(el);
    expect(region.classList).toContain("codeBlock");
    expect(region).toHaveAttribute("role", "region");
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveAttribute("aria-label", "Code");
    expect(region).toHaveAttribute("data-wrap", "true");
    expect(region.style.maxHeight).toBe("24rem");
    expect($(el, "code").textContent).toBe("<b>bold</b>");
    expect($(el, "code").querySelector("b")).toBeNull();
    expect(el.shadowRoot!.querySelector("button")).toBeNull();
  });

  it("prefers the code property and follows text changes", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block>first</minerva-code-block>`,
    );
    el.textContent = "second";
    await settle();
    expect($(el, "code").textContent).toBe("second");
    el.code = "{ }";
    await el.updateComplete;
    expect($(el, "code").textContent).toBe("{ }");
  });

  it("supports no-wrap, max-height and aria-label", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block no-wrap max-height="200" aria-label="Server log">x</minerva-code-block>`,
    );
    expect(pre(el)).toHaveAttribute("data-wrap", "false");
    expect(pre(el).style.maxHeight).toBe("200px");
    expect(pre(el)).toHaveAttribute("aria-label", "Server log");
  });

  it("shows the language label with show-language", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="json">{}</minerva-code-block>`,
    );
    expect($(el, "code")).toHaveClass("language-json");
    expect($(el, "code")).toHaveAttribute("data-language", "json");
    expect(el.shadowRoot!.querySelector("[part=language]")).toBeNull();
    expect(el.shadowRoot!.querySelector(".root")).toBeNull();
    el.showLanguage = true;
    await el.updateComplete;
    expect($(el, "[part=language]").textContent?.trim()).toBe("JSON");
    expect($(el, "[part=language]")).toHaveAttribute("aria-hidden", "true");
    expect($(el, ".root")).not.toBeNull();
    expect(pre(el).classList).toContain("labeled");
    expect(el.shadowRoot!.querySelector("[aria-live]")).toBeNull();
  });

  it("highlights the syntax of the language into token spans", async () => {
    const json = '{\n  "id": 42,\n  "ok": true\n}';
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="json"></minerva-code-block>`,
    );
    el.code = json;
    await el.updateComplete;
    const code = $(el, "code");
    expect(code.textContent).toBe(json);
    expect(
      [...code.querySelectorAll(".token-property")].map((s) => s.textContent),
    ).toEqual(['"id"', '"ok"']);
    expect(code.querySelector(".token-number")?.textContent).toBe("42");
    el.noHighlight = true;
    await el.updateComplete;
    expect(code.querySelector("span")).toBeNull();
    expect(code.textContent).toBe(json);
  });

  it("renders plain text without a language and never parses HTML", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block>&lt;img src=x onerror="alert(1)"&gt;</minerva-code-block>`,
    );
    expect($(el, "code").querySelector("span")).toBeNull();
    el.language = "html";
    await el.updateComplete;
    expect($(el, "code").querySelector("img")).toBeNull();
    expect($(el, "code .token-tag").textContent).toBe("img");
    expect($(el, "code").textContent).toBe('<img src=x onerror="alert(1)">');
  });

  it("numbers the lines with show-line-numbers and copies the raw text", async () => {
    const writeText = mockClipboard(() => Promise.resolve());
    const text = "a\nb\n\nc\n";
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="js" show-line-numbers copyable></minerva-code-block>`,
    );
    el.code = text;
    await el.updateComplete;
    const numbers = el.shadowRoot!.querySelectorAll("[part=line-number]");
    expect([...numbers].map((n) => n.getAttribute("data-line"))).toEqual([
      "1",
      "2",
      "3",
      "4",
    ]);
    for (const n of numbers) expect(n).toHaveAttribute("aria-hidden", "true");
    expect($(el, "code").textContent).toBe(text);
    await userEvent.click(copyButton(el));
    await settle();
    expect(writeText).toHaveBeenCalledWith(text);
  });

  it("copies the text and announces the result", async () => {
    const writeText = mockClipboard(() => Promise.resolve());
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block copyable>npm i</minerva-code-block>`,
    );
    const onCopy = vi.fn();
    el.addEventListener("minerva-copy", onCopy);
    expect($(el, ".root").style.maxHeight).toBe("24rem");
    expect(pre(el).classList).toContain("copyable");
    const button = copyButton(el);
    expect(button).toHaveAttribute("aria-label", "Copy code");
    expect(button.className).toContain("iconButton");
    await userEvent.click(button);
    await settle();
    expect(writeText).toHaveBeenCalledWith("npm i");
    expect(onCopy.mock.calls[0][0].detail).toEqual({
      text: "npm i",
      success: true,
    });
    expect(copyButton(el)).toHaveAttribute("aria-label", "Copied");
    expect(copyButton(el).classList).toContain("success");
    expect($(el, "[aria-live=polite]").textContent?.trim()).toBe("Copied");
  });

  it("reports failures and resets the feedback after two seconds", async () => {
    mockClipboard(() => Promise.reject(new Error("denied")));
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block copyable>x</minerva-code-block>`,
    );
    const onCopy = vi.fn();
    el.addEventListener("minerva-copy", onCopy);
    vi.useFakeTimers();
    const ok = await el.copy();
    expect(ok).toBe(false);
    expect(onCopy.mock.calls[0][0].detail).toMatchObject({
      text: "x",
      success: false,
    });
    await el.updateComplete;
    expect(copyButton(el)).toHaveAttribute("aria-label", "Copy failed");
    expect(copyButton(el).classList).toContain("danger");
    vi.advanceTimersByTime(2000);
    await el.updateComplete;
    expect(copyButton(el)).toHaveAttribute("aria-label", "Copy code");
  });

  it("activates the copy button with the keyboard", async () => {
    const writeText = mockClipboard(() => Promise.resolve());
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block copyable>k</minerva-code-block>`,
    );
    copyButton(el).focus();
    await userEvent.keyboard("{Enter}");
    expect(writeText).toHaveBeenCalledTimes(1);
  });

  it("follows the locale", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-config locale="fr"><minerva-code-block copyable>x</minerva-code-block></minerva-config>`,
      "minerva-code-block",
    );
    expect(copyButton(el).getAttribute("aria-label")).not.toBe("Copy code");
  });

  it("warns when copyable has nothing to copy", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-code-block copyable></minerva-code-block>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("copyable"));
  });
});

describe('<minerva-code-block language="auto">', () => {
  const python = "def greet(name):\n    return f'Hello {name}'\n";

  it("highlights, labels and tags the detected language", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="auto" show-language></minerva-code-block>`,
    );
    el.code = python;
    await el.updateComplete;
    const code = $(el, "code");
    expect(code).toHaveClass("language-python");
    expect(code).toHaveAttribute("data-language", "python");
    expect($(el, "[part=language]").textContent?.trim()).toBe("PYTHON");
    expect(
      [...code.querySelectorAll(".token-keyword")].map((k) => k.textContent),
    ).toContain("def");
    expect(code.textContent).toBe(python);
    // the host keeps the requested value
    expect(el).toHaveAttribute("language", "auto");
  });

  it("detects the text content and follows its changes", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="Auto">Just a sentence.</minerva-code-block>`,
    );
    expect($(el, "code")).toHaveAttribute("data-language", "plain");
    expect($(el, "code").querySelector("span")).toBeNull();
    el.textContent = "SELECT id FROM books;";
    await settle();
    expect($(el, "code")).toHaveAttribute("data-language", "sql");
    expect($(el, "code .token-keyword").textContent).toBe("SELECT");
  });

  it("lays marks over the detected highlighting", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="auto"></minerva-code-block>`,
    );
    el.code = python;
    el.marks = [{ start: 4, end: 9, id: "m" }];
    await el.updateComplete;
    const mark = $(el, "mark");
    expect(mark.textContent).toBe("greet");
    expect(mark).toHaveAttribute("data-mark-id", "m");
    expect($(el, "code .token-keyword").textContent).toBe("def");
  });
});

describe("<minerva-code-block> marks", () => {
  const marks = (el: Element) => [
    ...el.shadowRoot!.querySelectorAll<HTMLElement>("mark"),
  ];

  it("wraps the ranges in marks over the highlighted tokens", async () => {
    const code = 'const a = "hi";';
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="js"></minerva-code-block>`,
    );
    el.code = code;
    el.marks = [{ start: 3, end: 12, id: "n1", title: "Note" }];
    await el.updateComplete;
    const [mark] = marks(el);
    expect(marks(el)).toHaveLength(1);
    expect(mark.textContent).toBe('st a = "h');
    expect(mark).toHaveAttribute("part", "code-mark");
    expect(mark).toHaveAttribute("data-mark-id", "n1");
    expect(mark).toHaveAttribute("data-mark-index", "0");
    expect(mark).toHaveAttribute("title", "Note");
    expect(mark).toHaveClass("mark");
    expect(mark).not.toHaveClass("markClickable");
    // the tokens are split at the mark's edges, not lost
    expect(mark.querySelector(".token-keyword")?.textContent).toBe("st");
    expect(mark.querySelector(".token-string")?.textContent).toBe('"h');
    expect($(el, "code").textContent).toBe(code);
  });

  it("accepts a JSON attribute, colors and overlapping marks", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block code="abcdefgh" marks='[{"start":0,"end":6,"color":"success","className":"saved"},{"start":2,"end":4,"color":"#f0f"}]'></minerva-code-block>`,
    );
    const list = marks(el);
    expect(list.map((m) => m.textContent)).toEqual(["ab", "cd", "ef"]);
    expect(list.map((m) => m.dataset.markIndex)).toEqual(["0", "1", "0"]);
    expect(list[0]).toHaveClass("saved");
    expect(list[0]).toHaveAttribute("data-mark-color", "success");
    expect(list[0].getAttribute("style")).toContain("var(--success-color)");
    expect(list[1]).not.toHaveAttribute("data-mark-color");
    expect(list[1].getAttribute("style")).toContain("#f0f");
    expect($(el, "code").textContent).toBe("abcdefgh");
  });

  it("cuts marks at line breaks with show-line-numbers", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block show-line-numbers></minerva-code-block>`,
    );
    el.code = "ab\ncd\n";
    el.marks = [{ start: 1, end: 4 }];
    await el.updateComplete;
    expect(marks(el).map((m) => m.textContent)).toEqual(["b", "c"]);
    expect(marks(el).map((m) => m.closest(".line"))).toHaveLength(2);
    expect(el.shadowRoot!.querySelectorAll("[part=line-number]").length).toBe(
      2,
    );
    expect($(el, "code").textContent).toBe("ab\ncd\n");
  });

  it("ignores invalid ranges and copies the raw code", async () => {
    const writeText = mockClipboard(() => Promise.resolve());
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block copyable></minerva-code-block>`,
    );
    el.code = "abc";
    el.marks = [
      { start: 2, end: 2 },
      { start: Number.NaN, end: 1 },
      { start: 1, end: 99 },
    ];
    await el.updateComplete;
    expect(marks(el).map((m) => m.textContent)).toEqual(["bc"]);
    await userEvent.click(copyButton(el));
    await settle();
    expect(writeText).toHaveBeenCalledWith("abc");
  });

  it("fires minerva-mark-click with the topmost mark", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block clickable-marks></minerva-code-block>`,
    );
    const list = [
      { start: 0, end: 4, id: "a" },
      { start: 1, end: 2, id: "b" },
    ];
    el.code = "abcdef";
    el.marks = list;
    await el.updateComplete;
    const onMarkClick = vi.fn();
    el.addEventListener("minerva-mark-click", onMarkClick);
    expect(marks(el)[0]).toHaveClass("markClickable");
    await userEvent.click(marks(el)[1]);
    expect(onMarkClick).toHaveBeenCalledTimes(1);
    const { detail } = onMarkClick.mock.calls[0][0];
    expect(detail.mark).toBe(list[1]);
    expect(detail.originalEvent).toBeInstanceOf(MouseEvent);
    await userEvent.click($(el, "code"));
    expect(onMarkClick).toHaveBeenCalledTimes(1);
  });

  it("maps a selection to code offsets with getSelectionRange", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="js" show-line-numbers></minerva-code-block>`,
    );
    el.code = "let x = 1;\nx++;";
    el.marks = [{ start: 4, end: 5 }];
    await el.updateComplete;
    const code = $(el, "code");
    const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
    const texts: Text[] = [];
    while (walker.nextNode()) texts.push(walker.currentNode as Text);
    const x = texts.find((t) => t.data === "x")!;
    const last = texts[texts.length - 1];
    expect(last.data.endsWith(";")).toBe(true);
    const range = document.createRange();
    range.setStart(x, 0);
    range.setEnd(last, last.data.length);
    expect(el.getSelectionRange(range)).toEqual({
      start: 4,
      end: 15,
      text: "x = 1;\nx++;",
    });
    expect(el.getSelectionRange(null)).toBeNull();
  });
});
