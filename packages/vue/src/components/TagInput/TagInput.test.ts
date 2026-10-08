import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { defineComponent, h, nextTick, ref } from "vue";
import { TagInput, type TagInputProps } from ".";
import { FormField } from "../FormControl";
import { setLanguage } from "../../config/i18n";

let container: HTMLElement;
const input = () => container.querySelector<HTMLInputElement>("input")!;
const options = () =>
  Array.from(container.querySelectorAll<HTMLElement>('[role="option"]'));
const option = (label: string) =>
  options().find((el) => el.textContent?.trim() === label)!;
const flush = () => nextTick();

async function type(value: string) {
  input().value = value;
  input().dispatchEvent(new Event("input", { bubbles: true }));
  await flush();
}
async function key(value: string, composing = false) {
  const event = new KeyboardEvent("keydown", {
    key: value,
    isComposing: composing,
    bubbles: true,
    cancelable: true,
  });
  input().dispatchEvent(event);
  await flush();
  return event;
}
async function focus() {
  input().focus();
  await flush();
}
async function blur() {
  input().blur();
  await flush();
}
async function mouseDown(el: Element) {
  el.dispatchEvent(
    new MouseEvent("mousedown", { bubbles: true, cancelable: true }),
  );
  await flush();
}
async function click(el: HTMLElement) {
  el.click();
  await flush();
}

type Props = Partial<TagInputProps> & Record<string, unknown>;

/** A v-model host starting with ["React"]; returns the change spy. */
function fixture(props: Props = {}) {
  const changed = vi.fn();
  const value = ref<readonly string[]>(["React"]);
  const view = render(
    defineComponent(
      () => () =>
        h(TagInput, {
          modelValue: value.value,
          "onUpdate:modelValue": (next: string[]) => (value.value = next),
          onChange: changed,
          options: ["React", "Vue", "Vue"],
          "aria-label": "Tags",
          ...props,
        }),
    ),
  );
  container = view.container as HTMLElement;
  return changed;
}

