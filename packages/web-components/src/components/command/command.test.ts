import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement, getLayerStack } from "@minerva/core";
import {
  MinervaCommandDialog,
  matchesShortcut,
  normalizeShortcuts,
  type CommandItem,
} from "../../elements/command";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";

const ITEMS: CommandItem[] = [
  { id: "books", title: "Books", description: "/books", group: "Content" },
  { id: "users", title: "Users", description: "/users", group: "Admin" },
  { id: "seo", title: "SEO", keywords: "meta sitemap" },
  { id: "hidden", title: "Hidden", disabled: true },
];

const key = (
  k: string,
  mods: Partial<
    Record<"metaKey" | "ctrlKey" | "shiftKey" | "altKey", boolean>
  > = {},
) => ({
  key: k,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  ...mods,
});

const panel = (el: MinervaCommandDialog) =>
  el.shadowRoot!.querySelector<HTMLElement>("[part=content]");
const input = (el: MinervaCommandDialog) =>
  $<HTMLInputElement>(el, "[role=combobox]");
const options = (el: MinervaCommandDialog) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>("[role=option]"));
const selected = (el: MinervaCommandDialog) =>
  options(el).findIndex((o) => o.getAttribute("aria-selected") === "true");

/** Mounts a palette (optionally open) with ITEMS. */
const setup = async (attrs = "open", before = "") => {
  const el = await mount<MinervaCommandDialog>(
    `${before}<minerva-command-dialog ${attrs}></minerva-command-dialog>`,
    "minerva-command-dialog",
  );
  el.items = ITEMS;
  await settle();
  return el;
};

afterEach(() => {
  resetDevWarnings();
  vi.restoreAllMocks();
  document.documentElement.lang = "";
  document.body.innerHTML = "";
});

describe("Command shortcut helpers", () => {
  it("ignores empty runtime shortcut values", () => {
    expect(
      normalizeShortcuts(["mod+k", undefined as unknown as string, "", "  "]),
    ).toEqual(["mod+k"]);
    expect(normalizeShortcuts("ctrl+p")).toEqual(["ctrl+p"]);
    expect(normalizeShortcuts(undefined)).toEqual([]);
  });

  it("matches mod with meta or ctrl and checks every modifier", () => {
    expect(matchesShortcut(key("k", { metaKey: true }), undefined)).toBe(false);
    expect(matchesShortcut(key("k", { metaKey: true }), "mod+k")).toBe(true);
    expect(matchesShortcut(key("k", { ctrlKey: true }), "mod+k")).toBe(true);
    expect(matchesShortcut(key("k"), "mod+k")).toBe(false);
    expect(matchesShortcut(key("K", { ctrlKey: true }), "Ctrl + K")).toBe(true);
    expect(matchesShortcut(key("k", { metaKey: true }), "ctrl+k")).toBe(false);
    expect(matchesShortcut(key("k", { ctrlKey: true }), "cmd+k")).toBe(false);
    expect(matchesShortcut(key("k", { metaKey: true }), "meta+k")).toBe(true);
    expect(matchesShortcut(key("p"), "shift+p")).toBe(false);
    expect(matchesShortcut(key("p", { shiftKey: true }), "shift+p")).toBe(true);
    expect(matchesShortcut(key("p"), "option+p")).toBe(false);
    expect(matchesShortcut(key("p", { altKey: true }), "alt+p")).toBe(true);
    expect(matchesShortcut(key("j", { metaKey: true }), "mod+k")).toBe(false);
    expect(matchesShortcut(key("k"), "  ")).toBe(false);
  });
});

