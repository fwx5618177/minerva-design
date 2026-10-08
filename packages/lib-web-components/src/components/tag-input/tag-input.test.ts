import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { createDismissableLayer } from "@minerva/core";
import { MinervaTagInput } from "./tag-input";
import "../../elements/tag-input";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, shadow, wait } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const field = (el: MinervaTagInput) => $<HTMLInputElement>(el, "input.field");
const listbox = (el: MinervaTagInput) =>
  shadow(el).querySelector<HTMLElement>('[role="listbox"]');
const options = (el: MinervaTagInput) =>
  Array.from(shadow(el).querySelectorAll<HTMLElement>('[role="option"]'));
const option = (el: MinervaTagInput, label: string) =>
  options(el).find((o) => o.textContent?.trim() === label)!;
const tagLabels = (el: MinervaTagInput) =>
  Array.from(shadow(el).querySelectorAll(".values .label")).map(
    (l) => l.textContent,
  );
const button = (el: MinervaTagInput, label: string) =>
  shadow(el).querySelector<HTMLButtonElement>(`[aria-label="${label}"]`);

/** Sets the text of the input like typing would (one `input` event). */
async function type(el: MinervaTagInput, value: string) {
  field(el).value = value;
  field(el).dispatchEvent(
    new Event("input", { bubbles: true, composed: true }),
  );
  await el.updateComplete;
}
async function key(el: MinervaTagInput, value: string, composing = false) {
  const event = new KeyboardEvent("keydown", {
    key: value,
    isComposing: composing,
    bubbles: true,
    composed: true,
    cancelable: true,
  });
  field(el).dispatchEvent(event);
  await el.updateComplete;
  return event;
}
/**
 * Pastes `text` into the input like a browser: a cancelable `paste` event,
 * then the text inserted at the caret when not prevented. happy-dom:
 * user-event's paste() targets document.activeElement (the host), not the
 * focused input inside its shadow root.
 */
async function paste(el: MinervaTagInput, text: string) {
  const input = field(el);
  const clipboardData = new DataTransfer();
  clipboardData.setData("text/plain", text);
  const event = new ClipboardEvent("paste", {
    clipboardData,
    bubbles: true,
    composed: true,
    cancelable: true,
  });
  input.dispatchEvent(event);
  if (!event.defaultPrevented && !input.readOnly && !input.disabled) {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + text + input.value.slice(end);
    input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  }
  await el.updateComplete;
}
async function focusField(el: MinervaTagInput) {
  field(el).focus();
  await el.updateComplete;
}
async function blurField(el: MinervaTagInput) {
  field(el).blur();
  await el.updateComplete;
}
async function mouseDown(el: MinervaTagInput, target: Element) {
  target.dispatchEvent(
    new MouseEvent("mousedown", { bubbles: true, cancelable: true }),
  );
  await el.updateComplete;
}

/** lib-core's test fixture: tags ["React"], suggestions React / Vue / Vue. */
async function fixture(
  attrs = "",
  props: Partial<Pick<MinervaTagInput, "options" | "value">> = {},
) {
  const el = await mount<MinervaTagInput>(
    `<minerva-tag-input aria-label="Tags" ${attrs}></minerva-tag-input>`,
  );
  el.value = props.value ?? ["React"];
  el.options = props.options ?? ["React", "Vue", "Vue"];
  await el.updateComplete;
  const changed = vi.fn();
  el.addEventListener("minerva-change", (event) =>
    changed((event as CustomEvent<{ value: string[] }>).detail.value),
  );
  return { el, changed };
}

