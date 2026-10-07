import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaIconButton } from "./icon-button";
import "../../elements/icon-button";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
  document.documentElement.removeAttribute("lang");
});

const inner = (el: MinervaIconButton) =>
  el.shadowRoot!.querySelector("button") as HTMLButtonElement;
const tooltip = (el: MinervaIconButton) =>
  el.shadowRoot!.querySelector<HTMLElement>("[role=tooltip]");

describe("<minerva-icon-button>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-icon-button")).toBe(MinervaIconButton);
  });

  it("renders lib-core's classes with the defaults and hides the icon from AT", async () => {
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="Delete"><svg></svg></minerva-icon-button>`,
    );
    const button = inner(el);
    for (const cls of [
      "iconButton",
      "neutral",
      "variant-ghost",
      "medium",
      "circle",
    ]) {
      expect(button.classList).toContain(cls);
    }
    expect(button).toHaveAttribute("aria-label", "Delete");
    expect(button.type).toBe("button");
    const glyph = $(el, ".glyph");
    expect(glyph).toHaveAttribute("aria-hidden", "true");
    expect(glyph.querySelector("slot")).not.toBeNull();
  });

  it("reflects color / variant / size / shape", async () => {
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="A"></minerva-icon-button>`,
    );
    expect(el.getAttribute("color")).toBe("neutral");
    el.color = "danger";
    el.variant = "solid";
    el.size = "xsmall";
    el.shape = "square";
    await el.updateComplete;
    expect(el.getAttribute("variant")).toBe("solid");
    const cls = inner(el).classList;
    expect(cls).toContain("danger");
    expect(cls).toContain("variant-solid");
    expect(cls).toContain("xsmall");
    expect(cls).toContain("square");
  });

  it("label wins over aria-label; aria-label is used otherwise", async () => {
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="Refresh" aria-label="Other"></minerva-icon-button>`,
    );
    expect(inner(el)).toHaveAttribute("aria-label", "Refresh");
    el.label = undefined;
    await el.updateComplete;
    expect(inner(el)).toHaveAttribute("aria-label", "Other");
  });

  it("falls back to a localized default name and warns in development", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    document.documentElement.lang = "en";
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button></minerva-icon-button>`,
    );
    expect(inner(el)).toHaveAttribute("aria-label", "icon button");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("label"));
  });

  it("toggle: activation flips pressed and fires a cancelable event", async () => {
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="Bold" toggle></minerva-icon-button>`,
    );
    expect(inner(el)).toHaveAttribute("aria-pressed", "false");
    const onChange = vi.fn();
    el.addEventListener("minerva-pressed-change", onChange);
    el.focus();
    await userEvent.keyboard("{Enter}");
    await el.updateComplete;
    expect(el.pressed).toBe(true);
    expect(onChange.mock.calls[0][0].detail).toEqual({ pressed: true });
    expect(inner(el)).toHaveAttribute("aria-pressed", "true");
    expect(inner(el).classList).toContain("pressed");
    el.addEventListener("minerva-pressed-change", (e) => e.preventDefault());
    await userEvent.keyboard(" ");
    await el.updateComplete;
    expect(el.pressed).toBe(true);
  });

  it("is not a toggle without the toggle attribute", async () => {
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="A"></minerva-icon-button>`,
    );
    expect(inner(el).hasAttribute("aria-pressed")).toBe(false);
    await userEvent.click(inner(el));
    expect(el.pressed).toBe(false);
  });

  it("loading: spinner, stays focusable, ignores activation", async () => {
    const onClick = vi.fn();
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="Save" loading toggle></minerva-icon-button>`,
    );
    el.addEventListener("click", onClick);
    // .loading sets pointer-events: none (user-event refuses to click): use
    // the keyboard and a programmatic click
    el.focus();
    await userEvent.keyboard("{Enter}");
    inner(el).click();
    expect(onClick).not.toHaveBeenCalled();
    expect(el.pressed).toBe(false);
    expect(inner(el)).toHaveAttribute("aria-busy", "true");
    expect(inner(el)).toHaveAttribute("aria-disabled", "true");
    expect(inner(el).disabled).toBe(false);
    expect($(el, "[role=progressbar]")).toHaveAttribute(
      "aria-label",
      "Loading",
    );
  });

  it("disabled: native disabled, out of the tab order, no click", async () => {
    const onClick = vi.fn();
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="A" disabled></minerva-icon-button>`,
    );
    el.addEventListener("click", onClick);
    el.click();
    expect(onClick).not.toHaveBeenCalled();
    expect(inner(el).disabled).toBe(true);
    expect(inner(el)).toHaveAttribute("tabindex", "-1");
  });

  it("shows the label as a tooltip on focus and closes it on Escape / blur", async () => {
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="Delete"></minerva-icon-button>`,
    );
    expect(tooltip(el)).toBeNull();
    el.focus();
    await settle();
    const tip = tooltip(el)!;
    expect(tip.textContent?.trim()).toBe("Delete");
    expect(tip.classList).toContain("tooltip");
    expect(inner(el)).toHaveAttribute("aria-describedby", "tooltip");
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(tooltip(el)).toBeNull();
    inner(el).blur();
    el.focus();
    await settle();
    expect(tooltip(el)).not.toBeNull();
    inner(el).blur();
    await settle();
    expect(tooltip(el)).toBeNull();
  });

  it("shows the tooltip after a hover delay; tooltip / no-tooltip attributes", async () => {
    const el = await mount<MinervaIconButton>(
      `<minerva-icon-button label="Delete" tooltip="Delete forever"></minerva-icon-button>`,
    );
    await userEvent.hover(inner(el));
    expect(tooltip(el)).toBeNull();
    await wait(250);
    await settle();
    expect(tooltip(el)?.textContent?.trim()).toBe("Delete forever");
    await userEvent.unhover(inner(el));
    await wait(350);
    await settle();
    expect(tooltip(el)).toBeNull();

    el.noTooltip = true;
    await el.updateComplete;
    el.focus();
    await settle();
    expect(tooltip(el)).toBeNull();
  });

  it("submits its form with type=submit, not while loading", async () => {
    document.body.innerHTML = `<form><minerva-icon-button label="Go" type="submit"></minerva-icon-button></form>`;
    const el = document.querySelector<MinervaIconButton>(
      "minerva-icon-button",
    )!;
    await settle();
    const onSubmit = vi.fn((e: Event) => e.preventDefault());
    document.querySelector("form")!.addEventListener("submit", onSubmit);
    await userEvent.click(inner(el));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    el.loading = true;
    await el.updateComplete;
    inner(el).click();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("follows the locale for built-in strings", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const el = await mount<MinervaIconButton>(
      `<minerva-config locale="fr"><minerva-icon-button loading></minerva-icon-button></minerva-config>`,
      "minerva-icon-button",
    );
    expect($(el, "[role=progressbar]").getAttribute("aria-label")).not.toBe(
      "Loading",
    );
  });
});
