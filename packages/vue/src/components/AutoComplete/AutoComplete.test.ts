import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { computed, defineComponent, h, nextTick, provide, ref } from "vue";
import styles from "@react-styles/components/AutoComplete/autoComplete.module.scss";
import { AutoComplete, type AutoCompleteOption } from ".";
import { Modal } from "../Modal";
import {
  FORM_CONTROL_KEY,
  type FormControlContext,
} from "../../internal/form-control";

const settle = async () => {
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
};

const OPTIONS: AutoCompleteOption[] = [
  { value: "1", label: "Lord of Mysteries", description: "Cuttlefish" },
  { value: "2", label: "Sword of Coming", description: "Fenghuo" },
  { value: "3", label: "A Record of Mortal", description: "Wangyu" },
];

const FRUITS: AutoCompleteOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry", disabled: true },
  { value: "apricot", label: "Apricot" },
];

const input = () => screen.getByRole("combobox");
const options = () => screen.queryAllByRole("option");
const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

const renderAc = (props: Record<string, unknown> = {}, slots = {}) =>
  render(AutoComplete, {
    props: { options: FRUITS, label: "Fruit", ...props },
    slots,
    attachTo: document.body,
  } as never);

const search = (props: Record<string, unknown> = {}) =>
  renderAc({
    options: OPTIONS,
    label: undefined,
    autoHighlight: true,
    fillOnSelect: false,
    inputProps: { "aria-label": "search" },
    ...props,
  });

const keyDown = async (key: string, init: KeyboardEventInit = {}) => {
  input().dispatchEvent(
    new KeyboardEvent("keydown", { key, bubbles: true, ...init }),
  );
  await settle();
};

const formControl = (
  overrides: Record<string, unknown> = {},
): FormControlContext => {
  const v: Record<string, unknown> = {
    id: "field",
    invalid: false,
    required: false,
    disabled: false,
    readOnly: false,
    ...overrides,
  };
  return {
    id: computed(() => v.id as string),
    labelId: computed(() => "field-label"),
    helperId: computed(() => "field-helper"),
    errorId: computed(() => "field-error"),
    invalid: computed(() => v.invalid as boolean),
    required: computed(() => v.required as boolean),
    disabled: computed(() => v.disabled as boolean),
    readOnly: computed(() => v.readOnly as boolean),
    helperTexts: ref(0),
    errorMessages: ref((v.errorMessages as number) ?? 0),
  };
};