describe("<minerva-tag-input>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-tag-input")).toBe(MinervaTagInput);
    expect(document.createElement("minerva-tag-input")).toBeInstanceOf(
      MinervaTagInput,
    );
  });

  it("renders lib-core's structure, classes and combobox semantics", async () => {
    const { el } = await fixture();
    const root = $(el, ".root");
    expect(root.querySelector(".values .tag .label")?.textContent).toBe(
      "React",
    );
    const tag = $(el, ".values > .tag");
    expect(tag.classList).toContain("large");
    expect(tag.getAttribute("data-component")).toBe("tag");
    expect(field(el).closest(".entry .combobox")).not.toBeNull();
    const wrapper = field(el).parentElement!;
    expect(wrapper.getAttribute("data-component")).toBe("input");
    expect(wrapper.classList).toContain("medium");
    expect(field(el).classList).toContain("field");
    expect(field(el)).toHaveAttribute("role", "combobox");
    expect(field(el)).toHaveAttribute("aria-expanded", "false");
    expect(field(el)).toHaveAttribute("aria-autocomplete", "list");
    expect(field(el)).toHaveAttribute("autocomplete", "off");
    expect(field(el)).toHaveAttribute("aria-label", "Tags");
    expect(listbox(el)).toBeNull();

    await focusField(el);
    expect(field(el)).toHaveAttribute("aria-expanded", "true");
    const list = listbox(el)!;
    expect(list.getAttribute("popover")).toBe("manual");
    expect(list.classList).toContain("list");
    expect(list).toHaveAttribute("aria-label", "Tags");
    expect(field(el)).toHaveAttribute("aria-controls", list.id);
    await key(el, "ArrowDown");
    // the active option lives in the same shadow root as the input
    expect(field(el)).toHaveAttribute(
      "aria-activedescendant",
      options(el)[0].id,
    );
    expect(shadow(el).getElementById(options(el)[0].id)).toBe(options(el)[0]);
    expect(options(el)[0]).toHaveAttribute("aria-selected", "true");
    expect(options(el)[0]).toHaveAttribute(
      "part",
      "option option--highlighted",
    );
  });

  it("has lib-core's defaults and reflects state attributes", async () => {
    const el = await mount<MinervaTagInput>(
      `<minerva-tag-input></minerva-tag-input>`,
    );
    expect(el.value).toEqual([]);
    expect(el.size).toBe("medium");
    expect(el.separators).toEqual([",", "Enter"]);
    expect(el.noCommitOnBlur).toBe(false);
    expect(el.invalid).toBe(false);
    expect(el.readOnly).toBe(false);
    expect(el.getAttribute("size")).toBeNull();
    el.size = "small";
    el.invalid = true;
    el.readOnly = true;
    el.disabled = true;
    await el.updateComplete;
    expect(el.getAttribute("size")).toBe("small");
    expect(el.hasAttribute("invalid")).toBe(true);
    expect(el.hasAttribute("readonly")).toBe(true);
    expect(el.hasAttribute("disabled")).toBe(true);
  });

  it("reads value / options as comma-separated or JSON and separators as words or JSON", async () => {
    const el = await mount<MinervaTagInput>(
      `<minerva-tag-input value=" a, b ,," options='["x, y", "z"]' separators="; Enter"></minerva-tag-input>`,
    );
    expect(el.value).toEqual(["a", "b"]);
    expect(el.defaultValue).toEqual(["a", "b"]);
    expect(el.options).toEqual(["x, y", "z"]);
    expect(el.separators).toEqual([";", "Enter"]);
    el.setAttribute("separators", '[","]');
    el.setAttribute("value", '["c, d"]');
    await el.updateComplete;
    expect(el.separators).toEqual([","]);
    // not edited yet: the default follows the attribute
    expect(el.value).toEqual(["c, d"]);
    expect(tagLabels(el)).toEqual(["c, d"]);
  });

  it("creates trimmed tags, selects suggestions and does not duplicate selected values", async () => {
    const { el, changed } = await fixture();
    await focusField(el);
    expect(options(el)).toHaveLength(1);
    await type(el, " Custom ");
    await key(el, "Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Custom"]);
    expect(field(el).value).toBe("");
    await type(el, "React");
    await key(el, "Enter");
    expect(changed).toHaveBeenCalledTimes(1);
    await type(el, "Vu");
    await mouseDown(el, option(el, "Vue"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Custom", "Vue"]);
    expect(el.value).toEqual(["React", "Custom", "Vue"]);
  });

  it("does not commit while confirming IME composition nor submit the form on Enter", async () => {
    const { el, changed } = await fixture();
    await focusField(el);
    await type(el, "中文");
    await key(el, "Enter", true);
    expect(changed).not.toHaveBeenCalled();
    await key(el, "Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "中文"]);
    expect((await key(el, "Enter")).defaultPrevented).toBe(true);
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it("uses the composition lifecycle when the confirming key lacks isComposing", async () => {
    const { el, changed } = await fixture();
    await focusField(el);
    field(el).dispatchEvent(new CompositionEvent("compositionstart"));
    await type(el, "测试");
    await key(el, "Enter");
    await key(el, "Escape");
    expect(changed).not.toHaveBeenCalled();
    expect(field(el).value).toBe("测试");
    field(el).dispatchEvent(new CompositionEvent("compositionend"));
    await key(el, "Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "测试"]);
  });

  it("commits on blur, cancels the draft with Escape and offers labelled remove / clear actions", async () => {
    const { el, changed } = await fixture();
    const onClear = vi.fn();
    el.addEventListener("minerva-clear", onClear);
    await focusField(el);
    await type(el, "Draft");
    await blurField(el);
    expect(changed).toHaveBeenLastCalledWith(["React", "Draft"]);
    await focusField(el);
    await type(el, "Discard");
    await key(el, "Escape");
    expect(field(el).value).toBe("");
    await blurField(el);
    expect(changed).toHaveBeenCalledTimes(1);

    const remove = button(el, "Remove React")!;
    expect(remove.title).toBe("Remove React");
    remove.click();
    await el.updateComplete;
    expect(changed).toHaveBeenLastCalledWith(["Draft"]);
    expect(shadow(el).activeElement).toBe(field(el));
    button(el, "Clear tags")!.click();
    await el.updateComplete;
    expect(changed).toHaveBeenLastCalledWith([]);
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(button(el, "Clear tags")!.disabled).toBe(true);
  });

  it("does not commit on blur with no-commit-on-blur", async () => {
    const { el, changed } = await fixture("no-commit-on-blur");
    await focusField(el);
    await type(el, "Draft");
    await blurField(el);
    expect(changed).not.toHaveBeenCalled();
  });

  it("adds the draft with the add button and keeps focus in the input", async () => {
    const { el, changed } = await fixture();
    const add = () => button(el, "Add tag")!;
    expect(add().disabled).toBe(true);
    expect(add().classList).toContain("iconButton");
    expect(add().classList).toContain("square");
    await focusField(el);
    await type(el, "Svelte");
    expect(add().disabled).toBe(false);
    const down = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    add().dispatchEvent(down);
    expect(down.defaultPrevented).toBe(true);
    add().click();
    await el.updateComplete;
    expect(changed).toHaveBeenLastCalledWith(["React", "Svelte"]);
    expect(shadow(el).activeElement).toBe(field(el));
  });

  it("selects a suggestion with arrow keys even with an empty draft", async () => {
    const { el, changed } = await fixture();
    await focusField(el);
    await key(el, "ArrowDown");
    await key(el, "Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue"]);
  });

  it("cycles the highlight with ArrowUp / ArrowDown and follows the pointer", async () => {
    const { el, changed } = await fixture("", {
      options: ["Vue", "Svelte", "Solid"],
    });
    await focusField(el);
    const parts = () => options(el).map((o) => o.getAttribute("part"));
    await key(el, "ArrowUp");
    expect(options(el)[2]).toHaveAttribute("aria-selected", "true");
    expect(parts()).toEqual(["option", "option", "option option--highlighted"]);
    await key(el, "ArrowDown");
    expect(options(el)[0]).toHaveAttribute("aria-selected", "true");
    expect(parts()).toEqual(["option option--highlighted", "option", "option"]);
    option(el, "Svelte").dispatchEvent(new MouseEvent("mouseenter"));
    await el.updateComplete;
    expect(option(el, "Svelte")).toHaveAttribute("aria-selected", "true");
    await key(el, "Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Svelte"]);
  });

  it("opens the list with the arrow keys after Escape closed it", async () => {
    const { el } = await fixture();
    await focusField(el);
    await key(el, "Escape");
    expect(listbox(el)).toBeNull();
    expect(shadow(el).activeElement).toBe(field(el));
    await key(el, "ArrowDown");
    expect(listbox(el)).not.toBeNull();
  });

  it("shows the empty text when no suggestion is left", async () => {
    const { el } = await fixture("", { options: [] });
    await focusField(el);
    expect($(el, ".empty").textContent?.trim()).toBe("No matches");
    expect($(el, ".empty").getAttribute("role")).toBe("presentation");
    await key(el, "ArrowDown");
    expect(options(el)).toHaveLength(0);
  });

  it("allows explicit navigation away from a duplicate draft to another suggestion", async () => {
    const { el, changed } = await fixture("", { options: ["React Native"] });
    await focusField(el);
    await type(el, "React");
    await key(el, "ArrowDown");
    await key(el, "Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "React Native"]);
  });

  it("creates the draft independently of the create label", async () => {
    const { el, changed } = await fixture();
    el.createLabel = () => "Create new tag";
    await focusField(el);
    await type(el, "Vu");
    expect(options(el)[0].textContent?.trim()).toBe("Create new tag");
    await key(el, "Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Vu"]);
  });

  it("uses the default create label", async () => {
    const { el } = await fixture();
    await focusField(el);
    await type(el, "Svelte");
    expect(options(el)[0].textContent?.trim()).toBe('Add "Svelte"');
  });

  it("commits a navigated draft when the list is closed", async () => {
    const { el, changed } = await fixture("no-commit-on-blur", { options: [] });
    await focusField(el);
    await type(el, "Solid");
    await key(el, "ArrowDown");
    await blurField(el);
    expect(listbox(el)).toBeNull();
    await key(el, "Enter");
    expect(changed).toHaveBeenLastCalledWith(["React", "Solid"]);
  });

  it("reopens suggestions when the still-focused input is clicked after selecting one", async () => {
    const { el, changed } = await fixture("", {
      options: ["React", "Vue", "Svelte", "Solid"],
    });
    await focusField(el);
    await mouseDown(el, option(el, "Vue"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue"]);
    expect(options(el)).toHaveLength(0);
    expect(shadow(el).activeElement).toBe(field(el));
    field(el).click();
    await el.updateComplete;
    expect(options(el).map((o) => o.textContent?.trim())).toEqual([
      "Svelte",
      "Solid",
    ]);
    await mouseDown(el, option(el, "Solid"));
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "Solid"]);
    await key(el, "Escape");
    field(el).click();
    await el.updateComplete;
    expect(options(el).map((o) => o.textContent?.trim())).toEqual(["Svelte"]);
  });

  it("allows overriding every built-in label", async () => {
    const { el } = await fixture(
      'add-label="Plus" clear-label="Wipe" empty-text="Nothing"',
      { options: [] },
    );
    el.removeLabel = (tag) => `Drop ${tag}`;
    await el.updateComplete;
    expect(button(el, "Plus")).not.toBeNull();
    expect(button(el, "Wipe")).not.toBeNull();
    expect(button(el, "Drop React")).not.toBeNull();
    await focusField(el);
    expect($(el, ".empty").textContent?.trim()).toBe("Nothing");
  });

  it("supports invalid, size, placeholder, required and aria-describedby", async () => {
    const el = await mount<MinervaTagInput>(
      `<div><span id="hint">Up to five</span><minerva-tag-input invalid size="small" required placeholder="Add a tag" aria-label="Tags" aria-describedby="hint"></minerva-tag-input></div>`,
      "minerva-tag-input",
    );
    expect(field(el).placeholder).toBe("Add a tag");
    expect(field(el)).toHaveAttribute("aria-description", "Up to five");
    expect(field(el)).toHaveAttribute("aria-invalid", "true");
    expect(field(el)).toHaveAttribute("aria-required", "true");
    expect(field(el).parentElement!.classList).toContain("invalid");
    expect(field(el).parentElement!.classList).toContain("small");
  });

  it("is named by <label for>", async () => {
    const el = await mount<MinervaTagInput>(
      `<label for="tags">Topics</label><minerva-tag-input id="tags"></minerva-tag-input>`,
      "minerva-tag-input",
    );
    expect(field(el)).toHaveAttribute("aria-label", "Topics");
    el.options = ["a"];
    await focusField(el);
    expect(listbox(el)).toHaveAttribute("aria-label", "Topics");
  });

  it("disabled: no editing, every control disabled, the list never opens", async () => {
    const { el, changed } = await fixture("disabled");
    expect(field(el).disabled).toBe(true);
    expect(field(el).parentElement!.classList).toContain("disabled");
    expect($(el, ".values .tag").classList).toContain("disabled");
    expect(
      Array.from(shadow(el).querySelectorAll("button")).every(
        (b) => b.disabled,
      ),
    ).toBe(true);
    await key(el, "Backspace");
    await key(el, "ArrowDown");
    expect(changed).not.toHaveBeenCalled();
    expect(listbox(el)).toBeNull();
  });

  it("readonly: shows the tags without editing controls", async () => {
    const { el, changed } = await fixture("readonly");
    expect(field(el).readOnly).toBe(true);
    expect(button(el, "Remove React")).toBeNull();
    expect(button(el, "Add tag")).toBeNull();
    expect(button(el, "Clear tags")).toBeNull();
    await focusField(el);
    field(el).click();
    await el.updateComplete;
    expect(listbox(el)).toBeNull();
    await type(el, "x");
    expect(field(el).value).toBe("");
    await key(el, "Enter");
    expect(changed).not.toHaveBeenCalled();
  });
});

describe("<minerva-tag-input> events", () => {
  it("fires minerva-input with the draft and minerva-change with a copy of the tags", async () => {
    const { el } = await fixture();
    const onInput = vi.fn();
    const onChange = vi.fn();
    el.addEventListener("minerva-input", (e) =>
      onInput((e as CustomEvent).detail),
    );
    el.addEventListener("minerva-change", (e) => onChange(e as CustomEvent));
    await focusField(el);
    await type(el, "So");
    expect(onInput).toHaveBeenLastCalledWith({ value: "So" });
    await type(el, "Solid,Sv");
    expect(onInput).toHaveBeenLastCalledWith({ value: "Sv" });
    const event = onChange.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual({ value: ["React", "Solid"] });
    expect(event.bubbles && event.composed).toBe(true);
    expect(event.detail.value).not.toBe(el.value);
  });

  it("does not fire events when the value is set programmatically", async () => {
    const { el, changed } = await fixture();
    el.value = ["a", "b"];
    await el.updateComplete;
    expect(changed).not.toHaveBeenCalled();
    expect(tagLabels(el)).toEqual(["a", "b"]);
  });

  it("fires a cancelable minerva-open-change", async () => {
    const { el } = await fixture();
    const onOpen = vi.fn();
    el.addEventListener("minerva-open-change", (e) => {
      onOpen((e as CustomEvent).detail);
      if ((e as CustomEvent).detail.open) e.preventDefault();
    });
    await focusField(el);
    expect(onOpen).toHaveBeenLastCalledWith({ open: true });
    expect(listbox(el)).toBeNull();
    expect(field(el)).toHaveAttribute("aria-expanded", "false");
  });
});

describe("<minerva-tag-input> dismissal", () => {
  it("closes on a pointer down outside; the field itself is part of the layer", async () => {
    const { el } = await mountWithOutside();
    await focusField(el);
    await wait(5); // dismissable layers ignore pointers for one tick
    field(el).dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await el.updateComplete;
    expect(listbox(el)).not.toBeNull();
    document
      .getElementById("outside")!
      .dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    await el.updateComplete;
    expect(listbox(el)).toBeNull();
  });

  it("Escape only closes the list (topmost layer), then only clears the draft", async () => {
    const { el } = await mountWithOutside();
    const outerDismiss = vi.fn();
    // an enclosing layer (e.g. a modal) that only Escape can dismiss
    const outer = createDismissableLayer(document.getElementById("outside")!, {
      onDismiss: outerDismiss,
      onFocusOutside: () => false,
      onPointerDownOutside: () => false,
    });
    await focusField(el);
    await type(el, "Draft");
    expect(listbox(el)).not.toBeNull();
    await key(el, "Escape");
    expect(listbox(el)).toBeNull();
    expect(field(el).value).toBe("");
    expect(outerDismiss).not.toHaveBeenCalled();
    expect(shadow(el).activeElement).toBe(field(el));

    // closed list + a draft: Escape clears the draft, the outer layer stays
    el.addEventListener("minerva-open-change", (e) => {
      if ((e as CustomEvent).detail.open) e.preventDefault();
    });
    await type(el, "y");
    expect(listbox(el)).toBeNull();
    expect(field(el)).toHaveAttribute("data-minerva-escape-consumer");
    await key(el, "Escape");
    expect(field(el).value).toBe("");
    expect(outerDismiss).not.toHaveBeenCalled();
    expect(field(el)).not.toHaveAttribute("data-minerva-escape-consumer");
    // nothing left to consume: Escape reaches the outer layer
    await key(el, "Escape");
    expect(outerDismiss).toHaveBeenCalledTimes(1);
    outer.destroy();
  });

  async function mountWithOutside() {
    const el = await mount<MinervaTagInput>(
      `<div><button id="outside">x</button><minerva-tag-input aria-label="Tags"></minerva-tag-input></div>`,
      "minerva-tag-input",
    );
    el.options = ["Vue", "Svelte"];
    await el.updateComplete;
    return { el };
  }
});

// Port of lib-core's TagInput.keyboard.test.tsx (real user-event keys).
// happy-dom: user-event's Tab order ignores shadow DOM, so focus is moved
// with focus() / click() instead of Tab.
describe("<minerva-tag-input> keyboard", () => {
  async function app(attrs = "") {
    return fixture(attrs, { value: ["React", "Vue"], options: [] });
  }

  it("removes a tag with Enter / Space on its remove button and returns focus to the input", async () => {
    const user = userEvent.setup();
    const { el } = await app();
    button(el, "Remove React")!.focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(tagLabels(el)).toEqual(["Vue"]);
    expect(shadow(el).activeElement).toBe(field(el));

    button(el, "Remove Vue")!.focus();
    await user.keyboard(" ");
    await settle();
    expect(tagLabels(el)).toEqual([]);
    expect(shadow(el).activeElement).toBe(field(el));
  });

  it("adds the typed draft with Enter", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app();
    await user.click(field(el));
    await user.keyboard("  Svelte {Enter}");
    await settle();
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "Svelte"]);
    expect(field(el).value).toBe("");
    expect(shadow(el).activeElement).toBe(field(el));
  });

  it("removes the last tag with Backspace only when the draft is empty", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app();
    await user.click(field(el));
    await user.keyboard("ab{Backspace}");
    await settle();
    expect(field(el).value).toBe("a");
    expect(changed).not.toHaveBeenCalled();
    await user.keyboard("{Backspace}");
    await settle();
    expect(field(el).value).toBe("");
    expect(changed).not.toHaveBeenCalled();
    await user.keyboard("{Backspace}");
    await settle();
    expect(changed).toHaveBeenLastCalledWith(["React"]);
    await user.keyboard("{Backspace}");
    await settle();
    expect(changed).toHaveBeenLastCalledWith([]);
    expect(tagLabels(el)).toEqual([]);
    await user.keyboard("{Backspace}");
    expect(changed).toHaveBeenCalledTimes(2);
  });

  it("does not remove tags with Backspace when read-only", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app("readonly");
    await user.click(field(el));
    await user.keyboard("{Backspace}");
    await settle();
    expect(changed).not.toHaveBeenCalled();
    expect(tagLabels(el)).toEqual(["React", "Vue"]);
  });

  it("is not focusable when disabled", async () => {
    const { el } = await app("disabled");
    el.focus();
    expect(shadow(el).activeElement).toBeNull();
  });

  it("commits the text before a typed comma by default and keeps Enter", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app();
    await user.click(field(el));
    await user.keyboard(" Svelte ,Sol");
    await settle();
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "Svelte"]);
    expect(field(el).value).toBe("Sol");
    await user.keyboard("id{Enter}");
    await settle();
    expect(changed).toHaveBeenLastCalledWith([
      "React",
      "Vue",
      "Svelte",
      "Solid",
    ]);
    // Empty pieces and duplicates are ignored.
    await user.keyboard(", ,Vue,");
    await settle();
    expect(changed).toHaveBeenCalledTimes(2);
    expect(field(el).value).toBe("");
  });

  it("splits on custom separators only", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app('separators=";"');
    await user.click(field(el));
    await user.keyboard("a,b");
    await settle();
    expect(changed).not.toHaveBeenCalled();
    expect(field(el).value).toBe("a,b");
    await user.keyboard(";");
    await settle();
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "a,b"]);
    expect(field(el).value).toBe("");
  });

  it("does not commit on Enter when Enter is not a separator", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app('separators=","');
    await user.click(field(el));
    await user.keyboard("Svelte{Enter}");
    await settle();
    expect(changed).not.toHaveBeenCalled();
    expect(field(el).value).toBe("Svelte");
    await user.keyboard(",");
    await settle();
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "Svelte"]);
  });

  it("splits pasted text into several tags in one change", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app('separators=", ;"');
    await user.click(field(el));
    await paste(el, "a, b; c");
    await settle();
    expect(changed).toHaveBeenCalledTimes(1);
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "a", "b", "c"]);
    expect(field(el).value).toBe("");
    expect(tagLabels(el)).toEqual(["React", "Vue", "a", "b", "c"]);
  });

  it("splits pasted text on line breaks when Enter is a separator", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app();
    await user.click(field(el));
    await paste(el, "a\nb\r\nc");
    await settle();
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "a", "b", "c"]);
  });

  it("dedupes pasted tags against existing tags and each other", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app();
    await user.click(field(el));
    await paste(el, " React , x,, x ,Vue,y ");
    await settle();
    expect(changed).toHaveBeenCalledTimes(1);
    expect(changed).toHaveBeenLastCalledWith(["React", "Vue", "x", "y"]);
    await paste(el, "React,Vue");
    await settle();
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it("lets a paste without separators through as plain text", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app();
    await user.click(field(el));
    await paste(el, "a; b");
    await settle();
    expect(changed).not.toHaveBeenCalled();
    expect(field(el).value).toBe("a; b");
  });

  it("does not add pasted or typed tags when read-only", async () => {
    const user = userEvent.setup();
    const { el, changed } = await app("readonly");
    await user.click(field(el));
    await paste(el, "a,b");
    await user.keyboard("c,");
    await settle();
    expect(changed).not.toHaveBeenCalled();
    expect(tagLabels(el)).toEqual(["React", "Vue"]);
  });
});

