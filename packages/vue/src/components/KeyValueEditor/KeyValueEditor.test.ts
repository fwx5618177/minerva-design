import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { computed, defineComponent, h, nextTick, ref, shallowRef } from "vue";
import { setLanguage } from "../../config/i18n";
import { FORM_CONTROL_KEY } from "../../internal/form-control";
import {
  KeyValueEditor,
  type KeyValueEditorProps,
  type KeyValueEntry,
  type KeyValueEntryErrors,
} from ".";

const initial: KeyValueEntry[] = [
  { id: "first", key: "duplicate", value: "one" },
  { id: "second", key: "duplicate", value: "two" },
];

const inputs = () => Array.from(document.querySelectorAll("textarea"));
const button = (label: string) =>
  Array.from(document.querySelectorAll("button")).find(
    (el) => (el.getAttribute("aria-label") || el.textContent?.trim()) === label,
  )!;
const type = async (input: HTMLTextAreaElement, value: string) => {
  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  await nextTick();
};
const click = async (el: HTMLElement) => {
  el.click();
  await flushPromises();
};

/** A parent bound with v-model */
function fixture(props: Partial<KeyValueEditorProps> = {}, start = initial) {
  const changed = vi.fn();
  const entries = shallowRef<KeyValueEntry[]>(start);
  const App = defineComponent({
    setup: () => () =>
      h(KeyValueEditor, {
        modelValue: entries.value,
        "onUpdate:modelValue": (next: KeyValueEntry[]) => {
          entries.value = next;
        },
        onChange: changed,
        ...props,
      }),
  });
  const wrapper = mount(App, { attachTo: document.body });
  return { changed, entries, wrapper };
}