describe("AutoComplete", () => {
  it("renders an input with the given name and label, closed by default", () => {
    renderAc({ name: "fruit" });
    const el = screen.getByLabelText("Fruit");
    expect(el).toHaveAttribute("name", "fruit");
    expect(el).toHaveAttribute("role", "combobox");
    expect(el).toHaveAttribute("aria-autocomplete", "list");
    expect(el).toHaveAttribute("aria-expanded", "false");
    expect(el).not.toHaveAttribute("aria-controls");
    expect(screen.queryByRole("listbox")).toBeNull();
    const root = document.querySelector('[data-minerva="autocomplete"]')!;
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(root).toHaveClass(styles.autoComplete);
  });

  it("uses defaultValue as the initial input value", () => {
    renderAc({ defaultValue: "app" });
    expect(input()).toHaveValue("app");
    expect(input()).toHaveAttribute("data-minerva-escape-consumer");
  });

  it("opens the dropdown with all options on focus", async () => {
    const user = setup();
    const { emitted } = renderAc();
    await user.click(input());
    await settle();
    expect(options()).toHaveLength(4);
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(input()).toHaveAttribute(
      "aria-controls",
      screen.getByRole("listbox").id,
    );
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-label", "Fruit");
    expect(emitted("dropdownVisibleChange")).toEqual([[true]]);
    const content = document.querySelector('[data-part="content"]')!;
    expect(content).toHaveAttribute("data-state", "open");
    expect(content).toHaveAttribute("data-placement", "bottom-start");
    expect(content).toHaveClass(styles.popup);
  });

  it("filters options case-insensitively as the user types", async () => {
    const user = setup();
    const { emitted } = renderAc();
    await user.type(input(), "AP");
    await settle();
    expect(options().map((o) => o.textContent)).toEqual(["Apple", "Apricot"]);
    expect(emitted("update:modelValue")).toEqual([["A"], ["AP"]]);
    expect(emitted("change")).toEqual([["A"], ["AP"]]);
  });

  it("shows the empty slot / renderEmpty content when nothing matches", async () => {
    const user = setup();
    renderAc({ defaultValue: "zzz" }, { empty: () => "Nothing here" });
    await user.click(input());
    await settle();
    const empty = screen.getByText("Nothing here");
    expect(empty).toHaveClass(styles.empty);
    expect(empty).toHaveAttribute("data-part", "empty");
  });

  it("shows the Empty component by default", async () => {
    const user = setup();
    renderAc({ defaultValue: "zzz", emptyProps: { description: "None" } });
    await user.click(input());
    await settle();
    expect(document.querySelector('[data-minerva="empty"]')).not.toBeNull();
  });

  it("shows a loading indicator instead of options when loading", async () => {
    const user = setup();
    renderAc({ loading: true });
    await user.click(input());
    await settle();
    expect(options()).toHaveLength(0);
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-busy", "true");
    expect(document.querySelector('[data-part="loading"]')).toHaveClass(
      styles.loading,
    );
    expect(
      document.querySelector('[data-minerva="autocomplete"][data-part="root"]'),
    ).toHaveAttribute("data-loading", "");
  });

  it("selects an option on click and emits the option", async () => {
    const user = setup();
    const { emitted } = renderAc();
    await user.click(input());
    await settle();
    await user.click(screen.getByRole("option", { name: "Banana" }));
    await settle();
    expect(input()).toHaveValue("Banana");
    expect(options()).toHaveLength(0);
    expect(emitted("select")).toEqual([[FRUITS[1]]]);
    expect(emitted("optionClick")).toEqual([[FRUITS[1]]]);
    expect(emitted("change")).toEqual([["Banana"]]);
    expect(input()).toHaveFocus();
  });

  it("ignores clicks on disabled options", async () => {
    const user = setup();
    const { emitted } = renderAc();
    await user.click(input());
    await settle();
    const cherry = screen.getByRole("option", { name: "Cherry" });
    expect(cherry).toHaveAttribute("aria-disabled", "true");
    expect(cherry).toHaveAttribute("data-disabled", "");
    expect(cherry).toHaveClass(styles.disabled);
    await user.click(cherry);
    expect(emitted("select")).toBeUndefined();
    expect(options()).toHaveLength(4);
  });

  it("navigates with ArrowDown / ArrowUp (wrapping, skipping disabled) and picks with Enter", async () => {
    const user = setup();
    const { emitted } = renderAc();
    await user.click(input());
    await settle();
    await user.keyboard("{ArrowDown}{ArrowDown}");
    await settle();
    const active = () => input().getAttribute("aria-activedescendant");
    expect(active()).toBe(screen.getByRole("option", { name: "Banana" }).id);
    expect(screen.getByRole("option", { name: "Banana" })).toHaveAttribute(
      "data-highlighted",
      "",
    );
    await user.keyboard("{ArrowDown}");
    await settle();
    expect(active()).toBe(screen.getByRole("option", { name: "Apricot" }).id);
    await user.keyboard("{ArrowDown}");
    await settle();
    expect(active()).toBe(screen.getByRole("option", { name: "Apple" }).id);
    await user.keyboard("{ArrowUp}");
    await settle();
    expect(active()).toBe(screen.getByRole("option", { name: "Apricot" }).id);
    await user.keyboard("{Enter}");
    await settle();
    expect(input()).toHaveValue("Apricot");
    expect(emitted("select")).toEqual([[FRUITS[3]]]);
  });

  it("starts at the last option with ArrowUp and does nothing without options", async () => {
    renderAc({ options: [] });
    input().focus();
    await settle();
    await keyDown("ArrowUp");
    expect(input()).not.toHaveAttribute("aria-activedescendant");
  });

  it("skips everything when every option is disabled", async () => {
    renderAc({ options: [{ value: "x", label: "X", disabled: true }] });
    input().focus();
    await settle();
    await keyDown("ArrowDown");
    expect(input()).not.toHaveAttribute("aria-activedescendant");
  });

  it("does not select on Enter without a focused option", async () => {
    const user = setup();
    const { emitted } = renderAc();
    await user.click(input());
    await settle();
    await user.keyboard("{Enter}");
    expect(emitted("select")).toBeUndefined();
    expect(emitted("submit")).toBeUndefined();
  });

  it("closes on Escape (keeping focus) and reopens when typing again", async () => {
    const user = setup();
    renderAc();
    await user.click(input());
    await settle();
    await user.keyboard("{Escape}");
    await settle();
    expect(options()).toHaveLength(0);
    expect(input()).toHaveFocus();
    await user.keyboard("a");
    await settle();
    expect(options().length).toBeGreaterThan(0);
  });

  it("Escape on a closed list clears the text", async () => {
    const user = setup();
    const { emitted } = renderAc({ defaultValue: "ban" });
    await user.click(input());
    await settle();
    await user.keyboard("{Escape}");
    await settle();
    expect(input()).toHaveValue("ban");
    await user.keyboard("{Escape}");
    await settle();
    expect(input()).toHaveValue("");
    expect(emitted("change")).toEqual([[""]]);
  });

  it("closes the dropdown when focus leaves the input", async () => {
    const user = setup();
    render(
      defineComponent({
        setup: () => () => [
          h(AutoComplete, { options: FRUITS, label: "Fruit" }),
          h("button", "Next"),
        ],
      }),
    );
    await user.click(input());
    await settle();
    expect(options()).toHaveLength(4);
    await user.tab();
    await settle();
    expect(options()).toHaveLength(0);
  });

  it("closes when clicking outside", async () => {
    const user = setup();
    render(
      defineComponent({
        setup: () => () => [
          h("p", "Outside"),
          h(AutoComplete, { options: FRUITS, label: "Fruit" }),
        ],
      }),
    );
    await user.click(input());
    await settle();
    await user.click(screen.getByText("Outside"));
    await settle();
    expect(options()).toHaveLength(0);
  });

  it("filters by the controlled value (v-model)", async () => {
    const user = setup();
    const value = ref("ban");
    render(
      defineComponent({
        setup: () => () =>
          h(AutoComplete, {
            options: FRUITS,
            label: "Fruit",
            modelValue: value.value,
            "onUpdate:modelValue": (v: string) => (value.value = v),
          }),
      }),
    );
    await user.click(input());
    await settle();
    expect(options().map((o) => o.textContent)).toEqual(["Banana"]);
    await user.clear(input());
    await settle();
    expect(value.value).toBe("");
    expect(options()).toHaveLength(4);
    value.value = "che";
    await settle();
    expect(input()).toHaveValue("che");
    expect(options().map((o) => o.textContent)).toEqual(["Cherry"]);
  });

  it("uses a custom filterOption and sortOption", async () => {
    const user = setup();
    renderAc({
      filterOption: (text: string, o: AutoCompleteOption) =>
        String(o.value).startsWith(text),
      sortOption: (a: AutoCompleteOption, b: AutoCompleteOption) =>
        b.label.localeCompare(a.label),
    });
    await user.type(input(), "ap");
    await settle();
    expect(options().map((o) => o.textContent)).toEqual(["Apricot", "Apple"]);
  });

  it("groups options with groupBy (first appearance) and navigates in display order", async () => {
    const user = setup();
    renderAc({
      options: [
        { value: "a", label: "Alpha", group: "Recent" },
        { value: "b", label: "Beta", group: "Popular" },
        { value: "c", label: "Gamma", group: "Recent" },
      ],
      groupBy: (o: AutoCompleteOption) => o.group ?? "",
    });
    await user.click(input());
    await settle();
    const groups = screen.getAllByRole("group");
    expect(groups.map((g) => g.getAttribute("aria-label"))).toEqual([
      "Recent",
      "Popular",
    ]);
    expect(within(groups[0]).getAllByRole("option")).toHaveLength(2);
    const label = groups[0].querySelector('[data-part="group-label"]')!;
    expect(label).toHaveClass(styles.groupLabel);
    expect(label).toHaveAttribute("aria-hidden", "true");
    await user.keyboard("{ArrowDown}{ArrowDown}");
    await settle();
    expect(input()).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Gamma" }).id,
    );
    await user.hover(screen.getByRole("option", { name: "Beta" }));
    await settle();
    expect(screen.getByRole("option", { name: "Beta" })).toHaveClass(
      styles.active,
    );
    expect(screen.getByRole("option", { name: "Alpha" })).not.toHaveClass(
      styles.active,
    );
    await user.unhover(screen.getByRole("option", { name: "Beta" }));
    await settle();
    expect(screen.getByRole("option", { name: "Beta" })).not.toHaveClass(
      styles.active,
    );
  });

  it("groupMode='adjacent' groups runs of consecutive options; '' has no heading", async () => {
    search({
      options: [
        { value: "a", label: "Alpha", group: "Recent" },
        { value: "b", label: "Beta", group: "Popular" },
        { value: "c", label: "Gamma", group: "Recent" },
        { value: "d", label: "Delta" },
      ],
      groupBy: (o: AutoCompleteOption) => o.group ?? "",
      groupMode: "adjacent",
    });
    input().focus();
    await settle();
    const headings = Array.from(
      document.querySelectorAll(`.${styles.groupLabel}`),
    ).map((el) => el.textContent?.trim());
    expect(headings).toEqual(["Recent", "Popular", "Recent"]);
    expect(options().map((o) => o.textContent)).toEqual([
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
    ]);
    await keyDown("ArrowUp");
    expect(input()).toHaveAttribute("aria-activedescendant", options()[3].id);
  });

  it("uses the option slot only in custom mode", async () => {
    const user = setup();
    const { rerender } = renderAc(
      { mode: "custom" },
      {
        option: ({ option }: { option: AutoCompleteOption }) =>
          h("em", `#${option.label}`),
      },
    );
    await user.click(input());
    await settle();
    expect(options()[0]).toHaveTextContent("#Apple");
    await rerender({ mode: "basic" });
    await settle();
    expect(options()[0]).toHaveTextContent("Apple");
    expect(options()[0]).not.toHaveTextContent("#");
  });

  it("renders icons (vnodes or render functions), descriptions, highlight and style", async () => {
    const user = setup();
    renderAc({
      options: [
        {
          value: "a",
          label: "Alpha",
          icon: h("i", { "data-testid": "icon-a" }),
          description: "First",
          highlight: true,
          style: { color: "red" },
        },
        {
          value: "b",
          label: "Beta",
          icon: () => h("i", { "data-testid": "icon-b" }),
        },
      ],
    });
    await user.click(input());
    await settle();
    expect(screen.getByTestId("icon-a").parentElement).toHaveClass(styles.icon);
    expect(screen.getByTestId("icon-b")).toBeInTheDocument();
    expect(screen.getByText("First")).toHaveClass(styles.description);
    expect(options()[0]).toHaveClass(styles.highlight);
    expect(options()[0].style.color).toBe("red");
  });

  it("disables the dropdown animation and adds dropdownClassName", async () => {
    const user = setup();
    renderAc({ animation: false, dropdownClassName: "my-dropdown" });
    await user.click(input());
    await settle();
    const content = document.querySelector(".my-dropdown")!;
    expect(content).toHaveAttribute("data-part", "content");
    expect(content.querySelector(`.${styles.dropdown}`)).not.toHaveClass(
      styles.animated,
    );
  });

  it("supports the other placements and offsets", async () => {
    const user = setup();
    renderAc({ placement: "right", offset: { x: 8, y: 2 } });
    await user.click(input());
    await settle();
    expect(document.querySelector('[data-part="content"]')).toHaveAttribute(
      "data-placement",
      "right-start",
    );
  });

  it("prevents form submission when Enter picks an option", async () => {
    const user = setup();
    const onSubmit = vi.fn((e: Event) => e.preventDefault());
    render(
      defineComponent({
        setup: () => () =>
          h("form", { onSubmit }, [
            h(AutoComplete, { options: FRUITS, label: "Fruit" }),
          ]),
      }),
    );
    await user.click(input());
    await settle();
    await user.keyboard("{ArrowDown}{Enter}");
    await settle();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(input()).toHaveValue("Apple");
  });

  it("exposes the root and the Input attributes", () => {
    renderAc({
      class: "custom",
      "data-testid": "ac",
      inputProps: { placeholder: "Type", size: "small" },
    });
    expect(screen.getByTestId("ac")).toHaveClass("custom");
    expect(input()).toHaveAttribute("placeholder", "Type");
    expect(document.querySelector('[data-minerva="input"]')).toHaveAttribute(
      "data-size",
      "small",
    );
  });
});

