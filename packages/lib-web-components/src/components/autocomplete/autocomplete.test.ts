import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { html } from "lit";
import { getActiveElement } from "@minerva/core";
import { MinervaAutocomplete, type AutoCompleteOption } from "./autocomplete";
import "../../elements/autocomplete";
import "../../elements/modal";
import type { MinervaModal } from "../modal/modal";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const OPTIONS: AutoCompleteOption[] = [
  { value: "1", label: "Lord of Mysteries", description: "Cuttlefish" },
  { value: "2", label: "Sword of Coming", description: "Fenghuo" },
  { value: "3", label: "A Record of Mortal", description: "Wangyu" },
];

async function setup(
  attrs = 'aria-label="search"',
  options: AutoCompleteOption[] = OPTIONS,
  markup = (tag: string) => tag,
) {
  const el = await mount<MinervaAutocomplete>(
    markup(`<minerva-autocomplete ${attrs}></minerva-autocomplete>`),
    "minerva-autocomplete",
  );
  el.options = options;
  await settle();
  return el;
}

const input = (el: MinervaAutocomplete) => $<HTMLInputElement>(el, "input");
const listbox = (el: MinervaAutocomplete) =>
  el.shadowRoot!.querySelector<HTMLElement>("[role=listbox]");
const options = (el: MinervaAutocomplete) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>("[role=option]"));
const activeId = (el: MinervaAutocomplete) =>
  input(el).getAttribute("aria-activedescendant");

async function focusInput(el: MinervaAutocomplete) {
  input(el).focus();
  await settle();
}

async function press(keys: string) {
  await userEvent.keyboard(keys);
  await settle();
}

async function keyDown(
  el: MinervaAutocomplete,
  key: string,
  init: KeyboardEventInit = {},
) {
  input(el).dispatchEvent(
    new KeyboardEvent("keydown", {
      key,
      bubbles: true,
      composed: true,
      cancelable: true,
      ...init,
    }),
  );
  await settle();
}

