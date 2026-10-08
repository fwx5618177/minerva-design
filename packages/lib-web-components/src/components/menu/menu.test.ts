import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement, getLayerStack, isScrollLocked } from "@minerva/core";
import {
  MinervaMenu,
  MinervaMenuItem,
  SUBMENU_OPEN_DELAY,
  type MenuEntry,
} from "./menu";
import { LONG_PRESS_DELAY, MinervaContextMenu } from "./context-menu";
import "../../elements/menu";
import "../../elements/modal";
import type { MinervaModal } from "../modal/modal";
import { resetDevWarnings } from "../../internal/dev";
import { mount, settle, wait } from "../../../tests/utils";

// Modal menus set `pointer-events: none` on <body>: user-event's pointer
// checks are disabled, like in lib-core's tests.
const user = () => userEvent.setup({ pointerEventsCheck: 0 });

const byId = (id: string) => document.getElementById(id) as HTMLElement;
const menus = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>("[role=menu]"));
const items = (el: Element, role = "menuitem") =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(`[role=${role}]`));
const item = (el: Element, name: string, role = "menuitem") => {
  const found = items(el, role).find(
    (i) => i.querySelector(".text")?.textContent?.trim() === name,
  );
  if (!found) throw new Error(`no ${role} "${name}"`);
  return found;
};
const focused = () => getActiveElement(document);

const simple: MenuEntry[] = [
  { key: "a", label: "Alpha" },
  { key: "b", label: "Beta", disabled: true },
  { key: "c", label: "Gamma" },
];

const nested: MenuEntry[] = [
  { key: "new", label: "New" },
  {
    key: "share",
    label: "Share",
    children: [
      { key: "mail", label: "Mail" },
      { key: "link", label: "Copy link" },
    ],
  },
  { key: "print", label: "Print" },
];

async function renderMenu(entries: MenuEntry[], attrs = "") {
  const el = await mount<MinervaMenu>(
    `<button id="before">Before</button>
     <minerva-menu ${attrs}><button slot="trigger" id="trigger">Open</button></minerva-menu>
     <button id="after">After</button>`,
    "minerva-menu",
  );
  el.items = entries;
  await settle();
  const onSelect = vi.fn();
  el.addEventListener("minerva-select", (e) =>
    onSelect((e as CustomEvent).detail),
  );
  return { el, onSelect, trigger: byId("trigger") };
}

async function openWithKeyboard(key = "{ArrowDown}") {
  byId("trigger").focus();
  await user().keyboard(key);
  await settle();
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-menu> trigger", () => {
  it("is registered with its entry elements", () => {
    expect(customElements.get("minerva-menu")).toBe(MinervaMenu);
    expect(customElements.get("minerva-context-menu")).toBe(MinervaContextMenu);
    expect(customElements.get("minerva-menu-item")).toBe(MinervaMenuItem);
    for (const tag of [
      "minerva-menu-checkbox-item",
      "minerva-menu-radio-item",
      "minerva-menu-group",
      "minerva-menu-separator",
      "minerva-menu-label",
    ]) {
      expect(customElements.get(tag)).toBeDefined();
    }
  });

  it("wires aria-haspopup, aria-expanded, data-state and labels the menu with the trigger", async () => {
    const { el, trigger } = await renderMenu(simple);
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(menus(el)).toHaveLength(0);
    await user().click(trigger);
    await settle();
    const [menu] = menus(el);
    expect(el.open).toBe(true);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(menu).toHaveAttribute("aria-label", "Open");
    expect(menu).toHaveAttribute("aria-orientation", "vertical");
    expect(menu).toHaveAttribute("data-state", "open");
    expect(menu.classList).toContain("content");
    expect(menu).toHaveAttribute("popover", "manual");
  });

  it("applies defaults, size, side / align and aria-label", async () => {
    const { el } = await renderMenu(simple, `aria-label="Actions"`);
    expect(el.size).toBe("medium");
    expect(el.side).toBe("bottom");
    expect(el.align).toBe("end");
    expect(el.nonModal).toBe(false);
    el.size = "small";
    el.side = "top";
    el.show();
    await settle();
    expect(el).toHaveAttribute("size", "small");
    expect(el).toHaveAttribute("side", "top");
    expect(menus(el)[0].classList).toContain("small");
    expect(menus(el)[0]).toHaveAttribute("aria-label", "Actions");
  });

  it("focuses the panel when opened with the pointer; ArrowDown then focuses the first item", async () => {
    const { el, trigger } = await renderMenu(simple);
    const u = user();
    await u.click(trigger);
    await settle();
    expect(focused()).toBe(menus(el)[0]);
    await u.keyboard("{ArrowDown}");
    expect(focused()).toBe(item(el, "Alpha"));
    expect(item(el, "Alpha")).toHaveAttribute("data-highlighted");
  });

  it("ArrowUp opens and focuses the last enabled item", async () => {
    const { el } = await renderMenu([
      ...simple,
      { key: "d", label: "Delta", disabled: true },
    ]);
    await openWithKeyboard("{ArrowUp}");
    expect(focused()).toBe(item(el, "Gamma"));
  });

  it.each(["{Enter}", " ", "{ArrowDown}"])(
    "%s on the trigger opens and focuses the first item",
    async (key) => {
      const { el } = await renderMenu(simple);
      await openWithKeyboard(key);
      expect(el.open).toBe(true);
      expect(focused()).toBe(item(el, "Alpha"));
    },
  );

  it("a keyboard click (detail 0) focuses the first item", async () => {
    const { el, trigger } = await renderMenu(simple);
    trigger.click();
    await settle();
    expect(focused()).toBe(item(el, "Alpha"));
  });

  it("toggles with the trigger and closes when clicking outside", async () => {
    const { el, trigger } = await renderMenu(simple);
    const u = user();
    await u.click(trigger);
    await settle();
    await wait(5);
    await u.click(trigger);
    await settle();
    expect(el.open).toBe(false);
    await u.click(trigger);
    await settle();
    await wait(5);
    byId("after").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await settle();
    expect(el.open).toBe(false);
  });

  it("stays closed when minerva-open-change is cancelled (controlled)", async () => {
    const { el, trigger } = await renderMenu(simple);
    const requests: boolean[] = [];
    el.addEventListener("minerva-open-change", (e) => {
      requests.push((e as CustomEvent).detail.open);
      e.preventDefault();
    });
    await user().click(trigger);
    await settle();
    expect(el.open).toBe(false);
    expect(requests).toEqual([true]);
    expect(menus(el)).toHaveLength(0);
  });

  it("a disabled menu does not open and disables its trigger", async () => {
    const { el, trigger } = await renderMenu(simple, "disabled");
    expect(trigger).toHaveAttribute("disabled");
    expect(trigger).toHaveAttribute("data-disabled");
    trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await settle();
    expect(el.open).toBe(false);
    el.disabled = false;
    await settle();
    expect(trigger).not.toHaveAttribute("disabled");
  });
});

