import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Dropdown from "./Dropdown";
import type { DropdownOption } from "./types";

const items: DropdownOption[] = [
  { label: "Edit", value: "edit" },
  { label: "Archive", value: "archive", disabled: true },
  { label: "Delete", value: "delete" },
];

const getTrigger = () => screen.getByRole("button", { name: "Dropdown" });
const getMenu = () => screen.getByRole("menu", { name: "Actions" });
const getItem = (name: string) => screen.getByRole("menuitem", { name });

describe("Dropdown", () => {
  it("renders a default trigger button and a closed menu", () => {
    const { container } = render(
      <Dropdown ariaLabel="Actions" items={items} />,
    );
    const trigger = getTrigger();
    expect(trigger).toBeEnabled();
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();

    // The root wrapper is not a menu and not a tab stop.
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("dropdown");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");
  });

  it("renders custom trigger children instead of the default button", () => {
    render(
      <Dropdown ariaLabel="Actions" items={items}>
        <span>Open menu</span>
      </Dropdown>,
    );
    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger.tagName).toBe("SPAN");
    expect(trigger).toHaveAttribute("tabindex", "0");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(
      screen.queryByRole("button", { name: "Dropdown" }),
    ).not.toBeInTheDocument();
  });

  it("does not nest interactive roles around a custom button trigger", () => {
    render(
      <Dropdown ariaLabel="Actions" items={items}>
        <button type="button">More</button>
      </Dropdown>,
    );
    expect(screen.getAllByRole("button")).toHaveLength(1);
    const trigger = screen.getByRole("button", { name: "More" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).not.toHaveAttribute("role");
  });

  it("toggles the menu when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Dropdown ariaLabel="Actions" items={items} />);
    const trigger = getTrigger();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", getMenu().id);
    const options = screen.getAllByRole("menuitem");
    expect(options.map((o) => o.textContent)).toEqual([
      "Edit",
      "Archive",
      "Delete",
    ]);

    await user.click(trigger);
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("has exactly one menu, containing the menuitems", async () => {
    const user = userEvent.setup();
    render(<Dropdown ariaLabel="Actions" items={items} />);
    await user.click(getTrigger());

    expect(screen.getAllByRole("menu")).toHaveLength(1);
    expect(getMenu().tagName).toBe("UL");
    screen
      .getAllByRole("menuitem")
      .forEach((item) => expect(getMenu()).toContainElement(item));
  });

  it("calls onSelect with the item and closes the menu", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown ariaLabel="Actions" items={items} onSelect={onSelect} />);

    await user.click(getTrigger());
    await user.click(getItem("Delete"));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(items[2]);
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });

  it("ignores clicks on disabled items without closing the menu", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown ariaLabel="Actions" items={items} onSelect={onSelect} />);

    await user.click(getTrigger());
    const archived = getItem("Archive");
    expect(archived).toHaveClass("disabled");
    expect(archived).toHaveAttribute("aria-disabled", "true");
    expect(archived).toHaveAttribute("tabindex", "-1");
    expect(getItem("Edit")).not.toHaveAttribute("aria-disabled");
    expect(getItem("Edit")).toHaveAttribute("tabindex", "0");

    await user.click(archived);
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    expect(getTrigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown ariaLabel="Actions" items={items} disabled>
        <span>Open menu</span>
      </Dropdown>,
    );
    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger).toHaveAttribute("aria-disabled", "true");
    expect(trigger).toHaveAttribute("tabindex", "-1");

    await user.click(trigger);
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();

    trigger.focus();
    await user.keyboard("{Enter}{ArrowDown}");
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });

  it("disables the default trigger button when disabled", () => {
    render(<Dropdown ariaLabel="Actions" items={items} disabled />);
    expect(getTrigger()).toBeDisabled();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Dropdown ariaLabel="Actions" items={items} />
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(getTrigger());
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });

  it("closes when focus moves outside the dropdown", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Dropdown ariaLabel="Actions" items={items} />
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(getTrigger());
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);

    // Roving focus: the menu is a single tab stop.
    await user.tab();
    expect(getItem("Edit")).toHaveFocus();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);

    await user.tab();
    expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });

  describe("keyboard", () => {
    it.each(["{Enter}", " ", "{ArrowDown}"])(
      "opens with %s and focuses the first enabled item",
      async (key) => {
        const user = userEvent.setup();
        render(<Dropdown ariaLabel="Actions" items={items} />);

        await user.tab();
        expect(getTrigger()).toHaveFocus();
        await user.keyboard(key);

        expect(getMenu()).toBeInTheDocument();
        expect(getTrigger()).toHaveAttribute("aria-expanded", "true");
        expect(getItem("Edit")).toHaveFocus();
      },
    );

    it("opens with ArrowUp on the last enabled item", async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          ariaLabel="Actions"
          items={[...items, { label: "Off", value: "off", disabled: true }]}
        />,
      );

      await user.tab();
      await user.keyboard("{ArrowUp}");
      expect(getItem("Delete")).toHaveFocus();
    });

    it("moves through items with arrows, skipping disabled ones and wrapping", async () => {
      const user = userEvent.setup();
      render(<Dropdown ariaLabel="Actions" items={items} />);

      await user.tab();
      await user.keyboard("{ArrowDown}");
      expect(getItem("Edit")).toHaveFocus();

      await user.keyboard("{ArrowDown}");
      expect(getItem("Delete")).toHaveFocus();
      expect(getItem("Delete")).toHaveAttribute("tabindex", "0");
      expect(getItem("Edit")).toHaveAttribute("tabindex", "-1");

      await user.keyboard("{ArrowDown}");
      expect(getItem("Edit")).toHaveFocus();

      await user.keyboard("{ArrowUp}");
      expect(getItem("Delete")).toHaveFocus();

      await user.keyboard("{ArrowUp}");
      expect(getItem("Edit")).toHaveFocus();

      await user.keyboard("{End}");
      expect(getItem("Delete")).toHaveFocus();

      await user.keyboard("{Home}");
      expect(getItem("Edit")).toHaveFocus();
    });

    it.each(["{Enter}", " "])(
      "selects the active item with %s and returns focus to the trigger",
      async (key) => {
        const user = userEvent.setup();
        const onSelect = vi.fn();
        render(
          <Dropdown ariaLabel="Actions" items={items} onSelect={onSelect} />,
        );

        await user.tab();
        await user.keyboard("{ArrowDown}{ArrowDown}");
        expect(getItem("Delete")).toHaveFocus();

        await user.keyboard(key);
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(items[2]);
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        expect(getTrigger()).toHaveFocus();
      },
    );

    it("closes with Escape and returns focus to the trigger", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <Dropdown ariaLabel="Actions" items={items} onSelect={onSelect} />,
      );

      await user.tab();
      await user.keyboard("{ArrowDown}");
      expect(getItem("Edit")).toHaveFocus();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(getTrigger()).toHaveFocus();
      expect(getTrigger()).toHaveAttribute("aria-expanded", "false");
      expect(onSelect).not.toHaveBeenCalled();
    });

    it("works with a non-interactive custom trigger", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <Dropdown ariaLabel="Actions" items={items} onSelect={onSelect}>
          <span>Open menu</span>
        </Dropdown>,
      );

      await user.tab();
      const trigger = screen.getByRole("button", { name: "Open menu" });
      expect(trigger).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(getItem("Edit")).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(onSelect).toHaveBeenCalledWith(items[0]);
      expect(trigger).toHaveFocus();
    });
  });

  it("applies direction, className and menu colors", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown
        ariaLabel="Actions"
        items={items}
        className="custom"
        direction="up"
        menuBgColor="rgb(10, 20, 30)"
        menuTextColor="rgb(200, 0, 0)"
        menuBoxShadow="none"
      />,
    );
    expect(container.firstElementChild).toHaveClass("dropdown", "custom");

    await user.click(getTrigger());
    const menu = getMenu().parentElement as HTMLElement;
    expect(menu).toHaveClass("menu", "up");
    expect(menu.style.backgroundColor).toBe("rgb(10, 20, 30)");
    expect(menu.style.boxShadow).toBe("none");
    expect(getItem("Edit").style.color).toBe("rgb(200, 0, 0)");
  });
});
