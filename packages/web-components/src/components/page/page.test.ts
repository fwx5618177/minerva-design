import { afterEach, describe, expect, it, vi } from "vitest";
import {
  MinervaPage,
  MinervaPageHeader,
  MinervaPageSection,
  MinervaStatCard,
  MinervaToolbar,
} from "./page";
import "../../elements/page";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("page elements", () => {
  it("register", () => {
    expect(customElements.get("minerva-page")).toBe(MinervaPage);
    expect(customElements.get("minerva-page-header")).toBe(MinervaPageHeader);
    expect(customElements.get("minerva-page-section")).toBe(MinervaPageSection);
    expect(customElements.get("minerva-stat-card")).toBe(MinervaStatCard);
    expect(customElements.get("minerva-toolbar")).toBe(MinervaToolbar);
  });

  it("<minerva-page> renders .page with max-width", async () => {
    const el = await mount<MinervaPage>(
      `<minerva-page max-width="960"><p>x</p></minerva-page>`,
    );
    expect($(el, ".page").style.maxWidth).toBe("960px");
    el.maxWidth = "60rem";
    await el.updateComplete;
    expect($(el, ".page").style.maxWidth).toBe("60rem");
  });

  it("<minerva-page-header>: h1, description and actions only when given", async () => {
    const el = await mount<MinervaPageHeader>(
      `<minerva-page-header heading="Books"></minerva-page-header>`,
    );
    expect($(el, "header.header h1").textContent?.trim()).toBe("Books");
    expect(el.shadowRoot!.querySelector("p")).toBeNull();
    expect(el.shadowRoot!.querySelector(".actions")).toBeNull();
    el.description = "All titles";
    el.innerHTML = `<button slot="actions">Add</button>`;
    await settle();
    expect($(el, ".heading p").textContent?.trim()).toBe("All titles");
    expect($(el, ".actions slot[name=actions]")).not.toBeNull();
  });

  it("<minerva-page-header> warns without a heading", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-page-header></minerva-page-header>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("heading"));
  });

  it("<minerva-page-section>: a region labelled by its h2, decorative icon", async () => {
    const el = await mount<MinervaPageSection>(
      `<minerva-page-section heading="Stats"><span slot="icon">*</span><p>body</p></minerva-page-section>`,
    );
    const section = $(el, "section.section");
    const h2 = $(el, "h2");
    expect(section.getAttribute("aria-labelledby")).toBe(h2.id);
    expect(h2.textContent?.trim()).toBe("Stats");
    expect($(el, ".sectionIcon")).toHaveAttribute("aria-hidden", "true");
    expect($(el, ".sectionHeader")).not.toBeNull();
    expect(section.querySelector(":scope > slot:not([name])")).not.toBeNull();
  });

  it("<minerva-toolbar>: role=group named by aria-label, density / nowrap classes", async () => {
    const el = await mount<MinervaToolbar>(
      `<minerva-toolbar aria-label="Filters" density="compact" nowrap><button>A</button></minerva-toolbar>`,
    );
    const group = $(el, "[part=root]");
    expect(group).toHaveAttribute("role", "group");
    expect(group).toHaveAttribute("aria-label", "Filters");
    expect(group.classList).toContain("toolbar");
    expect(group.classList).toContain("compact");
    expect(group.classList).toContain("nowrap");
    el.density = "default";
    el.nowrap = false;
    await el.updateComplete;
    expect(group.classList).not.toContain("compact");
    expect(group.classList).not.toContain("nowrap");
    expect(el.getAttribute("density")).toBe("default");
  });

  it("<minerva-stat-card>: dl with label / value (0 rendered) and description", async () => {
    const el = await mount<MinervaStatCard>(
      `<minerva-stat-card label="Orders" value="0"></minerva-stat-card>`,
    );
    expect($(el, "dt").textContent?.trim()).toBe("Orders");
    expect($(el, "dd").textContent?.trim()).toBe("0");
    expect(el.shadowRoot!.querySelector(".statDescription")).toBeNull();
    expect(el.shadowRoot!.querySelector(".statIcon")).toBeNull();
    el.description = "Last 7 days";
    el.innerHTML = `<svg slot="icon"></svg>`;
    await settle();
    expect($(el, ".statDescription").textContent?.trim()).toBe("Last 7 days");
    expect($(el, ".statIcon")).toHaveAttribute("aria-hidden", "true");
  });
});
