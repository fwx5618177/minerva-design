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
