import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaEmpty } from "./empty";
import "../../elements/empty";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-empty>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-empty")).toBe(MinervaEmpty);
  });

  it("renders the default icon and localized description, named by it", async () => {
    const el = await mount<MinervaEmpty>(`<minerva-empty></minerva-empty>`);
    const base = $(el, "[part=base]");
    expect(base.classList).toContain("empty");
    expect(base).toHaveAttribute("role", "status");
    expect(base).toHaveAttribute("aria-labelledby", "description");
    expect(base).not.toHaveAttribute("aria-describedby");
    expect($(el, ".iconWrapper svg.defaultIcon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect($(el, ".description").textContent?.trim()).toBe("No Data");
    expect(el.shadowRoot!.querySelector(".actions")).toBeNull();
    expect(el.shadowRoot!.querySelector(".footer")).toBeNull();
  });

  it("is named by the heading and described by the description", async () => {
    const el = await mount<MinervaEmpty>(
      `<minerva-empty heading="No orders" description="Create one to start"></minerva-empty>`,
    );
    const base = $(el, "[part=base]");
    expect(base).toHaveAttribute("aria-labelledby", "title");
    expect(base).toHaveAttribute("aria-describedby", "description");
    expect($(el, "#title").textContent?.trim()).toBe("No orders");
    expect($(el, "#description").textContent?.trim()).toBe(
      "Create one to start",
    );
  });

  it("prefers aria-label", async () => {
    const el = await mount<MinervaEmpty>(
      `<minerva-empty heading="x" aria-label="Nothing here"></minerva-empty>`,
    );
    const base = $(el, "[part=base]");
    expect(base).toHaveAttribute("aria-label", "Nothing here");
    expect(base).not.toHaveAttribute("aria-labelledby");
  });

  it("renders actions, footer, svg illustration, size and dimensions", async () => {
    const el = await mount<MinervaEmpty>(
      `<minerva-empty use-svg size="small" width="300" height="50%" show-shadow>
        <button slot="action">Create</button>
        <button slot="secondary-action">Import</button>
        <a href="#">Docs</a>
      </minerva-empty>`,
    );
    const base = $(el, "[part=base]");
    expect(base.classList).toContain("sized");
    expect(base.classList).toContain("size-small");
    expect(base.classList).toContain("showShadow");
    expect(base.style.width).toBe("300px");
    expect(base.style.height).toBe("50%");
    expect($(el, ".actions slot[name=action]")).not.toBeNull();
    expect($(el, ".actions slot[name=secondary-action]")).not.toBeNull();
    expect($(el, ".footer slot")).not.toBeNull();
    expect($(el, ".iconWrapper svg").getAttribute("viewBox")).toBe("0 0 64 41");
  });

  it("hides the icon and the description", async () => {
    const el = await mount<MinervaEmpty>(
      `<minerva-empty hide-icon hide-description heading="x"></minerva-empty>`,
    );
    expect(el.shadowRoot!.querySelector(".iconWrapper")).toBeNull();
    expect(el.shadowRoot!.querySelector(".description")).toBeNull();
    expect($(el, "[part=base]")).not.toHaveAttribute("aria-describedby");
  });

  it("follows the locale", async () => {
    const el = await mount<MinervaEmpty>(
      `<div lang="fr"><minerva-empty></minerva-empty></div>`,
      "minerva-empty",
    );
    expect($(el, ".description").textContent?.trim()).toBe("Aucune donnée");
  });

  it("warns when a description is hidden", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(
      `<minerva-empty description="x" hide-description></minerva-empty>`,
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("hide-description"),
    );
  });
});
