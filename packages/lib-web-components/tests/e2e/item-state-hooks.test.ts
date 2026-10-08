// E2E: item state hooks of the web components, driven like a user would
// (keyboard and pointer). Consumers style items rendered in a shadow root
// with `<part>--<state>` part names (`::part(item item--highlighted)`) and
// items that are elements of their own with their custom states. happy-dom
// does not apply `::part()` rules in getComputedStyle, so these tests check
// the part names / custom states that such rules match (the consumer
// stylesheet below is the one a real app would ship), as the interaction
// moves them.
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import "../../src/index";
import { toast } from "../../src/index";
import { customStates } from "../../src/internal/styling-hooks";
import { settle, wait } from "../utils";

const consumerCss = `
minerva-menu::part(item item--highlighted) { color: red; }
minerva-select::part(item item--selected) { background: green; }
minerva-option:state(selected)::part(root) { background: green; }
minerva-pagination::part(item item--current) { color: blue; }
minerva-data-table::part(header-cell header-cell--sort-ascending) { color: green; }
minerva-toast-region::part(toast toast--color-success) { border-color: green; }
`;

afterEach(() => {
  document.body.innerHTML = "";
  document.head.querySelectorAll("style[data-consumer]").forEach((s) => {
    s.remove();
  });
});

async function mountApp(markup: string) {
  const style = document.createElement("style");
  style.dataset.consumer = "";
  style.textContent = consumerCss;
  document.head.append(style);
  document.body.innerHTML = markup;
  await settle();
}

/** Shadow elements of `host` whose part list contains every name */
const withParts = (host: Element, ...names: string[]) =>
  Array.from(host.shadowRoot!.querySelectorAll<HTMLElement>("[part]")).filter(
    (el) => {
      const parts = (el.getAttribute("part") ?? "").split(/\s+/);
      return names.every((name) => parts.includes(name));
    },
  );

const text = (el: Element | undefined) => el?.textContent?.trim();

