import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import type React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AutoComplete from "./AutoComplete";
import type { AutoCompleteOption, AutoCompleteProps } from "./types";

const options: AutoCompleteOption[] = [
  { label: "Apple", value: "apple", description: "A red fruit" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
  { label: "Apricot", value: "apricot" },
];

const renderAutoComplete = (props: Partial<AutoCompleteProps> = {}) =>
  render(
    <AutoComplete name="fruit" label="Fruit" options={options} {...props} />,
  );

const getInput = () => screen.getByRole("combobox");
/** The dropdown (Popper element, portaled to body) */
const queryDropdown = () => document.body.querySelector<HTMLElement>(".popper");
const getDropdown = () => {
  const dropdown = queryDropdown();
  if (!dropdown) throw new Error("dropdown is not open");
  return dropdown;
};

describe("AutoComplete", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders an input with the given name and label, closed by default", () => {
    renderAutoComplete();

    const input = getInput();
    expect(input).toHaveAttribute("name", "fruit");
    expect(input).toHaveValue("");
    expect(screen.getByText("Fruit")).toBeInTheDocument();
    expect(queryDropdown()).not.toBeInTheDocument();
  });

  it("uses defaultValue as the initial input value", () => {
    renderAutoComplete({ defaultValue: "Ban" });

    expect(getInput()).toHaveValue("Ban");
  });

  it("opens the dropdown with all options on focus", async () => {
    const user = userEvent.setup();
    const onDropdownVisibleChange = vi.fn();
    renderAutoComplete({ onDropdownVisibleChange });

    // not called on mount, only on actual changes
    expect(onDropdownVisibleChange).not.toHaveBeenCalled();
    await user.click(getInput());

    const dropdown = getDropdown();
    expect(dropdown).toHaveTextContent("Apple");
    expect(dropdown).toHaveTextContent("Banana");
    expect(dropdown).toHaveTextContent("Cherry");
    expect(dropdown).toHaveTextContent("Apricot");
    expect(screen.getByText("A red fruit")).toHaveClass("description");
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(true);
  });

  it("filters options case-insensitively as the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderAutoComplete({ onChange });

    await user.type(getInput(), "ap");

    expect(onChange).toHaveBeenNthCalledWith(1, "a");
    expect(onChange).toHaveBeenNthCalledWith(2, "ap");
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Apricot")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("shows the Empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderAutoComplete({ emptyProps: { description: "No fruit" } });

    await user.type(getInput(), "zzz");

    expect(
      screen.getByRole("status", { name: "No fruit" }),
    ).toBeInTheDocument();
  });

  it("uses renderEmpty when provided", async () => {
    const user = userEvent.setup();
    renderAutoComplete({ renderEmpty: () => <span>Custom empty</span> });

    await user.type(getInput(), "zzz");

    expect(screen.getByText("Custom empty")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a loading indicator instead of options when loading", async () => {
    const user = userEvent.setup();
    renderAutoComplete({ loading: true });

    await user.click(getInput());

    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    expect(document.querySelector(".loading")).toBeInTheDocument();
  });

  it("selects an option on click and calls callbacks with the option", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onChange = vi.fn();
    const onOptionClick = vi.fn();
    renderAutoComplete({ onSelect, onChange, onOptionClick });

    await user.click(getInput());
    await user.click(screen.getByText("Banana"));

    expect(onSelect).toHaveBeenCalledWith(options[1]);
    expect(onOptionClick).toHaveBeenCalledWith(options[1]);
    expect(onChange).toHaveBeenLastCalledWith("Banana");
    expect(getInput()).toHaveValue("Banana");
    expect(queryDropdown()).not.toBeInTheDocument();
  });

  it("ignores clicks on disabled options", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onOptionClick = vi.fn();
    renderAutoComplete({ onSelect, onOptionClick });

    await user.click(getInput());
    const cherry = screen.getByText("Cherry").closest(".optionItem");
    expect(cherry).toHaveClass("disabled");
    await user.click(screen.getByText("Cherry"));

    expect(onSelect).not.toHaveBeenCalled();
    expect(onOptionClick).not.toHaveBeenCalled();
    expect(getDropdown()).toBeInTheDocument();
  });

  it("supports keyboard navigation with ArrowDown/ArrowUp and Enter", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderAutoComplete({ onSelect });

    await user.click(getInput());
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenLastCalledWith(options[1]);
    expect(getInput()).toHaveValue("Banana");
  });

  it("wraps keyboard navigation from the first to the last option", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderAutoComplete({ onSelect });

    await user.click(getInput());
    await user.keyboard("{ArrowUp}{Enter}");
    expect(onSelect).toHaveBeenLastCalledWith(options[3]);
  });

  it("does not select on Enter without a focused option", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderAutoComplete({ onSelect });

    await user.click(getInput());
    await user.keyboard("{Enter}");
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("closes on Escape and reopens when the user types again", async () => {
    const user = userEvent.setup();
    renderAutoComplete();

    await user.click(getInput());
    expect(getDropdown()).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(queryDropdown()).not.toBeInTheDocument();

    await user.keyboard("b");
    expect(getDropdown()).toHaveTextContent("Banana");
  });

  it("closes the dropdown when focus leaves the input", async () => {
    const user = userEvent.setup();
    const onDropdownVisibleChange = vi.fn();
    renderAutoComplete({ onDropdownVisibleChange });

    await user.click(getInput());
    expect(getDropdown()).toBeInTheDocument();

    await user.tab();
    expect(queryDropdown()).not.toBeInTheDocument();
    expect(onDropdownVisibleChange.mock.calls).toEqual([[true], [false]]);
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <AutoComplete name="fruit" label="Fruit" options={options} />
        <p>Outside</p>
      </div>,
    );
    await user.click(getInput());
    await user.click(screen.getByText("Outside"));
    expect(queryDropdown()).not.toBeInTheDocument();
  });

  it("filters by the controlled value", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [value, setValue] = useState("ban");
      return (
        <AutoComplete
          name="fruit"
          label="Fruit"
          options={options}
          value={value}
          onChange={setValue}
        />
      );
    };
    render(<Controlled />);

    expect(getInput()).toHaveValue("ban");
    await user.click(getInput());
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();

    await user.clear(getInput());
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("uses a custom filterOption and sortOption", async () => {
    const user = userEvent.setup();
    const filterOption = vi.fn((input: string, option: AutoCompleteOption) =>
      String(option.value).startsWith(input),
    );
    renderAutoComplete({
      filterOption,
      sortOption: (a, b) => b.label.localeCompare(a.label),
    });

    await user.type(getInput(), "ap");

    expect(filterOption).toHaveBeenCalledWith("ap", options[0]);
    const labels = Array.from(getDropdown().querySelectorAll(".label")).map(
      (el) => el.textContent,
    );
    expect(labels).toEqual(["Apricot", "Apple"]);
  });

  it("groups options with groupBy", async () => {
    const user = userEvent.setup();
    renderAutoComplete({
      groupBy: (option) => (option.label.startsWith("A") ? "A" : "Other"),
    });

    await user.click(getInput());

    const groups = document.querySelectorAll(".optionGroup");
    expect(groups).toHaveLength(2);
    expect(groups[0].querySelector(".groupLabel")).toHaveTextContent("A");
    expect(groups[0]).toHaveTextContent("Apple");
    expect(groups[0]).toHaveTextContent("Apricot");
    expect(groups[1].querySelector(".groupLabel")).toHaveTextContent("Other");
    expect(groups[1]).toHaveTextContent("Banana");
  });

  it("hovers only the hovered grouped option with string values", async () => {
    const user = userEvent.setup();
    renderAutoComplete({
      groupBy: (option) => (option.label.startsWith("A") ? "A" : "Other"),
      hoverBgColor: "rgb(255, 0, 0)",
    });

    await user.click(getInput());
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".optionItem"),
    );
    const apricot = screen.getByText("Apricot").closest(".optionItem");
    await user.hover(apricot as HTMLElement);
    const hovered = items.filter((item) => item.classList.contains("active"));
    expect(hovered).toEqual([apricot]);
    expect(
      getDropdown()
        .querySelector<HTMLElement>(".dropdown")!
        .style.getPropertyValue("--hover-bg-color"),
    ).toBe("rgb(255, 0, 0)");

    await user.unhover(apricot as HTMLElement);
    expect(apricot).not.toHaveClass("active");
  });

  it("navigates grouped options by keyboard in display order", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderAutoComplete({
      groupBy: (option) => (option.label.startsWith("A") ? "A" : "Other"),
      onSelect,
    });

    await user.click(getInput());
    // Display order: Apple, Apricot (group A), Banana, Cherry (Other)
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenLastCalledWith(options[3]);
  });

  it("uses renderOption only in custom mode", async () => {
    const user = userEvent.setup();
    const renderOption = (option: AutoCompleteOption) => (
      <strong>custom-{option.label}</strong>
    );
    const { unmount } = renderAutoComplete({ renderOption });

    await user.click(getInput());
    expect(screen.queryByText("custom-Apple")).not.toBeInTheDocument();
    unmount();

    renderAutoComplete({ mode: "custom", renderOption });
    await user.click(getInput());
    expect(screen.getByText("custom-Apple")).toBeInTheDocument();
  });

  it("applies highlight styling and hover background colors", async () => {
    const user = userEvent.setup();
    renderAutoComplete({
      options: [
        { label: "Apple", value: "apple", highlight: true },
        { label: "Banana", value: "banana" },
      ],
      highlightBgColor: "rgb(0, 0, 255)",
      hoverBgColor: "rgb(255, 0, 0)",
    });

    await user.click(getInput());
    const apple = screen.getByText("Apple").closest(".optionItem");
    const banana = screen.getByText("Banana").closest(".optionItem");
    expect(apple).toHaveClass("highlight");
    const dropdown = getDropdown().querySelector<HTMLElement>(".dropdown")!;
    expect(dropdown.style.getPropertyValue("--highlight-bg-color")).toBe(
      "rgb(0, 0, 255)",
    );
    expect(dropdown.style.getPropertyValue("--hover-bg-color")).toBe(
      "rgb(255, 0, 0)",
    );

    await user.hover(banana as HTMLElement);
    expect(banana).toHaveClass("active");

    await user.unhover(banana as HTMLElement);
    expect(banana).not.toHaveClass("active");
  });

  it("supports multiple selection with removable tags", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onChange = vi.fn();
    const { container } = renderAutoComplete({
      multiple: true,
      onSelect,
      onChange,
    });

    await user.click(getInput());
    await user.keyboard("ap");
    await user.click(screen.getByText("Apple"));
    // Dropdown stays open in multiple mode
    await user.click(screen.getByText("Banana"));

    expect(onSelect).toHaveBeenNthCalledWith(1, options[0]);
    expect(onSelect).toHaveBeenNthCalledWith(2, options[1]);
    expect(onChange).toHaveBeenLastCalledWith("");
    expect(getInput()).toHaveValue("");

    const tags = container.querySelectorAll(".tag");
    expect(Array.from(tags).map((tag) => tag.textContent)).toEqual([
      "Apple",
      "Banana",
    ]);

    await user.click(tags[0].querySelector("button") as HTMLButtonElement);
    expect(
      Array.from(container.querySelectorAll(".tag")).map(
        (tag) => tag.textContent,
      ),
    ).toEqual(["Banana"]);
    expect(onSelect).toHaveBeenLastCalledWith(options[0]);
  });

  it("toggles a tag off when selecting an already selected option", async () => {
    const user = userEvent.setup();
    const { container } = renderAutoComplete({ multiple: true });

    await user.click(getInput());
    await user.click(screen.getByText("Apple"));
    expect(container.querySelectorAll(".tag")).toHaveLength(1);

    await user.click(screen.getAllByText("Apple")[1]);
    expect(container.querySelectorAll(".tag")).toHaveLength(0);
  });

  it("limits visible tags with maxTagCount", async () => {
    const user = userEvent.setup();
    const { container } = renderAutoComplete({
      multiple: true,
      maxTagCount: 1,
    });

    await user.click(getInput());
    await user.click(screen.getByText("Apple"));
    await user.click(screen.getByText("Banana"));
    await user.click(screen.getByText("Apricot"));

    expect(container.querySelectorAll(".tag")).toHaveLength(1);
    expect(container.querySelector(".more")).toHaveTextContent("+2");
  });

  it("applies dropdown background color and disables animation", async () => {
    const user = userEvent.setup();
    renderAutoComplete({
      dropdownBgColor: "rgb(1, 2, 3)",
      animation: false,
    });

    await user.click(getInput());
    const dropdown = document.querySelector(".dropdown");
    expect(dropdown).toHaveStyle({ backgroundColor: "rgb(1, 2, 3)" });
    expect(dropdown).not.toHaveClass("animated");
  });

  it("forwards popperProps to the Popper", async () => {
    const user = userEvent.setup();
    renderAutoComplete({ popperProps: { className: "my-popper", zIndex: 7 } });

    await user.click(getInput());
    expect(getDropdown()).toHaveClass("my-popper");
    expect(getDropdown().style.zIndex).toBe("7");
  });

  it("exposes combobox / listbox semantics and the active option", async () => {
    const user = userEvent.setup();
    renderAutoComplete();
    const input = getInput();
    expect(input).toHaveAttribute("aria-expanded", "false");

    await user.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox");
    expect(input).toHaveAttribute("aria-controls", listbox.id);
    expect(screen.getAllByRole("option")).toHaveLength(options.length);

    await user.keyboard("{ArrowDown}");
    const active = input.getAttribute("aria-activedescendant");
    expect(active).toBeTruthy();
    expect(document.getElementById(active!)).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("labels the remove buttons of selected tags", async () => {
    const user = userEvent.setup();
    renderAutoComplete({ multiple: true });
    await user.click(getInput());
    await user.click(screen.getByText("Banana"));
    expect(
      screen.getByRole("button", { name: "Remove Banana" }),
    ).toBeInTheDocument();
  });

  describe("regressions", () => {
    it("keeps the dropdown open between picks in multiple mode", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderAutoComplete({ multiple: true });

      await user.click(getInput());
      await user.click(screen.getByText("Apple"));
      await act(() => vi.advanceTimersByTimeAsync(500));
      expect(getDropdown()).toBeInTheDocument();
      expect(getInput()).toHaveFocus();
      await user.click(screen.getByText("Banana"));
      await act(() => vi.advanceTimersByTimeAsync(500));
      expect(getDropdown()).toBeInTheDocument();
      expect(screen.getByRole("listbox")).toHaveAttribute(
        "aria-multiselectable",
        "true",
      );
      expect(screen.getByRole("option", { name: /^Apple/ })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("aligns the dropdown with the input start edge and matches its width", async () => {
      const rect = (r: Partial<DOMRect>) =>
        ({
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
          toJSON: () => ({}),
          ...r,
        }) as DOMRect;
      vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(
        1200,
      );
      vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(
        800,
      );
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        return this.classList.contains("autoComplete")
          ? rect({
              top: 100,
              bottom: 140,
              left: 200,
              right: 600,
              width: 400,
              height: 40,
            })
          : rect({});
      });
      vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(
        function (this: HTMLElement) {
          return this.classList.contains("popper") ? 260 : 0;
        },
      );
      const user = userEvent.setup();
      renderAutoComplete();
      await user.click(getInput());
      const dropdown = getDropdown();
      // previously centered under the (wider) field: 200 + (400 - 260) / 2 = 270
      await waitFor(() => expect(dropdown.style.left).toBe("200px"));
      expect(dropdown.style.minWidth).toBe("400px");
      vi.restoreAllMocks();
    });

    it("supports controlled selectedOptions", async () => {
      const user = userEvent.setup();
      const onSelectedOptionsChange = vi.fn();
      const Controlled = () => {
        const [selected, setSelected] = useState<AutoCompleteOption[]>([
          options[1],
        ]);
        return (
          <AutoComplete
            name="fruit"
            label="Fruit"
            options={options}
            multiple
            selectedOptions={selected}
            onSelectedOptionsChange={(next) => {
              onSelectedOptionsChange(next);
              setSelected(next);
            }}
          />
        );
      };
      render(<Controlled />);
      expect(
        screen.getByRole("button", { name: "Remove Banana" }),
      ).toBeInTheDocument();
      await user.click(getInput());
      await user.click(screen.getByText("Apple"));
      expect(onSelectedOptionsChange).toHaveBeenLastCalledWith([
        options[1],
        options[0],
      ]);
      // Backspace in the empty input removes the last tag
      await user.keyboard("{Backspace}");
      expect(onSelectedOptionsChange).toHaveBeenLastCalledWith([options[1]]);
    });

    it("prevents form submission when Enter picks an option", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      render(
        <form onSubmit={onSubmit}>
          <AutoComplete name="fruit" label="Fruit" options={options} />
        </form>,
      );
      await user.click(getInput());
      await user.keyboard("{ArrowDown}{Enter}");
      expect(getInput()).toHaveValue("Apple");
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("forwards ref to the input", () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <AutoComplete name="fruit" label="Fruit" options={options} ref={ref} />,
      );
      expect(ref.current).toBe(getInput());
    });
  });
});
