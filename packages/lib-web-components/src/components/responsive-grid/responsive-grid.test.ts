import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaGridItem, MinervaResponsiveGrid } from "./responsive-grid";
import "../../elements/responsive-grid";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const root = (el: Element) => $(el, ".root");
const v = (el: Element, name: string) => root(el).style.getPropertyValue(name);

describe("<minerva-responsive-grid>", () => {
  it("registers both tags", () => {
    expect(customElements.get("minerva-responsive-grid")).toBe(
      MinervaResponsiveGrid,
    );
    expect(customElements.get("minerva-grid-item")).toBe(MinervaGridItem);
  });

  it("renders lib-core's root / layout with default variables", async () => {
    const el = await mount<MinervaResponsiveGrid>(
      `<minerva-responsive-grid><div>a</div></minerva-responsive-grid>`,
    );
    expect($(el, ".root > .layout > slot")).not.toBeNull();
    for (const bp of ["base", "sm", "md", "lg"]) {
      expect(v(el, `--grid-columns-${bp}`)).toBe("1");
    }
    expect(v(el, "--grid-row-gap")).toBe("var(--space-4)");
    expect(v(el, "--grid-column-gap")).toBe("var(--space-4)");
  });

  it("accepts a number, a list (base sm md lg) and JSON; missing breakpoints inherit", async () => {
    const el = await mount<MinervaResponsiveGrid>(
      `<minerva-responsive-grid columns="3"></minerva-responsive-grid>`,
    );
    expect(v(el, "--grid-columns-lg")).toBe("3");
    el.setAttribute("columns", "1 2 4");
    await el.updateComplete;
    expect(v(el, "--grid-columns-sm")).toBe("2");
    expect(v(el, "--grid-columns-md")).toBe("4");
    expect(v(el, "--grid-columns-lg")).toBe("4");
    el.setAttribute("columns", '{"base":2,"md":6}');
    await el.updateComplete;
    expect(v(el, "--grid-columns-sm")).toBe("2");
    expect(v(el, "--grid-columns-md")).toBe("6");
    el.columns = { lg: 12 };
    await el.updateComplete;
    expect(v(el, "--grid-columns-base")).toBe("1");
    expect(v(el, "--grid-columns-lg")).toBe("12");
  });

  it("gap / row-gap / column-gap", async () => {
    const el = await mount<MinervaResponsiveGrid>(
      `<minerva-responsive-grid gap="2" column-gap="10px"></minerva-responsive-grid>`,
    );
    expect(v(el, "--grid-row-gap")).toBe("var(--space-2)");
    expect(v(el, "--grid-column-gap")).toBe("10px");
  });

  it("warns about invalid column counts and keeps the previous one", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaResponsiveGrid>(
      `<minerva-responsive-grid columns="2 13"></minerva-responsive-grid>`,
    );
    expect(v(el, "--grid-columns-sm")).toBe("2");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("1 to 12"));
  });

  it("grid items reflect full-width", async () => {
    const el = await mount<MinervaResponsiveGrid>(
      `<minerva-responsive-grid><minerva-grid-item full-width>x</minerva-grid-item></minerva-responsive-grid>`,
    );
    const item = el.querySelector<MinervaGridItem>("minerva-grid-item")!;
    expect(item.fullWidth).toBe(true);
    item.fullWidth = false;
    await settle();
    expect(item.hasAttribute("full-width")).toBe(false);
    expect(item.shadowRoot!.querySelector("slot")).not.toBeNull();
  });
});
