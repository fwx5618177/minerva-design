import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaFormLayout } from "./form-layout";
import "../../elements/form-layout";
import "../../elements/responsive-grid";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-form-layout>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-form-layout")).toBe(MinervaFormLayout);
  });

  it("lays its fields out on the responsive grid", async () => {
    const el = await mount<MinervaFormLayout>(
      `<minerva-form-layout columns="1 2" gap="3" row-gap="5"><input name="a" /></minerva-form-layout>`,
    );
    const root = $(el, ".root");
    expect($(el, ".root > .layout > slot")).not.toBeNull();
    expect(root.style.getPropertyValue("--grid-columns-sm")).toBe("2");
    expect(root.style.getPropertyValue("--grid-columns-lg")).toBe("2");
    expect(root.style.getPropertyValue("--grid-row-gap")).toBe(
      "var(--space-5)",
    );
    expect(root.style.getPropertyValue("--grid-column-gap")).toBe(
      "var(--space-3)",
    );
  });

  it("keeps fields owned by the surrounding native form", async () => {
    document.body.innerHTML = `<form><minerva-form-layout columns="2"><input name="first" value="Ada" /><minerva-grid-item full-width><input name="bio" value="x" /></minerva-grid-item></minerva-form-layout></form>`;
    const form = document.querySelector("form")!;
    const data = new FormData(form);
    expect(data.get("first")).toBe("Ada");
    expect(data.get("bio")).toBe("x");
  });

  it("includes the form layout variables of lib-core", () => {
    const css = (MinervaFormLayout.styles as { cssText?: string }[])
      .map((s) => s.cssText ?? "")
      .join("");
    expect(css).toContain("--form-layout-max-width");
    expect(css).toContain("container");
  });

  it("warns about invalid columns", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-form-layout columns="0"></minerva-form-layout>`);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("minerva-form-layout"),
    );
  });
});
