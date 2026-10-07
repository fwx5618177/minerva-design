// onSubmit, autoHighlight, IME safety, reopen on click, disabled / read-only
// and FormControl integration.
import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AutoComplete from "./AutoComplete";
import styles from "./autoComplete.module.scss";
import type { AutoCompleteOption, AutoCompleteProps } from "./types";
import {
  FormControlContext,
  type FormControlContextValue,
} from "../FormControl/context";

const OPTIONS: AutoCompleteOption[] = [
  { value: "1", label: "Lord of Mysteries", description: "Cuttlefish" },
  { value: "2", label: "Sword of Coming", description: "Fenghuo" },
  { value: "3", label: "A Record of Mortal", description: "Wangyu" },
];

const field = (
  overrides: Partial<FormControlContextValue> = {},
): FormControlContextValue => ({
  id: "field",
  helperId: "field-helper",
  errorId: "field-error",
  labelId: "field-label",
  invalid: false,
  required: false,
  disabled: false,
  readOnly: false,
  hasHelperText: false,
  hasErrorMessage: false,
  registerHelperText: () => {},
  registerErrorMessage: () => {},
  ...overrides,
});

const Search = (props: Partial<AutoCompleteProps>) => (
  <AutoComplete
    options={OPTIONS}
    autoHighlight
    fillOnSelect={false}
    inputProps={{ "aria-label": "search" }}
    {...props}
  />
);

const input = () => screen.getByRole("combobox", { name: "search" });
const options = () => screen.queryAllByRole("option");
const keyDown = (key: string, init: Partial<KeyboardEventInit> = {}) =>
  act(() => {
    input().dispatchEvent(
      new KeyboardEvent("keydown", { key, bubbles: true, ...init }),
    );
  });

