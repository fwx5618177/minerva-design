import { useState } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContextMenu, Menu, type MenuEntry, type MenuProps } from ".";
import { IconButton } from "../IconButton";
import { ModalContent, ModalHeader, ModalRoot } from "../Modal";
import styles from "./menu.module.scss";

const deleteItem = { key: "delete", label: "Delete" };
const items: MenuEntry[] = [
  {
    key: "edit",
    label: "Edit",
    icon: <svg data-testid="edit-icon" />,
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

function renderMenu(extra: Partial<MenuProps> = {}) {
  const onSelect = vi.fn();
  render(
    <Menu items={items} onSelect={onSelect} {...extra}>
      <button type="button">Actions</button>
    </Menu>,
  );
  return {
    onSelect,
    trigger: screen.getByRole("button", { name: "Actions" }),
  };
}

describe("Menu", () => {
  it("opens on click with items, icons, shortcuts, separators and group labels", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { trigger } = renderMenu({ size: "small" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    const menu = screen.getByRole("menu");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveClass(styles.content, styles.small);
    expect(menu).toHaveAttribute("data-side", "bottom");
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

  it("applies side/align props, the medium size by default, className and aria-label", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { trigger } = renderMenu({
      side: "top",
      align: "start",
      className: "extra",
      "aria-label": "Row actions",
    });
    await user.click(trigger);
    const menu = screen.getByRole("menu", { name: "Row actions" });
    expect(menu).toHaveClass(styles.content, "extra");
    expect(menu).not.toHaveClass(styles.small);
    expect(menu).toHaveAttribute("data-side", "top");
    expect(menu).toHaveAttribute("data-align", "start");
  });

  it("selects via pointer, passing the original item, then closes", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { trigger, onSelect } = renderMenu();
    await user.click(trigger);
    await user.click(screen.getByRole("menuitem", { name: /Delete/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(deleteItem);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });

  it("supports keyboard navigation (arrows, typeahead via textValue) and Escape closes with focus return", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelect = vi.fn();
    render(
      <Menu
        onSelect={onSelect}
        items={[
          { key: "a", label: <b>Alpha</b>, textValue: "Alpha" },
          { key: "b", label: "Beta", disabled: true },
          { key: "c", label: "Gamma" },
        ]}
      >
        <button type="button">Open</button>
      </Menu>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
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
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelect = vi.fn();
    const nested = { key: "csv", label: "CSV" };
    render(
      <Menu
        onSelect={onSelect}
        items={[
          {
            key: "export",
            label: "Export",
            children: [nested, { key: "json", label: "JSON" }],
          },
        ]}
      >
        <button type="button">More</button>
      </Menu>,
    );
    await user.click(screen.getByRole("button", { name: "More" }));
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
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Menu
        items={[
          {
            key: "x",
            label: "Locked",
            disabled: true,
            children: [{ key: "y", label: "Y" }],
          },
        ]}
      >
        <button type="button">M</button>
      </Menu>,
    );
    await user.click(screen.getByRole("button", { name: "M" }));
    const sub = screen.getByRole("menuitem", { name: "Locked" });
    expect(sub).toHaveAttribute("aria-disabled", "true");
    await user.click(sub);
    expect(screen.getAllByRole("menu")).toHaveLength(1);
  });

  it("supports controlled open state", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onOpenChange = vi.fn();
    function Controlled() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <span data-testid="state">{String(open)}</span>
          <Menu
            items={items}
            open={open}
            onOpenChange={(next) => {
              onOpenChange(next);
              setOpen(next);
            }}
          >
            <button type="button">C</button>
          </Menu>
        </>
      );
    }
    render(<Controlled />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(screen.getByTestId("state")).toHaveTextContent("false");
  });

  it("supports defaultOpen and a disabled trigger", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { unmount } = render(
      <Menu items={items} defaultOpen>
        <button type="button">D</button>
      </Menu>,
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
    unmount();

    render(
      <Menu items={items} disabled>
        <button type="button">X</button>
      </Menu>,
    );
    const trigger = screen.getByRole("button", { name: "X" });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("works with an IconButton trigger: disabled actions are ignored and focus returns after selection", async () => {
    const onSelect = vi.fn();
    render(
      <Menu
        items={[
          { key: "disabled", label: "Disabled", disabled: true },
          { key: "edit", label: "Edit" },
        ]}
        onSelect={onSelect}
      >
        <IconButton aria-label="Actions" icon="..." />
      </Menu>,
    );
    const trigger = screen.getByRole("button", { name: "Actions" });
    await act(async () => {
      fireEvent.keyDown(trigger, { key: "ArrowDown" });
    });
    const disabled = document.querySelector<HTMLElement>(
      '[role="menuitem"][data-menu-disabled]',
    )!;
    expect(disabled.textContent).toBe("Disabled");
    await act(async () => disabled.click());
    expect(onSelect).not.toHaveBeenCalled();
    const item = document.querySelector<HTMLElement>(
      '[role="menuitem"]:not([data-menu-disabled])',
    )!;
    await act(async () => {
      fireEvent.keyDown(item, { key: "Enter" });
    });
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "edit" }),
    );
    expect(document.querySelector('[role="menu"]')).toBeNull();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    expect(document.activeElement).toBe(trigger);
  });

  it("keeps menu focus and Escape inside an enclosing modal dialog", async () => {
    const onOpenChange = vi.fn();
    render(
      <ModalRoot open onOpenChange={onOpenChange}>
        <ModalContent hideCloseButton>
          <ModalHeader>Settings</ModalHeader>
          <Menu items={[{ key: "edit", label: "Edit" }]}>
            <IconButton aria-label="Nested actions" icon="..." />
          </Menu>
        </ModalContent>
      </ModalRoot>,
    );
    const trigger = screen.getByRole("button", { name: "Nested actions" });
    await act(async () => {
      fireEvent.keyDown(trigger, { key: "ArrowDown" });
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    expect(document.activeElement?.getAttribute("role")).toBe("menuitem");
    await act(async () => {
      fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    });
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(document.querySelector('[role="menu"]')).toBeNull();
  });
});

describe("ContextMenu", () => {
  it("opens on right-click, renders entries and selects an item", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <ContextMenu
        items={items}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
        size="small"
        aria-label="Row menu"
      >
        <div>Row</div>
      </ContextMenu>,
    );
    expect(screen.queryByRole("menu")).toBeNull();
    fireEvent.contextMenu(screen.getByText("Row"));
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
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelect = vi.fn();
    render(
      <ContextMenu items={items} onSelect={onSelect}>
        <div>Area</div>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText("Area"));
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("opens context submenus", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <ContextMenu
        items={[
          {
            key: "move",
            label: "Move to",
            children: [{ key: "top", label: "Top" }],
          },
        ]}
        onSelect={onSelect}
      >
        <div>Zone</div>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText("Zone"));
    const sub = await screen.findByRole("menuitem", { name: "Move to" });
    sub.focus();
    await user.keyboard("{ArrowRight}");
    expect(await screen.findAllByRole("menu")).toHaveLength(2);
  });

  it("does nothing when disabled", () => {
    render(
      <ContextMenu items={items} disabled>
        <div>Off</div>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText("Off"));
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
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelect = vi.fn();
    render(
      <>
        <Menu
          items={actions}
          onSelect={onSelect}
          aria-label="Row actions"
          {...extra}
        >
          <button type="button">Actions</button>
        </Menu>
        <button type="button">Outside</button>
      </>,
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

  it("closes with Escape without selecting and returns focus to the trigger", async () => {
    const { user, trigger, onSelect } = setup();
    await user.tab();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(item("Edit")).toHaveFocus());
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(onSelect).not.toHaveBeenCalled();
  });

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
    // Modal menus hide the rest of the page from assistive technologies
    await user.click(
      screen.getByRole("button", { name: "Outside", hidden: true }),
    );
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("stays closed while controlled closed, reporting the open request", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Menu items={actions} open={false} onOpenChange={onOpenChange}>
        <button type="button">Actions</button>
      </Menu>,
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByRole("menu")).toBeNull();
    rerender(
      <Menu items={actions} open onOpenChange={onOpenChange}>
        <button type="button">Actions</button>
      </Menu>,
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("keeps the trigger's own handlers", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    render(
      <Menu items={actions}>
        <button type="button" onClick={onClick} onKeyDown={onKeyDown}>
          Own
        </button>
      </Menu>,
    );
    await user.click(screen.getByRole("button", { name: "Own" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    screen.getByRole("button", { name: "Own" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(onKeyDown).toHaveBeenCalled();
  });
});
