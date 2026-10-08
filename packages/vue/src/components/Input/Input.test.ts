import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { Input } from ".";
import { FormControl, FormHelperText } from "../FormControl";

describe("Input", () => {
  it("renders the wrapper, the input and the hooks", () => {
    const wrapper = mount(Input, {
      attrs: { class: "mine", placeholder: "Name", "data-part": "x" },
    });
    const root = wrapper.get('[data-minerva="input"][data-part="root"]');
    expect(root.classes()).toEqual(
      expect.arrayContaining(["root", "outline", "medium", "mine"]),
    );
    expect(root.attributes("data-component")).toBe("input");
    expect(root.attributes("data-size")).toBe("medium");
    expect(root.attributes("data-variant")).toBe("outline");
    const input = wrapper.get("input");
    expect(input.classes()).toContain("field");
    expect(input.attributes("type")).toBe("text");
    expect(input.attributes("placeholder")).toBe("Name");
    expect(input.attributes("data-part")).toBe("input");
    expect(input.classes()).not.toContain("mine");
  });

  it("is uncontrolled with defaultValue", async () => {
    const onInput = vi.fn();
    const wrapper = mount(Input, {
      props: { defaultValue: "Ada", showCharCount: true },
      attrs: { onInput },
    });
    const input = wrapper.get("input");
    expect(input.element.value).toBe("Ada");
    expect(wrapper.get('[data-part="count"]').text()).toBe("3");
    await input.setValue("Grace");
    expect(wrapper.emitted("update:modelValue")).toEqual([["Grace"]]);
    expect(onInput).toHaveBeenCalled();
    expect(wrapper.get('[data-part="count"]').text()).toBe("5");
  });

  it("is controlled with v-model", async () => {
    const wrapper = mount(Input, { props: { modelValue: "a" } });
    const input = wrapper.get("input");
    await input.setValue("ab");
    expect(wrapper.emitted("update:modelValue")).toEqual([["ab"]]);
    // the parent kept "a"
    expect(input.element.value).toBe("a");
    await wrapper.setProps({ modelValue: "xyz" });
    expect(input.element.value).toBe("xyz");

    const value = ref("one");
    const parent = mount(
      defineComponent({
        setup: () => () =>
          h(Input, {
            modelValue: value.value,
            "onUpdate:modelValue": (v: string) => (value.value = v),
          }),
      }),
    );
    await parent.get("input").setValue("two");
    expect(value.value).toBe("two");
    expect(parent.get("input").element.value).toBe("two");
  });

  it("clears the field and keeps focus", async () => {
    const wrapper = mount(Input, {
      props: { defaultValue: "Ada", clearable: true, clearLabel: "Erase" },
      attachTo: document.body,
    });
    const clear = wrapper.get('[data-part="clear-button"]');
    expect(clear.attributes("aria-label")).toBe("Erase");
    await clear.trigger("click");
    expect(wrapper.get("input").element.value).toBe("");
    expect(wrapper.emitted("update:modelValue")).toEqual([[""]]);
    expect(wrapper.emitted("clear")).toHaveLength(1);
    expect(document.activeElement).toBe(wrapper.get("input").element);
    expect(wrapper.find('[data-part="clear-button"]').exists()).toBe(false);
  });

  it("hides the clear button while disabled or read-only", () => {
    for (const props of [{ disabled: true }, { readOnly: true }]) {
      const wrapper = mount(Input, {
        props: { defaultValue: "x", clearable: true, ...props },
      });
      expect(wrapper.find('[data-part="clear-button"]').exists()).toBe(false);
    }
    const labelled = mount(Input, {
      props: { modelValue: "x", clearable: true },
    });
    expect(
      labelled.get('[data-part="clear-button"]').attributes("aria-label"),
    ).toBe("Clear");
  });

  it("toggles the password visibility", async () => {
    const wrapper = mount(Input, { props: { type: "password" } });
    const toggle = wrapper.get('[data-part="password-toggle"]');
    expect(wrapper.get("input").attributes("type")).toBe("password");
    expect(toggle.attributes("aria-label")).toBe("Show password");
    await toggle.trigger("click");
    expect(wrapper.get("input").attributes("type")).toBe("text");
    expect(toggle.attributes("aria-label")).toBe("Hide password");
    await wrapper.setProps({
      showPasswordLabel: "Reveal",
      hidePasswordLabel: "Mask",
    });
    expect(toggle.attributes("aria-label")).toBe("Mask");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-label")).toBe("Reveal");
  });

  it("renders prefix / suffix props and slots, count with maxLength", () => {
    const wrapper = mount(Input, {
      props: {
        prefix: "@",
        suffix: "kg",
        showCharCount: true,
        maxLength: 10,
        defaultValue: "abc",
      },
    });
    expect(wrapper.get('[data-part="prefix"]').text()).toBe("@");
    expect(wrapper.get('[data-part="suffix"]').text()).toBe("kg");
    const count = wrapper.get('[data-part="count"]');
    expect(count.text()).toBe("3 / 10");
    expect(wrapper.get("input").attributes("aria-describedby")).toBe(
      count.attributes("id"),
    );
    expect(wrapper.get("input").attributes("maxlength")).toBe("10");
    const slotted = mount(Input, {
      slots: { prefix: () => h("i", "P"), suffix: () => h("i", "S") },
    });
    expect(slotted.get('[data-part="prefix"]').text()).toBe("P");
    expect(slotted.get('[data-part="suffix"]').text()).toBe("S");
  });

  it("sets invalid, required, disabled, read-only", () => {
    const wrapper = mount(Input, {
      props: {
        invalid: true,
        required: true,
        disabled: true,
        readOnly: true,
        size: "small",
        variant: "filled",
      },
    });
    const root = wrapper.get('[data-part="root"]');
    expect(root.classes()).toEqual(
      expect.arrayContaining(["invalid", "disabled", "small", "filled"]),
    );
    for (const key of ["invalid", "required", "disabled", "readonly"]) {
      expect(root.attributes(`data-${key}`)).toBe("");
    }
    const input = wrapper.get("input");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("required")).toBeDefined();
    expect(input.attributes("disabled")).toBeDefined();
    expect(input.attributes("readonly")).toBeDefined();
    const ariaInvalid = mount(Input, { attrs: { "aria-invalid": "true" } });
    expect(
      ariaInvalid.get('[data-part="root"]').attributes("data-invalid"),
    ).toBe("");
  });

  it("is wired into a FormControl", async () => {
    const wrapper = mount(FormControl, {
      props: { id: "name", invalid: true, required: true, readOnly: true },
      slots: {
        default: () => [
          h(Input, { "aria-describedby": "own" }),
          h(FormHelperText, null, () => "Help"),
        ],
      },
    });
    await nextTick();
    const input = wrapper.get("input");
    expect(input.attributes("id")).toBe("name");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("aria-required")).toBe("true");
    expect(input.attributes("aria-readonly")).toBe("true");
    expect(input.attributes("aria-describedby")).toBe("own");
    const root = wrapper.get('[data-minerva="input"]');
    expect(root.attributes("data-required")).toBe("");
    expect(root.attributes("data-invalid")).toBe("");
  });
});
