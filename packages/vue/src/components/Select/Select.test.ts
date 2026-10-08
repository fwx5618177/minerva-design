import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { computed, defineComponent, h, nextTick, provide, ref } from "vue";
import { renderToString } from "vue/server-renderer";
import { createSSRApp } from "vue";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from ".";
import { Modal } from "../Modal";
import {
  FORM_CONTROL_KEY,
  type FormControlContext,
} from "../../internal/form-control";

const settle = async () => {
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
};

const langItems = () => [
  h(SelectItem, { value: "zh" }, () => "Chinese"),
  h(SelectItem, { value: "en" }, () => "English"),
  h(SelectSeparator, { "data-testid": "sep" }),
  h(SelectGroup, { "data-testid": "group" }, () => [
    h(SelectLabel, null, () => "Experimental"),
    h(SelectItem, { value: "ja", disabled: true }, () => "Japanese"),
  ]),
];

const Langs = (props: Record<string, unknown> = {}) =>
  h(
    Select,
    { "aria-label": "Language", placeholder: "Pick one", ...props },
    langItems,
  );

const renderLangs = (props: Record<string, unknown> = {}) =>
  render(defineComponent({ setup: () => () => Langs(props) }), {
    attachTo: document.body,
  } as never);

const trigger = () => screen.getByRole("combobox", { name: "Language" });
const listbox = () => screen.getByRole("listbox");
const option = (name: string) => screen.getByRole("option", { name });
const setup = () => userEvent.setup({ pointerEventsCheck: 0 });
const nativeSelect = () => document.querySelector<HTMLSelectElement>("select")!;

const formControl = (
  overrides: Partial<Record<keyof FormControlContext, unknown>> = {},
): FormControlContext => {
  const values: Record<string, unknown> = {
    id: "field",
    labelId: "field-label",
    helperId: "field-helper",
    errorId: "field-error",
    invalid: false,
    required: false,
    disabled: false,
    readOnly: false,
    ...overrides,
  };
  return {
    id: computed(() => values.id as string),
    labelId: computed(() => values.labelId as string),
    helperId: computed(() => values.helperId as string),
    errorId: computed(() => values.errorId as string),
    invalid: computed(() => values.invalid as boolean),
    required: computed(() => values.required as boolean),
    disabled: computed(() => values.disabled as boolean),
    readOnly: computed(() => values.readOnly as boolean),
    helperTexts: ref((values.helperTexts as number) ?? 0),
    errorMessages: ref((values.errorMessages as number) ?? 0),
  };
};

const inFormControl = (
  ctx: FormControlContext,
  props: Record<string, unknown> = {},
) =>
  render(
    defineComponent({
      setup() {
        provide(FORM_CONTROL_KEY, ctx);
        return () => Langs(props);
      },
    }),
  );