describe("<minerva-command-dialog>", () => {
  it("is registered and closed by default", async () => {
    expect(customElements.get("minerva-command-dialog")).toBe(
      MinervaCommandDialog,
    );
    const el = await setup("");
    expect(el.open).toBe(false);
    expect(el.maxResults).toBe(12);
    expect(panel(el)).toBeNull();
  });

  it("renders the palette with localized defaults and the shortcut label", async () => {
    const el = await setup('open shortcut-label="⌘K"');
    const dialog = panel(el)!;
    expect(dialog).toHaveAttribute("role", "dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog.classList).toContain("dialog");
    expect(dialog.classList).toContain("large");
    expect($(el, "#title").textContent).toContain("Command palette");
    expect(dialog.getAttribute("aria-labelledby")).toBe("title");
    expect($(el, "#description").textContent?.trim()).toBe(
      "Search and jump to modules, settings pages or actions.",
    );
    expect($(el, "kbd.kbd").textContent).toBe("⌘K");
    expect(el.shadowRoot!.querySelector(".close")).toBeNull();
    const combo = input(el);
    expect(combo).toHaveAttribute(
      "aria-label",
      "Search commands, paths or keywords",
    );
    expect(combo).toHaveAttribute(
      "placeholder",
      "Search commands, paths or keywords",
    );
    const listbox = $(el, "[role=listbox]");
    expect(listbox).toHaveAttribute("aria-label", "Command results");
    expect(combo).toHaveAttribute("aria-controls", listbox.id);
    expect(combo).toHaveAttribute("aria-expanded", "true");
    expect(combo).toHaveAttribute("aria-autocomplete", "list");
    expect($(el, "kbd.enterHint").textContent).toBe("Enter");
    // Disabled items are never listed.
    expect(options(el).map((o) => o.textContent?.replace(/\s+/g, ""))).toEqual([
      "Books/booksContent",
      "Users/usersAdmin",
      "SEO",
    ]);
    expect(options(el)[0]).toHaveAttribute("aria-selected", "true");
    expect(options(el)[0].classList).toContain("item");
    expect(combo).toHaveAttribute("aria-activedescendant", options(el)[0].id);
    expect($(el, ".group").textContent).toBe("Content");
  });

  it("focuses the search input when opened", async () => {
    const el = await setup();
    expect(getActiveElement()).toBe(input(el));
  });

  it("filters by title, description, group and keywords, and shows the empty text", async () => {
    const el = await setup('open empty-text="Nothing here"');
    await userEvent.type(input(el), "sitemap");
    await settle();
    expect(options(el).map((o) => o.textContent?.trim())).toEqual(["SEO"]);
    await userEvent.type(input(el), "{Backspace>7/}  ADMIN ");
    await settle();
    expect(options(el)).toHaveLength(1);
    await userEvent.type(input(el), "{Backspace>8/}hidden");
    await settle();
    expect(options(el)).toHaveLength(0);
    expect($(el, ".empty").textContent?.trim()).toBe("Nothing here");
    expect(input(el)).not.toHaveAttribute("aria-activedescendant");
    // Enter with no result does nothing.
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(el.open).toBe(true);
  });

  it("limits the results with max-results", async () => {
    const el = await setup('open max-results="2"');
    expect(el.maxResults).toBe(2);
    expect(options(el)).toHaveLength(2);
  });

  it("uses a custom filter for non-empty queries", async () => {
    const el = await setup('open max-results="1"');
    const filter = vi.fn((items: CommandItem[], query: string) =>
      items
        .filter((item) => item.title.toLowerCase().includes(query))
        .reverse(),
    );
    el.filter = filter;
    await settle();
    expect(options(el)).toHaveLength(1);
    expect(filter).not.toHaveBeenCalled();
    input(el).focus();
    await userEvent.keyboard(" s ");
    await settle();
    expect(filter).toHaveBeenLastCalledWith(
      ITEMS.filter((item) => !item.disabled),
      "s",
    );
    expect(options(el)).toHaveLength(1);
    expect(options(el)[0]).toHaveTextContent("SEO");
  });

  it("navigates with arrows / Home / End, selects with Enter and closes", async () => {
    const el = await setup();
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    el.addEventListener("minerva-select", (e) =>
      onSelect((e as CustomEvent).detail),
    );
    el.addEventListener("minerva-open-change", (e) =>
      onOpenChange((e as CustomEvent).detail),
    );
    input(el).focus();
    await userEvent.keyboard("{ArrowUp}");
    await settle();
    expect(selected(el)).toBe(0);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    await settle();
    expect(selected(el)).toBe(2);
    await userEvent.keyboard("{Home}");
    await settle();
    expect(selected(el)).toBe(0);
    await userEvent.keyboard("{End}");
    await settle();
    expect(selected(el)).toBe(2);
    await userEvent.keyboard("{ArrowUp}");
    await settle();
    expect(input(el)).toHaveAttribute(
      "aria-activedescendant",
      options(el)[1].id,
    );
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(onSelect).toHaveBeenCalledWith({ value: "users", item: ITEMS[1] });
    expect(onOpenChange).toHaveBeenCalledWith({
      open: false,
      reason: "select",
    });
    expect(el.open).toBe(false);
  });

  it("keeps Home / End for the text cursor once a query is typed", async () => {
    const el = await setup();
    await userEvent.type(input(el), "s");
    await settle();
    const before = options(el)[0];
    await userEvent.keyboard("{End}");
    await settle();
    expect(options(el)[0]).toBe(before);
    expect(before).toHaveAttribute("aria-selected", "true");
  });

  it("selects on click and highlights on hover", async () => {
    const el = await setup();
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", (e) =>
      onSelect((e as CustomEvent).detail.item),
    );
    const users = options(el)[1];
    expect(users).toHaveAttribute("tabindex", "-1");
    users.dispatchEvent(new MouseEvent("mouseenter"));
    await settle();
    expect(users).toHaveAttribute("aria-selected", "true");
    expect(users).toHaveAttribute("part", "item item--highlighted");
    // The modal layer sets `pointer-events: none` on <body>; user-event only
    // checks light DOM ancestors, so the (clickable) option is clicked directly.
    users.click();
    await settle();
    expect(onSelect).toHaveBeenCalledWith(ITEMS[1]);
    expect(el.open).toBe(false);
    await settle();
    expect(panel(el)).toBeNull();
  });

  it("opens from a global shortcut and resets the query on every open", async () => {
    const el = await setup(
      'shortcut="mod+k, /" label="Global search"',
      `<button id="elsewhere">Elsewhere</button>`,
    );
    expect(el.shortcut).toEqual(["mod+k", "/"]);
    const opens = vi.fn();
    el.addEventListener("minerva-open-change", (e) =>
      opens((e as CustomEvent).detail),
    );
    const elsewhere = document.getElementById("elsewhere")!;
    elsewhere.focus();
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    await settle();
    expect(el.open).toBe(true);
    expect(opens).toHaveBeenCalledWith({ open: true, reason: "shortcut" });
    expect($(el, "#title").textContent).toContain("Global search");
    await userEvent.type(input(el), "seo");
    await userEvent.keyboard("{Escape}");
    await settle();
    await wait(10);
    expect(el.open).toBe(false);
    expect(getActiveElement()).toBe(elsewhere);

    // Unrelated keys are ignored.
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "j", metaKey: true, bubbles: true }),
    );
    await settle();
    expect(el.open).toBe(false);

    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "/", bubbles: true }),
    );
    await settle();
    expect(el.open).toBe(true);
    expect(input(el).value).toBe("");
    expect(options(el)).toHaveLength(3);
  });

  it("a cancelled minerva-open-change keeps the state (controlled)", async () => {
    const el = await setup('shortcut="mod+k"');
    el.addEventListener("minerva-open-change", (e) => e.preventDefault());
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }),
    );
    await settle();
    expect(el.open).toBe(false);
    el.open = true;
    await settle();
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(true);
  });

  it("generates unique option ids for aria-activedescendant", async () => {
    const el = await setup();
    const ids = options(el).map((o) => o.id);
    expect(new Set(ids).size).toBe(3);
    ids.forEach((id, index) => expect(id).toBe(`option-${index}`));
    expect(input(el)).toHaveAttribute("aria-activedescendant", ids[0]);
    await userEvent.keyboard("{ArrowDown}");
    await settle();
    expect(input(el)).toHaveAttribute("aria-activedescendant", ids[1]);
  });

  it("does not listen without a shortcut and accepts custom texts", async () => {
    const el = await mount<MinervaCommandDialog>(
      `<minerva-command-dialog open shortcut=", " label="Jump" description="Find a page" placeholder="Type a page" results-label="Pages" enter-label="Return"></minerva-command-dialog>`,
    );
    expect($(el, "#title").textContent?.trim()).toBe("Jump");
    expect($(el, "#description").textContent?.trim()).toBe("Find a page");
    expect(input(el)).toHaveAttribute("aria-label", "Type a page");
    expect($(el, "[role=listbox]")).toHaveAttribute("aria-label", "Pages");
    expect($(el, ".empty").textContent?.trim()).toBe("No matching results");
    expect($(el, "kbd.enterHint").textContent).toBe("Return");
    el.open = false;
    await settle();
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: ",", bubbles: true }),
    );
    await settle();
    expect(el.open).toBe(false);
  });

  it("localizes the built-in texts (<minerva-config locale>)", async () => {
    const el = await mount<MinervaCommandDialog>(
      `<minerva-config locale="zh"><minerva-command-dialog open></minerva-command-dialog></minerva-config>`,
      "minerva-command-dialog",
    );
    const zhTitle = $(el, "#title").textContent?.trim();
    expect(zhTitle).not.toBe("Command palette");
    expect(zhTitle).toBeTruthy();
    expect($(el, ".empty").textContent?.trim()).not.toBe("No matching results");
  });

  it("is a modal layer: scroll lock, hidden page, Escape on the topmost layer only", async () => {
    const el = await setup("", `<main id="page">page</main>`);
    el.show();
    await settle();
    expect(document.getElementById("page")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(document.body.style.overflow).toBe("hidden");
    expect(getLayerStack().at(-1)?.element).toBe(panel(el));
    await wait(5);
    $(el, "[part=overlay]").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await settle();
    expect(el.open).toBe(false);
    await wait(5);
    expect(getLayerStack()).toHaveLength(0);
    expect(document.getElementById("page")).not.toHaveAttribute("aria-hidden");
  });

  it("fires minerva-after-open / minerva-after-close", async () => {
    const el = await setup("");
    const afterOpen = vi.fn();
    const afterClose = vi.fn();
    el.addEventListener("minerva-after-open", afterOpen);
    el.addEventListener("minerva-after-close", afterClose);
    el.show();
    await settle();
    expect(afterOpen).toHaveBeenCalledTimes(1);
    el.hide();
    await settle();
    await settle();
    expect(afterClose).toHaveBeenCalledTimes(1);
  });

  it("warns in development about duplicate item ids", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await setup("");
    el.items = [...ITEMS, { id: "books", title: "Books again" }];
    await settle();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('duplicate item id "books"'),
    );
  });
});