describe("AutoComplete keyboard, submit and form integration", () => {
  it("works without name / label (accessible name from inputProps aria-label)", () => {
    render(<Search />);
    expect(input()).not.toHaveAttribute("name");
    act(() => input().focus());
    expect(options()).toHaveLength(3);
  });

  it("renders its parts and highlights the first option with autoHighlight", () => {
    const { container } = render(<Search className="consumer" />);
    const root = container.firstElementChild!;
    expect(root).toHaveClass(styles.autoComplete, "consumer");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    act(() => input().focus());
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toHaveClass(styles.optionList);
    const [first, second] = options();
    expect(first).toHaveClass(styles.optionItem, styles.active);
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(second).not.toHaveClass(styles.active);
    expect(second).toHaveAttribute("aria-selected", "false");
    expect(input()).toHaveAttribute("aria-activedescendant", first.id);
    expect(screen.getByText("Lord of Mysteries")).toHaveClass(styles.label);
    expect(screen.getByText("Cuttlefish")).toHaveClass(styles.description);
  });

  it("Enter picks the highlighted option without filling the input", () => {
    const onSelect = vi.fn();
    const onChange = vi.fn();
    render(<Search onSelect={onSelect} value="" onChange={onChange} />);
    act(() => input().focus());
    keyDown("ArrowDown");
    keyDown("Enter");
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "2" }),
    );
    expect(onChange).not.toHaveBeenCalled();
    expect(options()).toHaveLength(0);
  });

  it("Enter without a match calls onSubmit with the trimmed text", () => {
    const onSubmit = vi.fn();
    render(<Search value="  unknown book " onSubmit={onSubmit} />);
    act(() => input().focus());
    keyDown("Enter");
    expect(onSubmit).toHaveBeenCalledWith("unknown book");
    expect(options()).toHaveLength(0);
  });

  it("Enter with blank text does not submit", () => {
    const onSubmit = vi.fn();
    render(<Search autoHighlight={false} value="  " onSubmit={onSubmit} />);
    act(() => input().focus());
    keyDown("Enter");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("ignores IME confirmation and closes when focus leaves", () => {
    const onSelect = vi.fn();
    render(<Search onSelect={onSelect} />);
    act(() => input().focus());
    keyDown("Enter", { isComposing: true });
    expect(onSelect).not.toHaveBeenCalled();
    fireEvent.compositionStart(input());
    keyDown("Enter");
    fireEvent.click(options()[0]);
    expect(onSelect).not.toHaveBeenCalled();
    fireEvent.compositionEnd(input());
    keyDown("Enter");
    expect(onSelect).toHaveBeenCalledTimes(1);
    act(() => input().focus());
    act(() => input().blur());
    expect(options()).toHaveLength(0);
  });

  it("reopens when the still-focused input is clicked, notifying once", () => {
    const onSelect = vi.fn();
    const onDropdownVisibleChange = vi.fn();
    render(
      <Search
        onSelect={onSelect}
        onDropdownVisibleChange={onDropdownVisibleChange}
      />,
    );
    act(() => input().focus());
    fireEvent.mouseDown(options()[1]);
    fireEvent.click(options()[1]);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "2" }),
    );
    expect(options()).toHaveLength(0);
    expect(document.activeElement).toBe(input());

    onDropdownVisibleChange.mockClear();
    act(() => input().click());
    expect(options()).toHaveLength(3);
    expect(input()).toHaveAttribute("aria-expanded", "true");
    act(() => input().click());
    expect(options()).toHaveLength(3);
    expect(onDropdownVisibleChange.mock.calls).toEqual([[true]]);

    keyDown("Escape");
    expect(options()).toHaveLength(0);
    act(() => input().click());
    expect(options()).toHaveLength(3);
  });

  it("reopens with ArrowDown / Alt+ArrowDown after closing", () => {
    render(<Search />);
    act(() => input().focus());
    for (const init of [{}, { altKey: true }]) {
      keyDown("Escape");
      expect(options()).toHaveLength(0);
      keyDown("ArrowDown", init);
      expect(options()).toHaveLength(3);
    }
  });

  it("selects an option with Enter / Space when the option itself has focus", () => {
    const onSelect = vi.fn();
    render(<Search onSelect={onSelect} />);
    act(() => input().focus());
    fireEvent.keyDown(options()[2], { key: "Tab" });
    expect(onSelect).not.toHaveBeenCalled();
    fireEvent.keyDown(options()[2], { key: " " });
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "3" }),
    );
  });

  it("does not keep an interactive popup when disabled or read-only", () => {
    const { rerender } = render(<Search />);
    act(() => input().focus());
    expect(options()).toHaveLength(3);
    rerender(
      <Search inputProps={{ "aria-label": "search", disabled: true }} />,
    );
    expect(options()).toHaveLength(0);
    expect(input()).toBeDisabled();
    rerender(
      <Search inputProps={{ "aria-label": "search", readOnly: true }} />,
    );
    expect(input()).toHaveAttribute("readonly");
    act(() => input().focus());
    act(() => input().click());
    keyDown("ArrowDown");
    expect(options()).toHaveLength(0);
  });

  it("marks group headings and the empty / loading states", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Search
        options={[
          { value: "a", label: "Alpha", group: "Recent" },
          { value: "b", label: "Beta", group: "Popular" },
        ]}
        groupBy={(o) => o.group ?? ""}
      />,
    );
    await user.click(input());
    expect(screen.getByText("Recent")).toHaveClass(styles.groupLabel);
    rerender(<Search options={[]} renderEmpty={() => "Nothing"} />);
    expect(screen.getByText("Nothing")).toHaveClass(styles.empty);
    rerender(<Search loading />);
    expect(document.querySelector(`.${styles.loading}`)).not.toBeNull();
  });

  it("takes id, description, invalid, required and disabled from a FormControl", () => {
    const { rerender } = render(
      <FormControlContext.Provider
        value={field({
          id: "q",
          invalid: true,
          required: true,
          hasErrorMessage: true,
        })}
      >
        <Search />
        <span id="field-error">Pick a book</span>
      </FormControlContext.Provider>,
    );
    expect(input()).toHaveAttribute("id", "q");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(input()).toHaveAttribute("aria-required", "true");
    expect(input()).toHaveAccessibleDescription("Pick a book");
    rerender(
      <FormControlContext.Provider value={field({ disabled: true })}>
        <Search />
      </FormControlContext.Provider>,
    );
    expect(input()).toBeDisabled();
  });

  it("groupMode='adjacent' groups runs of consecutive options; '' has no heading", () => {
    render(
      <Search
        options={[
          { value: "a", label: "Alpha", group: "Recent" },
          { value: "b", label: "Beta", group: "Popular" },
          { value: "c", label: "Gamma", group: "Recent" },
          { value: "d", label: "Delta" },
        ]}
        groupBy={(o) => o.group ?? ""}
        groupMode="adjacent"
      />,
    );
    act(() => input().focus());
    const headings = Array.from(
      document.querySelectorAll(`.${styles.groupLabel}`),
    ).map((el) => el.textContent);
    expect(headings).toEqual(["Recent", "Popular", "Recent"]);
    expect(options().map((o) => o.textContent)).toEqual([
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
    ]);
    keyDown("ArrowUp");
    expect(input()).toHaveAttribute("aria-activedescendant", options()[3].id);
  });

  it("forwards native input props through inputProps", () => {
    const onCompositionStart = vi.fn();
    render(
      <>
        <span id="hint">Type a title</span>
        <Search
          inputProps={{
            "aria-label": "search",
            "aria-describedby": "hint",
            onCompositionStart,
          }}
        />
      </>,
    );
    expect(input()).toHaveAccessibleDescription("Type a title");
    fireEvent.compositionStart(input());
    expect(onCompositionStart).toHaveBeenCalledTimes(1);
  });

  it("keeps the controlled listbox while open for empty and loading states", () => {
    const { rerender } = render(
      <Search options={[]} renderEmpty={() => "No books"} />,
    );
    act(() => input().focus());
    const listbox = screen.getByRole("listbox");
    expect(input()).toHaveAttribute("aria-controls", listbox.id);
    expect(listbox).toHaveTextContent("No books");
    expect(within(listbox).queryByRole("option")).toBeNull();
    rerender(<Search loading />);
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-busy", "true");
    expect(input()).toHaveAttribute(
      "aria-controls",
      screen.getByRole("listbox").id,
    );
  });
});
