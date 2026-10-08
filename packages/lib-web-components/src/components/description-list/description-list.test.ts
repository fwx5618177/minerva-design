import { afterEach, describe, expect, it, vi } from "vitest";
import { html } from "lit";
import {
  MinervaDescriptionItem,
  MinervaDescriptionList,
} from "./description-list";
import "../../elements/description-list";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const rows = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>("dl > .row"));

describe("<minerva-description-list>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-description-list")).toBe(
      MinervaDescriptionList,
    );
    expect(customElements.get("minerva-description-item")).toBe(
      MinervaDescriptionItem,
    );
  });

  it("renders items as dt / dd rows of a native dl", async () => {
    const el = await mount<MinervaDescriptionList>(
      `<minerva-description-list></minerva-description-list>`,
    );
    el.items = [
      { key: "owner", label: "Owner", value: "Ada" },
      { key: "count", label: "Count", value: 0 },
      { key: "id", label: "ID", value: html`<code>abc</code>` },
    ];
    await el.updateComplete;
    expect($(el, "dl").classList).toContain("descriptionList");
    const all = rows(el);
    expect(all).toHaveLength(3);
    expect(all[0].querySelector("dt")!.textContent).toBe("Owner");
    expect(all[0].querySelector("dd")!.textContent).toBe("Ada");
    expect(all[1].querySelector("dd")!.textContent).toBe("0");
    expect(all[2].querySelector("dd code")).not.toBeNull();
  });

  it("renders declarative items after the property items", async () => {
    const el = await mount<MinervaDescriptionList>(
      `<minerva-description-list>
        <minerva-description-item label="Status">Active</minerva-description-item>
        <minerva-description-item label="Region"><b>EU</b></minerva-description-item>
      </minerva-description-list>`,
    );
    el.items = [{ label: "Name", value: "Prod" }];
    await settle();
    const all = rows(el);
    expect(all).toHaveLength(3);
    expect(all[1].querySelector("dt")!.textContent).toBe("Status");
    const slot = all[2].querySelector<HTMLSlotElement>("dd slot")!;
    expect(slot.assignedElements()[0]).toBe(el.children[1]);
  });

  it("follows added items and label changes", async () => {
    const el = await mount<MinervaDescriptionList>(
      `<minerva-description-list><minerva-description-item label="A">1</minerva-description-item></minerva-description-list>`,
    );
    const item = document.createElement("minerva-description-item");
    item.label = "B";
    item.textContent = "2";
    el.append(item);
    await settle();
    expect(rows(el)).toHaveLength(2);
    (el.children[0] as MinervaDescriptionItem).label = "A2";
    await settle();
    expect(rows(el)[0].querySelector("dt")!.textContent).toBe("A2");
  });

  it("warns about unsupported children", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(
      `<minerva-description-list><p>x</p></minerva-description-list>`,
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("minerva-description-item"),
    );
  });
  it("applies the bordered / striped variants (reflected)", async () => {
    const el = await mount<MinervaDescriptionList>(
      `<minerva-description-list></minerva-description-list>`,
    );
    const dl = $(el, "dl");
    expect(el.bordered).toBe(false);
    expect(el.striped).toBe(false);
    expect(dl.classList).not.toContain("bordered");
    el.bordered = true;
    el.striped = true;
    await el.updateComplete;
    expect(el).toHaveAttribute("bordered");
    expect(el).toHaveAttribute("striped");
    expect(dl.classList).toContain("descriptionList");
    expect(dl.classList).toContain("bordered");
    expect(dl.classList).toContain("striped");
  });
});
