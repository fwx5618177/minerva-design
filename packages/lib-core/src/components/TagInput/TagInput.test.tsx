import { act, createRef, useState } from "react";
import { render, type RenderResult } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { TagInput, type TagInputProps } from ".";
import { FormField } from "../FormControl";

let view: RenderResult;
const input = () => view.container.querySelector<HTMLInputElement>("input")!;
const options = () =>
  Array.from(view.container.querySelectorAll('[role="option"]'));
const option = (label: string) =>
  options().find((el) => el.textContent === label)!;
function type(value: string) {
  act(() => {
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )!.set!.call(input(), value);
    input().dispatchEvent(new Event("input", { bubbles: true }));
  });
}
function key(value: string, composing = false) {
  const event = new KeyboardEvent("keydown", {
    key: value,
    isComposing: composing,
    bubbles: true,
    cancelable: true,
  });
  act(() => input().dispatchEvent(event));
  return event;
}
const mouseDown = (el: Element) =>
  act(() =>
    el.dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true, cancelable: true }),
    ),
  );

function fixture(props: Partial<TagInputProps> = {}) {
  const changed = vi.fn();
  function App() {
    const [value, setValue] = useState<readonly string[]>(["React"]);
    return (
      <TagInput
        value={value}
        onChange={(next) => {
          setValue(next);
          changed(next);
        }}
        options={["React", "Vue", "Vue"]}
        aria-label="Tags"
        {...props}
      />
    );
  }
  view = render(<App />);
  return changed;
}

