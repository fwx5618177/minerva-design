import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaLoadingState } from "./loading-state";
import { MinervaProgress } from "../progress/progress";
import "../../elements/loading-state";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-loading-state>", () => {
  it("registers itself and its spinner", () => {
    expect(customElements.get("minerva-loading-state")).toBe(
      MinervaLoadingState,
    );
    expect(customElements.get("minerva-progress")).toBe(MinervaProgress);
  });

  it("is one polite status region with a decorative spinner", async () => {
    const el = await mount<MinervaLoadingState>(
      `<minerva-loading-state></minerva-loading-state>`,
    );
    const base = $(el, "[part=base]");
    expect(base.classList).toContain("loadingState");
    expect(base.classList).toContain("medium");
    expect(base).toHaveAttribute("role", "status");
    expect(base).toHaveAttribute("aria-live", "polite");
    expect(base).toHaveAttribute("aria-atomic", "true");
    expect(base).not.toHaveAttribute("aria-busy");
    const spinner = $<MinervaProgress>(el, "minerva-progress");
    expect(spinner.decorative).toBe(true);
    expect(spinner.color).toBe("current");
    expect($(el, ".label").textContent?.trim()).toBe("Loading...");
  });

  it("uses label and size", async () => {
    const el = await mount<MinervaLoadingState>(
      `<minerva-loading-state label="Fetching orders" size="small"></minerva-loading-state>`,
    );
    expect($(el, ".label").textContent?.trim()).toBe("Fetching orders");
    expect($(el, "[part=base]").classList).toContain("small");
    el.size = "large";
    await el.updateComplete;
    expect(el.getAttribute("size")).toBe("large");
  });

  it("follows the locale", async () => {
    const el = await mount<MinervaLoadingState>(
      `<minerva-config locale="zh"><minerva-loading-state></minerva-loading-state></minerva-config>`,
      "minerva-loading-state",
    );
    expect($(el, ".label").textContent?.trim()).not.toBe("Loading...");
  });

  it("warns about unknown sizes", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(`<minerva-loading-state size="huge"></minerva-loading-state>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("unknown size"));
  });
});
