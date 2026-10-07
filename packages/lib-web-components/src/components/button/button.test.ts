import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaButton } from "./button";
import "../../elements/button";
import { resetDevWarnings } from "../../internal/dev";
import { mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const inner = (el: MinervaButton) =>
  el.shadowRoot!.querySelector("button") as HTMLButtonElement;

describe("<minerva-button>", () => {
  it("registers once (idempotent define)", async () => {
    expect(customElements.get("minerva-button")).toBe(MinervaButton);
    const { defineElement } = await import("../../internal/define");
    expect(() => defineElement(MinervaButton)).not.toThrow();
  });

  it("renders lib-core's button classes for color / variant / size", async () => {
    const el = await mount<MinervaButton>(
      `<minerva-button color="danger" variant="outline" size="large">Delete</minerva-button>`,
    );
    const button = inner(el);
    expect(button.className).toContain("customButton");
    expect(button.classList).toContain("danger");
    expect(button.classList).toContain("variant-outline");
    expect(button.classList).toContain("large");
    expect(button.type).toBe("button");
    expect(el.textContent).toBe("Delete");
  });

  it("uses the shared lib-core stylesheet (same CSS variable contract)", () => {
    const css = MinervaButton.styles
      ?.toString()
      .concat(
        (MinervaButton.styles as { cssText?: string }[])
          .map((s) => s.cssText ?? "")
          .join(""),
      );
    expect(css).toContain(".customButton");
    expect(css).toContain("--button-height");
    expect(css).toContain(".variant-solid");
  });

  it("reflects properties to attributes and defaults", async () => {
    const el = await mount<MinervaButton>(`<minerva-button>x</minerva-button>`);
    expect(el.getAttribute("color")).toBe("primary");
    expect(el.getAttribute("variant")).toBe("solid");
    el.variant = "ghost";
    el.fullWidth = true;
    await el.updateComplete;
    expect(el.getAttribute("variant")).toBe("ghost");
    expect(el.hasAttribute("full-width")).toBe(true);
    expect(inner(el).classList).toContain("fullWidth");
  });

  it("forwards aria-label and aria-pressed to the inner button", async () => {
    const el = await mount<MinervaButton>(
      `<minerva-button aria-label="Bold" aria-pressed="true">B</minerva-button>`,
    );
    expect(inner(el)).toHaveAttribute("aria-label", "Bold");
    expect(inner(el)).toHaveAttribute("aria-pressed", "true");
    el.setAttribute("aria-label", "Italic");
    await settle(); // the attribute observer reacts asynchronously
    expect(inner(el)).toHaveAttribute("aria-label", "Italic");
  });

  it("resolves aria-labelledby to text (ids do not cross the shadow root)", async () => {
    const el = await mount<MinervaButton>(
      `<span id="lbl">Save draft</span><minerva-button aria-labelledby="lbl">S</minerva-button>`,
      "minerva-button",
    );
    expect(inner(el)).toHaveAttribute("aria-label", "Save draft");
  });

  it("blocks clicks while loading but stays focusable", async () => {
    const onClick = vi.fn();
    const el = await mount<MinervaButton>(
      `<minerva-button loading>Save</minerva-button>`,
    );
    el.addEventListener("click", onClick);
    await userEvent.click(inner(el));
    expect(onClick).not.toHaveBeenCalled();
    expect(inner(el)).toHaveAttribute("aria-busy", "true");
    expect(inner(el)).toHaveAttribute("aria-disabled", "true");
    expect(inner(el).disabled).toBe(false);
    expect(el.shadowRoot!.querySelector(".loadingSpinner")).not.toBeNull();
  });

  it("does not fire click when disabled", async () => {
    const onClick = vi.fn();
    const el = await mount<MinervaButton>(
      `<minerva-button disabled>Save</minerva-button>`,
    );
    el.addEventListener("click", onClick);
    el.click();
    expect(onClick).not.toHaveBeenCalled();
    expect(inner(el).disabled).toBe(true);
  });

  it("shows the loading slot instead of the label", async () => {
    const el = await mount<MinervaButton>(
      `<minerva-button loading>Save<span slot="loading">Saving…</span></minerva-button>`,
    );
    expect(el.shadowRoot!.querySelector("slot[name=loading]")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("slot:not([name])")).toBeNull();
  });

  it("only renders icon wrappers for filled icon slots", async () => {
    const el = await mount<MinervaButton>(
      `<minerva-button><span slot="start">+</span>Add</minerva-button>`,
    );
    expect(el.shadowRoot!.querySelector("slot[name=start]")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("slot[name=end]")).toBeNull();
  });

  it("applies numeric and preset border radius", async () => {
    const el = await mount<MinervaButton>(
      `<minerva-button border-radius="6">x</minerva-button>`,
    );
    expect(inner(el).style.borderRadius).toBe("6px");
    el.borderRadius = "large";
    await el.updateComplete;
    expect(inner(el).classList).toContain("borderRadiusLarge");
  });

  it("submits and resets its form (type=submit / reset)", async () => {
    document.body.innerHTML = `<form><input name="q" value="a" /><minerva-button type="submit">Go</minerva-button><minerva-button type="reset">Reset</minerva-button></form>`;
    const form = document.querySelector("form")!;
    const [submit, reset] = Array.from(
      document.querySelectorAll<MinervaButton>("minerva-button"),
    );
    await submit.updateComplete;
    await reset.updateComplete;
    const onSubmit = vi.fn((e: Event) => e.preventDefault());
    form.addEventListener("submit", onSubmit);
    await userEvent.click(inner(submit));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    const input = form.querySelector("input")!;
    input.value = "changed";
    await userEvent.click(inner(reset));
    expect(input.value).toBe("a");
  });

  it("activates with the keyboard and delegates focus()", async () => {
    const onClick = vi.fn();
    const el = await mount<MinervaButton>(
      `<minerva-button>Go</minerva-button>`,
    );
    el.addEventListener("click", onClick);
    el.focus();
    expect(el.shadowRoot!.activeElement).toBe(inner(el));
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("warns in development about icon-only circle buttons without a name", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount<MinervaButton>(
      `<minerva-button shape="circle"></minerva-button>`,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("aria-label"));
  });
});
