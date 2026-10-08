import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaList, MinervaListItem } from "./list";
import "../../elements/list";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

/** Role exposed by the host (ElementInternals, or the attribute fallback). */
const roleOf = (el: HTMLElement) =>
  ((el as unknown as { _internals?: ElementInternals })._internals?.role ??
    (el as unknown as { internals?: ElementInternals }).internals?.role ??
    el.getAttribute("role")) as string | null;

describe("<minerva-list>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-list")).toBe(MinervaList);
    expect(customElements.get("minerva-list-item")).toBe(MinervaListItem);
  });

  it("exposes list / listitem roles on the hosts", async () => {
    const el = await mount<MinervaList>(
      `<minerva-list><minerva-list-item primary="A"></minerva-list-item></minerva-list>`,
    );
    expect(roleOf(el)).toBe("list");
    expect(roleOf(el.querySelector("minerva-list-item")!)).toBe("listitem");
  });

  it("renders lib-core's list classes, density and dividers", async () => {
    const el = await mount<MinervaList>(`<minerva-list></minerva-list>`);
    const base = $(el, "[part=root]");
    expect(base.classList).toContain("list");
    expect(base.classList).toContain("dividers");
    expect(base.classList).not.toContain("compact");
    expect(el.getAttribute("density")).toBeNull();
    el.density = "compact";
    el.noDividers = true;
    await el.updateComplete;
    expect(base.classList).toContain("compact");
    expect(base.classList).not.toContain("dividers");
    expect(el.hasAttribute("no-dividers")).toBe(true);
    const css = (MinervaList.styles as { cssText?: string }[])
      .map((s) => s.cssText ?? "")
      .join("");
    expect(css).toContain("--_minerva-list-item-min-height");
    expect(css).toContain("::slotted(minerva-list-item:not(:first-child))");
  });

  it("renders an item's primary / secondary / icon / actions", async () => {
    const el = await mount<MinervaListItem>(
      `<minerva-list-item primary="Invoice #12" secondary="Due today">
        <svg slot="icon"></svg>
        <button slot="actions">Pay</button>
      </minerva-list-item>`,
    );
    expect($(el, "[part=root]").classList).toContain("item");
    expect($(el, ".primary").textContent?.trim()).toBe("Invoice #12");
    expect($(el, ".secondary").textContent?.trim()).toBe("Due today");
    expect($(el, ".icon")).toHaveAttribute("aria-hidden", "true");
    expect($(el, ".actions slot[name=actions]")).not.toBeNull();
  });

  it("skips empty optional parts and renders 0 as secondary content", async () => {
    const el = await mount<MinervaListItem>(
      `<minerva-list-item>Plain</minerva-list-item>`,
    );
    expect(el.shadowRoot!.querySelector(".secondary")).toBeNull();
    expect(el.shadowRoot!.querySelector(".icon")).toBeNull();
    expect(el.shadowRoot!.querySelector(".actions")).toBeNull();
    el.secondary = "0";
    await el.updateComplete;
    expect($(el, ".secondary").textContent?.trim()).toBe("0");
  });

  it("warns about non-item children", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-list><li>x</li></minerva-list>`);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("minerva-list-item"),
    );
  });
});