describe("<minerva-tag-input> forms", () => {
  async function form(attrs = "") {
    document.body.innerHTML = `<form><minerva-tag-input name="tags" value="React, Vue" aria-label="Tags" ${attrs}></minerva-tag-input></form>`;
    await settle();
    const formEl = document.querySelector("form")!;
    const el = formEl.querySelector<MinervaTagInput>("minerva-tag-input")!;
    return { form: formEl, el };
  }

  it("submits one entry per tag under name, not the draft", async () => {
    const { form: f, el } = await form();
    await type(el, "Draft");
    expect(new FormData(f).getAll("tags")).toEqual(["React", "Vue"]);
    el.value = ["a", "b", "c"];
    await el.updateComplete;
    expect(new FormData(f).getAll("tags")).toEqual(["a", "b", "c"]);
    el.value = [];
    await el.updateComplete;
    expect(new FormData(f).getAll("tags")).toEqual([]);
  });

  it("is not submitted when disabled (itself or by a fieldset)", async () => {
    const { form: f, el } = await form();
    el.disabled = true;
    await el.updateComplete;
    expect(new FormData(f).getAll("tags")).toEqual([]);
    el.disabled = false;
    await settle(); // the polyfill reports the disabled change asynchronously
    expect(new FormData(f).getAll("tags")).toEqual(["React", "Vue"]);
    el.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await el.updateComplete;
    expect(field(el).disabled).toBe(true);
    expect(new FormData(f).getAll("tags")).toEqual([]);
  });

  it("required: valueMissing with the localized message when there is no tag", async () => {
    document.documentElement.lang = "fr";
    const { form: f, el } = await form("required");
    expect(el.checkValidity()).toBe(true);
    el.value = [];
    await el.updateComplete;
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).toBe("Veuillez renseigner ce champ.");
    expect(f.checkValidity()).toBe(false);
  });

  it("form.reset() restores the value attribute and clears the draft", async () => {
    const { form: f, el } = await form();
    await focusField(el);
    await key(el, "Backspace");
    await type(el, "Draft");
    expect(el.value).toEqual(["React"]);
    f.reset();
    await el.updateComplete;
    expect(el.value).toEqual(["React", "Vue"]);
    expect(field(el).value).toBe("");
    expect(new FormData(f).getAll("tags")).toEqual(["React", "Vue"]);
  });

  it("restores the browser-saved state", async () => {
    const { el } = await form();
    const saved = new FormData();
    saved.append("tags", "x");
    saved.append("tags", "y");
    el.formStateRestoreCallback(saved);
    await el.updateComplete;
    expect(el.value).toEqual(["x", "y"]);
  });
});

