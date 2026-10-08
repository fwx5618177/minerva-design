// Interop of the anchored, non-modal overlays built on the shared
// FloatingPanel / useFloatingLayer helper (AutoComplete, TimePicker,
// Cascader, Tooltip) with the layered overlays (Modal, Drawer, Popover) and
// nested theme scopes.
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfigProvider } from "../contexts/ConfigProvider";
import { AutoComplete, type AutoCompleteOption } from "./AutoComplete";
import { Cascader, type CascaderOption } from "./Cascader";
import { Drawer } from "./Drawer";
import { Modal } from "./Modal";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { TimePicker } from "./TimePicker";
import { Tooltip } from "./Tooltip";

// Modal / Drawer disable pointer events below them; the layers above get
// `pointer-events: auto` inline, which user-event's check cannot resolve.
const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

const fruits: AutoCompleteOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
];

const areas: CascaderOption[] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      { value: "hangzhou", label: "Hangzhou" },
      { value: "ningbo", label: "Ningbo" },
    ],
  },
  { value: "jiangsu", label: "Jiangsu" },
];

const scopeOf = (element: Element) =>
  element.closest<HTMLElement>("[data-minerva-theme-scope]");

describe("floating overlays interop", () => {
  describe("AutoComplete inside a Modal", () => {
    const renderInModal = () => {
      const onOpenChange = vi.fn();
      render(
        <Modal defaultOpen title="Pick a fruit" onOpenChange={onOpenChange}>
          <p>Modal body</p>
          <AutoComplete label="Fruit" options={fruits} />
        </Modal>,
      );
      return { onOpenChange, input: screen.getByRole("combobox") };
    };

    it("Escape closes only the listbox and keeps focus in the input", async () => {
      const user = setup();
      const { onOpenChange, input } = renderInModal();
      await user.click(input);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(
        screen.getByRole("dialog", { name: "Pick a fruit" }),
      ).toBeVisible();
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(input).toHaveFocus();

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("ArrowDown opens, Enter selects, an outside click closes only the listbox", async () => {
      const user = setup();
      const { onOpenChange, input } = renderInModal();
      await user.click(input);
      await user.keyboard("{Escape}");
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(input).toHaveAttribute("aria-activedescendant");
      await user.keyboard("{ArrowDown}{Enter}");
      expect(input).toHaveValue("Banana");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(input).toHaveFocus();

      await user.clear(input);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      // clicking the listbox (portalled outside the modal) is not outside
      await user.click(screen.getByRole("option", { name: "Apple" }));
      expect(input).toHaveValue("Apple");

      await user.click(input);
      await user.click(screen.getByText("Modal body"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe("TimePicker inside a Popover", () => {
    const renderInPopover = () => {
      const onOpenChange = vi.fn();
      const onChange = vi.fn();
      render(
        <Popover defaultOpen onOpenChange={onOpenChange}>
          <PopoverTrigger>Schedule</PopoverTrigger>
          <PopoverContent aria-label="Schedule panel">
            <TimePicker format="HH:mm" showSecond={false} onChange={onChange} />
          </PopoverContent>
        </Popover>,
      );
      return { onOpenChange, onChange, input: screen.getByRole("textbox") };
    };

    it("picks from the panel without closing the popover; Escape closes the panel first", async () => {
      const user = setup();
      const { onOpenChange, onChange, input } = renderInPopover();
      await user.click(input);
      const panel = screen.getByRole("dialog", { name: "Time" });
      const hours = within(panel).getByRole("listbox", { name: "Hours" });
      await user.click(within(hours).getByRole("option", { name: "09" }));
      expect((onChange.mock.lastCall?.[0] as Date).getHours()).toBe(9);
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(
        screen.getByRole("dialog", { name: "Schedule panel" }),
      ).toBeVisible();

      // focus is in the panel: Escape closes it and returns focus to the input
      await user.keyboard("{Escape}");
      expect(
        screen.queryByRole("dialog", { name: "Time" }),
      ).not.toBeInTheDocument();
      expect(input).toHaveFocus();
      expect(onOpenChange).not.toHaveBeenCalled();

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("opens with ArrowDown and closes on a click outside the panel only", async () => {
      const user = setup();
      const { onOpenChange, input } = renderInPopover();
      input.focus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("dialog", { name: "Time" })).toBeInTheDocument();
      await user.click(screen.getByRole("dialog", { name: "Schedule panel" }));
      expect(
        screen.queryByRole("dialog", { name: "Time" }),
      ).not.toBeInTheDocument();
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe("Cascader inside a Drawer", () => {
    const renderInDrawer = () => {
      const onOpenChange = vi.fn();
      const onChange = vi.fn();
      render(
        <Drawer defaultOpen title="Filters" onOpenChange={onOpenChange}>
          <p>Drawer body</p>
          <Cascader
            label="Area"
            name="area"
            options={areas}
            onChange={onChange}
          />
        </Drawer>,
      );
      return { onOpenChange, onChange, input: screen.getByRole("combobox") };
    };

    it("keyboard: ArrowDown opens, Enter selects, Escape closes only the cascader", async () => {
      const user = setup();
      const { onOpenChange, onChange, input } = renderInDrawer();
      input.focus();
      await user.keyboard("{ArrowDown}");
      // focus moved into the portalled panel; the drawer's trap lets it be
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      await user.keyboard("{ArrowRight}{Enter}");
      expect(onChange).toHaveBeenCalledWith(
        ["zhejiang", "hangzhou"],
        expect.any(Array),
      );
      expect(input).toHaveFocus();

      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("option", { name: "Hangzhou" })).toHaveFocus();
      await user.keyboard("{Escape}");
      expect(
        screen.queryByRole("option", { name: "Hangzhou" }),
      ).not.toBeInTheDocument();
      expect(input).toHaveFocus();
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(screen.getByRole("dialog", { name: "Filters" })).toBeVisible();
    });

    it("an outside click inside the drawer closes only the cascader", async () => {
      const user = setup();
      const { onOpenChange, input } = renderInDrawer();
      await user.click(input);
      await user.click(screen.getByRole("option", { name: "Zhejiang" }));
      expect(
        screen.getByRole("option", { name: "Ningbo" }),
      ).toBeInTheDocument();
      await user.click(screen.getByText("Drawer body"));
      expect(screen.queryByRole("option")).not.toBeInTheDocument();
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe("Tooltip inside a Popover", () => {
    it("the first Escape closes the tooltip only", async () => {
      const user = setup();
      const onOpenChange = vi.fn();
      render(
        <Popover onOpenChange={onOpenChange}>
          <PopoverTrigger>Format</PopoverTrigger>
          <PopoverContent aria-label="Format panel">
            <Tooltip content="Bold text">
              <button type="button">Bold</button>
            </Tooltip>
          </PopoverContent>
        </Popover>,
      );
      await user.click(screen.getByRole("button", { name: "Format" }));
      await waitFor(() =>
        expect(screen.getByRole("button", { name: "Bold" })).toHaveFocus(),
      );
      expect(screen.getByRole("tooltip")).toHaveTextContent("Bold text");

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      expect(onOpenChange).not.toHaveBeenCalledWith(false);

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });
  });

  describe("theme-scoped portals (nested ConfigProvider)", () => {
    const inDarkScope = (node: React.ReactNode) =>
      render(
        <ConfigProvider theme="light">
          <ConfigProvider theme="dark">{node}</ConfigProvider>
        </ConfigProvider>,
      );

    const expectDarkScope = (element: Element) => {
      const host = scopeOf(element);
      expect(host).toHaveAttribute("data-minerva-portal-host");
      expect(host).toHaveAttribute("data-theme", "dark");
    };

    it("portals the AutoComplete listbox into the scope", async () => {
      const user = setup();
      inDarkScope(<AutoComplete label="Fruit" options={fruits} />);
      await user.click(screen.getByRole("combobox"));
      expectDarkScope(screen.getByRole("listbox"));
    });

    it("portals the TimePicker panel into the scope", async () => {
      const user = setup();
      inDarkScope(<TimePicker />);
      await user.click(screen.getByRole("textbox"));
      expectDarkScope(screen.getByRole("dialog", { name: "Time" }));
    });

    it("portals the Cascader panel into the scope", async () => {
      const user = setup();
      inDarkScope(<Cascader label="Area" name="area" options={areas} />);
      await user.click(screen.getByRole("combobox"));
      expectDarkScope(screen.getByRole("option", { name: "Zhejiang" }));
    });

    it("portals the Tooltip into the scope", () => {
      inDarkScope(
        <Tooltip content="Tip" defaultOpen>
          <button type="button">Trigger</button>
        </Tooltip>,
      );
      expectDarkScope(screen.getByRole("tooltip"));
    });
  });
});