describe("<minerva-menu> keyboard", () => {
  it("moves with arrows skipping disabled items, wraps, and Home / End jump to the ends", async () => {
    const { el } = await renderMenu(simple);
    await openWithKeyboard();
    const u = user();
    expect(focused()).toBe(item(el, "Alpha"));
    await u.keyboard("{ArrowDown}");
    expect(focused()).toBe(item(el, "Gamma"));
    await u.keyboard("{ArrowDown}");
    expect(focused()).toBe(item(el, "Alpha"));
    await u.keyboard("{ArrowUp}");
    expect(focused()).toBe(item(el, "Gamma"));
    await u.keyboard("{Home}");
    expect(focused()).toBe(item(el, "Alpha"));
    await u.keyboard("{End}");
    expect(focused()).toBe(item(el, "Gamma"));
  });

  it("does not wrap with no-loop", async () => {
    const { el } = await renderMenu(simple, "no-loop");
    await openWithKeyboard();
    const u = user();
    await u.keyboard("{ArrowUp}");
    expect(focused()).toBe(item(el, "Alpha"));
    await u.keyboard("{ArrowDown}{ArrowDown}");
    expect(focused()).toBe(item(el, "Gamma"));
  });

  it("typeahead matches label text or textValue, cycles on repeated letters and skips disabled items", async () => {
    const { el, onSelect } = await renderMenu([
      { key: "apple", label: "Apple" },
      { key: "bad", label: "Bad", disabled: true },
      { key: "banana", label: "Banana" },
      { key: "blue", label: "Blueberry" },
      { key: "cherry", label: "🍒", textValue: "Cherry" },
    ]);
    await openWithKeyboard();
    const u = user();
    await u.keyboard("c");
    expect(focused()).toBe(item(el, "🍒"));
    await u.keyboard("{Home}bl");
    expect(focused()).toBe(item(el, "Blueberry"));
    await u.keyboard("{Home}b");
    expect(focused()).toBe(item(el, "Banana"));
    await u.keyboard("b");
    expect(focused()).toBe(item(el, "Blueberry"));
    // Space while typing is part of the search, not an activation
    await u.keyboard(" ");
    expect(onSelect).not.toHaveBeenCalled();
    expect(el.open).toBe(true);
  });

  it.each(["{Enter}", " "])(
    "%s activates the focused item, emits minerva-select and returns focus to the trigger",
    async (key) => {
      const { el, onSelect, trigger } = await renderMenu(simple);
      await openWithKeyboard();
      await user().keyboard(key);
      await settle();
      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({ value: "a" }),
      );
      expect(onSelect.mock.calls[0][0].item).toBe(simple[0]);
      expect(el.open).toBe(false);
      await wait(10);
      expect(focused()).toBe(trigger);
    },
  );

  it("disabled items cannot be activated with the keyboard", async () => {
    const { el, onSelect } = await renderMenu(simple);
    await openWithKeyboard("{Enter}");
    item(el, "Beta").focus();
    await user().keyboard("{Enter}");
    expect(onSelect).not.toHaveBeenCalled();
    expect(el.open).toBe(true);
  });

  it("closes with Escape without selecting and returns focus to the trigger", async () => {
    const { el, onSelect, trigger } = await renderMenu(simple);
    await openWithKeyboard();
    const onChange = vi.fn();
    el.addEventListener("minerva-open-change", onChange);
    await user().keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
    expect(onChange.mock.calls[0][0].detail).toEqual({
      open: false,
      reason: "escape",
    });
    expect(onSelect).not.toHaveBeenCalled();
    await wait(10);
    expect(focused()).toBe(trigger);
  });

  it("Tab closes the menu and moves focus past the trigger; Shift+Tab before it", async () => {
    const { el, onSelect } = await renderMenu(simple);
    await openWithKeyboard();
    await user().tab();
    await settle();
    expect(el.open).toBe(false);
    await wait(10);
    expect(focused()).toBe(byId("after"));

    await openWithKeyboard();
    expect(el.open).toBe(true);
    await user().tab({ shift: true });
    await settle();
    expect(el.open).toBe(false);
    await wait(10);
    expect(focused()).toBe(byId("before"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("a cancelled minerva-select keeps the menu open", async () => {
    const { el } = await renderMenu(simple);
    el.addEventListener("minerva-select", (e) => e.preventDefault());
    await openWithKeyboard();
    await user().keyboard("{Enter}");
    await settle();
    expect(el.open).toBe(true);
  });
});

describe("<minerva-menu> pointer", () => {
  it("hover highlights (focuses) enabled items, not disabled ones; leaving clears it", async () => {
    const { el, trigger } = await renderMenu(simple);
    const u = user();
    await u.click(trigger);
    await settle();
    const [menu] = menus(el);
    await u.hover(item(el, "Gamma"));
    expect(focused()).toBe(item(el, "Gamma"));
    expect(item(el, "Gamma")).toHaveAttribute("data-highlighted");
    await u.hover(item(el, "Beta"));
    expect(focused()).toBe(menu);
    expect(item(el, "Beta")).toHaveAttribute("data-disabled");
    expect(item(el, "Gamma")).not.toHaveAttribute("data-highlighted");
    await u.hover(item(el, "Alpha"));
    expect(item(el, "Alpha")).toHaveAttribute("data-highlighted");
    await u.unhover(item(el, "Alpha"));
    expect(focused()).toBe(menu);
    expect(item(el, "Alpha")).not.toHaveAttribute("data-highlighted");
  });

  it("selects via pointer, passing the item, then closes", async () => {
    const { el, onSelect, trigger } = await renderMenu(simple);
    const u = user();
    await u.click(trigger);
    await settle();
    await u.click(item(el, "Gamma"));
    await settle();
    expect(onSelect).toHaveBeenCalledWith({ value: "c", item: simple[2] });
    expect(el.open).toBe(false);
  });

  it("ignores clicks on disabled items without closing", async () => {
    const { el, onSelect, trigger } = await renderMenu(simple);
    const u = user();
    await u.click(trigger);
    await settle();
    await u.click(item(el, "Beta"));
    expect(onSelect).not.toHaveBeenCalled();
    expect(el.open).toBe(true);
  });

  it("keep-open keeps the menu open; an item's closeOnSelect overrides it", async () => {
    const { el, onSelect, trigger } = await renderMenu(
      [
        { key: "stay", label: "Stay" },
        { key: "leave", label: "Leave", closeOnSelect: true },
      ],
      "keep-open",
    );
    const u = user();
    await u.click(trigger);
    await settle();
    await u.click(item(el, "Stay"));
    await settle();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "stay" }),
    );
    expect(el.open).toBe(true);
    await u.click(item(el, "Leave"));
    await settle();
    expect(el.open).toBe(false);
  });
});

