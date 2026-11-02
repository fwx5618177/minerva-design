import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { CodeBlock } from ".";

const setClipboard = (writeText: unknown) =>
  Object.defineProperty(navigator, "clipboard", {
    value: writeText === undefined ? undefined : { writeText },
    configurable: true,
  });

afterEach(() => {
  setClipboard(undefined);
});

describe("CodeBlock", () => {
  it("renders a focusable named region with the code verbatim", () => {
    const wrapper = mount(CodeBlock, {
      props: { code: "<b>a</b>\n  b" },
      attrs: { class: "mine", id: "c" },
    });
    const pre = wrapper.get("pre");
    expect(wrapper.element).toBe(pre.element);
    expect(pre.attributes("role")).toBe("region");
    expect(pre.attributes("tabindex")).toBe("0");
    expect(pre.attributes("aria-label")).toBe("Code");
    expect(pre.attributes("data-wrap")).toBe("true");
    expect(pre.attributes("id")).toBe("c");
    expect(pre.attributes("data-part")).toBe("region");
    expect(pre.classes()).toEqual(
      expect.arrayContaining(["codeBlock", "mine"]),
    );
    expect((pre.element as HTMLElement).style.maxHeight).toBe("24rem");
    const code = wrapper.get("code");
    expect(code.element.textContent).toBe("<b>a</b>\n  b");
    expect(code.find("b").exists()).toBe(false);
  });

  it("renders the slot text and region attributes", () => {
    const wrapper = mount(CodeBlock, {
      props: { wrap: false, maxHeight: 200 },
      attrs: {
        "aria-labelledby": "t",
        "aria-describedby": "d",
        tabindex: -1,
        style: { maxHeight: "10px" },
      },
      slots: { default: "npm i" },
    });
    const pre = wrapper.get("pre");
    expect(pre.text()).toBe("npm i");
    expect(pre.attributes("aria-label")).toBeUndefined();
    expect(pre.attributes("aria-labelledby")).toBe("t");
    expect(pre.attributes("aria-describedby")).toBe("d");
    expect(pre.attributes("tabindex")).toBe("-1");
    expect(pre.attributes("data-wrap")).toBe("false");
    expect((pre.element as HTMLElement).style.maxHeight).toBe("10px");
    const px = mount(CodeBlock, { props: { code: "x", maxHeight: 200 } });
    expect((px.element as HTMLElement).style.maxHeight).toBe("200px");
    expect(mount(CodeBlock).get("code").text()).toBe("");
  });

  it("wraps the region with a copy button when copyable", () => {
    const wrapper = mount(CodeBlock, {
      props: { code: "x", copyable: true },
      attrs: { class: "mine", id: "w", "aria-label": "Snippet" },
    });
    expect(wrapper.element.tagName).toBe("DIV");
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["root", "mine"]));
    expect(wrapper.attributes("id")).toBe("w");
    expect(wrapper.attributes("data-part")).toBe("root");
    expect(wrapper.attributes("aria-label")).toBeUndefined();
    const pre = wrapper.get("pre");
    expect(pre.attributes("aria-label")).toBe("Snippet");
    expect(pre.classes()).toEqual(
      expect.arrayContaining(["codeBlock", "copyable"]),
    );
    const button = wrapper.get("button");
    expect(button.attributes("aria-label")).toBe("Copy code");
    expect(wrapper.get('[aria-live="polite"]').text()).toBe("");
  });

  it("copies to the clipboard, emits copied and resets the feedback", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    const wrapper = mount(CodeBlock, {
      props: { code: "npm i", copyable: true },
    });
    await wrapper.get("button").trigger("click");
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith("npm i");
    expect(wrapper.emitted("copied")).toEqual([["npm i"]]);
    expect(wrapper.get('[aria-live="polite"]').text()).toBe("Copied");
    expect(wrapper.get("button").attributes("aria-label")).toBe("Copied");
    vi.advanceTimersByTime(2000);
    await flushPromises();
    expect(wrapper.get('[aria-live="polite"]').text()).toBe("");
  });

  it("copies the rendered slot text", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    const wrapper = mount(CodeBlock, {
      props: { copyable: true },
      slots: { default: "slot text" },
    });
    await wrapper.get("button").trigger("click");
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith("slot text");
  });

  it("reports failures (no clipboard, rejected write)", async () => {
    const wrapper = mount(CodeBlock, { props: { code: "x", copyable: true } });
    await wrapper.get("button").trigger("click");
    await flushPromises();
    expect(wrapper.get('[aria-live="polite"]').text()).toBe("Copy failed");
    setClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    const rejected = mount(CodeBlock, { props: { code: "x", copyable: true } });
    await rejected.get("button").trigger("click");
    await flushPromises();
    expect(rejected.get('[aria-live="polite"]').text()).toBe("Copy failed");
    expect(rejected.emitted("copied")).toBeUndefined();
  });

  it("ignores a copy resolving after unmount", async () => {
    vi.useFakeTimers();
    let resolve!: () => void;
    setClipboard(vi.fn(() => new Promise<void>((r) => (resolve = r))));
    const wrapper = mount(CodeBlock, { props: { code: "x", copyable: true } });
    await wrapper.get("button").trigger("click");
    wrapper.unmount();
    resolve();
    await flushPromises();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("CodeBlock highlighting", () => {
  const json = '{\n  "id": 42,\n  "ok": true\n}';

  it("renders plain text without a language", () => {
    const code = mount(CodeBlock, { props: { code: json } }).get("code");
    expect(code.element.children).toHaveLength(0);
    expect(code.element.textContent).toBe(json);
    expect(code.attributes("data-language")).toBeUndefined();
  });

  it("renders token spans with the token classes, keeping the text verbatim", () => {
    const code = mount(CodeBlock, {
      props: { code: json, language: "json" },
    }).get("code");
    expect(code.classes()).toContain("language-json");
    expect(code.element.textContent).toBe(json);
    expect(code.findAll(".token-property").map((s) => s.text())).toEqual([
      '"id"',
      '"ok"',
    ]);
    expect(code.get(".token-number").text()).toBe("42");
    expect(code.get(".token-boolean").text()).toBe("true");
  });

  it("highlights the slot text and never parses it as HTML", () => {
    const text = '<img src=x onerror="alert(1)">';
    const wrapper = mount(CodeBlock, {
      props: { language: "html" },
      slots: { default: () => text },
    });
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.get("code").element.textContent).toBe(text);
    expect(wrapper.get(".token-tag").text()).toBe("img");
  });

  it("highlight=false renders plain text", () => {
    const code = mount(CodeBlock, {
      props: { code: json, language: "json", highlight: false },
    }).get("code");
    expect(code.find("span").exists()).toBe(false);
    expect(code.attributes("data-language")).toBe("json");
  });

  it("numbers the lines in an aria-hidden gutter outside the text", () => {
    const text = "a\nb\n\nc\n";
    const code = mount(CodeBlock, {
      props: { code: text, language: "js", showLineNumbers: true },
    }).get("code");
    const numbers = code.findAll(".lineNumber");
    expect(numbers.map((n) => n.attributes("data-line"))).toEqual([
      "1",
      "2",
      "3",
      "4",
    ]);
    expect(numbers.every((n) => n.attributes("aria-hidden") === "true")).toBe(
      true,
    );
    expect(code.element.textContent).toBe(text);
    expect(
      (code.element as HTMLElement).style.getPropertyValue(
        "--code-line-digits",
      ),
    ).toBe("2");
  });

  it("shows the language label only with showLanguage and copies the raw text", async () => {
    expect(
      mount(CodeBlock, { props: { code: json, language: "json" } }).element
        .tagName,
    ).toBe("PRE");
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    const wrapper = mount(CodeBlock, {
      props: {
        code: json,
        language: "json",
        showLanguage: true,
        showLineNumbers: true,
        copyable: true,
      },
    });
    expect(wrapper.element.tagName).toBe("DIV");
    expect(wrapper.get(".language").text()).toBe("JSON");
    expect(wrapper.get(".language").attributes("aria-hidden")).toBe("true");
    await wrapper.get("button").trigger("click");
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith(json);
    const labelOnly = mount(CodeBlock, {
      props: { code: "x", language: "sh", showLanguage: true },
    });
    expect(labelOnly.find("button").exists()).toBe(false);
    expect(labelOnly.find('[aria-live="polite"]').exists()).toBe(false);
  });
});
