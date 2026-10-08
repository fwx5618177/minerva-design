import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaProgress } from "./progress";
import "../../elements/progress";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-progress>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-progress")).toBe(MinervaProgress);
  });

  it("is an unfocusable progressbar named 'Loading' by default", async () => {
    const el = await mount<MinervaProgress>(
      `<minerva-progress></minerva-progress>`,
    );
    const base = $(el, "[part=root]");
    expect(base.classList).toContain("progressIndicator");
    expect(base.classList).toContain("primary");
    expect(base).toHaveAttribute("role", "progressbar");
    expect(base).toHaveAttribute("aria-label", "Loading");
    expect(base).not.toHaveAttribute("aria-valuenow");
    expect(base).not.toHaveAttribute("tabindex");
    const indicator = $(el, "[part=indicator]");
    expect(indicator.classList).toContain("spinner");
    expect(indicator.classList).toContain("medium");
    expect(indicator.querySelector("svg")).not.toBeNull();
    expect(el.getAttribute("variant")).toBeNull();
  });

  it("renders every variant with the React library's classes", async () => {
    const el = await mount<MinervaProgress>(
      `<minerva-progress variant="bar" size="large"></minerva-progress>`,
    );
    expect($(el, ".barContainer.large .bar")).not.toBeNull();
    expect($(el, "[part=root]").classList).toContain("defaultWidth");
    for (const [variant, selector] of [
      ["dottedBar", ".dottedBarContainer .dottedBar"],
      ["wave", ".waveContainer .wave svg"],
      ["circle", ".circle svg"],
    ] as const) {
      el.variant = variant;
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector(selector)).not.toBeNull();
    }
  });

  it("is named by its visible label, or aria-label", async () => {
    const el = await mount<MinervaProgress>(
      `<minerva-progress label="Saving"></minerva-progress>`,
    );
    const base = $(el, "[part=root]");
    expect(base).toHaveAttribute("aria-labelledby", "label");
    expect(base).not.toHaveAttribute("aria-label");
    expect($(el, "#label").textContent).toContain("Saving");
    el.setAttribute("aria-label", "Uploading report");
    await new Promise((r) => setTimeout(r));
    await el.updateComplete;
    expect(base).toHaveAttribute("aria-label", "Uploading report");
    expect(base).not.toHaveAttribute("aria-labelledby");
  });

  it("drops the role when decorative", async () => {
    const el = await mount<MinervaProgress>(
      `<minerva-progress decorative color="current"></minerva-progress>`,
    );
    const base = $(el, "[part=root]");
    expect(base).not.toHaveAttribute("role");
    expect(base).toHaveAttribute("aria-hidden", "true");
    expect(base.classList).toContain("current");
  });

  it("applies width and full", async () => {
    const el = await mount<MinervaProgress>(
      `<minerva-progress variant="bar" width="120px"></minerva-progress>`,
    );
    const base = $(el, "[part=root]");
    expect(base.style.width).toBe("120px");
    expect(base.classList).not.toContain("defaultWidth");
    el.width = undefined;
    el.full = true;
    await el.updateComplete;
    expect(base.classList).toContain("fullWidth");
    expect(el.hasAttribute("full")).toBe(true);
  });

  it("follows the locale", async () => {
    const el = await mount<MinervaProgress>(
      `<minerva-config locale="fr"><minerva-progress></minerva-progress></minerva-config>`,
      "minerva-progress",
    );
    expect($(el, "[part=root]").getAttribute("aria-label")).not.toBe("Loading");
  });

  it("warns when width and full are combined", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-progress full width="10px"></minerva-progress>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("width"));
  });
});