describe("<minerva-menu> submenus", () => {
  it("ArrowRight opens the submenu on its first item, ArrowLeft closes only it and refocuses its trigger", async () => {
    const { el } = await renderMenu(nested);
    await openWithKeyboard();
    const u = user();
    await u.keyboard("{ArrowDown}");
    const share = item(el, "Share");
    expect(focused()).toBe(share);
    expect(share).toHaveAttribute("aria-haspopup", "menu");
    expect(share).toHaveAttribute("aria-expanded", "false");
    await u.keyboard("{ArrowRight}");
    await settle();
    expect(focused()).toBe(item(el, "Mail"));
    const [root, sub] = menus(el);
    expect(share).toHaveAttribute("aria-expanded", "true");
    expect(share).toHaveAttribute("data-expanded");
    expect(share).toHaveAttribute("aria-controls", sub.id);
    expect(sub).toHaveAttribute("aria-labelledby", share.id);
    expect(root.contains(sub)).toBe(false);
    // the submenu is a child layer of the menu
    expect(getLayerStack().at(-1)?.parent).toBe(root);
    // navigation stays inside the submenu (loop)
    await u.keyboard("{ArrowDown}");
    expect(focused()).toBe(item(el, "Copy link"));
    await u.keyboard("{ArrowDown}");
    expect(focused()).toBe(item(el, "Mail"));
    await u.keyboard("{ArrowLeft}");
    await settle();
    expect(menus(el)).toHaveLength(1);
    expect(focused()).toBe(share);
    expect(share).toHaveAttribute("aria-expanded", "false");
    // ArrowLeft in the root menu does nothing
    await u.keyboard("{ArrowLeft}");
    await settle();
    expect(el.open).toBe(true);
  });

  it.each(["{Enter}", " "])(
    "%s on a submenu trigger opens it on its first item",
    async (key) => {
      const { el } = await renderMenu(nested);
      await openWithKeyboard();
      const u = user();
      await u.keyboard("{ArrowDown}");
      await u.keyboard(key);
      await settle();
      expect(focused()).toBe(item(el, "Mail"));
      // ArrowRight on an already open submenu trigger focuses its first item
      item(el, "Share").focus();
      await u.keyboard("{ArrowRight}");
      await settle();
      expect(focused()).toBe(item(el, "Mail"));
    },
  );

  it("Escape closes only the submenu, then the menu, returning focus each time", async () => {
    const { el, onSelect, trigger } = await renderMenu(nested);
    await openWithKeyboard();
    const u = user();
    await u.keyboard("{ArrowDown}{ArrowRight}");
    await settle();
    expect(focused()).toBe(item(el, "Mail"));
    await u.keyboard("{Escape}");
    await settle();
    expect(menus(el)).toHaveLength(1);
    expect(focused()).toBe(item(el, "Share"));
    await u.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
    await wait(10);
    expect(focused()).toBe(trigger);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("selecting in a submenu closes every menu and returns focus to the trigger", async () => {
    const { el, onSelect, trigger } = await renderMenu(nested);
    await openWithKeyboard();
    const u = user();
    await u.keyboard("{ArrowDown}{ArrowRight}");
    await settle();
    await u.keyboard("{ArrowDown}{Enter}");
    await settle();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "link" }),
    );
    expect(el.open).toBe(false);
    expect(menus(el)).toHaveLength(0);
    await wait(10);
    expect(focused()).toBe(trigger);
    expect(getLayerStack()).toHaveLength(0);
  });

  it("supports dir='rtl': ArrowLeft opens, ArrowRight closes", async () => {
    const { el } = await renderMenu(nested, `dir="rtl"`);
    await openWithKeyboard();
    expect(menus(el)[0]).toHaveAttribute("dir", "rtl");
    const u = user();
    await u.keyboard("{ArrowDown}{ArrowRight}");
    await settle();
    expect(menus(el)).toHaveLength(1);
    await u.keyboard("{ArrowLeft}");
    await settle();
    expect(focused()).toBe(item(el, "Mail"));
    await u.keyboard("{ArrowRight}");
    await settle();
    expect(menus(el)).toHaveLength(1);
    expect(focused()).toBe(item(el, "Share"));
  });

  it("opens on hover after a short delay without moving focus into it; hovering a sibling closes it", async () => {
    const { el, trigger } = await renderMenu(nested);
    const u = user();
    await u.click(trigger);
    await settle();
    await u.hover(item(el, "Share"));
    expect(focused()).toBe(item(el, "Share"));
    expect(menus(el)).toHaveLength(1);
    await wait(SUBMENU_OPEN_DELAY + 20);
    await settle();
    expect(menus(el)).toHaveLength(2);
    expect(focused()).toBe(item(el, "Share"));
    // moving into the submenu highlights its items
    await u.hover(item(el, "Copy link"));
    expect(focused()).toBe(item(el, "Copy link"));
    expect(item(el, "Share")).toHaveAttribute("data-expanded");
    await u.hover(item(el, "Print"));
    await settle();
    expect(focused()).toBe(item(el, "Print"));
    expect(menus(el)).toHaveLength(1);
  });

  it("a hover that leaves before the delay does not open the submenu", async () => {
    const { el } = await renderMenu(nested, "open");
    const u = user();
    await u.hover(item(el, "Share"));
    await u.hover(item(el, "New"));
    await wait(SUBMENU_OPEN_DELAY * 2);
    await settle();
    expect(menus(el)).toHaveLength(1);
  });

  it("opens on click (focus stays on the trigger item); clicks inside the submenu do not dismiss the parent", async () => {
    const { el, trigger } = await renderMenu([
      nested[0],
      {
        key: "share",
        label: "Share",
        children: [
          { key: "mail", label: "Mail" },
          { key: "off", label: "Unavailable", disabled: true },
        ],
      },
    ]);
    const u = user();
    await u.click(trigger);
    await settle();
    await u.click(item(el, "Share"));
    await settle();
    expect(focused()).toBe(item(el, "Share"));
    const sub = menus(el)[1];
    await wait(5);
    await u.pointer({ keys: "[MouseLeft]", target: sub });
    await u.click(item(el, "Unavailable"));
    await settle();
    expect(menus(el)).toHaveLength(2);
    // pointer down in the parent menu closes the submenu only
    await u.pointer({ keys: "[MouseLeft]", target: menus(el)[0] });
    await settle();
    expect(menus(el)).toHaveLength(1);
    expect(el.open).toBe(true);
  });

  it("keeps the submenu open while the pointer moves towards it (safe triangle)", async () => {
    const { el, trigger } = await renderMenu(nested);
    const u = user();
    await u.click(trigger);
    await settle();
    await u.click(item(el, "Share"));
    await settle();
    const sub = menus(el)[1];
    sub.setAttribute("data-side", "right");
    vi.spyOn(sub, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ x: 200, y: 0, width: 100, height: 200 }),
    );
    const share = item(el, "Share");
    const print = item(el, "Print");
    // leave the trigger at (100, 50) heading right, cross "Print" inside the triangle
    await u.pointer([
      { target: share, coords: { clientX: 100, clientY: 50 } },
      { target: print, coords: { clientX: 150, clientY: 60 } },
    ]);
    await settle();
    expect(focused()).not.toBe(print);
    expect(menus(el)).toHaveLength(2);
    // outside the triangle: the sibling takes the hover and the submenu closes
    await u.pointer({ target: print, coords: { clientX: 150, clientY: 190 } });
    await settle();
    expect(focused()).toBe(print);
    expect(menus(el)).toHaveLength(1);
  });

  it("cannot open a disabled submenu with the keyboard", async () => {
    const { el } = await renderMenu([
      { key: "x", label: "Locked", disabled: true, children: simple },
      { key: "y", label: "Other" },
    ]);
    await openWithKeyboard();
    item(el, "Locked").focus();
    await user().keyboard("{ArrowRight}{Enter}");
    await settle();
    expect(menus(el)).toHaveLength(1);
  });
});

