// In-house Menu / ContextMenu behaviours (WAI-ARIA menu button + menu):
// keyboard, focus return, submenus (keyboard, hover, pointer grace),
// typeahead, checkbox / radio items, context menu positioning, nested
// layers, theme-scoped portals and SSR.
import { useState } from "react";
import { renderToString } from "react-dom/server";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContextMenu, Menu, type MenuEntry, type MenuProps } from ".";
import { ConfigProvider } from "../../contexts/ConfigProvider";
import { ModalContent, ModalHeader, ModalRoot } from "../Modal";
import { LONG_PRESS_DELAY } from "./ContextMenu";
import { SUBMENU_OPEN_DELAY } from "./MenuItems";

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

const item = (name: string | RegExp) => screen.getByRole("menuitem", { name });

function renderMenu(entries: MenuEntry[], extra: Partial<MenuProps> = {}) {
  const user = setupUser();
  const onSelect = vi.fn();
  render(
    <>
      <button type="button">Before</button>
      <Menu items={entries} onSelect={onSelect} {...extra}>
        <button type="button">Open</button>
      </Menu>
      <button type="button">After</button>
    </>,
  );
  return {
    user,
    onSelect,
    trigger: screen.getByRole("button", { name: "Open", hidden: true }),
  };
}

async function openWithKeyboard(
  user: ReturnType<typeof setupUser>,
  trigger: HTMLElement,
  key = "{ArrowDown}",
) {
  act(() => trigger.focus());
  await user.keyboard(key);
  await screen.findByRole("menu");
}

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

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Menu trigger", () => {
  it("wires aria-haspopup, aria-expanded, aria-controls and labels the menu with the trigger (no private state attribute)", async () => {
    const { user, trigger } = renderMenu(simple);
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("data-menu-state");
    expect(trigger).not.toHaveAttribute("aria-controls");

    await user.click(trigger);
    const menu = screen.getByRole("menu");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", menu.id);
    expect(menu).toHaveAttribute("aria-labelledby", trigger.id);
    expect(menu).toHaveAccessibleName("Open");
    expect(menu).toHaveAttribute("aria-orientation", "vertical");
    expect(menu).toHaveAttribute("data-state", "open");
  });

  it("keeps the trigger's own id for labelling", async () => {
    const user = setupUser();
    render(
      <Menu items={simple}>
        <button type="button" id="own-id">
          Own
        </button>
      </Menu>,
    );
    await user.click(screen.getByRole("button", { name: "Own" }));
    expect(screen.getByRole("menu")).toHaveAttribute(
      "aria-labelledby",
      "own-id",
    );
  });

  it("focuses the panel when opened with the pointer; ArrowDown then focuses the first item", async () => {
    const { user, trigger } = renderMenu(simple);
    await user.click(trigger);
    const menu = screen.getByRole("menu");
    await waitFor(() => expect(menu).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    expect(item("Alpha")).toHaveFocus();
  });

  it("ArrowUp opens and focuses the last enabled item", async () => {
    const { user, trigger } = renderMenu([
      ...simple,
      { key: "d", label: "Delta", disabled: true },
    ]);
    await openWithKeyboard(user, trigger, "{ArrowUp}");
    await waitFor(() => expect(item("Gamma")).toHaveFocus());
  });

  it("a keyboard click (detail 0) focuses the first item", async () => {
    const { trigger } = renderMenu(simple);
    act(() => trigger.click());
    await waitFor(() => expect(item("Alpha")).toHaveFocus());
  });
});