describe("TagInput", () => {
  it("renders the tag list, the entry field and combobox semantics", async () => {
    fixture({ class: "consumer" });
    const root = container.firstElementChild!;
    expect(root).toHaveClass("root", "consumer");
    expect(root).toHaveAttribute("data-minerva", "tag-input");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(root).toHaveAttribute("data-size", "medium");
    expect(root.querySelector(".values")).toHaveAttribute("data-part", "tags");
    expect(root.querySelector(".values .label")).toHaveTextContent("React");
    expect(input().closest(".entry .combobox")).not.toBeNull();
    expect(input().parentElement).toHaveAttribute("data-component", "input");
    expect(input().parentElement).toHaveClass("medium");
    expect(input()).toHaveAttribute("role", "combobox");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveAttribute("aria-autocomplete", "list");
    expect(input()).toHaveAttribute("autocomplete", "off");
    await focus();
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(root).toHaveAttribute("data-state", "open");
    const listbox = container.querySelector('[role="listbox"]')!;
    expect(listbox).toHaveAttribute("data-part", "list");
    expect(listbox).toHaveAttribute("aria-label", "Tags");
    expect(input()).toHaveAttribute("aria-controls", listbox.id);
    await key("ArrowDown");
    expect(input()).toHaveAttribute("aria-activedescendant", options()[0].id);
    expect(options()[0]).toHaveAttribute("aria-selected", "true");
  });

  it("creates trimmed tags, selects suggestions and does not duplicate selected values", async () => {
    const changed = fixture();
    await focus();
    expect(options()).toHaveLength(1);
    await type(" Custom ");
    await key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Custom"]);
    expect(input().value).toBe("");
    await type("React");
    await key("Enter");
    expect(changed).toHaveBeenCalledTimes(1);
    await type("Vu");
    await mouseDown(option("Vue"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Custom", "Vue"]);
  });

  it("does not submit tags while confirming IME composition or submit the enclosing form on empty Enter", async () => {
    const changed = fixture();
    await focus();
    await type("中文");
    await key("Enter", true);
    expect(changed).not.toHaveBeenCalled();
    await key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "中文"]);
    expect((await key("Enter")).defaultPrevented).toBe(true);
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it("ignores keys with the IME keyCode 229", async () => {
    const changed = fixture();
    await focus();
    await type("x");
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      keyCode: 229,
      bubbles: true,
      cancelable: true,
    } as KeyboardEventInit);
    input().dispatchEvent(event);
    await flush();
    expect(changed).not.toHaveBeenCalled();
  });

  it("commits on blur, cancels the draft with Escape and offers labeled remove and clear actions", async () => {
    const changed = fixture();
    await focus();
    await type("Draft");
    await blur();
    expect(changed).toHaveBeenLastCalledWith(["React", "Draft"]);
    await focus();
    await type("Discard");
    await key("Escape");
    await blur();
    expect(changed).toHaveBeenCalledTimes(1);
    await click(
      container.querySelector<HTMLButtonElement>(
        '[aria-label="Remove React"]',
      )!,
    );
    expect(changed).toHaveBeenLastCalledWith(["Draft"]);
    expect(document.activeElement).toBe(input());
    await click(
      container.querySelector<HTMLButtonElement>('[aria-label="Clear tags"]')!,
    );
    expect(changed).toHaveBeenLastCalledWith([]);
    expect(container.querySelector(".values")).toBeNull();
  });

  it("does not commit on blur when commitOnBlur is false", async () => {
    const changed = fixture({ commitOnBlur: false });
    await focus();
    await type("Draft");
    await blur();
    expect(changed).not.toHaveBeenCalled();
  });

  it("adds the draft with the add button and keeps focus in the input", async () => {
    const changed = fixture();
    const add = () =>
      container.querySelector<HTMLButtonElement>('[aria-label="Add tag"]')!;
    expect(add().disabled).toBe(true);
    await focus();
    await type("Svelte");
    expect(add().disabled).toBe(false);
    const down = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    add().dispatchEvent(down);
    expect(down.defaultPrevented).toBe(true);
    await click(add());
    expect(changed).toHaveBeenLastCalledWith(["React", "Svelte"]);
    expect(document.activeElement).toBe(input());
  });

  it("selects a suggestion with arrow keys even with an empty draft", async () => {
    const changed = fixture();
    await focus();
    await key("ArrowDown");
    await key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue"]);
  });

  it("cycles the highlight with ArrowUp / ArrowDown and follows the pointer", async () => {
    const changed = fixture({ options: ["Vue", "Svelte", "Solid"] });
    await focus();
    await key("ArrowUp");
    expect(options()[2]).toHaveAttribute("aria-selected", "true");
    expect(options()[2]).toHaveAttribute("data-highlighted", "");
    expect(options()[0]).not.toHaveAttribute("data-highlighted");
    await key("ArrowDown");
    expect(options()[0]).toHaveAttribute("aria-selected", "true");
    expect(options()[0]).toHaveAttribute("data-minerva", "tag-input");
    expect(options()[0]).toHaveAttribute("data-part", "option");
    expect(options()[0]).toHaveAttribute("data-highlighted", "");
    expect(options()[2]).not.toHaveAttribute("data-highlighted");
    option("Svelte").dispatchEvent(new MouseEvent("mouseenter"));
    await flush();
    expect(option("Svelte")).toHaveAttribute("aria-selected", "true");
    await key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Svelte"]);
  });

  it("opens the list with the arrow keys after Escape closed it", async () => {
    fixture();
    await focus();
    await key("Escape");
    expect(container.querySelector('[role="listbox"]')).toBeNull();
    // Escape on a closed list is not prevented
    expect((await key("Escape")).defaultPrevented).toBe(false);
    await key("ArrowDown");
    expect(container.querySelector('[role="listbox"]')).not.toBeNull();
  });

  it("shows the empty text when no suggestion is left", async () => {
    fixture({ options: [] });
    await focus();
    const empty = container.querySelector(".empty")!;
    expect(empty).toHaveTextContent("No matches");
    expect(empty).toHaveAttribute("data-part", "empty");
    await key("ArrowDown");
    expect(options()).toHaveLength(0);
  });

  it("allows explicit navigation away from a duplicate draft to a different suggestion", async () => {
    const changed = fixture({ options: ["React Native"] });
    await focus();
    await type("React");
    await key("ArrowDown");
    await key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "React Native"]);
  });

  it("creates the draft independently of the localized create label", async () => {
    const changed = fixture({ createLabel: () => "Create new tag" });
    await focus();
    await type("Vu");
    expect(options()[0]).toHaveTextContent("Create new tag");
    await key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Vu"]);
  });

  it("uses the default create label", async () => {
    fixture();
    await focus();
    await type("Svelte");
    expect(options()[0]).toHaveTextContent('Add "Svelte"');
  });

  it("commits a navigated draft when the list is closed", async () => {
    const changed = fixture({ options: [], commitOnBlur: false });
    await focus();
    await type("Solid");
    await key("ArrowDown");
    await blur();
    expect(container.querySelector('[role="listbox"]')).toBeNull();
    await key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Solid"]);
  });

  it("submits selected values, not the draft, and omits disabled fields from native forms", async () => {
    const disabled = ref(false);
    const view = render(
      defineComponent(
        () => () =>
          h("form", [
            h(TagInput, {
              name: "tags",
              modelValue: ["React", "Vue"],
              disabled: disabled.value,
            }),
          ]),
      ),
    );
    container = view.container as HTMLElement;
    await type("Draft");
    const form = () => container.querySelector("form")!;
    expect(new FormData(form()).getAll("tags")).toEqual(["React", "Vue"]);
    disabled.value = true;
    await flush();
    expect(new FormData(form()).getAll("tags")).toEqual([]);
  });

  it("works uncontrolled with defaultValue", async () => {
    const view = render(TagInput, {
      props: { defaultValue: ["a"], "aria-label": "Tags" } as Props,
    });
    container = view.container as HTMLElement;
    await focus();
    await type("b");
    await key("Enter");
    expect(view.emitted("change")).toEqual([[["a", "b"]]]);
    expect(view.emitted("update:modelValue")).toEqual([[["a", "b"]]]);
    expect(container.querySelectorAll(".values .label")).toHaveLength(2);
  });

  it("works uncontrolled without any value", async () => {
    const view = render(TagInput, { props: { "aria-label": "Tags" } as Props });
    container = view.container as HTMLElement;
    expect(container.querySelector(".values")).toBeNull();
    await focus();
    await type("x");
    await key("Enter");
    expect(container.querySelectorAll(".values .label")).toHaveLength(1);
  });

  it("uses composition lifecycle when the confirming key lacks isComposing", async () => {
    const changed = fixture();
    await focus();
    input().dispatchEvent(
      new CompositionEvent("compositionstart", { bubbles: true }),
    );
    await type("测试");
    await key("Enter");
    await key("Escape");
    expect(changed).not.toHaveBeenCalled();
    expect(input().value).toBe("测试");
    input().dispatchEvent(
      new CompositionEvent("compositionend", { bubbles: true }),
    );
    await key("Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "测试"]);
  });

  it("inherits field label / error / disabled and read-only state and exposes the input", async () => {
    const changed = vi.fn();
    const readOnly = ref(false);
    const exposed = ref<{ input: HTMLInputElement; focus: () => void }>();
    const view = render(
      defineComponent(
        () => () =>
          readOnly.value
            ? h(FormField, { label: "Article tags", readOnly: true }, () =>
                h(TagInput, { modelValue: ["React"], onChange: changed }),
              )
            : h(
                FormField,
                {
                  label: "Article tags",
                  errorMessage: "Invalid tag",
                  disabled: true,
                  required: true,
                },
                () =>
                  h(TagInput, {
                    ref: exposed,
                    modelValue: ["React"],
                    onChange: changed,
                  }),
              ),
      ),
    );
    container = view.container as HTMLElement;
    await flush();
    expect(exposed.value!.input).toBe(input());
    expect(input().id).toBe(container.querySelector("label")?.htmlFor);
    expect(input().getAttribute("aria-invalid")).toBe("true");
    expect(input().parentElement).toHaveClass("invalid", "disabled");
    expect(input().disabled).toBe(true);
    const root = container.querySelector('[data-minerva="tag-input"]')!;
    expect(root).toHaveAttribute("data-disabled", "");
    expect(root).toHaveAttribute("data-invalid", "");
    expect(root).toHaveAttribute("data-required", "");
    expect(
      Array.from(container.querySelectorAll("button")).every((b) => b.disabled),
    ).toBe(true);
    await key("Enter");
    expect(changed).not.toHaveBeenCalled();
    readOnly.value = true;
    await flush();
    expect(input().readOnly).toBe(true);
    expect(
      container.querySelector('[data-minerva="tag-input"]'),
    ).toHaveAttribute("data-readonly", "");
    expect(container.querySelector('[aria-label="Remove React"]')).toBeNull();
    expect(container.querySelector('[aria-label="Add tag"]')).toBeNull();
    await focus();
    await click(input());
    expect(container.querySelector('[role="listbox"]')).toBeNull();
    await type("x");
    expect(input().value).toBe("");
  });

  it("supports invalid, size, id, placeholder and aria-describedby", () => {
    const view = render(TagInput, {
      props: {
        modelValue: [],
        invalid: true,
        size: "small",
        id: "tags",
        placeholder: "Add a tag",
        "aria-label": "Tags",
        "aria-describedby": "hint",
      } as Props,
    });
    container = view.container as HTMLElement;
    expect(input().id).toBe("tags");
    expect(input().placeholder).toBe("Add a tag");
    expect(input()).toHaveAttribute("aria-describedby", "hint");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(input().parentElement).toHaveClass("invalid", "small");
    expect(container.firstElementChild).toHaveAttribute("data-size", "small");
  });

  it("reopens suggestions when the still-focused input is clicked after selecting one", async () => {
    const changed = fixture({ options: ["React", "Vue", "Svelte", "Solid"] });
    await focus();
    await mouseDown(option("Vue"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue"]);
    expect(options()).toHaveLength(0);
    expect(document.activeElement).toBe(input());
    await click(input());
    expect(options().map((el) => el.textContent?.trim())).toEqual([
      "Svelte",
      "Solid",
    ]);
    await mouseDown(option("Solid"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "Solid"]);
    await key("Escape");
    await click(input());
    expect(options().map((el) => el.textContent?.trim())).toEqual(["Svelte"]);
  });

  it("allows overriding every built-in label", async () => {
    fixture({
      addLabel: "Plus",
      clearLabel: "Wipe",
      removeLabel: (tag: string) => `Drop ${tag}`,
      emptyText: "Nothing",
      options: [],
    });
    expect(container.querySelector('[aria-label="Plus"]')).not.toBeNull();
    expect(container.querySelector('[aria-label="Wipe"]')).not.toBeNull();
    expect(container.querySelector('[aria-label="Drop React"]')).not.toBeNull();
    await focus();
    expect(container.querySelector(".empty")).toHaveTextContent("Nothing");
  });

  it("does not remove tags while disabled", async () => {
    const view = render(TagInput, {
      props: { defaultValue: ["a"], disabled: true } as Props,
    });
    container = view.container as HTMLElement;
    const remove = container.querySelector<HTMLButtonElement>(
      '[aria-label="Remove a"]',
    )!;
    // the Tag's close button is disabled; force the close event anyway
    remove.disabled = false;
    await click(remove);
    expect(view.emitted("change")).toBeUndefined();
  });
});

describe("TagInput root and labelling props", () => {
  it("forwards style and data-* attributes to the root", () => {
    fixture({
      style: { maxWidth: "320px" },
      "data-testid": "tags",
      "data-x": 1,
    });
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.maxWidth).toBe("320px");
    expect(root).toHaveAttribute("data-testid", "tags");
    expect(root).toHaveAttribute("data-x", "1");
    expect(input()).not.toHaveAttribute("data-testid");
  });

  it("labels the input and the suggestion list with aria-labelledby", async () => {
    const view = render(
      defineComponent(() => () => [
        h("span", { id: "ext-label" }, "Topics"),
        h(FormField, { label: "Article tags" }, () =>
          h(TagInput, { "aria-labelledby": "ext-label", options: ["Vue"] }),
        ),
      ]),
    );
    container = view.container as HTMLElement;
    expect(input()).toHaveAttribute("aria-labelledby", "ext-label");
    expect(screen.getByRole("combobox", { name: "Topics" })).toBe(input());
    await focus();
    expect(container.querySelector('[role="listbox"]')).toHaveAttribute(
      "aria-labelledby",
      "ext-label",
    );
  });
});

describe("TagInput localization", () => {
  afterEach(() => setLanguage("en"));

  it("translates the built-in labels", () => {
    setLanguage("zh");
    fixture();
    expect(container.querySelector('[aria-label="移除 React"]')).not.toBeNull();
    expect(container.querySelector('[aria-label="添加标签"]')).not.toBeNull();
    expect(container.querySelector('[aria-label="清空标签"]')).not.toBeNull();
  });
});