describe("item state hooks (web components e2e)", () => {
  it("moves item--highlighted with the arrow keys in a menu", async () => {
    await mountApp(`
      <minerva-menu id="menu">
        <button slot="trigger" id="trigger">Actions</button>
        <minerva-menu-item value="edit">Edit</minerva-menu-item>
        <minerva-menu-item value="copy">Duplicate</minerva-menu-item>
        <minerva-menu-checkbox-item value="pin" checked>Pinned</minerva-menu-checkbox-item>
        <minerva-menu-item value="delete" disabled>Delete</minerva-menu-item>
      </minerva-menu>`);
    const menu = document.getElementById("menu")!;
    const user = userEvent.setup();
    document.getElementById("trigger")!.focus();
    await user.keyboard("{ArrowDown}");
    await settle();
    await wait(5);
    expect(withParts(menu, "item", "item--highlighted").map(text)).toEqual([
      "Edit",
    ]);
    // the slotted trigger is styled from the host: :state(open) > [slot=trigger]
    expect(customStates(menu).has("open")).toBe(true);

    await user.keyboard("{ArrowDown}");
    await settle();
    expect(withParts(menu, "item", "item--highlighted").map(text)).toEqual([
      "Duplicate",
    ]);
    expect(withParts(menu, "item", "item--checked").map(text)).toEqual([
      "Pinned",
    ]);
    expect(withParts(menu, "item", "item--disabled").map(text)).toEqual([
      "Delete",
    ]);

    // Space toggles the checkbox item: item--checked -> item--unchecked
    await user.keyboard("{ArrowDown} ");
    await settle();
    expect(withParts(menu, "item", "item--unchecked").map(text)).toEqual([
      "Pinned",
    ]);
    expect(withParts(menu, "item--checked")).toEqual([]);
  });

  it("highlights and selects options rendered from the options property", async () => {
    await mountApp(
      `<minerva-select id="select" label="Language"></minerva-select>`,
    );
    const select = document.getElementById("select") as HTMLElement & {
      options: { value: string; label: string; disabled?: boolean }[];
      value: string;
    };
    select.options = [
      { value: "en", label: "English" },
      { value: "fr", label: "French" },
      { value: "ja", label: "Japanese", disabled: true },
    ];
    select.value = "en";
    await settle();
    const user = userEvent.setup();
    select.shadowRoot!.querySelector<HTMLElement>('[part~="root"]')!.focus();
    await user.keyboard("{Enter}");
    await settle();
    await wait(5);
    expect(withParts(select, "item", "item--selected").map(text)).toEqual([
      "English",
    ]);
    expect(withParts(select, "item", "item--highlighted").map(text)).toEqual([
      "English",
    ]);
    expect(withParts(select, "item", "item--disabled").map(text)).toEqual([
      "Japanese",
    ]);

    await user.keyboard("{ArrowDown}");
    await settle();
    expect(withParts(select, "item", "item--highlighted").map(text)).toEqual([
      "French",
    ]);
    await user.keyboard("{Enter}");
    await settle();
    expect(select.value).toBe("fr");
    // reopen: the selected part moved to French
    await user.keyboard("{Enter}");
    await settle();
    await wait(5);
    expect(withParts(select, "item", "item--selected").map(text)).toEqual([
      "French",
    ]);
  });

  it("exposes :state(selected) / :state(highlighted) on <minerva-option> children", async () => {
    await mountApp(`
      <minerva-select id="select" label="Language" value="en">
        <minerva-option value="en">English</minerva-option>
        <minerva-option value="fr">French</minerva-option>
      </minerva-select>`);
    const select = document.getElementById("select")!;
    const [english, french] = Array.from(
      select.querySelectorAll("minerva-option"),
    );
    expect(customStates(english).has("selected")).toBe(true);
    expect(customStates(french).has("selected")).toBe(false);
    const user = userEvent.setup();
    select.shadowRoot!.querySelector<HTMLElement>('[part~="root"]')!.focus();
    await user.keyboard("{Enter}");
    await settle();
    await wait(5);
    await user.keyboard("{ArrowDown}");
    await settle();
    expect(customStates(french).has("highlighted")).toBe(true);
    expect(customStates(english).has("highlighted")).toBe(false);
    await user.keyboard("{Enter}");
    await settle();
    expect(customStates(french).has("selected")).toBe(true);
    expect(customStates(english).has("selected")).toBe(false);
    // custom states only: no host attribute is added for the hooks
    expect(
      french.getAttributeNames().filter((n) => n.startsWith("state")),
    ).toEqual([]);
  });

  it("moves item--current when the page changes", async () => {
    await mountApp(
      `<minerva-pagination id="pages" total="50"></minerva-pagination>`,
    );
    const pages = document.getElementById("pages")!;
    expect(withParts(pages, "item", "item--current").map(text)).toEqual(["1"]);
    const three = withParts(pages, "item").find((el) => text(el) === "3")!;
    await userEvent.setup().click(three);
    await settle();
    expect(withParts(pages, "item", "item--current").map(text)).toEqual(["3"]);
    expect(
      withParts(pages, "item", "item--current")[0].getAttribute("aria-current"),
    ).toBe("page");
  });

  it("switches header-cell--sort-* when a column is sorted", async () => {
    await mountApp(
      `<minerva-data-table id="table" row-key="id" aria-label="Services"></minerva-data-table>`,
    );
    const table = document.getElementById("table") as HTMLElement & {
      columns: unknown[];
      rows: unknown[];
    };
    table.columns = [
      { key: "name", header: "Service", sortable: true },
      { key: "latency", header: "Latency" },
    ];
    table.rows = [
      { id: 1, name: "billing", latency: 118 },
      { id: 2, name: "auth-api", latency: 42 },
    ];
    await settle();
    expect(
      withParts(table, "header-cell", "header-cell--sort-none"),
    ).toHaveLength(1);
    const sort = withParts(table, "sort-button")[0];
    const user = userEvent.setup();
    await user.click(sort);
    await settle();
    const ascending = withParts(
      table,
      "header-cell",
      "header-cell--sort-ascending",
    );
    expect(ascending).toHaveLength(1);
    expect(ascending[0].getAttribute("aria-sort")).toBe("ascending");
    await user.click(sort);
    await settle();
    expect(withParts(table, "header-cell--sort-ascending")).toEqual([]);
    expect(
      withParts(table, "header-cell", "header-cell--sort-descending"),
    ).toHaveLength(1);
  });

  it("marks toasts with their color and toast--closed while leaving", async () => {
    await mountApp(`<minerva-toast-region id="region"></minerva-toast-region>`);
    const region = document.getElementById("region")!;
    toast.success("Saved");
    toast.info("Heads up");
    await settle();
    expect(
      withParts(region, "toast", "toast--color-success").map((el) =>
        el.textContent?.includes("Saved"),
      ),
    ).toEqual([true]);
    expect(withParts(region, "toast", "toast--open")).toHaveLength(2);
    toast.dismiss();
    await settle();
    await wait(5);
    for (const el of withParts(region, "toast")) {
      expect(el.getAttribute("part")).not.toContain("toast--open");
    }
  });
});