describe("AutoComplete keyboard, submit and form integration", () => {
  it("highlights the first option with autoHighlight and moves data-highlighted", async () => {
    search();
    input().focus();
    await settle();
    expect(options()[0]).toHaveAttribute("data-highlighted", "");
    expect(input()).toHaveAttribute("aria-activedescendant", options()[0].id);
    await keyDown("ArrowDown");
    expect(options()[0]).not.toHaveAttribute("data-highlighted");
    expect(options()[1]).toHaveAttribute("data-highlighted", "");
    expect(options()[1]).toHaveAttribute("aria-selected", "true");
  });

  it("Enter picks the highlighted option without filling the input", async () => {
    const { emitted } = search();
    input().focus();
    await settle();
    await keyDown("Enter");
    expect(emitted("select")).toEqual([[OPTIONS[0]]]);
    expect(input()).toHaveValue("");
  });

  it("Enter without a match emits submit with the trimmed text", async () => {
    const user = setup();
    const onSubmit = vi.fn();
    search({ onSubmit });
    await user.type(input(), "  zz  ");
    await settle();
    await keyDown("Enter");
    expect(onSubmit).toHaveBeenCalledWith("zz");
    expect(options()).toHaveLength(0);
  });

  it("Enter with blank text does not submit", async () => {
    const user = setup();
    const onSubmit = vi.fn();
    search({ onSubmit, options: [] });
    await user.type(input(), "   ");
    await keyDown("Enter");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("ignores IME confirmation and closes when focus leaves", async () => {
    const { emitted } = search();
    input().focus();
    await settle();
    await keyDown("Enter", { isComposing: true });
    await keyDown("Enter", { keyCode: 229 } as KeyboardEventInit);
    expect(emitted("select")).toBeUndefined();
    await fireEvent.compositionStart(input());
    await keyDown("Enter");
    await fireEvent.click(options()[0]);
    expect(emitted("select")).toBeUndefined();
    await fireEvent.compositionEnd(input());
    await keyDown("Enter");
    expect(emitted("select")).toHaveLength(1);
    input().focus();
    await settle();
    input().blur();
    await settle();
    expect(options()).toHaveLength(0);
  });

  it("reopens when the still-focused input is clicked, notifying once", async () => {
    const { emitted } = search();
    input().focus();
    await settle();
    await fireEvent.mouseDown(options()[1]);
    await fireEvent.click(options()[1]);
    expect(emitted("select")).toEqual([[OPTIONS[1]]]);
    expect(options()).toHaveLength(0);
    expect(input()).toHaveFocus();
    const before = emitted("dropdownVisibleChange").length;
    input().click();
    await settle();
    expect(options()).toHaveLength(3);
    input().click();
    await settle();
    expect(emitted("dropdownVisibleChange").slice(before)).toEqual([[true]]);
  });

  it("reopens with ArrowDown / Alt+ArrowDown after closing", async () => {
    search();
    input().focus();
    await settle();
    for (const init of [{}, { altKey: true }]) {
      await keyDown("Escape");
      expect(options()).toHaveLength(0);
      await keyDown("ArrowDown", init);
      expect(options()).toHaveLength(3);
    }
    await keyDown("Escape");
    await keyDown("ArrowUp");
    expect(options()).toHaveLength(3);
  });

  it("selects an option with Enter / Space when the option itself has focus", async () => {
    const { emitted } = search();
    input().focus();
    await settle();
    await fireEvent.keyDown(options()[2], { key: "Tab" });
    expect(emitted("select")).toBeUndefined();
    await fireEvent.keyDown(options()[2], { key: " " });
    expect(emitted("select")).toEqual([[OPTIONS[2]]]);
  });

  it("does not keep an interactive popup when disabled or read-only", async () => {
    const { rerender } = search();
    input().focus();
    await settle();
    expect(options()).toHaveLength(3);
    await rerender({ inputProps: { "aria-label": "search", disabled: true } });
    await settle();
    expect(options()).toHaveLength(0);
    expect(input()).toBeDisabled();
    expect(
      document.querySelector('[data-minerva="autocomplete"]'),
    ).toHaveAttribute("data-disabled", "");
    await rerender({ inputProps: { "aria-label": "search", readOnly: true } });
    await settle();
    expect(input()).toHaveAttribute("readonly");
    input().focus();
    input().click();
    await keyDown("ArrowDown");
    expect(options()).toHaveLength(0);
    expect(
      document.querySelector('[data-minerva="autocomplete"]'),
    ).toHaveAttribute("data-readonly", "");
  });

  it("takes id, description, invalid, required and disabled from a FormControl", async () => {
    const ctx = formControl({
      id: "q",
      invalid: true,
      required: true,
      errorMessages: 1,
    });
    render(
      defineComponent({
        setup() {
          provide(FORM_CONTROL_KEY, ctx);
          return () =>
            h(AutoComplete, {
              options: OPTIONS,
              inputProps: { "aria-label": "search" },
            });
        },
      }),
    );
    expect(input()).toHaveAttribute("id", "q");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(input()).toHaveAttribute("aria-required", "true");
    expect(input()).toHaveAttribute("aria-describedby", "field-error");
  });

  it("is disabled by a disabled FormControl", () => {
    render(
      defineComponent({
        setup() {
          provide(FORM_CONTROL_KEY, formControl({ disabled: true }));
          return () =>
            h(AutoComplete, {
              options: OPTIONS,
              inputProps: { "aria-label": "search" },
            });
        },
      }),
    );
    expect(input()).toBeDisabled();
  });

  it("forwards native input attributes and listeners through inputProps", async () => {
    const onCompositionstart = vi.fn();
    const onFocus = vi.fn();
    search({
      inputProps: {
        "aria-label": "search",
        "aria-describedby": "hint",
        onCompositionstart,
        onFocus,
      },
    });
    expect(input()).toHaveAttribute("aria-describedby", "hint");
    await fireEvent.compositionStart(input());
    expect(onCompositionstart).toHaveBeenCalledTimes(1);
    input().focus();
    await settle();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(options()).toHaveLength(3);
  });

  it("keeps the controlled listbox while open for empty and loading states", async () => {
    const { rerender } = search({ options: [] });
    input().focus();
    await settle();
    const listbox = screen.getByRole("listbox");
    expect(input()).toHaveAttribute("aria-controls", listbox.id);
    expect(within(listbox).queryByRole("option")).toBeNull();
    await rerender({ loading: true });
    await settle();
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-busy", "true");
  });

  it("scrolls the active option into view", async () => {
    const spy = vi
      .spyOn(HTMLElement.prototype, "scrollIntoView")
      .mockImplementation(() => {});
    search();
    input().focus();
    await settle();
    await keyDown("ArrowDown");
    expect(spy.mock.contexts).toContain(options()[1]);
  });
});

describe("AutoComplete in a Modal", () => {
  it("Escape closes only the listbox, a second Escape the Modal", async () => {
    const user = setup();
    render(Modal, {
      props: { defaultOpen: true, title: "Find" },
      slots: {
        default: () =>
          h(AutoComplete, {
            options: OPTIONS,
            inputProps: { "aria-label": "search" },
          }),
      },
    });
    await settle();
    await user.click(input());
    await settle();
    expect(options()).toHaveLength(3);
    await user.keyboard("{Escape}");
    await settle();
    expect(options()).toHaveLength(0);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await settle();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("Escape on a closed list with text clears it and keeps the Modal open", async () => {
    const user = setup();
    render(Modal, {
      props: { defaultOpen: true, title: "Find" },
      slots: {
        default: () =>
          h(AutoComplete, {
            options: OPTIONS,
            defaultValue: "zzz",
            inputProps: { "aria-label": "search" },
          }),
      },
    });
    await settle();
    await user.click(input());
    await settle();
    await user.keyboard("{Escape}");
    await settle();
    await user.keyboard("{Escape}");
    await settle();
    expect(input()).toHaveValue("");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
