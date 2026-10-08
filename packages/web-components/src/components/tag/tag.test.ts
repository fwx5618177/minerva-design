import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaTag } from "./tag";
import "../../elements/tag";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, wait } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-tag>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-tag")).toBe(MinervaTag);
  });

  it("renders the React library's tag classes and defaults", async () => {
    const el = await mount<MinervaTag>(`<minerva-tag>React</minerva-tag>`);
    const base = $(el, "[part=root]");
    for (const cls of ["tag", "neutral", "subtle", "medium", "rounded"]) {
      expect(base.classList).toContain(cls);
    }
    expect(base).toHaveAttribute("data-component", "tag");
    expect(el.shadowRoot!.querySelector("button")).toBeNull();
    expect(el.getAttribute("color")).toBeNull();
  });

  it("names the close button after the label and fires minerva-close", async () => {
    const el = await mount<MinervaTag>(
      `<minerva-tag closable><span slot="icon">#</span>Design</minerva-tag>`,
    );
    const onClose = vi.fn();
    const onClick = vi.fn();
    el.addEventListener("minerva-close", onClose);
    el.addEventListener("click", onClick);
    const close = $<HTMLButtonElement>(el, ".closeIcon");
    expect(close).toHaveAttribute("aria-label", "Remove Design");
    expect(close).toHaveAttribute("title", "Remove Design");
    await userEvent.click(close);
    expect(onClose).toHaveBeenCalledTimes(1);
    // the close click is not the tag's own click
    expect(onClick).not.toHaveBeenCalled();
  });

  it("uses close-label and the plain Close label without text", async () => {
    const el = await mount<MinervaTag>(`<minerva-tag closable></minerva-tag>`);
    expect($(el, ".closeIcon")).toHaveAttribute("aria-label", "Close");
    el.closeLabel = "Delete filter";
    await el.updateComplete;
    expect($(el, ".closeIcon")).toHaveAttribute("aria-label", "Delete filter");
  });

  it("closes with the keyboard and not while disabled", async () => {
    const el = await mount<MinervaTag>(`<minerva-tag closable>A</minerva-tag>`);
    const onClose = vi.fn();
    el.addEventListener("minerva-close", onClose);
    $<HTMLButtonElement>(el, ".closeIcon").focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClose).toHaveBeenCalledTimes(2);
    el.disabled = true;
    await el.updateComplete;
    expect($<HTMLButtonElement>(el, ".closeIcon").disabled).toBe(true);
    $<HTMLButtonElement>(el, ".closeIcon").click();
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("renders a clickable tag as a button activated by Enter / Space with a ripple", async () => {
    const el = await mount<MinervaTag>(
      `<minerva-tag clickable>Go</minerva-tag>`,
    );
    const onClick = vi.fn();
    el.addEventListener("click", onClick);
    el.focus();
    const action = $<HTMLButtonElement>(el, "button.action");
    expect(el.shadowRoot!.activeElement).toBe(action);
    expect(action).not.toHaveAttribute("aria-pressed");
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll(".ripple").length).toBeGreaterThan(
      0,
    );
    await wait(650);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll(".ripple")).toHaveLength(0);
  });

  it("toggles pressed and fires minerva-change", async () => {
    const el = await mount<MinervaTag>(
      `<minerva-tag clickable toggle no-ripple>Filter</minerva-tag>`,
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    const action = $<HTMLButtonElement>(el, "button.action");
    expect(action).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(action);
    expect(el.pressed).toBe(true);
    expect(onChange.mock.calls[0][0].detail).toEqual({ pressed: true });
    await el.updateComplete;
    expect(action).toHaveAttribute("aria-pressed", "true");
    expect($(el, "[part=root]").classList).toContain("pressed");
    expect(el.hasAttribute("pressed")).toBe(true);
  });

  it("blocks the action and hides the close button while loading", async () => {
    const el = await mount<MinervaTag>(
      `<minerva-tag clickable closable loading>x</minerva-tag>`,
    );
    expect($<HTMLButtonElement>(el, "button.action").disabled).toBe(true);
    expect(el.shadowRoot!.querySelector(".closeIcon")).toBeNull();
    expect(el.shadowRoot!.querySelector(".spinner")).not.toBeNull();
    expect($(el, "[part=root]")).toHaveAttribute("aria-busy", "true");
  });

  it("renders icon / avatar slots only when filled", async () => {
    const el = await mount<MinervaTag>(
      `<minerva-tag><img slot="avatar" alt="" />Ada</minerva-tag>`,
    );
    expect(el.shadowRoot!.querySelector(".avatar slot")).not.toBeNull();
    expect(el.shadowRoot!.querySelector(".icon")).toBeNull();
  });

  it("translates the close label", async () => {
    const el = await mount<MinervaTag>(
      `<div lang="fr"><minerva-tag closable>Design</minerva-tag></div>`,
      "minerva-tag",
    );
    expect($(el, ".closeIcon")).toHaveAttribute(
      "aria-label",
      "Supprimer Design",
    );
  });

  it("warns when pressed is used without clickable", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-tag pressed>x</minerva-tag>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("clickable"));
  });
});
