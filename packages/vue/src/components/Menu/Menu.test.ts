import { defineComponent, h, nextTick, ref } from "vue";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import styles from "@react-styles/components/Menu/menu.module.scss";
import { ContextMenu, Menu, type MenuEntry, type MenuProps } from ".";
import { Button } from "../Button";
import { ModalContent, ModalHeader, ModalRoot } from "../Modal";

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

const deleteItem = { key: "delete", label: "Delete" };
const items: MenuEntry[] = [
  {
    key: "edit",
    label: "Edit",
    icon: h("svg", { "data-testid": "edit-icon" }),
    shortcut: "⌘E",
  },
  { key: "dup", label: "Duplicate" },
  { type: "separator", key: "sep" },
  {
    type: "group",
    key: "danger",
    label: "Danger zone",
    items: [deleteItem],
  },
];

function renderMenu(
  extra: Partial<MenuProps> & Record<string, unknown> = {},
  entries: MenuEntry[] = items,
) {
  const onSelect = vi.fn();
  render(Menu, {
    props: { items: entries, onSelect, ...extra },
    slots: { trigger: () => h("button", { type: "button" }, "Actions") },
  });
  return {
    onSelect,
    trigger: screen.getByRole("button", { name: "Actions" }),
  };
}

describe("Menu", () => {
  it("opens on click with items, icons, shortcuts, separators and group labels", async () => {
    const user = setupUser();
    const { trigger } = renderMenu({ size: "small" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    const menu = screen.getByRole("menu");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveClass(styles.content, styles.small);
    await waitFor(() => expect(menu).toHaveAttribute("data-side", "bottom"));
    expect(menu).toHaveAttribute("data-align", "end");

    const menuItems = within(menu).getAllByRole("menuitem");
    expect(
      menuItems.map((i) => i.querySelector(`.${styles.text}`)?.textContent),
    ).toEqual(["Edit", "Duplicate", "Delete"]);
    const edit = menuItems[0]!;
    expect(edit).toHaveClass(styles.item);
    expect(edit.querySelector(`.${styles.icon}`)).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(within(edit).getByTestId("edit-icon")).toBeInTheDocument();
    expect(edit.querySelector(`.${styles.shortcut}`)).toHaveTextContent("⌘E");
    expect(menuItems[1]!.querySelector(`.${styles.icon}`)).toBeNull();
    expect(menuItems[1]!.querySelector(`.${styles.shortcut}`)).toBeNull();

    expect(within(menu).getByRole("separator")).toHaveClass(styles.separator);
    const group = within(menu).getByRole("group");
    expect(within(group).getByText("Danger zone")).toHaveClass(styles.label);
    expect(
      within(group).getByRole("menuitem", { name: "Delete" }),
    ).toBeInTheDocument();
  });

  it("applies side/align props, the medium size by default, class and aria-label", async () => {
    const user = setupUser();
    const { trigger } = renderMenu({
      side: "top",
      align: "start",
      class: "extra",
      "aria-label": "Row actions",
    });
    await user.click(trigger);
    const menu = screen.getByRole("menu", { name: "Row actions" });
    expect(menu).toHaveClass(styles.content, "extra");
    expect(menu).not.toHaveClass(styles.small);
    expect(menu).not.toHaveAttribute("aria-labelledby");
    await waitFor(() => expect(menu).toHaveAttribute("data-side", "top"));
    expect(menu).toHaveAttribute("data-align", "start");
  });

  it("renders labels and icons given as render functions and components", async () => {
    const user = setupUser();
    const Icon = defineComponent(() => () => h("i", { "data-testid": "c" }));
    const { trigger } = renderMenu({}, [
      { key: "a", label: () => h("b", "Bold"), textValue: "Bold", icon: Icon },
      { key: "n", label: 42 },
    ]);
    await user.click(trigger);
    expect(screen.getByRole("menuitem", { name: "Bold" })).toBeInTheDocument();
    expect(screen.getByTestId("c")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "42" })).toHaveAttribute(
      "data-text-value",
      "42",
    );
  });

  it("selects via pointer, passing the original item, then closes", async () => {
    const user = setupUser();
    const { trigger, onSelect } = renderMenu();
    await user.click(trigger);
    await user.click(screen.getByRole("menuitem", { name: /Delete/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(deleteItem);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });

  it("supports keyboard navigation (arrows, typeahead via textValue) and Escape closes with focus return", async () => {
    const user = setupUser();
    const { trigger, onSelect } = renderMenu({}, [
      { key: "a", label: h("b", "Alpha"), textValue: "Alpha" },
      { key: "b", label: "Beta", disabled: true },
      { key: "c", label: "Gamma" },
    ]);
    trigger.focus();
    await user.keyboard("{Enter}");
    const menu = await screen.findByRole("menu");
    await waitFor(() =>
      expect(
        within(menu).getByRole("menuitem", { name: "Alpha" }),
      ).toHaveFocus(),
    );
    const beta = within(menu).getByRole("menuitem", { name: "Beta" });
    expect(beta).toHaveAttribute("aria-disabled", "true");
    await user.keyboard("{ArrowDown}");
    expect(within(menu).getByRole("menuitem", { name: "Gamma" })).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(within(menu).getByRole("menuitem", { name: "Alpha" })).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(onSelect).not.toHaveBeenCalled();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("opens submenus and selects nested items", async () => {
    const user = setupUser();
    const nested = { key: "csv", label: "CSV" };
    const { trigger, onSelect } = renderMenu({}, [
      {
        key: "export",
        label: "Export",
        children: [nested, { key: "json", label: "JSON" }],
      },
    ]);
    await user.click(trigger);
    const sub = screen.getByRole("menuitem", { name: "Export" });
    expect(sub).toHaveAttribute("aria-haspopup", "menu");
    expect(sub.querySelector(`.${styles.chevron}`)).not.toBeNull();
    sub.focus();
    await user.keyboard("{ArrowRight}");
    const menus = await screen.findAllByRole("menu");
    expect(menus).toHaveLength(2);
    expect(menus[1]).toHaveClass(styles.content);
    expect(menus[1]).not.toHaveClass(styles.small);
    await waitFor(() =>
      expect(
        within(menus[1]!).getByRole("menuitem", { name: "CSV" }),
      ).toHaveFocus(),
    );
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(nested);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });

  it("renders a disabled submenu trigger that cannot open", async () => {
    const user = setupUser();
    const { trigger } = renderMenu({}, [
      {
        key: "x",
        label: "Locked",
        disabled: true,
        children: [{ key: "y", label: "Y" }],
      },
    ]);
    await user.click(trigger);
    const sub = screen.getByRole("menuitem", { name: "Locked" });
    expect(sub).toHaveAttribute("aria-disabled", "true");
    await user.click(sub);
    expect(screen.getAllByRole("menu")).toHaveLength(1);
  });

  it("supports v-model:open", async () => {
    const user = setupUser();
    const onOpenChange = vi.fn();
    const open = ref(true);
    render(
      defineComponent(() => () => [
        h("span", { "data-testid": "state" }, String(open.value)),
        h(
          Menu,
          {
            items,
            open: open.value,
            "onUpdate:open": (next: boolean) => (open.value = next),
            onOpenChange,
          },
          { trigger: () => h("button", { type: "button" }, "C") },
        ),
      ]),
    );
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
    await tick();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(screen.getByTestId("state")).toHaveTextContent("false");

    open.value = true;
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
  });

  it("supports defaultOpen and a disabled trigger", async () => {
    const user = setupUser();
    const first = render(Menu, {
      props: { items, defaultOpen: true },
      slots: { default: () => h("button", { type: "button" }, "D") },
    });
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
    first.unmount();

    const { trigger } = renderMenu({ disabled: true });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("data-disabled", "");
    await user.click(trigger);
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await tick();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("works with a Button trigger: disabled actions are ignored and focus returns after selection", async () => {
    const onSelect = vi.fn();
    render(Menu, {
      props: {
        items: [
          { key: "disabled", label: "Disabled", disabled: true },
          { key: "edit", label: "Edit" },
        ],
        onSelect,
      },
      slots: { trigger: () => h(Button, null, () => "Actions") },
    });
    const trigger = screen.getByRole("button", { name: "Actions" });
    await fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await tick();
    const disabled = document.querySelector<HTMLElement>(
      '[role="menuitem"][data-disabled]',
    )!;
    expect(disabled.textContent).toBe("Disabled");
    disabled.click();
    expect(onSelect).not.toHaveBeenCalled();
    const item = document.querySelector<HTMLElement>(
      '[role="menuitem"]:not([data-disabled])',
    )!;
    await fireEvent.keyDown(item, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "edit" }),
    );
    await nextTick();
    expect(document.querySelector('[role="menu"]')).toBeNull();
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(document.activeElement).toBe(trigger);
  });

  it("keeps menu focus and Escape inside an enclosing modal dialog", async () => {
    const onOpenChange = vi.fn();
    render(
      defineComponent(
        () => () =>
          h(ModalRoot, { open: true, onOpenChange }, () =>
            h(ModalContent, { hideCloseButton: true }, () => [
              h(ModalHeader, null, () => "Settings"),
              h(
                Menu,
                { items: [{ key: "edit", label: "Edit" }] },
                {
                  trigger: () =>
                    h(Button, { "aria-label": "Nested actions" }, () => "..."),
                },
              ),
            ]),
          ),
      ),
    );
    await tick();
    const trigger = screen.getByRole("button", { name: "Nested actions" });
    await fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(document.activeElement?.getAttribute("role")).toBe("menuitem");
    await fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(document.querySelector('[role="menu"]')).toBeNull(),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("ContextMenu (basics)", () => {
  it("opens on right-click, renders entries and selects an item", async () => {
    const user = setupUser();
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(ContextMenu, {
      props: {
        items,
        onSelect,
        onOpenChange,
        size: "small",
        ariaLabel: "Row menu",
      },
      slots: { default: () => h("div", "Row") },
    });
    expect(screen.queryByRole("menu")).toBeNull();
    await fireEvent.contextMenu(screen.getByText("Row"));
    const menu = await screen.findByRole("menu", { name: "Row menu" });
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(menu).toHaveClass(styles.content, styles.small);
    expect(within(menu).getByRole("separator")).toHaveClass(styles.separator);
    expect(within(menu).getByText("Danger zone")).toHaveClass(styles.label);

    await user.click(within(menu).getByRole("menuitem", { name: /Duplicate/ }));
    expect(onSelect).toHaveBeenCalledWith(items[1]);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("closes on Escape without selecting", async () => {
    const user = setupUser();
    const onSelect = vi.fn();
    render(ContextMenu, {
      props: { items, onSelect },
      slots: { default: () => h("div", "Area") },
    });
    await fireEvent.contextMenu(screen.getByText("Area"));
    await screen.findByRole("menu");
    await tick();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("does nothing when disabled", async () => {
    render(ContextMenu, {
      props: { items, disabled: true },
      slots: { default: () => h("div", "Off") },
    });
    await fireEvent.contextMenu(screen.getByText("Off"));
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

// Trigger keyboard, selection and dismissal behaviours.
describe("Menu keyboard and dismissal", () => {
  const actions: MenuEntry[] = [
    { key: "edit", label: "Edit" },
    { key: "archive", label: "Archive", disabled: true },
    { key: "delete", label: "Delete" },
    { key: "off", label: "Off", disabled: true },
  ];

  function setup(extra: Partial<MenuProps> = {}) {
    const user = setupUser();
    const onSelect = vi.fn();
    render(
      defineComponent(() => () => [
        h(
          Menu,
          { items: actions, onSelect, ariaLabel: "Row actions", ...extra },
          { trigger: () => h("button", { type: "button" }, "Actions") },
        ),
        h("button", { type: "button" }, "Outside"),
      ]),
    );
    return {
      user,
      onSelect,
      trigger: screen.getByRole("button", { name: "Actions" }),
    };
  }
  const item = (name: string) => screen.getByRole("menuitem", { name });

  it.each(["{Enter}", " ", "{ArrowDown}"])(
    "opens with %s and focuses the first enabled item",
    async (key) => {
      const { user, trigger } = setup();
      await user.tab();
      expect(trigger).toHaveFocus();
      await user.keyboard(key);
      expect(screen.getByRole("menu", { name: "Row actions" })).toBeVisible();
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      await waitFor(() => expect(item("Edit")).toHaveFocus());
    },
  );

  it("moves with arrows skipping disabled items, and Home / End jump to the ends", async () => {
    const { user } = setup();
    await user.tab();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(item("Edit")).toHaveFocus());
    expect(item("Archive")).toHaveAttribute("aria-disabled", "true");

    await user.keyboard("{ArrowDown}");
    expect(item("Delete")).toHaveFocus();
    // "Off" is disabled: focus wraps around to the first enabled item (loop)
    await user.keyboard("{ArrowDown}");
    expect(item("Edit")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(item("Delete")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(item("Edit")).toHaveFocus();
    await user.keyboard("{End}");
    expect(item("Delete")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(item("Edit")).toHaveFocus();
    // modified keys are left alone
    await user.keyboard("{Control>}{ArrowDown}{/Control}");
    expect(item("Edit")).toHaveFocus();
  });

  it.each(["{Enter}", " "])(
    "selects the active item with %s, closes and returns focus to the trigger",
    async (key) => {
      const { user, trigger, onSelect } = setup();
      await user.tab();
      await user.keyboard("{ArrowDown}");
      await waitFor(() => expect(item("Edit")).toHaveFocus());
      await user.keyboard("{ArrowDown}");
      expect(item("Delete")).toHaveFocus();
      await user.keyboard(key);
      expect(onSelect).toHaveBeenCalledExactlyOnceWith(actions[2]);
      await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
      await waitFor(() => expect(trigger).toHaveFocus());
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    },
  );

  it("ignores clicks on disabled items without closing", async () => {
    const { user, trigger, onSelect } = setup();
    await user.click(trigger);
    await user.click(item("Archive"));
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles with the trigger and closes when clicking outside", async () => {
    const { user, trigger } = setup();
    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(trigger);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());

    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await tick();
    // Modal menus hide the rest of the page from assistive technologies
    await user.click(
      screen.getByRole("button", { name: "Outside", hidden: true }),
    );
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("Enter on the trigger toggles the open menu closed", async () => {
    const { trigger } = setup();
    await fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await fireEvent.keyDown(trigger, { key: "Enter" });
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });

  it("stays closed while controlled closed, reporting the open request", async () => {
    const user = setupUser();
    const onOpenChange = vi.fn();
    const { rerender } = render(Menu, {
      props: { items: actions, open: false, onOpenChange },
      slots: { trigger: () => h("button", { type: "button" }, "Actions") },
    });
    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByRole("menu")).toBeNull();
    await rerender({ open: true });
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("keeps the trigger's own handlers", async () => {
    const user = setupUser();
    const onClick = vi.fn();
    const onKeydown = vi.fn();
    render(Menu, {
      props: { items: actions },
      slots: {
        trigger: () =>
          h("button", { type: "button", onClick, onKeydown }, "Own"),
      },
    });
    await user.click(screen.getByRole("button", { name: "Own" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await tick();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    screen.getByRole("button", { name: "Own" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(onKeydown).toHaveBeenCalled();
  });

  it("a trigger handler calling preventDefault() keeps the menu closed", async () => {
    const user = setupUser();
    render(Menu, {
      props: { items: actions },
      slots: {
        trigger: () =>
          h(
            "button",
            {
              type: "button",
              onClick: (e: Event) => e.preventDefault(),
              onKeydown: (e: Event) => e.preventDefault(),
            },
            "Blocked",
          ),
      },
    });
    const trigger = screen.getByRole("button", { name: "Blocked" });
    await user.click(trigger);
    await fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(screen.queryByRole("menu")).toBeNull();
  });
});