describe("<minerva-tag-input> locale", () => {
  it("translates the built-in labels (lang)", async () => {
    document.documentElement.lang = "zh";
    const { el } = await fixture();
    expect(button(el, "移除 React")).not.toBeNull();
    expect(button(el, "添加标签")).not.toBeNull();
    expect(button(el, "清空标签")).not.toBeNull();
  });

  it("follows <minerva-config locale> and language changes", async () => {
    await import("../../elements/config");
    const el = await mount<MinervaTagInput>(
      `<minerva-config locale="fr"><minerva-tag-input aria-label="Tags"></minerva-tag-input></minerva-config>`,
      "minerva-tag-input",
    );
    el.value = ["a"];
    await el.updateComplete;
    expect(button(el, "Retirer a")).not.toBeNull();
    el.parentElement!.setAttribute("locale", "en");
    await settle();
    expect(button(el, "Remove a")).not.toBeNull();
  });
});

describe("<minerva-tag-input> dev warnings", () => {
  it("warns when value contains duplicate tags", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaTagInput>(
      `<minerva-tag-input></minerva-tag-input>`,
    );
    el.value = ["a", "b", "a"];
    await el.updateComplete;
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('value contains the tag "a" more than once'),
    );
  });

  it("warns when a JSON list attribute cannot be parsed", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaTagInput>(
      `<minerva-tag-input options='["a",'></minerva-tag-input>`,
    );
    expect(el.options).toEqual([]);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("options attribute is not a JSON array"),
    );
  });
});