describe("Menu keyboard", () => {
  it("wraps around with loop (default) and stops at the ends with loop={false}", async () => {
    const first = renderMenu(simple);
    await openWithKeyboard(first.user, first.trigger);
    await waitFor(() => expect(item("Alpha")).toHaveFocus());
    await first.user.keyboard("{ArrowUp}");
    expect(item("Gamma")).toHaveFocus();
    await first.user.keyboard("{ArrowDown}");
    expect(item("Alpha")).toHaveFocus();
  });

  it("does not wrap with loop={false}", async () => {
    const { user, trigger } = renderMenu(simple, { loop: false });
    await openWithKeyboard(user, trigger);
    await waitFor(() => expect(item("Alpha")).toHaveFocus());
    await user.keyboard("{ArrowUp}");
    expect(item("Alpha")).toHaveFocus();
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(item("Gamma")).toHaveFocus();
  });

  it("typeahead matches label text or textValue, cycles on repeated letters and skips disabled items", async () => {
    const { user, trigger, onSelect } = renderMenu([
      { key: "apple", label: "Apple" },
      { key: "bad", label: "Bad", disabled: true },
      { key: "banana", label: "Banana" },
      { key: "blue", label: "Blueberry" },
      { key: "cherry", label: <i>🍒</i>, textValue: "Cherry" },
    ]);
    await openWithKeyboard(user, trigger);
    await waitFor(() => expect(item("Apple")).toHaveFocus());

    await user.keyboard("c");
    expect(item("🍒")).toHaveFocus();
    await user.keyboard("{Home}bl");
    expect(item("Blueberry")).toHaveFocus();
    await user.keyboard("{Home}b");
    expect(item("Banana")).toHaveFocus();
    await user.keyboard("b");
    expect(item("Blueberry")).toHaveFocus();
    // Space while typing is part of the search, not an activation
    await user.keyboard(" ");
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("Tab closes the menu and moves focus past the trigger; Shift+Tab before it", async () => {
    const { user, trigger, onSelect } = renderMenu(simple);
    await openWithKeyboard(user, trigger);
    await waitFor(() => expect(item("Alpha")).toHaveFocus());
    await user.tab();
    expect(screen.queryByRole("menu")).toBeNull();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "After" })).toHaveFocus(),
    );

    await openWithKeyboard(user, trigger);
    await waitFor(() => expect(item("Alpha")).toHaveFocus());
    await user.tab({ shift: true });
    expect(screen.queryByRole("menu")).toBeNull();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Before" })).toHaveFocus(),
    );
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("Enter on the trigger toggles; disabled items cannot be activated with the keyboard", async () => {
    const { user, trigger, onSelect } = renderMenu(simple);
    await openWithKeyboard(user, trigger, "{Enter}");
    const beta = item("Beta");
    act(() => beta.focus());
    await user.keyboard("{Enter}");
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});

describe("Menu pointer", () => {
  it("hover highlights (focuses) enabled items, not disabled ones; leaving clears it", async () => {
    const { user, trigger } = renderMenu(simple);
    await user.click(trigger);
    const menu = screen.getByRole("menu");
    await user.hover(item("Gamma"));
    expect(item("Gamma")).toHaveFocus();
    expect(item("Gamma")).toHaveAttribute("data-highlighted");

    await user.hover(item("Beta"));
    expect(item("Beta")).not.toHaveFocus();
    expect(item("Beta")).toHaveAttribute("data-disabled");
    expect(menu).toHaveFocus();
    expect(item("Gamma")).not.toHaveAttribute("data-highlighted");

    await user.hover(item("Alpha"));
    expect(item("Alpha")).toHaveAttribute("data-highlighted");
    await user.unhover(item("Alpha"));
    expect(menu).toHaveFocus();
    expect(item("Alpha")).not.toHaveAttribute("data-highlighted");
  });

  it("closeOnSelect={false} keeps the menu open; an item's closeOnSelect overrides it", async () => {
    const { user, trigger, onSelect } = renderMenu(
      [
        { key: "stay", label: "Stay" },
        { key: "leave", label: "Leave", closeOnSelect: true },
      ],
      { closeOnSelect: false },
    );
    await user.click(trigger);
    await user.click(item("Stay"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "stay" }),
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(item("Leave"));
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

describe("Menu submenus", () => {
  it("ArrowRight opens the submenu on its first item, ArrowLeft closes only it and refocuses its trigger", async () => {
    const { user, trigger } = renderMenu(nested);
    await openWithKeyboard(user, trigger);
    await user.keyboard("{ArrowDown}");
    const share = item("Share");
    expect(share).toHaveFocus();
    expect(share).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{ArrowRight}");
    await waitFor(() => expect(item("Mail")).toHaveFocus());
    const [root, sub] = screen.getAllByRole("menu");
    expect(share).toHaveAttribute("aria-expanded", "true");
    expect(share).toHaveAttribute("data-expanded");
    expect(share).toHaveAttribute("aria-controls", sub!.id);
    expect(sub).toHaveAccessibleName("Share");
    expect(sub).toHaveAttribute("data-side", "right");
    expect(root).not.toContainElement(sub!);

    // navigation stays inside the submenu (loop)
    await user.keyboard("{ArrowDown}");
    expect(item("Copy link")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(item("Mail")).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    expect(share).toHaveFocus();
    expect(share).toHaveAttribute("aria-expanded", "false");
    // ArrowLeft in the root menu does nothing
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it.each(["{Enter}", " "])(
    "%s on a submenu trigger opens it on its first item",
    async (key) => {
      const { user, trigger } = renderMenu(nested);
      await openWithKeyboard(user, trigger);
      await user.keyboard("{ArrowDown}");
      await user.keyboard(key);
      await waitFor(() => expect(item("Mail")).toHaveFocus());
      // ArrowRight on an already open submenu trigger focuses its first item
      act(() => item("Share").focus());
      await user.keyboard("{ArrowRight}");
      expect(item("Mail")).toHaveFocus();
    },
  );

  it("Escape closes only the submenu, then the menu, returning focus each time", async () => {
    const { user, trigger, onSelect } = renderMenu(nested);
    await openWithKeyboard(user, trigger);
    await user.keyboard("{ArrowDown}{ArrowRight}");
    await waitFor(() => expect(item("Mail")).toHaveFocus());

    await user.keyboard("{Escape}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    expect(item("Share")).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("selecting in a submenu closes every menu and returns focus to the trigger", async () => {
    const { user, trigger, onSelect } = renderMenu(nested);
    await openWithKeyboard(user, trigger);
    await user.keyboard("{ArrowDown}{ArrowRight}");
    await waitFor(() => expect(item("Mail")).toHaveFocus());
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "link" }),
    );
    expect(screen.queryByRole("menu")).toBeNull();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("supports dir='rtl': ArrowLeft opens, ArrowRight closes, submenus open to the left", async () => {
    const { user, trigger } = renderMenu(nested, { dir: "rtl" });
    await openWithKeyboard(user, trigger);
    expect(screen.getByRole("menu")).toHaveAttribute("dir", "rtl");
    await user.keyboard("{ArrowDown}{ArrowRight}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    await user.keyboard("{ArrowLeft}");
    await waitFor(() => expect(item("Mail")).toHaveFocus());
    expect(screen.getAllByRole("menu")[1]).toHaveAttribute("data-side", "left");
    await user.keyboard("{ArrowRight}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    expect(item("Share")).toHaveFocus();
  });

  it("opens on hover after a short delay without moving focus into it; hovering a sibling closes it", async () => {
    const { user, trigger } = renderMenu(nested);
    await user.click(trigger);
    await user.hover(item("Share"));
    expect(item("Share")).toHaveFocus();
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    await waitFor(() => expect(screen.getAllByRole("menu")).toHaveLength(2));
    expect(item("Share")).toHaveFocus();

    // moving into the submenu highlights its items
    await user.hover(item("Copy link"));
    expect(item("Copy link")).toHaveFocus();
    expect(item("Share")).toHaveAttribute("data-expanded");

    await user.hover(item("Print"));
    expect(item("Print")).toHaveFocus();
    await waitFor(() => expect(screen.getAllByRole("menu")).toHaveLength(1));
  });

  it("a hover that leaves before the delay does not open the submenu", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      pointerEventsCheck: 0,
      advanceTimers: vi.advanceTimersByTime,
    });
    render(
      <Menu items={nested} defaultOpen>
        <button type="button">Open</button>
      </Menu>,
    );
    await user.hover(item("Share"));
    await user.hover(item("New"));
    act(() => vi.advanceTimersByTime(SUBMENU_OPEN_DELAY * 2));
    expect(screen.getAllByRole("menu")).toHaveLength(1);
  });

  it("opens on click (focus stays on the trigger item) and clicks inside the submenu do not dismiss the parent", async () => {
    const { user, trigger } = renderMenu([
      ...nested.slice(0, 1),
      {
        key: "share",
        label: "Share",
        children: [
          { key: "mail", label: "Mail" },
          { key: "off", label: "Unavailable", disabled: true },
        ],
      },
    ]);
    await user.click(trigger);
    await user.click(item("Share"));
    const sub = screen.getAllByRole("menu")[1]!;
    expect(item("Share")).toHaveFocus();
    // pointer down on the submenu panel / a disabled item: both stay open
    await user.pointer({ keys: "[MouseLeft]", target: sub });
    await user.click(item("Unavailable"));
    expect(screen.getAllByRole("menu")).toHaveLength(2);
    // pointer down in the parent menu closes the submenu only
    await user.pointer({
      keys: "[MouseLeft]",
      target: screen.getAllByRole("menu")[0]!,
    });
    await waitFor(() => expect(screen.getAllByRole("menu")).toHaveLength(1));
  });

  it("keeps the submenu open while the pointer moves towards it (safe triangle)", async () => {
    const { user, trigger } = renderMenu(nested);
    await user.click(trigger);
    await user.click(item("Share"));
    const sub = screen.getAllByRole("menu")[1]!;
    vi.spyOn(sub, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ x: 200, y: 0, width: 100, height: 200 }),
    );
    const share = item("Share");
    const print = item("Print");

    // leave the trigger at (100, 50) heading right, cross "Print" inside the triangle
    await user.pointer([
      { target: share, coords: { clientX: 100, clientY: 50 } },
      { target: print, coords: { clientX: 150, clientY: 60 } },
    ]);
    expect(print).not.toHaveFocus();
    expect(screen.getAllByRole("menu")).toHaveLength(2);

    // outside the triangle: the sibling takes the hover and the submenu closes
    await user.pointer({
      target: print,
      coords: { clientX: 150, clientY: 190 },
    });
    expect(print).toHaveFocus();
    await waitFor(() => expect(screen.getAllByRole("menu")).toHaveLength(1));
  });

  it("cannot open a disabled submenu with the keyboard", async () => {
    const { user, trigger } = renderMenu([
      { key: "x", label: "Locked", disabled: true, children: simple },
      { key: "y", label: "Other" },
    ]);
    await openWithKeyboard(user, trigger);
    act(() => item("Locked").focus());
    await user.keyboard("{ArrowRight}{Enter}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
  });
});

describe("Menu checkbox and radio items", () => {
  it("toggles uncontrolled checkbox items, keeps the menu open and remembers the state", async () => {
    const onCheckedChange = vi.fn();
    const { user, trigger, onSelect } = renderMenu([
      {
        type: "checkbox",
        key: "grid",
        label: "Show grid",
        defaultChecked: true,
        onCheckedChange,
      },
      { type: "checkbox", key: "rulers", label: "Show rulers" },
    ]);
    await openWithKeyboard(user, trigger);
    const grid = screen.getByRole("menuitemcheckbox", { name: "Show grid" });
    const rulers = screen.getByRole("menuitemcheckbox", {
      name: "Show rulers",
    });
    expect(grid).toHaveAttribute("aria-checked", "true");
    expect(grid).toHaveAttribute("data-state", "checked");
    expect(rulers).toHaveAttribute("aria-checked", "false");
    await waitFor(() => expect(grid).toHaveFocus());

    await user.keyboard(" ");
    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(false);
    expect(grid).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.click(rulers);
    expect(rulers).toHaveAttribute("aria-checked", "true");
    expect(onSelect).not.toHaveBeenCalled();

    await user.keyboard("{Escape}");
    await openWithKeyboard(user, trigger);
    expect(
      screen.getByRole("menuitemcheckbox", { name: "Show grid" }),
    ).toHaveAttribute("aria-checked", "false");
    expect(
      screen.getByRole("menuitemcheckbox", { name: "Show rulers" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it("controlled checkbox items follow `checked`; closeOnSelect closes the menu", async () => {
    const user = setupUser();
    const spy = vi.fn();
    function Controlled() {
      const [checked, setChecked] = useState(false);
      return (
        <Menu
          items={[
            {
              type: "checkbox",
              key: "wrap",
              label: "Word wrap",
              checked,
              onCheckedChange: (next) => {
                spy(next);
                setChecked(next);
              },
              closeOnSelect: true,
            },
            {
              type: "checkbox",
              key: "locked",
              label: "Locked",
              checked: true,
              onCheckedChange: spy,
            },
          ]}
        >
          <button type="button">View</button>
        </Menu>
      );
    }
    render(<Controlled />);
    const trigger = screen.getByRole("button", { name: "View" });
    await user.click(trigger);
    const locked = screen.getByRole("menuitemcheckbox", { name: "Locked" });
    await user.click(locked);
    expect(spy).toHaveBeenLastCalledWith(false);
    // the parent did not update `checked`: it stays checked
    expect(locked).toHaveAttribute("aria-checked", "true");

    await user.click(
      screen.getByRole("menuitemcheckbox", { name: "Word wrap" }),
    );
    expect(spy).toHaveBeenLastCalledWith(true);
    expect(screen.queryByRole("menu")).toBeNull();
    await user.click(trigger);
    expect(
      screen.getByRole("menuitemcheckbox", { name: "Word wrap" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it("radio groups: one checked option, labelled group, onValueChange, menu stays open", async () => {
    const onValueChange = vi.fn();
    const { user, trigger } = renderMenu([
      {
        type: "radio-group",
        key: "sort",
        label: "Sort by",
        defaultValue: "name",
        onValueChange,
        items: [
          { value: "name", label: "Name" },
          { value: "date", label: "Date" },
          { value: "size", label: "Size", disabled: true },
        ],
      },
    ]);
    await openWithKeyboard(user, trigger);
    const group = screen.getByRole("group", { name: "Sort by" });
    const radios = within(group).getAllByRole("menuitemradio");
    expect(radios.map((r) => r.getAttribute("aria-checked"))).toEqual([
      "true",
      "false",
      "false",
    ]);
    await waitFor(() => expect(radios[0]).toHaveFocus());
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith("date");
    expect(radios.map((r) => r.getAttribute("aria-checked"))).toEqual([
      "false",
      "true",
      "false",
    ]);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    // choosing the current value again does not report a change
    await user.keyboard(" ");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    await user.click(radios[2]!);
    expect(radios[2]).toHaveAttribute("aria-checked", "false");
  });

  it("controlled radio groups follow `value`; closeOnSelect closes the menu", async () => {
    const user = setupUser();
    function Controlled() {
      const [value, setValue] = useState("light");
      return (
        <>
          <output>{value}</output>
          <Menu
            items={[
              {
                type: "radio-group",
                key: "theme",
                value,
                onValueChange: setValue,
                closeOnSelect: true,
                items: [
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                ],
              },
            ]}
          >
            <button type="button">Theme</button>
          </Menu>
        </>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "Theme" }));
    expect(
      screen.getByRole("menuitemradio", { name: "Light" }),
    ).toHaveAttribute("aria-checked", "true");
    // an unlabelled group has no accessible name
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-labelledby");
    await user.click(screen.getByRole("menuitemradio", { name: "Dark" }));
    expect(screen.queryByRole("menu")).toBeNull();
    expect(screen.getByRole("status", { hidden: true })).toHaveTextContent(
      "dark",
    );
  });
});

describe("Menu modality and layers", () => {
  it("modal (default) disables outside pointer events and hides the page; non-modal does neither and closes on focus outside", async () => {
    const modal = renderMenu(simple);
    await modal.user.click(modal.trigger);
    expect(document.body.style.pointerEvents).toBe("none");
    expect(screen.queryByRole("button", { name: "After" })).toBeNull();
    await modal.user.keyboard("{Escape}");
    expect(document.body.style.pointerEvents).toBe("");
    document.body.innerHTML = "";

    const { user, trigger } = renderMenu(simple, { modal: false });
    await user.click(trigger);
    expect(document.body.style.pointerEvents).toBe("");
    const after = screen.getByRole("button", { name: "After" });
    act(() => after.focus());
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(after).toHaveFocus();
  });

  it("non-modal: clicking outside closes without pulling focus back to the trigger", async () => {
    const { user, trigger } = renderMenu(simple, { modal: false });
    await user.click(trigger);
    const after = screen.getByRole("button", { name: "After" });
    await user.click(after);
    expect(screen.queryByRole("menu")).toBeNull();
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(after).toHaveFocus();
  });

  it("inside a Modal: Escape closes the submenu, then the menu, and leaves the Modal open", async () => {
    const user = setupUser();
    const onOpenChange = vi.fn();
    render(
      <ModalRoot open onOpenChange={onOpenChange}>
        <ModalContent hideCloseButton>
          <ModalHeader>Settings</ModalHeader>
          <Menu items={nested}>
            <button type="button">Nested</button>
          </Menu>
        </ModalContent>
      </ModalRoot>,
    );
    const trigger = screen.getByRole("button", { name: "Nested" });
    await openWithKeyboard(user, trigger);
    await user.keyboard("{ArrowDown}{ArrowRight}");
    await waitFor(() => expect(item("Mail")).toHaveFocus());
    // a click in the submenu does not dismiss the menu nor the Modal
    await user.pointer({
      keys: "[MouseLeft]",
      target: screen.getAllByRole("menu")[1]!,
    });
    expect(screen.getAllByRole("menu")).toHaveLength(2);

    await user.keyboard("{Escape}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Tab from the menu stays inside the Modal
    await openWithKeyboard(user, trigger);
    await user.tab();
    expect(screen.queryByRole("menu")).toBeNull();
    await waitFor(() =>
      expect(screen.getByRole("dialog")).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
  });

  it("portals the menu and its submenus into the scoped ConfigProvider container", async () => {
    const user = setupUser();
    render(
      <ConfigProvider theme="light">
        <ConfigProvider theme="dark">
          <Menu items={nested}>
            <button type="button">Scoped</button>
          </Menu>
        </ConfigProvider>
      </ConfigProvider>,
    );
    await openWithKeyboard(
      user,
      screen.getByRole("button", { name: "Scoped" }),
    );
    await user.keyboard("{ArrowDown}{ArrowRight}");
    await waitFor(() => expect(item("Mail")).toHaveFocus());
    for (const menu of screen.getAllByRole("menu")) {
      const host = menu.closest("[data-minerva-portal-host]");
      expect(host).not.toBeNull();
      expect(host).toHaveAttribute("data-theme", "dark");
    }
  });

  it("renders on the server without the menu, even when defaultOpen", () => {
    const html = renderToString(
      <Menu items={nested} defaultOpen>
        <button type="button">SSR</button>
      </Menu>,
    );
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('aria-expanded="true"');
    expect(html).not.toContain('role="menu"');
    expect(
      renderToString(
        <ContextMenu items={simple}>
          <div>Area</div>
        </ContextMenu>,
      ),
    ).not.toContain("data-menu-");
  });
});

describe("ContextMenu", () => {
  function renderContext(
    extra: Partial<React.ComponentProps<typeof ContextMenu>> = {},
  ) {
    const user = setupUser();
    const onSelect = vi.fn();
    render(
      <ContextMenu items={nested} onSelect={onSelect} {...extra}>
        <div data-testid="area">
          <button type="button">Inner</button>
        </div>
      </ContextMenu>,
    );
    return { user, onSelect, area: screen.getByTestId("area") };
  }

  it("opens at the pointer, focuses the first item and repositions on another right click", async () => {
    const { area } = renderContext();
    const event = fireEvent.contextMenu(area, { clientX: 120, clientY: 80 });
    expect(event).toBe(false); // default prevented
    const menu = screen.getByRole("menu");
    // anchored to a zero-size point (2px gap; may flip in the test viewport)
    await waitFor(() => expect(menu.style.top).toBe("80px"));
    expect(Math.abs(parseFloat(menu.style.left) - 120)).toBe(2);
    await waitFor(() => expect(item("New")).toHaveFocus());

    // a right click in the area while open moves the menu
    fireEvent.pointerDown(area, { button: 2, pointerType: "mouse" });
    fireEvent.contextMenu(area, { clientX: 300, clientY: 200 });
    await waitFor(() =>
      expect(screen.getByRole("menu").style.top).toBe("200px"),
    );
    expect(
      Math.abs(parseFloat(screen.getByRole("menu").style.left) - 300),
    ).toBe(2);
    expect(screen.getAllByRole("menu")).toHaveLength(1);
  });

  it("Shift+F10 / the ContextMenu key open it at the area; Escape returns focus to the focused element", async () => {
    const { user } = renderContext();
    const inner = screen.getByRole("button", { name: "Inner" });
    act(() => inner.focus());
    await user.keyboard("{Shift>}{F10}{/Shift}");
    await waitFor(() => expect(item("New")).toHaveFocus());
    expect(screen.getByRole("menu")).toHaveAttribute("data-side", "bottom");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
    await waitFor(() => expect(inner).toHaveFocus());

    fireEvent.keyDown(inner, { key: "ContextMenu" });
    await waitFor(() => expect(item("New")).toHaveFocus());
  });

  it("supports submenus, selection and closes on Tab", async () => {
    const { user, area, onSelect } = renderContext();
    fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
    await waitFor(() => expect(item("New")).toHaveFocus());
    await user.keyboard("{ArrowDown}{ArrowRight}");
    await waitFor(() => expect(item("Mail")).toHaveFocus());
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "mail" }),
    );
    expect(screen.queryByRole("menu")).toBeNull();

    fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
    await waitFor(() => expect(item("New")).toHaveFocus());
    await user.tab();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("closes on a left click outside or in the area", async () => {
    const { user, area } = renderContext();
    fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
    await screen.findByRole("menu");
    await new Promise((resolve) => setTimeout(resolve, 0));
    await user.click(area);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });

  it("opens after a touch long press, not after a short tap", () => {
    vi.useFakeTimers();
    const { area } = renderContext();
    fireEvent.pointerDown(area, {
      pointerType: "touch",
      clientX: 40,
      clientY: 50,
    });
    fireEvent.pointerUp(area, { pointerType: "touch" });
    act(() => vi.advanceTimersByTime(LONG_PRESS_DELAY));
    expect(screen.queryByRole("menu")).toBeNull();

    fireEvent.pointerDown(area, {
      pointerType: "touch",
      clientX: 40,
      clientY: 50,
    });
    act(() => vi.advanceTimersByTime(LONG_PRESS_DELAY));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("leaves the native menu alone when disabled", () => {
    renderContext({ disabled: true });
    const area = screen.getByTestId("area");
    expect(fireEvent.contextMenu(area)).toBe(true);
    fireEvent.keyDown(area, { key: "ContextMenu" });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(area).not.toHaveAttribute("data-disabled");
  });
});
