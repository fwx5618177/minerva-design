import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { NumberInput } from ".";
import { FormControl } from "../FormControl";

const keydown = (wrapper: ReturnType<typeof mount>, key: string) =>
  wrapper.get("input").trigger("keydown", { key });

describe("NumberInput", () => {
  it("renders a spinbutton with hooks", () => {
    const wrapper = mount(NumberInput, {
      props: { defaultValue: 2, min: 0, max: 10 },
      attrs: { class: "mine", "aria-label": "Qty" },
    });
    const root = wrapper.get('[data-minerva="number-input"]');
    expect(root.classes()).toEqual(
      expect.arrayContaining(["root", "medium", "mine"]),
    );
    const input = wrapper.get("input");
    expect(input.attributes("role")).toBe("spinbutton");
    expect(input.attributes("inputmode")).toBe("decimal");
    expect(input.attributes("aria-valuenow")).toBe("2");
    expect(input.attributes("aria-valuemin")).toBe("0");
    expect(input.attributes("aria-valuemax")).toBe("10");
    expect(input.attributes("aria-label")).toBe("Qty");
    expect(input.element.value).toBe("2");
    expect(wrapper.find('[data-part="stepper"]').exists()).toBe(false);
  });

  it("steps with the keyboard and emits committed values", async () => {
    const wrapper = mount(NumberInput, {
      props: { defaultValue: 5, min: 0, max: 100, step: 2 },
    });
    await keydown(wrapper, "ArrowUp");
    await keydown(wrapper, "ArrowDown");
    await keydown(wrapper, "ArrowDown");
    await keydown(wrapper, "PageUp");
    await keydown(wrapper, "PageDown");
    await keydown(wrapper, "End");
    await keydown(wrapper, "Home");
    expect(wrapper.emitted("change")!.map((e) => e[0])).toEqual([
      7, 5, 3, 23, 3, 100, 0,
    ]);
    expect(wrapper.emitted("update:modelValue")).toHaveLength(7);
    expect(wrapper.get("input").element.value).toBe("0");
  });

  it("Home / End only jump with bounds; other keys pass", async () => {
    const wrapper = mount(NumberInput, { props: { defaultValue: 1 } });
    await keydown(wrapper, "Home");
    await keydown(wrapper, "End");
    await keydown(wrapper, "a");
    expect(wrapper.emitted("change")).toBeUndefined();
  });

  it("commits the draft on blur and Enter, clamped and rounded", async () => {
    const wrapper = mount(NumberInput, {
      props: { min: 0, max: 10, step: 0.5 },
      attachTo: document.body,
    });
    const input = wrapper.get("input");
    await input.setValue("12");
    // out of range draft: invalid + hint
    const root = wrapper.get('[data-minerva="number-input"]');
    expect(root.attributes("title")).toBe("Maximum 10");
    expect(root.classes()).toContain("shake");
    expect(input.attributes("aria-invalid")).toBe("true");
    await input.trigger("blur");
    expect(wrapper.emitted("change")).toEqual([[10]]);
    expect(input.element.value).toBe("10.0");

    await input.setValue("-3");
    expect(root.attributes("title")).toBe("Minimum 0");
    input.element.focus();
    await keydown(wrapper, "Enter");
    expect(wrapper.emitted("change")!.at(-1)).toEqual([0]);

    await input.setValue("abc");
    expect(root.attributes("title")).toBe("Enter a number");
    await input.trigger("blur");
    // invalid text falls back to the last value
    expect(input.element.value).toBe("0.0");
    expect(wrapper.emitted("change")).toHaveLength(2);
  });

  it("clearing commits null, or min with allowEmpty false", async () => {
    const wrapper = mount(NumberInput, { props: { defaultValue: 3 } });
    await wrapper.get("input").setValue("");
    await wrapper.get("input").trigger("blur");
    expect(wrapper.emitted("change")).toEqual([[null]]);

    const strict = mount(NumberInput, {
      props: { defaultValue: 3, min: 1, allowEmpty: false },
    });
    await strict.get("input").setValue("-");
    await strict.get("input").trigger("blur");
    expect(strict.emitted("change")).toEqual([[1]]);
    const zero = mount(NumberInput, {
      props: { defaultValue: 3, allowEmpty: false },
    });
    await zero.get("input").setValue(" ");
    await zero.get("input").trigger("blur");
    expect(zero.emitted("change")).toEqual([[0]]);
  });

  it("uses the stepper buttons and custom labels / messages", async () => {
    const wrapper = mount(NumberInput, {
      props: {
        defaultValue: 9,
        max: 10,
        min: 8,
        showStepper: true,
        incrementLabel: "More",
        decrementLabel: "Less",
        aboveMaxMessage: "Too big",
        belowMinMessage: "Too small",
        notANumberMessage: "NaN",
      },
    });
    const inc = wrapper.get('[data-part="increment"]');
    const dec = wrapper.get('[data-part="decrement"]');
    expect(inc.attributes("aria-label")).toBe("More");
    expect(dec.attributes("aria-label")).toBe("Less");
    await inc.trigger("click");
    expect(wrapper.emitted("change")).toEqual([[10]]);
    expect(inc.attributes("disabled")).toBeDefined();
    await dec.trigger("click");
    await dec.trigger("click");
    expect(dec.attributes("disabled")).toBeDefined();
    const root = wrapper.get('[data-minerva="number-input"]');
    await wrapper.get("input").setValue("11");
    expect(root.attributes("title")).toBe("Too big");
    await wrapper.get("input").setValue("7");
    expect(root.attributes("title")).toBe("Too small");
    await wrapper.get("input").setValue("x");
    expect(root.attributes("title")).toBe("NaN");
    const defaults = mount(NumberInput, { props: { showStepper: true } });
    expect(
      defaults.get('[data-part="increment"]').attributes("aria-label"),
    ).toBe("Increase");
    expect(
      defaults.get('[data-part="decrement"]').attributes("aria-label"),
    ).toBe("Decrease");
  });

  it("is controlled with v-model and syncs the draft", async () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 1 } });
    await keydown(wrapper, "ArrowUp");
    expect(wrapper.emitted("update:modelValue")).toEqual([[2]]);
    await wrapper.setProps({ modelValue: 5 });
    expect(wrapper.get("input").element.value).toBe("5");
    await wrapper.setProps({ modelValue: null });
    expect(wrapper.get("input").element.value).toBe("");
    await wrapper.setProps({ precision: 2, modelValue: 1.5 });
    expect(wrapper.get("input").element.value).toBe("1.50");
  });

  it("disabled / read-only lock the value; a consumer keydown can take over", async () => {
    for (const props of [{ disabled: true }, { readOnly: true }]) {
      const wrapper = mount(NumberInput, {
        props: { defaultValue: 1, showStepper: true, ...props },
      });
      await keydown(wrapper, "ArrowUp");
      await wrapper.get("input").trigger("blur");
      expect(wrapper.emitted("change")).toBeUndefined();
      expect(
        wrapper.get('[data-part="increment"]').attributes("disabled"),
      ).toBeDefined();
    }
    const taken = mount(NumberInput, {
      props: { defaultValue: 1 },
      attrs: { onKeydown: (e: KeyboardEvent) => e.preventDefault() },
    });
    await keydown(taken, "ArrowUp");
    expect(taken.emitted("change")).toBeUndefined();
  });

  it("calls the consumer blur listener after committing", async () => {
    const calls: string[] = [];
    const wrapper = mount(NumberInput, {
      attrs: { onBlur: () => calls.push("blur") },
      props: {
        "onUpdate:modelValue": () => calls.push("commit"),
      } as never,
    });
    await wrapper.get("input").setValue("4");
    await wrapper.get("input").trigger("blur");
    expect(calls).toEqual(["commit", "blur"]);
  });

  it("is wired into a FormControl", () => {
    const wrapper = mount(FormControl, {
      props: { id: "qty", invalid: true, required: true, readOnly: true },
      slots: { default: () => h(NumberInput) },
    });
    const input = wrapper.get("input");
    expect(input.attributes("id")).toBe("qty");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("aria-required")).toBe("true");
    expect(input.attributes("readonly")).toBeDefined();
    const root = wrapper.get('[data-minerva="number-input"]');
    expect(root.attributes("data-required")).toBe("");
    expect(root.attributes("data-readonly")).toBe("");
    expect(root.classes()).toContain("invalid");
  });
});