describe("TagInput", () => {
  it("renders the novel-isr-ui structure hooks and combobox semantics", () => {
    fixture({ className: "consumer" });
    const root = view.container.firstElementChild!;
    expect(root).toHaveClass("ui-tag-input", "consumer");
    expect(
      root.querySelector(".ui-tag-input-values .ui-tag-input-label"),
    ).toHaveTextContent("React");
    expect(input().closest(".ui-tag-input-entry")).not.toBeNull();
    expect(input().closest(".ui-autocomplete-root")).not.toBeNull();
    expect(input().parentElement).toHaveClass(
      "ui-input-root",
      "ui-input-size-md",
    );
    expect(input()).toHaveAttribute("role", "combobox");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveAttribute("aria-autocomplete", "list");
    act(() => input().focus());
    expect(input()).toHaveAttribute("aria-expanded", "true");
    const listbox = view.container.querySelector('[role="listbox"]')!;
    expect(input()).toHaveAttribute("aria-controls", listbox.id);
    key("ArrowDown");
    expect(input()).toHaveAttribute("aria-activedescendant", options()[0].id);
    expect(options()[0]).toHaveAttribute("aria-selected", "true");
  });

  it("creates trimmed tags, selects suggestions and does not duplicate selected values", () => {
    const changed = fixture();
    act(() => input().focus());
    expect(options()).toHaveLength(1);
    type(" Custom ");
    key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Custom"]);
    expect(input().value).toBe("");
    type("React");
    key("Enter");
    expect(changed).toHaveBeenCalledTimes(1);
    type("Vu");
    mouseDown(option("Vue"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Custom", "Vue"]);
  });

  it("does not submit tags while confirming IME composition or submit the enclosing form on empty Enter", () => {
    const changed = fixture();
    act(() => input().focus());
    type("中文");
    key("Enter", true);
    expect(changed).not.toHaveBeenCalled();
    key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "中文"]);
    expect(key("Enter").defaultPrevented).toBe(true);
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it("commits on blur, cancels the draft with Escape and offers labeled remove and clear actions", () => {
    const changed = fixture();
    act(() => input().focus());
    type("Draft");
    act(() => input().blur());
    expect(changed).toHaveBeenLastCalledWith(["React", "Draft"]);
    act(() => input().focus());
    type("Discard");
    key("Escape");
    act(() => input().blur());
    expect(changed).toHaveBeenCalledTimes(1);
    act(() =>
      view.container
        .querySelector<HTMLButtonElement>('[aria-label="Remove React"]')!
        .click(),
    );
    expect(changed).toHaveBeenLastCalledWith(["Draft"]);
    expect(document.activeElement).toBe(input());
    act(() =>
      view.container
        .querySelector<HTMLButtonElement>('[aria-label="Clear tags"]')!
        .click(),
    );
    expect(changed).toHaveBeenLastCalledWith([]);
  });

  it("does not commit on blur when commitOnBlur is false", () => {
    const changed = fixture({ commitOnBlur: false });
    act(() => input().focus());
    type("Draft");
    act(() => input().blur());
    expect(changed).not.toHaveBeenCalled();
  });

  it("adds the draft with the add button and keeps focus in the input", () => {
    const changed = fixture();
    const add = () =>
      view.container.querySelector<HTMLButtonElement>(
        '[aria-label="Add tag"]',
      )!;
    expect(add().disabled).toBe(true);
    act(() => input().focus());
    type("Svelte");
    expect(add().disabled).toBe(false);
    mouseDown(add());
    act(() => add().click());
    expect(changed).toHaveBeenLastCalledWith(["React", "Svelte"]);
    expect(document.activeElement).toBe(input());
  });

  it("selects a suggestion with arrow keys even with an empty draft", () => {
    const changed = fixture();
    act(() => input().focus());
    key("ArrowDown");
    key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue"]);
  });

  it("cycles the highlight with ArrowUp / ArrowDown and follows the pointer", () => {
    const changed = fixture({ options: ["Vue", "Svelte", "Solid"] });
    act(() => input().focus());
    key("ArrowUp");
    expect(options()[2]).toHaveAttribute("aria-selected", "true");
    key("ArrowDown");
    expect(options()[0]).toHaveAttribute("aria-selected", "true");
    act(() =>
      option("Svelte").dispatchEvent(
        new MouseEvent("mouseover", { bubbles: true }),
      ),
    );
    expect(option("Svelte")).toHaveAttribute("aria-selected", "true");
    key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Svelte"]);
  });

  it("opens the list with the arrow keys after Escape closed it", () => {
    fixture();
    act(() => input().focus());
    key("Escape");
    expect(view.container.querySelector('[role="listbox"]')).toBeNull();
    key("ArrowDown");
    expect(view.container.querySelector('[role="listbox"]')).not.toBeNull();
  });

  it("shows the empty text when no suggestion is left", () => {
    fixture({ options: [] });
    act(() => input().focus());
    expect(
      view.container.querySelector(".ui-autocomplete-empty"),
    ).toHaveTextContent("No matches");
    key("ArrowDown");
    expect(options()).toHaveLength(0);
  });

  it("allows explicit navigation away from a duplicate draft to a different suggestion", () => {
    const changed = fixture({ options: ["React Native"] });
    act(() => input().focus());
    type("React");
    key("ArrowDown");
    key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "React Native"]);
  });

  it("creates the draft independently of the localized create label", () => {
    const changed = fixture({ createLabel: () => "Create new tag" });
    act(() => input().focus());
    type("Vu");
    expect(options()[0]).toHaveTextContent("Create new tag");
    key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Vu"]);
  });

  it("uses the default create label", () => {
    fixture();
    act(() => input().focus());
    type("Svelte");
    expect(options()[0]).toHaveTextContent('Add "Svelte"');
  });

  it("commits a navigated draft when the list is closed", () => {
    const changed = fixture({ options: [], commitOnBlur: false });
    act(() => input().focus());
    type("Solid");
    key("ArrowDown");
    act(() => input().blur());
    expect(view.container.querySelector('[role="listbox"]')).toBeNull();
    key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Solid"]);
  });

  it("submits selected values, not the draft, and omits disabled fields from native forms", () => {
    const ui = (disabled = false) => (
      <form>
        <TagInput
          name="tags"
          value={["React", "Vue"]}
          onChange={vi.fn()}
          disabled={disabled}
        />
      </form>
    );
    view = render(ui());
    type("Draft");
    const form = () => view.container.querySelector("form")!;
    expect(new FormData(form()).getAll("tags")).toEqual(["React", "Vue"]);
    view.rerender(ui(true));
    expect(new FormData(form()).getAll("tags")).toEqual([]);
  });

  it("works uncontrolled with defaultValue", () => {
    const onChange = vi.fn();
    view = render(
      <TagInput defaultValue={["a"]} onChange={onChange} aria-label="Tags" />,
    );
    act(() => input().focus());
    type("b");
    key("Enter");
    expect(onChange).toHaveBeenLastCalledWith(["a", "b"]);
    expect(view.container.querySelectorAll(".ui-tag-input-label")).toHaveLength(
      2,
    );
  });

  it("uses composition lifecycle when the confirming key lacks isComposing", () => {
    const changed = fixture();
    act(() => input().focus());
    act(() =>
      input().dispatchEvent(
        new CompositionEvent("compositionstart", { bubbles: true }),
      ),
    );
    type("测试");
    key("Enter");
    key("Escape");
    expect(changed).not.toHaveBeenCalled();
    expect(input().value).toBe("测试");
    act(() =>
      input().dispatchEvent(
        new CompositionEvent("compositionend", { bubbles: true }),
      ),
    );
    key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "测试"]);
  });

  it("inherits field label/error/disabled and read-only state and forwards the input ref", () => {
    const ref = createRef<HTMLInputElement>();
    const changed = vi.fn();
    view = render(
      <FormField label="Article tags" errorMessage="Invalid tag" disabled>
        <TagInput ref={ref} value={["React"]} onChange={changed} />
      </FormField>,
    );
    expect(ref.current).toBe(input());
    expect(input().id).toBe(view.container.querySelector("label")?.htmlFor);
    expect(input().getAttribute("aria-invalid")).toBe("true");
    expect(input().parentElement?.classList.contains("ui-input-error")).toBe(
      true,
    );
    expect(input().parentElement?.classList.contains("ui-input-disabled")).toBe(
      true,
    );
    expect(input().disabled).toBe(true);
    expect(
      view.container.firstElementChild?.querySelector(".ui-tag-input"),
    ).toHaveAttribute("data-disabled", "true");
    expect(
      Array.from(view.container.querySelectorAll("button")).every(
        (b) => b.disabled,
      ),
    ).toBe(true);
    key("Enter");
    expect(changed).not.toHaveBeenCalled();
    view.rerender(
      <FormField label="Article tags" readOnly>
        <TagInput value={["React"]} onChange={changed} />
      </FormField>,
    );
    expect(input().readOnly).toBe(true);
    expect(
      view.container.querySelector('[aria-label="Remove React"]'),
    ).toBeNull();
    expect(view.container.querySelector('[aria-label="Add tag"]')).toBeNull();
    act(() => input().focus());
    act(() => input().click());
    expect(view.container.querySelector('[role="listbox"]')).toBeNull();
    type("x");
    expect(input().value).toBe("");
  });

  it("supports invalid, size, id, placeholder and aria-describedby", () => {
    view = render(
      <TagInput
        value={[]}
        invalid
        size="small"
        id="tags"
        placeholder="Add a tag"
        aria-label="Tags"
        aria-describedby="hint"
      />,
    );
    expect(input().id).toBe("tags");
    expect(input().placeholder).toBe("Add a tag");
    expect(input()).toHaveAttribute("aria-describedby", "hint");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(input().parentElement).toHaveClass(
      "ui-input-error",
      "ui-input-size-sm",
    );
  });

  it("reopens suggestions when the still-focused input is clicked after selecting one", () => {
    const changed = fixture({ options: ["React", "Vue", "Svelte", "Solid"] });
    act(() => input().focus());
    mouseDown(option("Vue"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue"]);
    expect(options()).toHaveLength(0);
    expect(document.activeElement).toBe(input());
    act(() => input().click());
    expect(options().map((el) => el.textContent)).toEqual(["Svelte", "Solid"]);
    mouseDown(option("Solid"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "Solid"]);
    key("Escape");
    act(() => input().click());
    expect(options().map((el) => el.textContent)).toEqual(["Svelte"]);
  });

  it("allows overriding every built-in label", () => {
    fixture({
      addLabel: "Plus",
      clearLabel: "Wipe",
      removeLabel: (tag) => `Drop ${tag}`,
      emptyText: "Nothing",
      options: [],
    });
    expect(view.container.querySelector('[aria-label="Plus"]')).not.toBeNull();
    expect(view.container.querySelector('[aria-label="Wipe"]')).not.toBeNull();
    expect(
      view.container.querySelector('[aria-label="Drop React"]'),
    ).not.toBeNull();
    act(() => input().focus());
    expect(
      view.container.querySelector(".ui-autocomplete-empty"),
    ).toHaveTextContent("Nothing");
  });
});

describe("TagInput localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("translates the built-in labels", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    fixture();
    expect(
      view.container.querySelector('[aria-label="移除 React"]'),
    ).not.toBeNull();
    expect(
      view.container.querySelector('[aria-label="添加标签"]'),
    ).not.toBeNull();
    expect(
      view.container.querySelector('[aria-label="清空标签"]'),
    ).not.toBeNull();
  });
});
