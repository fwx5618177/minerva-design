import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { setLanguage } from "../../config/i18n";
import { FormField } from "../FormControl";
import { JsonField } from ".";

const input = () => document.querySelector("textarea")!;
const button = () => document.querySelector("button")!;
const focus = () => fireEvent.focus(input());
const blur = () => fireEvent.blur(input());
const click = async () => {
  button().click();
  await nextTick();
};
const type = async (value: string) => {
  input().value = value;
  await fireEvent.input(input());
};

/** Controlled field: the parent ignores updates unless `accept` */
const controlled = (props: Record<string, unknown>) =>
  mount(JsonField, { attachTo: document.body, props: props as never });

describe("JsonField", () => {
  it("uses a keyboard-reachable format button and preserves the controlled value", async () => {
    const wrapper = controlled({ modelValue: '{"title":"Draft"}' });
    expect(button()).toHaveAttribute("aria-label", "Format JSON");
    expect(button().tabIndex).toBe(0);
    expect(button().type).toBe("button");
    expect(button()).toHaveAttribute("data-minerva", "icon-button");
    await click();
    expect(wrapper.emitted("change")).toEqual([['{\n  "title": "Draft"\n}']]);
    expect(wrapper.emitted("update:modelValue")).toEqual([
      ['{\n  "title": "Draft"\n}'],
    ]);
    // controlled: the value only changes when the parent accepts it
    expect(input().value).toBe('{"title":"Draft"}');
  });

  it("works uncontrolled with defaultValue, typing and formatting", async () => {
    const onChange = vi.fn();
    render(JsonField, { props: { defaultValue: "[1,2]", onChange } as never });
    await click();
    expect(input().value).toBe("[\n  1,\n  2\n]");
    await type("[]");
    expect(input().value).toBe("[]");
    expect(onChange).toHaveBeenLastCalledWith("[]");
  });

  it("renders the root, textarea, hooks and an invalid status", () => {
    const { container } = render(JsonField, {
      props: { modelValue: "{" },
      attrs: { class: "consumer" },
    });
    const root = container.firstElementChild!;
    expect(root).toHaveClass("root", "consumer");
    expect(root).toHaveAttribute("data-minerva", "json-field");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-invalid", "");
    expect(input()).toHaveClass("textarea", "outline", "medium");
    expect(input()).not.toHaveClass("consumer");
    expect(container.querySelector('[data-part="toolbar"]')).toHaveClass(
      "toolbar",
    );
    const status = screen.getByRole("status");
    expect(status).toHaveClass("status", "statusInvalid");
    expect(status).toHaveAttribute("data-part", "status");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("forwards native textarea attributes, listeners and exposes the textarea", async () => {
    const events: string[] = [];
    const wrapper = mount(JsonField, {
      attachTo: document.body,
      props: {
        modelValue: "{}",
        id: "json",
        rows: 12,
        required: true,
        readOnly: true,
      },
      attrs: {
        name: "dictionary",
        form: "settings",
        maxlength: 1000,
        "aria-describedby": "help",
        "data-owner": "fixture",
        onFocus: () => events.push("focus"),
        onBlur: () => events.push("blur"),
      },
    });
    expect(wrapper.vm.textarea).toBe(input());
    expect(input().name).toBe("dictionary");
    expect(input().getAttribute("form")).toBe("settings");
    expect(input().id).toBe("json");
    expect(input().getAttribute("rows")).toBe("12");
    expect(input().required).toBe(true);
    expect(input().readOnly).toBe(true);
    expect(input().maxLength).toBe(1000);
    expect(input().dataset.owner).toBe("fixture");
    expect(input().getAttribute("aria-describedby")).toContain("help");
    expect(input().getAttribute("spellcheck")).toBe("false");
    await focus();
    await blur();
    expect(events).toEqual(["focus", "blur"]);
  });

  it("defaults to 8 rows and lets spellcheck be enabled", () => {
    render(JsonField, {
      props: { modelValue: "" },
      attrs: { spellcheck: true },
    });
    expect(input().getAttribute("rows")).toBe("8");
    expect(input().getAttribute("spellcheck")).toBe("true");
  });

  it.each(["disabled", "readOnly"] as const)(
    "blocks formatting and edits and preserves values when %s",
    async (state) => {
      const wrapper = controlled({ modelValue: '{"a":1}', [state]: true });
      expect(input()[state]).toBe(true);
      expect(button().disabled).toBe(true);
      await click();
      await type("x");
      expect(wrapper.emitted("change")).toBeUndefined();
      expect(wrapper.emitted("update:modelValue")).toBeUndefined();
      // the format action itself is guarded too
      (
        wrapper.findComponent({ name: "IconButton" }).vm as never as {
          $emit: (e: string, ev: unknown) => void;
        }
      ).$emit("click", new MouseEvent("click"));
      expect(wrapper.emitted("change")).toBeUndefined();
    },
  );

  it.each(["disabled", "readOnly"] as const)(
    "inherits %s from FormField for textarea and formatting",
    async (state) => {
      const { container } = render(
        defineComponent(
          () => () =>
            h(
              FormField,
              { label: "Dictionary", [state]: true, required: true },
              () => h(JsonField, { modelValue: '{"a":1}' }),
            ),
        ),
      );
      await nextTick();
      expect(input()[state]).toBe(true);
      expect(input().required).toBe(true);
      expect(document.querySelector("label")?.htmlFor).toBe(input().id);
      expect(button().disabled).toBe(true);
      const root = container.querySelector('[data-minerva="json-field"]');
      expect(root).toHaveAttribute("data-required", "");
      expect(root).toHaveAttribute(
        state === "disabled" ? "data-disabled" : "data-readonly",
        "",
      );
    },
  );

  it("marks the root invalid from an invalid FormField", () => {
    const { container } = render(
      defineComponent(
        () => () =>
          h(FormField, { label: "Dictionary", invalid: true }, () =>
            h(JsonField, { modelValue: "{}" }),
          ),
      ),
    );
    expect(
      container.querySelector('[data-minerva="json-field"]'),
    ).toHaveAttribute("data-invalid", "");
    expect(input()).toHaveAttribute("aria-invalid", "true");
  });

  it("revalidates external values and associates full syntax errors with the textarea", async () => {
    const value = ref("{}");
    const { container } = render(
      defineComponent(
        () => () =>
          h(FormField, { label: "Dictionary", helperText: "Help" }, () =>
            h(JsonField, {
              modelValue: value.value,
              "aria-describedby": "external-help",
            }),
          ),
      ),
    );
    expect(container.textContent).toContain("Valid JSON");
    value.value = "{";
    await nextTick();
    expect(container.textContent).toContain("Invalid JSON");
    expect(input().getAttribute("aria-invalid")).toBe("true");
    const status = screen.getByRole("status");
    expect(status.id).not.toBe("");
    expect(input().getAttribute("aria-describedby")?.split(" ")).toContain(
      status.id,
    );
    expect(input().getAttribute("aria-describedby")).toContain("external-help");
    value.value = '{"reloaded":true}';
    await nextTick();
    expect(container.textContent).not.toContain("Invalid JSON");
    expect(input().getAttribute("aria-invalid")).not.toBe("true");
  });

  it("does not show stale validation while editing and checks the latest value on blur", async () => {
    const wrapper = controlled({ modelValue: "{}" });
    await focus();
    await wrapper.setProps({ modelValue: "{" });
    expect(wrapper.text()).not.toContain("Valid JSON");
    expect(wrapper.text()).not.toContain("Invalid JSON");
    await blur();
    expect(wrapper.text()).toContain("Invalid JSON");
  });

  it.each(['{"a":1,}', '{/* comment */"a":1}', "{", "[1,]"])(
    "rejects non-JSON syntax without changing %s",
    async (value) => {
      const wrapper = controlled({ modelValue: value });
      await click();
      expect(wrapper.emitted("change")).toBeUndefined();
      expect(input().value).toBe(value);
      expect(input().getAttribute("aria-invalid")).toBe("true");
    },
  );

  it("formats whitespace without changing numeric tokens, escapes, duplicate keys or property order", async () => {
    const value =
      '{"n":9007199254740993,"huge":1e400,"s":"\\u0061","x":1,"x":2,"10":true,"2":false}';
    const wrapper = controlled({ modelValue: value, indent: 4 });
    await click();
    const formatted = wrapper.emitted("change")![0][0] as string;
    expect(formatted).toContain('\n    "n": 9007199254740993');
    expect(formatted).toContain('"huge": 1e400');
    expect(formatted).toContain('"s": "\\u0061"');
    expect(formatted.match(/"x"/g)).toHaveLength(2);
    expect(formatted.indexOf('"10"')).toBeLessThan(formatted.indexOf('"2"'));
  });

  it("does not emit a change when formatting is already applied", async () => {
    const wrapper = controlled({ modelValue: '{\n  "a": 1\n}' });
    await click();
    expect(wrapper.emitted("change")).toBeUndefined();
  });

  it("retains compact-mode compatibility without rewriting token values", async () => {
    const wrapper = controlled({
      modelValue:
        '  { "n": 9007199254740993, "s": "a b", "escape": "\\u0061" }  ',
      indent: 0,
    });
    await click();
    expect(wrapper.emitted("change")![0][0]).toBe(
      '{"n":9007199254740993,"s":"a b","escape":"\\u0061"}',
    );
  });

  it("treats a non-numeric indent as compact and clamps it to 10 spaces", async () => {
    let wrapper = controlled({ modelValue: "[ 1 ]", indent: Number.NaN });
    await click();
    expect(wrapper.emitted("change")![0][0]).toBe("[1]");
    wrapper.unmount();
    wrapper = controlled({ modelValue: "[1]", indent: 40 });
    await click();
    expect(wrapper.emitted("change")![0][0]).toBe(`[\n${" ".repeat(10)}1\n]`);
  });

  it("keeps empty fields neutral and formatting disabled", () => {
    render(JsonField, { props: { modelValue: "   " } });
    expect(button().disabled).toBe(true);
    expect(screen.getByRole("status").textContent ?? "").toBe("");
    expect(input()).not.toHaveAttribute("aria-describedby");
  });

  it("can hide formatting controls while retaining associated syntax errors", () => {
    const { container } = render(JsonField, {
      props: { modelValue: "{", hideToolbar: true },
    });
    expect(container.querySelector("button")).toBeNull();
    expect(container.textContent).toContain("Invalid JSON");
    expect(input().getAttribute("aria-invalid")).toBe("true");
  });

  it("allows localized format and validation labels", async () => {
    const wrapper = controlled({
      modelValue: "{}",
      formatLabel: "Formatieren",
      validLabel: "Gültiges JSON",
      invalidLabel: "Ungültiges JSON",
    });
    expect(button().getAttribute("aria-label")).toBe("Formatieren");
    expect(wrapper.text()).toContain("Gültiges JSON");
    await wrapper.setProps({ modelValue: "{" });
    expect(wrapper.text()).toContain("Ungültiges JSON:");
  });

  it("reflects explicit invalid state without losing a business error", () => {
    const { container } = render(JsonField, {
      props: { modelValue: "{}", invalid: true },
    });
    expect(input().getAttribute("aria-invalid")).toBe("true");
    expect(input()).toHaveClass("invalid");
    expect(container.firstElementChild).toHaveAttribute("data-invalid", "");
  });

  it('passes a child aria-invalid through and normalizes "false"', async () => {
    const wrapper = mount(JsonField, {
      attachTo: document.body,
      props: { modelValue: "{}" },
      attrs: { "aria-invalid": "grammar" },
    });
    expect(input().getAttribute("aria-invalid")).toBe("grammar");
    await wrapper.setProps({ "aria-invalid": "false" } as never);
    expect(input().getAttribute("aria-invalid")).toBe("false");
  });

  it("emits typed text when editable (v-model)", async () => {
    const text = ref("");
    render(
      defineComponent(
        () => () =>
          h(JsonField, {
            modelValue: text.value,
            "onUpdate:modelValue": (v: string) => (text.value = v),
          }),
      ),
    );
    await type("[true]");
    expect(text.value).toBe("[true]");
    expect(input().value).toBe("[true]");
  });
});

describe("JsonField localization", () => {
  afterEach(() => setLanguage("en"));

  it("uses the Chinese strings", async () => {
    setLanguage("zh");
    const wrapper = controlled({ modelValue: "{}" });
    await nextTick();
    expect(button().getAttribute("aria-label")).toBe("格式化 JSON");
    expect(wrapper.text()).toContain("JSON 语法正确");
    await wrapper.setProps({ modelValue: "{" });
    expect(wrapper.text()).toContain("JSON 语法错误");
  });
});