describe("KeyValueEditor", () => {
  it("renders rows, controls, hooks and non-resizable editor textareas", () => {
    const wrapper = mount(KeyValueEditor, {
      attachTo: document.body,
      props: { modelValue: initial },
      attrs: { class: "consumer", "data-owner": "x", "data-part": "nope" },
    });
    const root = wrapper.element as HTMLElement;
    expect(root.classList).toContain("root");
    expect(root.classList).toContain("consumer");
    expect(root.getAttribute("data-owner")).toBe("x");
    expect(root.getAttribute("data-minerva")).toBe("key-value-editor");
    expect(root.getAttribute("data-part")).toBe("root");
    expect(root.hasAttribute("data-disabled")).toBe(false);
    expect(root.querySelectorAll(".row")).toHaveLength(2);
    expect(root.querySelectorAll('[data-part="row"]')).toHaveLength(2);
    expect(root.querySelectorAll(".key")).toHaveLength(2);
    expect(root.querySelector(".add")).not.toBeNull();
    expect(root.querySelectorAll(".remove")).toHaveLength(2);
    const fields = inputs();
    expect(fields).toHaveLength(4);
    expect(fields.every((field) => field.style.resize === "none")).toBe(true);
    expect(fields.map((field) => field.getAttribute("rows"))).toEqual([
      "1",
      "2",
      "1",
      "2",
    ]);
  });

  it("edits by stable row id, preserving duplicate keys, whitespace and untouched entries", async () => {
    const { changed, wrapper } = fixture();
    await type(inputs()[2], "  renamed  ");
    const next = changed.mock.lastCall![0];
    expect(next).toEqual([
      initial[0],
      { id: "second", key: "  renamed  ", value: "two" },
    ]);
    expect(next).not.toBe(initial);
    expect(next[0]).toBe(initial[0]);
    expect(initial[1]).toEqual({
      id: "second",
      key: "duplicate",
      value: "two",
    });
    await type(inputs()[3], "");
    expect(changed.mock.lastCall![0][1]).toEqual({
      id: "second",
      key: "  renamed  ",
      value: "",
    });
    const inner = wrapper.findComponent(KeyValueEditor);
    expect(inner.emitted("update:modelValue")).toHaveLength(2);
    expect(inner.emitted("change")).toHaveLength(2);
  });

  it("renders the supplied entries until the parent accepts a change", async () => {
    const wrapper = mount(KeyValueEditor, {
      attachTo: document.body,
      props: { modelValue: initial },
    });
    await type(inputs()[0], "proposed");
    const changes = wrapper.emitted("change")!;
    expect((changes.at(-1)![0] as KeyValueEntry[])[0].key).toBe("proposed");
    expect(inputs()[0].value).toBe("duplicate");
    await click(button("Add entry"));
    expect(inputs()).toHaveLength(4);
    expect(wrapper.emitted("change")!.at(-1)![0]).toHaveLength(3);
    expect(wrapper.emitted("update:modelValue")).toHaveLength(2);
  });

  it("works uncontrolled with defaultValue", async () => {
    const wrapper = mount(KeyValueEditor, {
      attachTo: document.body,
      props: { defaultValue: initial },
    });
    await type(inputs()[1], "changed");
    expect(inputs()[1].value).toBe("changed");
    await click(button("Add entry"));
    expect(inputs()).toHaveLength(6);
    expect(wrapper.emitted("change")).toHaveLength(2);
    expect(wrapper.emitted("update:modelValue")).toHaveLength(2);
  });

  it("starts empty without rows", () => {
    mount(KeyValueEditor, { attachTo: document.body });
    expect(inputs()).toHaveLength(0);
    expect(button("Add entry")).toBeDefined();
  });

  it("preserves multiline translations and legacy keys when editing around newlines", async () => {
    const { changed } = fixture({}, [
      { id: "translation", key: "legacy\nkey", value: "Hello\nworld" },
    ]);
    expect(inputs().map((el) => el.value)).toEqual([
      "legacy\nkey",
      "Hello\nworld",
    ]);
    await type(inputs()[1], "Hello!\nnew world");
    expect(changed.mock.lastCall![0]).toEqual([
      { id: "translation", key: "legacy\nkey", value: "Hello!\nnew world" },
    ]);
    await type(inputs()[0], "legacy\nkey.updated");
    expect(changed.mock.lastCall![0]).toEqual([
      {
        id: "translation",
        key: "legacy\nkey.updated",
        value: "Hello!\nnew world",
      },
    ]);
    expect(inputs().map((el) => el.value)).toEqual([
      "legacy\nkey.updated",
      "Hello!\nnew world",
    ]);
  });

  it("adds blank rows with unique ids and removes only the requested duplicate-key row", async () => {
    const { changed } = fixture();
    await click(button("Add entry"));
    await click(button("Add entry"));
    const added = changed.mock.lastCall![0] as KeyValueEntry[];
    expect(added).toHaveLength(4);
    expect(new Set(added.map((entry) => entry.id)).size).toBe(4);
    expect(added.slice(2)).toEqual([
      { id: expect.any(String), key: "", value: "" },
      { id: expect.any(String), key: "", value: "" },
    ]);
    await click(button("Remove entry 1"));
    expect(changed.mock.lastCall![0]).toEqual(added.slice(1));
    expect(inputs()[1].value).toBe("two");
    expect(
      Array.from(document.querySelectorAll("button")).every(
        (el) => el.type === "button",
      ),
    ).toBe(true);
  });

  it("skips generated ids that are already used by entries", async () => {
    const wrapper = mount(KeyValueEditor, {
      attachTo: document.body,
      props: { modelValue: [] },
    });
    await click(button("Add entry"));
    const firstId = (
      wrapper.emitted("change")!.at(-1)![0] as KeyValueEntry[]
    )[0].id;
    const nextId = firstId.replace(/-0$/, "-1");
    await wrapper.setProps({
      modelValue: [{ id: nextId, key: "", value: "" }],
    });
    await click(button("Add entry"));
    const ids = (wrapper.emitted("change")!.at(-1)![0] as KeyValueEntry[]).map(
      (entry) => entry.id,
    );
    expect(new Set(ids).size).toBe(2);
  });

  it("supports removing the last row and adding into an empty editor", async () => {
    const { changed } = fixture({}, []);
    expect(inputs()).toHaveLength(0);
    await click(button("Add entry"));
    expect(inputs()).toHaveLength(2);
    await click(button("Remove entry 1"));
    expect(changed.mock.lastCall![0]).toEqual([]);
    expect(inputs()).toHaveLength(0);
  });

  it("disables every input and mutation control", async () => {
    const { changed } = fixture({ disabled: true });
    const root = document.querySelector('[data-minerva="key-value-editor"]')!;
    expect(root.hasAttribute("data-disabled")).toBe(true);
    expect(inputs().every((el) => el.disabled)).toBe(true);
    for (const control of document.querySelectorAll("button")) {
      expect(control.disabled).toBe(true);
      await click(control);
    }
    await type(inputs()[0], "blocked");
    expect(changed).not.toHaveBeenCalled();
  });

  it("ignores events reaching it while disabled", async () => {
    const wrapper = mount(KeyValueEditor, {
      attachTo: document.body,
      props: { modelValue: initial, disabled: true },
    });
    // Bypass the native disabled buttons / fields
    const vm = wrapper.findAllComponents({ name: "Textarea" })[0];
    vm.vm.$emit("update:modelValue", "x");
    wrapper.findAllComponents({ name: "IconButton" })[0].vm.$emit("click");
    wrapper.findComponent({ name: "Button" }).vm.$emit("click");
    await nextTick();
    expect(wrapper.emitted("change")).toBeUndefined();
  });

  it("labels each field and associates errors by row id across reordering", async () => {
    const errors: Record<string, KeyValueEntryErrors> = {
      second: { key: "Key conflict", value: "Value required" },
    };
    const wrapper = mount(KeyValueEditor, {
      attachTo: document.body,
      props: {
        modelValue: initial,
        keyLabel: "Header",
        valueLabel: "Content",
        addLabel: "Add header",
        removeLabel: "Delete header",
        errors,
      },
    });
    await nextTick();
    const field = inputs()[2];
    const described = field.getAttribute("aria-describedby")!.split(" ");
    expect(field.getAttribute("aria-invalid")).toBe("true");
    expect(
      described.some(
        (id) => document.getElementById(id)?.textContent === "Key conflict",
      ),
    ).toBe(true);
    expect(document.querySelectorAll('[role="alert"]')).toHaveLength(2);
    expect(inputs()[3].getAttribute("aria-invalid")).toBe("true");
    expect(inputs()[0].getAttribute("aria-invalid")).not.toBe("true");
    expect(
      inputs().map(
        (input) =>
          Array.from(document.querySelectorAll("label")).find(
            (label) => label.htmlFor === input.id,
          )?.textContent,
      ),
    ).toEqual(["Header 1", "Content 1", "Header 2", "Content 2"]);
    expect(document.querySelector("label .srOnly")?.textContent).toBe(" 1");
    expect(button("Add header")).toBeDefined();
    expect(button("Delete header 2")).toBeDefined();
    const stableField = inputs()[2];
    stableField.focus();
    await wrapper.setProps({ modelValue: [initial[1], initial[0]] });
    expect(inputs()[0]).toBe(stableField);
    expect(document.activeElement).toBe(stableField);
    expect(inputs()[0].getAttribute("aria-invalid")).toBe("true");
    expect(inputs()[2].getAttribute("aria-invalid")).not.toBe("true");
    // public item hook: the row with an error is invalid
    const rows = document.querySelectorAll('[data-part="row"]');
    expect(rows[0].hasAttribute("data-invalid")).toBe(true);
    expect(rows[1].hasAttribute("data-invalid")).toBe(false);
  });

  it("marks a row invalid for a value error only", () => {
    mount(KeyValueEditor, {
      attachTo: document.body,
      props: { modelValue: initial, errors: { first: { value: "Required" } } },
    });
    const rows = document.querySelectorAll('[data-part="row"]');
    expect(rows[0].hasAttribute("data-invalid")).toBe(true);
    expect(inputs()[0].getAttribute("aria-invalid")).not.toBe("true");
    expect(inputs()[1].getAttribute("aria-invalid")).toBe("true");
  });

  it("keeps field ids distinct across multiple editors", () => {
    mount(
      defineComponent({
        setup: () => () => [
          h(KeyValueEditor, { modelValue: initial }),
          h(KeyValueEditor, { modelValue: initial }),
        ],
      }),
      { attachTo: document.body },
    );
    expect(new Set(inputs().map((el) => el.id)).size).toBe(8);
    expect(inputs().every((el) => !!el.id)).toBe(true);
  });

  it("wires its own fields, not an enclosing FormControl", () => {
    const context = {
      id: computed(() => "outer"),
      labelId: computed(() => "outer-label"),
      helperId: computed(() => "outer-helper"),
      errorId: computed(() => "outer-error"),
      invalid: computed(() => true),
      required: computed(() => false),
      disabled: computed(() => false),
      readOnly: computed(() => false),
      helperTexts: ref(0),
      errorMessages: ref(1),
    };
    mount(KeyValueEditor, {
      attachTo: document.body,
      props: { modelValue: initial },
      global: { provide: { [FORM_CONTROL_KEY as symbol]: context } },
    });
    expect(inputs().every((el) => el.id !== "outer")).toBe(true);
    expect(
      inputs().every((el) => el.getAttribute("aria-invalid") !== "true"),
    ).toBe(true);
  });
});

describe("KeyValueEditor localization", () => {
  afterEach(() => setLanguage("en"));

  it("translates the built-in labels", async () => {
    setLanguage("zh");
    mount(KeyValueEditor, {
      attachTo: document.body,
      props: { modelValue: initial.slice(0, 1) },
    });
    await nextTick();
    expect(button("删除条目 1")).toBeDefined();
    expect(document.querySelector("label")?.textContent).toBe("键 1");
    expect(document.querySelector(".add")?.textContent?.trim()).toBe(
      "添加条目",
    );
  });
});
