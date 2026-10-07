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

  it("shows the language label", async () => {
    const el = await mount<MinervaCodeBlock>(
      `<minerva-code-block language="json">{}</minerva-code-block>`,
    );
    expect($(el, "[part=language]").textContent?.trim()).toBe("json");
    expect($(el, "code")).toHaveClass("language-json");
    expect($(el, "code")).toHaveAttribute("data-language", "json");
    expect($(el, ".root")).not.toBeNull();
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
      value: "npm i",
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
    vi.useFakeTimers();
    const ok = await el.copy();
    expect(ok).toBe(false);
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