describe("<minerva-command-dialog> keyboard (APG combobox in a modal dialog)", () => {
  const withTrigger = async (shortcut = "") => {
    const el = await setup(
      shortcut ? `shortcut="${shortcut}"` : "",
      `<button id="search">Search</button><input aria-label="Notes" id="notes" />`,
    );
    const trigger = document.getElementById("search")!;
    trigger.addEventListener("click", () => el.show());
    return { el, trigger };
  };

  it("opens from the keyboard with focus in the search combobox; Tab stays inside", async () => {
    const { el, trigger } = await withTrigger();
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(getActiveElement()).toBe(input(el));
    // The options are not tabbable: the input is the only tab stop (core's
    // trap loops at both edges).
    await userEvent.tab();
    expect(getActiveElement()).toBe(input(el));
    await userEvent.tab({ shift: true });
    expect(getActiveElement()).toBe(input(el));
  });

  it("ArrowDown / ArrowUp move aria-activedescendant, Enter selects and focus returns", async () => {
    const { el, trigger } = await withTrigger();
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", (e) =>
      onSelect((e as CustomEvent).detail.value),
    );
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    const opts = options(el);
    expect(input(el)).toHaveAttribute("aria-activedescendant", opts[0].id);
    const parts = () => options(el).map((o) => o.getAttribute("part"));
    expect(parts()).toEqual(["item item--highlighted", "item", "item"]);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await settle();
    expect(input(el)).toHaveAttribute("aria-activedescendant", opts[2].id);
    expect(opts[2]).toHaveAttribute("aria-selected", "true");
    expect(parts()).toEqual(["item", "item", "item item--highlighted"]);
    await userEvent.keyboard("{ArrowUp}");
    await settle();
    expect(input(el)).toHaveAttribute("aria-activedescendant", opts[1].id);
    expect(parts()).toEqual(["item", "item item--highlighted", "item"]);
    await userEvent.keyboard("{Enter}");
    await settle();
    await wait(10);
    expect(onSelect).toHaveBeenCalledWith("users");
    expect(panel(el)).toBeNull();
    expect(getActiveElement()).toBe(trigger);
  });

  it("Escape closes without selecting and returns focus to the trigger", async () => {
    const { el, trigger } = await withTrigger();
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    await userEvent.keyboard("{Escape}");
    await settle();
    await wait(10);
    expect(panel(el)).toBeNull();
    expect(onSelect).not.toHaveBeenCalled();
    expect(getActiveElement()).toBe(trigger);
  });

  it("a modifier-less shortcut ('/') does not hijack typing in text fields", async () => {
    const { el, trigger } = await withTrigger("mod+k, /");
    const notes = document.getElementById("notes") as HTMLInputElement;
    await userEvent.click(notes);
    await userEvent.keyboard("a/b");
    expect(notes.value).toBe("a/b");
    expect(el.open).toBe(false);

    // Outside of a text field it still opens the palette...
    trigger.focus();
    await userEvent.keyboard("/");
    await settle();
    expect(el.open).toBe(true);
    expect(getActiveElement()).toBe(input(el));
    // ...whose own search (in the shadow root) accepts "/".
    await userEvent.keyboard("/books");
    await settle();
    expect(input(el).value).toBe("/books");
    expect(options(el)).toHaveLength(1);
  });

  it("a modified shortcut (mod+k) still works from inside a text field", async () => {
    const { el } = await withTrigger("mod+k");
    await userEvent.click(document.getElementById("notes")!);
    await userEvent.keyboard("{Control>}k{/Control}");
    await settle();
    expect(el.open).toBe(true);
  });

  it("stops listening for the shortcut once disconnected", async () => {
    const { el } = await withTrigger("mod+k");
    el.remove();
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }),
    );
    await settle();
    expect(el.open).toBe(false);
  });
});