describe("<minerva-menu> checkbox and radio items", () => {
  it("toggles checkbox items (minerva-change), keeps the menu open and remembers the state", async () => {
    const { el, onSelect } = await renderMenu([
      {
        type: "checkbox",
        key: "grid",
        label: "Show grid",
        defaultChecked: true,
      },
      { type: "checkbox", key: "rulers", label: "Show rulers" },
    ]);
    const changes: unknown[] = [];
    el.addEventListener("minerva-change", (e) =>
      changes.push((e as CustomEvent).detail),
    );
    await openWithKeyboard();
    const grid = item(el, "Show grid", "menuitemcheckbox");
    expect(grid).toHaveAttribute("aria-checked", "true");
    expect(grid).toHaveAttribute("data-state", "checked");
    expect(grid.querySelector(".indicator svg")).not.toBeNull();
    expect(item(el, "Show rulers", "menuitemcheckbox")).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(focused()).toBe(grid);
    const u = user();
    await u.keyboard(" ");
    await settle();
    expect(changes).toEqual([
      expect.objectContaining({ value: "grid", checked: false }),
    ]);
    expect(item(el, "Show grid", "menuitemcheckbox")).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(el.open).toBe(true);
    await u.click(item(el, "Show rulers", "menuitemcheckbox"));
    await settle();
    expect(item(el, "Show rulers", "menuitemcheckbox")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(onSelect).not.toHaveBeenCalled();
    await u.keyboard("{Escape}");
    await settle();
    await openWithKeyboard();
    expect(item(el, "Show grid", "menuitemcheckbox")).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(item(el, "Show rulers", "menuitemcheckbox")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("a cancelled minerva-change keeps the state (controlled); closeOnSelect closes the menu", async () => {
    const { el } = await renderMenu([
      { type: "checkbox", key: "locked", label: "Locked", checked: true },
      {
        type: "checkbox",
        key: "wrap",
        label: "Word wrap",
        closeOnSelect: true,
      },
    ]);
    el.addEventListener("minerva-change", (e) => {
      if ((e as CustomEvent).detail.value === "locked") e.preventDefault();
    });
    const u = user();
    await u.click(byId("trigger"));
    await settle();
    await u.click(item(el, "Locked", "menuitemcheckbox"));
    await settle();
    expect(item(el, "Locked", "menuitemcheckbox")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await u.click(item(el, "Word wrap", "menuitemcheckbox"));
    await settle();
    expect(el.open).toBe(false);
  });

  it("radio groups: one checked option, labelled group, minerva-change, menu stays open", async () => {
    const { el } = await renderMenu([
      {
        type: "radio-group",
        key: "sort",
        label: "Sort by",
        defaultValue: "name",
        items: [
          { value: "name", label: "Name" },
          { value: "date", label: "Date" },
          { value: "size", label: "Size", disabled: true },
        ],
      },
    ]);
    const changes: unknown[] = [];
    el.addEventListener("minerva-change", (e) =>
      changes.push((e as CustomEvent).detail),
    );
    await openWithKeyboard();
    const group = el.shadowRoot!.querySelector("[role=group]")!;
    const labelId = group.getAttribute("aria-labelledby")!;
    expect(el.shadowRoot!.getElementById(labelId)?.textContent).toBe("Sort by");
    const checkedStates = () =>
      items(el, "menuitemradio").map((r) => r.getAttribute("aria-checked"));
    expect(checkedStates()).toEqual(["true", "false", "false"]);
    expect(focused()).toBe(items(el, "menuitemradio")[0]);
    const u = user();
    await u.keyboard("{ArrowDown}{Enter}");
    await settle();
    expect(changes).toEqual([
      expect.objectContaining({ value: "date", group: "sort" }),
    ]);
    expect(checkedStates()).toEqual(["false", "true", "false"]);
    expect(el.open).toBe(true);
    // choosing the current value again does not report a change
    await u.keyboard(" ");
    expect(changes).toHaveLength(1);
    await u.click(items(el, "menuitemradio")[2]);
    await settle();
    expect(checkedStates()).toEqual(["false", "true", "false"]);
  });
});

describe("<minerva-menu> declarative entries", () => {
  const markup = `
    <minerva-menu>
      <button slot="trigger" id="trigger">Edit</button>
      <minerva-menu-label>Clipboard</minerva-menu-label>
      <minerva-menu-item value="copy" shortcut="⌘C"><span slot="icon">©</span>Copy</minerva-menu-item>
      <minerva-menu-item value="paste" disabled>Paste</minerva-menu-item>
      <minerva-menu-separator></minerva-menu-separator>
      <minerva-menu-item value="share">Share
        <minerva-menu-item value="mail">Mail</minerva-menu-item>
      </minerva-menu-item>
      <minerva-menu-checkbox-item value="wrap" checked>Word wrap</minerva-menu-checkbox-item>
      <minerva-menu-group label="Theme">
        <minerva-menu-radio-item value="light" checked>Light</minerva-menu-radio-item>
        <minerva-menu-radio-item value="dark">Dark</minerva-menu-radio-item>
      </minerva-menu-group>
    </minerva-menu>`;

  it("renders items, icons, shortcuts, separators, labels and groups from child elements", async () => {
    const el = await mount<MinervaMenu>(markup);
    el.show();
    await settle();
    const [menu] = menus(el);
    expect(menu.querySelector(".label")?.textContent).toBe("Clipboard");
    const copy = item(el, "Copy");
    expect(copy.querySelector(".icon")?.textContent).toBe("©");
    expect(copy.querySelector(".shortcut")?.textContent).toBe("⌘C");
    expect(item(el, "Paste")).toHaveAttribute("aria-disabled", "true");
    expect(menu.querySelector("[role=separator]")!.classList).toContain(
      "separator",
    );
    expect(item(el, "Share")).toHaveAttribute("aria-haspopup", "menu");
    expect(item(el, "Share").querySelector(".chevron svg")).not.toBeNull();
    expect(item(el, "Word wrap", "menuitemcheckbox")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(item(el, "Light", "menuitemradio")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    // the data elements are never displayed themselves
    expect(
      getComputedStyle(el.querySelector("minerva-menu-item")!).display,
    ).toBe("none");
  });

  it("selects by value, toggles the element state and follows DOM changes", async () => {
    const el = await mount<MinervaMenu>(markup);
    const selected: unknown[] = [];
    el.addEventListener("minerva-select", (e) =>
      selected.push((e as CustomEvent).detail.value),
    );
    const u = user();
    await u.click(byId("trigger"));
    await settle();
    await u.click(item(el, "Word wrap", "menuitemcheckbox"));
    await u.click(item(el, "Dark", "menuitemradio"));
    await settle();
    expect(
      el.querySelector("minerva-menu-checkbox-item")!.hasAttribute("checked"),
    ).toBe(false);
    const radios = el.querySelectorAll("minerva-menu-radio-item");
    expect(radios[0].hasAttribute("checked")).toBe(false);
    expect(radios[1].hasAttribute("checked")).toBe(true);
    expect(item(el, "Dark", "menuitemradio")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    const added = document.createElement("minerva-menu-item");
    added.setAttribute("value", "cut");
    added.textContent = "Cut";
    el.append(added);
    await settle();
    await u.click(item(el, "Cut"));
    await settle();
    expect(selected).toEqual(["cut"]);
    expect(el.open).toBe(false);
  });

  it("opens nested declarative items as a submenu", async () => {
    const el = await mount<MinervaMenu>(markup);
    const selected: unknown[] = [];
    el.addEventListener("minerva-select", (e) =>
      selected.push((e as CustomEvent).detail.value),
    );
    await openWithKeyboard();
    item(el, "Share").focus();
    const u = user();
    await u.keyboard("{ArrowRight}");
    await settle();
    expect(focused()).toBe(item(el, "Mail"));
    await u.keyboard("{Enter}");
    await settle();
    expect(selected).toEqual(["mail"]);
  });
});

describe("<minerva-menu> modality and layers", () => {
  it("modal (default) disables outside pointer events, locks scroll and hides the page", async () => {
    const { el, trigger } = await renderMenu(simple);
    await user().click(trigger);
    await settle();
    expect(document.body.style.pointerEvents).toBe("none");
    expect(isScrollLocked()).toBe(true);
    expect(byId("after")).toHaveAttribute("aria-hidden", "true");
    await user().keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
    expect(document.body.style.pointerEvents).toBe("");
    expect(isScrollLocked()).toBe(false);
  });

  it("non-modal does neither and closes on focus outside", async () => {
    const { el, trigger } = await renderMenu(simple, "non-modal");
    await user().click(trigger);
    await settle();
    expect(document.body.style.pointerEvents).toBe("");
    expect(byId("after")).not.toHaveAttribute("aria-hidden");
    byId("after").focus();
    await settle();
    expect(el.open).toBe(false);
    expect(focused()).toBe(byId("after"));
  });

  it("non-modal: clicking outside closes without pulling focus back to the trigger", async () => {
    const { el, trigger } = await renderMenu(simple, "non-modal");
    const u = user();
    await u.click(trigger);
    await settle();
    await wait(5);
    await u.click(byId("after"));
    await settle();
    expect(el.open).toBe(false);
    await wait(10);
    expect(focused()).toBe(byId("after"));
  });

  it("inside a modal: Escape closes the submenu, then the menu, and leaves the modal open; Tab stays inside", async () => {
    document.body.innerHTML = `
      <minerva-modal id="modal" label="Settings" hide-close-button>
        <minerva-menu id="menu"><button slot="trigger" id="trigger">Nested</button></minerva-menu>
        <button id="next">Next</button>
      </minerva-modal>`;
    await settle();
    const modal = byId("modal") as unknown as MinervaModal;
    const el = byId("menu") as unknown as MinervaMenu;
    el.items = nested;
    modal.open = true;
    await settle();
    const onModalChange = vi.fn();
    modal.addEventListener("minerva-open-change", (e) => {
      if (e.target === modal) onModalChange();
    });
    await openWithKeyboard();
    const u = user();
    await u.keyboard("{ArrowDown}{ArrowRight}");
    await settle();
    expect(focused()).toBe(item(el, "Mail"));
    await wait(5);
    // a click in the submenu dismisses neither the menu nor the modal
    await u.pointer({ keys: "[MouseLeft]", target: menus(el)[1] });
    await settle();
    expect(menus(el)).toHaveLength(2);
    await u.keyboard("{Escape}");
    await settle();
    expect(menus(el)).toHaveLength(1);
    await u.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
    await wait(10);
    expect(focused()).toBe(byId("trigger"));
    expect(onModalChange).not.toHaveBeenCalled();
    expect(modal.open).toBe(true);
    // Tab from the menu moves on inside the modal
    await openWithKeyboard();
    await u.tab();
    await settle();
    expect(el.open).toBe(false);
    await wait(10);
    expect(focused()).toBe(byId("next"));
  });

  it("warns about duplicate keys and a missing trigger", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const { el } = await renderMenu(simple);
    el.items = [
      { key: "x", label: "One" },
      { key: "x", label: "Two" },
    ];
    await settle();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('duplicate item key "x"'),
    );
    await mount(`<minerva-menu></minerva-menu>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("trigger"));
  });
});

describe("<minerva-context-menu>", () => {
  async function renderContext(attrs = "") {
    const el = await mount<MinervaContextMenu>(
      `<minerva-context-menu ${attrs}>
         <div id="area"><button id="inner">Inner</button></div>
       </minerva-context-menu>`,
    );
    el.items = nested;
    await settle();
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", (e) =>
      onSelect((e as CustomEvent).detail),
    );
    return { el, onSelect, area: byId("area") };
  }

  const contextMenu = (target: Element, x: number, y: number) => {
    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      composed: true,
      clientX: x,
      clientY: y,
    });
    target.dispatchEvent(event);
    return event;
  };

  it("opens at the pointer, focuses the first item and moves on another right click", async () => {
    const { el, area } = await renderContext();
    const event = contextMenu(area, 120, 80);
    expect(event.defaultPrevented).toBe(true);
    await settle();
    expect(el.open).toBe(true);
    expect(area).toHaveAttribute("data-state", "open");
    expect(area.style.pointerEvents).toBe("auto");
    expect(focused()).toBe(item(el, "New"));
    // a right click in the area while open keeps (and moves) the menu
    await wait(5);
    area.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        composed: true,
        button: 2,
        pointerType: "mouse",
      }),
    );
    contextMenu(area, 300, 200);
    await settle();
    expect(el.open).toBe(true);
    expect(menus(el)).toHaveLength(1);
  });

  it("Shift+F10 / the ContextMenu key open it at the area; Escape returns focus to the focused element", async () => {
    const { el, area } = await renderContext();
    const inner = byId("inner");
    inner.focus();
    const u = user();
    await u.keyboard("{Shift>}{F10}{/Shift}");
    await settle();
    expect(focused()).toBe(item(el, "New"));
    await u.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
    await wait(10);
    expect(focused()).toBe(inner);
    inner.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ContextMenu", bubbles: true }),
    );
    await settle();
    expect(focused()).toBe(item(el, "New"));
    expect(area).toHaveAttribute("data-state", "open");
  });

  it("supports submenus, selection and closes on Tab", async () => {
    const { el, area, onSelect } = await renderContext();
    contextMenu(area, 10, 10);
    await settle();
    const u = user();
    await u.keyboard("{ArrowDown}{ArrowRight}");
    await settle();
    expect(focused()).toBe(item(el, "Mail"));
    await u.keyboard("{Enter}");
    await settle();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "mail" }),
    );
    expect(el.open).toBe(false);
    contextMenu(area, 10, 10);
    await settle();
    expect(focused()).toBe(item(el, "New"));
    await u.tab();
    await settle();
    expect(el.open).toBe(false);
  });

  it("closes on a left click in the area", async () => {
    const { el, area } = await renderContext();
    contextMenu(area, 10, 10);
    await settle();
    await wait(5);
    area.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        composed: true,
        button: 0,
        pointerType: "mouse",
      }),
    );
    await settle();
    expect(el.open).toBe(false);
    expect(area.style.pointerEvents).toBe("");
  });

  it("opens after a touch long press, not after a short tap", async () => {
    const { el, area } = await renderContext();
    vi.useFakeTimers();
    const touch = (type: string) =>
      area.dispatchEvent(
        new PointerEvent(type, {
          bubbles: true,
          composed: true,
          pointerType: "touch",
          clientX: 40,
          clientY: 50,
        }),
      );
    touch("pointerdown");
    touch("pointerup");
    vi.advanceTimersByTime(LONG_PRESS_DELAY);
    expect(el.open).toBe(false);
    touch("pointerdown");
    vi.advanceTimersByTime(LONG_PRESS_DELAY);
    expect(el.open).toBe(true);
  });

  it("leaves the native menu alone when disabled", async () => {
    const { el, area } = await renderContext("disabled");
    expect(contextMenu(area, 1, 1).defaultPrevented).toBe(false);
    area.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ContextMenu", bubbles: true }),
    );
    await settle();
    expect(el.open).toBe(false);
    expect(area).toHaveAttribute("data-disabled");
  });
});

describe("<minerva-menu> presence (exit animation, like lib-core)", () => {
  /** Gives a panel an exit animation (what lib-core's CSS declares). */
  const animate = (panel: HTMLElement) => {
    panel.style.animationName = "menu-fade-out";
    panel.style.animationDuration = "150ms";
  };
  const end = (panel: HTMLElement) =>
    panel.dispatchEvent(new Event("animationend"));

  it("keeps the closed panel rendered with data-state=closed until its exit animation ends", async () => {
    const { el, trigger } = await renderMenu(simple);
    await openWithKeyboard();
    const [panel] = menus(el);
    expect(panel).toHaveAttribute("data-state", "open");
    animate(panel);
    await user().keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    // same element, closed, still rendered while it animates out
    expect(menus(el)).toEqual([panel]);
    expect(panel).toHaveAttribute("data-state", "closed");
    // no longer a layer: focus went back to the trigger, scroll unlocked
    expect(focused()).toBe(trigger);
    expect(isScrollLocked()).toBe(false);
    end(panel);
    await settle();
    expect(menus(el)).toEqual([]);
  });

  it("removes the panel right away without an exit animation (none declared, reduced motion)", async () => {
    const { el } = await renderMenu(simple);
    await openWithKeyboard();
    const [panel] = menus(el);
    // what `@media (prefers-reduced-motion: reduce)` resolves to
    panel.style.animationName = "none";
    el.open = false;
    await el.updateComplete;
    expect(menus(el)).toEqual([]);
  });

  it("reopening during the exit animation reuses the open panel", async () => {
    const { el } = await renderMenu(simple);
    await openWithKeyboard();
    const [panel] = menus(el);
    animate(panel);
    el.open = false;
    await settle();
    expect(panel).toHaveAttribute("data-state", "closed");
    el.open = true;
    await settle();
    expect(menus(el)).toEqual([panel]);
    expect(panel).toHaveAttribute("data-state", "open");
    // the stale animation end no longer removes it
    end(panel);
    await settle();
    expect(menus(el)).toEqual([panel]);
    expect(panel).toHaveAttribute("data-state", "open");
  });

  it("animates closing submenus out too, and drops exiting panels on disconnect", async () => {
    const { el } = await renderMenu(nested);
    await openWithKeyboard();
    item(el, "Share").focus();
    await user().keyboard("{ArrowRight}");
    await settle();
    const [, sub] = menus(el);
    expect(sub).toHaveAttribute("data-state", "open");
    animate(sub);
    await user().keyboard("{ArrowLeft}");
    await settle();
    expect(menus(el)).toHaveLength(2);
    expect(sub).toHaveAttribute("data-state", "closed");
    expect(menus(el)[0]).toHaveAttribute("data-state", "open");
    end(sub);
    await settle();
    expect(menus(el)).toHaveLength(1);
    // closing the menu with the root animating, then disconnecting
    animate(menus(el)[0]);
    el.open = false;
    await settle();
    expect(menus(el)).toHaveLength(1);
    el.remove();
    await settle();
    expect(menus(el)).toEqual([]);
  });

  it("ships lib-core's enter / exit animation with a reduced-motion override", async () => {
    const css = (MinervaMenu.styles as unknown as Array<{ cssText: string }>)
      .map((s) => s.cssText)
      .join("");
    expect(css).toMatch(
      /\.content\[data-state=["']?closed["']?\]\s*\{\s*animation:\s*menu-fade-out/,
    );
    expect(css).toMatch(
      /@media \(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.content\s*\{\s*animation:\s*none\s*!important/,
    );
  });
});