describe("<minerva-autocomplete>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-autocomplete")).toBe(
      MinervaAutocomplete,
    );
  });

  it("renders a labelled combobox input, closed by default", async () => {
    const el = await setup('name="book" label="Book"');
    expect($(el, ".autoComplete")).not.toBeNull();
    const label = $(el, "label.label");
    expect(label.textContent).toBe("Book");
    expect(label.getAttribute("for")).toBe(input(el).id);
    expect(input(el)).toHaveAttribute("role", "combobox");
    expect(input(el)).toHaveAttribute("aria-autocomplete", "list");
    expect(input(el)).toHaveAttribute("aria-expanded", "false");
    expect(input(el).classList).toContain("field");
    expect($(el, "[part=field]").classList).toContain("root");
    expect(listbox(el)).toBeNull();
  });

  it("reflects attributes and has sensible defaults", async () => {
    const el = await setup();
    expect(el.open).toBe(false);
    expect(el.mode).toBe("basic");
    expect(el.placement).toBe("bottom");
    expect(el.size).toBe("medium");
    el.size = "large";
    el.invalid = true;
    await settle();
    expect(el.getAttribute("size")).toBe("large");
    expect($(el, "[part=field]").classList).toContain("large");
    expect(input(el)).toHaveAttribute("aria-invalid", "true");
  });

  it("uses the value attribute as the initial text", async () => {
    const el = await setup('aria-label="search" value="Sword"');
    expect(el.value).toBe("Sword");
    expect(input(el).value).toBe("Sword");
  });

  it("opens with all options on focus, highlights with auto-highlight", async () => {
    const el = await setup('aria-label="search" auto-highlight');
    const onOpen = vi.fn();
    el.addEventListener("minerva-open-change", onOpen);
    await focusInput(el);
    expect(onOpen.mock.calls[0][0].detail).toEqual({ open: true });
    expect(input(el)).toHaveAttribute("aria-expanded", "true");
    expect(listbox(el)!.classList).toContain("optionList");
    expect(input(el).getAttribute("aria-controls")).toBe(listbox(el)!.id);
    const [first, second] = options(el);
    expect(options(el)).toHaveLength(3);
    expect(first.classList).toContain("optionItem");
    expect(first.classList).toContain("active");
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(second).toHaveAttribute("aria-selected", "false");
    expect(activeId(el)).toBe(first.id);
    expect(first.querySelector(".label")!.textContent).toBe(
      "Lord of Mysteries",
    );
    expect(first.querySelector(".description")!.textContent).toBe("Cuttlefish");
  });

  it("filters options case-insensitively as the user types", async () => {
    const el = await setup();
    const onInput = vi.fn();
    el.addEventListener("minerva-input", onInput);
    await userEvent.click(input(el));
    await press("SWORD");
    expect(el.value).toBe("SWORD");
    expect(onInput.mock.calls.at(-1)![0].detail).toEqual({ value: "SWORD" });
    expect(options(el).map((o) => o.textContent?.trim())).toEqual([
      expect.stringContaining("Sword of Coming"),
    ]);
  });

  it("shows the localized empty state, renderEmpty, and the loading state", async () => {
    document.documentElement.lang = "fr";
    const el = await setup('aria-label="search"', []);
    await focusInput(el);
    const empty = $(el, "[part=empty]");
    expect(empty.classList).toContain("empty");
    expect(empty.textContent?.trim()).not.toBe("");
    expect(empty.textContent).not.toContain("No Data");
    el.renderEmpty = () => "Nothing";
    await settle();
    expect($(el, "[part=empty]").textContent?.trim()).toBe("Nothing");
    el.loading = true;
    await settle();
    expect($(el, ".loading")).not.toBeNull();
    expect(listbox(el)).toHaveAttribute("aria-busy", "true");
    expect(input(el).getAttribute("aria-controls")).toBe(listbox(el)!.id);
  });

  it("selects an option on click, fills the input and fires events", async () => {
    const el = await setup();
    const onSelect = vi.fn();
    const onChange = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    el.addEventListener("minerva-change", onChange);
    await userEvent.click(input(el));
    await settle();
    await userEvent.click(options(el)[1]);
    await settle();
    expect(onSelect.mock.calls[0][0].detail).toEqual({
      value: "2",
      option: OPTIONS[1],
    });
    expect(onChange.mock.calls[0][0].detail).toEqual({
      value: "Sword of Coming",
    });
    expect(el.value).toBe("Sword of Coming");
    expect(listbox(el)).toBeNull();
    expect(getActiveElement()).toBe(input(el));
  });

  it("ignores clicks on disabled options", async () => {
    const el = await setup('aria-label="search"', [
      { value: "a", label: "Alpha", disabled: true },
      { value: "b", label: "Beta" },
    ]);
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    await focusInput(el);
    expect(options(el)[0]).toHaveAttribute("aria-disabled", "true");
    expect(options(el)[0].classList).toContain("disabled");
    await userEvent.click(options(el)[0]);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("minerva-open-change is cancelable", async () => {
    const el = await setup();
    el.addEventListener("minerva-open-change", (e) => e.preventDefault());
    await focusInput(el);
    expect(el.open).toBe(false);
    expect(listbox(el)).toBeNull();
  });

  it("closes when clicking outside", async () => {
    const el = await setup(
      'aria-label="search"',
      OPTIONS,
      (tag) => `<p id="outside">Outside</p>${tag}`,
    );
    await userEvent.click(input(el));
    await settle();
    await wait(5);
    await userEvent.click(document.getElementById("outside")!);
    await settle();
    expect(listbox(el)).toBeNull();
  });

  it("groups options with groupBy (first / adjacent modes, '' without heading)", async () => {
    const el = await setup('aria-label="search" group-mode="adjacent"', [
      { value: "a", label: "Alpha", group: "Recent" },
      { value: "b", label: "Beta", group: "Popular" },
      { value: "c", label: "Gamma", group: "Recent" },
      { value: "d", label: "Delta" },
    ]);
    el.groupBy = (o) => o.group ?? "";
    await focusInput(el);
    const headings = () =>
      Array.from(el.shadowRoot!.querySelectorAll(".groupLabel")).map((h) =>
        h.textContent?.trim(),
      );
    expect(headings()).toEqual(["Recent", "Popular", "Recent"]);
    expect(
      el.shadowRoot!.querySelector("[role=group]")!.getAttribute("aria-label"),
    ).toBe("Recent");
    expect(options(el).map((o) => o.textContent?.trim())).toEqual([
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
    ]);
    await keyDown(el, "ArrowUp");
    expect(activeId(el)).toBe(options(el)[3].id);
    el.groupMode = "first";
    await settle();
    expect(headings()).toEqual(["Recent", "Popular"]);
    expect(options(el).map((o) => o.textContent?.trim())).toEqual([
      "Alpha",
      "Gamma",
      "Beta",
      "Delta",
    ]);
  });

  it("uses a custom filterOption / sortOption and renderOption in custom mode", async () => {
    const el = await setup('aria-label="search"');
    el.filterOption = (_, o) => o.value !== "2";
    el.sortOption = (a, b) => a.label.localeCompare(b.label);
    el.renderOption = (o) => html`<em>${o.label}!</em>`;
    await focusInput(el);
    expect(
      options(el).map((o) => o.querySelector(".label")!.textContent),
    ).toEqual(["A Record of Mortal", "Lord of Mysteries"]);
    el.mode = "custom";
    await settle();
    expect(options(el)[0].querySelector("em")!.textContent).toBe(
      "A Record of Mortal!",
    );
  });

  it("applies highlight / hover classes and no-animation", async () => {
    const el = await setup('aria-label="search" no-animation', [
      { value: "a", label: "Alpha", highlight: true },
      { value: "b", label: "Beta" },
    ]);
    await focusInput(el);
    expect(options(el)[0].classList).toContain("highlight");
    expect($(el, ".dropdown").classList).not.toContain("animated");
    await userEvent.hover(options(el)[1]);
    await settle();
    expect(options(el)[1].classList).toContain("active");
  });
});

