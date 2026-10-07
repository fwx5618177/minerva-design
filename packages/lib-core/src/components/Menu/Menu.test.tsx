// Ported from @novel-isr/ui src/components/Menu/__test__/Menu.test.tsx and the
// Menu part of src/components/__test__/AdminPrimitives.test.tsx.
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
import * as Dialog from "@radix-ui/react-dialog";
import { describe, expect, it, vi } from "vitest";
import { ContextMenu, Menu, type MenuEntry, type MenuProps } from ".";
import { IconButton } from "../IconButton";

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
    expect(menu).toHaveClass(
      "ui-menu-content",
      "ui-menu-size-sm",
      "content",
      "small",
    );
    expect(menu).toHaveAttribute("data-side", "bottom");
    expect(menu).toHaveAttribute("data-align", "end");

    const menuItems = within(menu).getAllByRole("menuitem");
    expect(
      menuItems.map((i) => i.querySelector(".ui-menu-text")?.textContent),
    ).toEqual(["Edit", "Duplicate", "Delete"]);
    const edit = menuItems[0]!;
    expect(edit).toHaveClass("ui-menu-item", "item");
    expect(edit.querySelector(".ui-menu-icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(within(edit).getByTestId("edit-icon")).toBeInTheDocument();
    expect(edit.querySelector(".ui-menu-shortcut")).toHaveTextContent("⌘E");
    expect(menuItems[1]!.querySelector(".ui-menu-icon")).toBeNull();
    expect(menuItems[1]!.querySelector(".ui-menu-shortcut")).toBeNull();

    expect(within(menu).getByRole("separator")).toHaveClass(
      "ui-menu-separator",
    );
    const group = within(menu).getByRole("group");
    expect(within(group).getByText("Danger zone")).toHaveClass("ui-menu-label");
    expect(
      within(group).getByRole("menuitem", { name: "Delete" }),
    ).toBeInTheDocument();
  });

  it("applies side/align props, the medium size by default, className and ariaLabel", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { trigger } = renderMenu({
      side: "top",
      align: "start",
      className: "extra",
      ariaLabel: "Row actions",
    });
    await user.click(trigger);
    const menu = screen.getByRole("menu", { name: "Row actions" });
    expect(menu).toHaveClass("ui-menu-size-md", "extra");
    expect(menu).not.toHaveClass("small");
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
    expect(sub.querySelector(".ui-menu-chevron")).not.toBeNull();
    sub.focus();
    await user.keyboard("{ArrowRight}");
    const menus = await screen.findAllByRole("menu");
    expect(menus).toHaveLength(2);
    expect(menus[1]).toHaveClass("ui-menu-content", "ui-menu-size-md");
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
        <IconButton ariaLabel="Actions" icon="..." />
      </Menu>,
    );
    const trigger = screen.getByRole("button", { name: "Actions" });
    await act(async () => {
      fireEvent.keyDown(trigger, { key: "ArrowDown" });
    });
    const disabled = document.querySelector<HTMLElement>(
      '[role="menuitem"][data-disabled]',
    )!;
    expect(disabled.textContent).toBe("Disabled");
    await act(async () => disabled.click());
    expect(onSelect).not.toHaveBeenCalled();
    const item = document.querySelector<HTMLElement>(
      '[role="menuitem"]:not([data-disabled])',
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
      <Dialog.Root open onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Content aria-describedby={undefined}>
            <Dialog.Title>Settings</Dialog.Title>
            <Menu items={[{ key: "edit", label: "Edit" }]}>
              <IconButton ariaLabel="Nested actions" icon="..." />
            </Menu>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
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
        ariaLabel="Row menu"
      >
        <div>Row</div>
      </ContextMenu>,
    );
    expect(screen.queryByRole("menu")).toBeNull();
    fireEvent.contextMenu(screen.getByText("Row"));
    const menu = await screen.findByRole("menu", { name: "Row menu" });
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(menu).toHaveClass("ui-menu-content", "ui-menu-size-sm");
    expect(within(menu).getByRole("separator")).toHaveClass(
      "ui-menu-separator",
    );
    expect(within(menu).getByText("Danger zone")).toHaveClass("ui-menu-label");

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