describe("Select", () => {
  it("renders a combobox trigger with placeholder and default classes", () => {
    renderLangs();
    const el = trigger();
    expect(el.tagName).toBe("BUTTON");
    expect(el).toHaveAttribute("type", "button");
    expect(el).toHaveAttribute("aria-haspopup", "listbox");
    expect(el).toHaveAttribute("aria-expanded", "false");
    expect(el).toHaveAttribute("aria-autocomplete", "none");
    expect(el).not.toHaveAttribute("aria-controls");
    expect(el).toHaveAttribute("data-state", "closed");
    expect(el).toHaveAttribute("data-component", "select");
    expect(el).toHaveAttribute("data-minerva", "select");
    expect(el).toHaveAttribute("data-part", "root");
    expect(el).toHaveAttribute("data-size", "medium");
    expect(el).toHaveTextContent("Pick one");
    expect(el.className).toMatch(/trigger/);
    expect(el.className).toMatch(/medium/);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("renders the placeholder slot", () => {
    render(Select, {
      props: { ariaLabel: "Language" },
      slots: {
        placeholder: () => h("i", "Choose"),
        default: langItems,
      },
    });
    expect(trigger().querySelector("i")).toHaveTextContent("Choose");
  });

  it("opens on click, lists options, and selects one (uncontrolled)", async () => {
    const user = setup();
    const { emitted } = render(Select, {
      props: { ariaLabel: "Language", placeholder: "Pick one" },
      slots: { default: langItems },
    });
    await user.click(trigger());
    await settle();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(trigger()).toHaveAttribute("aria-controls", listbox().id);
    expect(listbox()).toHaveAttribute("aria-label", "Language");
    expect(screen.getAllByRole("option")).toHaveLength(3);
    await user.click(option("English"));
    await settle();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger()).toHaveTextContent("English");
    expect(trigger()).toHaveFocus();
    expect(emitted("update:modelValue")).toEqual([["en"]]);
    expect(emitted("change")).toEqual([["en"]]);
    expect(emitted("openChange")).toEqual([[true], [false]]);
    expect(emitted("update:open")).toEqual([[true], [false]]);
  });

  it("shows the selected value via defaultValue and marks the item selected", async () => {
    const user = setup();
    renderLangs({ defaultValue: "en" });
    expect(trigger()).toHaveTextContent("English");
    expect(trigger()).not.toHaveAttribute("data-placeholder");
    await user.click(trigger());
    await settle();
    expect(option("English")).toHaveAttribute("aria-selected", "true");
    expect(option("Chinese")).toHaveAttribute("aria-selected", "false");
    expect(
      option("English").querySelector('[data-part="indicator"]'),
    ).not.toBeNull();
  });

  it("is controllable via v-model", async () => {
    const user = setup();
    const value = ref("zh");
    render(
      defineComponent({
        setup: () => () =>
          Langs({
            modelValue: value.value,
            "onUpdate:modelValue": (v: string) => (value.value = v),
          }),
      }),
    );
    expect(trigger()).toHaveTextContent("Chinese");
    await user.click(trigger());
    await settle();
    await user.click(option("English"));
    await settle();
    expect(value.value).toBe("en");
    expect(trigger()).toHaveTextContent("English");
    value.value = "zh";
    await settle();
    expect(trigger()).toHaveTextContent("Chinese");
  });

  it("supports a controlled open state", async () => {
    const user = setup();
    const open = ref(true);
    const onOpenChange = vi.fn();
    render(
      defineComponent({
        setup: () => () => Langs({ open: open.value, onOpenChange }),
      }),
    );
    await settle();
    expect(listbox()).toBeInTheDocument();
    await user.click(trigger());
    await settle();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(listbox()).toBeInTheDocument();
    open.value = false;
    await settle();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("does not select disabled items", async () => {
    const user = setup();
    const onChange = vi.fn();
    renderLangs({ onChange });
    await user.click(trigger());
    await settle();
    await user.click(option("Japanese"));
    expect(onChange).not.toHaveBeenCalled();
    expect(option("Japanese")).toHaveAttribute("aria-disabled", "true");
    expect(listbox()).toBeInTheDocument();
  });

  it("closes on Escape without selecting and returns focus", async () => {
    const user = setup();
    const onChange = vi.fn();
    renderLangs({ onChange });
    await user.click(trigger());
    await settle();
    await user.keyboard("{ArrowDown}{Escape}");
    await settle();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
    expect(trigger()).toHaveFocus();
  });

  it("disabled prevents opening", async () => {
    const user = setup();
    renderLangs({ disabled: true });
    expect(trigger()).toBeDisabled();
    expect(trigger()).toHaveAttribute("data-disabled", "");
    await user.click(trigger());
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("inherits id, invalid, required and disabled from a FormControl", () => {
    inFormControl(
      formControl({ invalid: true, disabled: true, required: true }),
    );
    const el = screen.getByRole("combobox");
    expect(el).toHaveAttribute("id", "field");
    expect(el).toHaveAttribute("aria-invalid", "true");
    expect(el).toHaveAttribute("aria-required", "true");
    expect(el).toHaveAttribute("data-invalid", "");
    expect(el).toHaveAttribute("data-required", "");
    expect(el).toBeDisabled();
    expect(el.className).toMatch(/invalid/);
  });

  it("lets an explicit disabled=false override the FormControl", () => {
    inFormControl(formControl({ disabled: true }), { disabled: false });
    expect(screen.getByRole("combobox")).not.toBeDisabled();
  });

  it("describes the trigger with the helper text and names the listbox with the label", async () => {
    const user = setup();
    render(
      defineComponent({
        setup() {
          provide(FORM_CONTROL_KEY, formControl({ helperTexts: 1 }));
          return () => h(Select, { "aria-describedby": "extra" }, langItems);
        },
      }),
    );
    const el = screen.getByRole("combobox");
    expect(el).toHaveAttribute("aria-describedby", "field-helper extra");
    await user.click(el);
    await settle();
    expect(listbox()).toHaveAttribute("aria-labelledby", "field-label");
  });
});

describe("Select keyboard", () => {
  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["ArrowDown", "{ArrowDown}"],
    ["ArrowUp", "{ArrowUp}"],
  ])("opens with %s and focuses the selected option", async (_, keys) => {
    const user = setup();
    renderLangs({ defaultValue: "en" });
    trigger().focus();
    await user.keyboard(keys);
    await settle();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(option("English")).toHaveFocus();
    expect(option("English")).toHaveAttribute("data-highlighted");
    expect(listbox()).toHaveAttribute("data-state", "open");
    expect(listbox()).toHaveAttribute("data-side", "bottom");
    expect(listbox()).toHaveAttribute("data-placement", "bottom-start");
  });

  it("moves the public item hooks (data-highlighted) with the arrows", async () => {
    const user = setup();
    renderLangs({ defaultValue: "zh" });
    trigger().focus();
    await user.keyboard("{ArrowDown}");
    await settle();
    const zh = option("Chinese");
    const en = option("English");
    expect(zh).toHaveAttribute("data-minerva", "option");
    expect(zh).toHaveAttribute("data-selected", "");
    expect(zh).toHaveAttribute("data-highlighted", "");
    expect(option("Japanese")).toHaveAttribute("data-disabled", "");
    await user.keyboard("{ArrowDown}");
    await settle();
    expect(zh).not.toHaveAttribute("data-highlighted");
    expect(en).toHaveAttribute("data-highlighted", "");
    expect(en).toHaveFocus();
  });

  it("highlights the first enabled option on open without a value, the last one with ArrowUp", async () => {
    const user = setup();
    renderLangs();
    trigger().focus();
    await user.keyboard("{ArrowDown}");
    await settle();
    expect(option("Chinese")).toHaveFocus();
    await user.keyboard("{Escape}");
    await settle();
    expect(trigger()).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    await settle();
    expect(option("English")).toHaveFocus();
    await user.keyboard("{Escape}");
    await settle();
    await user.keyboard("{Home}");
    await settle();
    expect(option("Chinese")).toHaveFocus();
    await user.keyboard("{Escape}");
    await settle();
    await user.keyboard("{End}");
    await settle();
    expect(option("English")).toHaveFocus();
  });

  it("moves without wrapping, skips disabled options, supports Home / End / PageUp / PageDown", async () => {
    const user = setup();
    render(Select, {
      props: { ariaLabel: "Language" },
      slots: {
        default: () => [
          h(SelectItem, { value: "a" }, () => "Alpha"),
          h(SelectItem, { value: "b", disabled: "" } as never, () => "Beta"),
          h(SelectItem, { value: "c" }, () => "Gamma"),
          h(SelectItem, { value: "d" }, () => "Delta"),
        ],
      },
    });
    await user.click(trigger());
    await settle();
    const step = async (keys: string, name: string) => {
      await user.keyboard(keys);
      await settle();
      expect(option(name)).toHaveFocus();
    };
    await step("{ArrowUp}", "Alpha");
    await step("{ArrowDown}", "Gamma");
    await step("{ArrowDown}{ArrowDown}", "Delta");
    await step("{Home}", "Alpha");
    await step("{End}", "Delta");
    await step("{PageUp}", "Alpha");
    await step("{PageDown}", "Delta");
    // modifiers are ignored
    await step("{Control>}{ArrowUp}{/Control}", "Delta");
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "selects with %s, closes and returns focus to the trigger",
    async (_, key) => {
      const user = setup();
      const onChange = vi.fn();
      const onOpenChange = vi.fn();
      renderLangs({ onChange, onOpenChange });
      await user.click(trigger());
      await settle();
      await user.keyboard("{ArrowDown}");
      await settle();
      await user.keyboard(key);
      await settle();
      expect(onChange).toHaveBeenCalledExactlyOnceWith("en");
      expect(screen.queryByRole("listbox")).toBeNull();
      expect(trigger()).toHaveFocus();
      expect(trigger()).toHaveTextContent("English");
      expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    },
  );

  it("Enter on a disabled highlight is ignored, Alt+ArrowUp selects and closes", async () => {
    const user = setup();
    const onChange = vi.fn();
    renderLangs({ onChange });
    await user.click(trigger());
    await settle();
    await user.hover(option("Japanese"));
    expect(option("Japanese")).not.toHaveAttribute("data-highlighted");
    // A disabled highlighted option (highlighted programmatically) is ignored
    await user.keyboard("{ArrowDown}{Alt>}{ArrowUp}{/Alt}");
    await settle();
    expect(onChange).toHaveBeenCalledWith("en");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("Tab closes the listbox without selecting", async () => {
    const user = setup();
    const onChange = vi.fn();
    renderLangs({ onChange });
    await user.click(trigger());
    await settle();
    expect(option("Chinese")).toHaveFocus();
    await user.tab();
    await settle();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("typeahead on the closed trigger changes the selection without opening", async () => {
    const user = setup();
    const onChange = vi.fn();
    renderLangs({ onChange });
    trigger().focus();
    await user.keyboard("e");
    await settle();
    expect(onChange).toHaveBeenLastCalledWith("en");
    expect(trigger()).toHaveTextContent("English");
    expect(screen.queryByRole("listbox")).toBeNull();
    await user.keyboard("j");
    expect(onChange).toHaveBeenCalledTimes(1);
    await new Promise((r) => setTimeout(r, 600));
    await user.keyboard("c");
    await settle();
    expect(onChange).toHaveBeenLastCalledWith("zh");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("typeahead in the open listbox moves the highlight (a space continues a search)", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(Select, {
      props: { ariaLabel: "Language", onChange },
      slots: {
        default: () => [
          h(SelectItem, { value: "nz" }, () => "New Zealand"),
          h(SelectItem, { value: "ny", textValue: "New York" }, () =>
            h("b", "NY"),
          ),
          h(SelectItem, { value: "no" }, () => "Norway"),
        ],
      },
    });
    await user.click(trigger());
    await settle();
    await user.keyboard("nor");
    await settle();
    expect(option("Norway")).toHaveFocus();
    await new Promise((r) => setTimeout(r, 600));
    await user.keyboard("new y");
    await settle();
    expect(option("NY")).toHaveFocus();
    await user.keyboard("q");
    expect(onChange).not.toHaveBeenCalled();
    expect(listbox()).toBeInTheDocument();
  });

  it("scrolls the highlighted option into view on open and on keyboard moves", async () => {
    const user = setup();
    const spy = vi
      .spyOn(HTMLElement.prototype, "scrollIntoView")
      .mockImplementation(() => {});
    renderLangs({ defaultValue: "en" });
    await user.click(trigger());
    await waitFor(() => expect(spy.mock.contexts).toContain(option("English")));
    expect(spy).toHaveBeenCalledWith({ block: "nearest" });
    await user.keyboard("{ArrowUp}");
    await waitFor(() =>
      expect(spy.mock.contexts[spy.mock.contexts.length - 1]).toBe(
        option("Chinese"),
      ),
    );
  });
});

describe("Select pointer", () => {
  it("highlights (and focuses) options on hover", async () => {
    const user = setup();
    renderLangs({ defaultValue: "zh" });
    await user.click(trigger());
    await settle();
    await user.hover(option("English"));
    await settle();
    expect(option("English")).toHaveAttribute("data-highlighted");
    expect(option("English")).toHaveFocus();
    expect(option("Chinese")).not.toHaveAttribute("data-highlighted");
  });

  it("closes on an outside pointer down and on a second click on the trigger", async () => {
    const user = setup();
    render(
      defineComponent({
        setup: () => () => [h("p", "Outside"), Langs()],
      }),
    );
    await user.click(trigger());
    await settle();
    await user.click(screen.getByText("Outside"));
    await settle();
    expect(screen.queryByRole("listbox")).toBeNull();
    await user.click(trigger());
    await settle();
    expect(listbox()).toBeInTheDocument();
    await user.click(trigger());
    await settle();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("a click on the already selected value closes without change", async () => {
    const user = setup();
    const onChange = vi.fn();
    renderLangs({ defaultValue: "zh", onChange });
    await user.click(trigger());
    await settle();
    await user.click(option("Chinese"));
    await settle();
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger()).toHaveFocus();
  });
});

describe("Select accessibility", () => {
  it("labels groups with their SelectLabel and hides separators", async () => {
    const user = setup();
    renderLangs();
    await user.click(trigger());
    await settle();
    const group = screen.getByTestId("group");
    expect(group).toHaveAttribute("role", "group");
    expect(group).toHaveAttribute("data-minerva", "option-group");
    const label = group.querySelector('[data-minerva="select-label"]')!;
    expect(group).toHaveAttribute("aria-labelledby", label.id);
    expect(label).toHaveTextContent("Experimental");
    expect(screen.getByTestId("sep")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("sep")).toHaveAttribute(
      "data-minerva",
      "select-separator",
    );
  });

  it("leaves a group without SelectLabel unlabelled", async () => {
    const user = setup();
    render(Select, {
      props: { ariaLabel: "Language" },
      slots: {
        default: () =>
          h(SelectGroup, null, () => h(SelectItem, { value: "a" }, () => "A")),
      },
    });
    await user.click(trigger());
    await settle();
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-labelledby");
  });

  it("shows the placeholder (data-placeholder) only while the value is empty", () => {
    renderLangs();
    expect(trigger()).toHaveAttribute("data-placeholder", "");
  });

  it("keeps a rejected controlled value", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(
      defineComponent({
        setup: () => () =>
          h("form", null, Langs({ name: "lang", modelValue: "zh", onChange })),
      }),
    );
    await user.click(trigger());
    await settle();
    await user.click(option("English"));
    await settle();
    expect(onChange).toHaveBeenCalledWith("en");
    expect(trigger()).toHaveTextContent("Chinese");
    expect(nativeSelect().value).toBe("zh");
  });

  it("keeps an unknown controlled value in the native select", () => {
    renderLangs({ name: "lang", modelValue: "xx" });
    expect(nativeSelect().value).toBe("xx");
    expect(trigger()).toHaveTextContent("");
  });

  it("shows the label of options rendered by wrapper components once registered", async () => {
    const user = setup();
    const Option = defineComponent({
      props: { value: { type: String, required: true } },
      setup:
        (props, { slots }) =>
        () =>
          h(SelectItem, { value: props.value }, slots),
    });
    render(Select, {
      props: { ariaLabel: "Language", defaultValue: "b" },
      slots: {
        default: () => [
          h(Option, { value: "a" }, () => "Alpha"),
          h(Option, { value: "b" }, () => "Beta"),
        ],
      },
    });
    await user.click(trigger());
    await settle();
    expect(option("Beta")).toHaveFocus();
    await user.keyboard("{Escape}");
    await settle();
    expect(trigger()).toHaveTextContent("Beta");
  });

  it("throws when a SelectItem is used outside of a Select", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() =>
      render(SelectItem as never, { props: { value: "a" } } as never),
    ).toThrow("<SelectItem> must be used inside <Select>");
  });
});

describe("Select forms", () => {
  it("renders a hidden native select listing every value", () => {
    renderLangs({ name: "lang", required: true, disabled: true });
    const native = nativeSelect();
    expect(native).toHaveAttribute("aria-hidden", "true");
    expect(native.tabIndex).toBe(-1);
    expect(native).toBeRequired();
    expect(native).toBeDisabled();
    expect(Array.from(native.options, (o) => o.value)).toEqual([
      "",
      "zh",
      "en",
      "ja",
    ]);
  });

  it("submits the value picked in the listbox through FormData", async () => {
    const user = setup();
    renderLangs({ name: "lang" });
    await user.click(trigger());
    await settle();
    await user.click(option("English"));
    await settle();
    expect(nativeSelect().value).toBe("en");
  });

  it("forwards native changes (autofill) to the value", async () => {
    const onChange = vi.fn();
    renderLangs({ name: "lang", onChange });
    const native = nativeSelect();
    native.value = "zh";
    native.dispatchEvent(new Event("change"));
    await settle();
    expect(onChange).toHaveBeenCalledWith("zh");
    expect(trigger()).toHaveTextContent("Chinese");
  });

  it("restores defaultValue on form reset without change", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(
      defineComponent({
        setup: () => () =>
          h("form", null, [
            Langs({ name: "lang", defaultValue: "zh", onChange }),
            h("button", { type: "reset" }, "Reset"),
          ]),
      }),
    );
    const form = document.querySelector("form")!;
    await user.click(trigger());
    await settle();
    await user.click(option("English"));
    await settle();
    expect(new FormData(form).get("lang")).toBe("en");
    onChange.mockClear();
    form.reset();
    await settle();
    expect(trigger()).toHaveTextContent("Chinese");
    expect(new FormData(form).get("lang")).toBe("zh");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("a form reset does not touch a controlled value", async () => {
    render(
      defineComponent({
        setup: () => () =>
          h("form", null, Langs({ name: "lang", modelValue: "en" })),
      }),
    );
    document.querySelector("form")!.reset();
    await settle();
    expect(trigger()).toHaveTextContent("English");
  });

  it("forwards focus from the native select to the trigger", () => {
    renderLangs({ name: "lang" });
    nativeSelect().focus();
    expect(trigger()).toHaveFocus();
  });
});

describe("Select layering", () => {
  it("inside a Modal, Escape closes only the listbox", async () => {
    const user = setup();
    render(Modal, {
      props: { defaultOpen: true, title: "Settings" },
      slots: { default: () => Langs() },
    });
    await settle();
    await user.click(trigger());
    await settle();
    expect(listbox()).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await settle();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Select SSR", () => {
  it("server-renders the selected label (nested in a group), the native select and no listbox", async () => {
    const app = createSSRApp({
      render: () =>
        h(
          Select,
          { "aria-label": "Language", defaultValue: "ja", name: "lang" },
          langItems,
        ),
    });
    const html = await renderToString(app);
    expect(html).toContain("Japanese");
    expect(html).toContain('role="combobox"');
    expect(html).toContain("<select");
    expect(html).not.toContain('role="listbox"');
  });
});

describe("Select native attributes", () => {
  it("forwards class, style, data-* and aria-labelledby to the trigger and names the listbox", async () => {
    const user = setup();
    render(
      defineComponent({
        setup: () => () => [
          h("span", { id: "lbl" }, "Language"),
          h(
            Select,
            {
              "aria-labelledby": "lbl",
              class: "custom",
              style: { width: "200px" },
              "data-testid": "sel",
              contentClassName: "popup",
              "data-minerva": "override",
            },
            langItems,
          ),
        ],
      }),
    );
    const el = screen.getByTestId("sel");
    expect(el).toHaveClass("custom");
    expect(el.style.width).toBe("200px");
    expect(el).toHaveAttribute("aria-labelledby", "lbl");
    expect(el).toHaveAttribute("data-minerva", "select");
    await user.click(el);
    await settle();
    expect(listbox()).toHaveAttribute("aria-labelledby", "lbl");
    expect(listbox()).toHaveClass("popup");
  });
});
