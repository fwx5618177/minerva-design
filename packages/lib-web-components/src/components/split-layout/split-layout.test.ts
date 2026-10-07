import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaSplitLayout } from "./split-layout";
import "../../elements/split-layout";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-split-layout>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-split-layout")).toBe(MinervaSplitLayout);
  });

  it("renders main then aside with lib-core's classes and variables", async () => {
    const el = await mount<MinervaSplitLayout>(
      `<minerva-split-layout><p>Main</p><p slot="aside">Aside</p></minerva-split-layout>`,
    );
    const grid = $(el, ".grid");
    expect(grid.classList).toContain("md");
    expect(grid.classList).toContain("hasAside");
    const cols = Array.from(grid.children).map((c) => c.className);
    expect(cols).toEqual(["main", "aside"]);
    const root = $(el, ".root");
    expect(root.style.getPropertyValue("--split-layout-aside-width")).toBe(
      "320px",
    );
    expect(root.style.getPropertyValue("--split-layout-gap")).toBe(
      "var(--space-6)",
    );
  });

  it("drops the aside column when the slot is empty, and adds it back", async () => {
    const el = await mount<MinervaSplitLayout>(
      `<minerva-split-layout collapse-below="lg" aside-width="280" gap="12px"><p>Main</p></minerva-split-layout>`,
    );
    expect(el.shadowRoot!.querySelector(".aside")).toBeNull();
    expect($(el, ".grid").classList).toContain("lg");
    expect($(el, ".grid").classList).not.toContain("hasAside");
    expect(
      $(el, ".root").style.getPropertyValue("--split-layout-aside-width"),
    ).toBe("280px");
    expect($(el, ".root").style.getPropertyValue("--split-layout-gap")).toBe(
      "12px",
    );
    const aside = document.createElement("div");
    aside.slot = "aside";
    el.append(aside);
    await settle();
    expect(
      el.shadowRoot!.querySelector(".aside slot[name=aside]"),
    ).not.toBeNull();
  });

  it("warns about an invalid aside width and falls back to 320", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const el = await mount<MinervaSplitLayout>(
      `<minerva-split-layout aside-width="-5"></minerva-split-layout>`,
    );
    expect(
      $(el, ".root").style.getPropertyValue("--split-layout-aside-width"),
    ).toBe("320px");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("aside-width"));
  });
});