describe("<minerva-autocomplete> keyboard", () => {
  it("Arrow keys wrap and set aria-activedescendant, Enter picks, Escape closes and keeps focus", async () => {
    const el = await setup();
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    await userEvent.click(input(el));
    await settle();
    expect(listbox(el)).not.toBeNull();
    await press("{ArrowUp}");
    expect(activeId(el)).toBe(options(el)[2].id);
    await press("{ArrowDown}");
    expect(activeId(el)).toBe(options(el)[0].id);
    await press("{Escape}");
    expect(listbox(el)).toBeNull();
    expect(input(el)).toHaveAttribute("aria-expanded", "false");
    expect(input(el)).not.toHaveAttribute("aria-activedescendant");
    expect(getActiveElement()).toBe(input(el));
    await press("{ArrowDown}{ArrowDown}{Enter}");
    expect(onSelect.mock.calls[0][0].detail.option).toEqual(OPTIONS[1]);
    expect(getActiveElement()).toBe(input(el));
  });

  it("skips disabled options", async () => {
    const el = await setup('aria-label="search"', [
      { value: "a", label: "Alpha" },
      { value: "b", label: "Beta", disabled: true },
      { value: "c", label: "Gamma" },
    ]);
    await focusInput(el);
    await keyDown(el, "ArrowDown");
    await keyDown(el, "ArrowDown");
    expect(activeId(el)).toBe(options(el)[2].id);
  });

  it("moves the item--highlighted part with the arrows (disabled items: item--disabled)", async () => {
    const el = await setup('aria-label="search"', [
      { value: "a", label: "Alpha" },
      { value: "b", label: "Beta", disabled: true },
      { value: "c", label: "Gamma" },
    ]);
    await focusInput(el);
    const parts = () => options(el).map((o) => o.getAttribute("part"));
    expect(parts()).toEqual(["item", "item item--disabled", "item"]);
    await keyDown(el, "ArrowDown");
    expect(parts()).toEqual([
      "item item--highlighted",
      "item item--disabled",
      "item",
    ]);
    await keyDown(el, "ArrowDown");
    expect(parts()).toEqual([
      "item",
      "item item--disabled",
      "item item--highlighted",
    ]);
  });

  it("Enter picks the highlighted option without filling the input (no-fill-on-select)", async () => {
    const el = await setup(
      'aria-label="search" auto-highlight no-fill-on-select',
    );
    const onSelect = vi.fn();
    const onInput = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    el.addEventListener("minerva-input", onInput);
    await focusInput(el);
    await keyDown(el, "ArrowDown");
    await keyDown(el, "Enter");
    expect(onSelect.mock.calls[0][0].detail.value).toBe("2");
    expect(onInput).not.toHaveBeenCalled();
    expect(options(el)).toHaveLength(0);
  });

  it("Enter without an active option fires minerva-submit with the trimmed text; blank text does not", async () => {
    const el = await setup('aria-label="search" value="  unknown book "');
    const onSubmit = vi.fn();
    el.addEventListener("minerva-submit", onSubmit);
    await focusInput(el);
    await keyDown(el, "Enter");
    expect(onSubmit.mock.calls[0][0].detail).toEqual({
      value: "unknown book",
    });
    expect(options(el)).toHaveLength(0);
    el.value = "  ";
    await settle();
    await keyDown(el, "Enter");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("ignores IME confirmation", async () => {
    const el = await setup('aria-label="search" auto-highlight');
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    await focusInput(el);
    await keyDown(el, "Enter", { isComposing: true });
    expect(onSelect).not.toHaveBeenCalled();
    input(el).dispatchEvent(
      new CompositionEvent("compositionstart", { bubbles: true }),
    );
    await keyDown(el, "Enter");
    options(el)[0].click();
    expect(onSelect).not.toHaveBeenCalled();
    input(el).dispatchEvent(
      new CompositionEvent("compositionend", { bubbles: true }),
    );
    await keyDown(el, "Enter");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("reopens when the still-focused input is clicked, notifying once", async () => {
    const el = await setup('aria-label="search" no-fill-on-select');
    await focusInput(el);
    options(el)[1].click();
    await settle();
    expect(options(el)).toHaveLength(0);
    const onOpen = vi.fn();
    el.addEventListener("minerva-open-change", onOpen);
    input(el).click();
    await settle();
    expect(options(el)).toHaveLength(3);
    input(el).click();
    await settle();
    expect(onOpen.mock.calls.map((c) => c[0].detail.open)).toEqual([true]);
  });

  it("reopens with ArrowDown / Alt+ArrowDown after closing", async () => {
    const el = await setup();
    await userEvent.click(input(el));
    await settle();
    for (const keys of ["{ArrowDown}", "{Alt>}{ArrowDown}{/Alt}"]) {
      await press("{Escape}");
      expect(options(el)).toHaveLength(0);
      await press(keys);
      expect(options(el)).toHaveLength(3);
    }
  });

  it("selects an option with Enter / Space when the option itself has focus", async () => {
    const el = await setup();
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", onSelect);
    await focusInput(el);
    const third = options(el)[2];
    third.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );
    expect(onSelect).not.toHaveBeenCalled();
    third.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", bubbles: true }),
    );
    expect(onSelect.mock.calls[0][0].detail.value).toBe("3");
  });

  it("Escape closes an open list without clearing; Escape on a closed list clears the text", async () => {
    const el = await setup();
    const onInput = vi.fn();
    const onChange = vi.fn();
    el.addEventListener("minerva-input", onInput);
    el.addEventListener("minerva-change", onChange);
    await userEvent.click(input(el));
    await press("Sword");
    expect(listbox(el)).not.toBeNull();
    onInput.mockClear();
    await press("{Escape}");
    expect(listbox(el)).toBeNull();
    expect(input(el).value).toBe("Sword");
    expect(onInput).not.toHaveBeenCalled();
    expect(input(el)).toHaveAttribute("data-minerva-escape-consumer");
    await press("{Escape}");
    expect(input(el).value).toBe("");
    expect(onChange.mock.calls.at(-1)![0].detail).toEqual({ value: "" });
    expect(listbox(el)).toBeNull();
    expect(getActiveElement()).toBe(input(el));
    const calls = onChange.mock.calls.length;
    await press("{Escape}");
    expect(onChange).toHaveBeenCalledTimes(calls);
  });

  it("closes when focus leaves the input", async () => {
    const el = await setup(
      'aria-label="search"',
      OPTIONS,
      (tag) => `${tag}<button id="after">After</button>`,
    );
    await focusInput(el);
    expect(listbox(el)).not.toBeNull();
    document.getElementById("after")!.focus();
    await settle();
    expect(listbox(el)).toBeNull();
  });

  it("does not open when disabled or read-only", async () => {
    const el = await setup();
    await focusInput(el);
    expect(options(el)).toHaveLength(3);
    el.disabled = true;
    await settle();
    expect(options(el)).toHaveLength(0);
    expect(input(el).disabled).toBe(true);
    el.disabled = false;
    el.readOnly = true;
    await settle();
    expect(input(el)).toHaveAttribute("readonly");
    await focusInput(el);
    input(el).click();
    await keyDown(el, "ArrowDown");
    expect(options(el)).toHaveLength(0);
  });

  it("scrolls the keyboard-active option into view", async () => {
    const spy = vi
      .spyOn(HTMLElement.prototype, "scrollIntoView")
      .mockImplementation(() => {});
    const el = await setup();
    await focusInput(el);
    await keyDown(el, "ArrowDown");
    expect(spy.mock.contexts.at(-1)).toBe(options(el)[0]);
  });
});

describe("<minerva-autocomplete> layering", () => {
  const inModal = async () => {
    const modal = await mount<MinervaModal>(
      `<minerva-modal label="Find a book"><minerva-autocomplete aria-label="search"></minerva-autocomplete></minerva-modal>`,
    );
    const el = modal.querySelector<MinervaAutocomplete>(
      "minerva-autocomplete",
    )!;
    el.options = OPTIONS;
    modal.open = true;
    await settle();
    await wait(10);
    return { modal, el };
  };

  it("inside a modal, Escape closes only the listbox, a second Escape the modal", async () => {
    const { modal, el } = await inModal();
    expect(getActiveElement()).toBe(input(el));
    expect(listbox(el)).not.toBeNull();
    await press("{Escape}");
    expect(listbox(el)).toBeNull();
    expect(modal.open).toBe(true);
    expect(getActiveElement()).toBe(input(el));
    await press("{Escape}");
    expect(modal.open).toBe(false);
  });

  it("inside a modal, Escape on a closed list with text clears it and keeps the modal open", async () => {
    const { modal, el } = await inModal();
    await press("Sword");
    await press("{Escape}");
    expect(listbox(el)).toBeNull();
    await press("{Escape}");
    expect(input(el).value).toBe("");
    expect(modal.open).toBe(true);
    await press("{Escape}");
    expect(modal.open).toBe(false);
  });
});

describe("<minerva-autocomplete> forms", () => {
  it("submits the text, validates required (localized) and resets", async () => {
    document.documentElement.lang = "fr";
    document.body.innerHTML = `<form><minerva-autocomplete name="book" required aria-label="search"></minerva-autocomplete></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaAutocomplete>("minerva-autocomplete")!;
    el.options = OPTIONS;
    await settle();
    expect(new FormData(form).get("book")).toBe("");
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).not.toBe("");
    expect(el.validationMessage).not.toBe("Please fill out this field.");
    expect(input(el)).toHaveAttribute("aria-required", "true");
    await focusInput(el);
    await keyDown(el, "ArrowDown");
    await keyDown(el, "Enter");
    expect(new FormData(form).get("book")).toBe("Lord of Mysteries");
    expect(el.checkValidity()).toBe(true);
    form.reset();
    await settle();
    expect(el.value).toBe("");
    expect(input(el).value).toBe("");
  });

  it("is disabled by a disabled fieldset and not submitted", async () => {
    document.body.innerHTML = `<form><fieldset disabled><minerva-autocomplete name="q" value="x"></minerva-autocomplete></fieldset></form>`;
    await settle();
    const el = document.querySelector<MinervaAutocomplete>(
      "minerva-autocomplete",
    )!;
    el.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await el.updateComplete;
    expect(input(el).disabled).toBe(true);
    expect(new FormData(document.querySelector("form")!).get("q")).toBeNull();
  });

  it("is named by <label for> and described by aria-describedby", async () => {
    const el = await mount<MinervaAutocomplete>(
      `<label for="ac">Books</label><span id="hint">Type a title</span><minerva-autocomplete id="ac" aria-describedby="hint"></minerva-autocomplete>`,
      "minerva-autocomplete",
    );
    expect(input(el)).toHaveAttribute("aria-label", "Books");
    expect(input(el)).toHaveAttribute("aria-description", "Type a title");
  });
});

describe("<minerva-autocomplete> dev warnings", () => {
  it("warns about duplicate option values", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup('aria-label="search"', [
      { value: "a", label: "A" },
      { value: "a", label: "A again" },
    ]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("unique"));
  });
});
